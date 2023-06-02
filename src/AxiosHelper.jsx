import axios from "axios";
import moment from "moment-timezone";

const initAxiosInterceptor = () => {
  const accessToken = getToken();
  if (accessToken !== "") {
    axios.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  } else {
    axios.interceptors.request.clear(
      (config) => {
        config.headers.Authorization = "";
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
};

const getToken = () => {
  let cookies = document.cookie.split(";"); // Obtener todas las cookies
  let accessToken = "";
  
  // Buscar la cookie "token" y excluir las cookies adicionales
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.startsWith("token=")) {
      accessToken = cookie.replace("token=", "");
      break;
    }
  }
  return accessToken;
};

const FormatDate = (date) => {
  const timedifference = -1440; // diferencia horaria en minutos
  const dateColombia = moment(date).subtract(timedifference, "minutes");
  const formatDate = dateColombia.locale("es").format("DD/MM/YYYY");
  return formatDate;
};

const formatPrice = (price) => {
  let format_number = price.toLocaleString();
  return format_number;
};

export { initAxiosInterceptor, getToken, FormatDate, formatPrice };
