import axios from "axios";
import { getToken, initAxiosInterceptor } from "../AxiosHelper";

initAxiosInterceptor();

export const getUserHousesService = async () => {
  const url = import.meta.env.VITE_API_HOUSE;

  try {
    let accessToken = getToken();
    const { data } = await axios.get(
      `${url}/findAllByUserOrderById/${accessToken}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
