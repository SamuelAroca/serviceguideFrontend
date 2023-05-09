import { useState } from "react";
import { ReceiptCardContainer } from "../../styled-components/card-container.styled";
import UpdateReceipt from "./update/UpdateReceipt";
import Button from "@mui/material/Button";
import Delete from "../DeleteButton";
import moment from "moment-timezone";

const ReceiptCard = ({ name, data, getInformation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUpdateReceipt, setShowUpdateReceipt] = useState(false);

  const FormatDate = (date) => {
    const timedifference = -1440; // diferencia horaria en minutos
    const dateColombia = moment(date).subtract(timedifference, 'minutes');
    const formatDate = dateColombia.locale('es').format('DD-MM-YYYY');
    return formatDate;
  };

  const path = "receipt";

  const handleUpdate = () => {
    getInformation(); // Actualizar datos de ReceiptCard
    setShowUpdateReceipt(false); // Cerrar UpdateReceipt
    setIsOpen(true);
  };

  const handleUpdateClick = (event) => {
    event.stopPropagation(); // Evitar que el evento se propague
    setShowUpdateReceipt(true);
    setIsOpen(true);
  };

  const height = showUpdateReceipt ? "50rem" : isOpen ? "24rem" : "11rem";

  return (
    <>
      <ReceiptCardContainer
        open={isOpen}
        onClick={() => {
          !showUpdateReceipt ? setIsOpen(!isOpen) : setIsOpen(true)
        }}
        initial={{ height: "9rem", backgroundColor: "white" }}
        animate={{
          height: height,
          backgroundColor: isOpen ? "lightgrey" : "white",
        }}
        transition={{ duration: 0 }}
        style={{
          
        }}
      >
        {!showUpdateReceipt ? (
          <>
            <h2>{data.receiptName}</h2>
            <p>{data.typeService.type}</p>
            <p>House: {data.houseName}</p>
            <p>Date: {FormatDate(data.date)}</p>
            <p>Amount: {data.amount}</p>
            <p>Price: {data.price}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "20px",
              }}
            >
              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  onClick={handleUpdateClick}
                  variant="outlined"
                  component="label"
                >
                  Update
                </Button>
                <Delete
                  path={path}
                  id={data.id}
                  getInformation={getInformation}
                />
              </div>
            </div>
          </>
        ) : (
          <UpdateReceipt onClose={handleUpdate} />
        )}
      </ReceiptCardContainer>
    </>
  );
};

export default ReceiptCard;
