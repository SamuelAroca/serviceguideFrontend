import { TextField, Button, Grid, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormReceiptsLayout } from "../styled-components/form-receipts-layout.styled";
import { BsWater, BsFillLightbulbFill, BsFillCloudFill } from "react-icons/bs";
import { FaToilet } from "react-icons/fa";
import axios from "axios";

const ReceiptsForm = ({ userId }) => {
  const apiUrl = "http://localhost:8080";
  console.log(userId, "ID USER DESDE RECEIPTFORM");

  const [receiptType, setReceiptType] = useState("water");

  const [receipt, setReceipt] = useState({
    receiptName: "",
    price: "",
    amount: "",
    date: "",
    user: {
      id: userId,
    },
  });

  /*   const myID = async () => {
    let accessToken = document.cookie.replace("token=", "");
    console.log(accessToken, "ACCESS TOKEN");
    try {
      const result = await axios.get(
        `${apiUrl}/api/users/auth/whoismyid/${accessToken}`
      );
      setUserActive(result.data);
      console.log(result.data, "result función MYID()");
    } catch (error) {
      alert(error);
    }
  }; */

  /*  useEffect(() => {
    myID();
  }, []); */

  // ------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();

       try {
      const response = await axios.post(
        `${apiUrl}/api/receipt/${receiptType}/add`,
        receipt
      );
      console.log(response, "POST RECEIPT");
    } catch (error) {
      console.log(error);
    }

    /* alert(`El consumo de ${receipt.quantity} de ${receiptType}`); */

    console.log(receipt, "OBJETO RECIBO QUE SE ENVIA");
    // Se setea el recibo a vacio para que se limpie el formulario
    setReceipt({
      receiptName: "",
      price: "",
      amount: "",
      date: "",
      user: {
        id: "",
      },
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
              label="Title"
              name="receiptName"
              type="text"
              value={receipt.receiptName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={receipt.price}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Quantity"
              name="amount"
              type="number"
              value={receipt.amount}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={receipt.date}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "end" }} item xs={12}>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormReceiptsLayout>
  );
};

export default ReceiptsForm;
