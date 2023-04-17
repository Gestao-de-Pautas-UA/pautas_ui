import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react";
import TextField from "@mui/material/TextField";
import NativeSelect from '@mui/material/NativeSelect';

export default function Dropdown() {
  const [year, setYear] = React.useState('');

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  const now = new Date();
  const yearNow = now.getFullYear().toString() + ' / ' + (now.getFullYear() + 1).toString();
  const yearNext = (now.getFullYear() + 1).toString() + ' / ' + (now.getFullYear() + 2).toString();
  const yearThen = (now.getFullYear() + 2).toString() + ' / ' + (now.getFullYear() + 3).toString();


  const [tfValue, setTFValue] = useState(yearNow);

  return (
    <Box sx={{ width: 160 , marginLeft: 5 , marginTop: 2 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">Ano lectivo</InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
          name: 'age',
          id: 'uncontrolled-native',
        }}
  >
          <option onClick={()=>{setTFValue(tfValue)}} value={yearNow}>{yearNow}</option>
          <option onClick={()=>{setTFValue(tfValue)}} value={yearNext}>{yearNext}</option>
          <option onClick={()=>{setTFValue(tfValue)}} value={yearThen}>{yearThen}</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
