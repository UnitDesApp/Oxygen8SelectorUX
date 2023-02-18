import * as React from 'react';

import PropTypes from 'prop-types';
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Menu,
  MenuItem,
  Button,
  Paper,
  Divider,
  Typography,
} from '@mui/material';
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
  onFilterRole: PropTypes.func,
  optionsRole: PropTypes.arrayOf(PropTypes.string),
  onAddNewUnit: PropTypes.func,
};

export default function UserTableToolbar({
  filterName,
  onFilterName,
  onFilterRole,
  optionsRole,
  onAddNewUnit,
  unitCount,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    onFilterRole(event);
    setAnchorEl(null);
  };

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
      <Item sx={{ width: { md: '50%', sm: '50%', xs: '100%' } }} >
        <Stack direction="row" spacing={3} >
          <Button aria-label="filter" id="role" label="Role" sx={{ fontSize: '16px' }} startIcon={<Iconify icon={'codicon:filter-filled'} />} onClick={handleClick}>
             Filter
          </Button>
          <Button aria-label="filter" id="role" label="Role" sx={{ fontSize: '16px' }} startIcon={<Iconify icon={'ic:outline-sort'} />} onClick={handleClick}>
             Sort
          </Button>
          <Button aria-label="filter" id="role" label="Role" sx={{ fontSize: '16px' }} startIcon={<Iconify icon={'ic:outline-file-copy'} />} onClick={handleClick}>
            Duplicate
          </Button>
          <Button aria-label="filter" id="role" label="Role" sx={{ fontSize: '16px' }} startIcon={<Iconify icon={'mdi:delete'} />} onClick={handleClick}>
            Delete
          </Button>
          <Menu
            id="role"
            MenuListProps={{
              'aria-labelledby': 'role',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose('All')}
            PaperProps={{
              style: {
                maxHeight: '300px',
                width: '20ch',
              },
            }}
          >
            {optionsRole.map((option) => (
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
                onClick={(event) => handleClose(event.target.attributes.value.value)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
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
