import { TextField, Button, Grid, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FormReceiptsLayout } from "../styled-components/form-receipts-layout.styled";
import { BsWater, BsFillLightbulbFill, BsFillCloudFill } from "react-icons/bs";
import { FaToilet } from "react-icons/fa";
import axios from "axios";

const ReceiptsForm = () => {
  /* const { "*": path } = useParams(); */

  /* const [consumo, setConsumo] = useState(""); */

  const [receiptType, setReceiptType] = useState("water");

  const medida = receiptType === "water" ? "m3" : "kwh";

  const handleSend = (e) => {
    e.preventDefault();
    console.log(formValues);
    console.log("Se envió la información");
    setFormValues([]);
  };

  // ------------------------------

  const [receipt, setReceipt] = useState({
    price: "",
    quantity: "",
    date: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`El consumo de ${receipt.quantity}`);
    setReceipt({
      price: "",
      quantity: "",
      date: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReceipt((prevReceipt) => ({
      ...prevReceipt,
      [name]: value,
    }));
  };

  return (
    <FormReceiptsLayout>
      <h1>{receiptType.toUpperCase()}</h1>
      <div className="buttons-container">
        <button onClick={() => setReceiptType("water")} className="type-button">
          <BsWater />
          Water
        </button>
        <button
          onClick={() => setReceiptType("energy")}
          className="type-button"
        >
          <BsFillLightbulbFill />
          Energy
        </button>
        <button onClick={() => setReceiptType("gas")} className="type-button">
          <BsFillCloudFill />
          Gas
        </button>
        <button
          onClick={() => setReceiptType("Sewerage")}
          className="type-button"
        >
          <FaToilet />
          Sewerage
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Precio"
              name="price"
              type="number"
              value={receipt.price}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cantidad"
              name="quantity"
              type="number"
              value={receipt.quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fecha"
              name="date"
              type="date"
              value={receipt.date}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "end" }} item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormReceiptsLayout>
  );
};

export default ReceiptsForm;
