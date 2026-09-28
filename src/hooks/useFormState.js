import { useState } from "react";

// El estado del formulario + el handler de "controlled input generico"
// (setState mergeando {[name]: value} desde un <input name=.../>) estaba
// duplicado, identico salvo el nombre de la variable, en ReceiptForm,
// FormEdit, HouseForm y UpdateHouse. Esto NO toca la validacion ni el
// submit de cada uno (esos si difieren de verdad: subida de PDF,
// react-select vs Autocomplete, distintos efectos secundarios por
// formulario), solo el boilerplate que era genuinamente identico.
export const useFormState = (initialValue) => {
  const [values, setValues] = useState(initialValue);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return [values, setValues, handleChange];
};
