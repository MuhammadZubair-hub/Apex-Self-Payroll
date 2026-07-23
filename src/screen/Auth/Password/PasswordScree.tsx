import { Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useThemeContext } from '../../../theme/ThemeContex'
import { getColors } from '../../../theme/color/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import MyInput from '../../../components/MyInput';
import Icon from '../../../components/Icons';
import MyButton from '../../../components/MyButton';
import LoadingBaseModal from '../../../components/Loader/LoadingBaseModal';
import { scale, verticalScale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';
import { useChangePassword } from './password';

const PasswordScreen = () => {

  const { theme } = useThemeContext();
  const colors = getColors(theme);
  const [isSecure, setIsSecure] = useState(true);
  const [isOldSecure, setIsOldSecure] = useState(true);
  const [isNewSecure, setIsNewSecure] = useState(true);
  const {
    userName,
    passwordPayload,
    setPasswordPayload,
    handleUpdatePassword,
    isLoading,
  } = useChangePassword();
  return (

    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>

      <StatusBar
        backgroundColor={colors.primarayheaderColor}
        barStyle="light-content"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Image
            // source={
            //   theme == "dark"
            //     ? require("./../../src/assets/Images/company-logo-black.png")
            //     : require("./../../src/assets/Images/company-logo-white.png")
            // }
            //source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC0SaFGGoJber21xJukDLpCHrql1k4rmx-rZhe1QVdLQ&s=10' }}
            //source={{ uri: 'https://img.magnific.com/premium-vector/online-scam-malware-password-phishing-funny-hacker-mask-steals-information-flat-vector_985641-5690.jpg' }}
            source={require('../../../assets/Images/esslogo2.png')}
            style={styles.logo}
            // resizeMode="contain"
            resizeMode="cover"
          />



          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: AppSizes.FONT_24, alignSelf: 'center', color: colors.textPrimary }}>Update Password</Text>

          <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: AppSizes.FONT_14, alignSelf: 'center', color: colors.textSecondary }}>Update your password to secure your account </Text>

          <View style={styles.formGroup}>
            <MyInput
              placeholder="Enter your Username"
              label="User Name"
              value={userName}
              iconType="Ionicons"
              iconName="person-outline"
              containerStyle={styles.inputContainer}
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
              containerStyle={styles.inputContainer}
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
              containerStyle={styles.inputContainer}
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
              secure={isNewSecure}
              containerStyle={styles.inputContainer}
              rightComponent={
                <Icon name={isNewSecure ? "eye-off-outline" : "eye-outline"}
                  onPress={() => { setIsNewSecure(prev => !prev) }}
                  type={"Ionicons"} color={colors.textSecondary} />
              }
            />

            <MyButton
              text="Update Password"
              style={[
                styles.loginButton,
                { backgroundColor: colors.purple1 },
              ]}
              onPress={handleUpdatePassword}
            />



          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <LoadingBaseModal
        visible={isLoading}
      />

    </SafeAreaView>

  );
}

export default PasswordScreen

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Illustration / avatar section
  illustrationContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(8),
  },
  logo: {
    marginTop: verticalScale(60),
    width: scale(250),
    height: scale(150),
    // resizeMode: "contain",
    alignSelf: "center",
    // justifyContent: "center",
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
})