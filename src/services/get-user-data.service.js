import axios from "axios";
import Cookies from "js-cookie";

export const getUserDataService = async () => {
  const url = import.meta.env.VITE_API_AUTH;

  const accessToken = Cookies.get("token");

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
