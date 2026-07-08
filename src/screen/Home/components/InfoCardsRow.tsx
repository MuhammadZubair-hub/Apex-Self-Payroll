import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { homeStyles as styles } from '../Home.styles';
import { AppSizes } from '../../../utils/AppSizes';
import { verticalScale } from '../../../utils/responsive';

interface InfoCardsRowProps {
  colors: any;
  totalLeaveBalance: number;
  upcomingHolidays: any[];
  onPressLeaveBalance: () => void;
  onPressHolidays: () => void;
}

const InfoCardsRow = ({ colors, totalLeaveBalance, upcomingHolidays, onPressLeaveBalance, onPressHolidays }: InfoCardsRowProps) => (
  <View style={styles.infoCardsRow}>
    <TouchableOpacity
      style={[styles.card, styles.infoCard, { backgroundColor: colors.secondPrimaryColor,borderLeftColor:colors.purple1 }]}
      onPress={onPressLeaveBalance}
      activeOpacity={0.85}
    >
      <View style={[styles.infoIconBox, { backgroundColor: colors.lightPurple }]}>
        <Ionicons name="airplane-outline" size={AppSizes.ICON_30} color={colors.purple1} />
      </View>
      <Text style={[styles.infoCardTitle, { color: colors.textPrimary }]}>Leave Balance</Text>

      <Text style={[styles.leaveNumber, { color: colors.textPrimary }]}>{totalLeaveBalance}</Text>
      <Text style={[styles.leaveLabel, { color: colors.textSecondary }]}>Days Available</Text>

      <Ionicons name="chevron-forward" size={verticalScale(18)} color={colors.textSecondary} style={styles.infoCardChevron} />
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.card, styles.infoCard, { backgroundColor: colors.secondPrimaryColor ,borderLeftColor:colors.purple1}]}
      onPress={onPressHolidays}
      activeOpacity={0.85}
    >
      <View style={[styles.infoIconBox, { backgroundColor: colors.lightPurple }]}>
        <Ionicons name="calendar-outline" size={AppSizes.ICON_30} color={colors.purple1} />
      </View>
      <Text style={[styles.infoCardTitle, { color: colors.textPrimary }]}>Upcoming Holidays</Text>

      {upcomingHolidays.length > 0 ? (
        <>
          <Text style={[styles.leaveLabel, { color: colors.textSecondary }]} numberOfLines={1}>
            {upcomingHolidays[0]?.Date || 'N/A'}
          </Text>
          <Text style={[styles.holidayNameText, { color: colors.textPrimary }]} numberOfLines={1}>
            {upcomingHolidays[0]?.Holiday || 'N/A'}
          </Text>
        </>
      ) : (
        <>
          <Text style={[styles.leaveLabel, { color: colors.textSecondary }]}>No upcoming holidays</Text>
          <Text style={[styles.leaveLabel, { color: colors.textSecondary }]}>Enjoy your day!</Text>
        </>
      )}

      <Ionicons name="chevron-forward" size={verticalScale(18)} color={colors.textSecondary} style={styles.infoCardChevron} />
    </TouchableOpacity>
  </View>
);

export default React.memo(InfoCardsRow);
