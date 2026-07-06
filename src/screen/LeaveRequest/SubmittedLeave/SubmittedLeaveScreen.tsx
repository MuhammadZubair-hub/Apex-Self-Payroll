import React, { useCallback } from 'react';
import { FlatList, RefreshControl, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from '../../../components/Icons';
import { sharedStyles } from '../components/sharedStyles';
import { submittedLeaveStyles as styles } from './SubmittedLeave.styles';
import { useSubmittedLeave } from './SubmittedLeave.logic';
import LeaveApplicationCard from './components/LeaveApplicationCard';
import LeaveDetailModal from './components/LeaveDetailModal';
import ApprovalChainModal from './components/ApprovalChainModal';
import NewLeaveRequestModal from './components/NewLeaveRequestModal/NewLeaveRequestModal';
import LeaveFilterModal from './components/LeaveFilterModal';
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
    hasActiveFilters,
    filterModalVisible,
    openFilterModal,
    closeFilterModal,
    filterFromDate,
    filterToDate,
    filterDatePicker,
    openFilterDatePicker,
    closeFilterDatePicker,
    confirmFilterDate,
    resetFilters,
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
      <View style={styles.searchFilterRow}>
        <View style={[styles.searchRow, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}>
          <Icon type="Ionicons" name="search" size={18} color={colors.textSecondary} />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search by leave type"
            placeholderTextColor={colors.textSecondary}
            style={[styles.searchInput, { color: colors.textPrimary }]}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.filterButton,
            { borderColor: hasActiveFilters ? colors.purple1 : colors.borderColor, backgroundColor: colors.secondPrimaryColor },
          ]}
          onPress={openFilterModal}
        >
          <Icon type="Ionicons" name="options-outline" size={20} color={hasActiveFilters ? colors.purple1 : colors.textSecondary} />
          {hasActiveFilters && <View style={[styles.filterDot, { backgroundColor: colors.purple1 }]} />}
        </TouchableOpacity>
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

      <LeaveFilterModal
        visible={filterModalVisible}
        colors={colors}
        statusFilter={statusFilter}
        onSelectStatus={setStatusFilter}
        fromDate={filterFromDate}
        toDate={filterToDate}
        datePicker={filterDatePicker}
        onOpenDatePicker={openFilterDatePicker}
        onCloseDatePicker={closeFilterDatePicker}
        onConfirmDate={confirmFilterDate}
        onReset={resetFilters}
        onClose={closeFilterModal}
      />

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
