import * as React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EstadoVerde from '../legend/estadoVerde';
import EstadoVermelho from '../legend/estadoVermelho';
import  makeStyles  from '@mui/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Link from 'next/link'; 
import { ThemeProvider, Theme} from "@uaveiro/ui";
import { TableLoading} from "@uaveiro/ui";
import EstadoAmarelo from '../legend/estadoAmarelo';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';



const useStyles = makeStyles({
  uaButton: {
    borderRadius: 1,  
    backgroundColor: 'white', 
    color: 'black', 
    borderColor: 'black', 
    fontSize: '14px',
    padding: '0px 12px 0px 12px',
    height: 'auto',
    minHeight: '40px',
    maxWidth: '140px',
    textTransform: 'capitalize',
    justifyContent: 'center',
    fontWeight: '400',
    '&:hover': {
      background: '#0EB4BD',
      color: '#FFFFFF',
    },
  },
  uaCard: {
    borderRadius: '0px',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 2px 4px'
  }
});

export default function BasicCard({year, nMec}) {

    const router = useRouter();
    const classes = useStyles();
    const {t} = useTranslation();
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
              const url = process.env.API_URL+'/pautas/' + nMec;
              const response = await axios.get(url);
              setData(response.data.filter(obj => obj.anoLectivo === year));
            } catch(error){
                console.error(error);
            }
        };
        fetchData();
    }, [year]);


    const handleClickEditButton = (event) => {
      router.push('/pauta/'+ event.currentTarget.id);
    }

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
            <Box sx={{  float: 'right' , margin: '25px', marginRight: '5rem'}}>
      
              <Tooltip title="Ordenação">
                <FilterAltIcon
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2, color:"gray" }}
                  
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


    const cards = data.map((subject, index) => {
      let estadoIcon;
  
      if (subject.estado === "POR_PREENCHER") {
        estadoIcon = <EstadoVermelho/>;

      } else if (subject.estado === "PREENCHIDA") {
        estadoIcon = <EstadoAmarelo/>;

      } else if (subject.estado === "ASSINADA") {
        estadoIcon = <EstadoVerde/>;
      }
  

      return (
       
        <div>
          <div>
            <Card 
              sx={{ width: 350, marginLeft: 5, marginTop: 3, marginRight: -1}} 
              key={index}
              className={classes.uaCard}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {subject.disciplinaResponse.nome}
                </Typography>
                <Typography variant="body2">
                  <b>{t("npauta")}:</b> {subject.disciplinaResponse.codigo} <br />
                  <b>{t("epoca")}:</b> {subject.tipoExame} <br />
                  <b>{t("estado")}:</b> <p>{estadoIcon} </p><br />
                </Typography>
              </CardContent>
              <CardActions>

              <Button variant="outlined" className={classes.uaButton}
                                      style={{ marginLeft: '0.5rem', marginBottom: '0.5rem'}}
                                      id={subject.codigoPauta}
                                      onClick={handleClickEditButton}
                                    >
                                        {t("editar")}
              </Button>
              <Link href={`/pautaDetails/${subject.codigoPauta}`}>
                    <Button variant="outlined" className={classes.uaButton} style={{marginLeft: "0.5rem", marginBottom: '0.5rem'}} >{t("detalhes")}</Button>
              </Link>

              </CardActions>
            </Card>
          </div>
          </div>
         

      );
    });
  
    return (
      <div>
        <div><DropdownSort/></div>
        {(() => {
          const rows = [];
          for (let i = 0; i < cards.length; i += 3) {
            const row = cards.slice(i, i + 3);
            rows.push(
              <div style={{ display: "flex" }} key={i}>
                {row.map((card, index) => (
                  <div key={index} style={{ flex: 1 }}>
                    {card}
                  </div>
                ))}
              </div>
            );
          }
          return rows;
        })()}
      </div>

 
    );
  }



