import {
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FormLayout } from "./styled-components/form-layout.styled";
import { BsWater, BsFillLightbulbFill, BsFillCloudFill } from "react-icons/bs";
import { FaToilet } from "react-icons/fa";
import { Alert } from "@mui/material";
import httpClient from "../../../api/httpClient";
import SelectHouse from "./SelectHouse";
import { MyContext } from "../../../context/UserContext";
import { getUserHouses } from "../../../services/get-user-houses.service";
import { Toaster, toast } from "react-hot-toast";
import Swal from "../../../lib/swal";
import { getErrorMessage } from "../../../Utilities";
import { useFormState } from "../../../hooks/useFormState";
import PdfPicker from "../../../components/PdfPicker";
import { uploadReceiptPdfs, showUploadSummary } from "../../../lib/uploadReceiptPdfs";

const ReceiptForm = ({ userId }) => {
  const apiUrl = import.meta.env.VITE_API_RECEIPT;
  const apiHouse = import.meta.env.VITE_API_HOUSE;

  const [receiptType, setReceiptType] = useState("WATER");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [allHouses, setAllHouses] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();

  const { setHouses, userData } = useContext(MyContext);
  const notify = () => toast.success("Recibo agregado correctamente");

  useEffect(() => {
    getHouses();
  }, [userId]);

  const [receipt, setReceipt, handleInputChange] = useFormState({
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

  const getHouses = async () => {
    try {
      const data = await httpClient.get(`${apiHouse}/getHouseName/${userData?.id}`);
      setAllHouses(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onValidate = (receipt) => {
    let errors = {};
    const regexTitle = /^[\p{L}0-9\s-]+$/u; // Letras (incluye tildes/ñ), números, espacios y guiones
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
    setIsLoading(true);
    if (selectedFiles.length > 0) {
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
          const response = await httpClient.post(
            `${apiUrl}/add/${userData.id}`,
            updatedReceipt
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
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: getErrorMessage(error),
          });
        }
        // Antes esto solo se llamaba dentro del catch: si el guardado
        // salia bien, isLoading se quedaba en true para siempre y el
        // boton seguia mostrando el spinner.
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setErrors(err);
      }
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      Swal.fire({
        title: "Select a file first!",
        text: "In PDF format",
        icon: "warning",
      });
      setIsLoading(false);
      return;
    }

    const results = await uploadReceiptPdfs(apiUrl, selectedFiles);

    setIsLoading(false);
    setSelectedFiles([]);
    if (results.some((r) => r.ok)) {
      getUserHouses(setHouses, userData?.id);
    }

    showUploadSummary(results);
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs style={{ display: "flex", gap: "10px" }}>
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
            <Grid item xs={6}>
              <SelectHouse options={allHouses} handleSelect={handleSelect} />
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            container
            spacing={2}
            style={{ marginTop: "0.5rem" }}
          >
            <Grid item xs={12} sm={6}>
              <PdfPicker files={selectedFiles} setFiles={setSelectedFiles} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                onClick={handleSubmit}
                type="submit"
                variant="contained"
                color="primary"
                style={{ width: "100%", height: "56px" }}
              >
                {isLoading ? (
                  <CircularProgress size={30} style={{ color: "white" }} />
                ) : (
                  "Guardar Recibo"
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormLayout>
  );
};

export default ReceiptForm;
