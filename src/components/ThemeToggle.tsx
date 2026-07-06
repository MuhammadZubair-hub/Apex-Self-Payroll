import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from './Icons';

interface ThemeToggleProps {
  theme: string;
  colors: any;
  onToggle: () => void;
}

// Sun/moon pill switch used for the dark-mode toggle in both the drawer footer and Settings screen.
const ThemeToggle = ({ theme, colors, onToggle }: ThemeToggleProps) => (
  <TouchableOpacity style={[styles.container, { backgroundColor: colors.secondPrimaryColor ,borderColor:colors.primarayheaderColor}]} onPress={onToggle}>
    <View style={[styles.pillButton, theme !== 'dark' && styles.pillActive]}>
      <Icon name="sunny" type="Ionicons" size={16} color={theme !== 'dark' ? colors.purple1 : colors.textSecondary} />
    </View>
    <View style={[styles.pillButton, theme === 'dark' && styles.pillActive]}>
      <Icon name="moon" type="Ionicons" size={16} color={theme === 'dark' ? colors.purple1 : colors.textSecondary} />
    </View>
  </TouchableOpacity>
);

export default React.memo(ThemeToggle);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    padding: 3,
    width: 80,
    justifyContent: 'space-between',
    borderWidth:1,

  },
  pillButton: {
    flex: 1,
    height: 26,
    borderRadius: 13,
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
