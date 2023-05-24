import SideNav from "../../SideNav";
import ReceiptsForm from "../forms/ReceiptsForm";
import axios from "axios";
import { getToken } from "../../../../AxiosHelper"

const myID = async () => {
  const apiUrl = import.meta.env.VITE_API_AUTH;

  let accessToken = getToken;
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

const AddReceipt = () =>{

  return(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginLeft: "25rem",
        marginTop: "3rem",
        marginRight: "10rem"
      }}
    
    >
      <SideNav />
      <h1>ADD RECEIPT</h1>
      <div>
        <ReceiptsForm />
      </div>
    </div>
  )
};

export default AddReceipt;