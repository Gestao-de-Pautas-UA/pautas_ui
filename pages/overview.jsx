import { Tables } from "@uaveiro/ui";
import { ThemeProvider, Theme} from "@uaveiro/ui";
import data from "./data";

export default function Overview(){
    return <ThemeProvider theme={Theme}>
        <div>
            

            <Tables  isFullWidth {...data} />

        </div>
    </ThemeProvider>
}



// // import { ThemeProvider, Theme, Tables, Table, Indent, Cards } from "@uaveiro/ui";
// // import 'bootstrap/dist/css/bootstrap.min.css';  
// import {Container ,Card,Row, Col, Button} from 'react-bootstrap';  


// export default function Overview() {  
//     const ButtonStyle = ({ type, text }) => {
//         return <button className={"widgetLgButton " + type}>{text}</button>;
//       };
//   return ( 
     
//     <div> 
//         <h2>Gestão de Pautas</h2>
//         <div>
//             <p>List/Card:</p>
//         </div> 
//    <Container className='p-4'>  
//      <Row>  
            
//         { [ 
            
//         'Light', 
//         'Light', 
//         'Light', 
//         'Light'

//         ].map((variant, idx) => (  
//         <Card  
//             bg={variant.toLowerCase()}  
//             key={idx}  
//             text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}  
//             style={{width:"20%"}}  
//             className="m-2"  
//         >  
//             <Card.Header>Introdução a Engenharia de Software</Card.Header>  
//             <Card.Body>  
//             {/* <Card.Title>{variant} Card Variant </Card.Title>   */}
//             <Card.Text>  
//                 Época: Normal
//             </Card.Text>  
//             <Card.Text>  
//                 N_Pauta: 123NM
//             </Card.Text>
//                 <Card.Text>
//                     <ButtonStyle className="widgetLgButton" type="Approved" text= "Preechida"  />
//                 </Card.Text>
//                 <Card.Text>
//                     <button>Editar</button>
//                     <button>Detalhes</button>
//                 </Card.Text>  
//             </Card.Body>   
               
//         </Card>  


        
  

  
// ))}  
//     </Row>  
//     </Container>  
//     </div> 
    
    
//   );  
// }  

