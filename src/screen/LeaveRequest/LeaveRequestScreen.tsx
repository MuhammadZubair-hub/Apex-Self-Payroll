// import PrimaryHeader from '@/src/components/header/PrimaryHeader';
// import Icon from '@/src/components/Icons';
// import { getUser, getUserProfileData } from '@/src/redux/slices/authSlice';
// import { baseUrl, endPoints } from '@/src/services/Constants/endPoints';
// import { getColors } from '@/src/theme/color/theme';
// import { useThemeContext } from '@/src/theme/ThemeContex';
// import { CommonStyle } from '@/src/utils/Common/CommonStyle';
// import { scale } from '@/src/utils/responsive';
import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { useThemeContext } from '../../theme/ThemeContex';
import { getColors } from '../../theme/color/theme';
import { getUser, getUserProfileData } from '../../redux/slices/authSlice';
import { baseUrl, endPoints } from '../../services/Constants/endPoints';
import PrimaryHeader from '../../components/header/PrimaryHeader';
import Icon from '../../components/Icons';
import { scale } from '../../utils/responsive';

// ---------- Static config ----------

const getStatusMeta = (colors: any): Record<string, { label: string; bg: string; color: string }> => ({
  Approved: { label: 'APPROVED', bg: colors.successBg, color: colors.successText },
  Pending: { label: 'PENDING', bg: colors.warningBg, color: colors.warningText },
  Rejected: { label: 'REJECTED', bg: colors.dangerBg, color: colors.dangerText },
});

const getLeaveIconMeta = (colors: any, leaveName?: string) => {
  const name = (leaveName || '').toLowerCase();
  if (name.includes('sick') || name.includes('medical')) {
    return { name: 'medkit-outline', bg: colors.greenTint, color: colors.greenColor };
  }
  if (name.includes('casual') || name.includes('annual') || name.includes('vacation')) {
    return { name: 'umbrella-outline', bg: colors.orangeTint, color: colors.orangeColor };
  }
  if (name.includes('emergency') || name.includes('bereavement') || name.includes('death')) {
    return { name: 'flag-outline', bg: colors.redTint, color: colors.redColor };
  }
  return { name: 'document-text-outline', bg: colors.lightPurple, color: colors.purple1 };
};

const STATUS_TABS = [
  { key: 'ALL', label: 'All' },
  { key: 'Pending', label: 'Pending' },
  { key: 'Approved', label: 'Approved' },
  { key: 'Rejected', label: 'Rejected' },
];

const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// ---------- Helpers ----------

const toDateObj = (value: string | Date) => (value instanceof Date ? value : new Date(value));

const formatShortDate = (value?: string | Date | null) => {
  if (!value) return 'N/A';
  return toDateObj(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatDateTime = (value?: string | Date | null) => {
  if (!value) return 'N/A';
  return toDateObj(value).toLocaleString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true,
  });
};

const formatDateRange = (from: string | Date, to: string | Date, separator = ' – ') => {
  const fromDate = toDateObj(from);
  const toDateValue = toDateObj(to);
  if (fromDate.toDateString() === toDateValue.toDateString()) {
    return formatShortDate(fromDate);
  }
  return `${formatShortDate(fromDate)}${separator}${formatShortDate(toDateValue)}`;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const daysBetweenInclusive = (from: Date, to: Date) => {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
};

const buildMonthGrid = (year: number, month: number) => {
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { date: Date; inMonth: boolean }[] = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push({ date: new Date(year, month - 1, daysInPrevMonth - startOffset + 1 + i), inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(year, month + 1, nextDay), inMonth: false });
    nextDay++;
  }
  return cells;
};

// Midnight-UTC ISO string for a calendar date, e.g. 2026-07-03 -> "2026-07-03T00:00:00.000Z"
const toMidnightISOString = (date: Date) =>
  new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();

const pad2 = (n: number) => String(n).padStart(2, '0');

// "YYYY-MM-DD" for today, used by the approve/reject payload
const toDateOnlyString = (date: Date) => `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;

// ---------- Screen ----------

const LeaveRequestScreen = () => {
  const { theme } = useThemeContext();
  const colors = getColors(theme);
  const user = useSelector(getUser);
  const profileData = useSelector(getUserProfileData);
  const employeeId = user?.employeeId;

  const [activeSection, setActiveSection] = useState<'SUBMITTED' | 'APPROVALS'>('SUBMITTED');

  // Leave submitted
  const [leaveApplications, setLeaveApplications] = useState<any[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Leave types (for the new-request dropdown)
  const [leaveType, setLeaveType] = useState<any[]>([]);

  // Pending approvals (leave requests waiting on me)
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [loadingApprovals, setLoadingApprovals] = useState(true);

  // Approval-chain modal (eye icon)
  const [approvalChainFor, setApprovalChainFor] = useState<any>(null);
  const [approvalChain, setApprovalChain] = useState<any[]>([]);
  const [approvalChainLoading, setApprovalChainLoading] = useState(false);

  // Application detail sheet (tap card)
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  // New request form
  const [formModalVisible, setFormModalVisible] = useState(false);

  // Approve / reject action sheet
  const [actionTarget, setActionTarget] = useState<{ item: any; decision: 'Approved' | 'Rejected' } | null>(null);

  const filteredApplications = useMemo(() => {
    return leaveApplications.filter((item) => {
      const matchesTab = statusFilter === 'ALL' || item.requestStatus === statusFilter;
      const haystack = `${item.leaveName || ''} ${item.remarks || ''}`.toLowerCase();
      const matchesSearch = !searchText.trim() || haystack.includes(searchText.trim().toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [leaveApplications, statusFilter, searchText]);

  const fetchLeaveTypes = async () => {
    try {
      const r = await axios.get(`${baseUrl}${endPoints.GetLeaveTypesESS}?EmployeeId=${employeeId}`);
      setLeaveType(r.data?.status ? r.data.data || [] : []);
    } catch (error) {
      console.log('error fetching leave types', error);
    }
  };

  const fetchLeaveApplications = async () => {
    if (!employeeId) return;
    try {
      const r = await axios.get(`${baseUrl}${endPoints.GetLeaveApplicationByIDESS}?EmployeeId=${employeeId}`);
      setLeaveApplications(r.data?.status ? r.data.data || [] : []);
    } catch (error) {
      console.log('error fetching leave applications', error);
      Alert.alert('Error', 'Failed to fetch leave applications');
    } finally {
      setLoadingApplications(false);
      setRefreshing(false);
    }
  };

  const fetchPendingApprovals = async () => {
    if (!employeeId) return;
    try {
      const r = await axios.get(`${baseUrl}${endPoints.PendingLeaveApplicationsListESS}?UserId=${employeeId}`);
      setPendingApprovals(r.data?.status ? r.data.data || [] : []);
    } catch (error) {
      console.log('error fetching pending approvals', error);
    } finally {
      setLoadingApprovals(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeaveTypes();
    fetchLeaveApplications();
    fetchPendingApprovals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId]);

  const onRefresh = () => {
    setRefreshing(true);
    if (activeSection === 'SUBMITTED') {
      fetchLeaveApplications();
    } else {
      fetchPendingApprovals();
    }
  };

  const openApprovalChain = async (item: any) => {
    setApprovalChainFor(item);
    setApprovalChainLoading(true);
    setApprovalChain([]);
    try {
      const r = await axios.get(
        `${baseUrl}${endPoints.GetApprovalDetailESS}?DocType=Leave&ApplicationId=${item.id}`
      );
      setApprovalChain(r.data?.status ? r.data.data || [] : []);
    } catch (error) {
      console.log('error fetching approval chain', error);
    } finally {
      setApprovalChainLoading(false);
    }
  };

  const handleNewRequestSubmit = async (payload: any) => {
    try {
      const now = new Date();
      const body = {
        KPIAnswers: [],
        attachmentPath: payload.attachmentPath || '',
        leaveApplication: {
          applicationStatus: '',
          approvedBy: '',
          bereavementRelation: null,
          code: '',
          createdBy: employeeId,
          createdDate: now.toISOString(),
          date: toMidnightISOString(now),
          deathDate: null,
          doJ: profileData?.dateOfJoining
            ? toMidnightISOString(new Date(profileData.dateOfJoining))
            : toMidnightISOString(now),
          empID: employeeId,
          flgApproved: false,
          fromDate: toMidnightISOString(payload.fromDate),
          id: 0,
          leaveID: payload.leaveTypeId,
          noOfDayRecom: 0,
          noOfDaysApp: 0,
          noOfDaysLeaveReq: daysBetweenInclusive(payload.fromDate, payload.toDate),
          preparedBy: '',
          recommendedBy: '',
          remarks: payload.remarks,
          requestStatus: '',
          status: 'Pending',
          submittedBy: String(employeeId),
          toDate: toMidnightISOString(payload.toDate),
        },
      };

      const r = await axios.post(`${baseUrl}${endPoints.PostLeaveApplicationWithKPIs}`, body);
      if (r.data?.status === false) {
        Alert.alert('Error', r.data?.message || 'Failed to submit leave request');
        return;
      }
      setFormModalVisible(false);
      Alert.alert('Success', 'Leave request submitted successfully');
      fetchLeaveApplications();
    } catch (error) {
      console.log('error submitting leave request', error);
      Alert.alert('Error', 'Failed to submit leave request');
    }
  };

  const handleApproveReject = async (remarks: string) => {
    if (!actionTarget) return;
    const { item, decision } = actionTarget;
    const leaveId = item.fkid ?? item.leaveID ?? item.id;
    const pendingAtId = item.pendingAtId ?? employeeId;
    const now = new Date();

    try {
      const r = await axios.post(`${baseUrl}${endPoints.ApproveRejectDocumentESS}`, {
        approvedDate: toDateOnlyString(now),
        createDate: `${toDateOnlyString(now)}T00:00:00`,
        docType: 'Leave',
        fKID: leaveId,
        pendingAtId,
        remarks,
        requestStatus: decision,
      });
      if (r.data?.status === false) {
        Alert.alert('Error', r.data?.message || `Failed to ${decision.toLowerCase()} request`);
        return;
      }
      setActionTarget(null);
      Alert.alert('Success', `Leave request ${decision.toLowerCase()} successfully`);
      fetchPendingApprovals();
    } catch (error) {
      console.log('error approving/rejecting leave request', error);
      Alert.alert('Error', `Failed to ${decision.toLowerCase()} request`);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
      <StatusBar backgroundColor={colors.primarayheaderColor} barStyle="dark-content" />
      <PrimaryHeader
        headerText="Leave Requests"
        rightIconName={activeSection === 'SUBMITTED' ? (searchVisible ? 'close' : 'search') : undefined}
        onRightIconPress={() => {
          setSearchVisible((v) => !v);
          setSearchText('');
        }}
      />

      {/* Section switcher */}
      <View style={[styles.sectionSwitcher, { backgroundColor: colors.secondPrimaryColor }]}>
        <TouchableOpacity
          style={[styles.sectionButton, activeSection === 'SUBMITTED' && { backgroundColor: colors.purple1 }]}
          onPress={() => setActiveSection('SUBMITTED')}
        >
          <Text
            style={[
              styles.sectionButtonText,
              { color: activeSection === 'SUBMITTED' ? '#fff' : colors.textSecondary },
            ]}
          >
            Leave Submitted
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sectionButton, activeSection === 'APPROVALS' && { backgroundColor: colors.purple1 }]}
          onPress={() => setActiveSection('APPROVALS')}
        >
          <Text
            style={[
              styles.sectionButtonText,
              { color: activeSection === 'APPROVALS' ? '#fff' : colors.textSecondary },
            ]}
          >
            Pending Approval
          </Text>
          {pendingApprovals.length > 0 && (
            <View style={[styles.sectionBadge, { backgroundColor: activeSection === 'APPROVALS' ? '#fff' : colors.redColor }]}>
              <Text style={[styles.sectionBadgeText, { color: activeSection === 'APPROVALS' ? colors.purple1 : '#fff' }]}>
                {pendingApprovals.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {activeSection === 'SUBMITTED' ? (
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
                  <Text style={[styles.tabText, { color: active ? colors.purple1 : colors.textSecondary }]}>
                    {tab.label}
                  </Text>
                  {active && <View style={[styles.tabIndicator, { backgroundColor: colors.purple1 }]} />}
                </TouchableOpacity>
              );
            })}
          </View>

          <FlatList
            data={filteredApplications}
            keyExtractor={(item, index) => String(item.id ?? index)}
            renderItem={({ item }) => (
              <LeaveApplicationCard
                item={item}
                colors={colors}
                onPress={() => setSelectedApplication(item)}
                onPressEye={() => openApprovalChain(item)}
              />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.purple1]} />}
            ListEmptyComponent={
              !loadingApplications ? (
                <View style={styles.emptyListContainer}>
                  <Icon type="Ionicons" name="document-text-outline" size={56} color={colors.textSecondary} />
                  <Text style={[styles.emptyListText, { color: colors.textPrimary }]}>No leave applications found</Text>
                  <Text style={[styles.emptyListSubText, { color: colors.textSecondary }]}>
                    Tap the + button to create one
                  </Text>
                </View>
              ) : (
                <ActivityIndicator style={{ marginTop: 40 }} color={colors.purple1} />
              )
            }
          />

          <TouchableOpacity
            style={[styles.fab, { backgroundColor: colors.purple1 }]}
            onPress={() => setFormModalVisible(true)}
            activeOpacity={0.85}
          >
            <Icon type="Ionicons" name="add" size={28} color="#fff" />
          </TouchableOpacity>
        </>
      ) : (
        <FlatList
          data={pendingApprovals}
          keyExtractor={(item, index) => String(item.id ?? item.fkid ?? index)}
          renderItem={({ item }) => (
            <PendingApprovalCard
              item={item}
              colors={colors}
              onApprove={() => setActionTarget({ item, decision: 'Approved' })}
              onReject={() => setActionTarget({ item, decision: 'Rejected' })}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.purple1]} />}
          ListEmptyComponent={
            !loadingApprovals ? (
              <View style={styles.emptyListContainer}>
                <Icon type="Ionicons" name="checkmark-done-outline" size={56} color={colors.textSecondary} />
                <Text style={[styles.emptyListText, { color: colors.textPrimary }]}>No pending approvals</Text>
                <Text style={[styles.emptyListSubText, { color: colors.textSecondary }]}>
                  You&apos;re all caught up
                </Text>
              </View>
            ) : (
              <ActivityIndicator style={{ marginTop: 40 }} color={colors.purple1} />
            )
          }
        />
      )}

      <LeaveDetailModal
        visible={!!selectedApplication}
        item={selectedApplication}
        colors={colors}
        onClose={() => setSelectedApplication(null)}
      />

      <ApprovalChainModal
        visible={!!approvalChainFor}
        loading={approvalChainLoading}
        chain={approvalChain}
        colors={colors}
        onClose={() => setApprovalChainFor(null)}
      />

      <ApproveRejectModal
        visible={!!actionTarget}
        decision={actionTarget?.decision}
        colors={colors}
        onClose={() => setActionTarget(null)}
        onSubmit={handleApproveReject}
      />

      <NewLeaveRequestModal
        visible={formModalVisible}
        colors={colors}
        leaveTypes={leaveType}
        employeeId={employeeId}
        onClose={() => setFormModalVisible(false)}
        onSubmit={handleNewRequestSubmit}
      />
    </SafeAreaView>
  );
};

export default LeaveRequestScreen;

// ---------- Leave application card ----------

const LeaveApplicationCard = ({
  item,
  colors,
  onPress,
  onPressEye,
}: {
  item: any;
  colors: any;
  onPress: () => void;
  onPressEye: () => void;
}) => {
  const statusMeta = getStatusMeta(colors)[item.requestStatus] || getStatusMeta(colors).Pending;
  const iconMeta = getLeaveIconMeta(colors, item.leaveName);
  const days = item.noOfDaysLeaveReq;

  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: colors.secondPrimaryColor }]} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.cardIconBox, { backgroundColor: iconMeta.bg }]}>
        <Icon type="Ionicons" name={iconMeta.name} size={20} color={iconMeta.color} />
      </View>

      <View style={styles.cardBody}>
        <View style={styles.cardTitleRow}>
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]} numberOfLines={1}>
            {item.leaveName?.trim() || 'Leave'}
          </Text>
          <View style={[styles.statusPill, { backgroundColor: statusMeta.bg }]}>
            <Text style={[styles.statusPillText, { color: statusMeta.color }]}>{statusMeta.label}</Text>
          </View>
        </View>

        <Text style={[styles.cardDateRange, { color: colors.textSecondary }]}>
          {formatDateRange(item.fromDate, item.toDate)}
        </Text>

        <View style={styles.cardMetaRow}>
          <Icon type="Ionicons" name="calendar-outline" size={13} color={colors.textSecondary} />
          <Text style={[styles.cardMetaText, { color: colors.textSecondary }]} numberOfLines={1}>
            {days === 1 ? '1 day' : `${days} days`} &bull; Applied on {formatShortDate(item.date)}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.eyeButton} onPress={onPressEye} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Icon type="Ionicons" name="eye-outline" size={20} color={colors.purple1} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// ---------- Pending approval card ----------

const PendingApprovalCard = ({
  item,
  colors,
  onApprove,
  onReject,
}: {
  item: any;
  colors: any;
  onApprove: () => void;
  onReject: () => void;
}) => {
  const iconMeta = getLeaveIconMeta(colors, item.leaveName);
  const requesterName = item.name || item.employeeName || 'Employee';
  const days = item.noOfDaysLeaveReq ?? item.days;

  return (
    <View style={[styles.card, styles.pendingCard, { backgroundColor: colors.secondPrimaryColor }]}>
      <View style={styles.pendingTopRow}>
        <View style={[styles.cardIconBox, { backgroundColor: iconMeta.bg }]}>
          <Icon type="Ionicons" name={iconMeta.name} size={20} color={iconMeta.color} />
        </View>
        <View style={styles.cardBody}>
          <Text style={[styles.cardTitle, { color: colors.textPrimary }]} numberOfLines={1}>
            {item.leaveName?.trim() || 'Leave'}
          </Text>
          <Text style={[styles.cardDateRange, { color: colors.textSecondary }]} numberOfLines={1}>
            {requesterName}
          </Text>
        </View>
      </View>

      <View style={styles.pendingInfoRow}>
        <Icon type="Ionicons" name="calendar-outline" size={13} color={colors.textSecondary} />
        <Text style={[styles.cardMetaText, { color: colors.textSecondary }]} numberOfLines={1}>
          {formatDateRange(item.fromDate, item.toDate)} &bull; {days === 1 ? '1 day' : `${days} days`}
        </Text>
      </View>

      {item.remarks ? (
        <Text style={[styles.pendingRemarks, { color: colors.textSecondary }]} numberOfLines={2}>
          &quot;{item.remarks}&quot;
        </Text>
      ) : null}

      <View style={styles.pendingActionsRow}>
        <TouchableOpacity
          style={[styles.pendingActionButton, { backgroundColor: colors.dangerBg }]}
          onPress={onReject}
        >
          <Text style={[styles.pendingActionText, { color: colors.dangerText }]}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.pendingActionButton, { backgroundColor: colors.purple1 }]}
          onPress={onApprove}
        >
          <Text style={[styles.pendingActionText, { color: '#fff' }]}>Approve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ---------- Detail modal (bottom sheet) ----------

const LeaveDetailModal = ({ visible, item, colors, onClose }: { visible: boolean; item: any; colors: any; onClose: () => void }) => {
  if (!item) return null;

  const statusMeta = getStatusMeta(colors)[item.requestStatus] || getStatusMeta(colors).Pending;
  const iconMeta = getLeaveIconMeta(colors, item.leaveName);
  const days = item.noOfDaysLeaveReq;

  const infoRows = [
    { icon: 'person-outline', label: 'Employee', value: item.name || 'N/A' },
    { icon: 'document-text-outline', label: 'Leave Type', value: item.leaveName?.trim() || 'N/A' },
    { icon: 'calendar-outline', label: 'Dates', value: formatDateRange(item.fromDate, item.toDate, ' - ') },
    { icon: 'reader-outline', label: 'Total Days', value: days === 1 ? '1 day' : `${days} days` },
    ...(item.remarks ? [{ icon: 'chatbubble-outline', label: 'Remarks', value: item.remarks }] : []),
    // ...(item.kpiAnswers ? [{ icon: 'list-outline', label: 'KPI Answers', value: item.kpiAnswers }] : []),
  ];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.sheetOverlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />

        <View style={[styles.sheetContainer, { backgroundColor: colors.secondPrimaryColor }]}>
          <View style={[styles.sheetHandle, { backgroundColor: colors.purple1 }]} />

          <View style={styles.sheetHeaderRow}>
            <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>Leave Application Details</Text>
            {/* <TouchableOpacity onPress={onClose}>
              <Icon type="Ionicons" name="close" size={22} color={colors.textSecondary} />
            </TouchableOpacity> */}
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetScrollContent}>
            <View style={styles.detailTopRow}>
              <View style={[styles.cardIconBox, { backgroundColor: iconMeta.bg }]}>
                <Icon type="Ionicons" name={iconMeta.name} size={20} color={iconMeta.color} />
              </View>
              <View style={{ flex: 1, marginLeft: scale(12) }}>
                <Text style={[styles.detailLeaveTitle, { color: colors.textPrimary }]}>
                  {item.leaveName?.trim() || 'Leave'}
                </Text>
                <View style={[styles.statusPill, { backgroundColor: statusMeta.bg, alignSelf: 'flex-start', marginTop: 4 }]}>
                  <Text style={[styles.statusPillText, { color: statusMeta.color }]}>{statusMeta.label}</Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[styles.appliedOnLabel, { color: colors.textSecondary }]}>Applied on</Text>
                <Text style={[styles.appliedOnText, { color: colors.textPrimary }]}>
                  {formatShortDate(item.date)}
                </Text>
              </View>
            </View>

            <DetailSection title="Application Information" rows={infoRows} colors={colors} />
          </ScrollView>

          <TouchableOpacity style={[styles.closeButton, { backgroundColor: colors.purple1 }]} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const DetailSection = ({ title, rows, colors }: { title: string; rows: any[]; colors: any }) => (
  <View style={styles.detailSection}>
    <Text style={[styles.detailSectionTitle, { color: colors.textPrimary, borderBottomColor: colors.borderColor }]}>{title}</Text>
    {rows.map((row, index) => (
      <View key={index} style={styles.detailRow}>
        <View style={styles.detailRowLeft}>
          <Icon type="Ionicons" name={row.icon} size={16} color={row.iconColor || colors.purple1} />
          <Text style={[styles.detailRowLabel, { color: colors.textSecondary }]}>{row.label}</Text>
        </View>
        <Text style={[styles.detailRowValue, { color: colors.textPrimary }]} numberOfLines={4}>
          {row.value}
        </Text>
      </View>
    ))}
  </View>
);

// ---------- Approval chain modal (eye icon) ----------

const ApprovalChainModal = ({
  visible,
  loading,
  chain,
  colors,
  onClose,
}: {
  visible: boolean;
  loading: boolean;
  chain: any[];
  colors: any;
  onClose: () => void;
}) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <View style={styles.sheetOverlay}>
      <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />

      <View style={[styles.sheetContainer, { backgroundColor: colors.secondPrimaryColor, maxHeight: '70%' }]}>
        <View style={[styles.sheetHandle, { backgroundColor: colors.borderColor }]} />

        <View style={styles.sheetHeaderRow}>
          <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>Approval Chain</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon type="Ionicons" name="close" size={22} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator color={colors.purple1} style={{ marginVertical: 30 }} />
        ) : chain.length === 0 ? (
          <Text style={[styles.emptyListSubText, { color: colors.textSecondary, textAlign: 'center', marginVertical: 30 }]}>
            No approval information available
          </Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {chain.map((approver, index) => {
              const approverStatusMeta =
                getStatusMeta(colors)[approver.requestStatus] || getStatusMeta(colors).Pending;
              return (
                <View key={approver.id ?? index} style={[styles.approverRow, { borderBottomColor: colors.borderColor }]}>
                  <View style={[styles.approverAvatar, { backgroundColor: colors.lightPurple }]}>
                    <Text style={[styles.approverInitial, { color: colors.purple1 }]}>
                      {approver.name?.charAt(0)?.toUpperCase() || '?'}
                    </Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: scale(12) }}>
                    <Text style={[styles.approverName, { color: colors.textPrimary }]} numberOfLines={1}>
                      {approver.name || 'N/A'}
                    </Text>
                    <Text style={[styles.approverSubText, { color: colors.textSecondary }]} numberOfLines={1}>
                      {[approver.designationName?.trim(), approver.departmentName].filter(Boolean).join(' • ')}
                    </Text>
                    {approver.approvedDate ? (
                      <Text style={[styles.approverSubText, { color: colors.textSecondary }]}>
                        {formatDateTime(approver.approvedDate)}
                      </Text>
                    ) : null}
                  </View>
                  <View style={[styles.statusPill, { backgroundColor: approverStatusMeta.bg }]}>
                    <Text style={[styles.statusPillText, { color: approverStatusMeta.color }]}>
                      {approverStatusMeta.label}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}

        <TouchableOpacity style={[styles.closeButton, { backgroundColor: colors.purple1 }]} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

// ---------- Approve / reject remarks sheet ----------

const ApproveRejectModal = ({
  visible,
  decision,
  colors,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  decision?: 'Approved' | 'Rejected';
  colors: any;
  onClose: () => void;
  onSubmit: (remarks: string) => Promise<void>;
}) => {
  const [remarks, setRemarks] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const isReject = decision === 'Rejected';

  useEffect(() => {
    if (visible) setRemarks('');
  }, [visible]);

  const handleSubmit = async () => {
    setSubmitting(true);
    await onSubmit(remarks);
    setSubmitting(false);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.sheetOverlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />

        <View style={[styles.sheetContainer, { backgroundColor: colors.secondPrimaryColor }]}>
          <View style={[styles.sheetHandle, { backgroundColor: colors.borderColor }]} />

          <View style={styles.sheetHeaderRow}>
            <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>
              {isReject ? 'Reject Leave Request' : 'Approve Leave Request'}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon type="Ionicons" name="close" size={22} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <FieldLabel text="Remarks" colors={colors} />
          <View style={[styles.remarksBox, { borderColor: colors.borderColor, backgroundColor: colors.primaryColor }]}>
            <TextInput
              value={remarks}
              onChangeText={(text) => text.length <= 250 && setRemarks(text)}
              placeholder={isReject ? 'Reason for rejection' : 'Add a remark (optional)'}
              placeholderTextColor={colors.textSecondary}
              style={[styles.remarksInput, { color: colors.textPrimary }]}
              multiline
              maxLength={250}
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: isReject ? colors.redColor : colors.purple1, marginTop: scale(16) }]}
            onPress={handleSubmit}
            disabled={submitting}
          >
            {submitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>{isReject ? 'Reject' : 'Approve'}</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// ---------- New leave request screen ----------

const NewLeaveRequestModal = ({
  visible,
  colors,
  leaveTypes,
  employeeId,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  colors: any;
  leaveTypes: any[];
  employeeId: number | string;
  onClose: () => void;
  onSubmit: (payload: any) => void | Promise<void>;
}) => {
  const [leaveTypeId, setLeaveTypeId] = useState<number | string | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [remarks, setRemarks] = useState('');
  const [typePickerVisible, setTypePickerVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [attachment, setAttachment] = useState<{ name: string; remotePath: string } | null>(null);
  const [attachmentUploading, setAttachmentUploading] = useState(false);
  const [datePicker, setDatePicker] = useState<{ visible: boolean; mode: 'from' | 'to' }>({
    visible: false,
    mode: 'from',
  });


  const normalizedTypes = leaveTypes.map((t) => ({
    id: t.id ?? t.leaveID,
    label: t.leaveName?.trim?.() ?? t.name ?? t.leaveType ?? 'Leave',
    leaveBalance: t.leaveBalance ?? 0
  }));

  const selectedLeaveType = normalizedTypes.find((t) => t.id === leaveTypeId);

  const totalDaysLabel = useMemo(() => {
    if (!fromDate || !toDate) return '0 day';
    const days = daysBetweenInclusive(fromDate, toDate);
    if (days <= 0) return '0 day';
    return days === 1 ? '1 day' : `${days} days`;
  }, [fromDate, toDate]);

  const resetForm = () => {
    setLeaveTypeId(null);
    setFromDate(null);
    setToDate(null);
    setRemarks('');
    setAttachment(null);
  };

  const pickAndUploadAttachment = async () => {
    // const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    // if (!permission.granted) {
    //   Alert.alert('Permission required', 'Please allow photo library access to attach a document.');
    //   return;
    // }
    // const result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ['images'],
    //   quality: 0.7,
    // });
    // if (result.canceled || !result.assets?.[0]) return;

    // const asset = result.assets[0];
    // const fileName = asset.fileName || `attachment_${Date.now()}.jpg`;

    // setAttachmentUploading(true);
    // try {
    //   const formData = new FormData();
    //   formData.append('file', {
    //     uri: asset.uri,
    //     name: fileName,
    //     type: asset.mimeType || 'image/jpeg',
    //   } as any);
    //   formData.append('id', String(employeeId));

    //   const r = await axios.post(`${baseUrl}${endPoints.UploadFileESS}`, formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   });

    //   let remotePath;
    //   if (r.data.status === 200){
    //     remotePath = r.data.path;
    //     setAttachment({ name: fileName, remotePath });
    //   }else{
    //     showMessage({
    //       message:'Failed to uplaod attachment ',
    //       description:`${r.data.message}`,
    //       type:'danger',
    //       style:CommonStyle.error
    //     })
    //     setAttachment({ name: fileName, remotePath });
    //   }


        
      
    // } catch (error) {
    //   console.log('error uploading attachment', error);
    //   Alert.alert('Error', 'Failed to upload attachment');
    // } finally {
    //   setAttachmentUploading(false);
    // }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!selectedLeaveType) {
      Alert.alert('Error', 'Please select a leave type');
      return;
    }
    if (!fromDate) {
      Alert.alert('Error', 'Please select a start date');
      return;
    }
    if (!toDate) {
      Alert.alert('Error', 'Please select an end date');
      return;
    }
    if (toDate < fromDate) {
      Alert.alert('Error', 'End date cannot be before start date');
      return;
    }
    if (attachmentUploading) {
      Alert.alert('Please wait', 'Your attachment is still uploading');
      return;
    }

    setSubmitting(true);
    await onSubmit({
      leaveTypeId: selectedLeaveType.id,
      leaveTypeLabel: selectedLeaveType.label,
      fromDate,
      toDate,
      remarks,
      attachmentPath: attachment?.remotePath || '',
    });
    setSubmitting(false);
    resetForm();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
        <StatusBar backgroundColor={colors.primaryColor} barStyle="dark-content" />

        <View style={styles.formHeaderRow}>
          <TouchableOpacity style={styles.formHeaderSide} onPress={handleClose}>
            <Icon type="Ionicons" name="chevron-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.formHeaderTitle, { color: colors.textPrimary }]}>New Leave Request</Text>
          <View style={styles.formHeaderSide} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formScrollContent}>
          <View style={[styles.infoBanner, { backgroundColor: colors.lightPurple }]}>
            <Icon type="Ionicons" name="document-text" size={20} color={colors.purple1} />
            <View style={{ flex: 1, marginLeft: scale(10) }}>
              <Text style={[styles.infoBannerTitle, { color: colors.textPrimary }]}>Need time off?</Text>
              <Text style={[styles.infoBannerSubText, { color: colors.textSecondary }]}>
                Submit your leave request and we&apos;ll notify you once it&apos;s reviewed.
              </Text>
            </View>
          </View>

          {/* <Text style={[styles.formSectionTitle, { color: colors.textPrimary }]}>Leave Details</Text> */}

          <FieldLabel text="Leave Type " colors={colors} />
          <TouchableOpacity
            style={[styles.formField, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
            onPress={() => setTypePickerVisible(true)}
          >
            <Text style={[styles.formFieldText, { color: selectedLeaveType ? colors.textPrimary : colors.textSecondary }]}>
              {selectedLeaveType ? selectedLeaveType.label : 'Select leave type'}
            </Text>
            <Icon type="Ionicons" name="chevron-down" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

          <FieldLabel text="From Date " colors={colors} />
          <TouchableOpacity
            style={[styles.formField, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
            onPress={() => setDatePicker({ visible: true, mode: 'from' })}
          >
            <Text style={[styles.formFieldText, { color: fromDate ? colors.textPrimary : colors.textSecondary }]}>
              {fromDate ? formatShortDate(fromDate) : 'Select start date'}
            </Text>
            <Icon type="Ionicons" name="calendar-outline" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

          <FieldLabel text="To Date " colors={colors} />
          <TouchableOpacity
            style={[styles.formField, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
            onPress={() => setDatePicker({ visible: true, mode: 'to' })}
          >
            <Text style={[styles.formFieldText, { color: toDate ? colors.textPrimary : colors.textSecondary }]}>
              {toDate ? formatShortDate(toDate) : 'Select end date'}
            </Text>
            <Icon type="Ionicons" name="calendar-outline" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

          <FieldLabel text="Total Days" colors={colors} />
          <View style={[styles.totalDaysBox, { backgroundColor: colors.primaryColor, borderColor: colors.borderColor }]}>
            <Text style={[styles.formFieldText, { color: colors.textSecondary }]}>{totalDaysLabel}</Text>
          </View>

          <FieldLabel text="Remarks (Optional)" colors={colors} />
          <View style={[styles.remarksBox, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}>
            <TextInput
              value={remarks}
              onChangeText={(text) => text.length <= 250 && setRemarks(text)}
              placeholder="Enter your remarks"
              placeholderTextColor={colors.textSecondary}
              style={[styles.remarksInput, { color: colors.textPrimary }]}
              multiline
              maxLength={250}
            />
            <Text style={[styles.remarksCounter, { color: colors.textSecondary }]}>{remarks.length}/250</Text>
          </View>

          <FieldLabel text="Attachment (Optional)" colors={colors} />
          {attachment ? (
            <View style={[styles.attachmentRow, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}>
              <Icon type="Ionicons" name="document-attach-outline" size={20} color={colors.purple1} />
              <View style={{ flex: 1, marginLeft: scale(10) }}>
                <Text style={[styles.attachmentTitle, { color: colors.textPrimary }]} numberOfLines={1}>
                  {attachment.name}
                </Text>
                <Text style={[styles.attachmentSubText, { color: colors.textSecondary }]}>Uploaded</Text>
              </View>
              <TouchableOpacity onPress={pickAndUploadAttachment} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Icon type="Ionicons" name="refresh-outline" size={20} color={colors.purple1} style={{ marginRight: scale(14) }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAttachment(null)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Icon type="Ionicons" name="close-circle" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.attachmentRow, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
              onPress={pickAndUploadAttachment}
              disabled={attachmentUploading}
            >
              <Icon type="Ionicons" name="attach-outline" size={20} color={colors.purple1} />
              <View style={{ flex: 1, marginLeft: scale(10) }}>
                <Text style={[styles.attachmentTitle, { color: colors.textPrimary }]}>
                  {attachmentUploading ? 'Uploading...' : 'Add supporting document'}
                </Text>
                <Text style={[styles.attachmentSubText, { color: colors.textSecondary }]}>JPG or PNG</Text>
              </View>
              {attachmentUploading ? (
                <ActivityIndicator color={colors.purple1} />
              ) : (
                <Icon type="Ionicons" name="chevron-forward" size={18} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.purple1, marginTop: scale(24) }]}
            onPress={handleSubmit}
            disabled={submitting}
          >
            {submitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Submit Request</Text>}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      <LeaveTypePickerSheet
        visible={typePickerVisible}
        colors={colors}
        types={normalizedTypes}
        selectedId={leaveTypeId}
        onSelect={(id) => {
          setLeaveTypeId(id);
          setTypePickerVisible(false);
        }}
        onClose={() => setTypePickerVisible(false)}
      />

      <CalendarSheet
        visible={datePicker.visible}
        label={datePicker.mode === 'from' ? 'Select start date' : 'Select end date'}
        initialDate={datePicker.mode === 'from' ? fromDate : toDate}
        minDate={datePicker.mode === 'to' ? fromDate : null}
        colors={colors}
        onClose={() => setDatePicker((prev) => ({ ...prev, visible: false }))}
        onConfirm={(date) => {
          if (datePicker.mode === 'from') {
            setFromDate(date);
            if (date && toDate && toDate < date) setToDate(null);
          } else {
            setToDate(date);
          }
          setDatePicker((prev) => ({ ...prev, visible: false }));
        }}
      />
    </Modal>
  );
};

const FieldLabel = ({ text, colors }: { text: string; colors: any }) => (
  <Text style={[styles.fieldLabel, { color: colors.textPrimary }]}>{text}</Text>
);

// ---------- Leave type picker (bottom sheet) ----------

const LeaveTypePickerSheet = ({
  visible,
  colors,
  types,
  selectedId,
  onSelect,
  onClose,
}: {
  visible: boolean;
  colors: any;
  types: { id: number | string; label: string, leaveBalance: number }[];
  selectedId: number | string | null;
  onSelect: (id: number | string) => void;
  onClose: () => void;
}) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
    <View style={styles.sheetOverlay}>
      <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />
      <View style={[styles.sheetContainer, { backgroundColor: colors.secondPrimaryColor, maxHeight: '60%' }]}>
        <View style={[styles.sheetHandle, { backgroundColor: colors.purple1 }]} />
        <View style={styles.sheetHeaderRow}>
          <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>Select Leave Type</Text>
          {/* <TouchableOpacity onPress={onClose}>
            <Icon type="Ionicons" name="close" size={22} color={colors.textSecondary} />
          </TouchableOpacity> */}
        </View>
        {types.length === 0 ? (
          <Text style={[styles.emptyListSubText, { color: colors.textSecondary, textAlign: 'center', marginVertical: 20 }]}>
            No leave types available
          </Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {types.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[styles.typeOptionRow, { borderBottomColor: colors.borderColor }]}
                onPress={() => onSelect(type.id)}
              >
                <Text style={[styles.typeOptionText, { color: colors.textPrimary }]}>{type.label}  </Text>
                <Text style={{
                  color: colors.textPrimary, fontSize: 14,
                  fontFamily: 'PlusJakartaSans-Regular',
                }}>Leaves Reamining :{type.leaveBalance.toString()}  </Text>
                {selectedId === type.id && <Icon type="Ionicons" name="checkmark" size={18} color={colors.purple1} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  </Modal>
);

// ---------- Calendar bottom sheet ----------

const CalendarSheet = ({
  visible,
  label,
  initialDate,
  minDate,
  colors,
  onClose,
  onConfirm,
}: {
  visible: boolean;
  label: string;
  initialDate: Date | null;
  minDate: Date | null;
  colors: any;
  onClose: () => void;
  onConfirm: (date: Date | null) => void;
}) => {
  const today = new Date();
  const defaultDate = initialDate || (minDate && minDate > today ? minDate : today);

  const [viewYear, setViewYear] = useState(defaultDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(defaultDate.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate || defaultDate);

  React.useEffect(() => {
    if (visible) {
      const base = initialDate || (minDate && minDate > today ? minDate : today);
      setViewYear(base.getFullYear());
      setViewMonth(base.getMonth());
      setSelectedDate(initialDate || base);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const cells = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isDisabled = (date: Date) => {
    if (!minDate) return false;
    const start = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    return date < start;
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.sheetOverlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />

        <View style={[styles.sheetContainer, { backgroundColor: colors.secondPrimaryColor }]}>
          <View style={[styles.sheetHandle, { backgroundColor: colors.borderColor }]} />

          <View style={styles.sheetHeaderRow}>
            <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>{label}</Text>
            <TouchableOpacity onPress={() => setSelectedDate(null)}>
              <Text style={[styles.clearText, { color: colors.purple1 }]}>Clear</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.monthNavRow}>
            <TouchableOpacity onPress={goToPrevMonth}>
              <Icon type="Ionicons" name="chevron-back" size={20} color={colors.textPrimary} />
            </TouchableOpacity>
            <Text style={[styles.monthNavText, { color: colors.textPrimary }]}>
              {MONTH_NAMES[viewMonth]} {viewYear}
            </Text>
            <TouchableOpacity onPress={goToNextMonth}>
              <Icon type="Ionicons" name="chevron-forward" size={20} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <View style={styles.weekdayRow}>
            {WEEKDAYS.map((day) => (
              <Text key={day} style={[styles.weekdayText, { color: colors.textSecondary }]}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {cells.map((cell, index) => {
              const disabled = !cell.inMonth || isDisabled(cell.date);
              const selected = selectedDate && isSameDay(cell.date, selectedDate);
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.calendarCell}
                  disabled={disabled}
                  onPress={() => setSelectedDate(cell.date)}
                >
                  <View style={[styles.calendarDayCircle, selected && { backgroundColor: colors.purple1 }]}>
                    <Text
                      style={[
                        styles.calendarDayText,
                        { color: cell.inMonth ? colors.textPrimary : colors.textSecondary },
                        !cell.inMonth && { opacity: 0.4 },
                        isDisabled(cell.date) && cell.inMonth && { opacity: 0.3 },
                        selected && { color: '#fff', fontFamily: 'PlusJakartaSans-SemiBold' },
                      ]}
                    >
                      {cell.date.getDate()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.purple1, marginTop: scale(8) }]}
            onPress={() => onConfirm(selectedDate)}
          >
            <Text style={styles.submitButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// ---------- Styles ----------

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Section switcher
  sectionSwitcher: {
    flexDirection: 'row',
    marginHorizontal: scale(16),
    marginTop: scale(12),
    padding: 4,
    borderRadius: 12,
    gap: 4,
  },
  sectionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: scale(10),
    borderRadius: 9,
  },
  sectionButtonText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  sectionBadge: {
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionBadgeText: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-Bold',
  },

  // Search
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(16),
    marginTop: scale(12),
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: 10,
    borderWidth: 1,
    gap: scale(8),
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    padding: 0,
  },

  // Tabs
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    marginTop: scale(14),
    marginBottom: scale(6),
  },
  tabItem: {
    alignItems: 'center',
    paddingBottom: scale(8),
  },
  tabText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  tabIndicator: {
    height: 2,
    width: '100%',
    borderRadius: 1,
    marginTop: 6,
  },

  // List
  listContent: {
    paddingHorizontal: scale(16),
    paddingTop: scale(8),
    paddingBottom: scale(100),
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    padding: scale(14),
    marginBottom: scale(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  cardIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    flex: 1,
    marginLeft: scale(12),
    marginRight: scale(8),
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Medium',
    flex: 1,
    marginRight: 8,
  },
  cardDateRange: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: 4,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  cardMetaText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
    flexShrink: 1,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  statusPillText: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  eyeButton: {
    paddingLeft: scale(8),
  },

  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyListText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginTop: 12,
  },
  emptyListSubText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 4,
  },

  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  // Pending approval card
  pendingCard: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  pendingTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pendingInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: scale(10),
  },
  pendingRemarks: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
    fontStyle: 'italic',
    marginTop: scale(8),
  },
  pendingActionsRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginTop: scale(14),
  },
  pendingActionButton: {
    flex: 1,
    paddingVertical: scale(10),
    borderRadius: 10,
    alignItems: 'center',
  },
  pendingActionText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },

  // Bottom sheet (shared: detail modal, leave type picker, calendar)
  sheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheetContainer: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
    paddingBottom: scale(24),
    maxHeight: '88%',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: scale(14),
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(14),
  },
  sheetTitle: {
    fontSize: 17,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  sheetScrollContent: {
    paddingBottom: scale(10),
  },

  // Detail modal
  detailTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scale(18),
  },
  detailLeaveTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  appliedOnLabel: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  appliedOnText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: 2,
  },
  detailSection: {
    marginBottom: scale(18),
  },
  detailSectionTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginBottom: scale(10),
    paddingBottom: scale(8),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scale(10),
  },
  detailRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  detailRowLabel: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  detailRowValue: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
    flex: 1,
    textAlign: 'right',
  },
  closeButton: {
    paddingVertical: scale(14),
    borderRadius: 10,
    alignItems: 'center',
    marginTop: scale(6),
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },

  // Approval chain
  approverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(12),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  approverAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  approverInitial: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  approverName: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  approverSubText: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 2,
  },

  // New request form
  formHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(14),
  },
  formHeaderSide: {
    width: 32,
  },
  formHeaderTitle: {
    fontSize: 17,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  formScrollContent: {
    paddingHorizontal: scale(16),
    paddingBottom: scale(40),
  },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    padding: scale(14),
    marginBottom: scale(20),
  },
  infoBannerTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  infoBannerSubText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 3,
    lineHeight: 17,
  },
  formSectionTitle: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-SemiBold',
    marginBottom: scale(12),
  },
  fieldLabel: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
    marginBottom: scale(6),
  },
  formField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: scale(14),
    paddingVertical: scale(13),
    marginBottom: scale(16),
  },
  formFieldText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  totalDaysBox: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: scale(14),
    paddingVertical: scale(13),
    marginBottom: scale(16),
  },
  remarksBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: scale(14),
    marginBottom: scale(16),
  },
  remarksInput: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    minHeight: 80,
    textAlignVertical: 'top',
    padding: 0,
  },
  remarksCounter: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Regular',
    textAlign: 'right',
    marginTop: 6,
  },
  attachmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: scale(14),
    paddingVertical: scale(13),
    marginBottom: scale(16),
  },
  attachmentTitle: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  attachmentSubText: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: 2,
  },
  submitButton: {
    paddingVertical: scale(14),
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },

  // Leave type picker
  typeOptionRow: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingVertical: scale(14),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  typeOptionText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Medium',
  },

  // Calendar
  clearText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  monthNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(14),
  },
  monthNavText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: scale(6),
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarCell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarDayText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
  },
});
