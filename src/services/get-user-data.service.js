import axios from "axios";
import Cookies from "js-cookie";
import { getToken, initAxiosInterceptor } from "../AxiosHelper";

initAxiosInterceptor();

export const getUserDataService = async () => {
  const url = import.meta.env.VITE_API_AUTH;

  const accessToken = getToken();

  try {
    const { data: user } = await axios.get(`${url}/myName/${accessToken}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUserInformation = async () => {
  const url = import.meta.env.VITE_API_USER;
  const accessToken = getToken();

  try {
    const { data: user } = await axios.get(`${url}/findById/${accessToken}`)
    return user;
  } catch (error) {
    console.log(error)
  }
}
