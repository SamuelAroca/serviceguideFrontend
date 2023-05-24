import styled from "../../styles/ReceiptsForm.module.css";
import { TextField, Button, Grid, Box } from "@mui/material";
import { getToken, initAxiosInterceptor } from "../../../../AxiosHelper";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FormLayout } from "../../styled-components/form-layout.styled";
import { BsWater, BsFillLightbulbFill, BsFillCloudFill } from "react-icons/bs";
import { FaToilet } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import { Alert } from "@mui/material";
import axios from "axios";
import SelectHouse from "../receipts/SelectHouse";

const ReceiptsForm = ({ userId }) => {
  const apiUrl = import.meta.env.VITE_API_RECEIPT;
  const apiHouse = import.meta.env.VITE_API_HOUSE;

  const [receiptType, setReceiptType] = useState("water");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [allHouses, setAllHouses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    initAxiosInterceptor();
    tokenExist();
    getHouses();
  }, [userId]);

  const [receipt, setReceipt] = useState({
    receiptName: "",
    price: "",
    house: selectedHouse,
    amount: "",
    date: "",
    typeService: {
      type: receiptType,
    },
    house: {
      name: "",
    }
  });

  const handleSelect = (name) =>{
    setReceipt({...receipt, house: {name: name} })
  }

  const tokenExist = () => {
    if (!getToken()) {
      3;
      navigate("/");
    }
  };

  const sessionExpired = () => {
    Swal.fire({
      title: "Your session has expired!",
      text: "You will have to log in again!",
      icon: "error",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok, login again",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
        return;
      }
    });
  };

  const handleHouseChange = (event, value) => {
    setSelectedHouse(value);
    setReceipt({ ...receipt, house: value})
  };

  const getHouses = async () => {
    if (getToken()) {
      let accesToken = getToken();
      const data = await axios.get(
        `${apiHouse}/getHouseName/${accesToken}`
      );
      try {
        setAllHouses(data.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      sessionExpired();
    }
  };

  const onValidate = (receipt) => {
    let errors = {};
    const regexTitle = /^[a-zA-Z0-9\s-]+$/; // Expresión regular para validar nombres
    const regexPrice = /^[0-9]+(\.[0-9]{1,2})?$/; // Expresión regular para validar precios
    const regexQuantity = /^[0-9]+$/; // Expresión regular para validar cantidades
    const regexDate = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-(19|20)\d{2}$/; // Expresión regular para validar fechas en formato MM-DD-YYYY

    if (!receipt.receiptName.trim()) {
      errors.receiptName = "Debe existir un nombre del recibo.";
    } else if (!regexTitle.test(receipt.receiptName)) {
      errors.receiptName = "El 'Título' solo debe contener letras y espacios.";
    }

    if (!receipt.price.trim()) {
      errors.price = "Debe existir un precio del recibo.";
    } else if (!regexPrice.test(receipt.price)) {
      errors.price = "El 'Precio' solo debe contener números.";
    }

    if (!receipt.amount.trim()) {
      errors.amount = "Debe existir una cantidad del recibo.";
    } else if (!regexQuantity.test(receipt.amount)) {
      errors.amount = "La 'Cantidad' solo debe contener números.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (getToken()) {
      
      const err = onValidate(receipt);
      setErrors(err);
  
      setIsLoading(true);
  
      const updatedReceipt ={
        ...receipt,
        typeService: {
          type: receiptType,
        },
      };
  
      if (Object.keys(err).length === 0) {
        let accesToken = getToken();
        try {
          const response = await axios.post(
            `${apiUrl}/add/${accesToken}`,
            updatedReceipt
          );
        } catch (error) {
          console.log(error);
        }
    
        // Se setea el recibo a vacio para que se limpie el formulario
        setReceipt({
          receiptName: "",
          price: "",
          amount: "",
          date: "",
          typeService: {
            type: receiptType,
          },
          house: {
            name: "",
          }
        });
  
        setIsLoading(false);
      } else {
        setErrors(err);
      }
    } else {
      sessionExpired();
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReceipt((prevReceipt) => ({
      ...prevReceipt,
      [name]: value,
    }));
  };

  return (
    <FormLayout className={styled.receipt_layout}>
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
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Add title"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="Title"
                name="receiptName"
                type="text"
                value={receipt.receiptName}
                onChange={handleInputChange}
              />
            </Tooltip>
            {errors.receiptName && (
              <Alert severity="warning"> {errors.receiptName} </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Add Price"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                step="0.01"
                value={receipt.price}
                onChange={handleInputChange}
              />
            </Tooltip>
            {errors.price && <Alert severity="warning"> {errors.price} </Alert>}
          </Grid>
          <Grid item xs={12}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Add Quantity"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="Quantity"
                name="amount"
                type="number"
                step="0.01"
                value={receipt.amount}
                onChange={handleInputChange}
              />
            </Tooltip>
            {errors.amount && (
              <Alert severity="warning"> {errors.amount} </Alert>
            )}
          </Grid>
          <Grid item xs style={{display: "flex", gap: "10px"}}>
            <Grid item xs={6}>
              <Tooltip
                disableFocusListener
                disableTouchListener
                title="Add Date"
                placement="bottom-start"
              >
                <TextField
                  fullWidth
                  label=""
                  name="date"
                  type="date"
                  value={receipt.date}
                  onChange={handleInputChange}
                />
              </Tooltip>
              {errors.date && <Alert severity="warning"> {errors.date} </Alert>}
            </Grid>
            <Grid item xs={4}>
              <SelectHouse
                options={allHouses}
                onChange={handleHouseChange}
                handleSelect={handleSelect}
                receipt={receipt}
              />
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex", justifyContent: "end" }} item xs={12}>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormLayout>
  );
};

export default ReceiptsForm;
