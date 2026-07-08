import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/authSlice';
import { AttendanceService } from '../../services/AttendanceService';
import { getColors } from '../../theme/color/theme';
import { useThemeContext } from '../../theme/ThemeContex';
import { getRecordStatus } from './attandance.constants';
import { showThemedMessage } from '../../utils/flashMessage';

export const useAttendance = () => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const userData = useSelector(getUser);

  const now = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);

  const fetchAttendance = useCallback(async () => {
    if (!userData?.employeeId) return;
    try {
      setLoading(true);
      const result = await AttendanceService.getMonthlyAttendance(userData.employeeId, month, year);
      // console.log('user attandance is ',result.data);
      setRecords(result.data?.status ? result.data.data || [] : []);
    } catch (err) {
      console.error('Error fetching attendance:', err);
      showThemedMessage(colors, { message: `Error fetching attendance: ${err}`, type: 'danger' });
      setRecords([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userData?.employeeId, month, year]);

  useEffect(() => {
    setLoading(true);
    fetchAttendance();
  }, [fetchAttendance]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAttendance();
  }, [fetchAttendance]);

  const openMonthPicker = useCallback(() => setMonthPickerVisible(true), []);
  const closeMonthPicker = useCallback(() => setMonthPickerVisible(false), []);

  const selectMonthYear = useCallback((selectedMonth: number, selectedYear: number) => {
    setMonth(selectedMonth);
    setYear(selectedYear);
    setMonthPickerVisible(false);
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
  };
};
