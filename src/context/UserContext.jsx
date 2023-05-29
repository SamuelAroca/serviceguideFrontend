import { createContext, useState } from "react";

// Creamos el cotexto, con este vamos a poder acceder a las propiedades globales
const UserContext = createContext();

//Creamos el componente el cual va a proveer a los otros componentes de los datos

const UserContextPorvider = ({ children }) => {
  // Aquí crean los estados o funciónes que quieran compartir con los otros componentes

  const [user, setUser] = useState();

  // Función para actualizar los datos del usuario

  const updateUserData = () => {

  }

  // En esta constante vamos a guardar los valores o funciones que quieran compartir con los demas componentes

  const contextValues = {
    user,
  };

  //Aquí se renderiza el componente que provee el contexto o datos a los demas

  return (
    <MyContext.Provider value={contextValues}>{children}</MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
