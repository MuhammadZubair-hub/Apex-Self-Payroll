import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/slices/authSlice';
import { AttendanceService } from '../../services/AttendanceService';
import { HomeService } from '../../services/HomeService';
import { WFHService } from '../../services/WFHService';
import { getColors } from '../../theme/color/theme';
import { useThemeContext } from '../../theme/ThemeContex';
import { formatTime } from '../../utils/dateTime';
import { showThemedMessage } from '../../utils/flashMessage';
import { useMonthlyAttendance } from '../../hooks/useMonthlyAttendance';
import { requestLocationPermission, getCurrentLocation } from '../../utils/location';

export const useHome = () => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const userData = useSelector(getUser);
  const navigation = useNavigation<any>();

  const now = useMemo(() => new Date(), []);
  const { records: monthlyAttendance, fetchMonthlyAttendance } = useMonthlyAttendance(
    userData?.employeeId,
    now.getMonth() + 1,
    now.getFullYear()
  );

  const [loading, setLoading] = useState(true);
  const [wfhLoading, setWfhLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [upcomingHolidays, setUpcomingHolidays] = useState<any[]>([]);
  const [pendingrequ, SetPendingLeaveRequest] = useState<any[]>([]);
  const [pendingWfhRequ, setPendingWfhRequ] = useState<any[]>([]);
  const [leaveBalance, setLeaveBalance] = useState<any[]>([]);
  const [todayAttendance, setTodayAttendance] = useState<any>(null);
  const [leaveModalVisible, setLeaveModalVisible] = useState(false);
  const [holidayModalVisible, setHolidayModalVisible] = useState(false);
  const [pendingApprovalsModalVisible, setPendingApprovalsModalVisible] = useState(false);

  const totalPendingApprovals = pendingrequ.length + pendingWfhRequ.length;

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

    const records = monthlyAttendance || [];
    records.forEach((record) => {
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

    return { present, absent, pending, totalDays: records.length };
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
        ? `Checked out at ${(todayAttendance?.endTime?.split(' ')[4] ? todayAttendance?.endTime?.split(' ')[4] : todayAttendance?.endTime?.split(' ')[3])}
        `
        : 'Checked in'
      : todayStatusMeta.label;

  const fetchDashboardData = useCallback(
    async (force = false) => {
      if (!userData?.employeeId) return;
      try {
        const [holidaysResult, leaveResult, todayAttendanceResult, , pendingRequestResult, pendingWfhResult] = await Promise.all([
          HomeService.getUpcomingHolidays(userData.employeeId),
          HomeService.getEmployeeLeavesInfo(userData.employeeId),
          AttendanceService.getTodayAttendance(userData.employeeId),
          fetchMonthlyAttendance(force),
          HomeService.getPendingLeaveApplications(userData.employeeId),
          WFHService.getPendingWFHApprovals(userData.employeeId),
        ]);

        // console.log('att: ', todayAttendanceResult.data.data )
        // console.log('att2: ', pendingRequestResult.data.data )

        if (holidaysResult.data?.status) setUpcomingHolidays(holidaysResult.data.data || []);
        if (leaveResult.data?.status) setLeaveBalance(leaveResult.data.data || []);
        if (todayAttendanceResult.data?.status) setTodayAttendance(todayAttendanceResult.data.data || null);
        if (pendingRequestResult.data?.status) SetPendingLeaveRequest(pendingRequestResult.data.data || []);

        const wfhPendingList = pendingWfhResult.data?.status
          ? pendingWfhResult.data.data
          : Array.isArray(pendingWfhResult.data)
            ? pendingWfhResult.data
            : pendingWfhResult.data?.data || [];
        setPendingWfhRequ(Array.isArray(wfhPendingList) ? wfhPendingList : []);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        showThemedMessage(colors, { message: `Error fetching dashboard data: ${err}`, type: 'danger' });
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [userData?.employeeId, colors, fetchMonthlyAttendance]
  );

  const isWFH = userData?.isWFH === true;

  const handleWFHCheckInOut = useCallback(async (type: 'IN' | 'OUT') => {
    if (!userData?.employeeId) return;

    setWfhLoading(true);
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        showThemedMessage(colors, { message: 'Location permission is required for attendance', type: 'danger' });
        setWfhLoading(false);
        return;
      }

      const location = await getCurrentLocation();
      const coordinates = `${location.latitude}, ${location.longitude}`;
      console.log('coordinates: ', JSON.stringify({
        employeeId: userData.employeeId,
        type,
        coordinates,
      }))
      // return;
      const r = await AttendanceService.postWFHAttendance({
        employeeId: userData.employeeId,
        type,
        coordinates,
      });
      console.log('r: ', r);

      if (r.success && (r.data?.status === 1 || r.data?.status === true || r.data?.status === "1")) {
        showThemedMessage(colors, { message: `Checked ${type.toLowerCase()} successfully`, type: 'success' });
        const todayAttendanceResult = await AttendanceService.getTodayAttendance(userData.employeeId);
        if (todayAttendanceResult.data?.status) setTodayAttendance(todayAttendanceResult.data.data || null);
      } else {
        showThemedMessage(colors, { message: r.data?.message || `Failed to check ${type.toLowerCase()}`, type: 'danger' });
      }
    } catch (error: any) {
      console.log('Error in WFH attendance:', error);
      showThemedMessage(colors, { message: error.message || 'Error updating attendance', type: 'danger' });
    } finally {
      setWfhLoading(false);
    }
  }, [userData?.employeeId, colors]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDashboardData(true);
  }, [fetchDashboardData]);

  const openLeaveModal = useCallback(() => setLeaveModalVisible(true), []);
  const closeLeaveModal = useCallback(() => setLeaveModalVisible(false), []);
  const openHolidayModal = useCallback(() => setHolidayModalVisible(true), []);
  const closeHolidayModal = useCallback(() => setHolidayModalVisible(false), []);
  const openPendingApprovalsModal = useCallback(() => setPendingApprovalsModalVisible(true), []);
  const closePendingApprovalsModal = useCallback(() => setPendingApprovalsModalVisible(false), []);
  const goToAttendance = useCallback(() => navigation.navigate('attendance'), [navigation]);
  const goToRequestLetter = useCallback(() => navigation.navigate('requestLetter'), [navigation]);
  const goToPendingLeaveApprovals = useCallback(() => {
    setPendingApprovalsModalVisible(false);
    navigation.navigate('leaveRequest', { section: 'APPROVALS' });
  }, [navigation]);
  const goToPendingWfhApprovals = useCallback(() => {
    setPendingApprovalsModalVisible(false);
    navigation.navigate('wfhRequest', { section: 'APPROVALS' });
  }, [navigation]);

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
    pendingWfhRequ,
    totalPendingApprovals,
    pendingApprovalsModalVisible,
    openLeaveModal,
    closeLeaveModal,
    openHolidayModal,
    closeHolidayModal,
    openPendingApprovalsModal,
    closePendingApprovalsModal,
    goToAttendance,
    goToRequestLetter,
    goToPendingLeaveApprovals,
    goToPendingWfhApprovals,
    isWFH,
    wfhLoading,
    handleWFHCheckInOut,
  };
};
