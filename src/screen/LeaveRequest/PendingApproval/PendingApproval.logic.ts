import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { showMessage } from 'react-native-flash-message';
import { baseUrl, endPoints } from '../../../services/Constants/endPoints';
import { CommonStyle } from '../../../utils/Common/CommonStyle';
import { toDateOnlyString } from '../leaveRequest.constants';

type Decision = 'Approved' | 'Rejected';

export const usePendingApprovals = (employeeId: number | string | undefined) => {
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [loadingApprovals, setLoadingApprovals] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionTarget, setActionTarget] = useState<{ item: any; decision: Decision } | null>(null);

  const fetchPendingApprovals = useCallback(async () => {
    if (!employeeId) return;
    try {
      const r = await axios.get(`${baseUrl}${endPoints.PendingLeaveApplicationsListESS}?UserId=${employeeId}`);
      setPendingApprovals(r.data?.status ? r.data.data || [] : []);
    } catch (error) {
      console.log('error fetching pending approvals', error);
      showMessage({ message: 'Failed to fetch pending approvals', type: 'danger', style: CommonStyle.error });
    } finally {
      setLoadingApprovals(false);
      setRefreshing(false);
    }
  }, [employeeId]);

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
          showMessage({
            message: r.data?.message || `Failed to ${decision.toLowerCase()} request`,
            type: 'danger',
            style: CommonStyle.error,
          });
          return;
        }
        setActionTarget(null);
        showMessage({
          message: `Leave request ${decision.toLowerCase()} successfully`,
          type: 'success',
          style: CommonStyle.sucsses,
        });
        fetchPendingApprovals();
      } catch (error) {
        console.log('error approving/rejecting leave request', error);
        showMessage({ message: `Failed to ${decision.toLowerCase()} request`, type: 'danger', style: CommonStyle.error });
      }
    },
    [actionTarget, employeeId, fetchPendingApprovals]
  );

  return {
    pendingApprovals,
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
