import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import BottomSheet from '../../../../components/BottomSheet';
import Icon from '../../../../components/Icons';
import { scale, verticalScale, moderateScale } from '../../../../utils/responsive';
import { AppSizes } from '../../../../utils/AppSizes';

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
    ({ item }: { item: DepartmentOption }) => {
      const isSelected = selectedId === item.id;
      return (
        <TouchableOpacity
          style={[
            styles.optionRow,
            { borderBottomColor: colors.borderColor },
            isSelected && { backgroundColor: colors.lightPurple, borderRadius: AppSizes.RADIUS_10, 
              paddingHorizontal: scale(5),
               borderBottomWidth:0,
               marginTop:scale(10)
             },
          ]}
          onPress={() => {
            onSelect(item.id);
            onClose();
          }}
        >
          <Text
            style={[
              styles.optionText,
              { color: isSelected ? colors.purple1 : colors.textPrimary },
              isSelected && styles.optionTextSelected,
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [colors, selectedId, onSelect, onClose]
  );
  const keyExtractor = useCallback((item: DepartmentOption) => String(item.id), []);

  return (
    <BottomSheet visible={visible} onClose={onClose} colors={colors} title="Select Department" maxHeight="60%">
      {departments.length === 0 ? (
        <Text style={{ color: colors.textSecondary, textAlign: 'center', marginVertical: AppSizes.MV_20 }}>
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
    maxHeight: verticalScale(320),
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: moderateScale(15),
    fontFamily: 'PlusJakartaSans-Medium',
    flex: 1,
    marginRight: scale(8),
  },
  optionTextSelected: {
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});
