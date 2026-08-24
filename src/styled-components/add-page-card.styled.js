import styled from "styled-components";
import { BluePaleteColors } from "../palete-colors/blue-colors.palete";
import { GrayPaleteColors } from "../palete-colors/gray-colors.palete";

// Tarjeta compartida para las páginas "Agregar casa" / "Agregar recibo".
// Vive solo aquí (no en HouseFormLayout/FormLayout) porque esos dos layouts
// también los reutilizan los modales de editar, que ya traen su propio
// fondo/padding/sombra vía Modal.jsx - duplicarlos ahí se vería recargado.
export const AddPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2.5rem 1.5rem;
  box-sizing: border-box;
`;

export const AddPageCard = styled.div`
  width: 100%;
  max-width: 760px;
  height: fit-content;
  background-color: #fff;
  border-radius: 1.25rem;
  box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

export const AddPageHeader = styled.div`
  background: linear-gradient(
    to right,
    ${BluePaleteColors.C700} 0%,
    ${BluePaleteColors.C500} 100%
  );
  color: #fff;
  padding: 1.75rem 2.5rem;

  h1 {
    margin: 0;
    font-size: 1.4rem;
    font-weight: 600;
  }

  p {
    margin: 0.35rem 0 0;
    font-size: 0.9rem;
    color: ${BluePaleteColors.C100};
  }

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

export const AddPageBody = styled.div`
  padding: 2rem 2.5rem 2.5rem;

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;
