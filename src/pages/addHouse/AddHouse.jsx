import HouseForm from "./components/HouseForm";
import httpClient from "../../api/httpClient";
import {
  AddPageWrapper,
  AddPageCard,
  AddPageHeader,
  AddPageBody,
} from "../../styled-components/add-page-card.styled";

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
    <AddPageWrapper>
      <AddPageCard>
        <AddPageHeader>
          <h1>Agregar casa</h1>
          <p>Registra una nueva propiedad para llevar el control de sus servicios</p>
        </AddPageHeader>
        <AddPageBody>
          <HouseForm />
        </AddPageBody>
      </AddPageCard>
    </AddPageWrapper>
  );
};

export default AddHouse;
