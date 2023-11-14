import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
// @mui
import { Box, TableContainer, Table, TableBody, TablePagination, Tooltip, IconButton } from '@mui/material';
import { firstName } from 'src/_mock/name';
// hooks
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
import useTabs from '../../hooks/useTabs';
// roots
import { PATH_ACCOUNT } from '../../routes/paths';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { removeUser } from '../../redux/slices/AccountReducer';
// components
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../components/table';
import UserTableToolbar from './UserTableToolbar';
import UserTableRow from './UserTableRow';
import ConfirmDialog from '../dialog/ConfirmDialog';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'user_name', label: 'Username', align: 'left' },
  { id: 'first_name', label: 'First Name', align: 'left' },
  { id: 'last_name', label: 'Last Name', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'customer', label: 'Customer', align: 'left' },
  { id: 'access', label: 'Access', align: 'left' },
  { id: 'access_level', label: 'Access Level', align: 'left' },
  { id: 'access_pricing', label: 'Access Pricing', align: 'left' },
  { id: 'created_date', label: 'Created Date', align: 'left' },
  { id: '' },
];
// ------------------------------------------------------------------------

Users.propTypes = {
  toolbar: PropTypes.bool,
  checkbox: PropTypes.bool,
};

export default function Users({ toolbar = true, checkbox = true }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.account);

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
  const [tableData, setTableData] = useState([]);
  const [customerType, setCustomerType] = useState();
  const filterRole = 'All';
  // Delete one row
  const [isOneConfirmDialog, setOneConfirmDialogState] = useState(false);
  const [isOpenMultiConfirmDialog, setMultiConfirmDialogState] = useState(false);
  const [deleteRowID, setDeleteRowID] = useState(-1);

  useEffect(() => {
    setTableData(userList);
  }, [userList]);

  const handleOneConfirmDialogOpen = useCallback((id) => {
    setDeleteRowID(id);
    setOneConfirmDialogState(true);
  }, []);

  const handleOneConfirmDialogClose = useCallback(() => {
    setDeleteRowID(-1);
    setOneConfirmDialogState(false);
  }, []);

  const handleDeleteRow = useCallback(async () => {
    const data = await dispatch(removeUser({ action: 'DELETE_ONE', userId: deleteRowID }));
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
    if (selected) {
      const data = await dispatch(removeUser({ action: 'DELETE_MULTI', userIds: selected }));
      setTableData(data);
      setSelected([]);
      setMultiConfirmDialogState(false);
    }
  }, [dispatch, selected, setSelected]);

  const handleEditRow = useCallback(
    (row) => {
      navigate(PATH_ACCOUNT.edituser(row.id), row);
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
        customerType,
      }),
    [filterName, filterRole, filterStatus, order, orderBy, tableData, customerType]
  );

  const denseHeight = useMemo(() => (dense ? 52 : 72), [dense]);

  const isNotFound = useMemo(
    () =>
      (!filteredData.length && !!filterName) ||
      (!filteredData.length && !!filterRole) ||
      (!filteredData.length && !!filterStatus),
    [filterName, filterRole, filterStatus, filteredData.length]
  );

  const handleFilterByCustomerName = (customerType) => {
    setCustomerType(customerType);
  };

  return (
    <Box>
      {toolbar && (
        <UserTableToolbar
          filterName={filterName}
          onFilterName={handleFilterName}
          onFilterByCustomerName={handleFilterByCustomerName}
          userNum={filteredData.length}
          onDeleteSelectedData={handleMultiConfirmDialogOpen}
        />
      )}
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
              isCheckbox={checkbox}
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
                <UserTableRow
                  key={index}
                  row={row}
                  selected={selected.includes(row.id)}
                  isCheckbox={checkbox}
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

function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole, customerType }) {
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
        item.username.toLowerCase().indexOf(filterName.toLowerCase()) !== -1  ||
        item.first_name.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.last_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        (item.email && item.email.indexOf(filterName.toLowerCase()) !== -1 )||
        item.name.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.access.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.access_level.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.access_pricing.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.created_date.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
    
  }
  if (filterStatus !== 'All') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterRole !== 'All') {
    tableData = tableData.filter((item) => item.role === filterRole);
  }

  if (customerType && customerType !== "1") {
    tableData = tableData.filter((item) => item.customer_type_id.toString() === customerType.toString());
  }
  return tableData;
}
