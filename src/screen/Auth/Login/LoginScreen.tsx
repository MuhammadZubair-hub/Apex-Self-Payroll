// import Icon from "@/src/components/Icons";
// import LoadingBaseModal from "@/src/components/Loader/LoadingBaseModal";
// import MyButton from "@/src/components/MyButton";
// import MyInput from "@/src/components/MyInput";
// import { useLoginUser } from "@/src/screens/Auth/Login/login";
// import { getColors } from "@/src/theme/color/theme";
// import { useThemeContext } from "@/src/theme/ThemeContex";
// import { AppSizes } from "@/src/utils/AppSizes";
// import { scale, verticalScale } from "@/src/utils/responsive";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeContext } from "../../../theme/ThemeContex";
import { getColors } from "../../../theme/color/theme";
import { useLoginUser } from "./login";
import { AppSizes } from "../../../utils/AppSizes";
import Icon from "../../../components/Icons";
import MyInput from "../../../components/MyInput";
import MyButton from "../../../components/MyButton";
import LoadingBaseModal from "../../../components/Loader/LoadingBaseModal";
import { scale, verticalScale } from "../../../utils/responsive";

const LoginScreen = () => {
  const { theme } = useThemeContext();
  const colors = getColors(theme);

  const [isSecure, setIsSecure] = useState(true);

  const { handleLogin, isLoading, userCredentials, setUserCredentials } =
    useLoginUser();

  // Purple gradient used for the background + illustration backdrop.
  // Falls back to a default purple pair if the active theme doesn't define them.


  return (

    <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>

      <StatusBar
        backgroundColor={colors.primarayheaderColor}
        barStyle="light-content"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 40}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: AppSizes.FONT_28, alignSelf: 'center', color: colors.purple1 , marginTop: verticalScale(20),letterSpacing:2}}>ESS</Text>

          <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: AppSizes.FONT_14, alignSelf: 'center', color: colors.purple1 }}>Employee Self Service</Text>
          <Image

            source={require('../../../assets/Images/esslogo2.png')}
            style={styles.logo}
            resizeMode="contain"
          // resizeMode="cover"
          />



          <Text style={{ fontFamily: 'PlusJakartaSans-Bold', fontSize: AppSizes.FONT_24, alignSelf: 'center', color: colors.textPrimary }}>Welcome Back!</Text>

          <Text style={{ fontFamily: 'PlusJakartaSans-SemiBold', fontSize: AppSizes.FONT_14, alignSelf: 'center', color: colors.textSecondary }}>Sign In to access your employee account </Text>

          <View style={styles.formGroup}>
            <MyInput
              placeholder="Enter your Username"
              label="User Name"
              value={userCredentials.email}
              onChangeText={(v) => {
                setUserCredentials((prev) => ({ ...prev, email: v }));
              }}
              iconType="Ionicons"
              iconName="person-outline"
              containerStyle={styles.inputContainer}
            />

            <MyInput
              placeholder="Enter Password"
              label="Password"
              value={userCredentials.password}
              onChangeText={(v) => {
                setUserCredentials((prev) => ({ ...prev, password: v }));
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

            <MyButton
              text="Sign In"
              style={[
                styles.loginButton,
                { backgroundColor: colors.purple1 },
              ]}
              onPress={() => {
                // navigation.navigate('MainApp');
                handleLogin();
              }}
            />



          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <LoadingBaseModal
        visible={isLoading}
      />

    </SafeAreaView>

  );
};

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
    // marginTop: verticalScale(60),
    width: scale(350),
    height: scale(250),
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
});

export default LoginScreen;