import { useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';

// @mui
import { Box, TableContainer, Table, TableBody, TablePagination, Tooltip, IconButton } from '@mui/material';

// hooks
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
import useTabs from '../../hooks/useTabs';

// roots
import { PATH_ACCOUNT } from '../../routes/paths';

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

  const userlist = [1, 2, 3, 4, 5, 6].map((id) => ({
    id,
    user_name: 'jdoe123',
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'jeoe@doe.com',
    customer: 'ABC',
    access: 'Yes',
    access_level: '1',
    access_pricing: 'No',
    created_date: '2023-01-06',
  }));

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
  const [tableData, setTableData] = useState(userlist);
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
    console.log(deleteRowID);
    // const data = await deleteUnits({ action: 'DELETE_ONE', jobId, unitId: deleteRowID });
    // setTableData(data);
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
    // const data = await deleteUnits({ action: 'DELETE_MULTI', jobId, unitIds: selected });
    // setTableData(data);
    setSelected([]);
    setMultiConfirmDialogState(false);
  };

  const handleEditRow = (row) => {
    console.log(row);
    navigate(PATH_ACCOUNT.edituser, { ...row });
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
      {toolbar && (
        <UserTableToolbar filterName={filterName} onFilterName={handleFilterName} userNum={filteredData.length} />
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
        item.user_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.first_name.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.last_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.email.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.customer.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'All') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterRole !== 'All') {
    tableData = tableData.filter((item) => item.role === filterRole);
  }

  return tableData;
}
