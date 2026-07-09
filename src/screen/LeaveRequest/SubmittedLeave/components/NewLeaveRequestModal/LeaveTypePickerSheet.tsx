import React, { useCallback } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from '../../../../../components/BottomSheet';
import Icon from '../../../../../components/Icons';
import { sharedStyles } from '../../../components/sharedStyles';
import { verticalScale } from '../../../../../utils/responsive';
import { AppSizes } from '../../../../../utils/AppSizes';

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
    ({ item }: { item: LeaveTypeOption }) => {
      const isSelected = selectedId === item.id;
      return (
        <TouchableOpacity
          style={[
            styles.optionRow,
            { borderBottomColor: colors.borderColor },
            isSelected && { backgroundColor: colors.lightPurple, borderRadius: AppSizes.RADIUS_10, paddingHorizontal: AppSizes.PH_10,borderBottomWidth:0 },
          ]}
          onPress={() => onSelect(item.id)}
        >
          <View style={styles.optionTextWrap}>
            <Text
              style={[
                styles.optionText,
                { color: isSelected ? colors.purple1 : colors.textPrimary },
                isSelected && styles.optionTextSelected,
              ]}
            >
              {item.label}
            </Text>
            <Text style={[styles.optionSubText, { color: colors.textSecondary }]}>
              Leaves Remaining: {item.leaveBalance.toString()}
            </Text>
          </View>
          {/* {isSelected && <Icon type="Ionicons" name="checkmark" size={verticalScale(18)} color={colors.purple1} />} */}
        </TouchableOpacity>
      );
    },
    [colors, selectedId, onSelect]
  );
  const keyExtractor = useCallback((item: LeaveTypeOption) => String(item.id), []);

  return (
    <BottomSheet visible={visible} onClose={onClose} colors={colors} title="Select Leave Type" maxHeight="60%">
      {types.length === 0 ? (
        <Text style={[sharedStyles.emptyListSubText, { color: colors.textSecondary, textAlign: 'center', marginVertical: AppSizes.MV_20 }]}>
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
    maxHeight: verticalScale(320),
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(14),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionTextWrap: {
    flex: 1,
    marginRight: verticalScale(8),
  },
  optionText: {
    fontSize: AppSizes.FONT_16,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  optionTextSelected: {
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  optionSubText: {
    fontSize: AppSizes.FONT_12,
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: verticalScale(2),
  },
});
