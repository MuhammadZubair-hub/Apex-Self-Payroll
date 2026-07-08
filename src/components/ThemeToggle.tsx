import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from './Icons';
import { scale, verticalScale } from '../utils/responsive';
import { AppSizes } from '../utils/AppSizes';

interface ThemeToggleProps {
  theme: string;
  colors: any;
  onToggle: () => void;
}

// Sun/moon pill switch used for the dark-mode toggle in both the drawer footer and Settings screen.
const ThemeToggle = ({ theme, colors, onToggle }: ThemeToggleProps) => (
  <TouchableOpacity style={[styles.container, { backgroundColor: colors.secondPrimaryColor ,borderColor:colors.primarayheaderColor}]} onPress={onToggle}>
    <View style={[styles.pillButton, theme !== 'dark' && styles.pillActive]}>
      <Icon name="sunny" type="Ionicons" size={AppSizes.ICON_16} color={theme !== 'dark' ? colors.purple1 : colors.textSecondary} />
    </View>
    <View style={[styles.pillButton, theme === 'dark' && styles.pillActive]}>
      <Icon name="moon" type="Ionicons" size={AppSizes.ICON_16} color={theme === 'dark' ? colors.purple1 : colors.textSecondary} />
    </View>
  </TouchableOpacity>
);

export default React.memo(ThemeToggle);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: AppSizes.RADIUS_20,
    padding: scale(3),
    width: AppSizes.W_80,
    justifyContent: 'space-between',
    borderWidth:1,

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
    // elevation: 2,
  },
});
