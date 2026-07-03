import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/authSlice';
import { baseUrl, endPoints } from '../../services/Constants/endPoints';
import { getColors } from '../../theme/color/theme';
import { useThemeContext } from '../../theme/ThemeContex';
import { formatTime } from '../../utils/dateTime';
import { showMessage } from 'react-native-flash-message';
import { CommonStyle } from '../../utils/Common/CommonStyle';

export const useHome = () => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const userData = useSelector(getUser);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [upcomingHolidays, setUpcomingHolidays] = useState<any[]>([]);
  const [leaveBalance, setLeaveBalance] = useState<any[]>([]);
  const [todayAttendance, setTodayAttendance] = useState<any>(null);
  const [monthlyAttendance, setMonthlyAttendance] = useState<any[]>([]);
  const [leaveModalVisible, setLeaveModalVisible] = useState(false);

  const totalLeaveBalance = useMemo(
    () => leaveBalance.reduce((sum, item) => sum + (Number(item?.leaveBalance) || 0), 0),
    [leaveBalance]
  );

  const attendanceSummary = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let present = 0;
    let absent = 0;
    let pending = 0;

    monthlyAttendance.forEach((record) => {
      if (record.attendanceStatus === 'Present') {
        present++;
      } else if (record.attendanceStatus === 'Absent') {
        const recordDate = new Date(record.date);
        recordDate.setHours(0, 0, 0, 0);
        if (recordDate.getTime() > today.getTime()) {
          pending++;
        } else {
          absent++;
        }
      }
    });

    return { present, absent, pending, totalDays: monthlyAttendance.length };
  }, [monthlyAttendance]);

  const todayStatusMeta = useMemo(() => {
    switch (todayAttendance?.attendanceStatus) {
      case 'Present':
        return { label: 'Present', bg: colors.successBg, color: colors.successText, dot: colors.greenColor };
      case 'Absent':
        return { label: 'Absent', bg: colors.dangerBg, color: colors.dangerText, dot: colors.redColor };
      case 'Leave':
        return { label: 'On Leave', bg: colors.lightPurple, color: colors.purple1, dot: colors.purple1 };
      default:
        return { label: 'Not Marked', bg: colors.neutralBg, color: colors.neutralText, dot: colors.textSecondary };
    }
  }, [colors, todayAttendance?.attendanceStatus]);

  const todayBottomText = !todayAttendance
    ? 'No attendance record yet'
    : todayAttendance.attendanceStatus === 'Present'
      ? todayAttendance.endTime
        ? `Checked out at ${formatTime(todayAttendance.endTime)}`
        : 'Checked in'
      : todayStatusMeta.label;

  const fetchDashboardData = useCallback(async () => {
    if (!userData?.employeeId) return;

    try {
      const now = new Date();
      const upcomingHolidaysUrl = `${baseUrl}ESSDashboard/GetUpcomingHolidays?EmployeeId=${userData.employeeId}`;
      const employeeLeaveUrl = `${baseUrl}ESSDashboard/GetEmployeeLeavesInfo?employeeId=${userData.employeeId}`;
      const todayAttendanceUrl = `${baseUrl}${endPoints.TodayAttendance}?employeeId=${userData.employeeId}`;
      const monthlyAttendanceUrl = `${baseUrl}${endPoints.MonthlyAttendance}?EmployeeId=${userData.employeeId}&Month=${now.getMonth() + 1}&Year=${now.getFullYear()}`;

      const [holidaysResponse, leaveResponse, todayAttendanceResponse, monthlyAttendanceResponse] = await Promise.all([
        fetch(upcomingHolidaysUrl),
        fetch(employeeLeaveUrl),
        fetch(todayAttendanceUrl),
        fetch(monthlyAttendanceUrl),
      ]);

      const holidaysData = await holidaysResponse.json();
      const leaveData = await leaveResponse.json();
      const todayAttendanceData = await todayAttendanceResponse.json();
      const monthlyAttendanceData = await monthlyAttendanceResponse.json();

      if (holidaysData.status) setUpcomingHolidays(holidaysData.data || []);
      if (leaveData.status) setLeaveBalance(leaveData.data || []);
      if (todayAttendanceData.status) setTodayAttendance(todayAttendanceData.data || null);
      if (monthlyAttendanceData.status) setMonthlyAttendance(monthlyAttendanceData.data || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      showMessage({
        type: 'danger',
        message: `Error fetching Dashboard data ${err}`,
        style:CommonStyle.error
      })
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userData?.employeeId]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDashboardData();
  }, [fetchDashboardData]);

  const openLeaveModal = useCallback(() => setLeaveModalVisible(true), []);
  const closeLeaveModal = useCallback(() => setLeaveModalVisible(false), []);

  return {
    colors,
    loading,
    refreshing,
    onRefresh,
    upcomingHolidays,
    leaveBalance,
    todayAttendance,
    totalLeaveBalance,
    attendanceSummary,
    todayStatusMeta,
    todayBottomText,
    leaveModalVisible,
    openLeaveModal,
    closeLeaveModal,
  };
};
