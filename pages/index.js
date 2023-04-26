import { Theme, ThemeProvider, Button } from "@uaveiro/ui";
import TableView from "../component/tableview/tableView";
import Dropdown from '../component/dropdown/dropdown'
import Container from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { useState } from "react";
import OverviewCard  from "../component/overview/overviewCard";

export default function Home() {
  const [view, setView] = useState('tableView');
  const [selectedYear, setSelectedYear] = useState(null);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const renderView = () => {
    if (view === 'tableView' ) {
      return <TableView year={selectedYear} />;
    } else if (view === 'overviewCard') {
      return <OverviewCard />;
    }
  };

  return (
    <div>
      <h2 className="tituloPautas">Gestão de Pautas</h2>
      <div style={{ display: 'flex' }}>
        <Dropdown onSelectYear={(year) => setSelectedYear(year)} />
        <Stack className='iconButton' direction="row" spacing={1}>
          <IconButton aria-label="table" onClick={() => handleViewChange('tableView')}>
            <TableRowsIcon />
          </IconButton>

          <IconButton aria-label="grid" onClick={() => handleViewChange('overviewCard')}>
            <GridViewIcon />
          </IconButton>
        </Stack>
      </div>

      {/* <div>{renderView()}</div> */}
      {view === 'tableView' && <TableView year={selectedYear} />}
      {view === 'overviewCard' && <OverviewCard />}
    </div>
  );
}
