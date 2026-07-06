import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import BottomSheet from '../../../../components/BottomSheet';
import Icon from '../../../../components/Icons';

interface DepartmentOption {
  id: number | string;
  name: string;
}

interface DepartmentPickerSheetProps {
  visible: boolean;
  colors: any;
  departments: DepartmentOption[];
  selectedId: number | string | null;
  onSelect: (id: number | string) => void;
  onClose: () => void;
}

const DepartmentPickerSheet = ({ visible, colors, departments, selectedId, onSelect, onClose }: DepartmentPickerSheetProps) => {
  const renderItem = useCallback(
    ({ item }: { item: DepartmentOption }) => (
      <TouchableOpacity
        style={[styles.optionRow, { borderBottomColor: colors.borderColor }]}
        onPress={() => {
          onSelect(item.id);
          onClose();
        }}
      >
        <Text style={[styles.optionText, { color: colors.textPrimary }]}>{item.name}</Text>
        {selectedId === item.id && <Icon type="Ionicons" name="checkmark" size={18} color={colors.purple1} />}
      </TouchableOpacity>
    ),
    [colors, selectedId, onSelect, onClose]
  );
  const keyExtractor = useCallback((item: DepartmentOption) => String(item.id), []);

  return (
    <BottomSheet visible={visible} onClose={onClose} colors={colors} title="Select Department" maxHeight="60%">
      {departments.length === 0 ? (
        <Text style={{ color: colors.textSecondary, textAlign: 'center', marginVertical: 20 }}>
          No departments available
        </Text>
      ) : (
        <FlatList
          data={departments}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          style={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </BottomSheet>
  );
};

export default React.memo(DepartmentPickerSheet);

const styles = StyleSheet.create({
  list: {
    maxHeight: 320,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans-Medium',
    flex: 1,
    marginRight: 8,
  },
});
