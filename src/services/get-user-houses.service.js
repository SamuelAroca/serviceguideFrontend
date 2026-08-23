import httpClient from "../api/httpClient";

export const getUserHousesService = async (id) => {
  const url = import.meta.env.VITE_API_HOUSE;

  try {
    const { data } = await httpClient.get(`${url}/findAllByUserOrderById/${id}`);
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
