import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from '../../../theme/ThemeContex';
import { getColors } from '../../../theme/color/theme';
import { useLoginUser } from './login';
import { AppSizes } from '../../../utils/AppSizes';
import Icon from '../../../components/Icons';
import MyInput from '../../../components/MyInput';
import MyButton from '../../../components/MyButton';
import LoadingBaseModal from '../../../components/Loader/LoadingBaseModal';
import { scale, verticalScale } from '../../../utils/responsive';

const LoginScreen = () => {
  const { theme } = useThemeContext();
  const colors = getColors(theme);

  const [isSecure, setIsSecure] = useState(true);

  const {
    handleLogin,
    handleBiometricLogin,
    isLoading,
    userCredentials,
    setUserCredentials,
  } = useLoginUser();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.primaryColor }]}
    >
      <StatusBar
        backgroundColor={colors.primaryColor}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={true}
        >
          <View>
            <Text
              style={{
                fontFamily: 'PlusJakartaSans-Bold',
                fontSize: AppSizes.FONT_28,
                alignSelf: 'center',
                color: colors.purple1,
                marginTop: verticalScale(10),
                letterSpacing: 2,
              }}
            >
              ESS
            </Text>

            <Text
              style={{
                fontFamily: 'PlusJakartaSans-SemiBold',
                fontSize: AppSizes.FONT_14,
                alignSelf: 'center',
                color: colors.purple1,
              }}
            >
              Employee Self Service
            </Text>
            <Image
              source={require('../../../assets/Images/esslogo2.png')}
              style={styles.logo}
              resizeMode="cover"
            />

            <View style={styles.formGroup}>
              <View>
                <Text
                  style={{
                    fontFamily: 'PlusJakartaSans-Bold',
                    fontSize: AppSizes.FONT_24,
                    alignSelf: 'center',
                    color: colors.textPrimary,
                  }}
                >
                  Welcome Back!
                </Text>

                <Text
                  style={{
                    fontFamily: 'PlusJakartaSans-SemiBold',
                    fontSize: AppSizes.FONT_14,
                    alignSelf: 'center',
                    color: colors.textSecondary,
                  }}
                >
                  Login to access your employee account{' '}
                </Text>
              </View>
              <MyInput
                placeholder="Enter your Usercode"
                label="User Code"
                value={userCredentials.email}
                onChangeText={v => {
                  setUserCredentials(prev => ({ ...prev, email: v }));
                }}
                iconType="Ionicons"
                iconName="person-outline"
                containerStyle={styles.inputContainer}
              />

              <MyInput
                placeholder="Enter Password"
                label="Password"
                value={userCredentials.password}
                onChangeText={v => {
                  setUserCredentials(prev => ({ ...prev, password: v }));
                }}
                iconType="Ionicons"
                iconName="lock-closed-outline"
                secure={isSecure}
                containerStyle={styles.inputContainer}
                rightComponent={
                  <Icon
                    name={isSecure ? 'eye-off-outline' : 'eye-outline'}
                    onPress={() => {
                      setIsSecure(prev => !prev);
                    }}
                    type={'Ionicons'}
                    color={colors.textSecondary}
                  />
                }
              />

              <View style={styles.loginRow}>
                <MyButton
                  text="Log In"
                  style={StyleSheet.flatten([
                    styles.loginButton,
                    { backgroundColor: colors.purple1 },
                  ])}
                  onPress={() => {
                    handleLogin();
                  }}
                />
              </View>

              <View>
                <Text
                  style={{
                    fontSize: AppSizes.FONT_12,
                    alignSelf: 'center',
                    color: colors.textSecondary,
                    marginBottom: 10,
                  }}
                >
                  {Platform.OS === 'ios'
                    ? 'Login in with Face ID'
                    : 'Login in with Biometrics'}
                </Text>
                <TouchableOpacity
                  style={styles.biometricButton}
                  onPress={handleBiometricLogin}
                  activeOpacity={0.7}
                >
                  <Icon
                    type="Ionicons"
                    name={
                      Platform.OS === 'ios' ? 'scan-outline' : 'finger-print'
                    }
                    size={scale(35)}
                    color={colors.purple1}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <LoadingBaseModal visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(15),
  },

  // Illustration / avatar section
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: verticalScale(4),
    paddingBottom: verticalScale(4),
  },
  logo: {
    width: scale(300),
    height: scale(140),
    alignSelf: 'center',
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
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: scale(10),
    gap: scale(12),
  },
  loginButton: {
    borderRadius: scale(10),
    paddingVertical: scale(10),
  },
  biometricButton: {
    width: scale(44),
    height: scale(44),
    borderRadius: scale(12),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;


