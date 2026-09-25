import moment from "moment-timezone";

const FormatDate = (date) => {
  const timedifference = 0; // diferencia horaria en minutos -1440
  const dateColombia = moment(date).subtract(timedifference, "minutes");
  const formatDate = dateColombia.locale("es").format("MM/DD/YYYY");
  return formatDate;
};

const formatPrice = (price) => {
  return (price ?? 0).toLocaleString();
};

// Extrae un mensaje de error legible de una respuesta axios. error.response
// no existe en fallos de red/timeout (sin respuesta del servidor), asi que
// leer error.response.data.message directamente revienta el catch entero
// y deja al usuario sin ningun aviso.
const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message ||
    "Ocurrió un error, inténtalo de nuevo más tarde."
  );
};

export { FormatDate, formatPrice, getErrorMessage };
