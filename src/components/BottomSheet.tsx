import React from 'react';
import { DimensionValue, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from './Icons';
import ModalFlashMessage from './ModalFlashMessage';
import { scale } from '../utils/responsive';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  colors: any;
  title?: string;
  showCloseIcon?: boolean;
  headerRight?: React.ReactNode;
  maxHeight?: DimensionValue;
  scrollable?: boolean;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

const BottomSheet = ({
  visible,
  onClose,
  colors,
  title,
  showCloseIcon = false,
  headerRight,
  maxHeight,
  scrollable = false,
  footer,
  children,
}: BottomSheetProps) => {
  const Content = scrollable ? ScrollView : View;
  const contentProps = scrollable
    ? { showsVerticalScrollIndicator: false, contentContainerStyle: styles.scrollContent }
    : {};

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <ModalFlashMessage visible={visible} />
      <View style={styles.overlay}>
        <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />

        <View style={[styles.container, { backgroundColor: colors.secondPrimaryColor, maxHeight: maxHeight ?? '88%' }]}>
          <View style={[styles.handle, { backgroundColor: colors.purple1 }]} />

          {title ? (
            <View style={styles.headerRow}>
              <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
              {headerRight ??
                (showCloseIcon && (
                  <TouchableOpacity onPress={onClose}>
                    <Icon type="Ionicons" name="close" size={22} color={colors.textSecondary} />
                  </TouchableOpacity>
                ))}
            </View>
          ) : null}

          <Content {...contentProps}>{children}</Content>

          {footer}
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(BottomSheet);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  container: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: scale(20),
    paddingTop: scale(10),
    paddingBottom: scale(24),
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: scale(14),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(14),
  },
  title: {
    fontSize: 17,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  scrollContent: {
    paddingBottom: scale(10),
  },
});
