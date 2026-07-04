import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Fold } from 'react-native-animated-spinkit';
import BottomSheet from '../../../../components/BottomSheet';
import MyButton from '../../../../components/MyButton';
import { sharedStyles } from '../../components/sharedStyles';
import { formatDateTime, getStatusMeta } from '../../leaveRequest.constants';
import { scale } from '../../../../utils/responsive';

interface ApprovalChainModalProps {
  visible: boolean;
  loading: boolean;
  chain: any[];
  colors: any;
  onClose: () => void;
}

const ApproverRow = ({ approver, colors }: { approver: any; colors: any }) => {
  const statusMeta = getStatusMeta(colors)[approver.requestStatus] || getStatusMeta(colors).Pending;
  return (
    <View style={[styles.row, { borderBottomColor: colors.borderColor }]}>
      <View style={[styles.avatar, { backgroundColor: colors.lightPurple }]}>
        <Text style={[styles.avatarInitial, { color: colors.purple1 }]}>
          {approver.name?.charAt(0)?.toUpperCase() || '?'}
        </Text>
      </View>
      <View style={{ flex: 1, marginLeft: scale(12) }}>
        <Text style={[styles.name, { color: colors.textPrimary }]} numberOfLines={1}>
          {approver.name || 'N/A'}
        </Text>
        <Text style={[styles.subText, { color: colors.textSecondary }]} numberOfLines={1}>
          {[approver.designationName?.trim(), approver.departmentName].filter(Boolean).join(' • ')}
        </Text>
        {approver.approvedDate ? (
          <Text style={[styles.subText, { color: colors.textSecondary }]}>{formatDateTime(approver.approvedDate)}</Text>
        ) : null}
      </View>
      <View style={[sharedStyles.statusPill, { backgroundColor: statusMeta.bg }]}>
        <Text style={[sharedStyles.statusPillText, { color: statusMeta.color }]}>{statusMeta.label}</Text>
      </View>
    </View>
  );
};

const ApprovalChainModal = ({ visible, loading, chain, colors, onClose }: ApprovalChainModalProps) => {
  const renderItem = useCallback(
    ({ item }: { item: any }) => <ApproverRow approver={item} colors={colors} />,
    [colors]
  );
  const keyExtractor = useCallback((item: any, index: number) => String(item.id ?? index), []);

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      colors={colors}
      title="Approval Chain"
      showCloseIcon
      maxHeight="70%"
      footer={<MyButton text="Close" onPress={onClose} style={{ backgroundColor: colors.purple1, marginTop: scale(6) }} />}
    >
      {loading ? (
        <View style={styles.spinner}>
          <Fold size={40} color={colors.purple1} />
        </View>
      ) : chain.length === 0 ? (
        <Text style={[sharedStyles.emptyListSubText, { color: colors.textSecondary, textAlign: 'center', marginVertical: 30 }]}>
          No approval information available
        </Text>
      ) : (
        <FlatList
          data={chain}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </BottomSheet>
  );
};

export default React.memo(ApprovalChainModal);

const styles = StyleSheet.create({
  spinner: {
    marginVertical: 30,
    alignItems: 'center',
  },
  list: {
    maxHeight: scale(360),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  name: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  subText: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 2,
  },
});
