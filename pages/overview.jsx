import { ThemeProvider, Theme} from "@uaveiro/ui";
import Table from '../component/tableview/tableView'


export default function Overview(){
    return <ThemeProvider theme={Theme}>
        <Table/>
    </ThemeProvider>
}


