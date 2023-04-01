import { Tables } from "@uaveiro/ui";
import { ThemeProvider, Theme} from "@uaveiro/ui";

import Dropdown from '../dropdown/dropdown';
import IconButtons from '../viewButton/viewButton';
import BasicCard from '../basiccard/basiccard';

export default function Card(){
    return <ThemeProvider theme={Theme}>
        <h2 className="tituloPautas">Gestão de Pautas</h2>
        <div style={{ display: 'flex' }}>
            <Dropdown/>
            <IconButtons/>
        </div>

        <div style={{ display: 'flex' }}>
            <BasicCard/>
            <BasicCard/>
            <BasicCard/>
        </div>
    </ThemeProvider>
}


