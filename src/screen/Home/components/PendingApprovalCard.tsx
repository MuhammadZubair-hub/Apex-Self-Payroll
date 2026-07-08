import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { homeStyles as styles } from '../Home.styles';
import { verticalScale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

interface PendingApprovalCardProps {
  colors: any;
  count: number;
  onPress: () => void;
}

const PendingApprovalCard = ({ colors, count, onPress }: PendingApprovalCardProps) => (
  <TouchableOpacity style={[styles.card, styles.requestLetterCard, { backgroundColor: colors.redTint ,elevation:0}]} onPress={onPress} activeOpacity={0.85}>
      <Ionicons name="time-outline" size={verticalScale(22)} color={colors.redColor} />
    
    <View style={styles.requestLetterBody}>
      <Text style={[styles.cardTitle, { color: colors.redColor, marginBottom: AppSizes.MV_2 }]}>Pending Approvals</Text>
      <Text style={[styles.leaveLabel, { color: colors.redColor }]}>
        {count} leave request{count === 1 ? '' : 's'} waiting for your approval
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={verticalScale(18)} color={colors.redColor} />
  </TouchableOpacity>
);

export default React.memo(PendingApprovalCard);
