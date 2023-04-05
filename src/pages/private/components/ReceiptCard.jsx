import { useState } from "react";
import style from '../styles/ReceiptCard.module.css';

const ReceiptCard = ({data}) => {
  const [open, setOpen] = useState(false);

  return <div onClick={() => setOpen(!open)} className={`${open === false ? style.containerClosed : style.containerOpen}`}>
    <h1>{data.name}</h1>
    <p>{data.date}</p>
    <p>{data.price}</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum sapiente doloribus voluptatum vel consequuntur dolorum debitis voluptatem quos repellendus autem? Corporis sit repellendus molestias minima enim, eaque iste placeat. Error!</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum sapiente doloribus voluptatum vel consequuntur dolorum debitis voluptatem quos repellendus autem? Corporis sit repellendus molestias minima enim, eaque iste placeat. Error!</p>
    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum sapiente doloribus voluptatum vel consequuntur dolorum debitis voluptatem quos repellendus autem? Corporis sit repellendus molestias minima enim, eaque iste placeat. Error!</p>
  </div>;
};

export default ReceiptCard;
