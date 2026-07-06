import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { buildMonthGrid, dateKey, isSameDay, LeaveCalendarRecord, WEEKDAYS } from './attendanceCalendar.constants';

interface AttendanceCalendarGridProps {
  month: number;
  year: number;
  markedDates: Map<string, LeaveCalendarRecord[]>;
  colors: any;
  onPressDay?: (key: string, records: LeaveCalendarRecord[]) => void;
}

const AttendanceCalendarGrid = ({ month, year, markedDates, colors, onPressDay }: AttendanceCalendarGridProps) => {
  const cells = useMemo(() => buildMonthGrid(year, month - 1), [year, month]);
  const today = useMemo(() => new Date(), []);

  return (
    <View>
      <View style={styles.weekdayRow}>
        {WEEKDAYS.map((day) => (
          <Text key={day} style={[styles.weekdayText, { color: colors.textSecondary }]}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((cell, index) => {
          const key = dateKey(cell.date);
          const dayRecords = markedDates.get(key) || [];
          const onLeave = dayRecords.length > 0;
          const isToday = isSameDay(cell.date, today);

          return (
            <TouchableOpacity
              key={index}
              style={styles.cell}
              disabled={!onLeave}
              activeOpacity={onLeave ? 0.7 : 1}
              onPress={() => onPressDay?.(key, dayRecords)}
            >
              <View
                style={[
                  styles.dayCircle,
                  onLeave && { backgroundColor: colors.purple1 },
                  !onLeave && isToday && { backgroundColor: colors.redColor },
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    { color: cell.inMonth ? colors.textPrimary : colors.textSecondary },
                    !cell.inMonth && { opacity: 0.35 },
                    (onLeave || isToday) && { color: '#fff', fontFamily: 'PlusJakartaSans-SemiBold' },
                  ]}
                >
                  {cell.date.getDate()}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default React.memo(AttendanceCalendarGrid);

const styles = StyleSheet.create({
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  weekdayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: `${100 / 7}%`,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
  },
});
