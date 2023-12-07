import moment from "moment-timezone";

const FormatDate = (date) => {
  const timedifference = 0; // diferencia horaria en minutos -1440
  const dateColombia = moment(date).subtract(timedifference, "minutes");
  const formatDate = dateColombia.locale("es").format("MM/DD/YYYY");
  return formatDate;
};

const formatPrice = (price) => {
  let format_number = price.toLocaleString();
  return format_number;
};

export { FormatDate, formatPrice };
