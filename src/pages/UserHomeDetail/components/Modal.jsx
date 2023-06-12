import React from "react";
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";
import { GrayPaleteColors } from "../../../palete-colors/gray-colors.palete";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  padding: 1rem;
  border-radius: 0.5rem;
  max-height: calc(100vh - 40px);
  height: calc(100vh - 40px);
  max-width: auto;
  overflow: auto;
  box-sizing: border-box;
  position: relative;
  background-color: ${GrayPaleteColors.C50};
  .close_icon {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.7rem;
    cursor: pointer;
    transition: 0.2s all;
    color: ${GrayPaleteColors.C500};
    &:hover {
      color: ${GrayPaleteColors.C300};
    }
  }
`;

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        {children}
        <MdOutlineClose className="close_icon" onClick={onClose} />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
