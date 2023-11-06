/* Converts date to local format */
export function convertDateToLocalFormat(yourDate) {
  let offset = yourDate.getTimezoneOffset() * 60 * 1000;
  let adjustedDate = new Date(yourDate.getTime() - offset);
  let formattedDate = adjustedDate.toISOString().split("T")[0];
  return formattedDate;
}
/* Converts local date to UTC */
export function convertLocalDateToUTC(date) {
  let offset = date.getTimezoneOffset() * 60 * 1000;
  let adjustedDate = new Date(date.getTime() + offset);
  return adjustedDate;
}
