import React from 'react'
import { UpdateCardContainer } from "../../../styled-components/update-container.styled";
import { AnimatePresence } from 'framer-motion';
import { Button } from '@mui/material';
import UpdateForm from './UpdateForm';
import UpdateButton from '../../UpdateButton';

const UpdateReceipt = ({ onClose }) => {

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
      <AnimatePresence>
        <UpdateCardContainer
          key="update-card-container"
          exit={{ y: "50%", opacity: 0, transition: {duration: 1} }}
          initial={{ y: "50%", opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1, border: "1px solid #00bbf0" }}
          transition={{
            duration: 0,
            ease: "easeOut",
          }}
        >
          <UpdateForm />
          <div style={{display: "flex", gap: "10px", justifyContent: "flex-end"}}>
            <UpdateButton />
            <Button variant='outlined' onClick={onClose}>Close</Button>
          </div>
        </UpdateCardContainer>
      </AnimatePresence>
    </div>
  );
}

export default UpdateReceipt;