import SideNav from "./SideNav";
import axios from "axios";
import styled from "./styles/Hom.module.css";
import { TokenIsPresent, AxiosInterceptor } from "../../AxiosInterceptor";
import moment from "moment/moment";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

AxiosInterceptor();

const Home = () => {
  const apiUrl = "http://localhost:8080";
  const navigate = useNavigate();
  const [loadUser, setLoadUser] = useState(true);

  /* Aqui se llamaria a el endpoint whoiam */
  useEffect(() => {
    const loadUser = async () => {
      if (!TokenIsPresent()) {
        setLoadUser(false);
        return;
      }
    };
  }, []);

  const prueba = async () => {
    try {
      const result = await axios.get(
        `${apiUrl}/api/receipt/water/findAllByUser/2`
      );
      console.log(result.data);

      /*  Ejemplos de uso del for con los elementos de la respuesta */

      let response = result.data;

      let count = 0;

      response.forEach((element) => {
        let id = element.id;
        let amount = element.amount;
        let date = element.date;
        let price = element.price;
        let receiptName = element.receiptName;

        count += price;

        console.log(id);
        console.log(amount);
        console.log(price);
        console.log(receiptName);

        console.log(FormatDate(date));
      });

      console.log(count);
    } catch (error) {
      Swal.fire({
        title: "Your session has expired!",
        text: "You will have to log in again!",
        icon: "error",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok, login again",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    }
  };

  const handleLogOut = () => {
    Swal.fire({
      title: "Do you want to log out?",
      text: "You will have to log in again!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then((result) => {
      if (result.isConfirmed) {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        navigate("/");
      }
    });
  };

  const FormatDate = (date) => {
    let formatDate = moment(`/Date(${date})`).format("DD-MM-YYYY");

    return formatDate;
  };

  return (
    <>
      <SideNav />
      <div className={styled.prueba}>
        <h1>ESTE ES EL HOME</h1>
        <button onClick={prueba}>Click</button>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </>
  );
};

export default Home;
