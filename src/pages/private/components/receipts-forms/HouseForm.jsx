import { useEffect, useState } from "react";
import { FormLayout } from "../../styled-components/form-layout.styled";
import styled from "../../styles/ReceiptsForm.module.css";
import { TextField, Button, Grid, Tooltip } from "@mui/material";
import { Alert } from "@mui/material";
import { myID } from "../AddHouse";
import axios from "axios";

const HouseForm = (props) => {

  const apiUrl = "http://localhost:8080";

  const [userID, setUserID] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserID = async () => {
      setIsLoading(true);
      const id = await myID();
      setUserID(id);
      setIsLoading(false);
    };
    fetchUserID();
  }, []);

  const [house, setHouse] = useState({
    name: "",
    stratum: "",
    city: "",
    neighborhood: "",
    address: "",
    contract: "",
    user: {
      id: userID,
    },
  });

  const [errors, setErrors] = useState([]);

  const onValidate = (receipt) => {
    let errors = {};
    const regexLetters = /^[a-zA-Z\s]+$/; // Expresión regular para validar nombres
    const regexLettersNumbers = /^[\w\s]+(?:\s+[a-zA-Z]+\d{0,2})*$/; // Expresión regular para validar precios
    const regexNumbers = /^[0-9]+$/; // Expresión regular para validar cantidades

    if (!house.name.trim()) {
      errors.name = "Debe existir un 'Nombre' de la casa.";
    } else if (!regexLettersNumbers.test(house.name)) {
      errors.name = "El 'Nombre' solo debe contener letras, espacios y números.";
    }

    if (!house.stratum.trim()) {
      errors.stratum = "Debe existir un estrato de la casa.";
    } else if (!regexNumbers.test(house.stratum)) {
      errors.stratum = "El 'Estrato' solo debe contener números.";
    }

    if (!house.city.trim()) {
      errors.city = "La casa debe tener una 'Ciudad'.";
    } else if (!regexLetters.test(house.city)) {
      errors.city = "La 'Ciudad' solo debe contener letras.";
    }

    if (!house.neighborhood.trim()) {
      errors.neighborhood = "La casa debe tener un 'Barrio'.";
    } else if (!regexLettersNumbers.test(house.neighborhood)) {
      errors.neighborhood = "El nombre del 'Barrio' solo debe contener letras o máximo dos números.";
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

      /* try {
        const response = await axios.post(
          `${apiUrl}/api/house/add`,
          updatedHouse
        );
      } catch (error) {
        console.log(error);
      }
 */
      console.log(updatedHouse, "ESTE ES EL FORMULARIO CON EL ID");

      setHouse({
        name: "",
        stratum: "",
        city: "",
        neighborhood: "",
        address: "",
        contract: "",
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
  };

  function handleInputChange(event) {
    const { name, value } = event.target;
    setHouse((prevHouse) => ({
      ...prevHouse,
      [name]: value,
    }));
  }

  return(
    <FormLayout className={styled.receipt_layout}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
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
            {errors.name && (
              <Alert severity="warning"> {errors.name} </Alert>
            )}
          </Grid>
          <Grid item xs={10}>
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
            {errors.stratum && <Alert severity="warning"> {errors.stratum} </Alert>}
          </Grid>
          <Grid item xs={10}>
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Add city"
              placement="bottom-start"
            >
              <TextField
                fullWidth
                label="City"
                name="city"
                type="text"
                value={house.city}
                onChange={handleInputChange}
              />
            </Tooltip>
            {errors.city && (
              <Alert severity="warning"> {errors.city} </Alert>
            )}
          </Grid>
          <Grid item xs={10}>
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
            {errors.neighborhood && <Alert severity="warning"> {errors.neighborhood} </Alert>}
          </Grid>

          <Grid item xs={5}>
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
            {errors.address && <Alert severity="warning"> {errors.address} </Alert>}
          </Grid>

          <Grid item xs={5}>
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
            {errors.contract && <Alert severity="warning"> {errors.contract} </Alert>}
          </Grid>

          <Grid sx={{ display: "flex", justifyContent: "end" }} item xs={10}>
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
  )
};

export default HouseForm;