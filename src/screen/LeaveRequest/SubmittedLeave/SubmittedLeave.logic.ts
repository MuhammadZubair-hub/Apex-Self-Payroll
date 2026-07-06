import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getColors } from '../../../theme/color/theme';
import { useThemeContext } from '../../../theme/ThemeContex';
import { baseUrl, endPoints } from '../../../services/Constants/endPoints';
import { showThemedMessage } from '../../../utils/flashMessage';
import { daysBetweenInclusive, toMidnightISOString } from '../leaveRequest.constants';
import { NewLeaveRequestPayload } from './components/NewLeaveRequestModal/NewLeaveRequestModal.logic';

export const useSubmittedLeave = (employeeId: number | string | undefined, profileData: any) => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const [leaveApplications, setLeaveApplications] = useState<any[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterFromDate, setFilterFromDate] = useState<Date | null>(null);
  const [filterToDate, setFilterToDate] = useState<Date | null>(null);
  const [filterDatePicker, setFilterDatePicker] = useState<{ visible: boolean; mode: 'from' | 'to' }>({
    visible: false,
    mode: 'from',
  });

  const [leaveType, setLeaveType] = useState<any[]>([]);

  const [approvalChainFor, setApprovalChainFor] = useState<any>(null);
  const [approvalChain, setApprovalChain] = useState<any[]>([]);
  const [approvalChainLoading, setApprovalChainLoading] = useState(false);

  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [formModalVisible, setFormModalVisible] = useState(false);

  const filteredApplications = useMemo(() => {
    return leaveApplications.filter((item) => {
      const matchesStatus = statusFilter === 'ALL' || item.requestStatus === statusFilter;
      const haystack = `${item.leaveName || ''} ${item.remarks || ''}`.toLowerCase();
      const matchesSearch = !searchText.trim() || haystack.includes(searchText.trim().toLowerCase());
      const matchesFrom = !filterFromDate || new Date(item.toDate) >= filterFromDate;
      const matchesTo = !filterToDate || new Date(item.fromDate) <= filterToDate;
      return matchesStatus && matchesSearch && matchesFrom && matchesTo;
    });
  }, [leaveApplications, statusFilter, searchText, filterFromDate, filterToDate]);

  const hasActiveFilters = statusFilter !== 'ALL' || !!filterFromDate || !!filterToDate;

  const fetchLeaveTypes = useCallback(async () => {
    try {
      const r = await axios.get(`${baseUrl}${endPoints.GetLeaveTypesESS}?EmployeeId=${employeeId}`);
      setLeaveType(r.data?.status ? r.data.data || [] : []);
    } catch (error) {
      console.log('error fetching leave types', error);
    }
  }, [employeeId]);

  const fetchLeaveApplications = useCallback(async () => {
    if (!employeeId) return;
    try {
      const r = await axios.get(`${baseUrl}${endPoints.GetLeaveApplicationByIDESS}?EmployeeId=${employeeId}`);
      setLeaveApplications(r.data?.status ? r.data.data || [] : []);
    } catch (error) {
      console.log('error fetching leave applications', error);
      showThemedMessage(colors, { message: 'Failed to fetch leave applications', type: 'danger' });
    } finally {
      setLoadingApplications(false);
      setRefreshing(false);
    }
  }, [employeeId, colors]);

  useEffect(() => {
    fetchLeaveTypes();
    fetchLeaveApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchLeaveApplications();
  }, [fetchLeaveApplications]);

  const openApprovalChain = useCallback(async (item: any) => {
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
  }, []);

  const closeApprovalChain = useCallback(() => setApprovalChainFor(null), []);
  const closeSelectedApplication = useCallback(() => setSelectedApplication(null), []);
  const openFormModal = useCallback(() => setFormModalVisible(true), []);
  const closeFormModal = useCallback(() => setFormModalVisible(false), []);

  const openFilterModal = useCallback(() => setFilterModalVisible(true), []);
  const closeFilterModal = useCallback(() => setFilterModalVisible(false), []);

  const openFilterDatePicker = useCallback((mode: 'from' | 'to') => setFilterDatePicker({ visible: true, mode }), []);
  const closeFilterDatePicker = useCallback(() => setFilterDatePicker((prev) => ({ ...prev, visible: false })), []);

  const confirmFilterDate = useCallback(
    (date: Date | null) => {
      if (filterDatePicker.mode === 'from') {
        setFilterFromDate(date);
        if (date && filterToDate && filterToDate < date) setFilterToDate(null);
      } else {
        setFilterToDate(date);
      }
      setFilterDatePicker((prev) => ({ ...prev, visible: false }));
    },
    [filterDatePicker.mode, filterToDate]
  );

  const resetFilters = useCallback(() => {
    setStatusFilter('ALL');
    setFilterFromDate(null);
    setFilterToDate(null);
  }, []);

  const handleNewRequestSubmit = useCallback(
    async (payload: NewLeaveRequestPayload) => {
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
          showThemedMessage(colors, { message: r.data?.message || 'Failed to submit leave request', type: 'danger' });
          return;
        }
        setFormModalVisible(false);
        showThemedMessage(colors, { message: 'Leave request submitted successfully', type: 'success' });
        fetchLeaveApplications();
      } catch (error) {
        console.log('error submitting leave request', error);
        showThemedMessage(colors, { message: 'Failed to submit leave request', type: 'danger' });
      }
    },
    [employeeId, profileData, fetchLeaveApplications, colors]
  );

  return {
    leaveApplications,
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
  };
};
