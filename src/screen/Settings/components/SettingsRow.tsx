import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../components/Icons';
import { settingsStyles as styles } from '../Settings.styles';
import { AppSizes } from '../../../utils/AppSizes';

interface SettingsRowProps {
  icon: string;
  label: string;
  colors: any;
  isLast?: boolean;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

const SettingsRow = ({ icon, label, colors, isLast, onPress, rightElement }: SettingsRowProps) => (
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
      <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{label}</Text>
    </View>
    {rightElement ?? (onPress ? <Icon type="Ionicons" name="chevron-forward" size={18} color={colors.textSecondary} /> : null)}
  </TouchableOpacity>
);

export default React.memo(SettingsRow);
