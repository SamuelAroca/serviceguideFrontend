import HouseForm from "./components/HouseForm";
import styles from "./styles/AddHouse.module.css";
import axios from "axios";

const myID = async () => {
  const apiUrl = import.meta.env.VITE_API_AUTH;

  let accessToken = document.cookie.replace("token=", "");
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
