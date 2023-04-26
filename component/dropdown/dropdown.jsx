import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Dropdown(props) {

  const [options, setOptions] = useState(props.options);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);


  //Função que altera o estado do ano seleccionado
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };


  //Dropdown que exibe os anos lectivos
  return (
    <Box  sx={{ width: 130 , marginLeft: 5 , marginTop: 2 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{marginLeft: 2}}>Ano</InputLabel>
      <Select label="Ano" value={selectedYear} onChange={handleYearChange}>
        {options && options.map((choice) => (
          <MenuItem key={choice} value={choice}>
            {choice}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
    </Box>
  );


}
