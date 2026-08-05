import { useNavigation } from "@react-navigation/native";
import { useMemo, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_Config } from "../../../services/apiServices";
import { loginSuccess } from "../../../redux/slices/authSlice";
import { getColors } from "../../../theme/color/theme";
import { useThemeContext } from "../../../theme/ThemeContex";
import { showThemedMessage } from "../../../utils/flashMessage";
import { decodeJwt } from "../../../utils/jwt";
import {
  saveCredentials,
  authenticateAndGetCredentials,
  isBiometricEnabled,
} from "../../../utils/biometricService";
import { requestLocationPermission } from "../../../utils/location";

export const useLoginUser = () => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const [userCredentials, setUserCredentials] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  //   const router = useRouter();

  const navigation = useNavigation<any>();

  useEffect(() => {
    // Request location permission as soon as the login screen opens
    requestLocationPermission();
  }, []);

  const fetchProfileData = async (employeeId: any) => {
    if (!employeeId) {
      // setLoading(false);
      return;
    }

    try {
      const result = await API_Config.getEmployeeProfile(employeeId);

      if (result.success && result.data?.data) {
        return result.data.data;
      }
      return [];
    } catch (err) {
      // console.error('Error fetching profile:', err);
      showThemedMessage(colors, { message: 'Error getting profile data', type: 'danger' });
      return ([])
    }
  };

  const handleLogin = async (
    overrideEmail?: string,
    overridePassword?: string,
  ) => {
    const email = overrideEmail ?? userCredentials.email;
    const password = overridePassword ?? userCredentials.password;

    if (!email || !password) {
      showThemedMessage(colors, { message: 'Please enter both fields', type: 'danger' });
      return;
    }
    setIsLoading(true);

    // console.log('Sending values to API: ', email.trim(), password.trim());

    try {
      const response = await API_Config.loginUser(
        email.trim(),
        password.trim(),
      );

      // console.log("API Response:", response);
      if (response?.success && response.data.status == "1") {
        const loginData = response.data.data.data;

        // console.log(loginData);

        // `firstTimeLogged` isn't in the login response body yet, so it's read off the JWT
        // claims instead. Defaults to true (normal flow) until the token actually carries it.


        const tokenClaims = decodeJwt(loginData.token);
        console.log('the tokeclaims are this :', tokenClaims);
        const firstTimeLogged = tokenClaims?.FirstTimeLogged === '0';
        console.log(firstTimeLogged);
        
        const isWFH = String(tokenClaims?.isWFH).toLowerCase() === 'true';
        loginData.isWFH = isWFH;

        if (!firstTimeLogged) {
          navigation.navigate('ChangePassword', {
            employeeId: loginData.employeeId,
            userName: loginData.userName,
          });
          return;
        }

        // Save credentials for biometric login on next session.
        // This runs silently — credentials are stored in AsyncStorage and only
        // accessible after a successful biometric prompt.
        await saveCredentials(email.trim(), password.trim());

        const profileData = await fetchProfileData(loginData.employeeId);

        if (profileData) {
          dispatch(
            loginSuccess({
              data: {
                data: loginData,
                profileData: profileData
              },
            }),
          );
        }



      }
      else {
        showThemedMessage(colors, { message: ` ${response.data.message || response.message}`, type: 'danger' });
      }
    } catch (error) {
      // console.error("Login error:", error);
      showThemedMessage(colors, { message: `Login failed ${error}`, type: 'danger' });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Biometric login — prompt fingerprint/face, retrieve saved credentials,
   * then call the normal login flow with them.
   */
  const handleBiometricLogin = async () => {
    try {
      // Check if biometric is enabled first
      const enabled = await isBiometricEnabled();
      if (!enabled) {
        showThemedMessage(colors, {
          message: 'Please enable biometric login from Settings first',
          type: 'warning',
        });
        return;
      }

      setIsLoading(true);
      const result = await authenticateAndGetCredentials();

      if (!result.success || !result.email || !result.password) {
        if (result.error) {
          showThemedMessage(colors, { message: result.error, type: 'danger' });
        }
        return;
      }

      // Call the normal login flow with the retrieved credentials
      await handleLogin(result.email, result.password);
    } catch (error) {
      showThemedMessage(colors, {
        message: `Biometric login failed: ${error}`,
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userCredentials,
    setUserCredentials,
    handleLogin,
    handleBiometricLogin,
    isLoading,
  };
};
