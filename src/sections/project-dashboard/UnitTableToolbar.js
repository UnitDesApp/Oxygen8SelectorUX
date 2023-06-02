import React, { useCallback } from 'react';

import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField, Menu, MenuItem, Button, Paper, Divider, Typography } from '@mui/material';
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
  unitCount: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onSort: PropTypes.func,
  onDuplicate: PropTypes.func,
  onDeleteRows: PropTypes.func,
  sortOptions: PropTypes.arrayOf(PropTypes.string),
};

export default function UserTableToolbar({
  filterName,
  onFilterName,
  onSort,
  onDuplicate,
  sortOptions,
  onDeleteRows,
  unitCount,
}) {
  const [sortAnchorEl, setSortAnchorEl] = React.useState(null);
  const open = Boolean(sortAnchorEl);

  const handleSortClick = useCallback((event) => {
    setSortAnchorEl(event.currentTarget);
  }, []);
  const handleSortClose = useCallback(
    (event) => {
      onSort(event);
      setSortAnchorEl(null);
    },
    [onSort]
  );

  return (
    <Stack
      spacing={2}
      divider={<Divider orientation="vertical" flexItem />}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ py: 2.5, px: 3 }}
    >
      <Item sx={{ width: { md: '20%', sm: '20%', xs: '100%' } }}>
        <Typography>All units ({unitCount})</Typography>
      </Item>
      <Item sx={{ width: { md: '50%', sm: '50%', xs: '100%' } }}>
        <Stack direction="row" spacing={3}>
          <Button
            aria-label="filter"
            id="role"
            label="Role"
            sx={{ fontSize: '16px' }}
            startIcon={<Iconify icon={'codicon:filter-filled'} />}
          >
            Filter
          </Button>
          <Button
            aria-label="sort"
            id="role"
            label="Role"
            sx={{ fontSize: '16px' }}
            startIcon={<Iconify icon={'ic:outline-sort'} />}
            onClick={handleSortClick}
          >
            Sort
          </Button>
          <Menu
            id="role"
            MenuListProps={{
              'aria-labelledby': 'role',
            }}
            anchorEl={sortAnchorEl}
            open={open}
            onClose={() => handleSortClose('All')}
            PaperProps={{
              style: {
                maxHeight: '300px',
                width: '20ch',
              },
            }}
          >
            {sortOptions.map((option) => (
              <MenuItem
                key={option}
                value={option}
                sx={{
                  mx: 1,
                  my: 0.5,
                  borderRadius: 0.75,
                  typography: 'body2',
                  textTransform: 'capitalize',
                }}
                onClick={(event) => handleSortClose(event.target.attributes.value.value)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>

          <Button
            aria-label="filter"
            id="role"
            label="Role"
            sx={{ fontSize: '16px' }}
            startIcon={<Iconify icon={'ic:outline-file-copy'} />}
            onClick={onDuplicate}
          >
            Duplicate
          </Button>
          <Button
            aria-label="filter"
            id="role"
            label="Role"
            sx={{ fontSize: '16px' }}
            startIcon={<Iconify icon={'mdi:delete'} />}
            onClick={onDeleteRows}
          >
            Delete
          </Button>
        </Stack>
      </Item>
      <Item sx={{ width: { md: '30%', sm: '30%', xs: '100%' } }}>
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
    </Stack>
  );
}
