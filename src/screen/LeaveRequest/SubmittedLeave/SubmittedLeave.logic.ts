import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { baseUrl, endPoints } from '../../../services/Constants/endPoints';
import { CommonStyle } from '../../../utils/Common/CommonStyle';
import { daysBetweenInclusive, toMidnightISOString } from '../leaveRequest.constants';
import { NewLeaveRequestPayload } from './components/NewLeaveRequestModal/NewLeaveRequestModal.logic';

export const useSubmittedLeave = (employeeId: number | string | undefined, profileData: any) => {
  const [leaveApplications, setLeaveApplications] = useState<any[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [leaveType, setLeaveType] = useState<any[]>([]);

  const [approvalChainFor, setApprovalChainFor] = useState<any>(null);
  const [approvalChain, setApprovalChain] = useState<any[]>([]);
  const [approvalChainLoading, setApprovalChainLoading] = useState(false);

  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [formModalVisible, setFormModalVisible] = useState(false);

  const filteredApplications = useMemo(() => {
    return leaveApplications.filter((item) => {
      const matchesTab = statusFilter === 'ALL' || item.requestStatus === statusFilter;
      const haystack = `${item.leaveName || ''} ${item.remarks || ''}`.toLowerCase();
      const matchesSearch = !searchText.trim() || haystack.includes(searchText.trim().toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [leaveApplications, statusFilter, searchText]);

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
      showMessage({ message: 'Failed to fetch leave applications', type: 'danger', style: CommonStyle.error });
    } finally {
      setLoadingApplications(false);
      setRefreshing(false);
    }
  }, [employeeId]);

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

  const toggleSearch = useCallback(() => {
    setSearchVisible((v) => !v);
    setSearchText('');
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
          showMessage({
            message: r.data?.message || 'Failed to submit leave request',
            type: 'danger',
            style: CommonStyle.error,
          });
          return;
        }
        setFormModalVisible(false);
        showMessage({ message: 'Leave request submitted successfully', type: 'success', style: CommonStyle.sucsses });
        fetchLeaveApplications();
      } catch (error) {
        console.log('error submitting leave request', error);
        showMessage({ message: 'Failed to submit leave request', type: 'danger', style: CommonStyle.error });
      }
    },
    [employeeId, profileData, fetchLeaveApplications]
  );

  return {
    leaveApplications,
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
    toggleSearch,
    setSelectedApplication,
    handleNewRequestSubmit,
  };
};
