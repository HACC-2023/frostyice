/* Converts date to local format */
export function convertDateToLocalFormat(date) {
  const convertedDate = new Date(date);
  let offset = convertedDate.getTimezoneOffset() * 60 * 1000;
  let adjustedDate = new Date(convertedDate.getTime() - offset);
  let formattedDate = adjustedDate.toISOString().split("T")[0];
  return formattedDate;
}
/* Converts local date to UTC */
export function convertLocalDateToUTC(date) {
  const convertedDate = new Date(date)
  let offset = convertedDate.getTimezoneOffset() * 60 * 1000;
  let adjustedDate = new Date(date.getTime() + offset);
  return new Date(adjustedDate);
}
