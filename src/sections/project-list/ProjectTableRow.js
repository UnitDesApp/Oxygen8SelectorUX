/* eslint-disable camelcase */
import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, MenuItem, Divider, Stack, IconButton } from '@mui/material';
// components
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import { TableMoreMenu } from '../../components/table';

// ----------------------------------------------------------------------

ProjectTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function ProjectTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  // const theme = useTheme();

  const {
    job_name,
    reference_no,
    revision_no,
    Customer_Name,
    Created_User_Full_Name,
    Revised_User_Full_Name,
    created_date,
    revised_date,
    status,
  } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover sx={{ borderBottom: '1px solid #a7b1bc' }} selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>{job_name}</TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>{reference_no}</TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>{revision_no}</TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}><Label color='default' variant='outlined'>{status}</Label></TableCell>

      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>{Customer_Name}</TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>{Created_User_Full_Name}</TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>{Revised_User_Full_Name}</TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>{created_date}</TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>{revised_date}</TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="delete">
            <Iconify icon='ic:outline-file-copy' />
          </IconButton>
          <IconButton aria-label="delete">
            <Iconify icon='mdi:trash-outline' />
          </IconButton>
        </Stack>
      </TableCell>
      {/* <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={(status === 'pending' && 'info') || 'success'}
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell> */}

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem sx={{ color: 'info.main' }} onClick={onEditRow}>
                <Iconify icon={'akar-icons:eye'} />
                View Project
              </MenuItem>
              <MenuItem sx={{ color: 'info.main' }}>
                <Iconify icon={'codicon:copy'} />
                Duplicate
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
