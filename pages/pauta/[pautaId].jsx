import Link from 'next/link'
import { useRouter } from 'next/router'

import { Table, Theme, ThemeProvider, Button, TableLoading, ProfileLoading } from "@uaveiro/ui";
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { Input } from "@uaveiro/ui";  
import { Typography, TextField, Paper } from "@mui/material";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Pauta() {

    const router = useRouter()
    const { pautaId } = router.query
    console.log(pautaId)

    const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!pautaId) {
        return;
      }
      try {
        const response = await axios.get(`http://20.123.119.238/pautasBack/pauta/${pautaId}`); //545GGRE
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
            <div style={{marginBottom: '25px'}} >
              <Typography sx={{fontWeight: '400', lineHeight: '1.5', color: '#757575', fontSize: '20px', }}
              >{data.anoLectivo}
              </Typography>
            </div>
          </div>
          <MDBContainer class="w-100">
            <MDBRow end>
              <MDBCol md="3" lg="2">
                <Button variant="default" width="9rem" >Download para preencher</Button>
              </MDBCol>
              <MDBCol md="3" lg="2">
                <div class="d-flex justify-content-end">
                  <Button variant="default" width="9.5rem">Upload de Excel ou CSV</Button>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <Table 
            marginTop="15px" 
            borders="1px solid" 
            col2Size="10%"
            col3Size="10%"
            col4Size="15%" >
            <thead>
              <tr>
                <th>Nome</th>
                <th>Nº Mec.</th>
                {/* <th>Regime</th> */}
                <th>Código de Curso</th>
                {/* <th>Repetente</th> */}
                <th>Nota</th>
              </tr>
            </thead>
            <tbody>
              {data.pautaAlunoResponse.map((student, index) =>{

                // const notaContent = studentsNotas[index] 
                return (
                <tr>
                  <td>{student.aluno.nome}</td>
                  <td>{student.aluno.nmec}</td>
                  {/* <td>{student.regime}</td> */}
                  <td>{student.aluno.codidoCurso}</td>
                  {/* <td>{student.repetente ? "Sim" : "Não" }</td> */}
                  <td>
                    <Input border="1px solid #424242" 
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
      </ThemeProvider>
    );
}