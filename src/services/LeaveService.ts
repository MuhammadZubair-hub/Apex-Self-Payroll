import { baseUrl, endPoints } from './Constants/endPoints';
import { apicall } from './index';

export const LeaveService = {
  getLeaveTypes: (employeeId: number | string) =>
    apicall({ endpoint: `${baseUrl}${endPoints.GetLeaveTypesESS}?EmployeeId=${employeeId}`, method: 'GET' }),

  getLeaveApplications: (employeeId: number | string) =>
    apicall({ endpoint: `${baseUrl}${endPoints.GetLeaveApplicationByIDESS}?EmployeeId=${employeeId}`, method: 'GET' }),

  submitLeaveApplication: (body: Record<string, any>) =>
    apicall({ endpoint: `${baseUrl}${endPoints.PostLeaveApplicationWithKPIs}`, method: 'POST', data: body, silent: true }),

  getApprovalChain: (applicationId: number | string) =>
    apicall({
      endpoint: `${baseUrl}${endPoints.GetApprovalDetailESS}?DocType=Leave&ApplicationId=${applicationId}`,
      method: 'GET',
    }),

  // multipart/form-data, so it overrides apicall's default JSON content-type.
  uploadAttachment: (formData: FormData) =>
    apicall({
      endpoint: `${baseUrl}${endPoints.UploadFileESS}`,
      method: 'POST',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      silent: true,
    }),

  getPendingApprovals: (userId: number | string) =>
    apicall({ endpoint: `${baseUrl}${endPoints.PendingLeaveApplicationsListESS}?UserId=${userId}`, method: 'GET' }),

  approveRejectDocument: (body: Record<string, any>) =>
    apicall({ endpoint: `${baseUrl}${endPoints.ApproveRejectDocumentESS}`, method: 'POST', data: body, silent: true }),
};
