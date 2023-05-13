import * as React from 'react';
import { useState, useEffect } from 'react';
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

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

const ROLE_OPTIONS = ['All', 'Projects', 'By Others'];

const TABLE_HEAD = [
  { id: 'job_name', label: 'Project Name', align: 'left', width: 200 },
  { id: 'reference_no', label: 'Ref no.', align: 'left', width: 80 },
  { id: 'revision_no', label: 'Rev no.', align: 'left', width: 80 },
  { id: 'status', label: 'status', align: 'left', width: 80 },
  { id: 'Customer_Name', label: 'Rep', align: 'left', width: 120 },
  { id: 'Created_User_Full_Name', label: 'Created By', align: 'left', width: 100 },
  { id: 'Revised_User_Full_Name', label: 'Revisied By', align: 'left', width: 100 },
  { id: 'created_date', label: 'Date created', align: 'left', width: 140 },
  { id: 'revised_date', label: 'Date revised', align: 'left', width: 140 },
  { id: '', label: 'Actions', align: 'center', width: 30 },
  { id: '', width: 10 },
];

// ----------------------------------------------------------------------

export default function MyProjects() {
  const dispatch = useDispatch();

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

  const dense = true;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProjectsInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { projectList, isLoading, projectInitInfo } = useSelector((state) => state.projects);
  const tableData = projectList;

  const [openDuplicateSuccess, setOpenDuplicateSuccess] = useState(false);
  
  const handleDuplicateCloseSuccess = () => {
    setOpenDuplicateSuccess(false);
  };

  const [openSuccess, setOpenSuccess] = useState(false);
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const [openFail, setOpenFail] = useState(false);
  const handleCloseFail = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFail(false);
  };

  // console.log(projectInitInfo);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('All');

  const [newProjectDialogOpen, setNewProjectDialog] = useState(false);

  const handleClickNewProjectDialogOpen = () => {
    setNewProjectDialog(true);
  };

  const handleNewProjectDialogClose = () => {
    setNewProjectDialog(false);
  };

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

  const handleDeleteRow = () => {
    dispatch(deleteProject({ action: 'DELETE_ONE', projectId: deleteRowID }));
    setSelected([]);
    setDeleteRowID(-1);
    handleOneConfirmDialogClose(false);
  };

  const handleMultiConfirmDialogOpen = () => {
    setMultiConfirmDialogState(true);
  };

  const handleMultiConfirmDialogClose = () => {
    setMultiConfirmDialogState(false);
  };

  // eslint-disable-next-line no-unused-vars
  const { currentTab: filterStatus, onChangeTab: onChangeFilterStatus } = useTabs('All');

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleFilterRole = (value) => {
    setFilterRole(value);
  };

  const handleDeleteRows = () => {
    dispatch(deleteProject({ action: 'DELETE_MULTIPUL', projectIdData: selected }));
    setSelected([]);
    setMultiConfirmDialogState(false);
  };

  const handleDuplicate = (row) => {
    dispatch(duplicateProject(row));
    setOpenDuplicateSuccess(true);
  }

  const handleEditRow = (projectid) => {
    navigate(PATH_PROJECT.project(projectid, 'unitlist'));
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
  });

  const denseHeight = dense ? 52 : 72;

  const isNotFound =
    (!dataFiltered.length && !!filterName) || 
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  return isLoading ? (
    <Loading />
  ) : (
    <Page title="Projects">
      <RootStyle>
        <Container>
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
                    dense={dense}
                    numSelected={selected.length}
                    rowCount={tableData.length}
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
                        onDuplicate = {() => handleDuplicate(row)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}
                    <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />
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
          setOpenFail={()=> setOpenFail(true)}
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
        item.job_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.reference_no.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.revision_no.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.Customer_Name.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.User_Full_Name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.created_date.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        item.revised_date.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
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
