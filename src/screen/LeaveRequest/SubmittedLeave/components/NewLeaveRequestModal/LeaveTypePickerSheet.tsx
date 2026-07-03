import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import BottomSheet from '../../../../../components/BottomSheet';
import Icon from '../../../../../components/Icons';
import { sharedStyles } from '../../../components/sharedStyles';

interface LeaveTypeOption {
  id: number | string;
  label: string;
  leaveBalance: number;
}

interface LeaveTypePickerSheetProps {
  visible: boolean;
  colors: any;
  types: LeaveTypeOption[];
  selectedId: number | string | null;
  onSelect: (id: number | string) => void;
  onClose: () => void;
}

const LeaveTypePickerSheet = ({ visible, colors, types, selectedId, onSelect, onClose }: LeaveTypePickerSheetProps) => {
  const renderItem = useCallback(
    ({ item }: { item: LeaveTypeOption }) => (
      <TouchableOpacity style={[styles.optionRow, { borderBottomColor: colors.borderColor }]} onPress={() => onSelect(item.id)}>
        <Text style={[styles.optionText, { color: colors.textPrimary }]}>{item.label}  </Text>
        <Text style={{ color: colors.textPrimary, fontSize: 14, fontFamily: 'PlusJakartaSans-Regular' }}>
          Leaves Reamining :{item.leaveBalance.toString()}
        </Text>
        {selectedId === item.id && <Icon type="Ionicons" name="checkmark" size={18} color={colors.purple1} />}
      </TouchableOpacity>
    ),
    [colors, selectedId, onSelect]
  );
  const keyExtractor = useCallback((item: LeaveTypeOption) => String(item.id), []);

  return (
    <BottomSheet visible={visible} onClose={onClose} colors={colors} title="Select Leave Type" maxHeight="60%">
      {types.length === 0 ? (
        <Text style={[sharedStyles.emptyListSubText, { color: colors.textSecondary, textAlign: 'center', marginVertical: 20 }]}>
          No leave types available
        </Text>
      ) : (
        <FlatList
          data={types}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </BottomSheet>
  );
};

export default React.memo(LeaveTypePickerSheet);

const styles = StyleSheet.create({
  list: {
    maxHeight: 320,
  },
  optionRow: {
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Medium',
  },
});
