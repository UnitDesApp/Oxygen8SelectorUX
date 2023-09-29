import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
// @mui
import { Box, TableContainer, Table, TableBody, TablePagination, Tooltip, IconButton } from '@mui/material';
// hooks
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
import useTabs from '../../hooks/useTabs';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { removeCustomer } from '../../redux/slices/AccountReducer';
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
  { id: 'name', label: 'Customer Name', align: 'left' },
  { id: 'customer_type', label: 'Customer Type', align: 'left' },
  { id: 'add_text', label: 'Region', align: 'left' },
  { id: 'shipping_factor', label: 'Shipping Factor', align: 'left' },
  { id: 'address', label: 'Address', align: 'left' },
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
  const filterRole = useState('All');

  // Delete one row
  const [isOneConfirmDialog, setOneConfirmDialogState] = useState(false);
  const [isOpenMultiConfirmDialog, setMultiConfirmDialogState] = useState(false);
  const [deleteRowID, setDeleteRowID] = useState(-1);

  const handleOneConfirmDialogOpen = useCallback((id) => {
    setDeleteRowID(id);
    setOneConfirmDialogState(true);
  }, []);

  const handleOneConfirmDialogClose = useCallback(() => {
    setDeleteRowID(-1);
    setOneConfirmDialogState(false);
  }, []);

  const handleDeleteRow = useCallback(async () => {
    const data = await dispatch(removeCustomer({ action: 'DELETE_ONE', customerId: deleteRowID }));
    setTableData(data);
    setDeleteRowID(-1);
    handleOneConfirmDialogClose(false);
  }, [deleteRowID, dispatch, handleOneConfirmDialogClose]);

  const handleMultiConfirmDialogOpen = useCallback(() => {
    setMultiConfirmDialogState(true);
  }, []);

  const handleMultiConfirmDialogClose = useCallback(() => {
    setMultiConfirmDialogState(false);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('All');

  const handleFilterName = useCallback(
    (filterName) => {
      setFilterName(filterName);
      setPage(0);
    },
    [setPage]
  );

  const handleDeleteRows = useCallback(async () => {
    if (selected.length > 0) {
      const data = await dispatch(removeCustomer({ action: 'DELETE_MULTI', customerIds: selected }));
      setTableData(data);
      setSelected([]);
      setMultiConfirmDialogState(false);
    }
  }, [dispatch, selected, setSelected]);

  const handleEditRow = useCallback(
    (row) => {
      navigate(PATH_ACCOUNT.editCustomer(row.id));
    },
    [navigate]
  );

  const filteredData = useMemo(
    () =>
      applySortFilter({
        tableData,
        comparator: getComparator(order, orderBy),
        filterName,
        filterRole,
        filterStatus,
      }),
    [filterName, filterRole, filterStatus, order, orderBy, tableData]
  );

  const denseHeight = useMemo(() => (dense ? 52 : 72), [dense]);

  const isNotFound = useMemo(
    () =>
      (!filteredData.length && !!filterName) ||
      (!filteredData.length && !!filterRole) ||
      (!filteredData.length && !!filterStatus),
    [filterName, filterRole, filterStatus, filteredData.length]
  );

  return (
    <Box>
      <CustomerTableToolbar
        filterName={filterName}
        onFilterName={handleFilterName}
        userNum={filteredData.length}
        onDeleteSelectedData={handleMultiConfirmDialogOpen}
      />
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
    tableData = tableData.filter(
      (item) =>
        Object.values(item).filter((value) => value.toString().toLowerCase().includes(filterName.toLowerCase()))
          .length > 0
    );
  }

  if (filterStatus !== 'All') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  return tableData;
}
