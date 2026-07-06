import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import Icon from '../../../components/Icons';
import { MONTH_NAMES } from '../attandance.constants';
import { scale } from '../../../utils/responsive';

interface MonthYearPickerSheetProps {
  visible: boolean;
  month: number;
  year: number;
  colors: any;
  onClose: () => void;
  onConfirm: (month: number, year: number) => void;
}

const MonthYearPickerSheet = ({ visible, month, year, colors, onClose, onConfirm }: MonthYearPickerSheetProps) => {
  const [pickerYear, setPickerYear] = useState(year);

  useEffect(() => {
    if (visible) setPickerYear(year);
  }, [visible, year]);

  return (
    <BottomSheet visible={visible} onClose={onClose} colors={colors} title="Select Month" showCloseIcon>
      <View style={styles.yearNavRow}>
        <TouchableOpacity onPress={() => setPickerYear((y) => y - 1)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Icon type="Ionicons" name="chevron-back" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.yearText, { color: colors.textPrimary }]}>{pickerYear}</Text>
        <TouchableOpacity onPress={() => setPickerYear((y) => y + 1)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Icon type="Ionicons" name="chevron-forward" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {MONTH_NAMES.map((name, index) => {
          const m = index + 1;
          const selected = m === month && pickerYear === year;
          return (
            <TouchableOpacity
              key={name}
              style={[styles.cell, { backgroundColor: selected ? colors.purple1 : colors.primaryColor }]}
              onPress={() => onConfirm(m, pickerYear)}
            >
              <Text style={[styles.cellText, { color: selected ? '#fff' : colors.textPrimary }]}>{name.slice(0, 3)}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </BottomSheet>
  );
};

export default React.memo(MonthYearPickerSheet);

const styles = StyleSheet.create({
  yearNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(16),
    paddingHorizontal: scale(8),
  },
  yearText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cell: {
    width: '31%',
    paddingVertical: scale(14),
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: scale(10),
  },
  cellText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Medium',
  },
});
