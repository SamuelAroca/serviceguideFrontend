import styled from "styled-components";
import { BluePaleteColors } from "../../../palete-colors/blue-colors.palete";
import { GrayPaleteColors } from "../../../palete-colors/gray-colors.palete";

export const SignInLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  height: 72vh;
  width: 80vw;
  background-color: #fff;
  box-sizing: border-box;

  .form_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: left;
    form {
      min-width: 400px;
      max-width: 400px;
      display: flex;
      gap: 1rem;
      flex-direction: column;
    }
  }

  button {
    width: 100%;
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
    background-color: ${BluePaleteColors.C500};
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s all;
    margin-bottom: 2rem;

    &:hover {
      background-color: ${BluePaleteColors.C600};
    }

    &:active {
      background-color: ${BluePaleteColors.C700};
    }
  }

  .subtitle {
    font-size: 1rem;
    color: ${GrayPaleteColors.C400};
  }

  .forgot_password {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }

  .signup {
    color: ${GrayPaleteColors.C400};
    gap: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      color: ${BluePaleteColors.C500};
    }
  }

  .back {
    color: ${GrayPaleteColors.C400};
    gap: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${GrayPaleteColors.C100};
  }

  a {
    color: ${BluePaleteColors.C500};
    text-decoration: none;
    font-weight: bold;
  }

  .inputsMaterial {
    width: 100%;
    background-color: ${GrayPaleteColors.C50};
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }
`;
