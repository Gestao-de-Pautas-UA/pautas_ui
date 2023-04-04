import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import { red } from '@mui/material/colors';


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


    const cards = subjectData.map((subject, index) => {
      let estadoIcon;
  
      if (subject.estado === "Por preencher") {
        estadoIcon = <CircleIcon sx={{ fontSize: 10.5, color: "red" }} />;

      } else if (subject.estado === "Preenchido") {
        estadoIcon = <CircleIcon color="success" sx={{ fontSize: 10.5 }}/>;

      } else if (subject.estado === "Assinado") {
        estadoIcon = <CircleIcon color="primary" sx={{ fontSize: 10.5 }}/>;
      }
  
      return (
        <Card sx={{ width: 350, marginLeft: 5, marginTop: 15}} key={index}>
          <CardContent>
            <Typography variant="h5" component="div">
              {subject.disciplina}
            </Typography>
            <Typography variant="body2">
              <b>Época:</b> {subject.epoca_exame} <br />
              <b>N_Pauta:</b> {subject.n_pauta} <br />
              <b>Estado:</b> {estadoIcon} <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button >Editar</Button>
            <Button >Detalhes</Button>
          </CardActions>
        </Card>
      );
    });
  
    return (
      <div>
        {(() => {
          const rows = [];
          for (let i = 0; i < cards.length; i += 3) {
            const row = cards.slice(i, i + 3);
            rows.push(
              <div style={{ display: "flex" }} key={i}>
                {row.map((card, index) => (
                  <div key={index} style={{ flex: 1 }}>
                    {card}
                  </div>
                ))}
              </div>
            );
          }
          return rows;
        })()}
      </div>
    );
  }




  //   const cards = []; 

  //   subjectData.map((subject, index) => {
  //     cards.push(
  //       <Card key={index} sx={{ width: 350, marginLeft: 5, marginTop: 15 }}>
  //         <CardContent>
  //           <div>
  //             {subjectData.map((subject, index) => (
  //               <div key={index}>
  //                 <Typography variant="h5" component="div">
  //                   {subject.disciplina}
  //                 </Typography>
  
  //                 <Typography variant="body2">
  //                   <b>Época:</b> {subject.epoca_exame} <br />
  //                   <b>N_Pauta:</b> {subject.n_pauta} <br />
  //                   {/* <b>Estado:</b> <CircleIcon color="success" sx={{ fontSize: 10.5 }}/> <br /> */}
  //                   {/* <b>Estado:</b> <CircleIcon color="primary" sx={{ fontSize: 10.5 }}/> <br /> */}
  //                   <b>Estado:</b>{" "}
  //                   <CircleIcon sx={{ fontSize: 10.5, color: "red" }} /> <br />
  //                 </Typography>
  //               </div>
  //             ))}
  //           </div>
  //         </CardContent>
  //       </Card>
  //     );
  //   });

  //       return (
    
  //     <div>
  //       {cards}
  //     </div>
    
  //   );

  // }




    

//Gera os cards com os dados separados por card mas n gera o numero certo de cards e nem as cores certas    
//     const cards = subjectData.map((data) => {
//       let circleColor;
//       switch (data.estado) {
//         case "Por preencher":
//           circleColor = "red";
//           break;
//         case "Preenchido":
//           circleColor = "success";
//           break;
//         case "Assinado":
//           circleColor = "primary";
//           break;
//         // default:
//         //   circleColor = "grey";
//       }
  
//       return (
//         <Card sx={{ width: 350, marginLeft: 5, marginTop: 15 }}>
//           <CardContent>
//             <Typography variant="h5" component="div">
//               {data.disciplina}
//             </Typography>
  
//             <Typography variant="body2">
//               <b>Época:</b> {data.epoca_exame} <br />
//               <b>N_Pauta:</b> {data.n_pauta} <br />
//               <b>Estado:</b>{" "}
//               <CircleIcon sx={{ fontSize: 10.5, color: circleColor }} /> <br />
//             </Typography>
//           </CardContent>
//         </Card>
//       );
//     });

//     return (
    
//       <div>
//         {cards}
//       </div>
    
//     );
// }





//ESTE NAOOO 
// return (
//   <Card sx={{ width: 350 , marginLeft: 5 , marginTop: 15  }}>
//     <CardContent>
//       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//         {/* Word of the Day */}
//       </Typography>
      
//       <Typography variant="h5" component="div">
//         Introdução a Engenharia de Software
//       </Typography>
//       <Typography sx={{ mb: 1.5 }} color="text.secondary">
//         {/* adjective */}
//       </Typography>
//       <Typography variant="body2">
//         <b>Época:</b> Normal <br />
//         <b>N_Pauta:</b> 123NM <br />
//         {/* <b>Estado:</b> <CircleIcon color="success" sx={{ fontSize: 10.5 }}/> <br /> */}
//         {/* <b>Estado:</b> <CircleIcon color="primary" sx={{ fontSize: 10.5 }}/> <br /> */}
//         <b>Estado:</b> <CircleIcon sx={{ fontSize: 10.5 , color: red[500]}}/> <br />
//       </Typography>
//     </CardContent>
//     <CardActions>
//       <Button >Editar</Button>
//       <Button >Detalhes</Button>
//     </CardActions>
//   </Card>
// );
// }



