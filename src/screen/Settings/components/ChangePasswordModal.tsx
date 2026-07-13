import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import MyInput from '../../../components/MyInput';
import Icon from '../../../components/Icons';
import MyButton from '../../../components/MyButton';
import { scale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';


export interface PasswordPayload {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ChangePasswordModalProps {
  visible: boolean;
  onClose: () => void;
  colors: any;
  userName?: string;
  passwordPayload: PasswordPayload;
  setPasswordPayload: React.Dispatch<React.SetStateAction<PasswordPayload>>;
  onSubmit: () => void;
}

const ChangePasswordModal = ({
  visible,
  onClose,
  colors,
  userName,
  passwordPayload,
  setPasswordPayload,
  onSubmit,
}: ChangePasswordModalProps) => {
  // Ye teeno sirf UI state hain (eye icon toggle), isliye component ke andar hi rakhe
  const [isOldSecure, setIsOldSecure] = useState(true);
  const [isSecure, setIsSecure] = useState(true);
  const [isNewSecure, setIsNewSecure] = useState(true);

  return (
    <BottomSheet
      visible={visible}
      colors={colors}
      title="ChangePassword"
      onClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          

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
              onChangeText={(v) =>
                setPasswordPayload((prev) => ({ ...prev, oldPassword: v }))
              }
              iconType="Ionicons"
              iconName="lock-closed-outline"
              secure={isOldSecure}
              containerStyle={styles.inputContainer}
              rightComponent={
                <Icon
                  name={isOldSecure ? 'eye-off-outline' : 'eye-outline'}
                  onPress={() => setIsOldSecure((prev) => !prev)}
                  type="Ionicons"
                  color={colors.textSecondary}
                />
              }
            />

            <MyInput
              placeholder="Enter New Password"
              label="New Password"
              value={passwordPayload.newPassword}
              onChangeText={(v) =>
                setPasswordPayload((prev) => ({ ...prev, newPassword: v }))
              }
              iconType="Ionicons"
              iconName="lock-closed-outline"
              secure={isSecure}
              containerStyle={styles.inputContainer}
              rightComponent={
                <Icon
                  name={isSecure ? 'eye-off-outline' : 'eye-outline'}
                  onPress={() => setIsSecure((prev) => !prev)}
                  type="Ionicons"
                  color={colors.textSecondary}
                />
              }
            />

            <MyInput
              placeholder="Confirm New Password"
              label="Confirm Password"
              value={passwordPayload.confirmPassword}
              onChangeText={(v) =>
                setPasswordPayload((prev) => ({ ...prev, confirmPassword: v }))
              }
              iconType="Ionicons"
              iconName="lock-closed-outline"
              secure={isNewSecure}
              containerStyle={styles.inputContainer}
              rightComponent={
                <Icon
                  name={isNewSecure ? 'eye-off-outline' : 'eye-outline'}
                  onPress={() => setIsNewSecure((prev) => !prev)}
                  type="Ionicons"
                  color={colors.textSecondary}
                />
              }
            />

            <MyButton
              text="Update Password"
              style={[styles.loginButton, { backgroundColor: colors.purple1 }]}
              onPress={onSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

export default React.memo(ChangePasswordModal);

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: scale(10),
  },
  heading: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: AppSizes.FONT_24,
    alignSelf: 'center',
  },
  subHeading: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: AppSizes.FONT_14,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: scale(4),
    marginBottom: scale(16),
  },
  formGroup: {
    marginTop: scale(8),
  },
  inputContainer: {
    marginBottom: scale(14),
  },
  loginButton: {
    marginTop: scale(10),
  },
});