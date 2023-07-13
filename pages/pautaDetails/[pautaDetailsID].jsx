
import { useRouter } from 'next/router'
import axios from 'axios';
import { ThemeProvider, Theme , TableLoading} from "@uaveiro/ui";
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory';
import { Typography,Paper, Button} from "@mui/material";
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    uaButton: {
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
      }
});


export default function pautaDetails() {


    const {t} = useTranslation();
    const classes = useStyles();

    const [showPopup, setShowPopup] = useState(false); //!
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
        const response1 = await axios.get(process.env.API_URL + `/pauta/${pautaDetailsID}`);
        const response2 = await axios.get(process.env.API_URL + `/pdf/estudantes/${pautaDetailsID}`, {
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
            <ThemeProvider theme={Theme}>
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
            </ThemeProvider>
        )
    }
    
    const handleDownloadPdf = () => {
        const file = new Blob([pdfData], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      };

    const goToOverview = async () => {
        try {
          const response = await axios.get(process.env.API_URL + `/professorByPauta/${pautaDetailsID}`);
          const codProf = response.data.nmec;
          router.push(`/${codProf}`);
        } catch (error) {
          console.error(error);
        }
      }

    const getPautaStatus = () => {
        console.log(pautaData.estado);
        if (pautaData.estado === "PREENCHIDA" || pautaData.estado === "ASSINADA") {
          return handleDownloadPdf();
        } else {
            return alert("Impossivel vizualizar: Pauta não preenchida");
        
        }
      }
      
    
    let readableState;
    let translatedState;
    if(pautaData.estado === "PREENCHIDA") {
        readableState = "Preenchida";
        translatedState= t("preenchida");
    }else if (pautaData.estado === "ASSINADA") {
        readableState = "Assinada";
        translatedState= t("assinada"); 
    } else {
        readableState = "Por preencher";
        translatedState= t("npreenchida");
    }
    
    let readableSeason;
    let translatedSeason;

    if(pautaData.tipoExame === "NM") {
        readableSeason = "Normal";
        translatedSeason = t("normal");
    }else if (pautaData.tipoExame === "RS") {
        readableSeason = "Recurso";
        translatedSeason = t("recurso"); 
    } else {
        readableSeason = "Especial";
        translatedSeason = t("especial");
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
            grade = -2;
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
  
    let passRate = (passCount / numberofStudents) * 100;

    let average = sum/trueGrades.length;
    
    if(trueGrades.length === 0) {
        passRate = 0;
        average = 0;
    }

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
    
    const pathtopauta = "/pauta/" + pautaDetailsID;
    
    return (
        <ThemeProvider theme={Theme}>

            <div style={{marginLeft: '50px' , marginBottom: '20px'}}>
            <Typography className="text-link" sx={{ display: 'inline-block'}} onClick={goToOverview}>
                {t("lista")}
            </Typography>
            <Typography className="text-link" sx={{ display: 'inline-block', marginLeft: '5px'}} >
                &gt;
            </Typography>
            <Typography sx={{ display: 'inline-block', marginLeft:'9px', fontWeight: '600'}}>
                {t("detalhes")}
            </Typography>
            </div>

        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '75%'  }}>
            <Button onClick={getPautaStatus} variant="outlined" className={classes.uaButton} sx={{ marginLeft: '10px'}}>{t("visualizar")}</Button>
            <Link href={pathtopauta}>
                <Button variant="outlined" className={classes.uaButton} sx={{ marginLeft: '10px'}}>{t("irpara")}</Button>
            </Link> 
        </div>

            
            <div className="sheet-details-container" style={{marginLeft: '50px' ,display:'flex', flexDirection:'column', maxWidth: '800px',textAlign: 'left'}}>
                <div className="sheet-details" style={{textAlign: 'left', margin: '0px'}}>
                    <h2 className="sheet-details__title">{t("detalhes")}</h2>
                    <ul className="sheet-details__list">
                        <li><strong>{t("disciplina")}:</strong> {course}</li>
                        <li><strong>{t("epoca")}:</strong> {translatedSeason}</li>
                        <li><strong>{t("ano")}:</strong> {year}</li>
                        <li><strong>{t("codigo")}:</strong> {courseCode}</li>
                        <li><strong>{t("nalunos")}:</strong> {numberofStudents}</li>
                        <li><strong>{t("estado")}:</strong> {translatedState}</li>
                        <li><strong>{t("media")}:</strong> {average.toFixed(2)} {t("valores")}</li>
                        <li><strong>{t("taxa")}:</strong> {passRate.toFixed(2)} %</li>
                    </ul>             
                </div>
                <div className="graph-container" style={{marginBottom:"70px"}}>
                    <VictoryChart width={900} domainPadding={7}>
                        <VictoryAxis label={t("nota")} />
                        <VictoryAxis
                            dependentAxis
                            label={t("nalunosabrv")}
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
                </div>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 , textAlign: 'center', fontWeight: '600'}} elevation={24}>
                    66 - {t("reprovadomin")} / 77 - {t("faltou")} / 88 - {t("desistiu")} / 99 - {t("reprovadofalta")}
                </Paper>

            </div>
        </ThemeProvider>
    );
}
