import axios from "axios";
import Cookies from "js-cookie";

export const getUserHousesService = async () => {
  const url = import.meta.env.VITE_API_HOUSE;

  const accessToken = Cookies.get("token");

  try {
    const { data } = await axios.get(
      `${url}/findAllByUserOrderById/${accessToken}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
