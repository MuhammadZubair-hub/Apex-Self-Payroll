import { useCallback, useEffect, useMemo, useState } from 'react';
import { getColors } from '../../../theme/color/theme';
import { useThemeContext } from '../../../theme/ThemeContex';
import { WFHService } from '../../../services/WFHService';
import { showThemedMessage } from '../../../utils/flashMessage';
import { toDateOnlyString } from '../../LeaveRequest/leaveRequest.constants';

type Decision = 'Approved' | 'Rejected';

export const usePendingWFHApprovals = (employeeId: number | string | undefined) => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [loadingApprovals, setLoadingApprovals] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionTarget, setActionTarget] = useState<{ item: any; decision: Decision } | null>(null);
  const [searchText, setSearchText] = useState('');

  const filteredApprovals = useMemo(() => {
    if (!searchText.trim()) return pendingApprovals;
    const lowerSearch = searchText.trim().toLowerCase();
    return pendingApprovals.filter((item) => {
      const haystack = `${item.reason || item.Reason || ''} ${item.employeeName || item.EmployeeName || item.empName || item.EmpName || item.name || item.Name || ''}`.toLowerCase();
      return haystack.includes(lowerSearch);
    });
  }, [pendingApprovals, searchText]);

  const fetchPendingApprovals = useCallback(async () => {
    if (!employeeId) return;
    try {
      const r = await WFHService.getPendingWFHApprovals(employeeId);
      // console.log('pending wfh approvals response', r)
        ; const dataList = r.data?.status ? r.data.data : Array.isArray(r.data) ? r.data : (r.data?.data || []);
      setPendingApprovals(Array.isArray(dataList) ? dataList : []);
    } catch (error) {
      console.log('error fetching pending WFH approvals', error);
      showThemedMessage(colors, { message: 'Failed to fetch pending WFH approvals', type: 'danger' });
    } finally {
      setLoadingApprovals(false);
      setRefreshing(false);
    }
  }, [employeeId, colors]);

  useEffect(() => {
    fetchPendingApprovals();
  }, [fetchPendingApprovals]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPendingApprovals();
  }, [fetchPendingApprovals]);

  const openApprove = useCallback((item: any) => setActionTarget({ item, decision: 'Approved' }), []);
  const openReject = useCallback((item: any) => setActionTarget({ item, decision: 'Rejected' }), []);
  const closeActionTarget = useCallback(() => setActionTarget(null), []);

  const handleApproveReject = useCallback(
    async (remarks: string) => {
      if (!actionTarget) return;
      const { item, decision } = actionTarget;
      const wfhId = item.id;
      const pendingAtId = employeeId;
      const now = new Date();

      console.log("nsnvisnvoisnvoi", JSON.stringify({
        approvedDate: toDateOnlyString(now),
        createDate: `${toDateOnlyString(now)}T00:00:00`,
        docType: 'WFH',
        fKID: wfhId,
        pendingAtId,
        remarks,
        requestStatus: decision,
      }))

      try {
        const r = await WFHService.approveRejectWFH({
          approvedDate: toDateOnlyString(now),
          createDate: `${toDateOnlyString(now)}T00:00:00`,
          docType: 'WFH',
          fKID: wfhId,
          pendingAtId,
          remarks,
          requestStatus: decision,
        });
        console.log('the approve/reject response', r);

        if (!r.success || (r.data && r.data.status !== 1 && r.data.status !== true)) {
          showThemedMessage(colors, {
            message: `Failed to ${decision.toLowerCase()} ${r.data?.message || r.message || ''}`,
            type: 'danger',
          });
          return;
        }

        setActionTarget(null);
        setTimeout(() => {
          showThemedMessage(colors, { message: `WFH request ${decision.toLowerCase()} successfully`, type: 'success' });
        }, 300);
        fetchPendingApprovals();
      } catch (error) {
        console.log('error approving/rejecting WFH request', error);
        showThemedMessage(colors, { message: `Failed to ${decision.toLowerCase()} request`, type: 'danger' });
      }
    },
    [actionTarget, employeeId, fetchPendingApprovals, colors]
  );

  return {
    pendingApprovals: filteredApprovals,
    searchText,
    setSearchText,
    loadingApprovals,
    refreshing,
    actionTarget,
    onRefresh,
    openApprove,
    openReject,
    closeActionTarget,
    handleApproveReject,
  };
};
