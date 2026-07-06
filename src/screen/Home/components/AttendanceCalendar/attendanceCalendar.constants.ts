// Shared config and date helpers for the team leave calendar (Home dashboard card + Leave
// Calendar history screen). Grid is Sunday-first to match the reference design, unlike the
// Monday-first grid used by the Leave Request module's own calendar sheet.

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

const pad2 = (n: number) => String(n).padStart(2, '0');

export const dateKey = (date: Date) => `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;

export const buildMonthGrid = (year: number, month: number) => {
  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
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

export interface LeaveCalendarRecord {
  empID: number;
  legacyCode: string;
  leaveType: string;
  employeeName: string;
  department: string;
  designation: string;
  departmentID: number;
  fromDate: string;
  toDate: string;
  noOfDays: number;
  status: string;
}

// Expands each record's [fromDate, toDate] range into a per-day lookup so the grid can mark
// every date an employee is on leave, not just the date the record starts on.
export const buildMarkedDates = (records: LeaveCalendarRecord[]) => {
  const map = new Map<string, LeaveCalendarRecord[]>();
  records.forEach((record) => {
    const from = new Date(record.fromDate);
    const to = new Date(record.toDate);
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return;

    const cursor = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const end = new Date(to.getFullYear(), to.getMonth(), to.getDate());
    while (cursor.getTime() <= end.getTime()) {
      const key = dateKey(cursor);
      map.set(key, [...(map.get(key) || []), record]);
      cursor.setDate(cursor.getDate() + 1);
    }
  });
  return map;
};

export const normalizeDepartment = (raw: any) => ({
  id: raw?.departmentId ?? raw?.DepartmentID ?? raw?.departmentID ?? raw?.id,
  name: raw?.departmentName ?? raw?.DepartmentName ?? raw?.department ?? raw?.name ?? 'Unknown Department',
});
