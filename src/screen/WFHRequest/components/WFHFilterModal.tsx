import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import Icon from '../../../components/Icons';
import MyButton from '../../../components/MyButton';
import CalendarSheet from '../../LeaveRequest/SubmittedLeave/components/NewLeaveRequestModal/CalendarSheet';
import FieldLabel from '../../LeaveRequest/components/FieldLabel';
import { STATUS_TABS, formatShortDate } from '../../LeaveRequest/leaveRequest.constants';
import { scale, verticalScale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

interface WFHFilterModalProps {
  visible: boolean;
  colors: any;
  initialStatus: string;
  initialFromDate: Date | null;
  initialToDate: Date | null;
  onApply: (status: string, fromDate: Date | null, toDate: Date | null) => void;
  onReset: () => void;
  onClose: () => void;
}

const WFHFilterModal = ({
  visible,
  colors,
  initialStatus,
  initialFromDate,
  initialToDate,
  onApply,
  onReset,
  onClose,
}: WFHFilterModalProps) => {
  const [status, setStatus] = useState(initialStatus);
  const [fromDate, setFromDate] = useState<Date | null>(initialFromDate);
  const [toDate, setToDate] = useState<Date | null>(initialToDate);
  const [datePicker, setDatePicker] = useState<{ visible: boolean; mode: 'from' | 'to' }>({ visible: false, mode: 'from' });

  useEffect(() => {
    if (visible) {
      setStatus(initialStatus);
      setFromDate(initialFromDate);
      setToDate(initialToDate);
    }
  }, [visible, initialStatus, initialFromDate, initialToDate]);

  const onConfirmDate = (date: Date | null) => {
    if (datePicker.mode === 'from') {
      setFromDate(date);
    } else {
      setToDate(date);
    }
    setDatePicker((prev) => ({ ...prev, visible: false }));
  };

  const handleApply = () => {
    onApply(status, fromDate, toDate);
  };

  return (
    <>
      <BottomSheet visible={visible} onClose={onClose} colors={colors} title="Filter WFH Applications">
        <FieldLabel text="Application Status" colors={colors} />
        <View style={styles.statusRow}>
          {STATUS_TABS.map((tab) => {
            const active = status === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.statusChip,
                  { borderColor: active ? colors.purple1 : colors.borderColor },
                  active && { backgroundColor: colors.lightPurple },
                ]}
                onPress={() => setStatus(tab.key)}
              >
                <Text
                  style={[
                    styles.statusChipText,
                    { color: active ? colors.purple1 : colors.textSecondary },
                    active && { fontFamily: 'PlusJakartaSans-SemiBold' },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <FieldLabel text="Date Range" colors={colors} />
        <View style={styles.datePickerRow}>
          <TouchableOpacity
            style={[styles.dateButton, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
            onPress={() => setDatePicker({ visible: true, mode: 'from' })}
          >
            <Icon type="Ionicons" name="calendar-outline" size={AppSizes.ICON_16} color={colors.textSecondary} />
            <Text style={[styles.dateButtonText, { color: fromDate ? colors.textPrimary : colors.textSecondary }]}>
              {fromDate ? formatShortDate(fromDate) : 'From date'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dateButton, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
            onPress={() => setDatePicker({ visible: true, mode: 'to' })}
          >
            <Icon type="Ionicons" name="calendar-outline" size={AppSizes.ICON_16} color={colors.textSecondary} />
            <Text style={[styles.dateButtonText, { color: toDate ? colors.textPrimary : colors.textSecondary }]}>
              {toDate ? formatShortDate(toDate) : 'To date'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.resetButton, { borderColor: colors.borderColor }]} onPress={onReset}>
            <Text style={[styles.resetText, { color: colors.textSecondary }]}>Reset</Text>
          </TouchableOpacity>

          <MyButton text="Apply Filters" onPress={handleApply} style={{ flex: 1, backgroundColor: colors.purple1 }} />
        </View>
      </BottomSheet>

      <CalendarSheet
        visible={datePicker.visible}
        label={datePicker.mode === 'from' ? 'Filter: From Date' : 'Filter: To Date'}
        initialDate={datePicker.mode === 'from' ? fromDate : toDate}
        minDate={datePicker.mode === 'to' ? fromDate : null}
        colors={colors}
        onClose={() => setDatePicker((prev) => ({ ...prev, visible: false }))}
        onConfirm={onConfirmDate}
      />
    </>
  );
};

export default React.memo(WFHFilterModal);

const styles = StyleSheet.create({
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
    marginBottom: verticalScale(14),
  },
  statusChip: {
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(8),
    borderRadius: AppSizes.RADIUS_20,
    borderWidth: 1,
  },
  statusChipText: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  datePickerRow: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: verticalScale(20),
  },
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
    borderRadius: AppSizes.RADIUS_12,
    borderWidth: 1,
    gap: scale(8),
  },
  dateButtonText: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: scale(12),
    alignItems: 'center',
  },
  resetButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderRadius: AppSizes.RADIUS_12,
    borderWidth: 1,
  },
  resetText: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});
