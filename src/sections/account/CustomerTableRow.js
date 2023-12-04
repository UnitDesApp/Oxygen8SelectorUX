import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
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

CustomerTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function CustomerTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const { name, items, address, shipping_factor_percent, region } = row;

  return (
    <TableRow hover sx={{ borderBottom: '1px solid #a7b1bc' }} selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {name}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {items}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {region}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {shipping_factor_percent}
      </TableCell>
      <TableCell align="left" sx={{ cursor: 'pointer' }} onClick={onEditRow}>
        {address}
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
