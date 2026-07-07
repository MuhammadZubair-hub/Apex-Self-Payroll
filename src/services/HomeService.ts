import { baseUrl, endPoints } from './Constants/endPoints';
import { apicall } from './index';

export const HomeService = {
  getUpcomingHolidays: (employeeId: number | string) =>
    apicall({ endpoint: `${baseUrl}${endPoints.GetUpcomingHolidays}?EmployeeId=${employeeId}`, method: 'GET' }),

  getEmployeeLeavesInfo: (employeeId: number | string) =>
    apicall({ endpoint: `${baseUrl}${endPoints.GetEmployeeLeavesInfo}?employeeId=${employeeId}`, method: 'GET' }),

  getPendingLeaveApplications: (employeeId: number | string) =>
    apicall({
      endpoint: `${baseUrl}${endPoints.PendingLeaveApplicationsListESS}?UserId=${employeeId}`,
      method: 'GET',
    }),
};
