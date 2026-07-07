import { baseUrl, endPoints } from './Constants/endPoints';
import { apicall } from './index';

export const LeaveCalendarService = {
  getAllManagers: () => apicall({ endpoint: `${baseUrl}${endPoints.GetAllManagers}`, method: 'GET' }),

  getDepartments: () => apicall({ endpoint: `${baseUrl}${endPoints.GetDeparmentsESS}`, method: 'GET' }),

  getApprovedLeavesCalendar: (monthName: string, year: number, departmentId: number | string) =>
    apicall({
      endpoint: `${baseUrl}${endPoints.GetApprovedLeavesCalenderESS}?month=${monthName}&year=${year}&departmentId=${departmentId}`,
      method: 'GET',
    }),
};
