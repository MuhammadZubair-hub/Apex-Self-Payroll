import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import MyButton from '../../../components/MyButton';
import Icon from '../../../components/Icons';
import { sharedStyles } from '../../LeaveRequest/components/sharedStyles';
import { formatDateRange, formatShortDate, getStatusMeta } from '../../LeaveRequest/leaveRequest.constants';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

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

interface WFHDetailModalProps {
  visible: boolean;
  item: any;
  colors: any;
  onClose: () => void;
}

const WFHDetailModal = ({ visible, item, colors, onClose }: WFHDetailModalProps) => {
  if (!item) return null;

  const rawStatus = item.requestStatus || item.RequestStatus || (item.flgApproved ? 'Approved' : 'Pending');
  const statusMeta = getStatusMeta(colors)[rawStatus] || getStatusMeta(colors).Pending;

  const days = item.noOfDaysWFHReq || item.NoOfDaysWFHReq || 1;
  const reasonText = item.reason || item.Reason || 'Work From Home';
  const employeeName = item.name || item.employeeName || item.EmployeeName || 'Employee';
  const designation = item.empDesignation || item.EmpDesignation;
  const department = item.empDepartment || item.EmpDepartment;
  const fromDate = item.fromDate || item.FromDate;
  const toDate = item.toDate || item.ToDate;
  const appliedDate = item.createdDate || item.date || fromDate;

  const infoRows: DetailRow[] = [
    { icon: 'person-outline', label: 'Employee', value: employeeName },
    ...(designation ? [{ icon: 'briefcase-outline', label: 'Designation', value: designation }] : []),
    ...(department ? [{ icon: 'business-outline', label: 'Department', value: department }] : []),
    { icon: 'calendar-outline', label: 'FromDate', value: formatShortDate(fromDate) },
    { icon: 'calendar-outline', label: 'ToDate', value: formatShortDate(toDate) },
    { icon: 'reader-outline', label: 'Total Days', value: days === 1 ? '1 day' : `${days} days` },
    { icon: 'chatbubble-outline', label: 'Reason', value: reasonText },
  ];

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      colors={colors}
      title="WFH Request Details"
      scrollable
      footer={<MyButton text="Close" onPress={onClose} style={{ backgroundColor: colors.purple1, marginTop: scale(6) }} />}
    >
      <View style={styles.topRow}>
        <View style={[sharedStyles.cardIconBox, { backgroundColor: colors.successBg }]}>
          <Icon type="Ionicons" name="laptop-outline" size={AppSizes.ICON_20} color={colors.greenColor} />
        </View>
        <View style={{ flex: 1, marginLeft: scale(12) }}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Work From Home</Text>
          
        </View>
      
          <View style={{ alignItems: 'flex-end' }}>
           <View style={[sharedStyles.statusPill, { backgroundColor: statusMeta.bg, alignSelf: 'flex-start', marginTop: verticalScale(4) }]}>
            <Text style={[sharedStyles.statusPillText, { color: statusMeta.color }]}>{statusMeta.label}</Text>
          </View> 
          
             </View>
     
      </View>

      <DetailSection title="Application Information" rows={infoRows} colors={colors} />
    </BottomSheet>
  );
};

export default React.memo(WFHDetailModal);

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scale(18),
  },
  title: {
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
