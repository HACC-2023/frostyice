export function convertDateToLocalFormat(date) {
  /**
   * Converts date from UTC to HST.
   *
   * @param   {Date || String} date   Date to convert.
   * @returns {String}                Local date in format "YYYY-MM-DD".
   */
  if (typeof date === 'string') yourDate = new Date(date);
  const adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  return adjustedDate.toISOString().split("T")[0];
}
export function convertLocalDateToUTC(date) {
  /**
   * Converts date from HST to UTC.
   *
   * @param   {Date || String} date   Date to convert.
   * @returns {Date}                  UTC date.
   */
  if (typeof date === 'string') date = new Date(date);
  return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
}

export function prettyHstDate(date) {
  /**
   * Converts a Date object or String into a readable date String.
   *
   * @param   {Date || String} date   Date to convert.
   * @returns {String}                Date in format "MON DD, YYYY HH:MM AM/PM".
   */
  if (typeof date === 'string') date = new Date(date);
  const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }
  return date.toLocaleString("en-US", options);
}