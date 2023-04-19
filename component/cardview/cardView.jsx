import { Button, Tables } from "@uaveiro/ui";
import { ThemeProvider, Theme} from "@uaveiro/ui";

import Dropdown from '../dropdown/dropdown';
import IconButtons from '../viewButton/viewButton';
import BasicCard from '../basiccard/basiccard';

export default function Card(){
    return <ThemeProvider theme={Theme}>

        <div style={{ display: 'flex' }}>
            <BasicCard/>
 
        </div>
    </ThemeProvider>
}


