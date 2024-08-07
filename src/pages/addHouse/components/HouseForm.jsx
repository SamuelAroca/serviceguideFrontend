import { useEffect, useState, useContext } from "react";
import { HouseFormLayout } from "../styled-components/houseform-layout.styled.js";
import {
  TextField,
  Button,
  Grid,
  Tooltip,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { myID } from "../AddHouse";
import SelectCity from "../components/SelectCity";
import axios from "axios";
import { MyContext } from "../../../context/UserContext";
import { getUserHouses } from "../../../services/get-user-houses.service";
import Swal from "sweetalert2";
import { Toaster, toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { IoIosWarning } from "react-icons/io";

const HouseForm = () => {
  const apiUrl = import.meta.env.VITE_API_HOUSE;
  const apiCity = import.meta.env.VITE_API_CITY;

  const [userID, setUserID] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [allCities, setAllCities] = useState([]);
  const navigate = useNavigate();
  const accessToken = Cookies.get("token");
  const [selectedFile, setSelectedFile] = useState(null);

  const { userData, setHouses } = useContext(MyContext);
  const notify = () => toast.success("House update successfully");

  useEffect(() => {
    fetchUserID();
    getCities();
  }, [myID]);

  const [house, setHouse] = useState({
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

  const handleCityChange = (event, value) => {
    setSelectedCity(value);
    setHouse({ ...house, cities: value });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const getCities = async (e) => {
    const data = await axios.get(`${apiCity}/listAll`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    try {
      setAllCities(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const onValidate = (house) => {
    let errors = {};
    const regexLettersNumbers = /^[\w\s]+(?:\s+[a-zA-Z]+\d{0,2})*$/; // Expresión regular para validar precios
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
    if (selectedFile != null) {
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
          const response = await axios.post(
            `${apiUrl}/add/${userData.id}`,
            updatedHouse,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          getUserHouses(setHouses, userData?.id);
          Swal.fire("¡Casa registrada correctamente!", "", "success");
          notify();
        } catch (error) {
          console.log(error);
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

  function handleInputChange(event) {
    const { name, value } = event.target;
    setHouse((prevHouse) => ({
      ...prevHouse,
      [name]: value,
    }));
  }

  const handleUpload = async () => {
    try {
      setIsLoading(true);
      if (!selectedFile) {
        Swal.fire({
          title: "Select a file first!",
          text: "In PDF format",
          icon: "warning",
        });
        setIsLoading(false);
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
          text: "House saved successfully",
          icon: "success",
        });
        setIsLoading(false);
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
    <HouseFormLayout>
      <div className="title">
        <h1>AGREGAR CASA</h1>
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
                name="name"
                type="text"
                value={house.name}
                onChange={handleInputChange}
              />
            </Tooltip>
            {errors.name && <Alert severity="warning"> {errors.name} </Alert>}
          </Grid>
          <Grid item xs={12}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Agregar estrato"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="Estrato"
                name="stratum"
                type="number"
                value={house.stratum}
                onChange={handleInputChange}
              />
            </Tooltip>
            {errors.stratum && (
              <Alert severity="warning"> {errors.stratum} </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Agregar barrio"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="Barrio"
                name="neighborhood"
                type="text"
                value={house.neighborhood}
                onChange={handleInputChange}
              />
            </Tooltip>
            {errors.neighborhood && (
              <Alert severity="warning"> {errors.neighborhood} </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Agregar dirección"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="Dirección"
                name="address"
                type="text"
                value={house.address}
                onChange={handleInputChange}
              />
            </Tooltip>
            {errors.address && (
              <Alert severity="warning"> {errors.address} </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Agregar contrato"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="Contrato"
                name="contract"
                type="number"
                value={house.contract}
                onChange={handleInputChange}
              />
            </Tooltip>
            {errors.contract && (
              <Alert severity="warning"> {errors.contract} </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <SelectCity
              fullWidth
              options={allCities}
              onChange={handleCityChange}
              handleSelect={handleSelect}
              house={house}
            />
          </Grid>
          <Grid
            sx={{ display: "flex", gap: "10px", marginTop: "4rem" }}
            item
            xs={12}
          >
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
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: "100%", height: "100%", position: "relative" }}
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
