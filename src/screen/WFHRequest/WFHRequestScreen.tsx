import React, { useCallback } from 'react';
import { FlatList, RefreshControl, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Icon from '../../components/Icons';
import PrimaryHeader from '../../components/header/PrimaryHeader';
import { sharedStyles } from '../LeaveRequest/components/sharedStyles';
import { leaveRequestStyles as styles } from '../LeaveRequest/LeaveRequest.styles';
import { submittedLeaveStyles } from '../LeaveRequest/SubmittedLeave/SubmittedLeave.styles';
import { scale, verticalScale } from '../../utils/responsive';
import { AppSizes } from '../../utils/AppSizes';
import { useWFHRequest } from './WFHRequest.logic';
import WFHApplicationCard from './components/WFHApplicationCard';
import WFHDetailModal from './components/WFHDetailModal';
import NewWFHRequestModal from './components/NewWFHRequestModal/NewWFHRequestModal';
import WFHFilterModal from './components/WFHFilterModal';
import PendingWFHApprovalScreen from './PendingApproval/PendingWFHApprovalScreen';
import ListSkeleton from '../LeaveRequest/components/ListSkeleton';

const WFHRequestScreen = () => {
  const {
    colors,
    employeeId,
    activeSection,
    setActiveSection,
    loadingApplications,
    statusFilter,
    setStatusFilter,
    searchText,
    setSearchText,
    refreshing,
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
    closeSelectedApplication,
    openFormModal,
    closeFormModal,
    setSelectedApplication,
    handleNewRequestSubmit,
    pendingApprovals,
  } = useWFHRequest();

  const isSubmitted = activeSection === 'SUBMITTED';

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <WFHApplicationCard item={item} colors={colors} onPress={setSelectedApplication} />
    ),
    [colors, setSelectedApplication]
  );

  const keyExtractor = useCallback((item: any, index: number) => String(item.wfhId ?? item.id ?? item.Id ?? index), []);
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <StatusBar backgroundColor={colors.primarayheaderColor} barStyle="light-content" />
      <PrimaryHeader headerText="WFH Requests" />

      <View style={[styles.sectionSwitcher, { backgroundColor: colors.secondPrimaryColor }]}>
        <TouchableOpacity
          style={[styles.sectionButton, isSubmitted && { backgroundColor: colors.purple1 }]}
          onPress={() => setActiveSection('SUBMITTED')}
        >
          <Text style={[styles.sectionButtonText, { color: isSubmitted ? '#fff' : colors.textSecondary }]}>
            WFH Submitted
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sectionButton, !isSubmitted && { backgroundColor: colors.purple1 }]}
          onPress={() => setActiveSection('APPROVALS')}
        >
          <Text style={[styles.sectionButtonText, { color: !isSubmitted ? '#fff' : colors.textSecondary }]}>
            Pending Approval
          </Text>
          {pendingApprovals.pendingApprovals.length > 0 && (
            <View style={[styles.sectionBadge, { backgroundColor: !isSubmitted ? '#fff' : colors.redColor }]}>
              <Text style={[styles.sectionBadgeText, { color: !isSubmitted ? colors.purple1 : '#fff' }]}>
                {pendingApprovals.pendingApprovals.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {isSubmitted ? (
        <>
          <View style={submittedLeaveStyles.searchFilterRow}>
            <View style={[submittedLeaveStyles.searchRow, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}>
              <Icon type="Ionicons" name="search" size={scale(18)} color={colors.textSecondary} />
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search by reason"
                placeholderTextColor={colors.textSecondary}
                style={[submittedLeaveStyles.searchInput, { color: colors.textPrimary }]}
              />
            </View>

            <TouchableOpacity
              style={[
                submittedLeaveStyles.filterButton,
                { borderColor: hasActiveFilters ? colors.purple1 : colors.borderColor, backgroundColor: colors.secondPrimaryColor },
              ]}
              onPress={openFilterModal}
            >
              <Icon type="Ionicons" name="options-outline" size={AppSizes.ICON_20} color={hasActiveFilters ? colors.purple1 : colors.textSecondary} />
              {hasActiveFilters && <View style={[submittedLeaveStyles.filterDot, { backgroundColor: colors.purple1 }]} />}
            </TouchableOpacity>
          </View>

          {loadingApplications && filteredApplications.length === 0 ? (
            <ListSkeleton colors={colors} />
          ) : (
            <FlatList
              data={filteredApplications}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              contentContainerStyle={[
                sharedStyles.listContent,
                { paddingBottom: (sharedStyles.listContent.paddingBottom as number) + tabBarHeight },
              ]}
              showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.purple1]} />}
              ListEmptyComponent={
                <View style={sharedStyles.emptyListContainer}>
                  <Icon type="Ionicons" name="laptop-outline" size={verticalScale(56)} color={colors.textSecondary} />
                  <Text style={[sharedStyles.emptyListText, { color: colors.textPrimary }]}>No WFH applications found</Text>
                  <Text style={[sharedStyles.emptyListSubText, { color: colors.textSecondary }]}>Tap the + button to create one</Text>
                </View>
              }
            />
          )}

          <TouchableOpacity
            style={[submittedLeaveStyles.fab, { backgroundColor: colors.purple1, bottom: (submittedLeaveStyles.fab.bottom as number) + tabBarHeight }]}
            onPress={openFormModal}
            activeOpacity={0.85}
          >
            <Icon type="Ionicons" name="add" size={scale(22)} color="#fff" />
          </TouchableOpacity>

          <WFHFilterModal
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

          <WFHDetailModal visible={!!selectedApplication} item={selectedApplication} colors={colors} onClose={closeSelectedApplication} />

          <NewWFHRequestModal
            visible={formModalVisible}
            colors={colors}
            employeeId={employeeId || 0}
            onClose={closeFormModal}
            onSubmit={handleNewRequestSubmit}
          />
        </>
      ) : (
        <PendingWFHApprovalScreen colors={colors} state={pendingApprovals} />
      )}
    </SafeAreaView>
  );
};

export default React.memo(WFHRequestScreen);
