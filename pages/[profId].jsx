import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";
import TableView from "../component/tableview/tableView";
import TableRowsIcon from '@mui/icons-material/TableRows';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Theme, ThemeProvider, TableLoading  } from "@uaveiro/ui";
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';




const useStyles = makeStyles({
  uaIcon: {
    height: '40px',
    '&:hover': {
      background: '#0EB4BD',
      color: '#FFFFFF',
      
    },
  },
  uaSelect: {
    height: '55px',
    paddingTop: '4px',
    borderRadius: '0px',
    borderColor: '#000000',
  }
});

export default function ProfId() {
    
    const router = useRouter();
    const { profId } = router.query;

    const {t} = useTranslation();

    const classes = useStyles();
    
    const [view, setView] = useState('tableView');
    const [selectedYear, setSelectedYear] = useState('2022/2023');
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        if (!profId) {
          return;
        }
  
        try {
          const path = `/pautas/${profId}`;
          const url = process.env.API_URL + path;
          const response = await axios.get(url);
  
          if (response.status === 200) {
            setData(response.data);
            setIsLoading(false);
            console.log("ok")
          } 
        } catch (error) {
          console.error(error);
          setErro(error);
        }
      };
  
      fetchData();
    }, [profId]);
  

  function DropdownYears() {
    return (
      <Box  sx={{ width: 130 , marginLeft: 6 , marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{marginLeft: 2}}>{t("anoActual")}</InputLabel>
        <Select label="Ano" value={selectedYear} onChange={handleYearChange} className={classes.uaSelect}>
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


  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };


  const handleViewChange = (newView) => {
    setView(newView);
  };




    if (erro) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
          <h3>{t("erro")}</h3>
        </Box>
      );
    }else {
      return (
        <ThemeProvider theme={Theme}>
        <div>
          <h2 className="tituloPautas">{t("gestao")}</h2>
          <div style={{ display: 'flex' }}>
          <DropdownYears/>
      
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginRight: '4.3rem', paddingTop: "1rem"  }}>
              <IconButton 
                aria-label="table" 
                onClick={() => handleViewChange('tableView')}
                className={classes.uaIcon}>
                <TableRowsIcon />
              </IconButton>

              <IconButton 
                aria-label="grid" 
                onClick={() => handleViewChange('overviewCard')}
                className={classes.uaIcon}>
                <GridViewIcon />
              </IconButton>
            </div>
          
          </div>

          {isLoading ? (
            <div><TableLoading/></div> 
          ) : (
            <>
              {view === 'tableView' && <TableView year={selectedYear} nMec={profId} />}
              {view === 'overviewCard' && <BasicCard year={selectedYear} nMec={profId} />}
            </>
          )}
        </div>
        </ThemeProvider>
      );
  }
}
