import "./pauta.css"
import { Tables } from "@uaveiro/ui";
import data from './data';
import {
    ThemeProvider,
    Theme
  } from "@uaveiro/ui";

  import MyDropdown from '../../components/dropdown/dropdown';
export default function Pauta() {
    return (

        <ThemeProvider theme={Theme}>
       
            {/* <button className="buttonRight">Download para preencher localmente</button>
            <button className="buttonRight">Upload de Up preenchida</button> */}
            <div style={{width: '100%'}}>
              <Tables {...data} />
            </div>
            {/* <button className="buttonRight">Guardar</button>
            <button className="buttonRight">Assinar</button> */}
          </ThemeProvider>

       
    );
  }




// export default function Pauta() {
//     return (
//        <h1>Pauta</h1>
//     );
//   }