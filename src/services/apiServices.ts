import { baseUrl, endPoints } from "./Constants/endPoints";
import { apicall } from "./index";

export const API_Config = {
  loginUser: async (UserName: string, Password: string) => {
    console.log(UserName, Password);
    return apicall({
      endpoint: `${baseUrl}${endPoints.login}`,
      method: "POST",
      data: { UserName, Password, BackEndUrl: 'https://ait.vdc.services:1410' },
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

  RegisterUser: async (
    fullName: string,
    userName: string,
    password: string,
    user_Role: string,
    parentId: string,
    Cnic: string,
  ) => {
    return apicall({
      endpoint: `${baseUrl}${endPoints.RegisterUser}`,
      method: "POST",
      data: { fullName, userName, user_Role, Cnic, password, parentId },
    });
  },

  UpdatePassword: async (password: string, Cnic: string) => {
    return apicall({
      endpoint: `${baseUrl}${endPoints.changePassword}`,
      method: "POST",
      data: { Cnic, password },
    });
  },

  UpdatedUserProfile: async (data: any) => {
    return apicall({
      endpoint: `${baseUrl}${endPoints.updateUser}`,
      method: "POST",
      data: data,
    });
  },
  getAllAnnouncement: async () => {
    return apicall({
      endpoint: `${baseUrl}${endPoints.getAllAnnouncement}`,
      method: "GET",
      data: {},
    });
  },
  getLeaveTypes: async () => {
    return apicall({
      endpoint: `${baseUrl}admin/leave-types?filter=ACTIVE&page=0&size=1`,
      method: "GET",
    });
  },
};
