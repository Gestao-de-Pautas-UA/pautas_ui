import { Tables } from "@uaveiro/ui";
import { ThemeProvider, Theme} from "@uaveiro/ui";
import data from "./data";
import Dropdown from '../dropdown/dropdown';
import IconButtons from '../viewButton/viewButton';

export default function Table(){
    return <ThemeProvider theme={Theme}>
        <h2 className="tituloPautas">Gestão de Pautas</h2>
        <div style={{ display: 'flex' }}>
            <Dropdown/>
            <IconButtons/>
        </div>

        <div className="overviewTable">
            <Tables  isFullWidth {...data} />
        </div>
    </ThemeProvider>
}


