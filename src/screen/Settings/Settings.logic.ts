import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUserProfileData, logout } from '../../redux/slices/authSlice';
import { getColors } from '../../theme/color/theme';
import { useThemeContext } from '../../theme/ThemeContex';

export const useSettings = () => {
  const { theme, toggleTheme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const userData = useSelector(getUser);
  const profileData = useSelector(getUserProfileData);

  const fullName = profileData?.name || userData?.employeeName || 'Employee';
  const designation = profileData?.designation || 'N/A';
  const profileImage = profileData?.profileImage;

  const goToProfile = useCallback(() => navigation.navigate('Profilescreen'), [navigation]);
  const goToSupport = useCallback(() => navigation.navigate('support'), [navigation]);
  const goToAbout = useCallback(() => navigation.navigate('about'), [navigation]);
  // const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  const [logoutConfirmVisible, setLogoutConfirmVisible] = useState(false);

  // console.log(' the profile data is ',profileData);

  const handleLogout = () => setLogoutConfirmVisible(true);
  const cancelLogout = () => setLogoutConfirmVisible(false);
  const confirmLogout = () => {
    setLogoutConfirmVisible(false);
    dispatch(logout());
  };

  return {
    colors,
    theme,
    toggleTheme,
    fullName,
    designation,
    profileImage,

    logoutConfirmVisible,

    goToProfile,
    goToSupport,
    goToAbout,
    handleLogout,
    cancelLogout,
    confirmLogout,
  };
};
