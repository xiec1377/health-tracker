// utils/dateUtils.js

/**
 * Converts a date string "YYYY-MM-DD" to "Mon DD" format
 * Example: "2025-09-18" => "Sept 18"
 * @param {string} dateStr - date in "YYYY-MM-DD" format
 * @returns {string} formatted date like "Sept 18"
 */
export function formatDateToMonthDay(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return ''; // invalid date check

  // Array of month abbreviations
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}`;
}
