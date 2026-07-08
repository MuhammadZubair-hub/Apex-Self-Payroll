import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AttendanceState {
  // Keyed by `${employeeId}_${month}_${year}` so the Home dashboard's Attendance Overview and
  // the Attendance screen's bar chart share one fetch instead of each hitting the API for the
  // same month.
  monthlyByKey: Record<string, any[]>;
}

const initialState: AttendanceState = {
  monthlyByKey: {},
};

export const monthlyAttendanceKey = (employeeId: number | string, month: number, year: number) =>
  `${employeeId}_${month}_${year}`;

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setMonthlyAttendance: (
      state,
      action: PayloadAction<{ employeeId: number | string; month: number; year: number; records: any[] }>
    ) => {
      const { employeeId, month, year, records } = action.payload;
      state.monthlyByKey[monthlyAttendanceKey(employeeId, month, year)] = records;
    },
  },
});

export const getMonthlyAttendance = (
  state: any,
  employeeId: number | string | undefined,
  month: number,
  year: number
): any[] | undefined =>
  employeeId != null ? state.attendance?.monthlyByKey[monthlyAttendanceKey(employeeId, month, year)] : undefined;

export const { setMonthlyAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
