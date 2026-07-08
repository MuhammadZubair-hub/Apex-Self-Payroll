import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { scale, moderateScale } from '../../../utils/responsive';

const FieldLabel = ({ text, colors }: { text: string; colors: any }) => (
  <Text style={[styles.label, { color: colors.textPrimary }]}>{text}</Text>
);

export default React.memo(FieldLabel);

const styles = StyleSheet.create({
  label: {
    fontSize: moderateScale(13),
    fontFamily: 'PlusJakartaSans-Medium',
    marginBottom: scale(6),
  },
});
