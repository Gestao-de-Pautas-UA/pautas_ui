import { ThemeProvider, Theme} from "@uaveiro/ui";
import TableView from '../component/tableview/tableView';



export default function overviewTable(){
    return <ThemeProvider theme={Theme}>
        <TableView/>
    </ThemeProvider>
}


