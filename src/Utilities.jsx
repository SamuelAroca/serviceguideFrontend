import moment from "moment-timezone";

const FormatDate = (date) => {
  const timedifference = -1440; // diferencia horaria en minutos
  const dateColombia = moment(date).subtract(timedifference, "minutes");
  const formatDate = dateColombia.locale("es").format("MM/DD/YYYY");
  return formatDate;
};

const formatPrice = (price) => {
  let format_number = price.toLocaleString();
  return format_number;
};

export { FormatDate, formatPrice };
