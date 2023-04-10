import axios from "axios";

const AxiosInterceptor = () => {
  let accessToken = document.cookie.replace("token=", "");

  if (accessToken === '') {

    axios.interceptors.request.clear(
      (config) => {
        config.headers.Authorization = '';
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  } else {
    axios.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
};

const TokenIsPresent = () => {
  let accessToken = document.cookie.replace("token=", "");

  if (accessToken == '') {
    return false;
  } else {

  }
}

export default AxiosInterceptor;