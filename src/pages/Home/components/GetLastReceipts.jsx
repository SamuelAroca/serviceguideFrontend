import moment from "moment-timezone";
import styles from "../Styles/GetLastReceipt.module.css"
import { ReceiptCardContainer } from "../Styles/card-container.styled";
import { useState } from "react";

const GetLastReceipts = ({ receipt }) => {
  const [isOpen, setIsOpen] = useState(false);

  const FormatDate = (date) => {
    const timedifference = -1440; // diferencia horaria en minutos
    const dateColombia = moment(date).subtract(timedifference, "minutes");
    const formatDate = dateColombia.locale("es").format("DD-MM-YYYY");
    return formatDate;
  };

  const formatPrice = (price) => {
    let format_number = price.toLocaleString();
    return format_number;
  };

  return (
    <ReceiptCardContainer
      open={isOpen}
      initial={{ height: "12rem", backgroundColor: "white" }}
    >
      <p className={styles.receipt_name}>{receipt.receiptName}</p>
      <p className={styles.receipt_data}>Precio: {formatPrice(receipt.price)}</p>
      <p className={styles.receipt_data}>Cantidad: {formatPrice(receipt.amount)}</p>
    </ReceiptCardContainer>
  );
};

export default GetLastReceipts;
