
import { useRouter } from 'next/router'
import axios from 'axios';
import { ThemeProvider, Theme} from "@uaveiro/ui";
import { Button } from "@mui/material";
import { useState, useEffect } from 'react';
import { Subject } from '@mui/icons-material';
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Link from 'next/link'





export default function pautaDetails() {

    const [showPopup, setShowPopup] = useState(false);
    const handleLacrarClick = () => {
        setShowPopup(true);
      }
    

      

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
   
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '80%'  }}>
            <Button variant="outlined" style={{ borderRadius: 1, backgroundColor: 'white', color: 'black', borderColor: 'black', fontSize: '10px', marginLeft: '10px' }}>Visualizar pauta</Button>
            <Button variant="outlined" style={{ borderRadius: 1, backgroundColor: 'white', color: 'black', borderColor: 'black', fontSize: '10px',marginLeft: '10px' }} onClick={handleLacrarClick}>Lacrar*</Button>
            {showPopup && 
            <div style={{display: 'block', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div style={{backgroundColor: 'white', width: '40%', margin: 'auto', marginTop: '20%', padding: '2rem'}}>
                <p1 style={{textAlign: 'center'}}>Deseja lacrar a pauta, depois de lacrada nao pode voltar atras. </p1>
                <div style={{marginLeft: '60%' }}>
                    <Button onClick={() => setShowPopup(false)}>Close</Button>
                    <Button onClick={() => setShowPopup(false)}>Assinar</Button>
                    {/* <Link href={`/pautaDetails/${subject.codigoPauta}`}>
                        <Button onClick={() => setShowPopup(false)}>Assinar</Button>
                    </Link> */}
                </div>


            </div>
        </div>
    }
      
        </div>

            
            <div className="sheet-details-container" style={{display:'flex', flexDirection:'column', maxWidth: '800px',textAlign: 'left'}}>
                <div className="sheet-details" style={{textAlign: 'left', margin: '0px'}}>
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
                    {/* <Link href="http://localhost:3000">
                        <Button variant="default" width="9rem" >Voltar</Button>
                    </Link> */}
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