import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getUser, getUserProfileData } from '../../redux/slices/authSlice';
import { getColors } from '../../theme/color/theme';
import { useThemeContext } from '../../theme/ThemeContex';

export interface ProfileFieldRow {
  icon: string;
  label: string;
  value: string;
}

const formatDate = (dateString: any) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'N/A';

  return `${String(date.getDate()).padStart(2, '0')} ${date.toLocaleString('en', {
    month: 'short',
  })} ${date.getFullYear()}`;
};

export const useProfile = () => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);

  const userData = useSelector(getUser);
  const profileData = useSelector(getUserProfileData);
  const data: any = profileData || {};

  const employeeId = data.legacyCode || data.code || 'N/A';
  const fullName = data.name || [data.fName, data.lName].filter(Boolean).join(' ') || userData?.employeeName || 'User';
  const designation = data.designation || 'N/A';
  const department = data.department || 'N/A';
  const companyEmail = data.compEmail || data.email || 'N/A';
  const mobileNo = data.mobileNo || 'N/A';
  const profileImage = data.profileImage;

  const personalFields: ProfileFieldRow[] = useMemo(
    () => [
      { icon: 'id-card-outline', label: 'Employee ID', value: employeeId },
      { icon: 'person-outline', label: 'Full Name', value: fullName },
      { icon: 'calendar-outline', label: 'Date of Birth', value: formatDate(data.dob) },
      { icon: 'male-female-outline', label: 'Gender', value: data.gender || 'N/A' },
      { icon: 'heart-outline', label: 'Marital Status', value: data.maritalStatus || 'N/A' },
      { icon: 'globe-outline', label: 'Nationality', value: data.nationality || 'N/A' },
    ],
    [employeeId, fullName, data.dob, data.gender, data.maritalStatus, data.nationality]
  );

  const employmentFields: ProfileFieldRow[] = useMemo(
    () => [
      { icon: 'business-outline', label: 'Department', value: department },
      { icon: 'briefcase-outline', label: 'Designation', value: designation },
      { icon: 'calendar-outline', label: 'Date of Joining', value: formatDate(data.dateOfJoining) },
      { icon: 'time-outline', label: 'Employment Type', value: data.employmentType || 'N/A' },
      { icon: 'person-outline', label: 'Reporting Manager', value: data.reportingManager || data.managerName || 'N/A' },
    ],
    [department, designation, data.dateOfJoining, data.employmentType, data.reportingManager, data.managerName]
  );

  return {
    colors,
    theme,
    fullName,
    employeeId,
    designation,
    department,
    companyEmail,
    mobileNo,
    profileImage,
    personalFields,
    employmentFields,
  };
};
