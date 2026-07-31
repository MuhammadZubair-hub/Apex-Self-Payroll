import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../components/Icons';
import { settingsStyles as styles } from '../Settings.styles';
import { AppSizes } from '../../../utils/AppSizes';
import { scale } from '../../../utils/responsive';

interface SettingsRowProps {
  icon: string;
  label: string;
  subtitle?: string;
  subtitleColor?: string;
  colors: any;
  isLast?: boolean;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

const SettingsRow = ({ icon, label, subtitle, subtitleColor, colors, isLast, onPress, rightElement }: SettingsRowProps) => (
  <TouchableOpacity
    style={[styles.row, { borderBottomColor: colors.borderColor }, isLast && { borderBottomWidth: 0 }]}
    onPress={onPress}
    disabled={!onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <View style={styles.rowLeft}>
      <View style={[styles.rowIconBox, { backgroundColor: colors.lightPurple }]}>
        <Icon type="Ionicons" name={icon} size={AppSizes.ICON_20} color={colors.purple1} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{label}</Text>
        {subtitle ? (
          <Text style={[styles.rowSubtitle, { color: subtitleColor || colors.textSecondary }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
    {rightElement ?? (onPress ? <Icon type="Ionicons" name="chevron-forward" size={scale(18)} color={colors.textSecondary} /> : null)}
  </TouchableOpacity>
);

export default React.memo(SettingsRow);
