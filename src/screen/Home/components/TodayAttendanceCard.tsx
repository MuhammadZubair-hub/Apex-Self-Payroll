import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { homeStyles as styles } from '../Home.styles';
import { formatTime } from '../../../utils/dateTime';
import { AppSizes } from '../../../utils/AppSizes';

interface TodayAttendanceCardProps {
  colors: any;
  todayAttendance: any;
  todayStatusMeta: { label: string; bg: string; color: string; dot: string };
  todayBottomText: string;
}

const TodayAttendanceCard = ({ colors, todayAttendance, todayStatusMeta, todayBottomText }: TodayAttendanceCardProps) => (
  <View style={[styles.card, { backgroundColor: colors.secondPrimaryColor }]}>
    <View style={styles.attendanceStatusRow}>
      <Text style={[styles.cardTitle, { color: colors.textPrimary, marginBottom: 0 }]}>Today&apos;s Attendance</Text>
      <View style={[styles.statusBadge, { backgroundColor: todayStatusMeta.bg }]}>
        <Text style={[styles.statusText, { color: todayStatusMeta.color }]}>{todayStatusMeta.label}</Text>
      </View>
    </View>

    <View style={styles.attendanceTimeRow}>
      <Text style={[styles.checkInTime, { color: colors.textPrimary }]}>{formatTime(todayAttendance?.startTime)}</Text>
      <View style={[styles.iconCircle, { backgroundColor: colors.blueTint }]}>
        <Ionicons name="calendar-outline" size={AppSizes.ICON_30} color={colors.purple1} />
      </View>
    </View>

    <View style={styles.attendanceCheckRow}>
      <View style={[styles.statusDot, { backgroundColor: todayStatusMeta.dot }]} />
      <Text style={[styles.checkInText, { color: colors.textSecondary }]}>{todayBottomText}</Text>
    </View>
  </View>
);

export default React.memo(TodayAttendanceCard);
