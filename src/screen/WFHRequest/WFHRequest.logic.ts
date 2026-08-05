import { useRoute } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser, getUserProfileData } from '../../redux/slices/authSlice';
import { WFHService } from '../../services/WFHService';
import { getColors } from '../../theme/color/theme';
import { useThemeContext } from '../../theme/ThemeContex';
import { showThemedMessage } from '../../utils/flashMessage';
import { daysBetweenInclusive } from '../LeaveRequest/leaveRequest.constants';
import { NewWFHRequestPayload } from './components/NewWFHRequestModal/NewWFHRequestModal.logic';
import { usePendingWFHApprovals } from './PendingApproval/PendingWFHApproval.logic';
import axios from 'axios';
import { baseUrl, endPoints } from '../../services/Constants/endPoints';

export type WFHRequestSection = 'SUBMITTED' | 'APPROVALS';

export const useWFHRequest = () => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);

  const user = useSelector(getUser);
  const profileData = useSelector(getUserProfileData);
  const employeeId = user?.employeeId;

  const route = useRoute<any>();
  const [activeSection, setActiveSection] = useState<WFHRequestSection>(route.params?.section ?? 'SUBMITTED');

  useEffect(() => {
    if (route.params?.section) setActiveSection(route.params.section);
  }, [route.params?.section]);

  const [wfhApplications, setWfhApplications] = useState<any[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterFromDate, setFilterFromDate] = useState<Date | null>(null);
  const [filterToDate, setFilterToDate] = useState<Date | null>(null);

  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [formModalVisible, setFormModalVisible] = useState(false);

  const [approvalChainFor, setApprovalChainFor] = useState<any>(null);
  const [approvalChain, setApprovalChain] = useState<any[]>([]);
  const [approvalChainLoading, setApprovalChainLoading] = useState(false);

  const pendingApprovals = usePendingWFHApprovals(employeeId);

  const filteredApplications = useMemo(() => {
    return wfhApplications.filter((item) => {
      const itemStatus = item.requestStatus || item.RequestStatus || (item.flgApproved ? 'Approved' : 'Pending');
      const matchesStatus = statusFilter === 'ALL' || itemStatus.toUpperCase() === statusFilter.toUpperCase();
      const haystack = `${item.reason || item.Reason || item.name || item.employeeName || item.EmployeeName || ''}`.toLowerCase();
      const matchesSearch = !searchText.trim() || haystack.includes(searchText.trim().toLowerCase());

      const itemFromDate = item.fromDate || item.FromDate;
      const itemToDate = item.toDate || item.ToDate;
      const matchesFrom = !filterFromDate || (itemToDate && new Date(itemToDate) >= filterFromDate);
      const matchesTo = !filterToDate || (itemFromDate && new Date(itemFromDate) <= filterToDate);

      return matchesStatus && matchesSearch && matchesFrom && matchesTo;
    });
  }, [wfhApplications, statusFilter, searchText, filterFromDate, filterToDate]);

  const hasActiveFilters = statusFilter !== 'ALL' || !!filterFromDate || !!filterToDate;

  const fetchWFHApplications = useCallback(async () => {
    if (!employeeId) return;
    try {
      const r = await WFHService.getWFHApplications(employeeId);
      // const w = await axios.get(`${baseUrl}${endPoints.GetWFHApplication}?EmployeeId=${employeeId}`)
      // console.log("w", w.data);
      const rawData = r.data?.data ?? r.data;
      const dataList = Array.isArray(rawData) ? rawData : r.data?.status && Array.isArray(r.data?.data) ? r.data.data : [];
      setWfhApplications(dataList);
    } catch (error) {
      // console.log('error fetching WFH applications', error);
      showThemedMessage(colors, { message: 'Failed to fetch WFH applications', type: 'danger' });
    } finally {
      setLoadingApplications(false);
      setRefreshing(false);
    }
  }, [employeeId, colors]);

  useEffect(() => {
    fetchWFHApplications();
  }, [fetchWFHApplications]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchWFHApplications();
  }, [fetchWFHApplications]);

  const openApprovalChain = useCallback(async (item: any) => {
    setApprovalChainFor(item);
    setApprovalChainLoading(true);
    setApprovalChain([]);
    try {
      const wfhId = item.wfhId ?? item.id ?? item.Id;
      const r = await WFHService.getApprovalChain(wfhId);
      setApprovalChain(r.data?.status ? r.data.data || [] : []);
    } catch (error) {
      console.log('error fetching WFH approval chain', error);
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

  const resetFilters = useCallback(() => {
    setStatusFilter('ALL');
    setFilterFromDate(null);
    setFilterToDate(null);
    closeFilterModal();
  }, [closeFilterModal]);

  const formatDateToYYYYMMDD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleNewRequestSubmit = useCallback(
    async (payload: NewWFHRequestPayload) => {
      try {
        const empNum = Number(employeeId) || 0;
        const body = {
          Id: 0,
          EmpID: empNum,
          EmployeeName: profileData?.name || user?.fullName || user?.employeeName || 'Employee',
          EmpDesignation: profileData?.designation || profileData?.role || 'Software Engineer',
          EmpDepartment: profileData?.department || 'IT',
          FromDate: formatDateToYYYYMMDD(payload.fromDate),
          ToDate: formatDateToYYYYMMDD(payload.toDate),
          NoOfDaysWFHReq: daysBetweenInclusive(payload.fromDate, payload.toDate),
          Reason: payload.reason,
          RequestStatus: 'Pending',
          FlgApproved: false,
          CreatedBy: empNum,
        };

        const r = await WFHService.submitWFHApplication(body);
        // console.log('wfh request body', JSON.stringify(body));
        // console.log('wfh response', r);

        if (!r.success) {
          showThemedMessage(colors, { message: r.data?.message || r.message || 'Failed to submit WFH request', type: 'danger' });
          return false;
        }
        if (r.data?.status === 0 || r.data?.status === false) {
          showThemedMessage(colors, { message: r.data?.message || 'Failed to submit WFH request', type: 'danger' });
          return false;
        }

        setFormModalVisible(false);
        setTimeout(() => {
          showThemedMessage(colors, { message: 'WFH request submitted successfully', type: 'success' });
        }, 300);
        fetchWFHApplications();
        return true;
      } catch (error) {
        console.log('error submitting WFH request', error);
        showThemedMessage(colors, { message: 'Failed to submit WFH request', type: 'danger' });
        return false;
      }
    },
    [employeeId, profileData, user, fetchWFHApplications, colors]
  );

  return {
    colors,
    employeeId,
    activeSection,
    setActiveSection,
    wfhApplications,
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
    setFilterFromDate,
    filterToDate,
    setFilterToDate,
    resetFilters,
    onRefresh,
    closeSelectedApplication,
    openFormModal,
    closeFormModal,
    setSelectedApplication,
    handleNewRequestSubmit,
    pendingApprovals,
    approvalChainFor,
    approvalChain,
    approvalChainLoading,
    openApprovalChain,
    closeApprovalChain,
  };
};
