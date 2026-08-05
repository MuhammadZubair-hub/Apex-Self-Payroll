import React from 'react';
import { RefreshControl, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import PrimaryHeader from '../../components/header/PrimaryHeader';
import LoadingBaseModal from '../../components/Loader/LoadingBaseModal';
import { homeStyles as styles } from './Home.styles';
import { useHome } from './Home.logic';
import TodayAttendanceCard from './components/TodayAttendanceCard';
import WFHAttendanceCard from './components/WFHAttendanceCard';
import AttendanceOverviewCard from './components/AttendanceOverviewCard';
import InfoCardsRow from './components/InfoCardsRow';
import LeaveBalanceModal from './components/LeaveBalanceModal';
import HolidaysModal from './components/HolidaysModal';
import RequestLetterCard from './components/RequestLetterCard';
import PendingApprovalCard from './components/PendingApprovalCard';
import PendingApprovalsModal from './components/PendingApprovalsModal';
import AttendanceCalendarCard from './components/AttendanceCalendar/AttendanceCalendarCard';
import { AppSizes } from '../../utils/AppSizes';
import AttendanceBarChart from '../Attandance/components/AttendanceBarChart';
import { useAttendance } from '../Attandance/Attandance.logic';

const HomeScreen = () => {
  const {
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
  } = useHome();

  const tabBarHeight = useBottomTabBarHeight();

  const { records } = useAttendance();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <PrimaryHeader
        headerText="Dashboard"
        showDate
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.purple1} />}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: styles.scrollContent.paddingVertical as number + tabBarHeight }]}
      >
        {isWFH && !(todayAttendance?.startTime && todayAttendance?.endTime) ? (
          <WFHAttendanceCard
            colors={colors}
            todayAttendance={todayAttendance}
            onCheckInOut={handleWFHCheckInOut}
            loading={wfhLoading}
          />
        ) : (
          <TodayAttendanceCard
            colors={colors}
            todayAttendance={todayAttendance}
            todayStatusMeta={todayStatusMeta}
            todayBottomText={todayBottomText}
          />
        )}
        {totalPendingApprovals > 0 && (
          <PendingApprovalCard colors={colors} count={totalPendingApprovals} onPress={openPendingApprovalsModal} />
        )}
        <AttendanceOverviewCard colors={colors} summary={attendanceSummary} onPress={goToAttendance} />
        <AttendanceBarChart records={records} colors={colors} />
        <InfoCardsRow
          colors={colors}
          totalLeaveBalance={totalLeaveBalance}
          upcomingHolidays={upcomingHolidays}
          onPressLeaveBalance={openLeaveModal}
          onPressHolidays={openHolidayModal}
        />
        <RequestLetterCard colors={colors} onPress={goToRequestLetter} />
        <AttendanceCalendarCard />
      </ScrollView>

      <LeaveBalanceModal
        visible={leaveModalVisible}
        colors={colors}
        leaveBalance={leaveBalance}
        totalLeaveBalance={totalLeaveBalance}
        onClose={closeLeaveModal}
      />

      <HolidaysModal
        visible={holidayModalVisible}
        colors={colors}
        holidays={upcomingHolidays}
        onClose={closeHolidayModal}
      />

      <PendingApprovalsModal
        visible={pendingApprovalsModalVisible}
        colors={colors}
        pendingLeaveCount={pendingrequ.length}
        pendingWfhCount={pendingWfhRequ.length}
        onPressLeave={goToPendingLeaveApprovals}
        onPressWfh={goToPendingWfhApprovals}
        onClose={closePendingApprovalsModal}
      />

      <LoadingBaseModal visible={loading} />
    </SafeAreaView>
  );
};

export default HomeScreen;
