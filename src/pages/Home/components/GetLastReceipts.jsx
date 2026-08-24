import styles from "../Styles/GetLastReceipt.module.css";
import { ReceiptCardContainer } from "../Styles/card-container.styled";
import { useState } from "react";
import { FormatDate, formatPrice } from "../../../Utilities";

const GetLastReceipts = ({ receipt }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ReceiptCardContainer
      open={isOpen}
      initial={{ height: "14rem", backgroundColor: "white" }}
    >
      <p className={styles.receipt_name}>{receipt.receiptName}</p>
      <p className={styles.receipt_data}>{FormatDate(receipt.date)}</p>
      <p className={styles.receipt_data}>
        Precio: ${formatPrice(receipt.price)}
      </p>
      <p className={styles.receipt_data}>
        Cantidad: {formatPrice(receipt.amount)}
      </p>
    </ReceiptCardContainer>
  );
};

export default GetLastReceipts;
