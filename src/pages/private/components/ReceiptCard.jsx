import { useState } from "react";
import { ReceiptCardContainer } from "../styled-components/receipt-card-container.styled";
import { AnimatePresence } from "framer-motion";
import moment from "moment/moment";


const ReceiptCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const FormatDate = (date) => {
    let formatDate = moment(`/Date(${date})`).format("DD-MM-YYYY");

    return formatDate;
  };

  return (
    <ReceiptCardContainer
      open={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      initial={{ height: "8rem", backgroundColor: "white" }}
      animate={{
        height: isOpen ? "13rem" : "8rem",
        backgroundColor: isOpen ? "lightgrey" : "white",
      }}
      transition={{ duration: 0 }}
    >
      <h2>{data.receiptName}</h2>
      <p>{FormatDate(data.date)}</p>
      <p>{data.amount}</p>
      <p>{data.price}</p>
    </ReceiptCardContainer>
  );
};

export default ReceiptCard;
