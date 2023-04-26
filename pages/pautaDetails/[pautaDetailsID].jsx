
import { useRouter } from 'next/router'
import axios from 'axios';
import { ThemeProvider, Theme, Button} from "@uaveiro/ui";
import { useState, useEffect } from 'react';
import { Subject } from '@mui/icons-material';
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Link from 'next/link'





export default function pautaDetails() {

   const router = useRouter();
   const pautaDetailsID = router.query.pautaDetailsID;
   const [data, setData] = useState(null);  
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://20.123.119.238/pautasBack/pauta/${pautaDetailsID}`);
                setData(response.data);
                console.log(response.data);
            } catch(error){
                console.error(error);
            }
        };
        if (pautaDetailsID) {
            fetchData();
          }
    }, [pautaDetailsID]);

    if(!data) {
        return (
            <div>Loading...</div>
        )
    }
    

    const course = data.disciplinaResponse.nome;
    const courseCode = data.disciplinaResponse.codigo;
    const state = data.estado;
    const season = data.tipoExame;
    const year = data.anoLectivo;
    const alunos = data.pautaAlunoResponse;
    const numberofStudents = alunos.length;
    const grades = [];

    for(let i =0 ; i < numberofStudents ; i++) {
        let grade = alunos[i].nota;
        if (grade === "") {
            grade = -1;
        }
        grades.push(parseInt(grade));
    }
    
    const graphArray = [];

    for (let k = -1; k<=20 ; k++) {
        let count = 0;
        grades.forEach((v) => (v === k && count++));
        graphArray.push(count);
    }
    console.log(graphArray);
    return (
        <ThemeProvider theme={Theme}>
            <div className="sheet-details-container">
                <div className="sheet-details">
                    <h2 className="sheet-details__title">Detalhes</h2>
                    <ul className="sheet-details__list">
                        <li><strong>Disciplina:</strong> {course}</li>
                        <li><strong>Regime:</strong> {season}</li>
                        <li><strong>Ano Letivo:</strong> {year}</li>
                       {/* <li><strong>Responsável:</strong> {responsiblePerson}</li>*/}
                        <li><strong>Código da Disciplina:</strong> {courseCode}</li>
                        <li><strong>Total de alunos inscritos:</strong> {numberofStudents}</li>
                        <li><strong>Estado da pauta:</strong> {state}</li>
                    </ul>
                    <Link href="http://localhost:3000">
                        <Button variant="default" width="9rem" >Voltar</Button>
                    </Link>
                </div>
                <div className="graph-container">
                        <Bar 
                            data={{
                                labels:["Undefined",
                                    "0",
                                    "1",
                                    "2",
                                    "3",
                                    "4",
                                    "5",
                                    "6",
                                    "7",
                                    "8",
                                    "9",
                                    "10",
                                    "11",
                                    "12",
                                    "13",
                                    "14",
                                    "15",
                                    "16",
                                    "17",
                                    "18",
                                    "19",
                                    "20",
                                ],
                                datasets: [
                                   { 
                                    label: "Número de alunos",
                                    data:graphArray,
                                    backgroundColor: "#10b4bc",
                                   } 
                                ]
                            }}
                            height={200}
                            width={500}
                            options={{
                            maintainAspectRatio: true
                            }}                                  
                        />
                </div>
            </div>
        </ThemeProvider>
    );
}