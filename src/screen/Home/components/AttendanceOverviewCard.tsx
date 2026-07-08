import React, { useEffect, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { homeStyles as styles } from '../Home.styles';
import { verticalScale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

interface AttendanceOverviewCardProps {
  colors: any;
  summary: { present: number; absent: number; pending: number; totalDays: number };
  onPress: () => void;
}

const AttendanceOverviewCard = ({ colors, summary, onPress }: AttendanceOverviewCardProps) => {
  // Animation values for progress bar segments
  const presentAnim = useRef(new Animated.Value(0)).current;
  const pendingAnim = useRef(new Animated.Value(0)).current;
  const absentAnim = useRef(new Animated.Value(0)).current;

  // Calculate total for percentage
  const total = summary.present + summary.pending + summary.absent || 1;

  // Calculate widths as percentage of total
  const presentWidth = (summary.present / total) * 100;
  const pendingWidth = (summary.pending / total) * 100;
  const absentWidth = (summary.absent / total) * 100;

  useEffect(() => {
    // Reset animations
    presentAnim.setValue(0);
    pendingAnim.setValue(0);
    absentAnim.setValue(0);

    // Sequence: Present -> Pending -> Absent
    Animated.sequence([
      // 1. Present animation (green)
      Animated.timing(presentAnim, {
        toValue: presentWidth,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      // 2. Pending animation (orange)
      Animated.timing(pendingAnim, {
        toValue: pendingWidth,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
      // 3. Absent animation (red)
      Animated.timing(absentAnim, {
        toValue: absentWidth,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }),
    ]).start();
  }, [summary, presentAnim, pendingAnim, absentAnim, presentWidth, pendingWidth, absentWidth]);

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.secondPrimaryColor }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.attendanceStatusRow}>
        <Text style={[styles.cardTitle, { color: colors.textPrimary, marginBottom: 0 }]}>
          Attendance Overview
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.viewDetailsText, { color: colors.purple1 }]}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statColumn}>
          <View style={styles.statTopRow}>
            <View style={[styles.statIconCircle, { backgroundColor: colors.greenColor }]}>
              <Ionicons name="checkmark" size={verticalScale(14)} color="#fff" />
            </View>
            <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
              {summary.present}
            </Text>
          </View>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Present
          </Text>
        </View>

        <View style={styles.statColumn}>
          <View style={styles.statTopRow}>
            <View style={[styles.statIconCircle, { backgroundColor: colors.orangeColor }]}>
              <Ionicons name="time" size={verticalScale(13)} color="#fff" />
            </View>
            <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
              {summary.pending}
            </Text>
          </View>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Pending
          </Text>
        </View>

        <View style={styles.statColumn}>
          <View style={styles.statTopRow}>
            <View style={[styles.statIconCircle, { backgroundColor: colors.redColor }]}>
              <Ionicons name="close" size={verticalScale(14)} color="#fff" />
            </View>
            <Text style={[styles.statNumber, { color: colors.textPrimary }]}>
              {summary.absent}
            </Text>
          </View>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Absent
          </Text>
        </View>
      </View>

      {/* Animated Progress Bar */}
      <View style={[styles.progressBarContainer, { backgroundColor: colors.borderColor }]}>
        {/* Present segment - Animates first */}
        <Animated.View
          style={{
            width: presentAnim.interpolate({
              inputRange: [0, presentWidth],
              outputRange: ['0%', `${presentWidth}%`],
            }),
            backgroundColor: colors.greenColor,
            height: '100%',
            borderTopLeftRadius: AppSizes.RADIUS_4,
            borderBottomLeftRadius: AppSizes.RADIUS_4,
          }}
        />

        {/* Pending segment - Animates second */}
        <Animated.View
          style={{
            width: pendingAnim.interpolate({
              inputRange: [0, pendingWidth],
              outputRange: ['0%', `${pendingWidth}%`],
            }),
            backgroundColor: colors.orangeColor,
            height: '100%',
          }}
        />

        {/* Absent segment - Animates third */}
        <Animated.View
          style={{
            width: absentAnim.interpolate({
              inputRange: [0, absentWidth],
              outputRange: ['0%', `${absentWidth}%`],
            }),
            backgroundColor: colors.redColor,
            height: '100%',
            borderTopRightRadius: AppSizes.RADIUS_4,
            borderBottomRightRadius: AppSizes.RADIUS_4,
          }}
        />
      </View>

      <Text style={[styles.totalDaysText, { color: colors.textSecondary }]}>
        Total Days: {summary.totalDays}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(AttendanceOverviewCard);