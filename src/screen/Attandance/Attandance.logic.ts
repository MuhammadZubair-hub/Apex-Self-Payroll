import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/authSlice';
import { baseUrl, endPoints } from '../../services/Constants/endPoints';
import { getColors } from '../../theme/color/theme';
import { useThemeContext } from '../../theme/ThemeContex';
import { getRecordStatus } from './attandance.constants';
import { showMessage } from 'react-native-flash-message';
import { CommonStyle } from '../../utils/Common/CommonStyle';

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

  const fetchAttendance = useCallback(async () => {
    if (!userData?.employeeId) return;
    try {
      setLoading(true);
      const url = `${baseUrl}${endPoints.MonthlyAttendance}?EmployeeId=${userData.employeeId}&Month=${month}&Year=${year}`;
      const response = await fetch(url);
      const json = await response.json();
      setRecords(json.status ? json.data || [] : []);
    } catch (err) {
      console.error('Error fetching attendance:', err);
      showMessage({
        type: 'danger',
        message: `Error fetching attendance: ${err}`,
        style: CommonStyle.error
      })
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

  const goToPrevMonth = useCallback(() => {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }, [month]);

  const goToNextMonth = useCallback(() => {
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }, [month]);

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
    goToPrevMonth,
    goToNextMonth,
    summary,
  };
};
