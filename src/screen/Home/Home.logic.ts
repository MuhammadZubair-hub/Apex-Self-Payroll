import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/authSlice';
import { AttendanceService } from '../../services/AttendanceService';
import { HomeService } from '../../services/HomeService';
import { getColors } from '../../theme/color/theme';
import { useThemeContext } from '../../theme/ThemeContex';
import { formatTime } from '../../utils/dateTime';
import { showThemedMessage } from '../../utils/flashMessage';

export const useHome = () => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const userData = useSelector(getUser);
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [upcomingHolidays, setUpcomingHolidays] = useState<any[]>([]);
  const [pendingrequ, SetPendingLeaveRequest] = useState<any[]>([]);
  const [leaveBalance, setLeaveBalance] = useState<any[]>([]);
  const [todayAttendance, setTodayAttendance] = useState<any>(null);
  const [monthlyAttendance, setMonthlyAttendance] = useState<any[]>([]);
  const [leaveModalVisible, setLeaveModalVisible] = useState(false);
  const [holidayModalVisible, setHolidayModalVisible] = useState(false);

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
      const [holidaysResult, leaveResult, todayAttendanceResult, monthlyAttendanceResult, pendingRequestResult] =
        await Promise.all([
          HomeService.getUpcomingHolidays(userData.employeeId),
          HomeService.getEmployeeLeavesInfo(userData.employeeId),
          AttendanceService.getTodayAttendance(userData.employeeId),
          AttendanceService.getMonthlyAttendance(userData.employeeId, now.getMonth() + 1, now.getFullYear()),
          HomeService.getPendingLeaveApplications(userData.employeeId),
        ]);

      if (holidaysResult.data?.status) setUpcomingHolidays(holidaysResult.data.data || []);
      if (leaveResult.data?.status) setLeaveBalance(leaveResult.data.data || []);
      if (todayAttendanceResult.data?.status) setTodayAttendance(todayAttendanceResult.data.data || null);
      if (monthlyAttendanceResult.data?.status) setMonthlyAttendance(monthlyAttendanceResult.data.data || []);
      if (pendingRequestResult.data?.status) SetPendingLeaveRequest(pendingRequestResult.data.data || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      showThemedMessage(colors, { message: `Error fetching dashboard data: ${err}`, type: 'danger' });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userData?.employeeId, colors]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDashboardData();
  }, [fetchDashboardData]);

  const openLeaveModal = useCallback(() => setLeaveModalVisible(true), []);
  const closeLeaveModal = useCallback(() => setLeaveModalVisible(false), []);
  const openHolidayModal = useCallback(() => setHolidayModalVisible(true), []);
  const closeHolidayModal = useCallback(() => setHolidayModalVisible(false), []);
  const goToAttendance = useCallback(() => navigation.navigate('attendance'), [navigation]);
  const goToRequestLetter = useCallback(() => navigation.navigate('requestLetter'), [navigation]);
  const goToPendingApprovals = useCallback(
    () => navigation.navigate('leaveRequest', { section: 'APPROVALS' }),
    [navigation]
  );

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
    holidayModalVisible,
    pendingrequ,
    openLeaveModal,
    closeLeaveModal,
    openHolidayModal,
    closeHolidayModal,
    goToAttendance,
    goToRequestLetter,
    goToPendingApprovals,
  };
};
