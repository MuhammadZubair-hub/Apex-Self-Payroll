import { baseUrl, endPoints } from './Constants/endPoints';
import { apicall } from './index';

export const WFHService = {
  getWFHApplications: (employeeId: number | string) =>
    apicall({
      endpoint: `${baseUrl}${endPoints.GetWFHApplication}?empid=${employeeId}`,
      method: 'GET',
    }),

  submitWFHApplication: (body: Record<string, any>) =>
    apicall({
      endpoint: `${baseUrl}${endPoints.PostWFHApplication}`,
      method: 'POST',
      data: body,
      silent: true,
    }),

  getPendingWFHApprovals: (userId: number | string) =>
    apicall({
      endpoint: `${baseUrl}${endPoints.PendingWFHApplicationsList}?UserId=${userId}`,
      method: 'GET',
    }),

  approveRejectWFH: (body: Record<string, any>) =>
    apicall({
      endpoint: `${baseUrl}${endPoints.ApproveRejectDocumentESS}`,
      method: 'POST',
      data: body,
      silent: true,
    }),
};
