import { ThemeProvider, Theme} from "@uaveiro/ui";
import TableView from '../component/tableview/tableView';
import Card from '../component/cardview/cardView';

export default function overviewTable(){
    return <ThemeProvider theme={Theme}>
        <TableView/>
        {/* <Card/> */}
      
    </ThemeProvider>
}


