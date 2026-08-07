
 const testApexURl = 'https://ait.vdc.services:1410' // test DB
 const liveApexURl = 'https://ait.vdc.services:5009' // live DB


export const activeApexURl = testApexURl; 

export const baseUrl = `${activeApexURl}/api/`;

export const endPoints = {
  login: "Account/Login",
  otpVerfiy: "auth/otp/verify",
  forgetpassord: "auth/password/forgot",
  passwordreset: "auth/password/reset",

  changePassword: 'Account/ChangePassword',



  TodayAttendance: 'ESSDashboard/GetTodayEmployeeAttendence',
  MonthlyAttendance: 'ESSDailytimesheet/GetMonthlyAttendance',
  GetUpcomingHolidays: 'ESSDashboard/GetUpcomingHolidays',
  GetEmployeeLeavesInfo: 'ESSDashboard/GetEmployeeLeavesInfo',
  GetEmployessDataESS: 'ESSEmployee/GetEmployessDataESS',

  // all employes 
  GetAllEmployesDataESS: 'ESSEmployee/GetEmployeesESS',

  SubmitNewLeaveRequest: '',

  GetLeaveTypesESS: 'EmployeeLeaveDetailESS/GetLeaveApplicationESS',
  GetLeaveApplicationByIDESS: 'EmployeeLeaveDetailESS/GetLeaveApplicationByIDESS',
  PostLeaveApplicationWithKPIs: 'EmployeeLeaveDetailESS/PostLeaveApplicationWithKPIs',
  PendingLeaveApplicationsListESS: 'EmployeeLeaveDetailESS/PendingLeaveApplicationsListESS',
  GetApprovalDetailESS: 'ApproveESS/GetApprovalDetailESS',
  ApproveRejectDocumentESS: 'ApproveESS/ApproveRejectDocumentESS',
  UploadFileESS: 'ESSFileUpload/UploadFileESS',
  DownloadFileESS: 'ESSFileUpload/DownloadFileESS',
  SendEmail: 'ESSDashboard/SendEmail',
  GetDeparmentsESS: 'ESSDashboard/GetDeparmentsESS',
  GetApprovedLeavesCalenderESS: 'ESSDashboard/GetApprovedLeavesCalenderESS',
  GetAllManagers: 'ESSDashboard/GetAllManagers',

  PostWFHApplication: 'WFHApplication/PostWFHApplication',
  GetWFHApplication: 'WFHApplication/GetWFHApplicationByEmployeeId',
  PendingWFHApplicationsList: 'WFHApplication/PendingWFHApplicationsList',
  PostWFHAttendance: "ESSDailytimesheet/PostWFHAttendance",






};
