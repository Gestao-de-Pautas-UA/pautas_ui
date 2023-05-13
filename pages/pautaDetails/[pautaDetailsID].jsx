
import { useRouter } from 'next/router'
import axios from 'axios';
import { ThemeProvider, Theme} from "@uaveiro/ui";
import { useState, useEffect } from 'react';
import { Subject } from '@mui/icons-material';
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import Link from 'next/link'
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';
import { Typography, TextField, Paper, Button, Grid } from "@mui/material";




export default function pautaDetails() {

    const [showPopup, setShowPopup] = useState(false);
    const handleLacrarClick = () => {
        setShowPopup(true);
    }



      
   const router = useRouter();
   const pautaDetailsID = router.query.pautaDetailsID;
   const [pautaData, setPautaData] = useState(null);  
   const [pdfData, setPdfData] = useState(null);  
   
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`http://20.123.119.238/pautasBack/pauta/${pautaDetailsID}`);
        const response2 = await axios.get(`http://20.123.119.238/pautasBack/pdf/estudantes/${pautaDetailsID}`, {
          responseType: 'arraybuffer'
        });
        setPautaData(response1.data);
        setPdfData(response2.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (pautaDetailsID) {
      fetchData();
    }
  }, [pautaDetailsID]);




    if(!pautaData && !pdfData) {
        return (
            <div>Loading...</div>
        )
    }

    const handleDownloadPdf = () => {
        const file = new Blob([pdfData], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      };



    const getPautaStatus = () => {
        console.log(pautaData.estado);
        if (pautaData.estado === "PREENCHIDA" || pautaData.estado === "ASSINADA") {
          return handleDownloadPdf();
        } else {
            return alert("Impossivel vizualizar: Pauta não preenchida");
        
        }
      }
      
    
    let readableState;
    if(pautaData.estado === "PREENCHIDA") {
        readableState = "Preenchida";
    }else if (pautaData.estado = "ASSINADA") {
        readableState = "Assinada"; 
    } else {
        readableState = "Por preencher";
    }
    
    let readableSeason;
    if(pautaData.tipoExame === "NM") {
        readableSeason = "Normal";
    }else if (pautaData.tipoExame = "RS") {
        readableSeason = "Recurso"; 
    } else {
        readableSeason = "Especial";
    }

    const course = pautaData.disciplinaResponse.nome;
    const courseCode = pautaData.disciplinaResponse.codigo;
    const state = pautaData.estado;
    const season = pautaData.tipoExame;
    const year = pautaData.anoLectivo;
    const alunos = pautaData.pautaAlunoResponse;
    const numberofStudents = alunos.length;
    let grades = [];
    let trueGrades = [];
    for(let i =0 ; i < numberofStudents ; i++) {
        let grade = alunos[i].nota;
        if (grade === "") {
            grade = -10;
        } else if (grade === "77"){
            grade = -3;
        } else if(grade === "88") {
            frade = -2;
        } else if (grade === "99") {
            grade = -1;
        } else if (grade ==="66") {
            grade = -4;
        }
        if (grade >= 0) {
            trueGrades.push(Math.round(parseInt(grade)));
        }
        grades.push(Math.round(parseInt(grade)));
    }

    console.log(trueGrades);


    let graphArray = [];

    for (let k = -4; k<=20 ; k++) {
        let count = 0;
        grades.forEach((v) => (v === k && count++));
        graphArray.push(count);
    }
    
    let sum = 0;
    let passCount = 0;
    for(let k = 0; k < trueGrades.length; k++ ) {
        sum += trueGrades[k];
        if(trueGrades[k] >= 10) {
            passCount++;
        }
    }
    console.log(trueGrades);
    console.log(passCount);
  
    let passRate = (passCount / numberofStudents) * 100;

    let average = sum/trueGrades.length;
    
   

    const allGrades = ["66",
    "77",
    "88",
    "99",
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
    "20",]

    const graphData = allGrades.map((grade, index) => ({
        grade,
        students: graphArray[index]
    }));
    


    return (
        <ThemeProvider theme={Theme}>
         <div style={{ marginBottom: '20px'}}>
            <Link href="/">
                <Typography className="text-link" sx={{ display: 'inline-block', marginLeft: '30px'}}>
                    lista de Pautas
                </Typography>
            </Link>
                <Typography className="text-link" sx={{ display: 'inline-block', marginLeft: '5px'}} >
                    &gt;
                </Typography>
                <Typography sx={{ display: 'inline-block', marginLeft:'9px', fontWeight: '600'}}>
                    Detalhes
                </Typography>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '80%'  }}>
            <Button onClick={getPautaStatus} variant="outlined" style={{ borderRadius: 1, backgroundColor: 'white', color: 'black', borderColor: 'black', fontSize: '10px', marginLeft: '10px' }}>Visualizar pauta</Button>
            <Button variant="outlined" style={{ borderRadius: 1, backgroundColor: 'white', color: 'black', borderColor: 'black', fontSize: '10px',marginLeft: '10px' }} onClick={handleLacrarClick}>Assinar</Button>
            {showPopup && 
            <div style={{display: 'block', position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div style={{backgroundColor: 'white', width: '40%', margin: 'auto', marginTop: '20%', padding: '2rem'}}>
                <p1 style={{textAlign: 'center'}}>Deseja assinar a pauta, depois de assinada nao pode voltar atras. </p1>
                <div style={{marginLeft: '60%' }}>
                    <Button onClick={() => setShowPopup(false)}>Close</Button>
                    <Button onClick={() => setShowPopup(false)}>Assinar</Button>
                   
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
                        <li><strong>Época:</strong> {readableSeason}</li>
                        <li><strong>Ano Letivo:</strong> {year}</li>
                        <li><strong>Código da Disciplina:</strong> {courseCode}</li>
                        <li><strong>Total de alunos inscritos:</strong> {numberofStudents}</li>
                        <li><strong>Estado da pauta:</strong> {readableState}</li>
                        <li><strong>Média:</strong> {average.toFixed(2)} valores</li>
                        <li><strong>Taxa de aprovação:</strong> {passRate.toFixed(2)} %</li>
                    </ul>             
                </div>
                <div className="graph-container">
                    <VictoryChart width={900} domainPadding={7}>
                        <VictoryAxis label="Nota" />
                        <VictoryAxis
                            dependentAxis
                            label="Nº de Alunos"
                            tickFormat={(t) => (Number.isInteger(t) ? t : null)}
                        />
                        <VictoryBar
                            style={{ data: { fill: "#10b4bc" } }}
                            data={graphData}
                            x="grade"
                            y="students"
                            labels={({ datum }) => datum.students !== 0 ? datum.students : ""}
                            labelComponent={<VictoryLabel dy={-10} />}
                        />
                    </VictoryChart>












                    
                      
                        {/*
                        <Bar 
                            data={{
                                labels:["RPNM",
                                    "Faltou",
                                    "Desistiu",
                                    "RF",
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
                            maintainAspectRatio: true,
                            scales: {
                                yAxes: [{
                                  ticks: {

                                    stepSize:1
                                    
                                  }
                                }]
                              }        
                        }}                                  
                        />
                    */}
                </div>
            </div>
        </ThemeProvider>
    );
}