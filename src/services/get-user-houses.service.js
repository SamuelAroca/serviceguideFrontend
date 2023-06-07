import axios from "axios";
import Cookies from "js-cookie";
import { useContext } from "react";
import { MyContext } from "../context/UserContext";

export const getUserHousesService = async () => {
  const url = import.meta.env.VITE_API_HOUSE;

  const accessToken = Cookies.get("token");

  const { userId } = useContext(MyContext);

  try {
    const { data } = await axios.get(
      `${url}/findAllByUserOrderById/${userId}`,
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

export const getUserHouses = async (setHouses) => {
  try {
    const data = await getUserHousesService();
    setHouses(data);
  } catch (err) {
    console.log(err.message);
  }
};
