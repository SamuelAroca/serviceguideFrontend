import { useState, useEffect } from 'react';
import axios from 'axios';
import {TextField, Autocomplete} from '@mui/material';

const SelectHouse = ({onChange, options}) => {
  const [houseOptions, sethouseOptions] = useState([]);

  useEffect(() => {
    sethouseOptions(options);
  }, [options]);

  return (
    <div>
      <Autocomplete
        disablePortal
        sx={{ width: 300 }}
        options={houseOptions}
        getOptionLabel = {(options) => options.name}
        renderInput={(params) => (
          <TextField {...params} label="Select House" variant="outlined" />
        )}
        onChange={(value) => onChange(value)}
      />

    </div>
  );
}

export default SelectHouse;