import * as React from 'react';

import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, Button, Paper, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

CustomerTableToolbar.propTypes = {
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  userNum: PropTypes.number,
  onDeleteSelectedData: PropTypes.func,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CustomerTableToolbar({ filterName, onFilterName, userNum, onDeleteSelectedData }) {
  return (
    <Stack
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ py: 2.5, px: 3 }}
    >
      <Item sx={{ width: { md: '20%', xs: '100%' } }}>
        <Typography> Customers ({userNum}) </Typography>
      </Item>
      <Item sx={{ width: { md: '60%', xs: '100%' } }}>
        <Stack direction="row" justifyContent="left" spacing={3}>
          <Button startIcon={<Iconify icon={'ic:outline-filter-alt'} />}>Filter</Button>
          <Button startIcon={<Iconify icon={'ic:sharp-sort'} />}>Sort</Button>
          <Button startIcon={<Iconify icon={'ic:outline-delete-outline'} />} onClick={onDeleteSelectedData}>Delete</Button>
        </Stack>
      </Item>
      <Item sx={{ width: { md: '20%', xs: '100%' } }}>
        <TextField
          fullWidth
          size="small"
          value={filterName}
          onChange={(event) => onFilterName(event.target.value)}
          placeholder="Search Jobs..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
      </Item>
    </Stack>
  );
}
