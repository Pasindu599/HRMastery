import React from 'react';
import { Search } from '@mui/icons-material';
import { colors } from '@mui/material';
import {
  Button,
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
} from '@mui/material';

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <span>
      {/* <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} /> */}
      <OutlinedInput
        value={filter || ''}
        onChange={(e) => setFilter(e.target.value)}
        defaultValue=""
        fullWidth
        placeholder="Search Empolyee"
        startAdornment={
          <InputAdornment position="start">
            <Search sx={{ color: colors.grey[500] }} />
          </InputAdornment>
        }
        sx={{ maxWidth: 500 }}
      />
    </span>
  );
};

export default GlobalFilter;
