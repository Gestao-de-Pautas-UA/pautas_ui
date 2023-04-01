import { ThemeProvider, Theme} from "@uaveiro/ui";
import Table from '../component/tableview/tableView'
import Card from '../component/cardview/cardView';

export default function Overview(){
    return <ThemeProvider theme={Theme}>
        {/* <Table/> */}
        <Card/>
     
    </ThemeProvider>
}


