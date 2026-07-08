import React, { useCallback } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Icon from '../../../components/Icons';
import { sharedStyles } from '../components/sharedStyles';
import { verticalScale } from '../../../utils/responsive';
import { usePendingApprovals } from './PendingApproval.logic';
import PendingApprovalCard from './components/PendingApprovalCard';
import ApproveRejectModal from './components/ApproveRejectModal';
import ListSkeleton from '../components/ListSkeleton';

interface PendingApprovalScreenProps {
  colors: any;
  state: ReturnType<typeof usePendingApprovals>;
}

const PendingApprovalScreen = ({ colors, state }: PendingApprovalScreenProps) => {
  const {
    pendingApprovals,
    loadingApprovals,
    refreshing,
    actionTarget,
    onRefresh,
    openApprove,
    openReject,
    closeActionTarget,
    handleApproveReject,
  } = state;

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <PendingApprovalCard item={item} colors={colors} onApprove={openApprove} onReject={openReject} />
    ),
    [colors, openApprove, openReject]
  );
  const keyExtractor = useCallback((item: any, index: number) => String(item.id ?? item.fkid ?? index), []);
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <>
      {loadingApprovals && pendingApprovals.length === 0 ? (
        <ListSkeleton colors={colors} />
      ) : (
        <FlatList
          data={pendingApprovals}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={[sharedStyles.listContent, { paddingBottom: sharedStyles.listContent.paddingBottom as number + tabBarHeight }]}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.purple1]} />}
          ListEmptyComponent={
            <View style={sharedStyles.emptyListContainer}>
              <Icon type="Ionicons" name="checkmark-done-outline" size={verticalScale(56)} color={colors.textSecondary} />
              <Text style={[sharedStyles.emptyListText, { color: colors.textPrimary }]}>No pending approvals</Text>
              <Text style={[sharedStyles.emptyListSubText, { color: colors.textSecondary }]}>You&apos;re all caught up</Text>
            </View>
          }
        />
      )}

      <ApproveRejectModal
        visible={!!actionTarget}
        decision={actionTarget?.decision}
        colors={colors}
        onClose={closeActionTarget}
        onSubmit={handleApproveReject}
      />
    </>
  );
};

export default React.memo(PendingApprovalScreen);
