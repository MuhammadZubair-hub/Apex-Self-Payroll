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
        borderColor: colors.primarayheaderColor,
      },
    ]}
    onPress={() => onToggle(!enabled)}
    activeOpacity={0.8}
  >
    <View style={[styles.pillButton, !enabled && styles.pillActive]}>
      <Icon
        name="close-outline"
        type="Ionicons"
        size={AppSizes.ICON_16}
        color={!enabled ? colors.purple1 : colors.textSecondary}
      />
    </View>
    <View style={[styles.pillButton, enabled && styles.pillActive]}>
      <Icon
        name="finger-print"
        type="Ionicons"
        size={AppSizes.ICON_16}
        color={enabled ? colors.purple1 : colors.textSecondary}
      />
    </View>
  </TouchableOpacity>
);

export default React.memo(BiometricToggle);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: AppSizes.RADIUS_20,
    padding: scale(3),
    width: AppSizes.W_80,
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  pillButton: {
    flex: 1,
    height: verticalScale(26),
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
