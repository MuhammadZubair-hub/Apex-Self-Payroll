import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { API_Config } from "../../../services/apiServices";
import { loginSuccess } from "../../../redux/slices/authSlice";
import { getColors } from "../../../theme/color/theme";
import { useThemeContext } from "../../../theme/ThemeContex";
import { showThemedMessage } from "../../../utils/flashMessage";

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

  const navigation = useNavigation();
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

      // console.log("API Response:", response.data.data);
      if (response?.success) {
        const profileData = await fetchProfileData(response.data.data.data.employeeId);

        if (profileData) {
          dispatch(
            loginSuccess({
              data: {
                data: response.data.data.data,
                profileData: profileData
              },
            }),
          );
        }
        // router.push("/(app)/(tabs)");


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
