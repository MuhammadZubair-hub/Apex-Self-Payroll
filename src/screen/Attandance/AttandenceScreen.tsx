import React, { useCallback } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
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
  } = useAttendance();

  const renderItem = useCallback(({ item }: { item: any }) => <AttendanceRecordCard item={item} colors={colors} />, [colors]);
  const keyExtractor = useCallback((item: any, index: number) => item.date || String(index), []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <PrimaryHeader headerText="Attendance"  alignTextCenter/>

      <TouchableOpacity style={styles.monthNavRow} onPress={openMonthPicker} activeOpacity={0.7}>
        <Text style={[styles.monthNavText, { color: colors.textPrimary }]}>
          {MONTH_NAMES[month - 1]} {year}
        </Text>
        <Ionicons name="calendar-outline" size={20} color={colors.purple1} />
      </TouchableOpacity>

      <View style={[styles.summaryRow, { backgroundColor: colors.secondPrimaryColor }]}>
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
      </View>

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
          ListHeaderComponent={<AttendanceBarChart records={records} colors={colors} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={48} color={colors.textSecondary} />
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
    </SafeAreaView>
  );
};

export default AttendanceScreen;
