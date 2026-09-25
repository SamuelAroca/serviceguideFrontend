import httpClient from "../api/httpClient";

export const getUserHousesService = async (id) => {
  const url = import.meta.env.VITE_API_HOUSE;

  // No atrapar el error aqui: si se traga la falla y devuelve undefined,
  // el catch de quien llama nunca se dispara (ve una "respuesta exitosa"
  // vacia) y el usuario se queda viendo una pantalla en blanco sin pista
  // de que algo fallo.
  const { data } = await httpClient.get(`${url}/findAllByUserOrderById/${id}`);
  return data;
};

export const getUserHouses = async (setHouses, id) => {
  try {
    const data = await getUserHousesService(id);
    // El backend puede devolver algo que no es un array (una casa suelta
    // sin envolver en lista, un objeto de paginacion, etc.). `houses` en
    // el contexto se usa con .map() en varios lugares (Sidebar entre
    // otros); si llega algo no-array esos .map() explotan. Se normaliza
    // aca, en el unico punto por el que pasan todos los que refrescan
    // `houses`, en vez de defender cada .map() por separado.
    setHouses(Array.isArray(data) ? data : []);
  } catch (err) {
    console.log(err.message);
  }
};
