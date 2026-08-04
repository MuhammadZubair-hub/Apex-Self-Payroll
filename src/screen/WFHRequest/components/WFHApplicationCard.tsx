import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../components/Icons';
import { sharedStyles } from '../../LeaveRequest/components/sharedStyles';
import { formatDateRange, formatShortDate, getStatusMeta } from '../../LeaveRequest/leaveRequest.constants';
import { scale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

interface WFHApplicationCardProps {
  item: any;
  colors: any;
  onPress: (item: any) => void;
}

const WFHApplicationCard = ({ item, colors, onPress }: WFHApplicationCardProps) => {
  const statusMeta = useMemo(() => {
    const rawStatus = item.requestStatus || item.RequestStatus || (item.flgApproved ? 'Approved' : 'Pending');
    return getStatusMeta(colors)[rawStatus] || getStatusMeta(colors).Pending;
  }, [colors, item]);

  const days = item.noOfDaysWFHReq || item.NoOfDaysWFHReq || 1;
  const titleText = item.reason || item.Reason || 'Work From Home';
  const nameText = item.name || item.employeeName || item.EmployeeName;
  const fromDate = item.fromDate || item.FromDate;
  const toDate = item.toDate || item.ToDate;
  const appliedDate = item.createdDate || item.date || fromDate;

  return (
    <TouchableOpacity
      style={[sharedStyles.card, styles.cardAlign, { backgroundColor: colors.secondPrimaryColor }]}
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      <View style={[sharedStyles.cardIconBox, { backgroundColor: colors.lightPurple }]}>
        <Icon type="Ionicons" name="laptop-outline" size={AppSizes.ICON_20} color={colors.purple1} />
      </View>

      <View style={sharedStyles.cardBody}>
        <View style={sharedStyles.cardTitleRow}>
          <Text style={[sharedStyles.cardTitle, { color: colors.textPrimary }]} numberOfLines={1}>
            {titleText}
          </Text>
          <View style={[sharedStyles.statusPill, { backgroundColor: statusMeta.bg }]}>
            <Text style={[sharedStyles.statusPillText, { color: statusMeta.color }]}>{statusMeta.label}</Text>
          </View>
        </View>

        <Text style={[sharedStyles.cardDateRange, { color: colors.textSecondary }]}>
          {formatDateRange(fromDate, toDate)}
        </Text>

        <View style={sharedStyles.cardMetaRow}>
          <Icon type="Ionicons" name="calendar-outline" size={scale(13)} color={colors.textSecondary} />
          <Text style={[sharedStyles.cardMetaText, { color: colors.textSecondary }]} numberOfLines={1}>
            {days === 1 ? '1 day' : `${days} days`}{nameText ? ` \u2022 ${nameText}` : appliedDate ? ` \u2022 Applied on ${formatShortDate(appliedDate)}` : ''}
          </Text>
        </View>
      </View>

      <View style={styles.actionsColumn}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onPress(item)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon type="Ionicons" name="eye-outline" size={AppSizes.ICON_20} color={colors.purple1} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(WFHApplicationCard);

const styles = StyleSheet.create({
  cardAlign: {
    alignItems: 'flex-start',
  },
  actionsColumn: {
    alignItems: 'center',
    paddingLeft: scale(8),
    justifyContent: 'center',
  },
  actionButton: {},
});
