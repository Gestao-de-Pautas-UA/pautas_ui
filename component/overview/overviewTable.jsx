import { ThemeProvider, Theme} from "@uaveiro/ui";
import TableView from '../tableview/tableView';



export default function overviewTable(){
    return <ThemeProvider theme={Theme}>
        <TableView/>
    </ThemeProvider>
}


