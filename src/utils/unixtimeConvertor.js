export default function unixTime(unix) {
  const dateObject = new Date(unix);
  let month = dateObject.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();

  const date = `${year}-${month}-${day}`;
  return date;
}
