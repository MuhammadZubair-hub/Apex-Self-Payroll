import { baseUrl, endPoints } from './Constants/endPoints';
import { apicall } from './index';

export const AttendanceService = {
  getTodayAttendance: (employeeId: number | string) =>
    apicall({ endpoint: `${baseUrl}${endPoints.TodayAttendance}?employeeId=${employeeId}`, method: 'GET' }),

  getMonthlyAttendance: (employeeId: number | string, month: number, year: number) =>
    apicall({
      endpoint: `${baseUrl}${endPoints.MonthlyAttendance}?EmployeeId=${employeeId}&Month=${month}&Year=${year}`,
      method: 'GET',
    }),
};
