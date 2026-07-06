import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fold } from 'react-native-animated-spinkit';
import Icon from '../../../../components/Icons';
import { scale } from '../../../../utils/responsive';
import { homeStyles } from '../../Home.styles';
import { MONTH_NAMES } from './attendanceCalendar.constants';
import AttendanceCalendarGrid from './AttendanceCalendarGrid';
import DepartmentPickerSheet from './DepartmentPickerSheet';
import LeaveDetailsSheet from './LeaveDetailsSheet';
import { useAttendanceCalendar } from './useAttendanceCalendar';

const AttendanceCalendarCard = () => {
  const navigation = useNavigation<any>();
  const {
    colors,
    checkingAccess,
    isManager,
    month,
    year,
    departments,
    departmentId,
    selectedDepartmentName,
    selectDepartment,
    markedDates,
    loading,
    detailsVisible,
    detailsRecords,
    openDetails,
    closeDetails,
  } = useAttendanceCalendar();

  const [departmentPickerVisible, setDepartmentPickerVisible] = useState(false);
  const openDepartmentPicker = useCallback(() => setDepartmentPickerVisible(true), []);
  const closeDepartmentPicker = useCallback(() => setDepartmentPickerVisible(false), []);
  const goToHistory = useCallback(() => navigation.navigate('leaveCalendarHistory'), [navigation]);

  if (checkingAccess || !isManager) return null;

  return (
    <View style={[homeStyles.card, { backgroundColor: colors.secondPrimaryColor }]}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Icon type="Ionicons" name="calendar-outline" size={18} color={colors.purple1} />
          <Text style={[styles.headerText, { color: colors.textPrimary }]}>
            {MONTH_NAMES[month - 1]} {year}
          </Text>
        </View>
        <TouchableOpacity onPress={goToHistory} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Icon type="Ionicons" name="filter" size={20} color={colors.primarayheaderColor} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.departmentField, { borderColor: colors.borderColor, backgroundColor: colors.primaryColor }]}
        onPress={openDepartmentPicker}
      >
        <Text style={[styles.departmentText, { color: colors.textPrimary }]} numberOfLines={1}>
          {selectedDepartmentName}
        </Text>
        <Icon type="Ionicons" name="chevron-down" size={16} color={colors.textSecondary} />
      </TouchableOpacity>

      {loading ? (
        <View style={styles.loadingBox}>
          <Fold size={28} color={colors.purple1} />
        </View>
      ) : (
        <AttendanceCalendarGrid
          month={month}
          year={year}
          markedDates={markedDates}
          colors={colors}
          onPressDay={(key, records) => openDetails(key)}
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

      <TouchableOpacity style={styles.detailsButton} onPress={() => openDetails()}>
        <Text style={[styles.detailsButtonText, { color: colors.purple1 }]}>View Details</Text>
        <Icon type="Ionicons" name="chevron-forward" size={16} color={colors.purple1} />
      </TouchableOpacity>

      <DepartmentPickerSheet
        visible={departmentPickerVisible}
        colors={colors}
        departments={departments}
        selectedId={departmentId}
        onSelect={selectDepartment}
        onClose={closeDepartmentPicker}
      />

      <LeaveDetailsSheet visible={detailsVisible} colors={colors} records={detailsRecords} onClose={closeDetails} />
    </View>
  );
};

export default React.memo(AttendanceCalendarCard);

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(14),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  headerText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  departmentField: {
    height: scale(42),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: scale(12),
    marginBottom: scale(14),
  },
  departmentText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
    flex: 1,
    marginRight: 6,
  },
  loadingBox: {
    height: scale(180),
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendRow: {
    flexDirection: 'row',
    gap: scale(16),
    marginTop: scale(14),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(4),
    marginTop: scale(16),
  },
  detailsButtonText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});
