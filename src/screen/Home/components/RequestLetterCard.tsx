import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { homeStyles as styles } from '../Home.styles';

interface RequestLetterCardProps {
  colors: any;
  onPress: () => void;
}

const RequestLetterCard = ({ colors, onPress }: RequestLetterCardProps) => (
  <TouchableOpacity style={[styles.card, styles.requestLetterCard, { backgroundColor: colors.secondPrimaryColor }]} onPress={onPress} activeOpacity={0.85}>
    <View style={[styles.infoIconBox, { backgroundColor: colors.lightPurple, marginBottom: 0 }]}>
      <Ionicons name="mail-outline" size={22} color={colors.purple1} />
    </View>
    <View style={styles.requestLetterBody}>
      <Text style={[styles.cardTitle, { color: colors.textPrimary, marginBottom: 2 }]}>Request a Letter</Text>
      <Text style={[styles.leaveLabel, { color: colors.textSecondary }]}>
        Salary certificate, NOC, experience letter and more
      </Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
  </TouchableOpacity>
);

export default React.memo(RequestLetterCard);
