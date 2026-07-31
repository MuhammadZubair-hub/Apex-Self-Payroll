import React, { useCallback } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import PrimaryHeader from '../../components/header/PrimaryHeader';
import { attendanceStyles as styles } from './Attandance.styles';
import { useAttendance } from './Attandance.logic';
import { MONTH_NAMES } from './attandance.constants';
import AttendanceRecordCard from './components/AttendanceRecordCard';
import AttendanceListSkeleton from './components/AttendanceListSkeleton';
import AttendanceBarChart from './components/AttendanceBarChart';
import MonthYearPickerSheet from './components/MonthYearPickerSheet';
import EmployeePickerSheet from './components/EmployeePickerSheet';
import AttendanceDetailModal from './components/AttendanceDetailModal';
import { verticalScale } from '../../utils/responsive';
import { AppSizes } from '../../utils/AppSizes';

const AttendanceScreen = () => {
  const {
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
    selectedEmployee,
    employeePickerVisible,
    openEmployeePicker,
    closeEmployeePicker,
    selectEmployee,
    selectedRecord,
    recordModalVisible,
    openRecordModal,
    closeRecordModal,
  } = useAttendance();

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <Animated.View entering={FadeInDown.duration(350).delay(Math.min(index * 40, 400)).springify()}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => openRecordModal(item)}>
          <AttendanceRecordCard item={item} colors={colors} />
        </TouchableOpacity>
      </Animated.View>
    ),
    [colors, openRecordModal]
  );

  const keyExtractor = useCallback((item: any, index: number) => item.date || String(index), []);

  const hasManagedEmployees = isManager && employeesList.length > 1;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <PrimaryHeader headerText="Attendance" alignTextCenter />

      {/* Managed Employees Filter for Managers */}
      {hasManagedEmployees && (
        <Animated.View entering={FadeInDown.duration(300).springify()} style={styles.filterSection}>
          <TouchableOpacity
            style={[
              styles.employeeSelector,
              {
                backgroundColor: colors.secondPrimaryColor,
                borderColor: colors.borderColor || colors.purple1 + '30',
              },
            ]}
            onPress={openEmployeePicker}
            activeOpacity={0.7}
          >
            <View style={styles.employeeSelectorLeft}>
              <View style={[styles.employeeAvatar, { backgroundColor: colors.purple1 + '20' }]}>
                <Ionicons name="person-outline" size={AppSizes.ICON_16} color={colors.purple1} />
              </View>
              <View style={styles.employeeTextInfo}>
                <Text style={[styles.employeeLabel, { color: colors.textSecondary }]}>Select Employee</Text>
                <Text style={[styles.employeeName, { color: colors.textPrimary }]} numberOfLines={1}>
                  {selectedEmployee?.name || 'Select Employee'}
                  {selectedEmployee?.code ? ` (${selectedEmployee.code})` : ''}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-down-outline" size={AppSizes.ICON_20} color={colors.purple1} />
          </TouchableOpacity>
        </Animated.View>
      )}

      <Animated.View entering={FadeInDown.duration(350).delay(50).springify()}>
        <TouchableOpacity style={styles.monthNavRow} onPress={openMonthPicker} activeOpacity={0.7}>
          <Text style={[styles.monthNavText, { color: colors.textPrimary }]}>
            {MONTH_NAMES[month - 1]} {year}
          </Text>
          <Ionicons name="calendar-outline" size={AppSizes.ICON_20} color={colors.purple1} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View entering={FadeInDown.duration(350).delay(100).springify()} style={[styles.summaryRow, { backgroundColor: colors.secondPrimaryColor }]}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.greenColor }]}>{summary.present}</Text>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Present</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.redColor }]}>{summary.absent}</Text>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Absent</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.orangeColor }]}>{summary.pending}</Text>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Pending</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: colors.purple1 }]}>{summary.leave}</Text>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Leave</Text>
        </View>
      </Animated.View>

      {loading && !refreshing ? (
        <AttendanceListSkeleton colors={colors} />
      ) : (
        <FlatList
          data={records}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.purple1]} />}
          ListHeaderComponent={<AttendanceBarChart records={records} colors={colors} onSelectRecord={openRecordModal} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={verticalScale(48)} color={colors.textSecondary} />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No attendance records found</Text>
            </View>
          }
        />
      )}

      <MonthYearPickerSheet
        visible={monthPickerVisible}
        month={month}
        year={year}
        colors={colors}
        onClose={closeMonthPicker}
        onConfirm={selectMonthYear}
      />

      {hasManagedEmployees && (
        <EmployeePickerSheet
          visible={employeePickerVisible}
          employees={employeesList}
          selectedEmployeeId={selectedEmployee?.id}
          colors={colors}
          onClose={closeEmployeePicker}
          onSelect={selectEmployee}
        />
      )}

      <AttendanceDetailModal
        visible={recordModalVisible}
        record={selectedRecord}
        colors={colors}
        onClose={closeRecordModal}
      />
    </SafeAreaView>
  );
};

export default AttendanceScreen;
