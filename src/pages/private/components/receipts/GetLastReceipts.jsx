import { ReceiptCardContainer } from "../../styled-components/card-container.styled";
import { useState } from "react";


const GetLastReceipts = ({ receipt }) => {
  const [isOpen, setIsOpen] = useState(false);

  const FormatDate = (date) => {
    let formatDate = moment(`/Date(${date})`).format("DD-MM-YYYY");

    return formatDate;
  };

  return (
    <ReceiptCardContainer
      open={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      initial={{ height: "9rem", backgroundColor: "white" }}
      animate={{
        height: isOpen ? "22rem" : "11rem",
        backgroundColor: isOpen ? "lightgrey" : "white",
      }}
      transition={{ duration: 0 }}
    >
      <p>ID: {receipt.id}</p>
      <p>Nombre del recibo: {receipt.receiptName}</p>
      <p>Precio: {receipt.price}</p>
      <p>Cantidad: {receipt.amount}</p>
      <p>Nombre de la casa: {receipt.houseName}</p>
      <p>Fecha: {new Date(receipt.date).toLocaleDateString()}</p>
      <p>Tipo de servicio: {receipt.typeService.type}</p>

    </ReceiptCardContainer>
  );
}

export default GetLastReceipts;