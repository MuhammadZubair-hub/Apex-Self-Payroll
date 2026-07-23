import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StatusBar, Text, View, ImageBackground, Dimensions, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient'; // Use 'expo-linear-gradient' if on Expo
import Icon from '../../components/Icons';
import MyButton from '../../components/MyButton';
import ThemeToggle from '../../components/ThemeToggle';
import { AppSizes } from '../../utils/AppSizes';
import { scale, verticalScale } from '../../utils/responsive';
import { settingsStyles as styles } from './Settings.styles';
import { useSettings } from './Settings.logic';
import SettingsRow from './components/SettingsRow';
import ConfirmModal from '../../components/ConfirmModal';
import BottomSheet from '../../components/BottomSheet';
import MyInput from '../../components/MyInput';
import { useChangePassword } from '../Auth/Password/password';
import { showThemedMessage } from '../../utils/flashMessage';
import { API_Config } from '../../services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../../redux/slices/authSlice';
import LoadingBaseModal from '../../components/Loader/LoadingBaseModal';
import ChangePasswordModal from './components/ChangePasswordModal';


const SettingsScreen = () => {
  const {
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
  } = useSettings();
  const BACKGROUND_HEIGHT = Dimensions.get('window').height * 0.38;

  const navigation = useNavigation<any>();
  const [passwordModal, setPasswordModal] = useState(false);

  // Premium style definitions matching the theme dynamically
  const isDark = theme === 'dark';
  const cardBg = isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)';
  const cardBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 98, 227, 0.06)';
  const sectionTitleColor = isDark ? '#94A3B8' : '#64748B';


  const [isSecure, setIsSecure] = useState(true);
  const [isOldSecure, setIsOldSecure] = useState(true);
  const [isnewSecure, setIsNewSecure] = useState(true);
  const userData = useSelector(getUser);


const dispatch = useDispatch();
  // const {
  //   userName,
  //   passwordPayload,
  //   setPasswordPayload,
  //   handleUpdatePassword,
  //   isLoading,
  // } = useChangePassword();

  const [passwordPayload, setPasswordPayload] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePassword = async () => {
    const { oldPassword, newPassword, confirmPassword } = passwordPayload;

    if (!oldPassword || !newPassword || !confirmPassword) {
      showThemedMessage(colors, { message: 'Please enter all fields', type: 'danger' });
      return;
    }

    if (newPassword !== confirmPassword) {
      showThemedMessage(colors, { message: 'Passwords do not match', type: 'danger' });
      return;
    }

    setIsLoading(true);

    try {
      const response = await API_Config.changePassword(userData?.employeeId, oldPassword, newPassword);
      console.log('the password update is :', response);
      if (response?.success && response.data.status) {
        // navigation.reset({ index: 0, routes: [{ name: 'Logn' }] });
        setPasswordModal(false);
        dispatch(logout());
        showThemedMessage(colors, { message: 'Password updated successfully', type: 'success' });
      }
      else {
        showThemedMessage(colors, { message: `${response.data.message}`, type: 'danger' })
      }
    } catch (error) {
      showThemedMessage(colors, { message: `Password update failed ${error}`, type: 'danger' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primaryColor, flex: 1 }]}>
      <StatusBar translucent backgroundColor="transparent" barStyle={isDark ? 'light-content' : 'dark-content'} />

      {/* Background Pattern */}
      <ImageBackground
        // blurRadius={3}
        source={require('../../assets/Images/bgt.png')}
        resizeMode="cover"
        style={{
          opacity: 0.3,
          position: 'absolute', top: 0, left: 0, right: 0, height: BACKGROUND_HEIGHT
        }}
      >
        {/* Premium Smooth Gradient Blend */}
        <LinearGradient
          colors={[
            'rgba(230, 240, 254, 0.2)',
            'rgba(230, 240, 254, 0.6)',
            colors.primaryColor
          ]}
          style={StyleSheet.absoluteFillObject}
        />
      </ImageBackground>



      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>

        {/* Header Navigation Menu */}
        <View style={premiumStyles.headerContainer}>
          <Icon
            type="Ionicons"
            name="menu-outline"
            size={AppSizes.ICON_30}
            color={colors.textPrimary}
            onPress={() => navigation.getParent()?.toggleDrawer()}
            style={{
              backgroundColor: colors.secondPrimaryColor, padding: AppSizes.PV_4, borderRadius: AppSizes.RADIUS_4,
              shadowColor: '#0062e3',
              elevation: 5
            }}
          />
          <Text style={[premiumStyles.premiumHeaderTitle, { color: colors.textPrimary }]}></Text>
          {/* Layout balancer */}
          <View style={{ width: AppSizes.ICON_30 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={premiumStyles.scrollContent}>

          {/* Profile Card with Premium Glassmorphism Look */}
          <View style={[premiumStyles.premiumCard, { backgroundColor: cardBg, borderColor: cardBorder, marginTop: verticalScale(10) }]}>
            <View style={premiumStyles.avatarContainer}>
              {profileImage ? (
                <Image source={{ uri: `https://superyachtinteriors.ae${profileImage}` }} style={premiumStyles.premiumAvatar} />
              ) : (
                <View style={[premiumStyles.premiumAvatar, { backgroundColor: '#0062e3' }]}>
                  <Text style={premiumStyles.avatarInitial}>{fullName.charAt(0).toUpperCase()}</Text>
                </View>
              )}
            </View>
            <Text style={[premiumStyles.premiumName, { color: colors.textPrimary }]} numberOfLines={1}>
              {fullName}
            </Text>
            <Text style={premiumStyles.premiumDesignation} numberOfLines={1}>
              {designation}
            </Text>
          </View>

          {/* Preferences Section */}
          <Text style={[premiumStyles.premiumSectionTitle, { color: colors.textPrimary }]}>PREFERENCES</Text>
          <View style={[premiumStyles.premiumCard, premiumStyles.compactCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <SettingsRow
              icon={isDark ? 'moon' : 'sunny'}
              label="Dark Mode"
              colors={colors}
              isLast
              rightElement={<ThemeToggle theme={theme} colors={colors} onToggle={toggleTheme} />}
            />
           
          </View>

          {/* Account Section */}
          <Text style={[premiumStyles.premiumSectionTitle, { color: colors.textPrimary }]}>ACCOUNT SERVICES</Text>
          <View style={[premiumStyles.premiumCard, { backgroundColor: cardBg, borderColor: cardBorder, }]}>
            <SettingsRow icon="person-outline" label="My Profile" colors={colors} onPress={goToProfile} />
            <SettingsRow
              icon={'lock-closed-outline'}
              label="Change Password"
              colors={colors}
              isLast
              onPress={() => { setPasswordModal(prev => !prev) }}
              // rightElement={<ThemeToggle theme={theme} colors={colors} onToggle={toggleTheme} />}
            />
            <SettingsRow icon="help-circle-outline" label="Help & Support" colors={colors} onPress={goToSupport} />
            <SettingsRow icon="information-circle-outline" label="About ESS" colors={colors} onPress={goToAbout} isLast />
          </View>

          {/* Clean Redesigned Sign Out Button */}
          <MyButton
            text="Sign Out"
            onPress={handleLogout}
            textColor={colors.redColor}
            style={premiumStyles.logoutButton}
          />
        </ScrollView>
      </SafeAreaView>

      <ConfirmModal
        visible={logoutConfirmVisible}
        colors={colors}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        destructive
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />

      {/* <BottomSheet
        visible={passwordModal}
        colors={colors}
        title='ChangePassword'
        onClose={() => { setPasswordModal(prev => !prev) }}
      >
        <KeyboardAvoidingView
          // style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >




            <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: AppSizes.FONT_24, alignSelf: 'center', color: colors.textPrimary }}>Forget Password!</Text>

            <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: AppSizes.FONT_14, alignSelf: 'center', color: colors.textSecondary }}>Update your password to access your account </Text>

            <View style={premiumStyles.formGroup}>
              <MyInput
                placeholder="Enter your Username"
                label="User Name"
                value={userData?.userName}
                iconType="Ionicons"
                iconName="person-outline"
                containerStyle={premiumStyles.inputContainer}
                editable={false}
              />

              <MyInput
                placeholder="Enter Old Password"
                label="Old Password"
                value={passwordPayload.oldPassword}
                onChangeText={(v) => {
                  setPasswordPayload((prev) => ({ ...prev, oldPassword: v }));
                }}
                iconType="Ionicons"
                iconName="lock-closed-outline"
                secure={isOldSecure}
                containerStyle={premiumStyles.inputContainer}
                rightComponent={
                  <Icon name={isOldSecure ? "eye-off-outline" : "eye-outline"}
                    onPress={() => { setIsOldSecure(prev => !prev) }}
                    type={"Ionicons"} color={colors.textSecondary} />
                }
              />

              <MyInput
                placeholder="Enter New Password"
                label="New Password"
                value={passwordPayload.newPassword}
                onChangeText={(v) => {
                  setPasswordPayload((prev) => ({ ...prev, newPassword: v }));
                }}
                iconType="Ionicons"
                iconName="lock-closed-outline"
                secure={isSecure}
                containerStyle={premiumStyles.inputContainer}
                rightComponent={
                  <Icon name={isSecure ? "eye-off-outline" : "eye-outline"}
                    onPress={() => { setIsSecure(prev => !prev) }}
                    type={"Ionicons"} color={colors.textSecondary} />
                }
              />
              <MyInput
                placeholder="Confirm New Password"
                label="Confirm Password"
                value={passwordPayload.confirmPassword}
                onChangeText={(v) => {
                  setPasswordPayload((prev) => ({ ...prev, confirmPassword: v }));
                }}
                iconType="Ionicons"
                iconName="lock-closed-outline"
                secure={isnewSecure}
                containerStyle={premiumStyles.inputContainer}
                rightComponent={
                  <Icon name={isnewSecure ? "eye-off-outline" : "eye-outline"}
                    onPress={() => { setIsNewSecure(prev => !prev) }}
                    type={"Ionicons"} color={colors.textSecondary} />
                }

              />

              <MyButton
                text="Update Password"
                style={[
                  premiumStyles.loginButton,
                  { backgroundColor: colors.purple1 },
                ]}
                onPress={handleUpdatePassword}
              />



            </View>
          </ScrollView>
        </KeyboardAvoidingView>

      </BottomSheet> */}

<ChangePasswordModal
  visible={passwordModal}
  onClose={() => setPasswordModal(prev => !prev)}
  colors={colors}
  userName={userData?.userName}
  passwordPayload={passwordPayload}
  setPasswordPayload={setPasswordPayload}
  onSubmit={handleUpdatePassword}
/>
      <LoadingBaseModal
        visible={isLoading}
      />

    </View>
  );
};

// Premium UI Styling Layer
const premiumStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(10),
    height: verticalScale(50),
  },
  premiumHeaderTitle: {
    fontSize: scale(19),
    fontFamily: 'PlusJakartaSans-Bold',
    letterSpacing: 0.3,
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(30),
  },
  premiumCard: {
    borderRadius: scale(24),
    padding: scale(20),
    borderWidth: 1,
    marginBottom: verticalScale(18),
    // Soft Premium Shadows
    shadowColor: '#0062e3',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
    opacity: 0.89
  },
  // A card wrapping just one row (Preferences) looks oversized with the full premiumCard
  // padding - the row already carries its own vertical padding, so this only needs a little
  // breathing room from the card edges.
  compactCard: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(2),
  },
  avatarContainer: {
    alignSelf: 'center',
    shadowColor: '#0062e3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: verticalScale(12),
  },
  premiumAvatar: {
    width: scale(75),
    height: scale(75),
    borderRadius: scale(37.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  avatarInitial: {
    fontSize: scale(28),
    fontFamily: 'PlusJakartaSans-Bold',
    color: '#ffffff',
  },
  premiumName: {
    fontSize: scale(18),
    fontFamily: 'PlusJakartaSans-Bold',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  premiumDesignation: {
    fontSize: scale(13),
    fontFamily: 'PlusJakartaSans-Medium',
    color: '#0062e3',
    textAlign: 'center',
    marginTop: verticalScale(3),
    letterSpacing: 0.4,
  },
  premiumSectionTitle: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-SemiBold',
    letterSpacing: 1.2,
    marginVertical: verticalScale(10),
    marginLeft: scale(6),
  },
  logoutButton: {
    marginTop: verticalScale(12),
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: scale(16),
    height: verticalScale(52),
    justifyContent: 'center',
    width: '100%',
  },
  formGroup: {
    marginTop: verticalScale(20),
    marginBottom: scale(4),
    rowGap: verticalScale(20),
    paddingHorizontal: scale(15),
  },
  inputContainer: {
    borderRadius: scale(16),
  },
  loginButton: {
    marginTop: scale(20),
    borderRadius: scale(10),
    paddingVertical: scale(10),
    // width: '40%',
    alignSelf: 'flex-end',
  },
});

export default SettingsScreen;
