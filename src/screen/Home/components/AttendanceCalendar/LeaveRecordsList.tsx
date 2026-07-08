import React, { useCallback } from 'react';
import { FlatList, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Icon from '../../../../components/Icons';
import { getLeaveIconMeta, getStatusMeta } from '../../../LeaveRequest/leaveRequest.constants';
import { scale, verticalScale } from '../../../../utils/responsive';
import { AppSizes } from '../../../../utils/AppSizes';
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
            <Icon type="Ionicons" name={iconMeta.name} size={scale(18)} color={iconMeta.color} />
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
    paddingVertical: AppSizes.PV_12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  iconBox: {
    width: scale(36),
    height: verticalScale(36),
    borderRadius: AppSizes.RADIUS_10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: AppSizes.MH_10,
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
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    flex: 1,
    marginRight: AppSizes.PH_8,
  },
  statusPill: {
    paddingHorizontal: AppSizes.PH_8,
    paddingVertical: verticalScale(3),
    borderRadius: AppSizes.RADIUS_20,
  },
  statusPillText: {
    fontSize: AppSizes.FONT_10,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  meta: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: AppSizes.MV_2,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: AppSizes.MV_20,
    fontFamily: 'PlusJakartaSans-Regular',
  },
});
