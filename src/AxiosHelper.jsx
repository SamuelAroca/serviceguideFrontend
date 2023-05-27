import axios from "axios";

const initAxiosInterceptor = () => {
  const accessToken = getToken();
  console.log(accessToken, "Init Token");
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
      console.log(accessToken);
      break;
    }
  }
  return accessToken;
};

export { initAxiosInterceptor, getToken };
