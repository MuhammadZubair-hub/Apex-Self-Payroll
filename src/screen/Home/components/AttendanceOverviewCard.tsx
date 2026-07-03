import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { homeStyles as styles } from '../Home.styles';

interface AttendanceOverviewCardProps {
  colors: any;
  summary: { present: number; absent: number; pending: number; totalDays: number };
}

const AttendanceOverviewCard = ({ colors, summary }: AttendanceOverviewCardProps) => (
  <TouchableOpacity style={[styles.card, { backgroundColor: colors.secondPrimaryColor }]} activeOpacity={0.85}>
    <View style={styles.attendanceStatusRow}>
      <Text style={[styles.cardTitle, { color: colors.textPrimary, marginBottom: 0 }]}>Attendance Overview</Text>
      <TouchableOpacity>
        <Text style={[styles.viewDetailsText, { color: colors.purple1 }]}>View Details</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.statsRow}>
      <View style={styles.statColumn}>
        <View style={styles.statTopRow}>
          <View style={[styles.statIconCircle, { backgroundColor: colors.greenColor }]}>
            <Ionicons name="checkmark" size={14} color="#fff" />
          </View>
          <Text style={[styles.statNumber, { color: colors.textPrimary }]}>{summary.present}</Text>
        </View>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Present</Text>
      </View>

      <View style={styles.statColumn}>
        <View style={styles.statTopRow}>
          <View style={[styles.statIconCircle, { backgroundColor: colors.orangeColor }]}>
            <Ionicons name="time" size={13} color="#fff" />
          </View>
          <Text style={[styles.statNumber, { color: colors.textPrimary }]}>{summary.pending}</Text>
        </View>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Pending</Text>
      </View>

      <View style={styles.statColumn}>
        <View style={styles.statTopRow}>
          <View style={[styles.statIconCircle, { backgroundColor: colors.redColor }]}>
            <Ionicons name="close" size={14} color="#fff" />
          </View>
          <Text style={[styles.statNumber, { color: colors.textPrimary }]}>{summary.absent}</Text>
        </View>
        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Absent</Text>
      </View>
    </View>

    <View style={[styles.progressBarContainer, { backgroundColor: colors.borderColor }]}>
      <View style={{ flex: summary.present, backgroundColor: colors.greenColor }} />
      <View style={{ flex: summary.pending, backgroundColor: colors.orangeColor }} />
      <View style={{ flex: summary.absent, backgroundColor: colors.redColor }} />
    </View>

    <Text style={[styles.totalDaysText, { color: colors.textSecondary }]}>Total Days: {summary.totalDays}</Text>
  </TouchableOpacity>
);

export default React.memo(AttendanceOverviewCard);
