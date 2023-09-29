import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
// @mui
import { Checkbox, TableRow, TableCell, MenuItem, Stack, IconButton } from '@mui/material';
// components
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import { TableMoreMenu } from '../../components/table';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

const statusArr = ['draft', 'quoted', 'released', 'closed'];

ProjectTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDuplicate: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function ProjectTableRow({ row, selected, onEditRow, onSelectRow, onDuplicate, onDeleteRow }) {
  const { job_name, reference_no, revision_no, Customer_Name, User_Full_Name, created_date, revised_date, status } = row;

  const { user } = useAuth();

  const statusValue = statusArr[status || 0];

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = useCallback((event) => {
    setOpenMenuActions(event.currentTarget);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpenMenuActions(null);
  }, []);

  return (
    <TableRow hover sx={{ borderBottom: '1px solid #a7b1bc' }} selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {job_name}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {reference_no}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {revision_no}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        <Label color={statusValue === 'draft' ? 'default' : statusValue} sx={{ borderRadius: '15px' }} variant="filled">
          {statusValue}
        </Label>
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {Customer_Name}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {User_Full_Name}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {User_Full_Name}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {created_date}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {revised_date}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }}>
        <Stack direction="row" spacing={1}>
          <IconButton disabled={!Number(user?.verified)} aria-label="delete" onClick={onDuplicate}>
            <Iconify icon="ic:outline-file-copy" />
          </IconButton>
          <IconButton disabled={!Number(user?.verified)} aria-label="delete" onClick={onDeleteRow}>
            <Iconify icon="mdi:trash-outline" />
          </IconButton>
        </Stack>
      </TableCell>
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
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
