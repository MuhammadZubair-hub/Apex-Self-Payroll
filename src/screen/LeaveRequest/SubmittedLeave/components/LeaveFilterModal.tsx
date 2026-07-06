import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from '../../../../components/BottomSheet';
import MyButton from '../../../../components/MyButton';
import Icon from '../../../../components/Icons';
import FieldLabel from '../../components/FieldLabel';
import { STATUS_TABS, formatShortDate } from '../../leaveRequest.constants';
import { scale } from '../../../../utils/responsive';
import CalendarSheet from './NewLeaveRequestModal/CalendarSheet';

interface LeaveFilterModalProps {
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

const LeaveFilterModal = ({
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
}: LeaveFilterModalProps) => (
  <>
    <BottomSheet
      visible={visible}
      onClose={onClose}
      colors={colors}
      title="Filter Requests"
      showCloseIcon
      footer={
        <View style={styles.footerRow}>
          <MyButton
            text="Clear"
            onPress={onReset}
            textColor={colors.textPrimary}
            style={{ flex: 1, backgroundColor: colors.secondPrimaryColor, borderWidth: 1, borderColor: colors.borderColor }}
          />
          <MyButton text="Done" onPress={onClose} style={{ flex: 1, backgroundColor: colors.purple1 }} />
        </View>
      }
    >
      <FieldLabel text="Status" colors={colors} />
      <View style={styles.statusRow}>
        {STATUS_TABS.map((tab) => {
          const selected = statusFilter === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.statusChip,
                { borderColor: selected ? colors.purple1 : colors.borderColor, backgroundColor: selected ? colors.purple1 : 'transparent' },
              ]}
              onPress={() => onSelectStatus(tab.key)}
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
        onPress={() => onOpenDatePicker('from')}
      >
        <Text style={[styles.dateFieldText, { color: fromDate ? colors.textPrimary : colors.textSecondary }]}>
          {fromDate ? formatShortDate(fromDate) : new Date().toISOString().split('T',1)}
        </Text>
        <Icon type="Ionicons" name="calendar-outline" size={18} color={colors.textSecondary} />
      </TouchableOpacity>

      <FieldLabel text="To Date" colors={colors} />
      <TouchableOpacity
        style={[styles.dateField, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
        onPress={() => onOpenDatePicker('to')}
      >
        <Text style={[styles.dateFieldText, { color: toDate ? colors.textPrimary : colors.textSecondary }]}>
          {toDate ? formatShortDate(toDate) : new Date().toISOString().split('T',1)}
        </Text>
        <Icon type="Ionicons" name="calendar-outline" size={18} color={colors.textSecondary} />
      </TouchableOpacity>
    </BottomSheet>

    <CalendarSheet
      visible={datePicker.visible}
      label={datePicker.mode === 'from' ? 'Select start date' : 'Select end date'}
      initialDate={datePicker.mode === 'from' ? fromDate : toDate}
      minDate={datePicker.mode === 'to' ? fromDate : null}
      colors={colors}
      onClose={onCloseDatePicker}
      onConfirm={onConfirmDate}
    />
  </>
);

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
    borderRadius: 20,
    borderWidth: 1,
  },
  statusChipText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  dateField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: scale(14),
    paddingVertical: scale(12),
    marginBottom: scale(4),
  },
  dateFieldText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
  },
  footerRow: {
    flexDirection: 'row',
    gap: scale(12),
    marginTop: scale(6),
  },
});
