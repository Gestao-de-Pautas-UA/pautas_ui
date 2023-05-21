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



import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


export default function BasicCard({year, nMec}) {

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
            <Card sx={{ width: 350, height: 300, marginLeft: 5, marginTop: 15}} key={index}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {subject.disciplinaResponse.nome}
                </Typography>
                <Typography variant="body2">
                  <b>N_Pauta:</b> {subject.disciplinaResponse.codigo} <br />
                  <b>Época:</b> {subject.tipoExame} <br />
                  <b>Estado:</b> <p>{estadoIcon} </p><br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="outlined" style={{ borderRadius: 1,  backgroundColor: 'white', color: 'black', borderColor: 'black', fontSize: '12px' }}>Editar</Button>
                <Button variant="outlined" style={{ borderRadius: 1,  backgroundColor: 'white', color: 'black', borderColor: 'black', fontSize: '12px' }}>Detalhes</Button>
                
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



