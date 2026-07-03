import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../../components/Icons';
import { helpSupportStyles as styles } from '../HelpSupport.styles';

interface FaqCardProps {
  question: string;
  answer: string;
  expanded: boolean;
  colors: any;
  onPress: () => void;
}

const FaqCard = ({ question, answer, expanded, colors, onPress }: FaqCardProps) => (
  <TouchableOpacity
    style={[styles.faqCard, { backgroundColor: colors.secondPrimaryColor }]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <View style={styles.faqHeaderRow}>
      <Icon type="Ionicons" name="help-circle-outline" size={18} color={colors.purple1} />
      <Text style={[styles.faqQuestion, { color: colors.textPrimary }]}>{question}</Text>
      <Icon type="Ionicons" name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={colors.textSecondary} />
    </View>
    {expanded && <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>{answer}</Text>}
  </TouchableOpacity>
);

export default React.memo(FaqCard);
