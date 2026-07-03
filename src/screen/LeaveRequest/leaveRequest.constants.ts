// Shared config, formatters and date helpers used across the Leave Request module
// (parent tab switcher, Submitted Leave tab and Pending Approval tab).

export const getStatusMeta = (colors: any): Record<string, { label: string; bg: string; color: string }> => ({
  Approved: { label: 'APPROVED', bg: colors.successBg, color: colors.successText },
  Pending: { label: 'PENDING', bg: colors.warningBg, color: colors.warningText },
  Rejected: { label: 'REJECTED', bg: colors.dangerBg, color: colors.dangerText },
});

export const getLeaveIconMeta = (colors: any, leaveName?: string) => {
  const name = (leaveName || '').toLowerCase();
  if (name.includes('sick') || name.includes('medical')) {
    return { name: 'medkit-outline', bg: colors.greenTint, color: colors.greenColor };
  }
  if (name.includes('casual') || name.includes('annual') || name.includes('vacation')) {
    return { name: 'umbrella-outline', bg: colors.orangeTint, color: colors.orangeColor };
  }
  if (name.includes('emergency') || name.includes('bereavement') || name.includes('death')) {
    return { name: 'flag-outline', bg: colors.redTint, color: colors.redColor };
  }
  return { name: 'document-text-outline', bg: colors.lightPurple, color: colors.purple1 };
};

export const STATUS_TABS = [
  { key: 'ALL', label: 'All' },
  { key: 'Pending', label: 'Pending' },
  { key: 'Approved', label: 'Approved' },
  { key: 'Rejected', label: 'Rejected' },
];

export const WEEKDAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const toDateObj = (value: string | Date) => (value instanceof Date ? value : new Date(value));

export const formatShortDate = (value?: string | Date | null) => {
  if (!value) return 'N/A';
  return toDateObj(value).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
};

export const formatDateTime = (value?: string | Date | null) => {
  if (!value) return 'N/A';
  return toDateObj(value).toLocaleString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true,
  });
};

export const formatDateRange = (from: string | Date, to: string | Date, separator = ' – ') => {
  const fromDate = toDateObj(from);
  const toDateValue = toDateObj(to);
  if (fromDate.toDateString() === toDateValue.toDateString()) {
    return formatShortDate(fromDate);
  }
  return `${formatShortDate(fromDate)}${separator}${formatShortDate(toDateValue)}`;
};

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const daysBetweenInclusive = (from: Date, to: Date) => {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
};

export const buildMonthGrid = (year: number, month: number) => {
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { date: Date; inMonth: boolean }[] = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push({ date: new Date(year, month - 1, daysInPrevMonth - startOffset + 1 + i), inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  let nextDay = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(year, month + 1, nextDay), inMonth: false });
    nextDay++;
  }
  return cells;
};

// Midnight-UTC ISO string for a calendar date, e.g. 2026-07-03 -> "2026-07-03T00:00:00.000Z"
export const toMidnightISOString = (date: Date) =>
  new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();

const pad2 = (n: number) => String(n).padStart(2, '0');

// "YYYY-MM-DD" for today, used by the approve/reject payload
export const toDateOnlyString = (date: Date) => `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
