import { useCallback, useMemo, useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { errorCodes, isErrorWithCode, pick, types } from '@react-native-documents/picker';
import { getColors } from '../../../../../theme/color/theme';
import { useThemeContext } from '../../../../../theme/ThemeContex';
import { LeaveService } from '../../../../../services/LeaveService';
import { showThemedMessage } from '../../../../../utils/flashMessage';
import { daysBetweenInclusive } from '../../../leaveRequest.constants';

const EXTENSION_BY_MIME: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'application/pdf': 'pdf',
};

export interface NewLeaveRequestPayload {
  leaveTypeId: number | string;
  leaveTypeLabel: string;
  fromDate: Date;
  toDate: Date;
  remarks: string;
  attachmentPath: string;
}

interface UseNewLeaveRequestFormArgs {
  leaveTypes: any[];
  employeeId: number | string;
  onSubmit: (payload: NewLeaveRequestPayload) => Promise<boolean>;
  onClose: () => void;
}

export const useNewLeaveRequestForm = ({ leaveTypes, employeeId, onSubmit, onClose }: UseNewLeaveRequestFormArgs) => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const [leaveTypeId, setLeaveTypeId] = useState<number | string | null>(null);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [remarks, setRemarks] = useState('');
  const [typePickerVisible, setTypePickerVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [attachment, setAttachment] = useState<{ name: string; remotePath: string } | null>(null);
  const [attachmentUploading, setAttachmentUploading] = useState(false);
  const [attachmentSourceVisible, setAttachmentSourceVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [closeConfirmVisible, setCloseConfirmVisible] = useState(false);
  const [datePicker, setDatePicker] = useState<{ visible: boolean; mode: 'from' | 'to' }>({
    visible: false,
    mode: 'from',
  });

  const normalizedTypes = useMemo(
    () =>
      leaveTypes.map((t) => ({
        id: t.id ?? t.leaveID,
        label: t.leaveName?.trim?.() ?? t.name ?? t.leaveType ?? 'Leave',
        leaveBalance: t.leaveBalance ?? 0,
      })),
    [leaveTypes]
  );

  const selectedLeaveType = useMemo(
    () => normalizedTypes.find((t) => t.id === leaveTypeId),
    [normalizedTypes, leaveTypeId]
  );

  const totalDaysLabel = useMemo(() => {
    if (!fromDate || !toDate) return '0 day';
    const days = daysBetweenInclusive(fromDate, toDate);
    if (days <= 0) return '0 day';
    return days === 1 ? '1 day' : `${days} days`;
  }, [fromDate, toDate]);

  const resetForm = useCallback(() => {
    setLeaveTypeId(null);
    setFromDate(null);
    setToDate(null);
    setRemarks('');
    setAttachment(null);
  }, []);

  const uploadAttachment = useCallback(
    async (asset: { uri?: string; fileName?: string; type?: string }) => {
      if (!asset.uri) return;
      const extension = EXTENSION_BY_MIME[asset.type || ''] || 'jpg';
      const fileName = asset.fileName || `attachment_${Date.now()}.${extension}`;

      setAttachmentUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', {
          uri: asset.uri,
          name: fileName,
          type: asset.type || 'image/jpeg',
        } as any);
        formData.append('id', String(employeeId));

        const r = await LeaveService.uploadAttachment(formData);

        const remotePath = r.data?.path;
        if (r.success) {
          setAttachment({ name: fileName, remotePath });
        } else {
          showThemedMessage(colors, {
            message: 'Failed to upload attachment',
            description: `${r.data?.message || r.message}`,
            type: 'danger',
          });
          setAttachment({ name: fileName, remotePath });
        }
      } catch (error) {
        console.log('error uploading attachment', error);
        showThemedMessage(colors, { message: 'Failed to upload attachment', type: 'danger' });
      } finally {
        setAttachmentUploading(false);
      }
    },
    [employeeId, colors]
  );

  const pickAndUploadAttachment = useCallback(() => setAttachmentSourceVisible(true), []);

  const pickFromCamera = useCallback(async () => {
    setAttachmentSourceVisible(false);
    const result = await launchCamera({ mediaType: 'photo', quality: 0.7, saveToPhotos: true });
    if (result.didCancel || result.errorCode || !result.assets?.[0]) return;
    uploadAttachment(result.assets[0]);
  }, [uploadAttachment]);

  const pickFromLibrary = useCallback(async () => {
    setAttachmentSourceVisible(false);
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.7 });
    if (result.didCancel || result.errorCode || !result.assets?.[0]) return;
    uploadAttachment(result.assets[0]);
  }, [uploadAttachment]);

  const pickPdfDocument = useCallback(async () => {
    setAttachmentSourceVisible(false);
    try {
      const [result] = await pick({ type: [types.pdf] });
      uploadAttachment({ uri: result.uri, fileName: result.name || undefined, type: result.type || 'application/pdf' });
    } catch (error) {
      if (isErrorWithCode(error) && error.code === errorCodes.OPERATION_CANCELED) return;
      console.log('error picking document', error);
      showThemedMessage(colors, { message: 'Failed to open document picker', type: 'danger' });
    }
  }, [uploadAttachment, colors]);

  const handleClose = useCallback(() => setCloseConfirmVisible(true), []);

  const cancelClose = useCallback(() => setCloseConfirmVisible(false), []);

  const confirmClose = useCallback(() => {
    setCloseConfirmVisible(false);
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  const handleDateConfirm = useCallback(
    (date: Date | null) => {
      if (datePicker.mode === 'from') {
        setFromDate(date);
        if (date && toDate && toDate < date) setToDate(null);
      } else {
        setToDate(date);
      }
      setDatePicker((prev) => ({ ...prev, visible: false }));
    },
    [datePicker.mode, toDate]
  );

  const handleSubmit = useCallback(() => {
    if (!selectedLeaveType) {
      showThemedMessage(colors, { message: 'Please select a leave type', type: 'danger' });
      return;
    }
    if (!fromDate) {
      showThemedMessage(colors, { message: 'Please select a start date', type: 'danger' });
      return;
    }
    if (!toDate) {
      showThemedMessage(colors, { message: 'Please select an end date', type: 'danger' });
      return;
    }
    if (toDate < fromDate) {
      showThemedMessage(colors, { message: 'End date cannot be before start date', type: 'danger' });
      return;
    }
    if (attachmentUploading) {
      showThemedMessage(colors, { message: 'Your attachment is still uploading', type: 'warning' });
      return;
    }

    setConfirmModalVisible(true);
  }, [selectedLeaveType, fromDate, toDate, attachmentUploading, colors]);

  const cancelSubmit = useCallback(() => setConfirmModalVisible(false), []);

  const confirmSubmit = useCallback(async () => {
    if (!selectedLeaveType || !fromDate || !toDate) return;

    setSubmitting(true);
    const success = await onSubmit({
      leaveTypeId: selectedLeaveType.id,
      leaveTypeLabel: selectedLeaveType.label,
      fromDate,
      toDate,
      remarks,
      attachmentPath: attachment?.remotePath || '',
    });
    setSubmitting(false);
    // Only close on success - on failure the confirm sheet (and its held flash message toast)
    // needs to stay open long enough to actually show the error, and the user's form data
    // shouldn't be thrown away just because the submission was rejected.
    if (success) {
      setConfirmModalVisible(false);
      resetForm();
    }
  }, [selectedLeaveType, fromDate, toDate, remarks, attachment, onSubmit, resetForm]);

  return {
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
    resetForm,
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
  };
};
