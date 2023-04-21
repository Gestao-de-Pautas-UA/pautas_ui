import Link from 'next/link'
import { useRouter } from 'next/router'

import { Table, Theme, ThemeProvider, TableLoading } from "@uaveiro/ui";
import { Input } from "@uaveiro/ui";  
import { Typography, TextField, Paper, Button, Grid } from "@mui/material";
import { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

export default function Pauta() {

  const [open, setOpen] = useState(false);
  
  const handleCloseAlert = () => {
    setOpen(false);
  };

  
  const [invalidInputs, setInvalidInputs] = useState([]);

  const handleGuardar = () => {
    const invalidInputs = [];
    let counter = 0;
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach((input) => {
      const inputValue = Number(input.value);
      if (
        isNaN(inputValue) ||
        (inputValue < 0 || inputValue > 20) &&
        (inputValue !== 66 && inputValue !== 77 && inputValue !== 88 && inputValue !== 99)
        ) {
          invalidInputs.push(counter);
        }
        counter++;
      });
    setInvalidInputs(invalidInputs);
    if (invalidInputs.length > 0) {
      setOpen(true);
    }

    if (invalidInputs.length === 0) {
      // PUT GUARDAR
    }

  };

    const classes = useStyles();

    const router = useRouter()
    const { pautaId } = router.query

    const [data, setData] = useState(null);
    
    useEffect(() => {
      const fetchData = async () => {
        if (!pautaId) {
          return;
        }
        try {
        const path = `/pauta/${pautaId}`;
        const url = process.env.API_URL + path;
        const response = await axios.get(url);
        setData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [pautaId]);


  
     if (!data) {
      return <ThemeProvider theme={Theme}>
              <div class="pautas-page-container">
                <div style={{ marginBottom: '20px'}}>
                  <Link href="/">
                  <Typography className="text-link" sx={{ display: 'inline-block'}}>
                    lista de Pautas
                  </Typography>
                  </Link>
                  <Typography className="text-link" sx={{ display: 'inline-block', marginLeft: '5px'}} >
                    &gt;
                  </Typography>
                  <Typography sx={{ display: 'inline-block', marginLeft:'9px', fontWeight: '600'}}>
                    Pauta
                  </Typography>
                </div>         
                <TableLoading />
              </div>
            </ThemeProvider>;
    }
  
    return (

      <ThemeProvider theme={Theme}>
        <div class="pauta-page-container">
        <div style={{ marginBottom: '20px'}}>
          <Link href="/">
              <Typography className="text-link" sx={{ display: 'inline-block'}}>
                  lista de Pautas
              </Typography>
          </Link>
              <Typography className="text-link" sx={{ display: 'inline-block', marginLeft: '5px'}} >
                  &gt;
              </Typography>
              <Typography sx={{ display: 'inline-block', marginLeft:'9px', fontWeight: '600'}}>
                  Pauta
              </Typography>
        </div>
          <div>         
            <div style={{ display: 'flex'}}>
              <Typography sx={{fontSize: '1.75rem' ,fontWeight: '600', lineHeight: '1.5', marginRight: '10px'}}
              >{data.disciplinaResponse.nome}
              </Typography>
              <Typography sx={{fontWeight: '400', lineHeight: '1.5', color: '#757575', paddingTop: '12.5px', marginRight: '8px'}}
              >{data.disciplinaResponse.codigo}
              </Typography>
              <Typography sx={{fontWeight: '400', lineHeight: '1.5', color: '#757575', paddingTop: '12.5px'}}
              >{data.tipoExame}
              </Typography>
            </div>
            <div style={{marginBottom: '35px'}} >
              <Typography sx={{fontWeight: '400', lineHeight: '1.5', color: '#757575', fontSize: '20px', }}
              >{data.anoLectivo}
              </Typography>
            </div>
          </div>
          <div>
                <Grid container spacing={1}>

                  <Grid item md={3} lg={2}>
                    <Button variant="outlined" className={classes.uaButton} sx={{ marginRight: '40px'}} onClick={handleGuardar}>
                      Guardar
                    </Button>
                    <Button variant="outlined" className={classes.uaButton}>
                      Assinar
                    </Button>
                  </Grid>
                  <Grid item sm={4} md={5} lg={4}>
                  </Grid>
                  <Grid item md={4} lg={5} sx={{ textAlign: 'right' }} >
                    <Button variant="outlined" className={classes.uaButton}>
                      Download para preencher
                    </Button>
                    <Button variant="outlined" className={classes.uaButton} sx={{ marginLeft: '40px'}}>
                      Upload de Excel ou CSV
                    </Button>
                  </Grid>
                </Grid>
          </div>
          <Table 
            marginTop="4px" 
            borders="1px solid" 
            col2Size="65%"
            col3Size="10%"
            col4Size="15%" >
            <thead>
              <tr>
                <th>Nº Mec.</th>
                <th>Nome</th>
                {/* <th>Regime</th> */}
                <th>Código de Curso</th>
                {/* <th>Repetente</th> */}
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {data.pautaAlunoResponse
                .sort((a, b) => a.aluno.nmec - b.aluno.nmec)
                .map((student, index) =>{

                return (
                <tr>
                  <td>{student.aluno.nmec}</td>
                  <td>{student.aluno.nome}</td>
                  {/* <td>{student.regime}</td> */}
                  <td>{student.aluno.codidoCurso}</td>
                  {/* <td>{student.repetente ? "Sim" : "Não" }</td> */}
                  <td>
                    <Input border={`1px solid ${invalidInputs.includes(index) ? 'red' : '#424242'}`}
                      width="90px" 
                      color="#424242" 
                      defaultValue={student.nota}
                      type="number"
                      step="0.01"/>
                  </td>
                </tr>
              )})}
            </tbody>
          </Table>
        </div>

        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 , textAlign: 'center', fontWeight: '600'}} elevation={24}>
          66 - Reprovado por nota mínima / 77 - Faltou / 88 - Desistiu / 99 - Reprovado por faltas
        </Paper>



        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseAlert}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Notas inválidas foram inseridas para alguns alunos"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {invalidInputs.map((index) => (
                  <div key={index}>
                    {data.pautaAlunoResponse[index].aluno.nmec} - {data.pautaAlunoResponse[index].aluno.nome}
                  </div>
                ))}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleCloseAlert} 
                variant="outlined" 
                className={classes.uaButton}
                sx={{marginRight: '10px'}}
                >Fechar</Button>
            </DialogActions>
          </Dialog>
        </div>
      </ThemeProvider>
    );
}