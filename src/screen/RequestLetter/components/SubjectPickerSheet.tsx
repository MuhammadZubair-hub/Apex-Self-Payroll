import React, { useCallback } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import BottomSheet from '../../../components/BottomSheet';
import Icon from '../../../components/Icons';
import { requestLetterStyles as styles } from '../RequestLetter.styles';
import { LETTER_SUBJECTS } from '../requestLetter.constants';

interface SubjectPickerSheetProps {
  visible: boolean;
  colors: any;
  selected: string | null;
  onSelect: (subject: string) => void;
  onClose: () => void;
}

const SubjectPickerSheet = ({ visible, colors, selected, onSelect, onClose }: SubjectPickerSheetProps) => {
  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <TouchableOpacity style={[styles.optionRow, { borderBottomColor: colors.borderColor }]} onPress={() => onSelect(item)}>
        <Text style={[styles.optionText, { color: item === selected ? colors.purple1 : colors.textPrimary, flex: 1 }]}>{item}</Text>
        {item === selected && <Icon type="Ionicons" name="checkmark" size={18} color={colors.purple1} />}
      </TouchableOpacity>
    ),
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
