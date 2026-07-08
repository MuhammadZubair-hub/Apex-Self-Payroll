import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BottomSheet from './BottomSheet';
import MyButton from './MyButton';
import { scale, moderateScale } from '../utils/responsive';
import { AppSizes } from '../utils/AppSizes';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  colors: any;
  loading?: boolean;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

// Generic confirm/cancel bottom sheet, reused wherever an action needs a policy reminder or
// confirmation step before proceeding (e.g. leave submission, destructive actions).
const ConfirmModal = ({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  colors,
  loading,
  destructive,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => (
  <BottomSheet
    visible={visible}
    onClose={onCancel}
    colors={colors}
    title={title}
    footer={
      <View style={styles.footerRow}>
        <MyButton
          text={cancelText}
          onPress={onCancel}
          disabled={loading}
          textColor={colors.textPrimary}
          style={{ flex: 1, backgroundColor: colors.secondPrimaryColor, borderWidth: 1, borderColor: colors.borderColor }}
        />
        <MyButton
          text={confirmText}
          onPress={onConfirm}
          loading={loading}
          style={{ flex: 1, backgroundColor: destructive ? colors.redColor : colors.purple1 }}
        />
      </View>
    }
  >
    <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
  </BottomSheet>
);

export default React.memo(ConfirmModal);

const styles = StyleSheet.create({
  message: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Regular',
    lineHeight: moderateScale(21),
    marginBottom: AppSizes.MV_20
  },
  footerRow: {
    flexDirection: 'row',
    gap: scale(12),
  },
});
