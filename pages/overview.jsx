import { ThemeProvider, Theme} from "@uaveiro/ui";
import Table from '../component/tableView/tableView'


export default function Overview(){
    return <ThemeProvider theme={Theme}>
        <Table/>
    </ThemeProvider>
}


