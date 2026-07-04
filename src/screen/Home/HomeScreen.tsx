import React from 'react';
import { RefreshControl, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryHeader from '../../components/header/PrimaryHeader';
import LoadingBaseModal from '../../components/Loader/LoadingBaseModal';
import { homeStyles as styles } from './Home.styles';
import { useHome } from './Home.logic';
import TodayAttendanceCard from './components/TodayAttendanceCard';
import AttendanceOverviewCard from './components/AttendanceOverviewCard';
import InfoCardsRow from './components/InfoCardsRow';
import QuickActionsGrid from './components/QuickActionsGrid';
import LeaveBalanceModal from './components/LeaveBalanceModal';

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
    openLeaveModal,
    closeLeaveModal,
    goToAttendance,
  } = useHome();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <StatusBar backgroundColor={colors.primarayheaderColor} />
      <PrimaryHeader headerText="Dashboard" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.purple1} />}
        contentContainerStyle={styles.scrollContent}
      >
        <TodayAttendanceCard
          colors={colors}
          todayAttendance={todayAttendance}
          todayStatusMeta={todayStatusMeta}
          todayBottomText={todayBottomText}
        />

        <AttendanceOverviewCard colors={colors} summary={attendanceSummary} onPress={goToAttendance} />

        <InfoCardsRow
          colors={colors}
          totalLeaveBalance={totalLeaveBalance}
          upcomingHolidays={upcomingHolidays}
          onPressLeaveBalance={openLeaveModal}
        />

        <QuickActionsGrid colors={colors} />
      </ScrollView>

      <LeaveBalanceModal
        visible={leaveModalVisible}
        colors={colors}
        leaveBalance={leaveBalance}
        totalLeaveBalance={totalLeaveBalance}
        onClose={closeLeaveModal}
      />

      <LoadingBaseModal visible={loading} />
    </SafeAreaView>
  );
};

export default HomeScreen;
