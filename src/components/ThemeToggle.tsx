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
  <TouchableOpacity
    style={[styles.container, { backgroundColor: colors.secondPrimaryColor, borderColor: colors.borderColor || colors.purple1 + '30' }]}
    onPress={onToggle}
    activeOpacity={0.8}
  >
    <View style={[styles.pillButton, theme !== 'dark' && [styles.pillActive, { backgroundColor: colors.purple1, borderRadius: 30 }]]}>
      <Icon name="sunny" type="Ionicons" size={AppSizes.ICON_16} color={theme !== 'dark' ? '#fff' : colors.textSecondary} />
    </View>
    <View style={[styles.pillButton, theme === 'dark' && [styles.pillActive, { backgroundColor: colors.purple1, borderRadius: 30 }]]}>
      <Icon name="moon" type="Ionicons" size={AppSizes.ICON_16} color={theme === 'dark' ? '#fff' : colors.textSecondary} />
    </View>
  </TouchableOpacity>
);

export default React.memo(ThemeToggle);

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
