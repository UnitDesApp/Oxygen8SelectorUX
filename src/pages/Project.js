import PropTypes from 'prop-types';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { capitalCase } from 'change-case';
import { useParams, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Container, Tab, Tabs, Button, Stack, LinearProgress } from '@mui/material';
// hooks
import useTabs from '../hooks/useTabs';
// import useSettings from '../hooks/useSettings';
import { useSelector, useDispatch } from '../redux/store';
import { getProjectsAndUnitsInfo } from '../redux/slices/projectDashboardReducer';
// routes
import { PATH_PROJECT, PATH_PROJECTS, PATH_UNIT } from '../routes/paths';
// redux
import { getAllBaseData } from '../redux/slices/BaseReducer';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import { UnitList, ProjectDetail, Quote, SubmittalInternal, Status, Notes } from '../sections/project-dashboard';
import { ReportDialog } from '../sections/dialog';
import useAuth from '../hooks/useAuth';
// ----------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(13),
  },
}));

// ----------------------------------------------------------------------
StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

function StepIcon({ active, completed }) {
  return (
    <Box
      sx={{
        zIndex: 9,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: active ? 'primary.main' : 'text.disabled',
      }}
    >
      {completed ? (
        <Iconify icon={'akar-icons:circle-check'} sx={{ zIndex: 1, width: 20, height: 20, color: 'primary.main' }} />
      ) : (
        <Iconify
          icon={'ant-design:close-circle-outlined'}
          sx={{ zIndex: 1, width: 20, height: 20, color: 'darkred' }}
        />
      )}
    </Box>
  );
}

export default function Project() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId, pageId } = useParams();
  const { projectInfo, isLoading } = useSelector((state) => state.projectDashboard);
  const { data } = useSelector((state) => state.base);
  const [openRPDialog, setOpenRPDialog] = useState(false);
  const { user } = useAuth();

  const openDialog = useCallback(() => {
    setOpenRPDialog(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpenRPDialog(false);
  }, []);

  useEffect(() => {
    const getAllData = async () => {
      await dispatch(getProjectsAndUnitsInfo({ jobId: projectId }));
      if (!data) {
        await dispatch(getAllBaseData());
      }
    };

    getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { currentTab, onChangeTab } = useTabs(pageId);

  const onChangeTabHandle = useCallback(
    (e, newId) => {
      navigate(PATH_PROJECT.project(projectId, newId));
      onChangeTab(e, newId);
    },
    [navigate, onChangeTab, projectId]
  );

  const onClickAddNewUnit = useCallback(() => {
    navigate(PATH_UNIT.add(projectId));
  }, [navigate, projectId]);

  const ACCOUNT_TABS = useMemo(
    () => [
      {
        value: 'unitlist',
        title: 'Unit list',
        component: <UnitList />,
      },
      {
        value: 'project_detail',
        title: 'Project detail',
        component: <ProjectDetail projectInfo={projectInfo} />,
      },
      ...(Number(user?.verified)
        ? [
            {
              value: 'quote',
              title: 'Quote',
              component: <Quote />,
            },
            {
              value: 'submittal',
              title: 'Submittal(internal)',
              component: <SubmittalInternal />,
            },
          ]
        : []),
      {
        value: 'status',
        title: 'Status',
        component: <Status />,
      },
      ...(Number(user?.verified)
        ? [
            {
              value: 'notes',
              title: 'Notes',
              component: <Notes />,
            },
          ]
        : []),
    ],
    [projectInfo]
  );

  return (
    <Page title="Project: Dashboard">
      <RootStyle>
        {isLoading ? (
          <LinearProgress color="info" />
        ) : (
          <Container>
            <HeaderBreadcrumbs
              heading={projectInfo.job_name}
              links={[{ name: 'projects', href: PATH_PROJECTS.root }, { name: projectInfo.job_name }]}
              action={
                <Stack spacing={2} direction="row" alignItems="flex-end" sx={{ mt: 3 }}>
                  <Button
                    variant="text"
                    startIcon={<Iconify icon={'bxs:download'} />}
                    onClick={openDialog}
                    disabled={!Number(user?.verified)}
                  >
                    Export report
                  </Button>
                  <Button
                    disabled={!Number(user?.verified)}
                    variant="contained"
                    startIcon={<Iconify icon={'eva:plus-fill'} />}
                    onClick={onClickAddNewUnit}
                  >
                    Add new unit
                  </Button>
                </Stack>
              }
            />
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTabHandle}
            >
              {ACCOUNT_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} label={capitalCase(tab.title)} icon={tab.icon} value={tab.value} />
              ))}
            </Tabs>

            <Box sx={{ mb: 5 }} />

            {ACCOUNT_TABS.map((tab) => {
              const isMatched = tab.value === currentTab;
              return isMatched && <Box key={tab.value}>{tab.component}</Box>;
            })}
            <ReportDialog isOpen={openRPDialog} onClose={closeDialog} intProjectID={projectId} intProjectNO={1} />
          </Container>
        )}
      </RootStyle>
    </Page>
  );
}
