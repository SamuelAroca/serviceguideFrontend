import { useEffect, useState } from "react";
import SideNav from "../SideNav";
import HouseForm from "./receipts-forms/HouseForm";
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
    alert(error);
  }
};

export {myID};

const AddHouse = () =>{

  return(
    <div
      style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginLeft: "5rem",
      marginTop: "5rem",
    }}
    >
      <h1>ADD HOUSE</h1>
      <SideNav />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "5rem",
        }}
      >
        <HouseForm myID={myID} />
      </div>
    </div>
  )
};

export default AddHouse;