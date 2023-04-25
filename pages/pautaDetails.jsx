import {ThemeProvider, Theme,Button } from "@uaveiro/ui";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
  
export default function pautaDetails() {
    const code = "123NM";
    const regime = "Normal";
    const year = "2021/22";
    const responsiblePerson = "António Ribeiro";
    const course = "Engenharia Informática";
    const courseNumber = 123;
    const numberOfStudents = 76;
    const state = "Assinada";
    const notas = [
        { argument: '0', value: 0 },
        { argument: '1', value: 1 },
        { argument: '2', value: 0 },
        { argument: '3', value: 0 },
        { argument: '4', value: 2 },
        { argument: '5', value: 1 },
        { argument: '6', value: 4 },
        { argument: '7', value: 5 },
        { argument: '8', value: 5 },
        { argument: '9', value: 11 },
        { argument: '10', value: 14 },
        { argument: '11', value: 13 },
        { argument: '12', value:  15},
        { argument: '13', value: 12 },
        { argument: '14', value: 11 },
        { argument: '15', value: 8 },
        { argument: '16', value: 6 },
        { argument: '17', value: 5 },
        { argument: '18', value: 3 },
        { argument: '19', value: 2 },
        { argument: '20', value: 0 },
      ];
    return (
        <ThemeProvider theme = {Theme}>
            <div className="sheet-details-container">
                <div className="sheet-details">
                    <h2 className="sheet-details__title">Detalhes</h2>
                    <ul className="sheet-details__list">
                        <li><strong>Código:</strong> {code}</li>
                        <li><strong>Regime:</strong> {regime}</li>
                        <li><strong>Ano Letivo:</strong> {year}</li>
                        <li><strong>Responsável:</strong> {responsiblePerson}</li>
                        <li><strong>Curso:</strong> {course}</li>
                        <li><strong>Número de Curso:</strong> {courseNumber}</li>
                        <li><strong>Total de alunos inscritos:</strong> {numberOfStudents}</li>
                        <li><strong>Estado da pauta:</strong> {state}</li>
                    </ul>
                    <Button variant="default" width="9rem" >Voltar</Button>
                </div>
                <div className="graph-container">
                        <Bar 
                            data={{
                                labels:[
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
                                    data:[0,0,1,1,2,3,5,6,10,11,12,11,9,7,6,4,2,1,1,0],
                                    backgroundColor: "#439CEF",
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
