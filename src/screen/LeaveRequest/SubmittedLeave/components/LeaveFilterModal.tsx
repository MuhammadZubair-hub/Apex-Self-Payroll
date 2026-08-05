import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from '../../../../components/BottomSheet';
import MyButton from '../../../../components/MyButton';
import Icon from '../../../../components/Icons';
import FieldLabel from '../../components/FieldLabel';
import { STATUS_TABS, formatShortDate } from '../../leaveRequest.constants';
import { scale, verticalScale } from '../../../../utils/responsive';
import { AppSizes } from '../../../../utils/AppSizes';
import CalendarSheet from './NewLeaveRequestModal/CalendarSheet';

interface LeaveFilterModalProps {
  visible: boolean;
  colors: any;
  initialStatus: string;
  initialFromDate: Date | null;
  initialToDate: Date | null;
  onApply: (status: string, fromDate: Date | null, toDate: Date | null) => void;
  onReset: () => void;
  onClose: () => void;
}

const LeaveFilterModal = ({
  visible,
  colors,
  initialStatus,
  initialFromDate,
  initialToDate,
  onApply,
  onReset,
  onClose,
}: LeaveFilterModalProps) => {
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
      <BottomSheet
        visible={visible}
        onClose={onClose}
        colors={colors}
        title="Filter Leaves"
        showCloseIcon
        footer={
          <View style={styles.footerRow}>
            <MyButton
              text="Reset"
              onPress={onReset}
              textColor={colors.textPrimary}
              style={{ flex: 1, backgroundColor: colors.secondPrimaryColor, borderWidth: 1, borderColor: colors.borderColor }}
            />
            <MyButton text="Apply Filter" onPress={handleApply} style={{ flex: 1, backgroundColor: colors.purple1 }} />
          </View>
        }
      >
        <FieldLabel text="Status" colors={colors} />
        <View style={styles.statusRow}>
          {STATUS_TABS.map((tab) => {
            const selected = status === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.statusChip,
                  { borderColor: selected ? colors.purple1 : colors.borderColor, backgroundColor: selected ? colors.purple1 : 'transparent' },
                ]}
                onPress={() => setStatus(tab.key)}
              >
                <Text style={[styles.statusChipText, { color: selected ? '#fff' : colors.textPrimary }]} numberOfLines={1}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <FieldLabel text="From Date" colors={colors} />
        <TouchableOpacity
          style={[styles.dateField, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
          onPress={() => setDatePicker({ visible: true, mode: 'from' })}
        >
          <Text style={[styles.dateFieldText, { color: fromDate ? colors.textPrimary : colors.textSecondary }]}>
            {fromDate ? formatShortDate(fromDate) : new Date().toISOString().split('T', 1)}
          </Text>
          <Icon type="Ionicons" name="calendar-outline" size={verticalScale(18)} color={colors.textSecondary} />
        </TouchableOpacity>

        <FieldLabel text="To Date" colors={colors} />
        <TouchableOpacity
          style={[styles.dateField, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
          onPress={() => setDatePicker({ visible: true, mode: 'to' })}
        >
          <Text style={[styles.dateFieldText, { color: toDate ? colors.textPrimary : colors.textSecondary }]}>
            {toDate ? formatShortDate(toDate) : new Date().toISOString().split('T', 1)}
          </Text>
          <Icon type="Ionicons" name="calendar-outline" size={verticalScale(18)} color={colors.textSecondary} />
        </TouchableOpacity>
      </BottomSheet>

      <CalendarSheet
        visible={datePicker.visible}
        label={datePicker.mode === 'from' ? 'Select start date' : 'Select end date'}
        initialDate={datePicker.mode === 'from' ? fromDate : toDate}
        minDate={datePicker.mode === 'to' ? fromDate : null}
        colors={colors}
        onClose={() => setDatePicker((prev) => ({ ...prev, visible: false }))}
        onConfirm={onConfirmDate}
      />
    </>
  );
};

export default React.memo(LeaveFilterModal);

const styles = StyleSheet.create({
  statusRow: {
    flexDirection: 'row',
    gap: scale(8),
    marginBottom: scale(6),
  },
  statusChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: scale(9),
    borderRadius: AppSizes.RADIUS_20,
    borderWidth: 1,
  },
  statusChipText: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  dateField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: AppSizes.RADIUS_10,
    paddingHorizontal: scale(14),
    paddingVertical: scale(12),
    marginBottom: scale(4),
  },
  dateFieldText: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  footerRow: {
    flexDirection: 'row',
    gap: scale(12),
    marginTop: scale(6),
  },
});
