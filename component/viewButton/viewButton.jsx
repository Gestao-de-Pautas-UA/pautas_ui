import * as React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import GridViewIcon from '@mui/icons-material/GridView';

import TableRowsIcon from '@mui/icons-material/TableRows';

import Table from '../tableview/tableView';

export default function IconButtons() {
  return (
    <Stack className='iconButton' direction="row" spacing={1} >
     {/* <Link href="/overview" as={<Table/>}>
        <Button variant="contained" color="secondary">Table</Button>  
      </Link> */}
      <Link href="/overviewTable">
        <IconButton aria-label="table">
          <TableRowsIcon />
        </IconButton>
      </Link>
      <Link href="/overviewCard">
        <IconButton aria-label="grid">
          <GridViewIcon />
        </IconButton>
      </Link>
    </Stack>
  );
}