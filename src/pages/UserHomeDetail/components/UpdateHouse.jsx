import { useEffect, useState, useContext } from "react";
import { FormLayout } from "../../addReceipt/Components/styled-components/form-layout.styled";
import { TextField, Button, Grid, Tooltip } from "@mui/material";
import { getToken, initAxiosInterceptor } from "../../../AxiosHelper";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import SelectCity from "../../addHouse/components/SelectCity";
import axios from "axios";
import { getUserHouses } from "../../../services/get-user-houses.service";
import { MyContext } from "../../../context/UserContext";
import { Toaster, toast } from "react-hot-toast";
import styles from "../../addHouse/styles/AddHouse.module.css";

const UpdateHouse = ({ data, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_HOUSE;
  const apiCity = import.meta.env.VITE_API_CITY;

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [allCities, setAllCities] = useState([]);
  const navigate = useNavigate();

  const { setHouses } = useContext(MyContext);

  useEffect(() => {
    initAxiosInterceptor();
    tokenExist();
    getCities();
  }, []);

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

  const handleSelect = (city) => {
    setHouse({ ...house, cities: { city: city } });
  };

  const tokenExist = () => {
    if (!getToken()) {
      sessionExpired();
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

  const handleCityChange = (event, value) => {
    setSelectedCity(value);
    setHouse({ ...house, cities: value });
  };

  const getCities = async (e) => {
    if (getToken()) {
      const data = await axios.get(`${apiCity}/listAll`);
      try {
        setAllCities(data.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      sessionExpired();
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

    if (!house.contract.trim()) {
      errors.contract = "La casa debe tener un 'Contrato'.";
    } else if (!regexNumbers.test(house.contract)) {
      errors.contract = "El 'Contrato' solo debe contener números.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (getToken()) {
      const err = onValidate(house);
      setErrors(err);

      setIsLoading(true); // Empieza la carga

      if (Object.keys(err).length === 0) {
        try {
          const response = await axios.put(
            `${apiUrl}/update/${data.id}`,
            house
          );
          getUserHouses(setHouses);
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
    } else {
      sessionExpired();
    }
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setHouse((prevHouse) => ({
      ...prevHouse,
      [name]: value,
    }));
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputs_gap}>
          <div className={styles.textfield}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Add title"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="Title"
                name="name"
                type="text"
                value={house.name}
                onChange={handleInputChange}
              />
            </Tooltip>
            {errors.name && <Alert severity="warning"> {errors.name} </Alert>}
          </div>
          <div>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Add stratum"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="Stratum"
                name="stratum"
                type="number"
                value={house.stratum}
                onChange={handleInputChange}
              />
            </Tooltip>
            {errors.stratum && (
              <Alert severity="warning"> {errors.stratum} </Alert>
            )}
          </div>
          <div>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Add neighborhood"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="Neighborhood"
                name="neighborhood"
                type="text"
                value={house.neighborhood}
                onChange={handleInputChange}
              />
            </Tooltip>
            {errors.neighborhood && (
              <Alert severity="warning"> {errors.neighborhood} </Alert>
            )}
          </div>
          <div>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Add address"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="Address"
                name="address"
                type="text"
                value={house.address}
                onChange={handleInputChange}
              />
            </Tooltip>
            {errors.address && (
              <Alert severity="warning"> {errors.address} </Alert>
            )}
          </div>
          <div>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Add contract"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="Contract"
                name="contract"
                type="number"
                value={house.contract}
                onChange={handleInputChange}
              />
            </Tooltip>
            {errors.contract && (
              <Alert severity="warning"> {errors.contract} </Alert>
            )}
          </div>
          <div>
            <SelectCity
              fullWidth
              options={allCities}
              onChange={handleCityChange}
              handleSelect={handleSelect}
              house={house}
            />
          </div>
          <div className={styles.div_button}>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              /*  disabled={isLoading} */
              style={{ width: "20%" }}
            >
              Save House
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default UpdateHouse;
