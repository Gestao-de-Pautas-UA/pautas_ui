import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import NativeSelect from '@mui/material/NativeSelect';
import { ThemeProvider, Theme} from "@uaveiro/ui";
import axios from 'axios';

export default function Dropdown() {


  const now = new Date();
  const yearNow = now.getFullYear().toString() + ' / ' + (now.getFullYear() + 1).toString();
  const yearNext = (now.getFullYear() + 1).toString() + ' / ' + (now.getFullYear() + 2).toString();
  const yearThen = (now.getFullYear() + 2).toString() + ' / ' + (now.getFullYear() + 3).toString();

  const [tfValue, setTFValue] = useState(yearNow);

  

  // const [data, setData] = useState(null);

  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const response = await axios.get('http://20.123.119.238/pautasBack/pautas/10309907');
  //             setData(response.data);
  //         } catch(error){
  //             console.error(error);
  //         }
  //     };
  //     fetchData();
  // }, []);




  return (
    <Box sx={{ width: 120 , marginLeft: 5 , marginTop: 2 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">Ano lectivo</InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
          name: 'anoLectivo',
          id: 'uncontrolled-native',
        }}
        >
          <option onClick={()=>{setTFValue(tfValue)}} value={yearNow}>{yearNow}</option> 
          <option onClick={()=>{setTFValue(tfValue)}} value={yearNext}>{yearNext}</option>
          <option onClick={()=>{setTFValue(tfValue)}} value={yearThen}>{yearThen}</option>

        {/* {data.map((subject, index) => ( 
          <option onClick={()=>{setTFValue(tfValue)}} value={subject.anoLectivo}>{subject.anoLectivo}</option> 
          // <option onClick={()=>{setTFValue(tfValue)}} value={yearNext}>{yearNext}</option>
          // <option onClick={()=>{setTFValue(tfValue)}} value={yearThen}>{yearThen}</option>
        ))} */}

         
        </NativeSelect>
      </FormControl>
    </Box>



  );
}
