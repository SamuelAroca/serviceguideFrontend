import React from "react";
import ReceiptForm from "./Components/ReceiptForm";
import styles from "./styles/ReceiptForm.module.css";

const AddReceipt = () => {
  return (
    <div className={styles.div_main}>
      <ReceiptForm />
    </div>
  );
};

export default AddReceipt;
