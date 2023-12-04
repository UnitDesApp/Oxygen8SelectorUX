import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Stack, IconButton } from '@mui/material';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 30,
  height: 30,
  color: theme.palette.primary.main,
}));

// ----------------------------------------------------------------------

UserTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  isCheckbox: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function UserTableRow({ row, selected, isCheckbox = true, onEditRow, onSelectRow, onDeleteRow }) {
  const { username, first_name, last_name, email, customer, access, access_level, access_pricing, created_date } = row;

  return (
    <TableRow hover sx={{ borderBottom: '1px solid #a7b1bc' }} selected={selected}>
      {isCheckbox && (
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
      )}

      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {username}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {first_name}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {last_name}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {email}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {customer}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {access}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {access_level}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {access_pricing}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {created_date}
      </TableCell>
      <TableCell align="right">
        <Stack direction="row">
          <StyledIconButton onClick={onEditRow}>
            <Iconify icon={'fa-solid:pen'} />
          </StyledIconButton>
          <StyledIconButton onClick={() => onDeleteRow()}>
            <Iconify icon={'eva:trash-2-outline'} />
          </StyledIconButton>
        </Stack>
      </TableCell>
    </TableRow>
  );
}
