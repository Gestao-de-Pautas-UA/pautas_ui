import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import axios from 'axios';

export default function Dropdown() {

  //Chamada a api
  const [data, setData] = useState(null);
  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://20.123.119.238/pautasBack/pautas/10309907');
              setData(response.data);
              console.log(response.data);
          } catch(error){
              console.error(error);
          }
      };
      fetchData();
  }, []);

  //Retira os anos repetidos
  const uniqueData = [];
  data && data.forEach((choice) => {
    if (!uniqueData.includes(choice.anoLectivo)) {
      uniqueData.push(choice.anoLectivo);
      console.log(uniqueData);
    }
    });

    //Dropdown que exibe os anos lectivos
    return (
      <Box  sx={{ width: 130 , marginLeft: 5 , marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{marginLeft: 2}}>Ano</InputLabel>
        <Select label="Question">
          {uniqueData.map((choice) => (
            <MenuItem key={choice} value={choice}>
              {choice}
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      </Box>
    );


}
