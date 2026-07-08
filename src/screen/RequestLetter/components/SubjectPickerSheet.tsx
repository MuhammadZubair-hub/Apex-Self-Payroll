import React, { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import Icon from '../../../components/Icons';
import { requestLetterStyles as styles } from '../RequestLetter.styles';
import { LETTER_SUBJECTS } from '../requestLetter.constants';
import { scale } from '../../../utils/responsive';
import { AppSizes } from '../../../utils/AppSizes';

interface SubjectPickerSheetProps {
  visible: boolean;
  colors: any;
  selected: string | null;
  onSelect: (subject: string) => void;
  onClose: () => void;
}

const SubjectPickerSheet = ({ visible, colors, selected, onSelect, onClose }: SubjectPickerSheetProps) => {
  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      const isSelected = item === selected;
      return (
        <TouchableOpacity style={[styles.optionRow, { borderBottomColor: colors.borderColor }]} onPress={() => onSelect(item)}>
          <View
            style={[
              styles.optionContent,
              isSelected && { backgroundColor: colors.lightPurple, borderRadius: AppSizes.RADIUS_10, 
               paddingVertical:scale(10),
               },
            ]}
          >
            <Text
              style={[
                styles.optionText,
                { color: isSelected ? colors.purple1 : colors.textPrimary },
                isSelected && styles.optionTextSelected,
              ]}
            >
              {item}
            </Text>
            {/* {isSelected && <Icon type="Ionicons" name="checkmark" size={scale(18)} color={colors.purple1} />} */}
          </View>
        </TouchableOpacity>
      );
    },
    [colors, selected, onSelect]
  );
  const keyExtractor = useCallback((item: string) => item, []);

  return (
    <BottomSheet visible={visible} onClose={onClose} colors={colors} title="Select Subject" showCloseIcon maxHeight="70%">
      <FlatList
        data={LETTER_SUBJECTS}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </BottomSheet>
  );
};

export default React.memo(SubjectPickerSheet);
