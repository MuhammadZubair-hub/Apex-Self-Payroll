import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import Icon from '../../../components/Icons';
import { getRecordStatus, getStatusMeta } from '../attandance.constants';
import { formatTime } from '../../../utils/dateTime';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

interface AttendanceDetailModalProps {
  visible: boolean;
  record: any | null;
  colors: any;
  onClose: () => void;
}

const formatDateHeader = (dateStr?: string, dayName?: string) => {
  if (!dateStr) return dayName || '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return `${dayName ? `${dayName}, ` : ''}${dateStr}`;
  const day = d.getDate();
  const monthStr = d.toLocaleString('en', { month: 'long' });
  const year = d.getFullYear();
  return `${dayName ? `${dayName}, ` : ''}${day} ${monthStr} ${year}`;
};

const AttendanceDetailModal = ({ visible, record, colors, onClose }: AttendanceDetailModalProps) => {
  const status = useMemo(() => (record ? getRecordStatus(record) : 'Absent'), [record]);
  const meta = useMemo(
    () => (colors ? getStatusMeta(colors)[status] || getStatusMeta(colors).Absent : null),
    [colors, status]
  );

  if (!record) return null;

  const startTimeStr = formatTime(record.startTime);
  const endTimeStr = formatTime(record.endTime);
  const totalHoursStr = record.totalHours ? `${record.totalHours} hrs` : '--';
  const workingHoursStr = record.workingHours ? `${record.workingHours} hrs` : '--';

  return (
    <BottomSheet visible={visible} onClose={onClose} colors={colors} title="Attendance Details" showCloseIcon maxHeight="85%">
      <View style={styles.container}>
        {/* Date & Status Header Card */}
        <View style={[styles.headerCard, { backgroundColor: colors.primaryColor, borderColor: colors.borderColor || '#E5E7EB' }]}>
          <View style={styles.headerInfo}>
            <Text style={[styles.dateText, { color: colors.textPrimary }]}>
              {formatDateHeader(record.date, record.day)}
            </Text>
          </View>

          {meta && (
            <View style={[styles.statusPill, { backgroundColor: meta.bg }]}>
              <Icon type="Ionicons" name={meta.icon} size={AppSizes.ICON_16} color={meta.color} />
              <Text style={[styles.statusText, { color: meta.color }]}>{meta.label}</Text>
            </View>
          )}
        </View>

        {/* Metrics Grid */}
        <View style={styles.grid}>
          {/* Check In */}
          <View style={[styles.gridItem, { backgroundColor: colors.primaryColor }]}>
            <View style={[styles.iconBox, { backgroundColor: colors.greenColor + '15' }]}>
              <Icon type="Ionicons" name="log-in-outline" size={AppSizes.ICON_20} color={colors.greenColor} />
            </View>
            <Text style={[styles.gridLabel, { color: colors.textSecondary }]}>Check In</Text>
            <Text style={[styles.gridValue, { color: colors.textPrimary }]}>{startTimeStr}</Text>
          </View>

          {/* Check Out */}
          <View style={[styles.gridItem, { backgroundColor: colors.primaryColor }]}>
            <View style={[styles.iconBox, { backgroundColor: colors.redColor + '15' }]}>
              <Icon type="Ionicons" name="log-out-outline" size={AppSizes.ICON_20} color={colors.redColor} />
            </View>
            <Text style={[styles.gridLabel, { color: colors.textSecondary }]}>Check Out</Text>
            <Text style={[styles.gridValue, { color: colors.textPrimary }]}>{endTimeStr}</Text>
          </View>

          {/* Total Hours */}
          <View style={[styles.gridItem, { backgroundColor: colors.primaryColor }]}>
            <View style={[styles.iconBox, { backgroundColor: colors.purple1 + '15' }]}>
              <Icon type="Ionicons" name="time-outline" size={AppSizes.ICON_20} color={colors.purple1} />
            </View>
            <Text style={[styles.gridLabel, { color: colors.textSecondary }]}>Total Hours</Text>
            <Text style={[styles.gridValue, { color: colors.textPrimary }]}>{totalHoursStr}</Text>
          </View>

          {/* Working Hours */}
          <View style={[styles.gridItem, { backgroundColor: colors.primaryColor }]}>
            <View style={[styles.iconBox, { backgroundColor: colors.orangeColor + '15' }]}>
              <Icon type="Ionicons" name="briefcase-outline" size={AppSizes.ICON_20} color={colors.orangeColor} />
            </View>
            <Text style={[styles.gridLabel, { color: colors.textSecondary }]}>Shift Hours</Text>
            <Text style={[styles.gridValue, { color: colors.textPrimary }]}>{workingHoursStr}</Text>
          </View>
        </View>



        {/* Leave Type if status is Leave */}
        {status === 'Leave' && record.leaveType && (
          <View style={[styles.infoRow, { backgroundColor: colors.primaryColor }]}>
            <Icon type="Ionicons" name="airplane-outline" size={AppSizes.ICON_20} color={colors.purple1} />
            <View style={styles.infoTextContainer}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Leave Type</Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{record.leaveType.trim()}</Text>
            </View>
          </View>
        )}

        {/* Absent reason if available */}
        {status === 'Absent' && record.absentReason && (
          <View style={[styles.infoRow, { backgroundColor: colors.primaryColor }]}>
            <Icon type="Ionicons" name="alert-circle-outline" size={AppSizes.ICON_20} color={colors.redColor} />
            <View style={styles.infoTextContainer}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Absent Reason</Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{record.absentReason}</Text>
            </View>
          </View>
        )}

        {/* Remarks if available */}
        {record.remarks ? (
          <View style={[styles.infoRow, { backgroundColor: colors.primaryColor }]}>
            <Icon type="Ionicons" name="document-text-outline" size={AppSizes.ICON_20} color={colors.textSecondary} />
            <View style={styles.infoTextContainer}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Remarks</Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>{record.remarks}</Text>
            </View>
          </View>
        ) : null}

        {/* Close Button */}
        <TouchableOpacity
          style={[styles.closeBtn, { backgroundColor: colors.purple1 }]}
          onPress={onClose}
          activeOpacity={0.8}
        >
          <Text style={styles.closeBtnText}>Close</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default React.memo(AttendanceDetailModal);

const styles = StyleSheet.create({
  container: {
    paddingBottom: scale(10),
  },
  headerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(14),
    borderRadius: scale(12),
    borderWidth: 1,
    marginBottom: scale(14),
  },
  headerInfo: {
    flex: 1,
    marginRight: scale(10),
  },
  dateText: {
    fontSize: AppSizes.FONT_16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(20),
  },
  statusText: {
    fontSize: moderateScale(11),
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  gridItem: {
    width: '48%',
    padding: scale(12),
    borderRadius: scale(12),
    marginBottom: scale(10),
  },
  iconBox: {
    width: scale(34),
    height: scale(34),
    borderRadius: scale(17),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  gridLabel: {
    fontSize: moderateScale(11),
    fontFamily: 'PlusJakartaSans-Regular',
  },
  gridValue: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Bold',
    marginTop: verticalScale(2),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    borderRadius: scale(12),
    marginBottom: scale(10),
  },
  infoTextContainer: {
    marginLeft: scale(10),
    flex: 1,
  },
  infoLabel: {
    fontSize: moderateScale(11),
    fontFamily: 'PlusJakartaSans-Regular',
  },
  infoValue: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginTop: verticalScale(2),
  },
  closeBtn: {
    height: verticalScale(44),
    borderRadius: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(6),
  },
  closeBtnText: {
    color: '#FFFFFF',
    fontSize: AppSizes.FONT_16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
});
