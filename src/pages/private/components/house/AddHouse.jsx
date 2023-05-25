import SideNav from "../../SideNav";
import HouseForm from "../forms/HouseForm";
import axios from "axios";

const myID = async () => {
  const apiUrl = import.meta.env.VITE_API_AUTH;

  let accessToken = document.cookie.replace("token=", "");
  try {
    const result = await axios.get(
      `${apiUrl}/whoismyid/${accessToken}`
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export { myID };

const AddHouse = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "25rem",
        marginTop: "5rem",
      }}
    >
      <h1>ADD HOUSE</h1>
      <SideNav />
      <div>
        <HouseForm />
      </div>
    </div>
  );
};

export default AddHouse;
