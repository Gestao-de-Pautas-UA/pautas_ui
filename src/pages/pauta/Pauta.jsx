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
            <Tables {...data} />
            </ThemeProvider>
    );
  }




// export default function Pauta() {
//     return (
//        <h1>Pauta</h1>
//     );
//   }