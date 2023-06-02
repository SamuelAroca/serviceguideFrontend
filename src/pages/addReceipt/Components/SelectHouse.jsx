import { useState } from 'react';
import {TextField, Autocomplete} from '@mui/material';

const SelectHouse = ({options, handleSelect, receipt}) => {
  const house = options?.map((name) => {return name});

  const [value, setValue] = useState(house[0]);
  const [inputValue, setInputValue] = useState("")

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
        options={house}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select House" />}
      />
    </div>
  );
}

export default SelectHouse;