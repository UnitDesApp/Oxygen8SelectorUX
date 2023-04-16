import { useState } from 'react';
import { useNavigate } from 'react-router';

// @mui
import { Box, TableContainer, Table, TableBody, TablePagination, Tooltip, IconButton } from '@mui/material';

// hooks
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
import useTabs from '../../hooks/useTabs';

// redux
import { useSelector, useDispatch } from '../../redux/store';
import { removeCustomer } from '../../redux/slices/AccountReducer'
// root
import { PATH_ACCOUNT } from '../../routes/paths';

// components
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../components/table';
import CustomerTableToolbar from './CustomerTableToolbar';
import CustomerTableRow from './CustomerTableRow';
import ConfirmDialog from '../dialog/ConfirmDialog';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'address', label: 'Address', align: 'left' },
  // { id: 'access_level', label: 'Access Level', align: 'left' },
  // { id: 'access_pricing', label: 'Access Pricing', align: 'left' },
  { id: 'created_date', label: 'Created Date', align: 'left' },
  { id: '' },
];

// ------------------------------------------------------------------------

export default function Customers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customerList } = useSelector((state) => state.account);

  const dense = true;

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const [filterName, setFilterName] = useState('');
  const [tableData, setTableData] = useState(customerList);
  const [filterRole, setFilterRole] = useState('All');

  // Delete one row
  const [isOneConfirmDialog, setOneConfirmDialogState] = useState(false);
  const [isOpenMultiConfirmDialog, setMultiConfirmDialogState] = useState(false);
  const [deleteRowID, setDeleteRowID] = useState(-1);

  const handleOneConfirmDialogOpen = (id) => {
    setDeleteRowID(id);
    setOneConfirmDialogState(true);
  };

  const handleOneConfirmDialogClose = () => {
    setDeleteRowID(-1);
    setOneConfirmDialogState(false);
  };

  const handleDeleteRow = async () => {
    const data = await dispatch(removeCustomer({ action: 'DELETE_ONE', customerId: deleteRowID }));
    setTableData(data);
    setDeleteRowID(-1);
    handleOneConfirmDialogClose(false);
  };

  const handleMultiConfirmDialogOpen = () => {
    setMultiConfirmDialogState(true);
  };

  const handleMultiConfirmDialogClose = () => {
    setMultiConfirmDialogState(false);
  };

  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('All');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRows = async () => {
    const data = await dispatch(removeCustomer({ action: 'DELETE_MULTI', customerIds: selected }));
    setTableData(data);
    setSelected([]);
    setMultiConfirmDialogState(false);
  };

  const handleEditRow = (row) => {
    navigate(PATH_ACCOUNT.editCustomer(row.id));
  };

  const filteredData = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!filteredData.length && !!filterName) ||
    (!filteredData.length && !!filterRole) ||
    (!filteredData.length && !!filterStatus);

  return (
    <Box>
      <CustomerTableToolbar filterName={filterName} onFilterName={handleFilterName} userNum={filteredData.length} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
          {selected.length > 0 && (
            <TableSelectedActions
              numSelected={selected.length}
              onSelectAllRows={onSelectAllRows}
              rowCount={selected.length}
            />
          )}

          <Table size={'medium'}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              actions={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={() => handleMultiConfirmDialogOpen()}>
                    <Iconify icon={'eva:trash-2-outline'} />
                  </IconButton>
                </Tooltip>
              }
            />

            <TableBody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <CustomerTableRow
                  key={index}
                  row={row}
                  selected={selected.includes(row.id)}
                  onSelectRow={() => onSelectRow(row.id)}
                  onDeleteRow={() => handleOneConfirmDialogOpen(row.id)}
                  onEditRow={() => handleEditRow(row)}
                />
              ))}

              <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

              <TableNoData isNotFound={isNotFound} />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Box>

      <ConfirmDialog
        isOpen={isOneConfirmDialog}
        onClose={handleOneConfirmDialogClose}
        onConfirm={handleDeleteRow}
        isOneRow
      />
      <ConfirmDialog
        isOpen={isOpenMultiConfirmDialog}
        onClose={handleMultiConfirmDialogClose}
        onConfirm={handleDeleteRows}
        isOneRow={false}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = tableData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    tableData = tableData.filter((item) => Object.values(item).filter(
        (value) => value.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1
      ).length > 0);
  }

  if (filterStatus !== 'All') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterRole !== 'All') {
    tableData = tableData.filter((item) => item.role === filterRole);
  }

  return tableData;
}
