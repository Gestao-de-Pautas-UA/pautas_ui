import * as React from 'react';
import { ThemeProvider, Theme} from "@uaveiro/ui";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState, useEffect } from 'react';
import EstadoAmarelo from '../legend/estadoAmarelo';
import EstadoVerde from '../legend/estadoVerde';
import EstadoVermelho from '../legend/estadoVermelho';
import { useRouter } from 'next/router';
import Link from 'next/link'; 





import { makeStyles } from '@mui/styles';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useTranslation } from 'react-i18next';



const useStyles = makeStyles({
  uaButton: {
    /* define your custom styles here */
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
});

export default function BasicCard({year, nMec}) {

  const router = useRouter();
  const classes = useStyles();


    const {t} = useTranslation();


    //Chamada a api 
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


    if (!data) {
        return <ThemeProvider theme={Theme}>
                <div class="pautas-page-container">
                    {/* <TableLoading /> */}
                </div>
              </ThemeProvider>;
      }


 

    const cards = data.map((subject, index) => {
      let estadoIcon;
  
      if (subject.estado === "POR_PREENCHER") {
        // estadoIcon = <CircleIcon sx={{ fontSize: 10.5, color: "red" }} />;
        estadoIcon = <EstadoVermelho/>;

      } else if (subject.estado === "PREENCHIDA") {
        // estadoIcon = <CircleIcon  sx={{ fontSize: 10.5, color: "orange" }}/>;
        estadoIcon = <EstadoAmarelo/>;

      } else if (subject.estado === "ASSINADA") {
        // estadoIcon = <CircleIcon color="success" sx={{ fontSize: 10.5 }}/>;
        estadoIcon = <EstadoVerde/>;
      }
  

      return (
        <div>
    
          <div>
            <Card sx={{ width: 350, height: 300, marginLeft: 5, marginTop: 3, marginRight: -1}} key={index}>
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
                                      id={subject.codigoPauta}
                                      onClick={handleClickEditButton}
                                    >
                                        {t("editar")}
              </Button>
              <Link href={`/pautaDetails/${subject.codigoPauta}`}>
                    <Button variant="outlined" className={classes.uaButton}>{t("detalhes")}</Button>
              </Link>

              </CardActions>
            </Card>
          </div>
          </div>
         

      );
    });

   
  
    return (

      <div>
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



