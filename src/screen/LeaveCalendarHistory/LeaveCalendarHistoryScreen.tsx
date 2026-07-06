import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Fold } from 'react-native-animated-spinkit';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../../components/Icons';
import MyButton from '../../components/MyButton';
import PrimaryHeader from '../../components/header/PrimaryHeader';
import MonthYearPickerSheet from '../Attandance/components/MonthYearPickerSheet';
import { MONTH_NAMES } from '../Home/components/AttendanceCalendar/attendanceCalendar.constants';
import AttendanceCalendarGrid from '../Home/components/AttendanceCalendar/AttendanceCalendarGrid';
import DepartmentPickerSheet from '../Home/components/AttendanceCalendar/DepartmentPickerSheet';
import LeaveRecordsList from '../Home/components/AttendanceCalendar/LeaveRecordsList';
import { useAttendanceCalendar } from '../Home/components/AttendanceCalendar/useAttendanceCalendar';
import { leaveCalendarHistoryStyles as styles } from './LeaveCalendarHistory.styles';

const LeaveCalendarHistoryScreen = () => {
  const {
    colors,
    checkingAccess,
    isManager,
    month,
    year,
    departments,
    departmentId,
    selectedDepartmentName,
    setDepartmentId,
    onPressGet,
    selectMonthYear,
    records,
    markedDates,
    loading,
    openDetails,
    detailsRecords,
    detailsVisible,
    closeDetails,
  } = useAttendanceCalendar();

  const [monthPickerVisible, setMonthPickerVisible] = useState(false);
  const [departmentPickerVisible, setDepartmentPickerVisible] = useState(false);

  if (!checkingAccess && !isManager) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
        <PrimaryHeader headerText="Leave Calendar" alignTextCenter />
        <View style={styles.accessDeniedBox}>
          <Icon type="Ionicons" name="lock-closed-outline" size={40} color={colors.textSecondary} />
          <Text style={[styles.accessDeniedText, { color: colors.textSecondary }]}>
            This calendar is only available to managers.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <PrimaryHeader headerText="Leave Calendar" alignTextCenter />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={[styles.monthNavRow, { backgroundColor: colors.secondPrimaryColor }]}
          onPress={() => setMonthPickerVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={[styles.monthNavText, { color: colors.textPrimary }]}>
            {MONTH_NAMES[month - 1]} {year}
          </Text>
          <Icon type="Ionicons" name="calendar-outline" size={20} color={colors.purple1} />
        </TouchableOpacity>

        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[styles.departmentField, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
            onPress={() => setDepartmentPickerVisible(true)}
          >
            <Text style={[styles.departmentText, { color: colors.textPrimary }]} numberOfLines={1}>
              {selectedDepartmentName}
            </Text>
            <Icon type="Ionicons" name="chevron-down" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
          <MyButton
            text="Get"
            onPress={onPressGet}
            style={{ ...styles.getButton, backgroundColor: colors.primarayheaderColor }}
          />
        </View>

        <View style={[styles.calendarCard, { backgroundColor: colors.secondPrimaryColor }]}>
          {loading ? (
            <View style={styles.loadingBox}>
              <Fold size={32} color={colors.purple1} />
            </View>
          ) : (
            <AttendanceCalendarGrid
              month={month}
              year={year}
              markedDates={markedDates}
              colors={colors}
              onPressDay={(key) => openDetails(key)}
            />
          )}

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.purple1 }]} />
              <Text style={[styles.legendText, { color: colors.textSecondary }]}>On Leave</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: colors.redColor }]} />
              <Text style={[styles.legendText, { color: colors.textSecondary }]}>Today</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionTitleRow}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            {detailsVisible ? 'Selected Day' : `All Leaves in ${MONTH_NAMES[month - 1]}`}
          </Text>
          {detailsVisible && (
            <TouchableOpacity onPress={closeDetails} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={[styles.clearFilterText, { color: colors.purple1 }]}>Show all</Text>
            </TouchableOpacity>
          )}
        </View>
        <LeaveRecordsList colors={colors} records={detailsVisible ? detailsRecords : records} />
      </ScrollView>

      <MonthYearPickerSheet
        visible={monthPickerVisible}
        month={month}
        year={year}
        colors={colors}
        onClose={() => setMonthPickerVisible(false)}
        onConfirm={(selectedMonth, selectedYear) => {
          selectMonthYear(selectedMonth, selectedYear);
          setMonthPickerVisible(false);
        }}
      />

      <DepartmentPickerSheet
        visible={departmentPickerVisible}
        colors={colors}
        departments={departments}
        selectedId={departmentId}
        onSelect={setDepartmentId}
        onClose={() => setDepartmentPickerVisible(false)}
      />
    </SafeAreaView>
  );
};

export default LeaveCalendarHistoryScreen;
