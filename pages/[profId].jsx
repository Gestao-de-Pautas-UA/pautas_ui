import { Theme, ThemeProvider, Button } from "@uaveiro/ui";
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

export default function Page() {
    
    const router = useRouter();
    const { profId } = router.query;

    const {t} = useTranslation();
    
    const [view, setView] = useState('tableView');
    const [selectedYear, setSelectedYear] = useState('2019/2020');
    const [data, setData] = useState(null);
    
    //Chamada a api
    useEffect(() => {
        const fetchData = async () => {
            if (!profId){
                return;
            } 
            
            try {
            const url = process.env.API_URL+'/pautas/' + profId;
            console.log(url);
            const response = await axios.get(url);
            setData(response.data);
            console.log(response.data);
        } catch(error){
            console.error(error);
        }
    };
    fetchData();
  }, [profId]);

  //Dropdown que exibe os anos lectivos
  function Dropdown() {
    
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




  return (
    <div>
      <h2 className="tituloPautas">{t("gestao")}</h2>
      <div style={{ display: 'flex' }}>
      <Dropdown/>
      <DropdownSort />
        <Stack className='iconButton' direction="row" spacing={1} style={{ marginLeft: "70%" }} >
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
      {view === 'overviewCard' && <BasicCard year={selectedYear} />}
    </div>
  );
}
