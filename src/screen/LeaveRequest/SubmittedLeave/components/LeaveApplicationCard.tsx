import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../../components/Icons';
import { sharedStyles } from '../../components/sharedStyles';
import { formatDateRange, formatShortDate, getLeaveIconMeta, getStatusMeta } from '../../leaveRequest.constants';
import { scale } from '../../../../utils/responsive';
import { AppSizes } from '../../../../utils/AppSizes';

interface LeaveApplicationCardProps {
  item: any;
  colors: any;
  onPress: (item: any) => void;
  onPressApprovalChain: (item: any) => void;
}

const LeaveApplicationCard = ({ item, colors, onPress, onPressApprovalChain }: LeaveApplicationCardProps) => {
  const statusMeta = useMemo(
    () => getStatusMeta(colors)[item.requestStatus] || getStatusMeta(colors).Pending,
    [colors, item.requestStatus]
  );
  const iconMeta = useMemo(() => getLeaveIconMeta(colors, item.leaveName), [colors, item.leaveName]);
  const days = item.noOfDaysLeaveReq;

  return (
    <TouchableOpacity
      style={[sharedStyles.card, styles.cardAlign, { backgroundColor: colors.secondPrimaryColor }]}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <View style={[sharedStyles.cardIconBox, { backgroundColor: iconMeta.bg }]}>
        <Icon type="Ionicons" name={iconMeta.name} size={AppSizes.ICON_20} color={iconMeta.color} />
      </View>

      <View style={sharedStyles.cardBody}>
        <View style={sharedStyles.cardTitleRow}>
          <Text style={[sharedStyles.cardTitle, { color: colors.textPrimary }]} numberOfLines={1}>
            {item.leaveName?.trim() || 'Leave'}
          </Text>
          <View style={[sharedStyles.statusPill, { backgroundColor: statusMeta.bg }]}>
            <Text style={[sharedStyles.statusPillText, { color: statusMeta.color }]}>{statusMeta.label}</Text>
          </View>
        </View>

        <Text style={[sharedStyles.cardDateRange, { color: colors.textSecondary }]}>
          {formatDateRange(item.fromDate, item.toDate)}
        </Text>

        <View style={sharedStyles.cardMetaRow}>
          <Icon type="Ionicons" name="calendar-outline" size={scale(13)} color={colors.textSecondary} />
          <Text style={[sharedStyles.cardMetaText, { color: colors.textSecondary }]} numberOfLines={1}>
            {days === 1 ? '1 day' : `${days} days`} &bull; Applied on {formatShortDate(item.date)}
          </Text>
        </View>
      </View>

      {/* Right-side action column: eye (detail) aligned with the status row up top,
          approval-chain (branch) icon stacked below it. */}
      <View style={styles.actionsColumn}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onPress(item)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon type="Ionicons" name="eye-outline" size={AppSizes.ICON_20} color={colors.purple1} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onPressApprovalChain(item)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon type="Ionicons" name="git-branch-outline" size={AppSizes.ICON_20} color={colors.purple1} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(LeaveApplicationCard);

const styles = StyleSheet.create({
  cardAlign: {
    alignItems: 'flex-start',
  },
  actionsColumn: {
    alignItems: 'center',
    paddingLeft: scale(8),
    gap: scale(10),
  },
  actionButton: {},
});
