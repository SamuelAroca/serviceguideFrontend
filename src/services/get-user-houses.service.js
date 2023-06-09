import axios from "axios";
import Cookies from "js-cookie";

export const getUserHousesService = async (id) => {
  console.log(id, "ID GET USER HOUSES");
  const url = import.meta.env.VITE_API_HOUSE;

  const accessToken = Cookies.get("token");

  try {
    const { data } = await axios.get(`${url}/findAllByUserOrderById/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserHouses = async (setHouses, id) => {
  try {
    const data = await getUserHousesService(id);
    setHouses(data);
  } catch (err) {
    console.log(err.message);
  }
};
