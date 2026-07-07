
const newApexURl = 'https://ait.vdc.services:1410/api/'
// const newApexURl = 'https://syi.superyachtinteriors.ae:2001/api/'

export const baseUrl = newApexURl;

export const endPoints = {
  login: "Account/Login",
  otpVerfiy: "auth/otp/verify",
  forgetpassord: "auth/password/forgot",
  passwordreset: "auth/password/reset",



  TodayAttendance :'ESSDashboard/GetTodayEmployeeAttendence',
  MonthlyAttendance :'ESSDailytimesheet/GetMonthlyAttendance',
  GetUpcomingHolidays: 'ESSDashboard/GetUpcomingHolidays',
  GetEmployeeLeavesInfo: 'ESSDashboard/GetEmployeeLeavesInfo',
  GetEmployessDataESS: 'ESSEmployee/GetEmployessDataESS',

  SubmitNewLeaveRequest :'',

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






  //dummy
  RegisterUser: "Registeruser",
  changePassword: "changePassword",
  deleteUser: "deleteUser",
  updateUser: "updateUser",

  getAllUsers: "getAllUsers",
  attendance: "attendanceSignIn", // signin
  attendancesignout: "attendancesignout", // signout
  userAttendaceRecord: "userAttendaceRecord", // userattendanceRecord

  AssignTask: "AssignTask",
  getallTask: "getallTask",
  updateTask: "updateTask",

  LeaveRequest: "LeaveRequest",
  updateLeaveRequest: "updateLeaveRequest",
  getallLeaveRequest: "getallLeaveRequest",

  LoanRequest: "LoanRequest",
  updateLoanRequest: "updateLoanRequest",
  getallLoanRequest: "getallLoanRequest",

  claimRequest: "claimRequest",
  updateClaimExpenseRequest: "updateClaimExpenseRequest",
  getallClaimexpenseRequest: "getallClaimexpenseRequest",

  CreateAnnouncement: "CreateAnnouncement",
  updateAnnouncement: "updateAnnouncement",
  deleteAnnouncement: "deleteAnnouncement",
  getAllAnnouncement: "getAllAnnouncement",

  getTeamMembers: "getTeamMembers",
  getUperManagement: "getUperManagement",
  getLowwerManagement: "getLowwerManagement",
};
