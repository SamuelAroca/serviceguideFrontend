import { useState } from "react";
import { ReceiptCardContainer } from "../../styled-components/card-container.styled";
import Delete from "../DeleteButton";

const HouseCard = ({ data, onGetInformation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = () => {
    onGetInformation();
    console.log("Elimiando correctamente");
  };

  const path = "house";

  return(
    <ReceiptCardContainer
      open={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      initial={{ height: "8rem", backgroundColor: "white" }}
      animate={{
        height: isOpen ? "22rem" : "8rem",
        backgroundColor: isOpen ? "lightgrey" : "white",
      }}
      transition={{ duration: 0 }}
    >
      <h2>{data.name}</h2>
      <p>Contract: {data.contract}</p>
      <p>City: {data.cities.city}</p>
      <p>Address: {data.address}</p>
      <p>Neighborhood: {data.neighborhood}</p>
      <p>Stratum: {data.stratum}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "20px",
        }}
      >
        <Delete path={path} id={data.id} onDelete={handleDelete} />
      </div>
    </ReceiptCardContainer>
  )
};

export default HouseCard;
