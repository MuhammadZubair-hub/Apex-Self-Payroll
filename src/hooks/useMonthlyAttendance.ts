import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { AttendanceService } from '../services/AttendanceService';
import { getMonthlyAttendance, setMonthlyAttendance } from '../redux/slices/attendanceSlice';

// Home's Attendance Overview card and the Attendance screen's bar chart both need the same
// month's attendance records. Backed by Redux (not local state) so whichever screen fetches
// first populates the cache for the other - switching between them doesn't refetch the same
// employeeId/month/year twice.
export const useMonthlyAttendance = (employeeId: number | string | undefined, month: number, year: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const records = useSelector((state: RootState) => getMonthlyAttendance(state, employeeId, month, year));

  const fetchMonthlyAttendance = useCallback(
    async (force = false) => {
      if (!employeeId) return undefined;
      if (!force && records !== undefined) return records;

      const result = await AttendanceService.getMonthlyAttendance(employeeId, month, year);
      const data = result.data?.status ? result.data.data || [] : [];
      dispatch(setMonthlyAttendance({ employeeId, month, year, records: data }));
      return data;
    },
    [dispatch, employeeId, month, year, records]
  );

  return { records, fetchMonthlyAttendance };
};
