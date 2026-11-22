import { useEffect, useState, useContext } from "react";
import { HouseFormLayout } from "../styled-components/houseform-layout.styled.js";
import {
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { myID } from "../AddHouse";
import SelectCity from "../components/SelectCity";
import httpClient from "../../../api/httpClient";
import { MyContext } from "../../../context/UserContext";
import { getUserHouses } from "../../../services/get-user-houses.service";
import Swal from "../../../lib/swal";
import { Toaster, toast } from "react-hot-toast";
import { getErrorMessage } from "../../../Utilities";
import PdfPicker from "../../../components/PdfPicker";
import { uploadReceiptPdfs, showUploadSummary } from "../../../lib/uploadReceiptPdfs";
import { useFormState } from "../../../hooks/useFormState";

const HouseForm = () => {
  const apiUrl = import.meta.env.VITE_API_HOUSE;
  const apiCity = import.meta.env.VITE_API_CITY;

  const [userID, setUserID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState([]);

  const { userData, setHouses } = useContext(MyContext);
  const notify = () => toast.success("House update successfully");

  useEffect(() => {
    fetchUserID();
    getCities();
  }, [myID]);

  const [house, setHouse, handleInputChange] = useFormState({
    name: "",
    stratum: "",
    neighborhood: "",
    address: "",
    contract: "",
    cities: {
      city: "",
    },
    user: {
      id: userID,
    },
  });

  const handleSelect = (city) => {
    setHouse({ ...house, cities: { city: city } });
  };

  const fetchUserID = async () => {
    setIsLoading(true);
    const id = await myID();
    setUserID(id);
    setIsLoading(false);
  };

  const getCities = async () => {
    try {
      const data = await httpClient.get(`${apiCity}/listAll`);
      setAllCities(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onValidate = (house) => {
    let errors = {};
    const regexLettersNumbers = /^[\p{L}0-9\s]+(?:\s+[\p{L}]+\d{0,2})*$/u; // Letras (incluye tildes/ñ), números y espacios
    const regexNumbers = /^[0-9]+$/; // Expresión regular para validar cantidades
    const regexStratum = /^[1-6]$/; // Validar estrato

    if (!house.name.trim()) {
      errors.name = "Debe existir un 'Nombre' de la casa.";
    } else if (!regexLettersNumbers.test(house.name)) {
      errors.name =
        "El 'Nombre' solo debe contener letras, espacios y números.";
    }

    if (!house.stratum.trim()) {
      errors.stratum = "Debe existir un estrato de la casa.";
    } else if (!regexNumbers.test(house.stratum)) {
      errors.stratum = "El 'Estrato' solo debe contener números.";
    } else if (!regexStratum.test(house.stratum)) {
      errors.stratum = "El 'Estrato' es únicamente del 1 al 6.";
    }

    if (!house.neighborhood.trim()) {
      errors.neighborhood = "La casa debe tener un 'Barrio'.";
    } else if (!regexLettersNumbers.test(house.neighborhood)) {
      errors.neighborhood =
        "El nombre del 'Barrio' solo debe contener letras o máximo dos números.";
    }

    if (!house.address.trim()) {
      errors.address = "La casa debe tener una 'Dirección'.";
    }

    if (!house.contract.trim()) {
      errors.contract = "La casa debe tener un 'Contrato'.";
    } else if (!regexNumbers.test(house.contract)) {
      errors.contract = "El 'Contrato' solo debe contener números.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length > 0) {
      handleUpload();
    } else {
      const err = onValidate(house);
      setErrors(err);

      setIsLoading(true); // Empieza la carga

      const updatedHouse = {
        ...house,
        user: {
          id: userID,
        },
      };

      if (Object.keys(err).length === 0) {
        try {
          const response = await httpClient.post(
            `${apiUrl}/add/${userData.id}`,
            updatedHouse
          );
          getUserHouses(setHouses, userData?.id);
          Swal.fire("¡Casa registrada correctamente!", "", "success");
          notify();
        } catch (error) {
          console.log(error);
          Swal.fire({ icon: "error", title: "Oops...", text: getErrorMessage(error) });
        }

        setHouse({
          name: "",
          stratum: "",
          neighborhood: "",
          address: "",
          contract: "",
          cities: {
            city: "",
          },
          user: {
            id: userID,
          },
        });

        setIsLoading(false);
        // Se setea el form de la casa a vacio para que se limpie el formulario
      } else {
        setErrors(err);
        setIsLoading(false);
      }
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
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
    <HouseFormLayout>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              type="text"
              value={house.name}
              onChange={handleInputChange}
            />
            {errors.name && <Alert severity="warning"> {errors.name} </Alert>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Barrio"
              name="neighborhood"
              type="text"
              value={house.neighborhood}
              onChange={handleInputChange}
            />
            {errors.neighborhood && (
              <Alert severity="warning"> {errors.neighborhood} </Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Estrato"
              name="stratum"
              type="number"
              value={house.stratum}
              onChange={handleInputChange}
            />
            {errors.stratum && (
              <Alert severity="warning"> {errors.stratum} </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dirección"
              name="address"
              type="text"
              value={house.address}
              onChange={handleInputChange}
            />
            {errors.address && (
              <Alert severity="warning"> {errors.address} </Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Contrato"
              name="contract"
              type="number"
              value={house.contract}
              onChange={handleInputChange}
            />
            {errors.contract && (
              <Alert severity="warning"> {errors.contract} </Alert>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectCity
              fullWidth
              options={allCities}
              handleSelect={handleSelect}
            />
          </Grid>
          <Grid
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "2rem",
            }}
            item
            xs={12}
          >
            <PdfPicker
              files={selectedFiles}
              setFiles={setSelectedFiles}
              sx={{ flex: "1 1 220px" }}
            />
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              sx={{ flex: "1 1 160px", height: "56px", alignSelf: "flex-start", position: "relative" }}
            >
              {isLoading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Guardar Casa"
              )}
            </Button>
          </Grid>
        </Grid>
      </form>
    </HouseFormLayout>
  );
};

export default HouseForm;
