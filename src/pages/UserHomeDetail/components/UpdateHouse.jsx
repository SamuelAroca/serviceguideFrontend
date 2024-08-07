import { useEffect, useState, useContext } from "react";
import { HouseFormLayout } from "../../addHouse/styled-components/houseform-layout.styled";
import { TextField, Button, Grid, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import SelectCity from "../../addHouse/components/SelectCity";
import axios from "axios";
import { getUserHouses } from "../../../services/get-user-houses.service";
import { MyContext } from "../../../context/UserContext";
import { Toaster, toast } from "react-hot-toast";
import styles from "../Styles/UpdateHouse.module.css";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Select from "react-select";
import { Height } from "@mui/icons-material";

const UpdateHouse = ({ data, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_HOUSE;
  const apiCity = import.meta.env.VITE_API_CITY;

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [allCities, setAllCities] = useState([]);
  const accessToken = Cookies.get("token");

  const { setHouses, userData } = useContext(MyContext);
  const notify = () => toast.success("House update successfully");

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    if (data?.cities?.city) {
      // Si hay una ciudad en los datos, establecerla como la ciudad seleccionada
      setSelectedCity({ label: data.cities.city, value: data.cities.city });
    }
  }, [data]);

  const [house, setHouse] = useState({
    name: data?.name,
    stratum: data?.stratum,
    neighborhood: data?.neighborhood,
    address: data?.address,
    contract: data?.contract,
    cities: {
      city: data?.cities?.city,
    },
  });

  console.log(house);

  const handleSelect = (city) => {
    setHouse({ ...house, cities: { city: city } });
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setHouse({ ...house, cities: { city: selectedOption.value } });
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
    const regexLetters = /^[a-zA-Z\s]+$/; // Expresión regular para validar nombres
    const regexLettersNumbers = /^[\w\s]+(?:\s+[a-zA-Z]+\d{0,2})*$/; // Expresión regular para validar precios
    const regexNumbers = /^[0-9]+$/; // Expresión regular para validar cantidades
    const regexStratum = /^[1-6]$/; // Validar estrato

    if (!house.name.trim()) {
      errors.name = "Debe existir un 'Nombre' de la casa.";
    } else if (!regexLettersNumbers.test(house.name)) {
      errors.name =
        "El 'Nombre' solo debe contener letras, espacios y números.";
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

    if (!house.stratum.toString().trim()) {
      errors.stratum = "Debe existir un estrato de la casa.";
    } else if (!regexNumbers.test(house.stratum)) {
      errors.stratum = "El 'Estrato' solo debe contener números.";
    } else if (!regexStratum.test(house.stratum)) {
      errors.stratum = "El 'Estrato' es únicamente del 1 al 6.";
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
    const err = onValidate(house);
    setErrors(err);

    setIsLoading(true); // Empieza la carga
    console.log(house);

    if (Object.keys(err).length === 0) {
      try {
        const response = await axios.put(`${apiUrl}/update/${data.id}`, house, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        notify();
        getUserHouses(setHouses, userData?.id);
        onClose();
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
      });
      setIsLoading(false);
      // Se setea el form de la casa a vacio para que se limpie el formulario
    } else {
      setErrors(err);
      setIsLoading(false);
    }
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setHouse((prevHouse) => ({
      ...prevHouse,
      [name]: value,
    }));
  }

  const cityOptions = allCities.map((city) => ({
    label: city.city,
    value: city.city,
  }));

  return (
    <HouseFormLayout>
      <div className="title">
        <h1>Actualizar Casa</h1>
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
              title="Agregar Contrato"
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
            <Select
              value={selectedCity}
              onChange={handleCityChange}
              options={cityOptions}
              placeholder="Seleccionar ciudad"
            />
          </Grid>
          <Grid item xs={12} className={styles.div_button}>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              style={{ width: "20%" }}
            >
              Actualizar Casa
            </Button>
          </Grid>
        </Grid>
      </form>
    </HouseFormLayout>
  );
};

export default UpdateHouse;
