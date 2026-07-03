import React from 'react';
import { Text, View } from 'react-native';
import Icon from '../../../components/Icons';
import { profileStyles as styles } from '../Profile.styles';
import { ProfileFieldRow } from '../Profile.logic';

interface ProfileInfoRowProps {
  item: ProfileFieldRow;
  colors: any;
  isLast: boolean;
}

const ProfileInfoRow = ({ item, colors, isLast }: ProfileInfoRowProps) => (
  <View style={[styles.row, { borderBottomColor: colors.borderColor }, isLast && { borderBottomWidth: 0 }]}>
    <View style={styles.rowLeft}>
      <Icon type="Ionicons" name={item.icon} size={18} color={colors.purple1} />
      <Text style={[styles.label, { color: colors.textSecondary }]} numberOfLines={1}>
        {item.label}
      </Text>
    </View>

    <Text style={[styles.value, { color: colors.textPrimary }]} numberOfLines={1}>
      {item.value}
    </Text>

    <Icon type="Ionicons" name="chevron-forward" size={16} color={colors.textSecondary} />
  </View>
);

export default React.memo(ProfileInfoRow);
