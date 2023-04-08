import axios from "axios";

const AxiosInterceptor = () => {
  let accessToken = document.cookie.replace("token=", "");

  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default AxiosInterceptor;