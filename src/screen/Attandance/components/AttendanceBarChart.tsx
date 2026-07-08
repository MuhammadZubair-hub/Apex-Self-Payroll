import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getRecordStatus } from '../attandance.constants';
import { scale, verticalScale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

const CHART_HEIGHT = verticalScale(120);
const BAR_WIDTH = scale(12);
const COLUMN_WIDTH = scale(32);
const MIN_NUB_HEIGHT = verticalScale(6);

// getStatusMeta's `.color` is a text-on-colored-pill contrast color (Present/Absent/Pending all
// collapse to plain white in dark mode - see theme.ts). Bars need an actual hue, so use the same
// solid, theme-safe tokens the summary row above the chart already uses instead.
const getBarColor = (colors: any, status: string) => {
  switch (status) {
    case 'Present':
      return colors.greenColor;
    case 'Pending':
      return colors.orangeColor;
    case 'Leave':
      return colors.purple1;
    default:
      return colors.redColor;
  }
};

const parseHoursMinutes = (time?: string | null) => {
  if (!time) return null;
  const [h, m] = time.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return null;
  return h + m / 60;
};

// Present days are sized by hours actually worked; every other status (Absent/Pending/Leave)
// just gets a small fixed nub so the day is visible on the axis without implying a duration.
// `totalHours` is the actual clocked time (already includes overtime) - it's what should drive
// bar height. `workingHours` is just the employee's fixed scheduled shift length, so relying on
// it (as this used to) made every Present bar the same height and hid overtime entirely.
const getWorkedHours = (item: any) => {
  const totalHours = parseFloat(item.totalHours);
  if (!Number.isNaN(totalHours) && totalHours > 0) return totalHours;

  const workingHours = parseFloat(item.workingHours);
  const overTime = parseFloat(item.overTime);
  if (!Number.isNaN(workingHours) && workingHours > 0) {
    return workingHours + (Number.isNaN(overTime) ? 0 : overTime);
  }

  const start = parseHoursMinutes(item.startTime);
  const end = parseHoursMinutes(item.endTime);
  if (start == null || end == null) return 0;
  return Math.max(0, end - start);
};

interface AttendanceBarChartProps {
  records: any[];
  colors: any;
}

const AttendanceBarChart = ({ records, colors }: AttendanceBarChartProps) => {
  const bars = useMemo(() => {
    const withStatus = records.map((item) => ({ item, status: getRecordStatus(item) }));
    const maxWorked = Math.max(...withStatus.map(({ status, item }) => (status === 'Present' ? getWorkedHours(item) : 0)), 1);

    return withStatus.map(({ item, status }) => {
      const worked = status === 'Present' ? getWorkedHours(item) : 0;
      const targetHeight = status === 'Present' ? Math.max((worked / maxWorked) * CHART_HEIGHT, MIN_NUB_HEIGHT) : MIN_NUB_HEIGHT;
      return {
        key: item.date || `${item.day}-${item.startTime}`,
        day: new Date(item.date).getDate(),
        color: getBarColor(colors, status),
        targetHeight,
        worked,
      };
    });
  }, [records, colors]);

  const maxWorkedLabel = useMemo(() => {
    const max = Math.max(...bars.map((b) => b.worked), 0);
    return Math.ceil(max) || 8;
  }, [bars]);

  const animations = useRef<Animated.Value[]>([]);
  if (animations.current.length !== bars.length) {
    animations.current = bars.map(() => new Animated.Value(0));
  }

  useEffect(() => {
    animations.current.forEach((v) => v.setValue(0));
    Animated.stagger(
      25,
      animations.current.map((v) => Animated.timing(v, { toValue: 1, duration: 420, useNativeDriver: false }))
    ).start();
  }, [bars]);

  if (bars.length === 0) return null;

  return (
    <View style={[styles.card, { backgroundColor: colors.secondPrimaryColor }]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>Hours Worked</Text>

      <View style={styles.chartRow}>
        <View style={styles.axisLabels}>
          <Text style={[styles.axisLabelText, { color: colors.textSecondary }]}>{maxWorkedLabel}h</Text>
          <Text style={[styles.axisLabelText, { color: colors.textSecondary }]}>{Math.round(maxWorkedLabel / 2)}h</Text>
          <Text style={[styles.axisLabelText, { color: colors.textSecondary }]}>0h</Text>
        </View>

        <View style={styles.chartArea}>
          <View style={[styles.gridLine, { top: 0, backgroundColor: colors.borderColor }]} />
          <View style={[styles.gridLine, { top: CHART_HEIGHT / 2, backgroundColor: colors.borderColor }]} />
          <View style={[styles.gridLine, { top: CHART_HEIGHT, backgroundColor: colors.borderColor }]} />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {bars.map((bar, index) => (
              <View key={bar.key} style={styles.column}>
                <Animated.View
                  style={[
                    styles.bar,
                    {
                      backgroundColor: bar.color,
                      height: animations.current[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, bar.targetHeight],
                      }),
                    },
                  ]}
                />
                <Text style={[styles.dayLabel, { color: colors.textSecondary }]}>{bar.day}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default React.memo(AttendanceBarChart);

const styles = StyleSheet.create({
  card: {
    marginBottom: scale(14),
    borderRadius: scale(14),
    padding: scale(14),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  title: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: scale(10),
  },
  chartRow: {
    flexDirection: 'row',
  },
  axisLabels: {
    justifyContent: 'space-between',
    height: CHART_HEIGHT,
    marginRight: scale(8),
    paddingBottom: verticalScale(20),
  },
  axisLabelText: {
    fontSize: AppSizes.FONT_10,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  chartArea: {
    flex: 1,
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: verticalScale(1),
    opacity: 0.5,
  },
  scrollContent: {
    alignItems: 'flex-end',
    height: CHART_HEIGHT + verticalScale(20),
    paddingRight: scale(4),
  },
  column: {
    width: COLUMN_WIDTH,
    alignItems: 'center',
  },
  bar: {
    width: BAR_WIDTH,
    borderRadius: BAR_WIDTH / 2,
  },
  dayLabel: {
    fontSize: AppSizes.FONT_10,
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: verticalScale(6),
  },
});
