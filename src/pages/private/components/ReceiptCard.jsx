import { useState } from "react";
import { ReceiptCardContainer } from "../styled-components/receipt-card-container.styled";
import { AnimatePresence } from "framer-motion";

const ReceiptCard = ({ data }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ReceiptCardContainer
      open={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      initial={{ height: "8rem", backgroundColor: "white" }}
      animate={{ height: isOpen ? "13rem" : "8rem", backgroundColor: isOpen ? "lightgrey" : "white"}}
      transition={{ duration: 0.5 }}
    >
      <h2>{data.name}</h2>
      <p>{data.date}</p>
      <p>{data.price}</p>
      <p>{data.tipo}</p>
    </ReceiptCardContainer>
  );
};

export default ReceiptCard;
