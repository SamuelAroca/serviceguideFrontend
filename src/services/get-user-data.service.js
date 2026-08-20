import axios from "axios";
import Cookies from "js-cookie";

export const getUserDataService = async () => {
  const url = import.meta.env.VITE_API_AUTH;
  const accessToken = Cookies.get("token");

  try {
    const { data: user } = await axios.get(`${url}/myName`, {
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
  const accessToken = Cookies.get("token");

  try {
    const { data: user } = await axios.get(`${url}/findById`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};
