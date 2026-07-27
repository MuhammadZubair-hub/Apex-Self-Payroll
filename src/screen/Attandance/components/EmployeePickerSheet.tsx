import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import Icon from '../../../components/Icons';
import { scale, verticalScale, moderateScale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

interface EmployeePickerSheetProps {
  visible: boolean;
  employees: any[];
  selectedEmployeeId: number | string | undefined;
  colors: any;
  onClose: () => void;
  onSelect: (employee: any) => void;
}

const EmployeePickerSheet = ({
  visible,
  employees,
  selectedEmployeeId,
  colors,
  onClose,
  onSelect,
}: EmployeePickerSheetProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) return employees;
    const q = searchQuery.toLowerCase().trim();
    return employees.filter(
      (emp) =>
        (emp.name && emp.name.toLowerCase().includes(q)) ||
        (emp.code && emp.code.toLowerCase().includes(q)) ||
        (emp.legacyCode && emp.legacyCode.toLowerCase().includes(q)) ||
        (emp.designation && emp.designation.toLowerCase().includes(q)) ||
        (emp.department && emp.department.toLowerCase().includes(q))
    );
  }, [employees, searchQuery]);

  const renderItem = ({ item }: { item: any }) => {
    const isSelected = String(item.id) === String(selectedEmployeeId);
    const code = item.legacyCode || item.code || '';
    const initial = (item.name || 'E').charAt(0).toUpperCase();

    return (
      <TouchableOpacity
        style={[
          styles.itemRow,
          {
            backgroundColor: isSelected ? (colors.lightPurple || 'rgba(124, 77, 255, 0.1)') : colors.primaryColor,
            borderColor: isSelected ? colors.purple1 : (colors.borderColor || '#E0E0E0'),
          },
        ]}
        onPress={() => onSelect(item)}
        activeOpacity={0.7}
      >
        <View style={[styles.avatar, { backgroundColor: isSelected ? colors.purple1 : colors.purple1 + '20' }]}>
          <Text style={[styles.avatarText, { color: isSelected ? '#FFFFFF' : colors.purple1 }]}>{initial}</Text>
        </View>

        <View style={styles.itemInfo}>
          <View style={styles.nameRow}>
            <Text style={[styles.itemName, { color: colors.textPrimary }]}>{item.name}</Text>
            {item.isSelf && (
              <View style={[styles.selfBadge, { backgroundColor: colors.purple1 + '15' }]}>
                <Text style={[styles.selfBadgeText, { color: colors.purple1 }]}>Self</Text>
              </View>
            )}
          </View>
          <Text style={[styles.itemSub, { color: colors.textSecondary }]}>
            {code ? `${code}` : ''}
            {item.designation ? `${code ? ' • ' : ''}${item.designation.trim()}` : ''}
            {item.department ? ` • ${item.department.trim()}` : ''}
          </Text>
        </View>

        {isSelected && (
          <Icon type="Ionicons" name="checkmark-circle" size={AppSizes.ICON_20} color={colors.purple1} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <BottomSheet visible={visible} onClose={onClose} colors={colors} title="Select Employee" showCloseIcon maxHeight="80%">
      {employees.length > 5 && (
        <View style={[styles.searchContainer, { backgroundColor: colors.primaryColor, borderColor: colors.borderColor || '#E5E7EB' }]}>
          <Icon type="Ionicons" name="search-outline" size={AppSizes.ICON_20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder="Search employee..."
            placeholderTextColor={colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon type="Ionicons" name="close-circle" size={AppSizes.ICON_16} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      )}

      <FlatList
        data={filteredEmployees}
        keyExtractor={(item, index) => String(item.id || index)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No employees found</Text>
          </View>
        }
      />
    </BottomSheet>
  );
};

export default React.memo(EmployeePickerSheet);

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: AppSizes.RADIUS_10,
    borderWidth: 1,
    marginBottom: scale(14),
  },
  searchInput: {
    flex: 1,
    marginLeft: scale(8),
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Regular',
    padding: 0,
  },
  listContainer: {
    paddingBottom: scale(16),
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    borderRadius: scale(12),
    borderWidth: 1,
    marginBottom: scale(10),
  },
  avatar: {
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: AppSizes.FONT_16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
  itemInfo: {
    flex: 1,
    marginLeft: scale(12),
    marginRight: scale(8),
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  itemName: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  selfBadge: {
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
    borderRadius: scale(6),
  },
  selfBadgeText: {
    fontSize: moderateScale(10),
    fontFamily: 'PlusJakartaSans-Bold',
  },
  itemSub: {
    fontSize: moderateScale(12),
    fontFamily: 'PlusJakartaSans-Regular',
    marginTop: verticalScale(2),
  },
  emptyBox: {
    paddingVertical: scale(30),
    alignItems: 'center',
  },
  emptyText: {
    fontSize: AppSizes.FONT_14,
    fontFamily: 'PlusJakartaSans-Regular',
  },
});
