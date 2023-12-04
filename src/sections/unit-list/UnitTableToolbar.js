import * as React from 'react';
import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, Button, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

UserTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onAddNewUnit: PropTypes.func,
};

export default function UserTableToolbar({ filterName, onFilterName, onAddNewUnit }) {
  return (
    <Stack
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ py: 2.5, px: 3 }}
    >
     
      <Item sx={{ width: { md: '70%', sm: '60%', xs: '100%' } }}>
        <TextField
          fullWidth
          size="small"
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder="Search unit..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
      </Item>
      <Item sx={{ width: { md: '30%', sm: '50%', xs: '100%' } }}>
        <Button variant="contained" onClick={onAddNewUnit} startIcon={<Iconify icon={'eva:plus-fill'} />}>
          Add unit to project
        </Button>
      </Item>
    </Stack>
  );
}
