import SideNav from "../../SideNav";
import ReceiptsForm from "../forms/ReceiptsForm";
import axios from "axios";

const myID = async () => {
  const apiUrl = "http://localhost:8080";

  let accessToken = document.cookie.replace("token=", "");
  try {
    const result = await axios.get(
      `${apiUrl}/api/users/auth/whoismyid/${accessToken}`
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
        marginTop: "5rem",
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