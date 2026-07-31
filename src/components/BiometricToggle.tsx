import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from './Icons';
import { scale, verticalScale } from '../utils/responsive';
import { AppSizes } from '../utils/AppSizes';

interface BiometricToggleProps {
  enabled: boolean;
  colors: any;
  onToggle: (value: boolean) => void;
}

const BiometricToggle = ({ enabled, colors, onToggle }: BiometricToggleProps) => (
  <TouchableOpacity
    style={[
      styles.container,
      {
        backgroundColor: colors.secondPrimaryColor,
        borderColor: colors.borderColor || colors.purple1 + '30',
      },
    ]}
    onPress={() => onToggle(!enabled)}
    activeOpacity={0.8}
  >
    <View style={[styles.pillButton, !enabled && [styles.pillActive, { backgroundColor: colors.borderColor || 'rgba(150,150,150,0.2)', borderRadius: 30 }]]}>
      <Icon
        name="close-outline"
        type="Ionicons"
        size={AppSizes.ICON_16}
        color={!enabled ? colors.textPrimary : colors.textSecondary}
      />
    </View>
    <View style={[styles.pillButton, enabled && [styles.pillActive, { backgroundColor: colors.purple1, borderRadius: 30 }]]}>
      <Icon
        name="finger-print"
        type="Ionicons"
        size={AppSizes.ICON_16}
        color={enabled ? '#fff' : colors.textSecondary}
      />
    </View>
  </TouchableOpacity>
);

export default React.memo(BiometricToggle);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: scale(20),
    padding: scale(3),
    width: scale(64),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  pillButton: {
    width: scale(26),
    height: scale(26),
    borderRadius: scale(13),
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 1,
  },
});
