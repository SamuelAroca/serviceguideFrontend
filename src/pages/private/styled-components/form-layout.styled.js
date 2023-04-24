import styled from "styled-components";

export const FormLayout = styled.div`
  display: flex;
  flex-direction: column;

  .buttons-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .type-button {
    display: flex;
    gap: 1rem;
    border: none;
    box-sizing: border-box;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    border: 1px solid #219ebc;
    background-color: #219ebc;
    color: white;
    transition: 0.3s all;
    &:hover {
      cursor: pointer;
      border: 1px solid #023047;
    }
  }

  form {
    display: flex;
    flex-direction: column;
  }
`;
