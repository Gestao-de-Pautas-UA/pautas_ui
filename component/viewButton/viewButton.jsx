import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import GridViewIcon from '@mui/icons-material/GridView';

import TableRowsIcon from '@mui/icons-material/TableRows';

export default function IconButtons() {
  return (
    <Stack className='iconButton' direction="row" spacing={1} >
      <IconButton aria-label="table">
        <TableRowsIcon />
      </IconButton>

      <IconButton aria-label="grid">
        <GridViewIcon />
      </IconButton>
  
    </Stack>
  );
}