import * as React from 'react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
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
  Alert,
  Snackbar,
} from '@mui/material';
// routes
import { PATH_PROJECTS, PATH_PROJECT } from '../routes/paths';
// hooks
import useTabs from '../hooks/useTabs';
import useTable, { getComparator, emptyRows } from '../hooks/useTable';
// redux
import { useSelector, useDispatch } from '../redux/store';
import { getAllBaseData } from '../redux/slices/BaseReducer';
import { getProjectsInfo, deleteProject, duplicateProject } from '../redux/slices/projectsReducer';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import Scrollbar from '../components/Scrollbar';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableLoadingData,
  TableSelectedActions,
} from '../components/table';
// sections
import { ProjectTableRow, ProjectTableToolbar } from '../sections/project-list';
import { NewProjectFormDialog, ConfirmDialog } from '../sections/dialog';
import Loading from '../sections/Loading';
// utils
import { ROLE_OPTIONS, TABLE_HEAD } from '../utils/constants';
import useAuth from '../hooks/useAuth';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

export default function MyProjects() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBaseData());
  }, [dispatch]);

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

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getProjectsInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { projectList: tableData, isLoading, projectInitInfo } = useSelector((state) => state.projects);

  const [openDuplicateSuccess, setOpenDuplicateSuccess] = useState(false);

  const handleDuplicateCloseSuccess = useCallback(() => {
    setOpenDuplicateSuccess(false);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('All');

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [newProjectDialogOpen, setNewProjectDialog] = useState(false);
  const [isOneConfirmDialog, setOneConfirmDialogState] = useState(false);
  const [isOpenMultiConfirmDialog, setMultiConfirmDialogState] = useState(false);
  const [deleteRowID, setDeleteRowID] = useState(-1);

  const handleCloseSuccess = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  }, []);

  const handleCloseFail = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFail(false);
  }, []);

  const handleClickNewProjectDialogOpen = useCallback(() => {
    setNewProjectDialog(true);
  }, []);

  const handleNewProjectDialogClose = useCallback(() => {
    setNewProjectDialog(false);
  }, []);

  const handleOneConfirmDialogOpen = useCallback((id) => {
    setDeleteRowID(id);
    setOneConfirmDialogState(true);
  }, []);

  const handleOneConfirmDialogClose = useCallback(() => {
    setDeleteRowID(-1);
    setOneConfirmDialogState(false);
  }, []);

  const handleDeleteRow = useCallback(() => {
    dispatch(deleteProject({ action: 'DELETE_ONE', projectId: deleteRowID }));
    setSelected([]);
    setDeleteRowID(-1);
    handleOneConfirmDialogClose(false);
  }, [deleteRowID, dispatch, handleOneConfirmDialogClose, setSelected]);

  const handleMultiConfirmDialogOpen = useCallback(() => {
    setMultiConfirmDialogState(true);
  }, []);

  const handleMultiConfirmDialogClose = useCallback(() => {
    setMultiConfirmDialogState(false);
  }, []);

  const handleFilterName = useCallback(
    (filterName) => {
      setFilterName(filterName);
      setPage(0);
    },
    [setPage]
  );

  const handleFilterRole = useCallback((value) => {
    setFilterRole(value);
  }, []);

  const handleDeleteRows = useCallback(() => {
    dispatch(deleteProject({ action: 'DELETE_MULTIPUL', projectIdData: selected }));
    setSelected([]);
    setMultiConfirmDialogState(false);
  }, [dispatch, selected, setSelected]);

  const handleDuplicate = useCallback(
    (row) => {
      dispatch(duplicateProject(row));
      setOpenDuplicateSuccess(true);
    },
    [dispatch]
  );

  const handleEditRow = useCallback(
    (projectid) => {
      navigate(PATH_PROJECT.project(projectid, 'unitlist'));
    },
    [navigate]
  );

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

  const isNotFound = useMemo(
    () =>
      (!dataFiltered.length && !!filterName) ||
      (!dataFiltered.length && !!filterRole) ||
      (!dataFiltered.length && !!filterStatus),
    [dataFiltered.length, filterName, filterRole, filterStatus]
  );

  const moveToVerificationPage = () => {
    navigate('/auth/email-verification');
  };

  if (isLoading) return <Loading />;

  return (
    <Page title="Projects">
      <RootStyle>
        <Container>
          {!Number(user?.verified || 0) && (
            <Alert sx={{ width: '100%', mt: 3 }} severity="warning">
              <b>You are not verified!</b> - Please check your email inbox, if you didn't receive the message,{' '}
              <a href="" onClick={moveToVerificationPage}>
                please resend verification link!
              </a>
              .
            </Alert>
          )}
          <Alert sx={{ width: '100%', mt: 3 }} severity="info">
            <b>Pricing module is now availble</b> - select Quote after making a selection to review and generate a PDF.
            All values shown are Net prices.
          </Alert>

          <HeaderBreadcrumbs
            heading="Projects"
            links={[{ name: 'Project Lists', href: PATH_PROJECTS.root }]}
            sx={{ mt: 5 }}
          />
          
          <Card>
            <ProjectTableToolbar
              filterName={filterName}
              filterRole={filterRole}
              onFilterName={handleFilterName}
              onFilterRole={handleFilterRole}
              onOpneDialog={handleClickNewProjectDialogOpen}
              optionsRole={ROLE_OPTIONS}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800, position: 'relative', overflowX: 'initial!important' }}>
                {selected.length > 0 && (
                  <TableSelectedActions
                    dense
                    numSelected={selected.length}
                    rowCount={tableData?.length || 0}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        tableData.map((row) => row.jobId)
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

                <Table size={'small'}>
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={tableData?.length || 0}
                    numSelected={selected?.length || 0}
                    onSort={onSort}
                    onSelectAllRows={(checked) =>
                      onSelectAllRows(
                        checked,
                        tableData.map((row) => row.id)
                      )
                    }
                  />
                  <TableBody>
                    {dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                      <ProjectTableRow
                        key={row.id}
                        row={row}
                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleOneConfirmDialogOpen(row.id)}
                        onDuplicate={() => handleDuplicate(row)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}
                    <TableEmptyRows height={52} emptyRows={emptyRows(page, rowsPerPage, tableData?.length || 0)} />
                    <TableLoadingData isLoading={isLoading} />
                    <TableNoData isNotFound={isNotFound} isLoading={isLoading} />
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
        </Container>
        <Snackbar open={openDuplicateSuccess} autoHideDuration={3000} onClose={handleDuplicateCloseSuccess}>
          <Alert onClose={handleDuplicateCloseSuccess} severity="success" sx={{ width: '100%' }}>
            Project duplicate successfully!
          </Alert>
        </Snackbar>
        <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess}>
          <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
            New project added success!
          </Alert>
        </Snackbar>
        <Snackbar open={openFail} autoHideDuration={3000} onClose={handleCloseFail}>
          <Alert onClose={handleCloseFail} severity="error" sx={{ width: '100%' }}>
            Server Error!
          </Alert>
        </Snackbar>
        <NewProjectFormDialog
          newProjectDialogOpen={newProjectDialogOpen}
          handleNewProjectDialogClose={handleNewProjectDialogClose}
          setOpenSuccess={() => setOpenSuccess(true)}
          setOpenFail={() => setOpenFail(true)}
          initialInfo={projectInitInfo}
        />
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
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName, filterStatus, filterRole }) {
  if (!tableData || tableData.length === 0) return [];
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
        item?.job_name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item?.reference_no?.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item?.revision_no?.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item?.Customer_Name?.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item?.User_Full_Name?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item?.created_date?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item?.revised_date?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'All') {
    tableData = tableData.filter((item) => item.status === filterStatus);
  }

  if (filterRole !== 'All') {
    if (filterRole === 'Projects') {
      tableData = tableData.filter((item) => item.created_user_id.toString() === localStorage.getItem('userId'));
    } else {
      tableData = tableData.filter((item) => item.created_user_id.toString() !== localStorage.getItem('userId'));
    }
  }

  return tableData;
}
