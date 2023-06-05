import { Theme, ThemeProvider, Button, TableLoading  } from "@uaveiro/ui";
import TableView from "../component/tableview/tableView";
import Container from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import OverviewCard  from "../component/overview/overviewCard";
import BasicCard from "@/component/basiccard/basiccard";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import axios from 'axios';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
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

export default function Page() {
    
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
  

  // useEffect(() => {
  //   if (data) {
  //     sortAndSelectYear();
  //   }
  // }, [data]);
  
  // const sortAndSelectYear = () => {
  //   if (data) {
  //     const uniqueData = [...new Set(data.map((choice) => choice.anoLectivo))];
  //     uniqueData.sort((a, b) => b - a);
  //     setSelectedYear(uniqueData[0]);
  //   }
  // };

  //Dropdown que exibe os anos lectivos
  function Dropdown() {
    
    return (
      <Box  sx={{ width: 130 , marginLeft: 6 , marginTop: 2 }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native" sx={{marginLeft: 2}}>Ano</InputLabel>
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

  //Função que altera o estado do ano seleccionado
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };


  //Para a vista selecionada no iconButton
  const handleViewChange = (newView) => {
    setView(newView);
  };

  //Ordenacao das disciplinas para o Sort 

    //Ordenação por disciplina
    const [ordenacaoDisciplina, setOrdenacaoDisciplina] = useState("crescente");
    const ordenarPorDisciplinaCrescente = (a, b) => a.disciplinaResponse.nome.localeCompare(b.disciplinaResponse.nome);
    const ordenarPorDisciplinaDecrescente = (a, b) => b.disciplinaResponse.nome.localeCompare(a.disciplinaResponse.nome);
    const alternarOrdenacaoDisciplina = () => {
        if (ordenacaoDisciplina === "crescente") {
            setOrdenacaoDisciplina("decrescente");
        } else {
            setOrdenacaoDisciplina("crescente");
        }
        const ordemDisciplina = ordenacaoDisciplina === "crescente" ? ordenarPorDisciplinaCrescente : ordenarPorDisciplinaDecrescente;
        data.sort(ordemDisciplina);
    }




    //Ordenação por estado
    const estadoMap = {
        "POR_PREENCHER": 0,
        "PREENCHIDA": 1,
        "ASSINADA": 2
    }
    const [ordenacaoEstado, setOrdenacaoEstado] = useState("crescente");
    const ordenarPorEstadoCrescente = (a, b) => estadoMap[a.estado] - estadoMap[b.estado];
    const ordenarPorEstadoDecrescente = (a, b) => estadoMap[b.estado] - estadoMap[a.estado];
    const alternarOrdenacaoEstado = () => {
        if (ordenacaoEstado === "crescente") {
            setOrdenacaoEstado("decrescente");
        } else {
            setOrdenacaoEstado("crescente");
        }
        const ordemEstado = ordenacaoEstado === "crescente" ? ordenarPorEstadoCrescente : ordenarPorEstadoDecrescente;
        data.sort(ordemEstado);
    }


    function DropdownSort() {
      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
      return (
        <React.Fragment>
          <Box sx={{  float: 'right' , margin: '25px', color: 'gray'}}>
    
            <Tooltip title="Ordenação">
              <FilterAltIcon
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                
              </FilterAltIcon>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
    
            <MenuItem onClick={alternarOrdenacaoDisciplina}>
              Ordenar por disciplina
              
            </MenuItem>
            <MenuItem onClick={alternarOrdenacaoEstado}>
              Ordenar por estado
            </MenuItem>
            
            
          </Menu>
        </React.Fragment>
      );
    }



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
          <Dropdown/>
      
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
            <div><TableLoading/></div> // Exibir mensagem de carregamento
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
