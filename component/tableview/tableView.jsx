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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function TableView(){

    const estadoMap = {
        "POR_PREENCHER": 0,
        "PREENCHIDA": 1,
        "ASSINADA": 2
    }

    //Chamada a api 
    const [data, setData] = useState(null);
    const [ordenacaoDisciplina, setOrdenacaoDisciplina] = useState("crescente");
    const [ordenacaoEstado, setOrdenacaoEstado] = useState("crescente");

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

    // função de ordenação para ordem crescente
    const ordenarPorEstadoCrescente = (a, b) => estadoMap[a.estado] - estadoMap[b.estado];
    const ordenarPorDisciplinaCrescente = (a, b) => a.disciplinaResponse.nome.localeCompare(b.disciplinaResponse.nome);
    
    // função de ordenação para ordem decrescente
    const ordenarPorEstadoDecrescente = (a, b) => estadoMap[b.estado] - estadoMap[a.estado];
    const ordenarPorDisciplinaDecrescente = (a, b) => b.disciplinaResponse.nome.localeCompare(a.disciplinaResponse.nome);

    // função de alternância de ordenação
    const alternarOrdenacaoDisciplina = () => {
        if (ordenacaoDisciplina === "crescente") {
            setOrdenacaoDisciplina("decrescente");
        } else {
            setOrdenacaoDisciplina("crescente");
        }
    }

    const alternarOrdenacaoEstado = () => {
        if (ordenacaoEstado === "crescente") {
            setOrdenacaoEstado("decrescente");
        } else {
            setOrdenacaoEstado("crescente");
        }
    }

    if (!data) {
        return <ThemeProvider theme={Theme}>
                <div class="pautas-page-container">
                    {/* <TableLoading /> */}
                </div>
              </ThemeProvider>;
      }

    // ordem a ser aplicada de acordo com a ordenação atual
    const ordemDisciplina = ordenacaoDisciplina === "crescente" ? ordenarPorDisciplinaCrescente : ordenarPorDisciplinaDecrescente;
    const ordemEstado = ordenacaoEstado === "crescente" ? ordenarPorEstadoCrescente : ordenarPorEstadoDecrescente;





    // ordenação do array data de acordo com a ordem definida
    data.sort(ordemDisciplina);
    // data.sort(ordemEstado);



    

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
                        <th onClick={alternarOrdenacaoDisciplina} style={{cursor: "pointer"}}>Disciplina<ExpandMoreIcon/></th>
                        <th>Época de Exame</th>
                        <th>Nº Pauta</th>
                        <th onClick={alternarOrdenacaoEstado} style={{cursor: "pointer"}}>Estado<ExpandMoreIcon/></th>
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
                                <td><a href="http://localhost:3001/pauta"><Button variant="outlined" style={{ borderRadius: 1,  backgroundColor: 'white', color: 'black', borderColor: 'black', fontSize: '11px' }}>Editar</Button></a></td>
                                <td><Button variant="outlined" style={{ borderRadius: 1,  backgroundColor: 'white', color: 'black', borderColor: 'black', fontSize: '11px' }}>Detalhes</Button></td>
                            </tr>
                        ))}

                    
                    </tbody>
                </Table>
            </div>


        </ThemeProvider>

    )
    
}