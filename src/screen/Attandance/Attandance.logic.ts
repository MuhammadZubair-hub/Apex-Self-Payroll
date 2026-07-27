import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/authSlice';
import { getColors } from '../../theme/color/theme';
import { useThemeContext } from '../../theme/ThemeContex';
import { getRecordStatus } from './attandance.constants';
import { showThemedMessage } from '../../utils/flashMessage';
import { useMonthlyAttendance } from '../../hooks/useMonthlyAttendance';
import { useIsManager } from '../Home/components/AttendanceCalendar/useIsManager';
import { HomeService } from '../../services/HomeService';

export const useAttendance = () => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const userData = useSelector(getUser);
  const { isManager } = useIsManager();

  const now = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);

  // Managed employees logic
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [employeesList, setEmployeesList] = useState<any[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
  const [employeePickerVisible, setEmployeePickerVisible] = useState(false);

  // Graph bar / Record click modal state
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [recordModalVisible, setRecordModalVisible] = useState(false);

  // Fetch employees list if logged in user is a manager
  useEffect(() => {
    if (!isManager || !userData?.employeeId) return;

    let isMounted = true;
    const fetchEmployees = async () => {
      try {
        setEmployeesLoading(true);
        const response = await HomeService.getAllEmployess();
        if (!isMounted) return;

        const rawData = response.data?.data || response.data || [];
        const allEmps: any[] = Array.isArray(rawData) ? rawData : [];

        // Filter employees where managerId === userData.employeeId
        const managedEmps = allEmps.filter(
          (emp: any) => emp.managerId != null && Number(emp.managerId) === Number(userData.employeeId)
        );

        // Self option for the logged in manager
        const selfOption = {
          id: userData.employeeId,
          name: `${userData.name || 'My Attendance'} (Self)`,
          code: userData.legacyCode || userData.code || '',
          department: userData.department || '',
          designation: userData.designation || 'Manager',
          isSelf: true,
        };

        const list = [selfOption, ...managedEmps];
        setEmployeesList(list);

        if (!selectedEmployee) {
          setSelectedEmployee(selfOption);
        }
      } catch (err) {
        console.error('Error fetching managed employees:', err);
      } finally {
        if (isMounted) setEmployeesLoading(false);
      }
    };

    fetchEmployees();

    return () => {
      isMounted = false;
    };
  }, [isManager, userData?.employeeId, userData?.name, userData?.legacyCode, userData?.code, userData?.department, userData?.designation]);

  const activeEmployeeId = selectedEmployee?.id ?? userData?.employeeId;

  // Shared with Home dashboard - reads cached fetch if available or fetches for active employee
  const { records: cachedRecords, fetchMonthlyAttendance } = useMonthlyAttendance(activeEmployeeId, month, year);
  const records = cachedRecords || [];

  const fetchAttendance = useCallback(
    async (force = false) => {
      if (!activeEmployeeId) return;
      try {
        setLoading(true);
        await fetchMonthlyAttendance(force);
      } catch (err) {
        console.error('Error fetching attendance:', err);
        showThemedMessage(colors, { message: `Error fetching attendance: ${err}`, type: 'danger' });
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [activeEmployeeId, fetchMonthlyAttendance, colors]
  );

  useEffect(() => {
    setLoading(true);
    fetchAttendance();
  }, [fetchAttendance]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAttendance(true);
  }, [fetchAttendance]);

  const openMonthPicker = useCallback(() => setMonthPickerVisible(true), []);
  const closeMonthPicker = useCallback(() => setMonthPickerVisible(false), []);

  const selectMonthYear = useCallback((selectedMonth: number, selectedYear: number) => {
    setMonth(selectedMonth);
    setYear(selectedYear);
    setMonthPickerVisible(false);
  }, []);

  const openEmployeePicker = useCallback(() => setEmployeePickerVisible(true), []);
  const closeEmployeePicker = useCallback(() => setEmployeePickerVisible(false), []);

  const selectEmployee = useCallback((emp: any) => {
    setSelectedEmployee(emp);
    setEmployeePickerVisible(false);
  }, []);

  const openRecordModal = useCallback((record: any) => {
    setSelectedRecord(record);
    setRecordModalVisible(true);
  }, []);

  const closeRecordModal = useCallback(() => {
    setRecordModalVisible(false);
    setSelectedRecord(null);
  }, []);

  const summary = useMemo(
    () =>
      records.reduce(
        (acc, record) => {
          const status = getRecordStatus(record);
          if (status === 'Present') acc.present++;
          else if (status === 'Absent') acc.absent++;
          else if (status === 'Pending') acc.pending++;
          else if (status === 'Leave') acc.leave++;
          return acc;
        },
        { present: 0, absent: 0, pending: 0, leave: 0 }
      ),
    [records]
  );

  return {
    colors,
    month,
    year,
    records,
    loading,
    refreshing,
    onRefresh,
    monthPickerVisible,
    openMonthPicker,
    closeMonthPicker,
    selectMonthYear,
    summary,
    isManager,
    employeesList,
    selectedEmployee: selectedEmployee || {
      id: userData?.employeeId,
      name: userData?.name || 'My Attendance',
      code: userData?.legacyCode || '',
    },
    employeesLoading,
    employeePickerVisible,
    openEmployeePicker,
    closeEmployeePicker,
    selectEmployee,
    selectedRecord,
    recordModalVisible,
    openRecordModal,
    closeRecordModal,
  };
};
