// "HH:MM" (24h) -> "hh:mm AM/PM", used by the Attendance and Home dashboard screens.
export const formatTime = (time?: string | null) => {
  if (!time) return '--:--';
  const [h, m] = time.split(':');
  const hourNum = parseInt(h, 10);
  if (isNaN(hourNum)) return '--:--';
  const period = hourNum >= 12 ? 'PM' : 'AM';
  const hour12 = hourNum % 12 === 0 ? 12 : hourNum % 12;
  return `${String(hour12).padStart(2, '0')}:${m} ${period}`;
};
