import {
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FormLayout } from "./styled-components/form-layout.styled";
import { BsWater, BsFillLightbulbFill, BsFillCloudFill } from "react-icons/bs";
import { FaToilet } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import { Alert } from "@mui/material";
import axios from "axios";
import SelectHouse from "./SelectHouse";
import { MyContext } from "../../../context/UserContext";
import { getUserHousesService } from "../../../services/get-user-houses.service";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { IoIosWarning } from "react-icons/io";

const ReceiptForm = ({ userId }) => {
  const apiUrl = import.meta.env.VITE_API_RECEIPT;
  const apiHouse = import.meta.env.VITE_API_HOUSE;

  const [receiptType, setReceiptType] = useState("WATER");
  const [errors, setErrors] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [allHouses, setAllHouses] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  let accessToken = Cookies.get("token");

  const { setHouses, userData } = useContext(MyContext);
  const notify = () => toast.success("Recibo agregado correctamente");

  useEffect(() => {
    getHouses();
  }, [userId]);

  const [receipt, setReceipt] = useState({
    receiptName: "",
    price: "",
    amount: "",
    date: "",
    typeService: receiptType,
    house: {
      name: "",
    },
  });

  const handleSelect = (name) => {
    setReceipt({ ...receipt, house: { name: name } });
  };

  const handleHouseChange = (event, value) => {
    setSelectedHouse(value);
    setReceipt({ ...receipt, house: value });
  };

  const getHouses = async () => {
    const data = await axios.get(`${apiHouse}/getHouseName/${userData?.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    try {
      setAllHouses(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserHouses = async () => {
    try {
      const data = await getUserHousesService(userData.id);
      setHouses(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const onValidate = (receipt) => {
    let errors = {};
    const regexTitle = /^[a-zA-Z0-9\s-]+$/; // Expresión regular para validar nombres
    const regexPrice = /^[0-9]+(\.[0-9]{1,2})?$/; // Expresión regular para validar precios
    const regexQuantity = /^[0-9]+(\.[0-9]{1,3})?$/; // Expresión regular para validar cantidades
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
      errors.amount =
        "La 'Cantidad' solo debe contener números y la parte decimal maximo 3 números";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile != null) {
      handleUpload();
    } else {
      const err = onValidate(receipt);
      setErrors(err);

      const updatedReceipt = {
        ...receipt,
        typeService: receiptType,
      };

      if (Object.keys(err).length === 0) {
        try {
          const response = await axios.post(
            `${apiUrl}/add/${userData.id}`,
            updatedReceipt,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          getUserHouses(setHouses, userData?.id);
          Swal.fire("¡Recibo registrado correctamente!", "", "success");
          notify();
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
        } catch (error) {
          let response = error;
          let message = response.response.data.message;
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: message,
          });
        }
      } else {
        setErrors(err);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setReceipt((prevReceipt) => ({
      ...prevReceipt,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        Swal.fire({
          title: "Select a file first!",
          text: "In PDF format",
          icon: "warning",
        });
        return;
      }

      const formData = new FormData();
      formData.append("archivoPdf", selectedFile);

      const response = await axios.post(`${apiUrl}/read`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        Swal.fire({
          title: "Good job!",
          text: response.data.message,
          icon: "success",
        });
        setSelectedFile(null);
        getUserHouses(setHouses, userData?.id);
      }
    } catch (error) {
      let response = error;
      let message = response.response.data.message;
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
      });
    }
  };

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
          Energia
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
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Agregar nombre"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="Nombre"
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
              title="Agregar precio"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="Precio"
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
              title="Agregar cantidad"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="Cantidad"
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
          <Grid item xs style={{ display: "flex", gap: "10px" }}>
            <Grid item xs={6}>
              <Tooltip
                disableFocusListener
                disableTouchListener
                title="Agregar fecha"
                placement="bottom-start"
              >
                <TextField
                  fullWidth
                  name="date"
                  type="date"
                  value={receipt.date}
                  onChange={handleInputChange}
                />
              </Tooltip>
              {errors.date && <Alert severity="warning"> {errors.date} </Alert>}
            </Grid>
            <Grid item xs={6}>
              <SelectHouse
                options={allHouses}
                onChange={handleHouseChange}
                handleSelect={handleSelect}
                receipt={receipt}
              />
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            style={{ display: "flex", gap: "10px", marginTop: "4rem" }}
          >
            <Grid item xs={6}>
              <Tooltip
                title={
                  <Typography
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IoIosWarning style={{ color: "yellow" }} />
                    Solo si vas a subir un recibo en PDF
                  </Typography>
                }
                placement="top-start"
                open={true}
              >
                <TextField
                  name="receiptPdf"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  fullWidth
                />
              </Tooltip>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={handleSubmit}
                type="submit"
                variant="contained"
                color="primary"
                style={{ width: "100%", height: "100%" }}
              >
                Guardar Recibo
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormLayout>
  );
};

export default ReceiptForm;
