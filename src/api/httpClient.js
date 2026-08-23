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

// Si el backend responde 401 teniendo cookie de token, es que el token
// dejó de ser válido (p. ej. se inició sesión en otro navegador, lo que
// revoca los tokens anteriores). Sin esto, el usuario se queda viendo
// una interfaz "logueada" donde ninguna petición carga nada.
let isRedirectingToLogin = false;

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const hadToken = Boolean(Cookies.get("token"));
    if (
      error.response?.status === 401 &&
      hadToken &&
      !isRedirectingToLogin &&
      !window.location.pathname.startsWith("/login")
    ) {
      isRedirectingToLogin = true;
      Cookies.remove("token");
      window.location.href = "/login/signIn?reason=session-expired";
    }
    return Promise.reject(error);
  }
);

export default httpClient;
