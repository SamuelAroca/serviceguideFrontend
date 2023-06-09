import { createContext, useState } from "react";

// Creamos el cotexto, con este vamos a poder acceder a las propiedades globales
const MyContext = createContext();

//Creamos el componente el cual va a proveer a los otros componentes de los datos

const UserContextProvider = ({ children }) => {
  // Aquí crean los estados o funciónes que quieran compartir con los otros componentes

  const [user, setUser] = useState(null);
  const [houses, setHouses] = useState([]);
  const [userData, setUserData] = useState(null);

  // Función para actualizar los datos del usuario

  const updateUserData = (user) => {
    setUser(user);
  };

  // En esta constante vamos a guardar los valores o funciones que quieran compartir con los demas componentes

  const contextValues = {
    user,
    updateUserData,
    houses,
    setHouses,
    userData,
    setUserData,
  };

  //Aquí se renderiza el componente que provee el contexto o datos a los demas

  return (
    <MyContext.Provider value={contextValues}>{children}</MyContext.Provider>
  );
};

export { MyContext, UserContextProvider };
