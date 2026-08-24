import React from "react";
import ReceiptForm from "./Components/ReceiptForm";
import {
  AddPageWrapper,
  AddPageCard,
  AddPageHeader,
  AddPageBody,
} from "../../styled-components/add-page-card.styled";

const AddReceipt = () => {
  return (
    <AddPageWrapper>
      <AddPageCard>
        <AddPageHeader>
          <h1>Agregar recibo</h1>
          <p>Sube manualmente la información de un recibo o cárgalo en PDF</p>
        </AddPageHeader>
        <AddPageBody>
          <ReceiptForm />
        </AddPageBody>
      </AddPageCard>
    </AddPageWrapper>
  );
};

export default AddReceipt;
