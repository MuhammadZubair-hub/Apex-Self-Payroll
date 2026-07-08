import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../components/Icons';
import { helpSupportStyles as styles } from '../HelpSupport.styles';
import { scale, verticalScale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

interface ContactMethod {
  icon: string;
  tint: string;
  color: string;
  title: string;
  subtitle: string;
  onPress: () => void;
}

const ContactMethodCard = ({ method, colors }: { method: ContactMethod; colors: any }) => (
  <TouchableOpacity
    style={[styles.contactCard, { backgroundColor: colors.secondPrimaryColor }]}
    onPress={method.onPress}
    activeOpacity={0.8}
  >
    <View style={[styles.contactIconBox, { backgroundColor: method.tint }]}>
      <Icon type="Ionicons" name={method.icon} size={AppSizes.ICON_20} color={method.color} />
    </View>
    <View style={{ flex: 1, marginLeft: scale(12) }}>
      <Text style={[styles.contactTitle, { color: colors.textPrimary }]}>{method.title}</Text>
      <Text style={[styles.contactSubtitle, { color: colors.textSecondary }]}>{method.subtitle}</Text>
    </View>
    <Icon type="Ionicons" name="chevron-forward" size={verticalScale(18)} color={colors.textSecondary} />
  </TouchableOpacity>
);

export default React.memo(ContactMethodCard);
