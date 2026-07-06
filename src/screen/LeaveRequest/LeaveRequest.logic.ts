import { useRoute } from '@react-navigation/native';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser, getUserProfileData } from '../../redux/slices/authSlice';
import { getColors } from '../../theme/color/theme';
import { useThemeContext } from '../../theme/ThemeContex';
import { usePendingApprovals } from './PendingApproval/PendingApproval.logic';
import { useSubmittedLeave } from './SubmittedLeave/SubmittedLeave.logic';

export type LeaveRequestSection = 'SUBMITTED' | 'APPROVALS';

export const useLeaveRequest = () => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);

  const user = useSelector(getUser);
  const profileData = useSelector(getUserProfileData);
  const employeeId = user?.employeeId;

  const route = useRoute<any>();
  const [activeSection, setActiveSection] = useState<LeaveRequestSection>(route.params?.section ?? 'SUBMITTED');

  // Landing here via navigation.navigate('leaveRequest', { section: 'APPROVALS' }) (e.g. from
  // the Home dashboard's pending-approvals card) should jump straight to that tab even if this
  // screen instance is already mounted and route.params changes on a subsequent navigate.
  useEffect(() => {
    if (route.params?.section) setActiveSection(route.params.section);
  }, [route.params?.section]);

  // Both tabs' data is fetched here (rather than lazily inside each tab) so the
  // Pending Approval badge count stays accurate even while viewing the Submitted tab.
  const submitted = useSubmittedLeave(employeeId, profileData);
  const pendingApprovals = usePendingApprovals(employeeId);

  return {
    colors,
    employeeId,
    activeSection,
    setActiveSection,
    submitted,
    pendingApprovals,
  };
};
