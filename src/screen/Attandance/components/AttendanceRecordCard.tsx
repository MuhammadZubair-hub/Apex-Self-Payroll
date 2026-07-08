import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { attendanceStyles as styles } from '../Attandance.styles';
import { formatDayLabel, getRecordStatus, getStatusMeta } from '../attandance.constants';
import { formatTime } from '../../../utils/dateTime';
import { verticalScale } from '../../../utils/responsive';

const AttendanceRecordCard = ({ item, colors }: { item: any; colors: any }) => {
  const status = getRecordStatus(item);
  const meta = useMemo(() => getStatusMeta(colors)[status] || getStatusMeta(colors).Absent, [colors, status]);

  return (
    <View style={[styles.recordCard, { backgroundColor: colors.secondPrimaryColor }]}>
      <View style={styles.recordDateBox}>
        <Text style={[styles.recordDateText, { color: colors.textPrimary }]}>{formatDayLabel(item.date)}</Text>
        <Text style={[styles.recordDayText, { color: colors.textSecondary }]}>{item.day}</Text>
      </View>

      <View style={styles.recordBody}>
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

      <View style={[styles.statusPill, { backgroundColor: meta.bg }]}>
        <Ionicons name={meta.icon as any} size={verticalScale(12)} color={meta.color} />
        <Text style={[styles.statusPillText, { color: meta.color }]}>{meta.label}</Text>
      </View>
    </View>
  );
};

export default React.memo(AttendanceRecordCard);
