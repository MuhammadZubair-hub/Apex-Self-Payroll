import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../components/Icons';
import BottomSheet from '../../../components/BottomSheet';
import MyButton from '../../../components/MyButton';
import { homeStyles as styles } from '../Home.styles';
import { scale, verticalScale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

interface PendingApprovalRowProps {
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  count: number;
  colors: any;
  onPress: () => void;
}

const PendingApprovalRow = ({ icon, iconColor, iconBg, title, count, colors, onPress }: PendingApprovalRowProps) => (
  <TouchableOpacity
    style={[styles.leaveTypeRow, { borderBottomColor: colors.borderColor, opacity: count > 0 ? 1 : 0.5 }]}
    onPress={onPress}
    disabled={count === 0}
    activeOpacity={0.75}
  >
    <View style={styles.leaveTypeLeft}>
      <View style={[styles.leaveTypeIconBox, { backgroundColor: iconBg }]}>
        <Icon type="Ionicons" name={icon} size={AppSizes.ICON_16} color={iconColor} />
      </View>
      <View>
        <Text style={[styles.leaveTypeName, { color: colors.textPrimary }]}>{title}</Text>
        <Text style={[styles.leaveLabel, { color: colors.textSecondary, marginTop: AppSizes.MV_2 }]}>
          {count} request{count === 1 ? '' : 's'} waiting
        </Text>
      </View>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: scale(6) }}>
      <Text style={[styles.leaveTypeValue, { color: colors.purple1 }]}>{count}</Text>
      <Icon type="Ionicons" name="chevron-forward" size={verticalScale(16)} color={colors.textSecondary} />
    </View>
  </TouchableOpacity>
);

interface PendingApprovalsModalProps {
  visible: boolean;
  colors: any;
  pendingLeaveCount: number;
  pendingWfhCount: number;
  onPressLeave: () => void;
  onPressWfh: () => void;
  onClose: () => void;
}

const PendingApprovalsModal = ({
  visible,
  colors,
  pendingLeaveCount,
  pendingWfhCount,
  onPressLeave,
  onPressWfh,
  onClose,
}: PendingApprovalsModalProps) => (
  <BottomSheet
    visible={visible}
    onClose={onClose}
    colors={colors}
    title="Pending Approvals"
    showCloseIcon
   footer={<MyButton text="Close" onPress={onClose} style={{ backgroundColor: colors.purple1, marginTop: scale(20) }} />}
  >
    <PendingApprovalRow
      icon="document-text-outline"
      iconColor={colors.purple1}
      iconBg={colors.lightPurple}
      title="Pending Leave"
      count={pendingLeaveCount}
      colors={colors}
      onPress={onPressLeave}
    />
    <PendingApprovalRow
      icon="laptop-outline"
      iconColor={colors.greenColor}
      iconBg={colors.successBg}
      title="Pending WFH"
      count={pendingWfhCount}
      colors={colors}
      onPress={onPressWfh}
    />
  </BottomSheet>
);

export default React.memo(PendingApprovalsModal);
