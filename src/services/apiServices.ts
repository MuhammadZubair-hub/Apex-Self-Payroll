import { baseUrl, endPoints, activeApexURl } from "./Constants/endPoints";
import { apicall } from "./index";

export const API_Config = {
  loginUser: async (UserName: string, Password: string) => {

    return apicall({
      endpoint: `${baseUrl}${endPoints.login}`,
      method: "POST",
      data: { UserName, Password, BackEndUrl: activeApexURl },
    });
  },
  changePassword: async (employeeId: string, oldPassword: string, newPassword: string) => {
    // console.log(employeeId, oldPassword,newPassword,`${baseUrl}${endPoints.changePassword}`)
    return apicall({
      endpoint: `${baseUrl}${endPoints.changePassword}`,
      method: "POST",
      data: {
        employeeId: parseInt(employeeId),
        oldPassword,
        newPassword
      },
    });
  },

  OtpVerfify: async (preAuthToken: string, otp: string) => {
    return apicall({
      endpoint: `${baseUrl}${endPoints.otpVerfiy}`,
      // endpoint: 'http://213.199.62.174:3300/api/auth/otp/verify',
      method: "POST",
      data: { preAuthToken, otp },
    });
  },

  Forgetpassword: async (email: string) => {
    return apicall({
      endpoint: `${baseUrl}${endPoints.forgetpassord}`,
      method: "POST",
      data: { email },
    });
  },

  PasswordReset: async (resetSessionToken: string, newPassword: string) => {
    return apicall({
      endpoint: `${baseUrl}${endPoints.passwordreset}`,
      method: "POST",
      data: { resetSessionToken, newPassword },
    });
  },

 

  UpdatePassword: async (password: string, Cnic: string) => {
    return apicall({
      endpoint: `${baseUrl}${endPoints.changePassword}`,
      method: "POST",
      data: { Cnic, password },
    });
  },

 
  getLeaveTypes: async () => {
    return apicall({
      endpoint: `${baseUrl}admin/leave-types?filter=ACTIVE&page=0&size=1`,
      method: "GET",
    });
  },

  getEmployeeProfile: async (employeeId: any) => {
    return apicall({
      endpoint: `${baseUrl}${endPoints.GetEmployessDataESS}?employeeId=${employeeId}`,
      method: "GET",
    });
  },
};
