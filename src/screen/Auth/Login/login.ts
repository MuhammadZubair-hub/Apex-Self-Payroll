import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { API_Config } from "../../../services/apiServices";
import { loginSuccess } from "../../../redux/slices/authSlice";
import { getColors } from "../../../theme/color/theme";
import { useThemeContext } from "../../../theme/ThemeContex";
import { showThemedMessage } from "../../../utils/flashMessage";
import { decodeJwt } from "../../../utils/jwt";

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

  const handleLogin = async () => {

    if (!userCredentials.email || !userCredentials.password) {
      showThemedMessage(colors, { message: 'Please enter both fields', type: 'danger' });
      return;
    }
    setIsLoading(true);

    // console.log('Sending values to API: ', email.trim(), password.trim());

    try {
      const response = await API_Config.loginUser(
        userCredentials.email.trim(),
        userCredentials.password.trim(),
      );

      console.log("API Response:", response);
      if (response?.success && response.data.status == "1") {
        const loginData = response.data.data.data;

        console.log(loginData);

        // `firstTimeLogged` isn't in the login response body yet, so it's read off the JWT
        // claims instead. Defaults to true (normal flow) until the token actually carries it.


        const tokenClaims = decodeJwt(loginData.token);
        console.log('the tokeclaims are this :', tokenClaims);
        const firstTimeLogged = tokenClaims?.FirstTimeLogged === '0';
        console.log(firstTimeLogged);

        if (!firstTimeLogged) {
          navigation.navigate('ChangePassword', {
            employeeId: loginData.employeeId,
            userName: loginData.userName,
          });
          return;
        }

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
      else{
        showThemedMessage(colors, { message: ` ${response.data.message}`, type: 'danger' });
      }
    } catch (error) {
      // console.error("Login error:", error);
      showThemedMessage(colors, { message: `Login failed ${error}`, type: 'danger' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userCredentials,
    setUserCredentials,
    handleLogin,
    isLoading,
  };
};
