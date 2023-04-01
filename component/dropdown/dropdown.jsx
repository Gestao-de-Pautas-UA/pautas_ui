import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown() {
  const [year, setYear] = React.useState('');

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <Box sx={{ width: 130 , marginLeft: 5  }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Ano</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={year}
          label="yaer"
          onChange={handleChange}
        >
          <MenuItem value={10}>2020/2021</MenuItem>
          <MenuItem value={20}>2021/2022</MenuItem>
          <MenuItem value={30}>2022/2023</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
