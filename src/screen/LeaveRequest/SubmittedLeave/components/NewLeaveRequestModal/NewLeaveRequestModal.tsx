import React from 'react';
import { Modal, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Fold } from 'react-native-animated-spinkit';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfirmModal from '../../../../../components/ConfirmModal';
import Icon from '../../../../../components/Icons';
import MyButton from '../../../../../components/MyButton';
import ModalFlashMessage from '../../../../../components/ModalFlashMessage';
import { scale, verticalScale } from '../../../../../utils/responsive';
import { AppSizes } from '../../../../../utils/AppSizes';
import FieldLabel from '../../../components/FieldLabel';
import { sharedStyles } from '../../../components/sharedStyles';
import { formatShortDate } from '../../../leaveRequest.constants';
import { NewLeaveRequestPayload, useNewLeaveRequestForm } from './NewLeaveRequestModal.logic';
import { newLeaveRequestStyles as styles } from './NewLeaveRequestModal.styles';
import LeaveTypePickerSheet from './LeaveTypePickerSheet';
import CalendarSheet from './CalendarSheet';
import AttachmentSourceSheet from './AttachmentSourceSheet';

interface NewLeaveRequestModalProps {
  visible: boolean;
  colors: any;
  leaveTypes: any[];
  employeeId: number | string;
  onClose: () => void;
  onSubmit: (payload: NewLeaveRequestPayload) => Promise<boolean>;
}

const NewLeaveRequestModal = ({ visible, colors, leaveTypes, employeeId, onClose, onSubmit }: NewLeaveRequestModalProps) => {
  const {
    leaveTypeId,
    setLeaveTypeId,
    fromDate,
    toDate,
    remarks,
    setRemarks,
    typePickerVisible,
    setTypePickerVisible,
    submitting,
    attachment,
    setAttachment,
    attachmentUploading,
    attachmentSourceVisible,
    setAttachmentSourceVisible,
    confirmModalVisible,
    closeConfirmVisible,
    datePicker,
    setDatePicker,
    normalizedTypes,
    selectedLeaveType,
    totalDaysLabel,
    pickAndUploadAttachment,
    pickFromCamera,
    pickFromLibrary,
    pickPdfDocument,
    handleClose,
    cancelClose,
    confirmClose,
    handleDateConfirm,
    handleSubmit,
    cancelSubmit,
    confirmSubmit,
  } = useNewLeaveRequestForm({ leaveTypes, employeeId, onSubmit, onClose });

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={handleClose}>
      <ModalFlashMessage visible={visible} />
      <SafeAreaView style={[styles.container, { backgroundColor: colors.primaryColor }]}>
        <StatusBar backgroundColor={colors.primaryColor} barStyle="dark-content" />

        <View style={styles.formHeaderRow}>
          <TouchableOpacity style={styles.formHeaderSide} onPress={handleClose}>
            <Icon type="Ionicons" name="chevron-back" size={AppSizes.ICON_24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.formHeaderTitle, { color: colors.textPrimary }]}>New Leave Request</Text>
          <View style={styles.formHeaderSide} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formScrollContent}>
          <View style={[styles.infoBanner, { backgroundColor: colors.lightPurple }]}>
            <Icon type="Ionicons" name="document-text" size={AppSizes.ICON_20} color={colors.purple1} />
            <View style={{ flex: 1, marginLeft: scale(10) }}>
              <Text style={[styles.infoBannerTitle, { color: colors.textPrimary }]}>Need time off?</Text>
              <Text style={[styles.infoBannerSubText, { color: colors.textSecondary }]}>
                Submit your leave request and we&apos;ll notify you once it&apos;s reviewed.
              </Text>
            </View>
          </View>

          <FieldLabel text="Leave Type " colors={colors} />
          <TouchableOpacity
            style={[styles.formField, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
            onPress={() => setTypePickerVisible(true)}
          >
            <Text style={[styles.formFieldText, { color: selectedLeaveType ? colors.textPrimary : colors.textSecondary }]}>
              {selectedLeaveType ? selectedLeaveType.label : 'Select leave type'}
            </Text>
            <Icon type="Ionicons" name="chevron-down" size={verticalScale(18)} color={colors.textSecondary} />
          </TouchableOpacity>

          <FieldLabel text="From Date " colors={colors} />
          <TouchableOpacity
            style={[styles.formField, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
            onPress={() => setDatePicker({ visible: true, mode: 'from' })}
          >
            <Text style={[styles.formFieldText, { color: fromDate ? colors.textPrimary : colors.textSecondary }]}>
              {fromDate ? formatShortDate(fromDate) : 'Select start date'}
            </Text>
            <Icon type="Ionicons" name="calendar-outline" size={verticalScale(18)} color={colors.textSecondary} />
          </TouchableOpacity>

          <FieldLabel text="To Date " colors={colors} />
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

          <FieldLabel text="Remarks (Optional)" colors={colors} />
          <View style={[sharedStyles.remarksBox, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}>
            <TextInput
              value={remarks}
              onChangeText={(text) => text.length <= 250 && setRemarks(text)}
              placeholder="Enter your remarks"
              placeholderTextColor={colors.textSecondary}
              style={[sharedStyles.remarksInput, { color: colors.textPrimary }]}
              multiline
              maxLength={250}
            />
            <Text style={[sharedStyles.remarksCounter, { color: colors.textSecondary }]}>{remarks.length}/250</Text>
          </View>

          <FieldLabel text="Attachment (Optional)" colors={colors} />
          {attachment ? (
            <View style={[styles.attachmentRow, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}>
              <Icon type="Ionicons" name="document-attach-outline" size={AppSizes.ICON_20} color={colors.purple1} />
              <View style={{ flex: 1, marginLeft: scale(10) }}>
                <Text style={[styles.attachmentTitle, { color: colors.textPrimary }]} numberOfLines={1}>
                  {attachment.name}
                </Text>
                <Text style={[styles.attachmentSubText, { color: colors.textSecondary }]}>Uploaded</Text>
              </View>
              <TouchableOpacity onPress={pickAndUploadAttachment} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Icon type="Ionicons" name="refresh-outline" size={AppSizes.ICON_20} color={colors.purple1} style={{ marginRight: scale(14) }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setAttachment(null)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Icon type="Ionicons" name="close-circle" size={AppSizes.ICON_20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.attachmentRow, { borderColor: colors.borderColor, backgroundColor: colors.secondPrimaryColor }]}
              onPress={pickAndUploadAttachment}
              disabled={attachmentUploading}
            >
              <Icon type="Ionicons" name="attach-outline" size={AppSizes.ICON_20} color={colors.purple1} />
              <View style={{ flex: 1, marginLeft: scale(10) }}>
                <Text style={[styles.attachmentTitle, { color: colors.textPrimary }]}>
                  {attachmentUploading ? 'Uploading...' : 'Add supporting document'}
                </Text>
                <Text style={[styles.attachmentSubText, { color: colors.textSecondary }]}>JPG, PNG or PDF</Text>
              </View>
              {attachmentUploading ? (
                <Fold size={AppSizes.ICON_20} color={colors.purple1} />
              ) : (
                <Icon type="Ionicons" name="chevron-forward" size={verticalScale(18)} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
          )}

          <MyButton
            text="Submit Request"
            onPress={handleSubmit}
            loading={submitting}
            style={{ backgroundColor: colors.purple1, marginTop: scale(24) }}
          />
        </ScrollView>
      </SafeAreaView>

      <LeaveTypePickerSheet
        visible={typePickerVisible}
        colors={colors}
        types={normalizedTypes}
        selectedId={leaveTypeId}
        onSelect={(id) => {
          setLeaveTypeId(id);
          setTypePickerVisible(false);
        }}
        onClose={() => setTypePickerVisible(false)}
      />

      <CalendarSheet
        visible={datePicker.visible}
        label={datePicker.mode === 'from' ? 'Select start date' : 'Select end date'}
        initialDate={datePicker.mode === 'from' ? fromDate : toDate}
        minDate={datePicker.mode === 'to' ? fromDate : null}
        colors={colors}
        onClose={() => setDatePicker((prev) => ({ ...prev, visible: false }))}
        onConfirm={handleDateConfirm}
      />

      <AttachmentSourceSheet
        visible={attachmentSourceVisible}
        colors={colors}
        onCamera={pickFromCamera}
        onLibrary={pickFromLibrary}
        onDocument={pickPdfDocument}
        onClose={() => setAttachmentSourceVisible(false)}
      />

      <ConfirmModal
        visible={confirmModalVisible}
        colors={colors}
        title="Before You Submit"
        message={
          'A handover discussion must be conducted at least one working day before your leave begins.\n\n' +
          'Your manager will ensure that all responsibilities are properly assigned during your absence, helping to avoid any disruption in work.'
        }
        confirmText="Submit"
        loading={submitting}
        onConfirm={confirmSubmit}
        onCancel={cancelSubmit}
      />

      <ConfirmModal
        visible={closeConfirmVisible}
        colors={colors}
        title="Close Form"
        message="Are you sure you want to discard this leave request? Your entered details will be lost."
        confirmText="Discard"
        destructive
        onConfirm={confirmClose}
        onCancel={cancelClose}
      />
    </Modal>
  );
};

export default React.memo(NewLeaveRequestModal);
