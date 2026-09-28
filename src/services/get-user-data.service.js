import httpClient from "../api/httpClient";

export const getUserDataService = async () => {
  const url = import.meta.env.VITE_API_AUTH;

  try {
    const { data: user } = await httpClient.get(`${url}/myName`);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUserInformation = async () => {
  const url = import.meta.env.VITE_API_USER;

  try {
    const { data: user } = await httpClient.get(`${url}/findById`);
    return user;
  } catch (error) {
    console.log(error);
  }
};
