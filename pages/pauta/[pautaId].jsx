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
import { typeOf } from 'react-is';
import { read, utils } from 'xlsx';


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
  uaDialog: {
    border:'0px solid',
    borderRadius: '1px',
    height: '500px',
  },
});

export default function Pauta() {
  
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


  const [openGuardar, setOpenGuardar] = useState(false);
  const [openAssinar, setOpenAssinar] = useState(false);
  
  const [openOverwrite, setOpenOverwrite] = useState(false);

  const [sheetJsonData, setSheetJsonData] = useState(null);
  
  
  const handleCloseGuardar = () => {
    setOpenGuardar(false);
  };
  
  const handleCloseAssinar = () => {
    setOpenAssinar(false);
  };

  const handleCloseOverwrite = () => {
    setOpenOverwrite(false);
  };

  
  const [invalidInputs, setInvalidInputs] = useState([]);
  const [emptyInputs, setEmptyInputs] = useState([]);

  const handleGuardar = async () => {
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
      setOpenGuardar(true);
      return invalidInputs;
    }

    if (invalidInputs.length === 0) {
      try {
        const path = '/save/pauta'
        const url = process.env.API_URL + path;
        const alunoRequests = [];
        
        data.pautaAlunoResponse
              .sort((a, b) => a.aluno.nmec - b.aluno.nmec)
              .map((student, index) =>{

              const nmec = student.aluno.nmec;
              const nota = document.getElementById(nmec).value

                alunoRequests.push({nmec, nota})
              
            })

        setData(null)

        console.log({alunoRequests, codigoPauta: pautaId});
        const response = await axios.post(url, {
          alunoRequests,
          codigoPauta: pautaId
        });


        try {
          const path = `/pauta/${pautaId}`;
          const url = process.env.API_URL + path;
          const response = await axios.get(url);
          setData(response.data);
          console.log(response.data)
        } catch (error) {
          console.error(error);
        }

        console.log(response.status);
        return invalidInputs;
      } catch (error) {
        console.error(error);
        // handle the error
      }
    }

  };

  const waitForTable = async () => {
    let table = null;
    while (!table) {
      table = document.querySelector('table');
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    return table;
  };

  const handleAssinar = async () => {

    const invalidGuardar = await handleGuardar();

    const table = await waitForTable();

    let counter = 0;
    const inputs = document.querySelectorAll('input[type="number"]');
    const emptyInputs = [];
    inputs.forEach((input) => {
      const inputValue = Number(input.value);
      if (
        isNaN(inputValue) ||
        input.value === '' || input.value === "0"
        ) {
          emptyInputs.push(counter);
        }
        counter++;
      });
      setEmptyInputs(emptyInputs);
      console.log("emptyInputs: " + emptyInputs);
      if (emptyInputs.length > 0) {
        setOpenAssinar(true);
      }
      
      
      console.log("Invalidos: " + invalidGuardar.length);
      console.log("Emptys: " + emptyInputs.length);
      if (emptyInputs.length === 0 && invalidGuardar.length === 0) {
        router.push(`/pauta/${pautaId}/assinar`)
      }

  }

  const handleDownload = async () => {
    // Guardar antes de GET Download
    await handleGuardar();

    // GET File `/get/pdf/{pautaId}`
    const path = `/excel/${pautaId}`;
    const url = process.env.API_URL + path;
    const response = await axios.get(url, {responseType: 'blob'});
    const blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const urlBlob = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    // User downloads file
    link.href = urlBlob;
    link.download = 'filename.xlsx';
    link.click();    


  }


  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const file_data = await file.arrayBuffer();
    const workbook = read(file_data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    setSheetJsonData(utils.sheet_to_json(worksheet))

    setOpenOverwrite(true);

  }

  function overwriteNotas() {
    setOpenOverwrite(false);

    sheetJsonData.map((student) => {
      console.log(student["nMec"]);
      const input = document.getElementById(student["nMec"]);
      
      if (input) {
        input.value = student["Nota"];
      }

    })
  }

  const classes = useStyles();



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
                
                  <Button variant="outlined" className={classes.uaButton} onClick={handleAssinar}>
                    Assinar
                  </Button>
                </Grid>
                <Grid item sm={4} md={5} lg={4}>
                </Grid>
                <Grid item md={4} lg={5} sx={{ textAlign: 'right' }} >
                  <Button variant="outlined" className={classes.uaButton} onClick={handleDownload}>
                    Download para preencher
                  </Button>
                  <Button component="label" variant="outlined" className={classes.uaButton} sx={{ marginLeft: '40px', textAlign:'center'}}>
                    Upload de Ficheiro Excel
                      <input
                        type="file"
                        accept=".xls,.xlsx"
                        hidden
                        onChange={handleFileUpload}
                      />
                  </Button>
                </Grid>
              </Grid>
        </div>
        <Table 
          marginTop="4px" 
          borders="1px solid" 
          col2Size="62%"
          col3Size="18%"
          col4Size="10%" >
          <thead>
            <tr>
              <th>Nº Mec.</th>
              <th>Nome</th>
              <th>Regime</th>
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
                <td>{student.aluno.estatuto[0]}</td>
                <td>
                  <Input border={`1px solid ${invalidInputs.includes(index) ? 'red' : '#424242'}`}
                    width="90px" 
                    color="#424242" 
                    id={student.aluno.nmec}
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
          open={openGuardar}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseGuardar}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Notas inválidas foram inseridas para os respetivos alunos:"}</DialogTitle>
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
              onClick={handleCloseGuardar} 
              variant="outlined" 
              className={classes.uaButton}
              sx={{marginRight: '10px'}}
              >Fechar</Button>
          </DialogActions>
        </Dialog>
      </div>

        
      <div>
        <Dialog
          open={openAssinar}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseAssinar}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Para assinar a pauta, todas as notas necessitam estar preenchidas:"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {emptyInputs.map((index) => (
                <div key={index}>
                  {data.pautaAlunoResponse[index].aluno.nmec} - {data.pautaAlunoResponse[index].aluno.nome}
                </div>
              ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleCloseAssinar} 
              variant="outlined" 
              className={classes.uaButton}
              sx={{marginRight: '10px'}}
              >Fechar</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
      <Dialog
        open={openOverwrite}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseOverwrite}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Alerta de sobrescrição de notas"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            O arquivo importado irá sobrescrever as notas existentes. Deseja continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOverwrite}
              variant="outlined" 
              className={classes.uaButton}
              sx={{marginRight: '10px'}}
              >Cancelar</Button>
          <Button onClick={overwriteNotas}
                  variant="outlined" 
                  className={classes.uaButton}
                  sx={{marginRight: '10px'}}
                  >Sim</Button>
        </DialogActions>
      </Dialog>
    </div>
      
    </ThemeProvider>
  );
}