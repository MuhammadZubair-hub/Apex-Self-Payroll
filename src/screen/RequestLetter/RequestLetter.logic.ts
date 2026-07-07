import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser, getUserProfileData } from '../../redux/slices/authSlice';
import { RequestLetterService } from '../../services/RequestLetterService';
import { getColors } from '../../theme/color/theme';
import { useThemeContext } from '../../theme/ThemeContex';
import { showThemedMessage } from '../../utils/flashMessage';
import { buildLetterBody } from './requestLetter.constants';

export const useRequestLetter = () => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);

  const userData = useSelector(getUser);
  const profileData = useSelector(getUserProfileData);
  const employeeId = userData?.employeeId;

  const fullName = profileData?.name || userData?.employeeName || 'Employee';
  const designation = profileData?.designation || 'N/A';
  const department = profileData?.department || 'N/A';

  const [subject, setSubjectState] = useState<string | null>(null);
  const [body, setBody] = useState('');
  const [subjectPickerVisible, setSubjectPickerVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const setSubject = useCallback(
    (value: string) => {
      setSubjectState(value);
      setBody(buildLetterBody(value, { fullName, designation, department }));
      setSubjectPickerVisible(false);
    },
    [fullName, designation, department]
  );

  const openSubjectPicker = useCallback(() => setSubjectPickerVisible(true), []);
  const closeSubjectPicker = useCallback(() => setSubjectPickerVisible(false), []);

  const resetForm = useCallback(() => {
    setSubjectState(null);
    setBody('');
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!subject) {
      showThemedMessage(colors, { message: 'Please select a subject', type: 'danger' });
      return;
    }
    if (!body.trim()) {
      showThemedMessage(colors, { message: 'Please enter the letter body', type: 'danger' });
      return;
    }

    setSubmitting(true);
    try {
      const r = await RequestLetterService.sendRequestLetter(employeeId!, subject, body);
      if (!r.success || r.data?.status === false) {
        showThemedMessage(colors, { message: r.data?.message || r.message || 'Failed to submit request', type: 'danger' });
        return;
      }
      showThemedMessage(colors, { message: `${r.data.message}`, type: 'success' });
      resetForm();
    } catch (error) {
      console.log('error sending request letter', error);
      showThemedMessage(colors, { message: 'Failed to submit request', type: 'danger' });
    } finally {
      setSubmitting(false);
    }
  }, [subject, body, employeeId, colors, resetForm]);

  return {
    colors,
    theme,
    subject,
    setSubject,
    body,
    setBody,
    subjectPickerVisible,
    openSubjectPicker,
    closeSubjectPicker,
    submitting,
    handleSubmit,
  };
};
