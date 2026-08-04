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
  const [filterDatePicker, setFilterDatePicker] = useState<{ visible: boolean; mode: 'from' | 'to' }>({
    visible: false,
    mode: 'from',
  });

  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [formModalVisible, setFormModalVisible] = useState(false);

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
      const rawData = r.data?.data ?? r.data;
      const dataList = Array.isArray(rawData) ? rawData : r.data?.status && Array.isArray(r.data?.data) ? r.data.data : [];
      setWfhApplications(dataList);
    } catch (error) {
      console.log('error fetching WFH applications', error);
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
        console.log('wfh request body', JSON.stringify(body));
        console.log('wfh response', r);

        if (!r.success && r.data?.status === false) {
          showThemedMessage(colors, { message: r.data?.message || r.message || 'Failed to submit WFH request', type: 'danger' });
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
  };
};
