import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fold } from 'react-native-animated-spinkit';
import BottomSheet from '../../../../components/BottomSheet';
import MyButton from '../../../../components/MyButton';
import Icon from '../../../../components/Icons';
import { sharedStyles } from '../../components/sharedStyles';
import { formatDateRange, formatShortDate, getLeaveIconMeta, getStatusMeta } from '../../leaveRequest.constants';
import { scale, verticalScale, moderateScale } from '../../../../utils/responsive';
import { AppSizes } from '../../../../utils/AppSizes';
import { downloadAttachment } from '../../../../utils/downloadAttachment';

interface DetailRow {
  icon: string;
  label: string;
  value: string;
  iconColor?: string;
}

const DetailSection = ({ title, rows, colors }: { title: string; rows: DetailRow[]; colors: any }) => (
  <View style={styles.section}>
    <Text style={[styles.sectionTitle, { color: colors.textPrimary, borderBottomColor: colors.borderColor }]}>
      {title}
    </Text>
    {rows.map((row, index) => (
      <View key={index} style={styles.row}>
        <View style={styles.rowLeft}>
          <Icon type="Ionicons" name={row.icon} size={AppSizes.ICON_16} color={row.iconColor || colors.purple1} />
          <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>{row.label}</Text>
        </View>
        <Text style={[styles.rowValue, { color: colors.textPrimary }]} numberOfLines={4}>
          {row.value}
        </Text>
      </View>
    ))}
  </View>
);

const LeaveDetailModal = ({
  visible,
  item,
  colors,
  onClose,
}: {
  visible: boolean;
  item: any;
  colors: any;
  onClose: () => void;
}) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (!item?.attachmentPath) return;
    setDownloading(true);
    await downloadAttachment(item.attachmentPath, colors);
    setDownloading(false);
  }, [item?.attachmentPath, colors]);

  if (!item) return null;

  const statusMeta = getStatusMeta(colors)[item.requestStatus] || getStatusMeta(colors).Pending;
  const iconMeta = getLeaveIconMeta(colors, item.leaveName);
  const days = item.noOfDaysLeaveReq;

  const infoRows: DetailRow[] = [
    { icon: 'person-outline', label: 'Employee', value: item.name || 'N/A' },
    { icon: 'document-text-outline', label: 'Leave Type', value: item.leaveName?.trim() || 'N/A' },
    { icon: 'calendar-outline', label: 'Dates', value: formatDateRange(item.fromDate, item.toDate, ' - ') },
    { icon: 'reader-outline', label: 'Total Days', value: days === 1 ? '1 day' : `${days} days` },
    ...(item.remarks ? [{ icon: 'chatbubble-outline', label: 'Remarks', value: item.remarks }] : []),
  ];

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      colors={colors}
      title="Leave Application Details"
      scrollable
      footer={<MyButton text="Close" onPress={onClose} style={{ backgroundColor: colors.purple1, marginTop: scale(6) }} />}
    >
      <View style={styles.topRow}>
        <View style={[sharedStyles.cardIconBox, { backgroundColor: iconMeta.bg }]}>
          <Icon type="Ionicons" name={iconMeta.name} size={AppSizes.ICON_20} color={iconMeta.color} />
        </View>
        <View style={{ flex: 1, marginLeft: scale(12) }}>
          <Text style={[styles.leaveTitle, { color: colors.textPrimary }]}>{item.leaveName?.trim() || 'Leave'}</Text>
          <View style={[sharedStyles.statusPill, { backgroundColor: statusMeta.bg, alignSelf: 'flex-start', marginTop: verticalScale(4) }]}>
            <Text style={[sharedStyles.statusPillText, { color: statusMeta.color }]}>{statusMeta.label}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[styles.appliedOnLabel, { color: colors.textSecondary }]}>Applied on</Text>
          <Text style={[styles.appliedOnText, { color: colors.textPrimary }]}>{formatShortDate(item.date)}</Text>
        </View>
      </View>

      <DetailSection title="Application Information" rows={infoRows} colors={colors} />

      {item.attachmentPath ? (
        <TouchableOpacity
          style={[styles.attachmentRow, { borderColor: colors.borderColor }]}
          onPress={handleDownload}
          disabled={downloading}
        >
          <Icon type="Ionicons" name="document-attach-outline" size={verticalScale(18)} color={colors.purple1} />
          <Text style={[styles.attachmentText, { color: colors.textPrimary }]}>Attachment</Text>
          {downloading ? (
            <Fold size={AppSizes.ICON_20} color={colors.purple1} />
          ) : (
            <Icon type="Ionicons" name="download-outline" size={AppSizes.ICON_20} color={colors.purple1} />
          )}
        </TouchableOpacity>
      ) : null}
    </BottomSheet>
  );
};

export default React.memo(LeaveDetailModal);

const styles = StyleSheet.create({
  attachmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: AppSizes.GAP_10,
    paddingVertical: scale(12),
    paddingHorizontal: scale(14),
    borderWidth: 1,
    borderRadius: AppSizes.RADIUS_10,
  },
  attachmentText: {
    flex: 1,
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scale(18),
  },
  leaveTitle: {
    fontSize: AppSizes.FONT_16,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  appliedOnLabel: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  appliedOnText: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: AppSizes.MV_2,
  },
  section: {
    marginBottom: scale(18),
  },
  sectionTitle: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginBottom: scale(10),
    paddingBottom: scale(8),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scale(10),
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: AppSizes.GAP_8,
    flex: 1,
  },
  rowLabel: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Regular',
  },
  rowValue: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Medium',
    flex: 1,
    textAlign: 'right',
  },
});
