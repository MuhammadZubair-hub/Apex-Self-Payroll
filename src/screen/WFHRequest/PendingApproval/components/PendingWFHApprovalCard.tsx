import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../../components/Icons';
import { sharedStyles } from '../../../LeaveRequest/components/sharedStyles';
import { formatDateRange } from '../../../LeaveRequest/leaveRequest.constants';
import { pendingApprovalStyles as styles } from '../../../LeaveRequest/PendingApproval/PendingApproval.styles';
import { AppSizes } from '../../../../utils/AppSizes';
import { verticalScale } from '../../../../utils/responsive';

interface PendingWFHApprovalCardProps {
  item: any;
  colors: any;
  onApprove: (item: any) => void;
  onReject: (item: any) => void;
}

const PendingWFHApprovalCard = ({ item, colors, onApprove, onReject }: PendingWFHApprovalCardProps) => {
  const requesterName = item.employeeName || item.EmployeeName || item.name || 'Employee';
  const days = item.noOfDaysWFHReq ?? item.NoOfDaysWFHReq ?? item.days ?? 1;
  const reasonText = item.reason || item.Reason || 'Work From Home';
  const fromDate = item.fromDate || item.FromDate;
  const toDate = item.toDate || item.ToDate;

  return (
    <View style={[sharedStyles.card, styles.card, { backgroundColor: colors.secondPrimaryColor }]}>
      <View style={styles.topRow}>
        <View style={[sharedStyles.cardIconBox, { backgroundColor: colors.lightPurple }]}>
          <Icon type="Ionicons" name="laptop-outline" size={AppSizes.ICON_20} color={colors.purple1} />
        </View>
        <View style={sharedStyles.cardBody}>
          <Text style={[sharedStyles.cardTitle, { color: colors.textPrimary }]} numberOfLines={1}>
            {reasonText}
          </Text>
          <Text style={[sharedStyles.cardDateRange, { color: colors.textSecondary }]} numberOfLines={1}>
            {requesterName}
          </Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Icon type="Ionicons" name="calendar-outline" size={verticalScale(13)} color={colors.textSecondary} />
        <Text style={[sharedStyles.cardMetaText, { color: colors.textSecondary }]} numberOfLines={1}>
          {formatDateRange(fromDate, toDate)} &bull; {days === 1 ? '1 day' : `${days} days`}
        </Text>
      </View>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.dangerBg }]} onPress={() => onReject(item)}>
          <Text style={[styles.actionText, { color: colors.dangerText }]}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.purple1 }]} onPress={() => onApprove(item)}>
          <Text style={[styles.actionText, { color: '#fff' }]}>Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(PendingWFHApprovalCard);
