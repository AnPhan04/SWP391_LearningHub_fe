import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabel() {
  const [label = 10, setLabel] = React.useState('');

  const handleChange = (event) => {
    setLabel(event.target.value);
  };

  return (
    <Box sx={{ minWidth:1000 }}>
      <FormControl width = "100%" >
        <InputLabel id="demo-simple-select-label">Label</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={label}
          label="Label"
          onChange={handleChange}
        >
          <MenuItem value={10}>Blank</MenuItem>
          <MenuItem value={20}>Not Started</MenuItem>
          <MenuItem value={30}>On going</MenuItem>
          <MenuItem value={40}>At risk</MenuItem>
          <MenuItem value={50}>Complete</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}