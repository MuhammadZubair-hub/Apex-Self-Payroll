import { useNavigation, useRoute } from "@react-navigation/native";
import { useMemo, useState } from "react";
import { API_Config } from "../../../services/apiServices";
import { getColors } from "../../../theme/color/theme";
import { useThemeContext } from "../../../theme/ThemeContex";
import { showThemedMessage } from "../../../utils/flashMessage";

export const useChangePassword = () => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { employeeId, userName } = route.params || {};

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
      const response = await API_Config.changePassword(employeeId, oldPassword, newPassword);
console.log('the password update is :',response);
      if (response?.success && response.data.status) {
        showThemedMessage(colors, { message: 'Password updated successfully', type: 'success' });
        navigation.reset({ index: 0, routes: [{ name: 'Logn' }] });
      }
      else{
        showThemedMessage(colors, { message: `${response.data.message}`, type: 'danger' })
      }
    } catch (error) {
      showThemedMessage(colors, { message: `Password update failed ${error}`, type: 'danger' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userName,
    passwordPayload,
    setPasswordPayload,
    handleUpdatePassword,
    isLoading,
  };
};
