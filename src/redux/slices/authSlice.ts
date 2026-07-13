import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  userId: string;
  accessToken: string,
  firstName: string;
  fullName: string;
  lastName: string;
  refreshToken: string;
  phoneNumber: string;
  firstTimeLogged?: boolean;

};

interface todayAttend {
  date: string | null,
  marked: boolean
}

interface AuthState {
  user: User | null;
  todayAttendance: todayAttend
  isActive: 'Customer' | 'Employee';
  isAuthenticated: boolean;
  userProfile : any,
}

const initialState: AuthState = {
  user: null,
  todayAttendance: {
    date: null,
    marked: false
  },
  isActive: 'Customer',
  isAuthenticated: false,
  userProfile :null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setisActive: (state, action) => {
      state.isActive = action.payload;
    },

    loginSuccess: (state, action: PayloadAction<{ data: { data: User,profileData :any } }>) => {

      // console.log(' the payload to save is , ',action);
      // Unwrap nested API response
      state.user = action.payload.data.data;
      state.userProfile = action.payload.data.profileData;
    },
    logout: state => {
      state.user = null;
      state.userProfile = null;
    },
     attendanceMarked: (state, action) => {
      // console.log('on reducer this is ;',action.payload);
      state.todayAttendance = action.payload;
    },
  },
});

export const getUser = (state: any) => state.auth?.user;
export const getUserProfileData = (state: any) => state.auth?.userProfile;

export const getIsActive = (state: any) => state.auth?.isActive;
export const getTodayRecord = (state: any) => state.auth?.todayAttendance;

export const { loginSuccess, logout, setisActive ,attendanceMarked} = authSlice.actions;
export default authSlice.reducer;
