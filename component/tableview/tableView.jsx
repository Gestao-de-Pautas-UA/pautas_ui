import { Table, Tables, TableLoading} from "@uaveiro/ui";
import { ThemeProvider, Theme} from "@uaveiro/ui";
import Dropdown from '../dropdown/dropdown';
import IconButtons from '../viewButton/viewButton';
import { useState, useEffect } from 'react';
import { Button } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import axios from 'axios';


export default function TableView(){

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://20.123.119.238/pautasBack/pautas/10309907');
                setData(response.data);
            } catch(error){
                console.error(error);
            }
        };
        fetchData();
    }, []);

  
    if (!data) {
        return <ThemeProvider theme={Theme}>
                <div class="pautas-page-container">
                    {/* <TableLoading /> */}
                </div>
              </ThemeProvider>;
      }


    return (
        <ThemeProvider theme={Theme}>
            <h2 className="tituloPautas">Gestão de Pautas</h2>
            <div style={{ display: 'flex' }}>
                <Dropdown/>
                <IconButtons/>
            </div>
            <div className="overviewTable">

                <Table 
                    
                    marginTop="15px" 
                    borders="1px solid" 
                    col2Size="20%"
                    col3Size="15%"
                    col4Size="10%" 
                    col5Size="20%"
                    col6Size="15%" >
                    <thead>
                    <tr>
                        <th>Disciplina</th>
                        <th>Época de Exame</th>
                        <th>Nº Pauta</th>
                        <th>Estado</th>
                        <th>Editar</th>
                        <th>Detalhes</th>
                    </tr>
                    </thead>
                    <tbody>
                        {data.map((subject, index) => (
                            
                            <tr>
                                <td>{subject.disciplinaResponse.nome}</td>
                                <td>{subject.disciplinaResponse.codigo}</td>
                                <td>{subject.tipoExame}</td>
                                <td>
                                    {subject.estado === "POR_PREENCHER" ? (
                                        <CircleIcon sx={{color: "red" }} />
                                    ) : subject.estado === "PREENCHIDA" ? (
                                        // <CircleIcon color="primary" />
                                        <CircleIcon sx={{color: "orange" }} />
                                    ) : (
                                        // <CircleIcon color="success" />
                                         <CircleIcon color="primary" />
                                    )}
                                </td>
                                <td><a href="http://localhost:3001/pauta"><Button variant="outlined" style={{ borderRadius: 1,  backgroundColor: 'white', color: 'black', borderColor: 'black' }}>Editar</Button></a></td>
                                <td><Button variant="outlined" style={{ borderRadius: 1,  backgroundColor: 'white', color: 'black', borderColor: 'black' }}>Detalhes</Button></td>
                            </tr>
                        ))}

                    
                    </tbody>
                </Table>
            </div>

        </ThemeProvider>

    )
    
}