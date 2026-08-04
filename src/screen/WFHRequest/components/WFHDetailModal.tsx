import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import Icon from '../../../components/Icons';
import FieldLabel from '../../LeaveRequest/components/FieldLabel';
import { sharedStyles } from '../../LeaveRequest/components/sharedStyles';
import { formatDateRange, formatShortDate, getStatusMeta } from '../../LeaveRequest/leaveRequest.constants';
import { scale, verticalScale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

interface WFHDetailModalProps {
  visible: boolean;
  item: any;
  colors: any;
  onClose: () => void;
}

const WFHDetailModal = ({ visible, item, colors, onClose }: WFHDetailModalProps) => {
  const statusMeta = useMemo(() => {
    if (!item) return getStatusMeta(colors).Pending;
    const rawStatus = item.requestStatus || item.RequestStatus || (item.flgApproved ? 'Approved' : 'Pending');
    return getStatusMeta(colors)[rawStatus] || getStatusMeta(colors).Pending;
  }, [colors, item]);

  if (!item) return null;

  const days = item.noOfDaysWFHReq || item.NoOfDaysWFHReq || 1;
  const reasonText = item.reason || item.Reason || 'Work From Home';
  const employeeName = item.name || item.employeeName || item.EmployeeName || 'Employee';
  const designation = item.empDesignation || item.EmpDesignation || 'N/A';
  const department = item.empDepartment || item.EmpDepartment || 'N/A';
  const fromDate = item.fromDate || item.FromDate;
  const toDate = item.toDate || item.ToDate;
  const appliedDate = item.createdDate || item.date || fromDate;

  return (
    <BottomSheet visible={visible} onClose={onClose} colors={colors} title="WFH Request Details">
      <View style={styles.detailCard}>
        <View style={styles.detailHeader}>
          <View style={[styles.detailIconBox, { backgroundColor: colors.lightPurple }]}>
            <Icon type="Ionicons" name="laptop-outline" size={AppSizes.ICON_24} color={colors.purple1} />
          </View>
          <View style={{ flex: 1, marginLeft: scale(12) }}>
            <Text style={[styles.detailTitle, { color: colors.textPrimary }]}>Work From Home</Text>
            <Text style={[styles.detailSubTitle, { color: colors.textSecondary }]}>
              {employeeName} &bull; {designation}
            </Text>
          </View>
          <View style={[sharedStyles.statusPill, { backgroundColor: statusMeta.bg }]}>
            <Text style={[sharedStyles.statusPillText, { color: statusMeta.color }]}>{statusMeta.label}</Text>
          </View>
        </View>

        <FieldLabel text="Duration" colors={colors} />
        <View style={[styles.infoRow, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}>
          <Icon type="Ionicons" name="calendar-outline" size={AppSizes.ICON_20} color={colors.purple1} />
          <View style={{ marginLeft: scale(10), flex: 1 }}>
            <Text style={[styles.infoRowTitle, { color: colors.textPrimary }]}>{formatDateRange(fromDate, toDate)}</Text>
            <Text style={[styles.infoRowSub, { color: colors.textSecondary }]}>
              {days === 1 ? '1 day' : `${days} days`}
            </Text>
          </View>
        </View>

        <FieldLabel text="Department" colors={colors} />
        <View style={[styles.infoRow, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}>
          <Icon type="Ionicons" name="business-outline" size={AppSizes.ICON_20} color={colors.purple1} />
          <Text style={[styles.infoRowTitle, { color: colors.textPrimary, marginLeft: scale(10) }]}>{department}</Text>
        </View>

        {appliedDate && (
          <>
            <FieldLabel text="Applied On" colors={colors} />
            <View style={[styles.infoRow, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}>
              <Icon type="Ionicons" name="time-outline" size={AppSizes.ICON_20} color={colors.purple1} />
              <Text style={[styles.infoRowTitle, { color: colors.textPrimary, marginLeft: scale(10) }]}>
                {formatShortDate(appliedDate)}
              </Text>
            </View>
          </>
        )}

        <FieldLabel text="Reason" colors={colors} />
        <View style={[sharedStyles.remarksBox, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}>
          <Text style={[sharedStyles.remarksInput, { color: colors.textPrimary }]}>{reasonText}</Text>
        </View>
      </View>
    </BottomSheet>
  );
};

export default React.memo(WFHDetailModal);

const styles = StyleSheet.create({
  detailCard: {
    paddingBottom: verticalScale(10),
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(16),
  },
  detailIconBox: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(23),
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: AppSizes.FONT_16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  detailSubTitle: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: verticalScale(2),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    borderRadius: AppSizes.RADIUS_12,
    borderWidth: 1,
    marginBottom: verticalScale(8),
  },
  infoRowTitle: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  infoRowSub: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: verticalScale(2),
  },
});
