import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../../../redux/slices/authSlice';
import { LeaveCalendarService } from '../../../../services/LeaveCalendarService';

// The Leave Calendar (dashboard card, drawer entry and history screen) is manager-only -
// GetAllManagers returns the empIds allowed to see it. Shared so the drawer can hide its menu
// item the same way the calendar itself hides for non-managers.
export const useIsManager = () => {
  const userData = useSelector(getUser);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    (async () => {
      if (!userData?.employeeId) {
        setCheckingAccess(false);
        return;
      }
      try {
        const result = await LeaveCalendarService.getAllManagers();
        const managerIds: any[] = result.data?.data || [];
        setIsManager(managerIds.some((id) => Number(id) === Number(userData.employeeId)));
      } catch (err) {
        console.error('Error checking manager access:', err);
        setIsManager(false);
      } finally {
        setCheckingAccess(false);
      }
    })();
    // Runs once on mount - manager access doesn't change during the screen's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { checkingAccess, isManager };
};
