import { useState } from "react";
import { ReceiptCardContainer } from "../../styled-components/card-container.styled";
import Delete from "../DeleteButton";
import moment from "moment/moment";

const ReceiptCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const FormatDate = (date) => {
    let formatDate = moment(`/Date(${date})`).format("DD-MM-YYYY");

    return formatDate;
  };

  const handleDelete = () => {
    console.log("RECIBO BORRADO");
  };

  return (
    <ReceiptCardContainer
      open={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      initial={{ height: "8rem", backgroundColor: "white" }}
      animate={{
        height: isOpen ? "20rem" : "8rem",
        backgroundColor: isOpen ? "lightgrey" : "white",
      }}
      transition={{ duration: 0 }}
    >
      <h2>{data.receiptName}</h2>
      <p>Date: {FormatDate(data.date)}</p>
      <p>Amount: {data.amount}</p>
      <p>Price: {data.price}</p>
      {/* <p>Type Service: {data.typeService.type}</p> */}
      <p>House: {data.houseName}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "20px",
        }}
      >
        <Delete id={data.id} onDelete={handleDelete} />
      </div>
    </ReceiptCardContainer>
  );
};

export default ReceiptCard;
