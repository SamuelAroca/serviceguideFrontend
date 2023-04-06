import styled from "styled-components";
import { motion } from "framer-motion";

export const ReceiptCardContainer = styled(motion.div)`
  width: 70vw;
  overflow: hidden;
  /* background-color: ${props => props.open === true ? "lightgrey" : "white"}; */
  box-shadow: 0px 5px 10px rgba(0,0,0,0.2);
  padding: 1rem;
  transition: 0.4s all;
  border-radius: 0.5rem;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.3);
  }
`;