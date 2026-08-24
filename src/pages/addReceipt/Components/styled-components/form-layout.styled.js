import styled from "styled-components";

export const FormLayout = styled.div`
  display: flex;
  flex-direction: column;

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
