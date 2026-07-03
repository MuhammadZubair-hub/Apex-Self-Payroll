import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { API_Config } from "../../../services/apiServices";
import { baseUrl } from "../../../services/Constants/endPoints";
import { loginSuccess } from "../../../redux/slices/authSlice";
import { CommonStyle } from "../../../utils/Common/CommonStyle";

export const useLoginUser = () => {
  const [userCredentials, setUserCredentials] = useState<{
    email: string;
    password: string;
  }>({ email: "Zubairess", password: "Zubair123" });
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
      const url = `${baseUrl}ESSEmployee/GetEmployessDataESS?employeeId=${employeeId}`;
      // console.log('Fetching profile from:', url);

      const response = await fetch(url);
      const result = await response.json();

      // console.log('Profile API Response:', result);

      if (result.data) {
        return (result.data);
      } else {
        return ([])
      }
    } catch (err) {
      // console.error('Error fetching profile:', err);
      Alert.alert('Error', 'Error getting Profile Data')
      return ([])
    }
  };

  const handleLogin = async () => {

    if (!userCredentials.email || !userCredentials.password) {
      Alert.alert("Please Enter both fields");
      return;
    }
    setIsLoading(true);

    // console.log('Sending values to API: ', email.trim(), password.trim());

    try {
      const response = await API_Config.loginUser(
        userCredentials.email.trim(),
        userCredentials.password.trim(),
      );

      console.log("API Response:", response.data.data.data.employeeId);
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
      showMessage({
        message: `Login failed ${error}`,
        type: "danger",
        style: CommonStyle.error,
      });
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
