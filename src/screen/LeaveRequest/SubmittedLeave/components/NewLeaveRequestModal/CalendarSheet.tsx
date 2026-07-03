import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from '../../../../../components/BottomSheet';
import MyButton from '../../../../../components/MyButton';
import Icon from '../../../../../components/Icons';
import { MONTH_NAMES, WEEKDAYS, buildMonthGrid, isSameDay } from '../../../leaveRequest.constants';
import { scale } from '../../../../../utils/responsive';

interface CalendarSheetProps {
  visible: boolean;
  label: string;
  initialDate: Date | null;
  minDate: Date | null;
  colors: any;
  onClose: () => void;
  onConfirm: (date: Date | null) => void;
}

const DayCell = React.memo(
  ({
    cell,
    selected,
    disabled,
    colors,
    onPress,
  }: {
    cell: { date: Date; inMonth: boolean };
    selected: boolean;
    disabled: boolean;
    colors: any;
    onPress: (date: Date) => void;
  }) => (
    <TouchableOpacity style={styles.cell} disabled={disabled} onPress={() => onPress(cell.date)}>
      <View style={[styles.dayCircle, selected && { backgroundColor: colors.purple1 }]}>
        <Text
          style={[
            styles.dayText,
            { color: cell.inMonth ? colors.textPrimary : colors.textSecondary },
            !cell.inMonth && { opacity: 0.4 },
            disabled && cell.inMonth && { opacity: 0.3 },
            selected && { color: '#fff', fontFamily: 'PlusJakartaSans-SemiBold' },
          ]}
        >
          {cell.date.getDate()}
        </Text>
      </View>
    </TouchableOpacity>
  )
);

const CalendarSheet = ({ visible, label, initialDate, minDate, colors, onClose, onConfirm }: CalendarSheetProps) => {
  const today = useMemo(() => new Date(), []);
  const defaultDate = initialDate || (minDate && minDate > today ? minDate : today);

  const [viewYear, setViewYear] = useState(defaultDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(defaultDate.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate || defaultDate);

  useEffect(() => {
    if (visible) {
      const base = initialDate || (minDate && minDate > today ? minDate : today);
      setViewYear(base.getFullYear());
      setViewMonth(base.getMonth());
      setSelectedDate(initialDate || base);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const cells = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);

  const goToPrevMonth = useCallback(() => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }, [viewMonth]);

  const goToNextMonth = useCallback(() => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }, [viewMonth]);

  const isDisabled = useCallback(
    (date: Date) => {
      if (!minDate) return false;
      const start = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
      return date < start;
    },
    [minDate]
  );

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      colors={colors}
      title={label}
      headerRight={
        <TouchableOpacity onPress={() => setSelectedDate(null)}>
          <Text style={[styles.clearText, { color: colors.purple1 }]}>Clear</Text>
        </TouchableOpacity>
      }
    >
      <View style={styles.monthNavRow}>
        <TouchableOpacity onPress={goToPrevMonth}>
          <Icon type="Ionicons" name="chevron-back" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.monthNavText, { color: colors.textPrimary }]}>
          {MONTH_NAMES[viewMonth]} {viewYear}
        </Text>
        <TouchableOpacity onPress={goToNextMonth}>
          <Icon type="Ionicons" name="chevron-forward" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekdayRow}>
        {WEEKDAYS.map((day) => (
          <Text key={day} style={[styles.weekdayText, { color: colors.textSecondary }]}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {cells.map((cell, index) => (
          <DayCell
            key={index}
            cell={cell}
            selected={!!(selectedDate && isSameDay(cell.date, selectedDate))}
            disabled={!cell.inMonth || isDisabled(cell.date)}
            colors={colors}
            onPress={setSelectedDate}
          />
        ))}
      </View>

      <MyButton
        text="Done"
        onPress={() => onConfirm(selectedDate)}
        style={{ backgroundColor: colors.purple1, marginTop: scale(8) }}
      />
    </BottomSheet>
  );
};

export default React.memo(CalendarSheet);

const styles = StyleSheet.create({
  clearText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  monthNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(14),
  },
  monthNavText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: scale(6),
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
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans-Regular',
  },
});
