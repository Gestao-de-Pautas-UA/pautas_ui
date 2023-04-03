import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import { red } from '@mui/material/colors';

// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

export default function BasicCard() {
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

//     const cards = []; 
//     for (let i = 0; i < subjectData.length; i++) {
//       cards.push(
//         <Card  sx={{ width: 350 , marginLeft: 5 , marginTop: 15  }}>
//         <CardContent>
//           {subjectData.map((subject) => (
//             <Typography variant="h5" component="div">
//               {subject.disciplina}
//             </Typography>
//           ))}
  
//         {subjectData.map((subject) => (
//           <Typography variant="body2">
//             <b>Época:</b> {subject.epoca_exame} <br />
//             <b>N_Pauta:</b> {subject.n_pauta} <br />
//           {/* <b>Estado:</b> <CircleIcon color="success" sx={{ fontSize: 10.5 }}/> <br /> */}
//           {/* <b>Estado:</b> <CircleIcon color="primary" sx={{ fontSize: 10.5 }}/> <br /> */}
//             <b>Estado:</b> <CircleIcon sx={{ fontSize: 10.5 , color: red[500]}}/> <br />
//         </Typography>
//         ))}
//         </CardContent>
  
  
//         <CardActions>
//           <Button >Editar</Button>
//           <Button >Detalhes</Button>
//         </CardActions>
//       </Card>
//       )
//     }

//   return (
    
//     <div>
//       {cards}
//     </div>
  
//   );
// }




return (
  <Card sx={{ width: 350 , marginLeft: 5 , marginTop: 15  }}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {/* Word of the Day */}
      </Typography>
      
      <Typography variant="h5" component="div">
        Introdução a Engenharia de Software
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {/* adjective */}
      </Typography>
      <Typography variant="body2">
        <b>Época:</b> Normal <br />
        <b>N_Pauta:</b> 123NM <br />
        {/* <b>Estado:</b> <CircleIcon color="success" sx={{ fontSize: 10.5 }}/> <br /> */}
        {/* <b>Estado:</b> <CircleIcon color="primary" sx={{ fontSize: 10.5 }}/> <br /> */}
        <b>Estado:</b> <CircleIcon sx={{ fontSize: 10.5 , color: red[500]}}/> <br />
      </Typography>
    </CardContent>
    <CardActions>
      <Button >Editar</Button>
      <Button >Detalhes</Button>
    </CardActions>
  </Card>
);
}

