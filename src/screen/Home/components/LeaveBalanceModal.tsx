import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import BottomSheet from '../../../components/BottomSheet';
import MyButton from '../../../components/MyButton';
import { homeStyles as styles } from '../Home.styles';
import { scale } from '../../../utils/responsive';

interface LeaveBalanceModalProps {
  visible: boolean;
  colors: any;
  leaveBalance: any[];
  totalLeaveBalance: number;
  onClose: () => void;
}

const LeaveBalanceModal = ({ visible, colors, leaveBalance, totalLeaveBalance, onClose }: LeaveBalanceModalProps) => (
  <BottomSheet
    visible={visible}
    onClose={onClose}
    colors={colors}
    title="Leave Balance"
    showCloseIcon
    maxHeight="75%"
    footer={<MyButton text="Close" onPress={onClose} style={{ backgroundColor: colors.purple1, marginTop: scale(20) }} />}
  >
    {leaveBalance.length > 0 ? (
      leaveBalance.map((item, index) => (
        <View key={index} style={[styles.leaveTypeRow, { borderBottomColor: colors.borderColor }]}>
          <View style={styles.leaveTypeLeft}>
            <View style={[styles.leaveTypeIconBox, { backgroundColor: colors.lightPurple }]}>
              <Ionicons name="briefcase-outline" size={16} color={colors.purple1} />
            </View>
            <Text style={[styles.leaveTypeName, { color: colors.textPrimary }]}>{item?.leaveName?.trim() || 'N/A'}</Text>
          </View>
          <Text style={[styles.leaveTypeValue, { color: colors.textPrimary }]}>{item?.leaveBalance ?? 0} days</Text>
        </View>
      ))
    ) : (
      <Text style={[styles.leaveLabel, { color: colors.textSecondary, marginBottom: scale(12) }]}>
        No leave balance records found
      </Text>
    )}

    <View style={[styles.totalRow, { borderTopColor: colors.borderColor }]}>
      <Text style={[styles.leaveTypeName, { color: colors.textPrimary }]}>Total</Text>
      <Text style={[styles.leaveTypeValue, { color: colors.purple1 }]}>{totalLeaveBalance} days</Text>
    </View>
  </BottomSheet>
);

export default React.memo(LeaveBalanceModal);
