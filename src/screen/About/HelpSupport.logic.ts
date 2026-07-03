import { useCallback, useMemo, useState } from 'react';
import { Linking } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import { getUser, getUserProfileData } from '../../redux/slices/authSlice';
import { getColors } from '../../theme/color/theme';
import { useThemeContext } from '../../theme/ThemeContex';
import { CommonStyle } from '../../utils/Common/CommonStyle';
import { SUPPORT_EMAIL, SUPPORT_PHONE } from './helpSupport.constants';

export const useHelpSupport = () => {
  const { theme } = useThemeContext();
  const colors = useMemo(() => getColors(theme), [theme]);
  const user = useSelector(getUser);
  const profileData = useSelector(getUserProfileData);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');

  const toggleFaq = useCallback((index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  }, []);

  const callHR = useCallback(() => Linking.openURL(`tel:${SUPPORT_PHONE.replace(/\s/g, '')}`), []);
  const emailSupport = useCallback(
    () => Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('ESS App Support')}`),
    []
  );

  const sendIssueReport = useCallback(() => {
    if (!issueTitle.trim() || !issueDescription.trim()) {
      showMessage({
        message: 'Missing information',
        description: 'Please add a title and description before sending.',
        type: 'danger',
        style: CommonStyle.error,
      });
      return;
    }

    const employeeLine = [profileData?.name || user?.employeeName, profileData?.legacyCode].filter(Boolean).join(' • ');
    const body = `Employee: ${employeeLine || 'N/A'}\n\nIssue:\n${issueDescription}`;
    const subject = `ESS App Issue: ${issueTitle}`;

    Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
      .then(() => {
        setIssueTitle('');
        setIssueDescription('');
      })
      .catch(() => {
        showMessage({
          message: 'Unable to open mail app',
          description: `Please email us directly at ${SUPPORT_EMAIL}`,
          type: 'danger',
          style: CommonStyle.error,
        });
      });
  }, [issueTitle, issueDescription, profileData, user]);

  const contactMethods = useMemo(
    () => [
      {
        key: 'call',
        icon: 'call-outline',
        tint: colors.greenTint,
        color: colors.greenColor,
        title: 'Call HR Department',
        subtitle: SUPPORT_PHONE,
        onPress: callHR,
      },
      {
        key: 'email',
        icon: 'mail-outline',
        tint: colors.blueTint,
        color: '#2196F3',
        title: 'Email Support',
        subtitle: SUPPORT_EMAIL,
        onPress: emailSupport,
      },
    ],
    [colors, callHR, emailSupport]
  );

  return {
    colors,
    expandedIndex,
    toggleFaq,
    issueTitle,
    setIssueTitle,
    issueDescription,
    setIssueDescription,
    sendIssueReport,
    contactMethods,
  };
};
