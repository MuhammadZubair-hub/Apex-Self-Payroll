import React, { useCallback } from 'react';
import { FlatList, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Icon from '../../../../components/Icons';
import { getLeaveIconMeta, getStatusMeta } from '../../../LeaveRequest/leaveRequest.constants';
import { LeaveCalendarRecord } from './attendanceCalendar.constants';

interface LeaveRecordsListProps {
  colors: any;
  records: LeaveCalendarRecord[];
  style?: StyleProp<ViewStyle>;
  emptyText?: string;
}

const formatRecordRange = (record: LeaveCalendarRecord) => {
  const from = new Date(record.fromDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  const to = new Date(record.toDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  return record.fromDate === record.toDate ? to : `${from} - ${to}`;
};

const LeaveRecordsList = ({ colors, records, style, emptyText = 'No one on leave for this selection' }: LeaveRecordsListProps) => {
  const renderItem = useCallback(
    ({ item }: { item: LeaveCalendarRecord }) => {
      const iconMeta = getLeaveIconMeta(colors, item.leaveType);
      const statusMeta = getStatusMeta(colors)[item.status] || getStatusMeta(colors).Pending;

      return (
        <View style={[styles.row, { borderColor: colors.borderColor }]}>
          <View style={[styles.iconBox, { backgroundColor: iconMeta.bg }]}>
            <Icon type="Ionicons" name={iconMeta.name} size={18} color={iconMeta.color} />
          </View>
          <View style={styles.body}>
            <View style={styles.titleRow}>
              <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={1}>
                {item.employeeName}
              </Text>
              <View style={[styles.statusPill, { backgroundColor: statusMeta.bg }]}>
                <Text style={[styles.statusPillText, { color: statusMeta.color }]}>{item.status}</Text>
              </View>
            </View>
            <Text style={[styles.meta, { color: colors.textSecondary }]} numberOfLines={1}>
              {item.leaveType?.trim()} &bull; {item.department}
            </Text>
            <Text style={[styles.meta, { color: colors.textSecondary }]}>
              {formatRecordRange(item)} &bull; {item.noOfDays === 1 ? '1 day' : `${item.noOfDays} days`}
            </Text>
          </View>
        </View>
      );
    },
    [colors]
  );
  const keyExtractor = useCallback(
    (item: LeaveCalendarRecord, index: number) => `${item.empID}-${item.fromDate}-${index}`,
    []
  );

  if (records.length === 0) {
    return <Text style={[styles.emptyText, { color: colors.textSecondary }]}>{emptyText}</Text>;
  }

  return (
    <FlatList
      data={records}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      style={style}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default React.memo(LeaveRecordsList);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  body: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    flex: 1,
    marginRight: 8,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  statusPillText: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  meta: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'PlusJakartaSans-Regular',
  },
});
