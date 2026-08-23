import axios from "axios";
import Cookies from "js-cookie";

// Cliente axios compartido: adjunta automáticamente el header
// Authorization en cada petición si hay un token guardado, para no
// repetir `Cookies.get("token")` + headers en cada componente/servicio.
const httpClient = axios.create();

httpClient.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default httpClient;
