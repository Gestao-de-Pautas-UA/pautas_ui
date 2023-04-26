import { Theme, ThemeProvider, Button } from "@uaveiro/ui";
import TableView from "../component/tableview/tableView";
import Container from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import OverviewCard  from "../component/overview/overviewCard";

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import axios from 'axios';


  /*
  //Retira os anos repetidos
  const uniqueData = [];
  data && data.forEach((choice) => {
    if (!uniqueData.includes(choice.anoLectivo)) {
      uniqueData.push(choice.anoLectivo);
      console.log(uniqueData);
    }
    });

    //Função que altera o estado do ano seleccionado
    const handleYearChange = (event) => {
      setSelectedYear(event.target.value);
    };*/
  



export default function Home() {

  const [view, setView] = useState('tableView');
  const [selectedYear, setSelectedYear] = useState('2019/2020');
  const [data, setData] = useState(null);

  //Chamada a api
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

  function Dropdown() {
    //Dropdown que exibe os anos lectivos
    return (
      <Box  sx={{ width: 130 , marginLeft: 5 , marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{marginLeft: 2}}>Ano</InputLabel>
        <Select label="Ano" value={selectedYear} onChange={handleYearChange}>
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

  const uniqueData = [];
  data && data.forEach((choice) => {
    if (!uniqueData.includes(choice.anoLectivo)) {
      uniqueData.push(choice.anoLectivo);
      console.log(uniqueData);
    }
    });

  //Função que altera o estado do ano seleccionado
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };


  //Para a vista selecionada no iconButton
  const handleViewChange = (newView) => {
    setView(newView);
  };

  /*
  //Para o ano selecionado no dropdown
  const handleSelect = (year) => {
    const year = event.target.value;
    onSelectYear(year);
    setSelectedYear(year);
    console.log(selectedYear);
};*/

  return (
    <div>
      <h2 className="tituloPautas">Gestão de Pautas</h2>
      <div style={{ display: 'flex' }}>
      <Dropdown/>
      
        <Stack className='iconButton' direction="row" spacing={1}>
          <IconButton aria-label="table" onClick={() => handleViewChange('tableView')}>
            <TableRowsIcon />
          </IconButton>

          <IconButton aria-label="grid" onClick={() => handleViewChange('overviewCard')}>
            <GridViewIcon />
          </IconButton>
        </Stack>
      </div>

      {/* <div>{renderView()}</div> */}
      {view === 'tableView' && <TableView year={selectedYear} />}
      {view === 'overviewCard' && <OverviewCard />}
    </div>
  );
}
