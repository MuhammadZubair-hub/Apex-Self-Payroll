import React from 'react';
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
  statusFilter: string;
  onSelectStatus: (status: string) => void;
  fromDate: Date | null;
  toDate: Date | null;
  datePicker: { visible: boolean; mode: 'from' | 'to' };
  onOpenDatePicker: (mode: 'from' | 'to') => void;
  onCloseDatePicker: () => void;
  onConfirmDate: (date: Date | null) => void;
  onReset: () => void;
  onClose: () => void;
}

const WFHFilterModal = ({
  visible,
  colors,
  statusFilter,
  onSelectStatus,
  fromDate,
  toDate,
  datePicker,
  onOpenDatePicker,
  onCloseDatePicker,
  onConfirmDate,
  onReset,
  onClose,
}: WFHFilterModalProps) => {
  return (
    <>
      <BottomSheet visible={visible} onClose={onClose} colors={colors} title="Filter WFH Applications">
        <FieldLabel text="Application Status" colors={colors} />
        <View style={styles.statusRow}>
          {STATUS_TABS.map((tab) => {
            const active = statusFilter === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.statusChip,
                  { borderColor: active ? colors.purple1 : colors.borderColor },
                  active && { backgroundColor: colors.lightPurple },
                ]}
                onPress={() => onSelectStatus(tab.id)}
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
            onPress={() => onOpenDatePicker('from')}
          >
            <Icon type="Ionicons" name="calendar-outline" size={AppSizes.ICON_18} color={colors.textSecondary} />
            <Text style={[styles.dateButtonText, { color: fromDate ? colors.textPrimary : colors.textSecondary }]}>
              {fromDate ? formatShortDate(fromDate) : 'From date'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dateButton, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
            onPress={() => onOpenDatePicker('to')}
          >
            <Icon type="Ionicons" name="calendar-outline" size={AppSizes.ICON_18} color={colors.textSecondary} />
            <Text style={[styles.dateButtonText, { color: toDate ? colors.textPrimary : colors.textSecondary }]}>
              {toDate ? formatShortDate(toDate) : 'To date'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={[styles.resetButton, { borderColor: colors.borderColor }]} onPress={onReset}>
            <Text style={[styles.resetText, { color: colors.textSecondary }]}>Reset</Text>
          </TouchableOpacity>

          <MyButton text="Apply Filters" onPress={onClose} style={{ flex: 1, backgroundColor: colors.purple1 }} />
        </View>
      </BottomSheet>

      <CalendarSheet
        visible={datePicker.visible}
        label={datePicker.mode === 'from' ? 'Filter: From Date' : 'Filter: To Date'}
        initialDate={datePicker.mode === 'from' ? fromDate : toDate}
        minDate={datePicker.mode === 'to' ? fromDate : null}
        colors={colors}
        onClose={onCloseDatePicker}
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
    fontSize: AppSizes.FONT_13,
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
    fontSize: AppSizes.FONT_13,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: scale(12),
    alignItems: 'center',
  },
  resetButton: {
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(12),
    borderRadius: AppSizes.RADIUS_12,
    borderWidth: 1,
  },
  resetText: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});
