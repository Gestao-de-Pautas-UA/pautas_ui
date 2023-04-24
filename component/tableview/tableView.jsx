import { Table, Tables, TableLoading} from "@uaveiro/ui";
import { ThemeProvider, Theme} from "@uaveiro/ui";
import Dropdown from '../dropdown/dropdown';
import IconButtons from '../viewButton/viewButton';
import { useState, useEffect } from 'react';
import { Button, Stack } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import axios from 'axios';
import EstadoVermelho from '../legend/estadoVermelho'
import EstadoAmarelo from "../legend/estadoAmarelo";
import EstadoVerde from "../legend/estadoVerde";
import Link from 'next/link'


export default function TableView(){

    //Chamada a api 
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


    // mapeamento dos valores do estado para um número de ordem
    const estadoMap = {
        POR_PREENCHER: 1,
        PREENCHIDA: 2,
        ASSINADA: 3,
    };
    
    // ordenação do array data de acordo com o mapeamento do estado
    data.sort((a, b) => estadoMap[a.estado] - estadoMap[b.estado]);
    
    // mapeamento reverso para mostrar a ordem descendente
    // data.sort((a, b) => estadoMap[b.estado] - estadoMap[a.estado]);
    

    return (
        <ThemeProvider theme={Theme}>
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
                                        // <CircleIcon sx={{color: "red" }} />
                                        <EstadoVermelho/>
                                    ) : subject.estado === "PREENCHIDA" ? (
                                        // <CircleIcon color="primary" />
                                        // <CircleIcon sx={{color: "orange" }} />
                                        <EstadoAmarelo/>
                                    ) : (

                                        // <CircleIcon color="success" />
                                        //  <CircleIcon color="primary" />
                                        <EstadoVerde/>
                                    )}
                                </td>
                                <td><a href="https://pautas-ui.vercel.app/pauta"><Button variant="outlined" style={{ borderRadius: 1,  backgroundColor: 'white', color: 'black', borderColor: 'black' }}>Editar</Button></a></td>
                                <td>
                                    <Link href={`/pautaDetails/${subject.codigoPauta}`}>
                                        <Button variant="outlined" style={{ borderRadius: 1,  backgroundColor: 'white', color: 'black', borderColor: 'black', fontSize: '11px' }}>Detalhes</Button>
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