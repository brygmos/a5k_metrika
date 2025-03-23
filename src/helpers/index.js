export function formatDate(date) {
  let inputDate;
  if (!date || isNaN(new Date(date).getTime())) {
    inputDate = new Date();
  } else {
    inputDate = new Date(date);
  }
  const formattedDate = inputDate.toISOString().split("T")[0];
  return formattedDate;
}
