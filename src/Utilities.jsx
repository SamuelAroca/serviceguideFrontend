import moment from "moment";

// No usa ninguna funcion especifica de zona horaria (nunca llama .tz()), asi
// que traerlo con moment-timezone solo agregaba ~250KB+ de datos de husos
// horarios al bundle sin ningun beneficio real.
const FormatDate = (date) => {
  return moment(date).locale("es").format("MM/DD/YYYY");
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

// La regex anterior (\.\w{2,3} al final) rechazaba TLDs validos de mas de 3
// caracteres (.travel, .museum, .online) y el "+" del local-part
// (user+tag@gmail.com). Esta no intenta validar RFC 5322 completo, solo
// "algo@algo.algo" sin espacios, que es lo que de verdad hace falta aqui.
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export { FormatDate, formatPrice, getErrorMessage, isValidEmail };
