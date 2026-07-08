import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import BottomSheet from '../../../../../components/BottomSheet';
import Icon from '../../../../../components/Icons';
import { scale } from '../../../../../utils/responsive';
import { AppSizes } from '../../../../../utils/AppSizes';

interface AttachmentSourceSheetProps {
  visible: boolean;
  colors: any;
  onCamera: () => void;
  onLibrary: () => void;
  onDocument: () => void;
  onClose: () => void;
}

const AttachmentSourceSheet = ({ visible, colors, onCamera, onLibrary, onDocument, onClose }: AttachmentSourceSheetProps) => (
  <BottomSheet visible={visible} onClose={onClose} colors={colors} title="Add Attachment" showCloseIcon>
    <TouchableOpacity style={[styles.row, { borderBottomColor: colors.borderColor }]} onPress={onCamera}>
      <Icon type="Ionicons" name="camera-outline" size={AppSizes.ICON_20} color={colors.purple1} />
      <Text style={[styles.text, { color: colors.textPrimary }]}>Take Photo</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[styles.row, { borderBottomColor: colors.borderColor }]} onPress={onLibrary}>
      <Icon type="Ionicons" name="images-outline" size={AppSizes.ICON_20} color={colors.purple1} />
      <Text style={[styles.text, { color: colors.textPrimary }]}>Choose from Library</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[styles.row, { borderBottomColor: colors.borderColor }]} onPress={onDocument}>
      <Icon type="Ionicons" name="document-outline" size={AppSizes.ICON_20} color={colors.purple1} />
      <Text style={[styles.text, { color: colors.textPrimary }]}>Choose PDF Document</Text>
    </TouchableOpacity>
  </BottomSheet>
);

export default React.memo(AttachmentSourceSheet);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(14),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: AppSizes.FONT_16,
    fontFamily: 'PlusJakartaSans-Medium',
    marginLeft: scale(12),
  },
});
