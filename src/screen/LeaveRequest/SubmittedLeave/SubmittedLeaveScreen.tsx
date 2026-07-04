import React, { useCallback } from 'react';
import { FlatList, RefreshControl, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from '../../../components/Icons';
import { sharedStyles } from '../components/sharedStyles';
import { STATUS_TABS } from '../leaveRequest.constants';
import { submittedLeaveStyles as styles } from './SubmittedLeave.styles';
import { useSubmittedLeave } from './SubmittedLeave.logic';
import LeaveApplicationCard from './components/LeaveApplicationCard';
import LeaveDetailModal from './components/LeaveDetailModal';
import ApprovalChainModal from './components/ApprovalChainModal';
import NewLeaveRequestModal from './components/NewLeaveRequestModal/NewLeaveRequestModal';
import ListSkeleton from '../components/ListSkeleton';

interface SubmittedLeaveScreenProps {
  colors: any;
  employeeId: number | string;
  state: ReturnType<typeof useSubmittedLeave>;
}

const SubmittedLeaveScreen = ({ colors, employeeId, state }: SubmittedLeaveScreenProps) => {
  const {
    loadingApplications,
    statusFilter,
    setStatusFilter,
    searchVisible,
    searchText,
    setSearchText,
    refreshing,
    leaveType,
    approvalChainFor,
    approvalChain,
    approvalChainLoading,
    selectedApplication,
    formModalVisible,
    filteredApplications,
    onRefresh,
    openApprovalChain,
    closeApprovalChain,
    closeSelectedApplication,
    openFormModal,
    closeFormModal,
    setSelectedApplication,
    handleNewRequestSubmit,
  } = state;

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <LeaveApplicationCard item={item} colors={colors} onPress={setSelectedApplication} onPressEye={openApprovalChain} />
    ),
    [colors, setSelectedApplication, openApprovalChain]
  );
  const keyExtractor = useCallback((item: any, index: number) => String(item.id ?? index), []);

  return (
    <>
      {searchVisible && (
        <View style={[styles.searchRow, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}>
          <Icon type="Ionicons" name="search" size={18} color={colors.textSecondary} />
          <TextInput
            autoFocus
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search leave applications"
            placeholderTextColor={colors.textSecondary}
            style={[styles.searchInput, { color: colors.textPrimary }]}
          />
        </View>
      )}

      <View style={styles.tabsRow}>
        {STATUS_TABS.map((tab) => {
          const active = statusFilter === tab.key;
          return (
            <TouchableOpacity key={tab.key} style={styles.tabItem} onPress={() => setStatusFilter(tab.key)}>
              <Text style={[styles.tabText, { color: active ? colors.purple1 : colors.textSecondary }]}>{tab.label}</Text>
              {active && <View style={[styles.tabIndicator, { backgroundColor: colors.purple1 }]} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {loadingApplications && filteredApplications.length === 0 ? (
        <ListSkeleton colors={colors} />
      ) : (
        <FlatList
          data={filteredApplications}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={sharedStyles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.purple1]} />}
          ListEmptyComponent={
            <View style={sharedStyles.emptyListContainer}>
              <Icon type="Ionicons" name="document-text-outline" size={56} color={colors.textSecondary} />
              <Text style={[sharedStyles.emptyListText, { color: colors.textPrimary }]}>No leave applications found</Text>
              <Text style={[sharedStyles.emptyListSubText, { color: colors.textSecondary }]}>Tap the + button to create one</Text>
            </View>
          }
        />
      )}

      <TouchableOpacity style={[styles.fab, { backgroundColor: colors.purple1 }]} onPress={openFormModal} activeOpacity={0.85}>
        <Icon type="Ionicons" name="add" size={28} color="#fff" />
      </TouchableOpacity>

      <LeaveDetailModal visible={!!selectedApplication} item={selectedApplication} colors={colors} onClose={closeSelectedApplication} />

      <ApprovalChainModal
        visible={!!approvalChainFor}
        loading={approvalChainLoading}
        chain={approvalChain}
        colors={colors}
        onClose={closeApprovalChain}
      />

      <NewLeaveRequestModal
        visible={formModalVisible}
        colors={colors}
        leaveTypes={leaveType}
        employeeId={employeeId}
        onClose={closeFormModal}
        onSubmit={handleNewRequestSubmit}
      />
    </>
  );
};

export default React.memo(SubmittedLeaveScreen);
