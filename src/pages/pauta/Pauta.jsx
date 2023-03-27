import "./pauta.css"
import { Tables } from "@uaveiro/ui";
import data from './data';
import {
    ThemeProvider,
    Theme
  } from "@uaveiro/ui";

export default function Pauta() {
    return (

        <ThemeProvider theme={Theme}>
            <button className="buttonRight">Download para preencher localmente</button>
            <button className="buttonRight">Upload de Up preenchida</button>
            <Tables {...data} />
            
            <button className="buttonRight">Guardar</button>
            <button className="buttonRight">Assinar</button>
          </ThemeProvider>

       
    );
  }




// export default function Pauta() {
//     return (
//        <h1>Pauta</h1>
//     );
//   }