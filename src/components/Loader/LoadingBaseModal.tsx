import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Fold } from 'react-native-animated-spinkit';
import { useThemeContext } from '../../theme/ThemeContex';
import { getColors } from '../../theme/color/theme';
import { scale } from '../../utils/responsive';

interface LoadingModalProps {
  visible: boolean;
  label?: string;
}

const LoadingBaseModal = ({ visible = false, label = 'Loading...' }: LoadingModalProps) => {
  const { theme } = useThemeContext();
  const colors = getColors(theme);

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={[styles.card, { backgroundColor: colors.secondPrimaryColor }]}>
          <Fold size={44} color={colors.purple1} />
          <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingBaseModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    minWidth: scale(140),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: scale(28),
    paddingHorizontal: scale(32),
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
  },
  label: {
    marginTop: scale(14),
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
  },
});
