import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/authSlice';
import { getColors } from '../../theme/color/theme';
import { useThemeContext } from '../../theme/ThemeContex';
import { getRecordStatus } from './attandance.constants';
import { showThemedMessage } from '../../utils/flashMessage';
import { useMonthlyAttendance } from '../../hooks/useMonthlyAttendance';

export const useAttendance = () => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const userData = useSelector(getUser);

  const now = useMemo(() => new Date(), []);
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [monthPickerVisible, setMonthPickerVisible] = useState(false);

  // Shared with the Home dashboard's Attendance Overview card - same employeeId/month/year
  // reads the same cached fetch instead of hitting the API again.
  const { records: cachedRecords, fetchMonthlyAttendance } = useMonthlyAttendance(userData?.employeeId, month, year);
  const records = cachedRecords || [];

  const fetchAttendance = useCallback(
    async (force = false) => {
      if (!userData?.employeeId) return;
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
    [userData?.employeeId, fetchMonthlyAttendance, colors]
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
