import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { homeStyles as styles } from '../Home.styles';

interface PendingApprovalCardProps {
  colors: any;
  count: number;
  onPress: () => void;
}

const PendingApprovalCard = ({ colors, count, onPress }: PendingApprovalCardProps) => (
  <TouchableOpacity style={[styles.card, styles.requestLetterCard, { backgroundColor: colors.dangerBg }]} onPress={onPress} activeOpacity={0.85}>
    <View style={[styles.infoIconBox, { backgroundColor: colors.secondPrimaryColor, marginBottom: 0 }]}>
      <Ionicons name="time-outline" size={22} color={colors.dangerText} />
    </View>
    <View style={styles.requestLetterBody}>
      <Text style={[styles.cardTitle, { color: colors.dangerText, marginBottom: 2 }]}>Pending Approvals</Text>
      <Text style={[styles.leaveLabel, { color: colors.dangerText }]}>
        {count} leave request{count === 1 ? '' : 's'} waiting for your approval
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color={colors.dangerText} />
  </TouchableOpacity>
);

export default React.memo(PendingApprovalCard);
