/**
 * Converts a date string "YYYY-MM-DD" to "Mon DD" format
 * Example: "2025-09-18" => "Sept 18"
 * @param {string} dateStr - date in "YYYY-MM-DD" format
 * @returns {string} formatted date like "Sept 18"
 */
export function formatDateToMonthDay(dateStr: string): string {
  // console.log('datstr:', dateStr)
  const [yearStr, monthStr, dayStr] = dateStr.split('-')

  const monthIndex = Number(monthStr) - 1
  const day = Number(dayStr)

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]

  return `${months[monthIndex]} ${day}`
}

/**
 * Returns range of formatted dates in between 
 * startDate and endDate inclusive
 * @param {string} startDate -  in "YYYY-MM-DD" format
 * @param {string} endDate -  in "YYYY-MM-DD" format
 * @returns {string[]} formatted date like "Sept 18"
 */

export function generateDateRange(
  startDate: string,
  endDate: string,
): string[] {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const dates: string[] = []

  const current = new Date(start)
  while (current <= end) {
    const formattedDate = current.toISOString().split('T')[0]
    dates.push(formatDateToMonthDay(formattedDate))
    current.setDate(current.getDate() + 1)
  }
  console.log('dates:', dates)
  return dates
}
