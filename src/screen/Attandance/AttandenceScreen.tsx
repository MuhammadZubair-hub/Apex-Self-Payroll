
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useThemeContext } from '../../theme/ThemeContex';
import { getColors } from '../../theme/color/theme';
import { getUser } from '../../redux/slices/authSlice';
import { baseUrl, endPoints } from '../../services/Constants/endPoints';
import Ionicons from '@react-native-vector-icons/ionicons';
import PrimaryHeader from '../../components/header/PrimaryHeader';
import { scale } from '../../utils/responsive';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const formatTime = (time?: string | null) => {
  if (!time) return '--:--';
  const [h, m] = time.split(':');
  const hourNum = parseInt(h, 10);
  if (isNaN(hourNum)) return '--:--';
  const period = hourNum >= 12 ? 'PM' : 'AM';
  const hour12 = hourNum % 12 === 0 ? 12 : hourNum % 12;
  return `${String(hour12).padStart(2, '0')}:${m} ${period}`;
};

const formatDayLabel = (dateString: string) => {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, '0')} ${date.toLocaleString('en', { month: 'short' })}`;
};

const getRecordStatus = (record: any) => {
  if (record.attendanceStatus === 'Absent') {
    const recordDate = new Date(record.date);
    recordDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (recordDate.getTime() > today.getTime()) return 'Pending';
  }
  return record.attendanceStatus;
};

const AttendanceScreen = () => {
  const { theme } = useThemeContext();
  const colors = getColors(theme);
  const userData = useSelector(getUser);


  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const statusMeta: Record<string, { label: string; bg: string; color: string; icon: string }> = {
    Present: { label: 'Present', bg: colors.successBg, color: colors.successText, icon: 'checkmark-circle' },
    Absent: { label: 'Absent', bg: colors.dangerBg, color: colors.dangerText, icon: 'close-circle' },
    Pending: { label: 'Pending', bg: colors.warningBg, color: colors.warningText, icon: 'time' },
    Leave: { label: 'On Leave', bg: colors.lightPurple, color: colors.purple1, icon: 'airplane' },
  };

  const fetchAttendance = async () => {
    if (!userData?.employeeId) return;
    try {
      const url = `${baseUrl}${endPoints.MonthlyAttendance}?EmployeeId=${userData.employeeId}&Month=${month}&Year=${year}`;
      const response = await fetch(url);
      const json = await response.json();
      if (json.status) {
        setRecords(json.data || []);
      } else {
        setRecords([]);
      }
    } catch (err) {
      console.error('Error fetching attendance:', err);
      setRecords([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAttendance();
  }, [userData?.employeeId, month, year]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAttendance();
  };

  const goToPrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  const summary = records.reduce(
    (acc, record) => {
      const status = getRecordStatus(record);
      if (status === 'Present') acc.present++;
      else if (status === 'Absent') acc.absent++;
      else if (status === 'Pending') acc.pending++;
      else if (status === 'Leave') acc.leave++;
      return acc;
    },
    { present: 0, absent: 0, pending: 0, leave: 0 }
  );

  const renderItem = ({ item }: { item: any }) => {
    const status = getRecordStatus(item);
    const meta = statusMeta[status] || statusMeta.Absent;

    return (
      <View style={[styles.recordCard, { backgroundColor: colors.secondPrimaryColor }]}>
        <View style={styles.recordDateBox}>
          <Text style={[styles.recordDateText, { color: colors.textPrimary }]}>
            {formatDayLabel(item.date)}
          </Text>
          <Text style={[styles.recordDayText, { color: colors.textSecondary }]}>{item.day}</Text>
        </View>

        <View style={styles.recordBody}>
          <View style={styles.recordTopRow}>
            <View style={[styles.statusPill, { backgroundColor: meta.bg }]}>
              <Ionicons name={meta.icon as any} size={12} color={meta.color} />
              <Text style={[styles.statusPillText, { color: meta.color }]}>{meta.label}</Text>
            </View>
          </View>

          {status === 'Present' ? (
            <Text style={[styles.recordDetailText, { color: colors.textSecondary }]}>
              {formatTime(item.startTime)} - {formatTime(item.endTime)}
              {item.workingHours ? ` • ${item.workingHours}h worked` : ''}
            </Text>
          ) : status === 'Leave' ? (
            <Text style={[styles.recordDetailText, { color: colors.textSecondary }]} numberOfLines={1}>
              {item.leaveType?.trim() || 'Leave'}
            </Text>
          ) : status === 'Absent' && item.absentReason ? (
            <Text style={[styles.recordDetailText, { color: colors.textSecondary }]} numberOfLines={1}>
              {item.absentReason}
            </Text>
          ) : null}

          {item.remarks ? (
            <Text style={[styles.recordRemarks, { color: colors.textSecondary }]} numberOfLines={2}>
              {item.remarks}
            </Text>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <PrimaryHeader headerText="Attendance" />

      <View style={styles.monthNavRow}>
        <TouchableOpacity onPress={goToPrevMonth}>
          <Ionicons name="chevron-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.monthNavText, { color: colors.textPrimary }]}>
          {MONTH_NAMES[month - 1]} {year}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Ionicons name="chevron-forward" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

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

      <FlatList
        data={records}
        keyExtractor={(item, index) => item.date || String(index)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.purple1]} />}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={48} color={colors.textSecondary} />
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                No attendance records found
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default AttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  monthNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingVertical: scale(14),
  },
  monthNavText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scale(16),
    marginBottom: scale(12),
    padding: scale(14),
    borderRadius: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  summaryLabel: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 2,
  },
  listContent: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(24),
  },
  recordCard: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: scale(14),
    marginBottom: scale(10),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  recordDateBox: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordDateText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  recordDayText: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 2,
  },
  recordBody: {
    flex: 1,
    marginLeft: scale(12),
  },
  recordTopRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  statusPillText: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  recordDetailText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  recordRemarks: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 4,
    fontStyle: 'italic',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 10,
  },
});
