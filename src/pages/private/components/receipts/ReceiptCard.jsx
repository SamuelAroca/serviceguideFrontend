import { useState } from "react";
import { ReceiptCardContainer } from "../../styled-components/card-container.styled";
import Delete from "../DeleteButton";
import moment from "moment/moment";

const ReceiptCard = ({ name, data, getInformation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const FormatDate = (date) => {
    let formatDate = moment(`/Date(${date})`).format("DD-MM-YYYY");

    return formatDate;
  };

  const path = "receipt";

  return (
    <>
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
          <Delete path={path} id={data.id} getInformation={getInformation} />
        </div>
      </ReceiptCardContainer>
    </>
  );
};

export default ReceiptCard;
