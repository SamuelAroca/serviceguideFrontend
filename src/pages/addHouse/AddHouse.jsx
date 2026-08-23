import HouseForm from "./components/HouseForm";
import httpClient from "../../api/httpClient";

const myID = async () => {
  const apiUrl = import.meta.env.VITE_API_AUTH;

  try {
    const result = await httpClient.get(`${apiUrl}/whoismyid`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export { myID };

const AddHouse = () => {
  return (
    <div>
      <div>
        <HouseForm />
      </div>
    </div>
  );
};

export default AddHouse;
