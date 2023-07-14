import * as React from 'react';
import axios from 'axios';
import EstadoVermelho from '../legend/estadoVermelho'
import EstadoAmarelo from "../legend/estadoAmarelo";
import EstadoVerde from "../legend/estadoVerde";
import  makeStyles  from '@mui/styles';
import  Button  from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Link from 'next/link'
import { Table, TableLoading} from "@uaveiro/ui";
import { ThemeProvider, Theme} from "@uaveiro/ui";
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router';
import { useTranslation } from 'react-i18next';


// const useStyles = makeStyles({
//   uaButton: {
//     borderRadius: 1,  
//     backgroundColor: 'white', 
//     color: 'black', 
//     borderColor: 'black', 
//     fontSize: '14px',
//     padding: '0px 12px 0px 12px',
//     height: 'auto',
//     minHeight: '40px',
//     maxWidth: '140px',
//     textTransform: 'capitalize',
//     justifyContent: 'center',
//     fontWeight: '400',
//     '&:hover': {
//       background: '#0EB4BD',
//       color: '#FFFFFF',
//     },
//   },
//   uaTableRow: {
//     '&:hover': {
//       background: '#F5F5F5',
//     },
//   }
// });

export default function TableView({year, nMec}){

  const classes = useStyles();
  const {t} = useTranslation();
  const router = useRouter();
  const [data, setData] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        if (!nMec) {
          return;
        }
        try {
        const path = `/pautas/${nMec}`;
        const url = process.env.API_URL + path;
        const response = await axios.get(url);
        setData(response.data.filter(obj => obj.anoLectivo === year));
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [year]);


    const handleClickEditButton = (event) => {
      router.push('/pauta/'+ event.currentTarget.id);
    }

  
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


    if (!data) {
        return <ThemeProvider theme={Theme}>
                <div class="pautas-page-container">
                    <TableLoading />
                </div>
              </ThemeProvider>;
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
            <Box sx={{  float: 'right' , marginRight: '1.6rem', marginTop: '0.5rem', marginBottom: '1rem'}}>
      
              <Tooltip title="Ordenação">
                <FilterAltIcon
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2,color:"gray", margin:"0px", marginTop:"0px" }}
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
                {t("ordenardisc")}
                
              </MenuItem>
              <MenuItem onClick={alternarOrdenacaoEstado}>
                {t("ordenarestado")}
              </MenuItem>
              
              
            </Menu>
          </React.Fragment>
        );
      }


    return (
        <ThemeProvider theme={Theme}>
      
            <div className="overviewTable">
                <div className="overviewTable__header"> 
                  <DropdownSort />
                </div>
            
            
                <Table 
                    marginTop="15px" 
                    borders="1px solid" 
                    col2Size="20%"
                    col3Size="15%"
                    col4Size="10%" 
                    col5Size="20%"
                    col6Size="15%"
                    
                    >
                    <thead>
                    <tr
                      style={{
                        backgroundColor: "#F3F3F3",
                        borderTop: "4px solid #0EB4BD",
                        padding: "100px",
                      }}
                    >
                        <th onClick={alternarOrdenacaoDisciplina} style={{cursor: "pointer"}}>{t("disciplina")}<ExpandMoreIcon/></th>
                        <th>{t("npauta")}</th>
                        <th>{t("epoca")}</th>
                        <th onClick={alternarOrdenacaoEstado} style={{cursor: "pointer"}}>{t("estado")}<ExpandMoreIcon/></th>
                        <th>{t("editar")}</th>
                        <th>{t("detalhes")}</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map((subject, index) => (
                            
                            <tr
                              className={classes.uaTableRow}
                            >
                                <td>{subject.disciplinaResponse.nome}</td>
                                <td>{subject.disciplinaResponse.codigo}</td>
                                <td>{subject.tipoExame}</td>
                                <td>
                                    {subject.estado === "POR_PREENCHER" ? (
                                        <EstadoVermelho/>
                                    ) : subject.estado === "PREENCHIDA" ? (                                        
                                        <EstadoAmarelo/>
                                    ) : (

                                        <EstadoVerde/>
                                    )}
                                </td>
                                <td>
                                  <Button variant="outlined" className={classes.uaButton2}
                                      id={subject.codigoPauta}

                                      onClick={handleClickEditButton}
                                    >
                                        {t("editar")}
                                  </Button>
                                  </td>
                                <td>
                                    <Link href={`/pautaDetails/${subject.codigoPauta}`}>
                                        <Button variant="outlined" className={classes.uaButton2}>{t("detalhes")}</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

        </ThemeProvider>
    )  
}