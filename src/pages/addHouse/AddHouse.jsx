import Cookies from "js-cookie";
import HouseForm from "./components/HouseForm";
import axios from "axios";

const myID = async () => {
  const apiUrl = import.meta.env.VITE_API_AUTH;

  const accessToken = Cookies.get("token");

  try {
    const result = await axios.get(`${apiUrl}/whoismyid/${accessToken}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export { myID };

const AddHouse = () => {
  return (
    <div className={styles.div_main}>
      <div>
        <HouseForm />
      </div>
    </div>
  );
};

export default AddHouse;
