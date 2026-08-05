import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { homeStyles as styles } from '../Home.styles';
import { AppSizes } from '../../../utils/AppSizes';
import { scale, verticalScale } from '../../../utils/responsive';
import { Fold } from 'react-native-animated-spinkit';

interface WFHAttendanceCardProps {
  colors: any;
  todayAttendance: any;
  loading: boolean;
  onCheckInOut: (type: 'IN' | 'OUT') => void;
}

const WFHAttendanceCard = ({ colors, todayAttendance, loading, onCheckInOut }: WFHAttendanceCardProps) => {
  const isCheckIn = !todayAttendance?.startTime;
  const buttonText = isCheckIn ? 'Check In' : 'Check Out';
  const buttonType = isCheckIn ? 'IN' : 'OUT';

  return (
    <View style={[styles.card, { backgroundColor: colors.secondPrimaryColor }]}>
      <View style={styles.attendanceStatusRow}>
        <Text style={[styles.cardTitle, { color: colors.textPrimary, marginBottom: 0 }]}>WFH Attendance</Text>
        <View style={[styles.statusBadge, { backgroundColor: colors.lightPurple }]}>
          <Text style={[styles.statusText, { color: colors.purple1 }]}>Remote</Text>
        </View>
      </View>

      {!isCheckIn && todayAttendance?.startTime && (
        <View style={[styles.attendanceTimeRow, { marginTop: verticalScale(12) }]}>
          <View>
            <View style={[styles.attendanceCheckRow, { marginBottom: 4 }]}>
              <View style={[styles.statusDot, { backgroundColor: colors.successText }]} />
              <Text style={[styles.checkInText, { color: colors.textSecondary }]}>Checked in</Text>
            </View>
            <Text style={[styles.checkInTime, { color: colors.textPrimary }]}>{todayAttendance.startTime.split(' ')[4]}</Text>
          </View>
          <View style={[styles.iconCircle, { backgroundColor: colors.blueTint }]}>
            <Ionicons name="calendar-outline" size={AppSizes.ICON_30} color={colors.purple1} />
          </View>
        </View>
      )}

      <View style={{ marginTop: verticalScale(16), alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            backgroundColor: colors.purple1,
            paddingVertical: verticalScale(14),
            paddingHorizontal: scale(32),
            borderRadius: AppSizes.RADIUS_12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
          onPress={() => onCheckInOut(buttonType)}
          disabled={loading}
        >
          {loading ? (
            // <ActivityIndicator color="#fff" />
            <Fold size={AppSizes.ICON_20} color={'#fff'} />

          ) : (
            <>
              {/* <Ionicons name="location-outline" size={AppSizes.ICON_20} color="#fff" style={{ marginRight: scale(8) }} /> */}
              <Text style={{ color: '#fff', fontFamily: 'PlusJakartaSans-SemiBold', fontSize: AppSizes.FONT_16 }}>
                {buttonText}
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(WFHAttendanceCard);
