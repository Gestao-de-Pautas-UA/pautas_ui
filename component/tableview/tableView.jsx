import { Table, Tables } from "@uaveiro/ui";
import { ThemeProvider, Theme} from "@uaveiro/ui";
import data from "./data";
import Dropdown from '../dropdown/dropdown';
import IconButtons from '../viewButton/viewButton';
import { useState } from 'react';
import { Button } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';

// export default function TableView(){
//     return <ThemeProvider theme={Theme}>
//         <h2 className="tituloPautas">Gestão de Pautas</h2>
//         <div style={{ display: 'flex' }}>
//             <Dropdown/>
//             <IconButtons/>
//         </div>

//         <div className="overviewTable">
//             <Tables  isFullWidth {...data} />
//         </div>
//     </ThemeProvider>
// }

export default function TableView(){
    const subjectData = [
        {
            "disciplina": "Engenharia de Software",
            "epoca_exame": "Normal",
            "n_pauta": "123NM",
            "estado": "Por preencher"
        }, 
        {
            "disciplina": "Base de dados",
            "epoca_exame": "Normal",
            "n_pauta": "456NM",
            "estado": "Preenchido"
        }, 
        {
            "disciplina": "Projecto em Informática",
            "epoca_exame": "Recurso",
            "n_pauta": "789RE",
            "estado": "Assinado"
        }, 
        {
            "disciplina": "APSEI",
            "epoca_exame": "Normal",
            "n_pauta": "101NM",
            "estado": "Por preencher"
        }
    ];

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
                        {subjectData.map((subject) => (
                            <tr>
                                <td>{subject.disciplina}</td>
                                <td>{subject.n_pauta}</td>
                                <td>{subject.epoca_exame}</td>
                                {/* <td>{subject.estado}</td> */}
                                <td><CircleIcon color="primary"/></td>
                                <td><Button variant="outlined">Editar</Button></td>
                                <td><Button variant="contained">Detalhes</Button></td>
                            </tr>
                        ))}

                    
                    </tbody>
                </Table>
            </div>

        </ThemeProvider>

    )
    
}