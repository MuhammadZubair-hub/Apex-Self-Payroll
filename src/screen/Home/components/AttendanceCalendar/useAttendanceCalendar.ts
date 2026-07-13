import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser, getUserProfileData } from '../../../../redux/slices/authSlice';
import { LeaveCalendarService } from '../../../../services/LeaveCalendarService';
import { getColors } from '../../../../theme/color/theme';
import { useThemeContext } from '../../../../theme/ThemeContex';
import { showThemedMessage } from '../../../../utils/flashMessage';
import { buildMarkedDates, LeaveCalendarRecord, MONTH_NAMES, normalizeDepartment } from './attendanceCalendar.constants';
import { useIsManager } from './useIsManager';

interface DepartmentOption {
  id: number | string;
  name: string;
}

// Shared by the Home dashboard's read-only card and the full Leave Calendar history screen so
// both stay in sync with the same fetch/marking logic.
export const useAttendanceCalendar = () => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const userData = useSelector(getUser);
  const profileData = useSelector(getUserProfileData);

  const now = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  // Nothing else here fetches until this resolves the current user as a manager.
  const { checkingAccess, isManager } = useIsManager();

  const [departments, setDepartments] = useState<DepartmentOption[]>([]);
  const [departmentId, setDepartmentId] = useState<number | string | null>(null);
  const [departmentsLoaded, setDepartmentsLoaded] = useState(false);

  const [records, setRecords] = useState<LeaveCalendarRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [detailsFilterDate, setDetailsFilterDate] = useState<string | null>(null);

  const selectedDepartmentName = useMemo(
    () => departments.find((d) => d.id === departmentId)?.name || 'Select department',
    [departments, departmentId]
  );

  const fetchLeaveCalendar = useCallback(
    async (deptId: number | string, targetMonth: number, targetYear: number) => {
      try {
        setLoading(true);
        const result = await LeaveCalendarService.getApprovedLeavesCalendar(MONTH_NAMES[targetMonth - 1], targetYear, deptId);
        const payload = result.data;
        setRecords(Array.isArray(payload) ? payload : payload?.data || []);
      } catch (err) {
        console.error('Error fetching leave calendar:', err);
        showThemedMessage(colors, { message: `Error fetching leave calendar: ${err}`, type: 'danger' });
        setRecords([]);
      } finally {
        setLoading(false);
      }
    },
    [colors]
  );

  const fetchDepartments = useCallback(async () => {
    try {
      const result = await LeaveCalendarService.getDepartments();
      const payload = result.data;
      const list = (Array.isArray(payload) ? payload : payload?.data || []).map(normalizeDepartment);
      setDepartments(list);

      const ownDepartmentName = (profileData?.department || '').trim().toLowerCase();
      const own = list.find((d: DepartmentOption) => d.name.trim().toLowerCase() === ownDepartmentName);
      const defaultDept = own?.id ?? list[0]?.id ?? null;
      setDepartmentId(defaultDept);
      if (defaultDept != null) fetchLeaveCalendar(defaultDept, month, year);
      else setLoading(false);
    } catch (err) {
      console.error('Error fetching departments:', err);
      showThemedMessage(colors, { message: `Error fetching departments: ${err}`, type: 'danger' });
      setLoading(false);
    } finally {
      setDepartmentsLoaded(true);
    }
    // Runs once, right after access is confirmed - default department/month/year at that point.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData?.department, fetchLeaveCalendar]);

  useEffect(() => {
    if (checkingAccess) return;
    if (isManager) fetchDepartments();
    else setLoading(false);
    // Runs once access resolves - fetchDepartments/setLoading don't need to re-run afterwards.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkingAccess, isManager]);

  const markedDates = useMemo(() => buildMarkedDates(records), [records]);

  // Picking a department fetches immediately - there's no "Get" button to apply it.
  const selectDepartment = useCallback(
    (id: number | string) => {
      setDepartmentId(id);
      fetchLeaveCalendar(id, month, year);
    },
    [month, year, fetchLeaveCalendar]
  );

  // Same as selectDepartment - changing month/year fetches right away using the current department.
  const selectMonthYear = useCallback(
    (selectedMonth: number, selectedYear: number) => {
      setMonth(selectedMonth);
      setYear(selectedYear);
      if (departmentId != null) fetchLeaveCalendar(departmentId, selectedMonth, selectedYear);
    },
    [departmentId, fetchLeaveCalendar]
  );

  const openDetails = useCallback((filterDate?: string) => {
    setDetailsFilterDate(filterDate ?? null);
    setDetailsVisible(true);
  }, []);
  const closeDetails = useCallback(() => setDetailsVisible(false), []);

  const detailsRecords = useMemo(() => {
    if (!detailsFilterDate) return records;
    return markedDates.get(detailsFilterDate) || [];
  }, [detailsFilterDate, markedDates, records]);

  return {
    colors,
    employeeId: userData?.employeeId,
    checkingAccess,
    isManager,
    month,
    year,
    departments,
    departmentId,
    departmentsLoaded,
    selectedDepartmentName,
    setDepartmentId,
    selectDepartment,
    selectMonthYear,
    records,
    markedDates,
    loading,
    detailsVisible,
    detailsRecords,
    openDetails,
    closeDetails,
  };
};
