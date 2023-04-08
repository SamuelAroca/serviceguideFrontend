import SideNav from "./SideNav";
import axios from "axios";
import styled from "./styles/Hom.module.css";
import AxiosInterceptor from "../../AxiosInterceptor";

const Home = () => {

  const apiUrl = "http://localhost:8080";

  const prueba = async () => {
    try {
      AxiosInterceptor()
      const result = await axios.get(`${apiUrl}/messages`);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <SideNav />
      <div className={styled.prueba}>
        <h1>ESTE ES EL HOME</h1>
        <button onClick={prueba}>Click</button>
      </div>
    </>
  );
};

export default Home;
