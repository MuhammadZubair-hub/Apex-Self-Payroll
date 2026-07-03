import { useMemo, useState } from 'react';
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

  const [activeSection, setActiveSection] = useState<LeaveRequestSection>('SUBMITTED');

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
