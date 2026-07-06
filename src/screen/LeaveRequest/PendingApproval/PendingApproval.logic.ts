import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getColors } from '../../../theme/color/theme';
import { useThemeContext } from '../../../theme/ThemeContex';
import { baseUrl, endPoints } from '../../../services/Constants/endPoints';
import { showThemedMessage } from '../../../utils/flashMessage';
import { toDateOnlyString } from '../leaveRequest.constants';

type Decision = 'Approved' | 'Rejected';

export const usePendingApprovals = (employeeId: number | string | undefined) => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const [pendingApprovals, setPendingApprovals] = useState<any[]>([]);
  const [loadingApprovals, setLoadingApprovals] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionTarget, setActionTarget] = useState<{ item: any; decision: Decision } | null>(null);

  const fetchPendingApprovals = useCallback(async () => {
    if (!employeeId) return;
    try {
      console.log(' i am called ')
      const r = await axios.get(`${baseUrl}${endPoints.PendingLeaveApplicationsListESS}?UserId=${employeeId}`);
      setPendingApprovals(r.data?.status ? r.data.data || [] : []);
    } catch (error) {
      console.log('error fetching pending approvals', error);
      showThemedMessage(colors, { message: 'Failed to fetch pending approvals', type: 'danger' });
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
      const leaveId = item.id;
      const pendingAtId = item.pendingAtId ?? employeeId;
      const now = new Date();

      console.log('action traget is this :', actionTarget);

      console.log('', toDateOnlyString(now), leaveId, pendingAtId,
        remarks,
        decision)

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

        console.log('this is response', r);

        setActionTarget(null);
        // The BottomSheet holds the app's FlashMessage instance while it's open (see
        // ModalFlashMessage) and only unholds it in an effect cleanup that fires after this
        // closes - showing the toast synchronously here sends it to the instance that's
        // mid-close, so it never renders. Deferring past the close animation lets it land
        // on the root FlashMessage instead.
        console.log(r.data.status)
        if (r.data.status !== 1) {
          showThemedMessage(colors, { message: `Failed to ${decision.toLowerCase()} ${r.data.message}`, type: 'danger' });
        }
        setTimeout(() => {
          showThemedMessage(colors, { message: `Leave request ${decision.toLowerCase()} successfully`, type: 'success' });
        }, 300);
        fetchPendingApprovals();
      } catch (error) {
        console.log('error approving/rejecting leave request', error);
        showThemedMessage(colors, { message: `Failed to ${decision.toLowerCase()} request`, type: 'danger' });
      }
    },
    [actionTarget, employeeId, fetchPendingApprovals, colors]
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
