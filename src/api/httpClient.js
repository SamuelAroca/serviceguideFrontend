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

// Si una petición que SÍ llevaba token recibe 401, es que ese token dejó
// de ser válido (p. ej. se inició sesión en otro navegador, lo que revoca
// los tokens anteriores). Sin esto, el usuario se queda viendo una
// interfaz "logueada" donde ninguna petición carga nada.
//
// Importante: nos fijamos en si ESTA petición concreta llevaba el header
// Authorization al enviarse (error.config), no en si hay cookie AHORA.
// La app dispara llamadas sin token en el montaje inicial (usuario
// anónimo); si esas respuestas 401 llegan tarde, justo después de un
// login exitoso, mirar la cookie actual las confundiría con una sesión
// caída y borraría el token recién creado.
let isRedirectingToLogin = false;

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const requestWasAuthenticated = Boolean(error.config?.headers?.Authorization);
    if (
      error.response?.status === 401 &&
      requestWasAuthenticated &&
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
