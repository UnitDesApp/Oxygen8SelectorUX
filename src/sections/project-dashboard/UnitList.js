import * as React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import {
  Box,
  Card,
  Table,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  Snackbar,
  Alert,
} from '@mui/material';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteUnits, duplicateUnit, multiDuplicateUnits } from '../../redux/slices/projectDashboardReducer';
// hooks
import useTabs from '../../hooks/useTabs';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
import useAuth from '../../hooks/useAuth';
// components
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../components/table';
// sections
import UnitTableToolbar from './UnitTableToolbar';
import UnitTableRow from './UnitTableRow';
import ConfirmDialog from '../dialog/ConfirmDialog';
import { PATH_UNIT } from '../../routes/paths';
// ----------------------------------------------------------------------

const SORT_OPTIONS = ['tag', 'qty', 'type', 'modal', 'cfm'];

const TABLE_HEAD = [
  { id: 'tag', label: 'Tag', align: 'left' },
  { id: 'qty', label: 'Qty', align: 'left' },
  { id: 'type', label: 'Type', align: 'left' },
  { id: 'modal', label: 'Modal', align: 'left' },
  { id: 'cfm', label: 'CFM', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function UnitList() {
  const { projectId } = useParams();
  const { unitList } = useSelector((state) => state.projectDashboard);
  const { user } = useAuth();
  const dispatch = useDispatch();

  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const dense = true;

  const navigate = useNavigate();

  const [tableData, setTableData] = useState(unitList);
  const [filterName, setFilterName] = useState('');
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openVerifyAlert, setOpenVerifyAlert] = useState(false);
  const filterRole = 'All';

  const handleOpenVerifyAlert = () => {
    setOpenVerifyAlert(true);
  };

  const handleCloseVerifyAlert = () => {
    setOpenVerifyAlert(false);
  };

  useEffect(() => {
    setTableData(unitList);
  }, [unitList]);

  // Delete one row
  const [isOneConfirmDialog, setOneConfirmDialogState] = React.useState(false);
  const [isOpenMultiConfirmDialog, setMultiConfirmDialogState] = React.useState(false);
  const [deleteRowID, setDeleteRowID] = React.useState(-1);

  const handleCloseSuccess = useCallback(() => {
    setOpenSuccess(false);
  }, []);

  const handleOneConfirmDialogOpen = useCallback((id) => {
    setDeleteRowID(id);
    setOneConfirmDialogState(true);
  }, []);

  const handleOneConfirmDialogClose = useCallback(() => {
    setDeleteRowID(-1);
    setOneConfirmDialogState(false);
  }, []);

  const handleDeleteRow = useCallback(async () => {
    const data = await deleteUnits({ action: 'DELETE_ONE', projectId, unitId: deleteRowID });
    setTableData(data);
    setDeleteRowID(-1);
    handleOneConfirmDialogClose(false);
  }, [deleteRowID, handleOneConfirmDialogClose, projectId]);

  const handleMultiConfirmDialogOpen = useCallback(() => {
    setMultiConfirmDialogState(true);
  }, []);

  const handleMultiConfirmDialogClose = useCallback(() => {
    setMultiConfirmDialogState(false);
  }, []);

  const { currentTab: filterStatus /* onChangeTab: onChangeFilterStatus */ } = useTabs('All');

  const handleFilterName = useCallback(
    (filterName) => {
      setFilterName(filterName);
      setPage(0);
    },
    [setPage]
  );

  const handleDeleteRows = useCallback(async () => {
    const data = await deleteUnits({ action: 'DELETE_MULTI', projectId, unitIds: selected });
    setTableData(data);
    setSelected([]);
    setMultiConfirmDialogState(false);
  }, [projectId, selected, setSelected]);

  const handleEditRow = useCallback(
    (row) => {
      if (Number(user?.verified)) {
        navigate(PATH_UNIT.edit(projectId, row.unit_no), {
          state: { ...row, intUnitTypeID: row.unit_nbr, intProductTypeID: row.product_type_id },
        });
      } else {
        handleOpenVerifyAlert();
      }
    },
    [navigate, projectId]
  );

  const onDuplicate = useCallback(
    (row) => {
      dispatch(duplicateUnit({ ...row, job_id: projectId }));
      setOpenSuccess(true);
    },
    [dispatch, projectId]
  );

  const onMultiDuplicate = useCallback(async () => {
    if (selected.length > 0) {
      await dispatch(multiDuplicateUnits({ unitIds: selected, projectId }));
      setOpenSuccess(true);
    }
  }, [dispatch, projectId, selected]);

  const dataFiltered = useMemo(
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

  const moveToVerificationPage = () => {
    navigate('/auth/email-verification');
  };

  const denseHeight = dense ? 52 : 72;

  const isNotFound = useMemo(
    () =>
      (!dataFiltered.length && !!filterName) ||
      (!dataFiltered.length && !!filterRole) ||
      (!dataFiltered.length && !!filterStatus),
    [dataFiltered.length, filterName, filterRole, filterStatus]
  );

  return (
    <Container>
      <Card>
        <UnitTableToolbar
          filterName={filterName}
          filterRole={filterRole}
          onDeleteRows={() => setMultiConfirmDialogState(true)}
          onFilterName={handleFilterName}
          onDuplicate={onMultiDuplicate}
          onSort={onSort}
          unitCount={tableData.length}
          sortOptions={SORT_OPTIONS}
        />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
            {selected.length > 0 && (
              <TableSelectedActions
                dense={dense}
                numSelected={selected.length}
                rowCount={tableData.length}
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row) => row.unit_no)
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
            )}

            <Table size={dense ? 'small' : 'medium'}>
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
                    tableData.map((row) => row.unit_no)
                  )
                }
              />

              <TableBody>
                {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                  <UnitTableRow
                    key={index}
                    row={row}
                    selected={selected.includes(row.unit_no)}
                    onSelectRow={() => onSelectRow(row.unit_no)}
                    onDuplicate={() => onDuplicate(row)}
                    onDeleteRow={() => handleOneConfirmDialogOpen(row.unit_no)}
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
            count={dataFiltered.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
          />
        </Box>
      </Card>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          Unit is duplicated successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={openVerifyAlert} autoHideDuration={3000} onClose={handleCloseVerifyAlert}>
        <Alert onClose={handleCloseVerifyAlert} severity="error" sx={{ width: '100%' }}>
          Please verify your email to see the details of unit!{' '}
          <a href="" onClick={moveToVerificationPage}>
            please resend verification link!
          </a>
        </Alert>
      </Snackbar>
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
    </Container>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole }) {
  const stabilizedThis = tableData?.map((el, index) => [el, index]);

  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis?.map((el) => el[0]);

  if (filterName) {
    tableData = tableData?.filter(
      (item) =>
        item.tag.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.qty.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.unit_type.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.unit_model.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.cfm.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1
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
