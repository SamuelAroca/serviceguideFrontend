import styled from "styled-components";
import { GrayPaleteColors } from "../../../../palete-colors/gray-colors.palete";

export const FormLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;

  h1 {
    margin: 0 0 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: ${GrayPaleteColors.C600};
    text-align: center;
  }

  .buttons-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .type-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    box-sizing: border-box;
    padding: 0.6rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #219ebc;
    background-color: #219ebc;
    color: white;
    white-space: nowrap;
    transition: 0.3s all;
    &:hover {
      cursor: pointer;
      border: 1px solid #023047;
    }
  }

  form {
    width: 100%;
  }
`;
