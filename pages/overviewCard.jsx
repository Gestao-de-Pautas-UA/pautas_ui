import { ThemeProvider, Theme} from "@uaveiro/ui";
import Table from '../component/tableview/tableView'
import Card from '../component/cardview/cardView';

export default function OverviewCard(){
    return <ThemeProvider theme={Theme}>
   
        <Card/>
    

    </ThemeProvider>
}


