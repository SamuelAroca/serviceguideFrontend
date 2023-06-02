import axios from "axios";
import { getToken, initAxiosInterceptor } from "../AxiosHelper";

export const getUserDataService = async () => {
  const url = import.meta.env.VITE_API_AUTH;

  try {
    let accessToken = getToken();
    const { data: user } = await axios.get(`${url}/myName/${accessToken}`);
    return user;
  } catch (error) {
    console.log(error);
  }
};
