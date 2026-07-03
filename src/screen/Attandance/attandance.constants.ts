export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const formatDayLabel = (dateString: string) => {
  const date = new Date(dateString);
  return `${String(date.getDate()).padStart(2, '0')} ${date.toLocaleString('en', { month: 'short' })}`;
};

export const getRecordStatus = (record: any) => {
  if (record.attendanceStatus === 'Absent') {
    const recordDate = new Date(record.date);
    recordDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (recordDate.getTime() > today.getTime()) return 'Pending';
  }
  return record.attendanceStatus;
};

export const getStatusMeta = (colors: any): Record<string, { label: string; bg: string; color: string; icon: string }> => ({
  Present: { label: 'Present', bg: colors.successBg, color: colors.successText, icon: 'checkmark-circle' },
  Absent: { label: 'Absent', bg: colors.dangerBg, color: colors.dangerText, icon: 'close-circle' },
  Pending: { label: 'Pending', bg: colors.warningBg, color: colors.warningText, icon: 'time' },
  Leave: { label: 'On Leave', bg: colors.lightPurple, color: colors.purple1, icon: 'airplane' },
});
