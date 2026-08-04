import { useCallback, useMemo, useState } from 'react';
import { daysBetweenInclusive } from '../../../LeaveRequest/leaveRequest.constants';

export interface NewWFHRequestPayload {
  fromDate: Date;
  toDate: Date;
  reason: string;
}

interface UseNewWFHRequestFormParams {
  employeeId: number | string;
  onSubmit: (payload: NewWFHRequestPayload) => Promise<boolean>;
  onClose: () => void;
}

export const useNewWFHRequestForm = ({ employeeId, onSubmit, onClose }: UseNewWFHRequestFormParams) => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [closeConfirmVisible, setCloseConfirmVisible] = useState(false);

  const [datePicker, setDatePicker] = useState<{ visible: boolean; mode: 'from' | 'to' }>({
    visible: false,
    mode: 'from',
  });

  const totalDaysLabel = useMemo(() => {
    if (!fromDate || !toDate) return '0 days selected';
    const d = daysBetweenInclusive(fromDate, toDate);
    return `${d} day${d === 1 ? '' : 's'}`;
  }, [fromDate, toDate]);

  const resetState = useCallback(() => {
    setFromDate(null);
    setToDate(null);
    setReason('');
    setSubmitting(false);
    setConfirmModalVisible(false);
    setCloseConfirmVisible(false);
  }, []);

  const handleClose = useCallback(() => {
    if (fromDate || toDate || reason.trim()) {
      setCloseConfirmVisible(true);
    } else {
      resetState();
      onClose();
    }
  }, [fromDate, toDate, reason, resetState, onClose]);

  const cancelClose = useCallback(() => setCloseConfirmVisible(false), []);
  const confirmClose = useCallback(() => {
    resetState();
    onClose();
  }, [resetState, onClose]);

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
    if (!fromDate) {
      return { error: 'Please select a start date' };
    }
    if (!toDate) {
      return { error: 'Please select an end date' };
    }
    if (!reason.trim()) {
      return { error: 'Please enter a reason for your WFH request' };
    }
    setConfirmModalVisible(true);
    return null;
  }, [fromDate, toDate, reason]);

  const cancelSubmit = useCallback(() => setConfirmModalVisible(false), []);

  const confirmSubmit = useCallback(async () => {
    if (!fromDate || !toDate) return;
    setSubmitting(true);
    const ok = await onSubmit({
      fromDate,
      toDate,
      reason: reason.trim(),
    });
    setSubmitting(false);
    if (ok) {
      setConfirmModalVisible(false);
      resetState();
    }
  }, [fromDate, toDate, reason, onSubmit, resetState]);

  return {
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
  };
};
