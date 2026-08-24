import { TextField, Button, Grid } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import { FormLayout } from "../../addReceipt/Components/styled-components/form-layout.styled";
import { BsWater, BsFillLightbulbFill, BsFillCloudFill } from "react-icons/bs";
import { FaToilet } from "react-icons/fa";
import { Alert } from "@mui/material";
import httpClient from "../../../api/httpClient";
import { getUserHouses } from "../../../services/get-user-houses.service";
import { MyContext } from "../../../context/UserContext";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import Select from "react-select";

const FormEdit = ({ userId, data, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_RECEIPT;
  const apiHouse = import.meta.env.VITE_API_HOUSE;

  const { setHouses, userData } = useContext(MyContext);

  const [receiptType, setReceiptType] = useState(data?.typeService || "WATER");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [allHouses, setAllHouses] = useState([]);

  const notifyUpdate = () => toast.success("Update successfully.");

  useEffect(() => {
    getHouses();
  }, [userId]);

  useEffect(() => {
    if (data?.houseName) {
      setSelectedHouse({ label: data?.houseName, value: data?.houseName });
    }
  }, [data]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const date = formatDate(data?.date);

  const [receipt, setReceipt] = useState({
    receiptName: data?.receiptName,
    price: data?.price,
    amount: data?.amount,
    date: date,
    typeService: data?.typeService,
    house: {
      name: data?.houseName,
    },
  });

  const handleHouseChange = (name) => {
    setSelectedHouse(name);
    setReceipt({ ...receipt, house: { name: name.value } });
  };

  const getHouses = async () => {
    const data = await httpClient.get(`${apiHouse}/getHouseName/${userData.id}`);
    try {
      setAllHouses(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onValidate = (receipt) => {
    let errors = {};
    const regexTitle = /^[a-zA-Z0-9\s-]+$/; // Expresión regular para validar nombres
    const regexPrice = /^[0-9]+(\.[0-9]{1,2})?$/; // Expresión regular para validar precios

    if (!receipt.receiptName.trim()) {
      errors.receiptName = "Debe existir un nombre del recibo.";
    } else if (!regexTitle.test(receipt.receiptName)) {
      errors.receiptName = "El 'Título' solo debe contener letras y espacios.";
    }

    if (!receipt.price /* || !receipt.price.trim() */) {
      errors.price = "Debe existir un precio del recibo.";
    } else if (!regexPrice.test(receipt.price)) {
      errors.price = "El 'Precio' solo debe contener números.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = onValidate(receipt);
    setErrors(err);

    setIsLoading(true);

    const updatedReceipt = {
      ...receipt,
      typeService: receiptType,
    };

    if (Object.keys(err).length === 0) {
      try {
        const response = await httpClient.put(
          `${apiUrl}/update/${data.id}`,
          updatedReceipt
        );
        notifyUpdate();
        getUserHouses(setHouses, userData?.id);
        onClose();
      } catch (error) {
        let response = error;
        console.log(error);
        let message = response.response.data.message;
        onClose();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: message,
        });
      }

      // Se setea el recibo a vacio para que se limpie el formulario
      setReceipt({
        receiptName: "",
        price: "",
        amount: "",
        date: "",
        typeService: receiptType,
        house: {
          name: "",
        },
      });

      setIsLoading(false);
    } else {
      setErrors(err);
      setIsLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReceipt((prevReceipt) => ({
      ...prevReceipt,
      [name]: value,
    }));
  };

  const houseOptions = allHouses.map((house) => ({
    label: house,
    value: house,
  }));

  return (
    <FormLayout>
      <h1>{receiptType.toUpperCase()}</h1>
      <div className="buttons-container">
        <button onClick={() => setReceiptType("WATER")} className="type-button">
          <BsWater />
          Agua
        </button>
        <button
          onClick={() => setReceiptType("ENERGY")}
          className="type-button"
        >
          <BsFillLightbulbFill />
          Energía
        </button>
        <button onClick={() => setReceiptType("GAS")} className="type-button">
          <BsFillCloudFill />
          Gas
        </button>
        <button
          onClick={() => setReceiptType("SEWERAGE")}
          className="type-button"
        >
          <FaToilet />
          Alcantarillado
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="receiptName"
                type="text"
                value={receipt.receiptName}
                onChange={handleInputChange}
              />
            {errors.receiptName && (
              <Alert severity="warning"> {errors.receiptName} </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Precio"
              name="price"
              type="number"
              step="0.01"
              value={receipt.price}
              onChange={handleInputChange}
            />
            {errors.price && <Alert severity="warning"> {errors.price} </Alert>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Cantidad"
              name="amount"
              type="number"
              step="0.01"
              value={receipt.amount}
              onChange={handleInputChange}
            />
            {errors.amount && (
              <Alert severity="warning"> {errors.amount} </Alert>
            )}
          </Grid>
          <Grid
            item
            xs
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Fecha"
                InputLabelProps={{ shrink: true }}
                name="date"
                type="date"
                value={receipt.date}
                onChange={handleInputChange}
              />
              {errors.date && <Alert severity="warning"> {errors.date} </Alert>}
            </Grid>
            <Grid item xs={5.7}>
              <Select
                value={selectedHouse}
                onChange={handleHouseChange}
                options={houseOptions}
                placeholder="Seleccione la casa"
                menuPortalTarget={document.body}
                styles={{
                  container: (provided) => ({
                    ...provided,
                    height: '100%',
                  }),
                  control: (provided) => ({
                    ...provided,
                    height: "100%",
                  }),
                  menuPortal: (provided) => ({ ...provided, zIndex: 1400 }),
                }}
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
              Actualizar Recibo
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormLayout>
  );
};

export default FormEdit;
