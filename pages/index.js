import { Theme, ThemeProvider, Button } from "@uaveiro/ui";
import overviewTable from "./overviewTable";
import TableView from "../component/tableview/tableView";

export default function Home() {
  return (
    <ThemeProvider theme={Theme}>
      <TableView/>
    </ThemeProvider>
  );
}

