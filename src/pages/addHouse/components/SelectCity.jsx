import { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function SelectCity({ options, handleSelect, house }) {
  const cities = options?.map(({ city }) => city);

  const [value, setValue] = useState(cities[0]);
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          handleSelect(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={cities}
        renderInput={(params) => <TextField {...params} label="Select City" />}
      />
    </div>
  );
}