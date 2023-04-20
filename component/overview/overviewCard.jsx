import { ThemeProvider, Theme} from "@uaveiro/ui";
import Card from '../cardview/cardView';

export default function OverviewCard(){
    return <ThemeProvider theme={Theme}>

        <Card/>
        
    </ThemeProvider>
}


