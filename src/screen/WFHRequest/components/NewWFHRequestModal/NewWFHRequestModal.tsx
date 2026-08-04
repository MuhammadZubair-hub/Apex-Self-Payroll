import React from 'react';
import { Modal, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConfirmModal from '../../../../components/ConfirmModal';
import Icon from '../../../../components/Icons';
import MyButton from '../../../../components/MyButton';
import ModalFlashMessage from '../../../../components/ModalFlashMessage';
import { scale, verticalScale } from '../../../../utils/responsive';
import { AppSizes } from '../../../../utils/AppSizes';
import FieldLabel from '../../../LeaveRequest/components/FieldLabel';
import { sharedStyles } from '../../../LeaveRequest/components/sharedStyles';
import { formatShortDate } from '../../../LeaveRequest/leaveRequest.constants';
import { newLeaveRequestStyles as styles } from '../../../LeaveRequest/SubmittedLeave/components/NewLeaveRequestModal/NewLeaveRequestModal.styles';
import { NewWFHRequestPayload, useNewWFHRequestForm } from './NewWFHRequestModal.logic';
import CalendarSheet from '../../../LeaveRequest/SubmittedLeave/components/NewLeaveRequestModal/CalendarSheet';
import { showThemedMessage } from '../../../../utils/flashMessage';

interface NewWFHRequestModalProps {
  visible: boolean;
  colors: any;
  employeeId: number | string;
  onClose: () => void;
  onSubmit: (payload: NewWFHRequestPayload) => Promise<boolean>;
}

const NewWFHRequestModal = ({ visible, colors, employeeId, onClose, onSubmit }: NewWFHRequestModalProps) => {
  const insets = useSafeAreaInsets();
  const {
    fromDate,
    toDate,
    reason,
    setReason,
    submitting,
    confirmModalVisible,
    closeConfirmVisible,
    datePicker,
    setDatePicker,
    totalDaysLabel,
    handleClose,
    cancelClose,
    confirmClose,
    handleDateConfirm,
    handleSubmit,
    cancelSubmit,
    confirmSubmit,
  } = useNewWFHRequestForm({ employeeId, onSubmit, onClose });

  if (!visible) return null;

  const onSubmitPress = () => {
    const res = handleSubmit();
    if (res?.error) {
      showThemedMessage(colors, { message: res.error, type: 'danger' });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <ModalFlashMessage visible={visible} />
      <View style={[styles.container, { backgroundColor: colors.primaryColor, paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <StatusBar backgroundColor={colors.primaryColor} barStyle="dark-content" />

        <View style={styles.formHeaderRow}>
          <TouchableOpacity style={styles.formHeaderSide} onPress={handleClose}>
            <Icon type="Ionicons" name="chevron-back" size={AppSizes.ICON_24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.formHeaderTitle, { color: colors.textPrimary }]}>New WFH Request</Text>
          <View style={styles.formHeaderSide} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formScrollContent}>
          <View style={[styles.infoBanner, { backgroundColor: colors.lightPurple }]}>
            <Icon type="Ionicons" name="laptop-outline" size={AppSizes.ICON_20} color={colors.purple1} />
            <View style={{ flex: 1, marginLeft: scale(10) }}>
              <Text style={[styles.infoBannerTitle, { color: colors.textPrimary }]}>Working from home?</Text>
              <Text style={[styles.infoBannerSubText, { color: colors.textSecondary }]}>
                Submit your WFH request and we&apos;ll notify you once it&apos;s reviewed.
              </Text>
            </View>
          </View>

          <FieldLabel text="From Date" colors={colors} />
          <TouchableOpacity
            style={[styles.formField, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
            onPress={() => setDatePicker({ visible: true, mode: 'from' })}
          >
            <Text style={[styles.formFieldText, { color: fromDate ? colors.textPrimary : colors.textSecondary }]}>
              {fromDate ? formatShortDate(fromDate) : 'Select start date'}
            </Text>
            <Icon type="Ionicons" name="calendar-outline" size={verticalScale(18)} color={colors.textSecondary} />
          </TouchableOpacity>

          <FieldLabel text="To Date" colors={colors} />
          <TouchableOpacity
            style={[styles.formField, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
            onPress={() => setDatePicker({ visible: true, mode: 'to' })}
          >
            <Text style={[styles.formFieldText, { color: toDate ? colors.textPrimary : colors.textSecondary }]}>
              {toDate ? formatShortDate(toDate) : 'Select end date'}
            </Text>
            <Icon type="Ionicons" name="calendar-outline" size={verticalScale(18)} color={colors.textSecondary} />
          </TouchableOpacity>

          <FieldLabel text="Total Days" colors={colors} />
          <View style={[styles.totalDaysBox, { backgroundColor: colors.primaryColor, borderColor: colors.borderColor }]}>
            <Text style={[styles.formFieldText, { color: colors.textSecondary }]}>{totalDaysLabel}</Text>
          </View>

          <FieldLabel text="Reason" colors={colors} />
          <View style={[sharedStyles.remarksBox, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}>
            <TextInput
              value={reason}
              onChangeText={(text) => text.length <= 250 && setReason(text)}
              placeholder="Enter reason for WFH"
              placeholderTextColor={colors.textSecondary}
              style={[sharedStyles.remarksInput, { color: colors.textPrimary }]}
              multiline
              maxLength={250}
            />
            <Text style={[sharedStyles.remarksCounter, { color: colors.textSecondary }]}>{reason.length}/250</Text>
          </View>

          <MyButton
            text="Submit WFH Request"
            onPress={onSubmitPress}
            loading={submitting}
            style={{ backgroundColor: colors.purple1, marginTop: scale(24) }}
          />
        </ScrollView>
      </View>

      <CalendarSheet
        visible={datePicker.visible}
        label={datePicker.mode === 'from' ? 'Select start date' : 'Select end date'}
        initialDate={datePicker.mode === 'from' ? fromDate : toDate}
        minDate={datePicker.mode === 'to' ? fromDate : null}
        colors={colors}
        onClose={() => setDatePicker((prev) => ({ ...prev, visible: false }))}
        onConfirm={handleDateConfirm}
      />

      <ConfirmModal
        visible={confirmModalVisible}
        colors={colors}
        title="Submit WFH Request"
        message="Are you sure you want to submit this Work From Home request?"
        confirmText="Submit"
        loading={submitting}
        onConfirm={confirmSubmit}
        onCancel={cancelSubmit}
      />

      <ConfirmModal
        visible={closeConfirmVisible}
        colors={colors}
        title="Close Form"
        message="Are you sure you want to discard this WFH request? Your entered details will be lost."
        confirmText="Discard"
        destructive
        onConfirm={confirmClose}
        onCancel={cancelClose}
      />
    </Modal>
  );
};

export default React.memo(NewWFHRequestModal);
