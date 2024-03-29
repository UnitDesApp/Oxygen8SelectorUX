import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// @mui
import { m } from 'framer-motion';
import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Step,
  Stepper,
  Container,
  StepLabel,
  StepConnector,
  Typography,
  Button,
  Stack,
} from '@mui/material';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getProjectsAndUnitsInfo } from '../redux/slices/projectDashboardReducer';
// routes
import { PATH_PROJECT, PATH_PROJECTS } from '../routes/paths';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import { ProjectInfo, UnitList } from '../sections/project-dashboard';
import Loading from '../sections/Loading';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------
// , 'Make a selection', 'Submit drawing'
const STEPS = ['Complete project info', 'Add units'];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  top: 10,
  left: 'calc(-50% + 20px)',
  right: 'calc(50% + 20px)',
  '& .MuiStepConnector-line': {
    borderTopWidth: 2,
    borderColor: theme.palette.divider,
  },
  '&.Mui-active, &.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

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

export default function ProjectDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const { projectInfo, unitList, isLoading } = useSelector((state) => state.projectDashboard);

  console.log(projectInfo);

  useEffect(() => {
    dispatch(getProjectsAndUnitsInfo({ jobId: projectId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeStep = unitList.length > 0 ? 2 : 1;
  // const isComplete = activeStep === STEPS.length;

  const onClickRequestSubmittal = () => {
    navigate(PATH_PROJECT.submittal(projectId));
  };

  const onClickRequestQuote = () => {
    navigate(PATH_PROJECT.quote(projectId), { state: unitList.length });
  };

  return (
    <Page title="Project: Dashboard">
      <RootStyle>
        {isLoading ? (
          <Loading />
        ) : (
          <Container>
            <HeaderBreadcrumbs
              heading={projectInfo.job_name}
              links={[{ name: 'projects', href: PATH_PROJECTS.root }, { name: projectInfo.job_name }]}
            />
            <Card sx={{ padding: '50px', pb: '10px', pt: '20px', mb: 1 }}>
              <Grid container justifyContent={unitList.length > 0 ? 'center' : 'flex-start'}>
                <Grid item xs={12} md={6} sx={{ mb: 5, textAlign: 'left' }}>
                  <Box>
                    <m.div>
                      <Typography color="primary" variant="h5" sx={{ mb: 1 }}>
                        Project Status
                      </Typography>
                    </m.div>
                    <m.div>
                      <Typography sx={{ mb: 2 }}>
                        To request a submittal, you must complete the following 4 steps
                      </Typography>
                    </m.div>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ mb: 5, textAlign: { md: 'right', xs: 'left' } }}>
                  <Stack direction="row" justifyContent="right" spacing={1}>
                    <Button
                      variant="outlined"
                      startIcon={<Iconify icon={'material-symbols:request-quote'} />}
                      disabled={unitList.length === 0}
                      onClick={onClickRequestQuote}
                    >
                      Quote
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Iconify icon={'ant-design:mail-outlined'} />}
                      disabled={unitList.length === 0}
                      onClick={onClickRequestSubmittal}
                    >
                      submittal
                    </Button>
                  </Stack>
                </Grid>
                <Grid item xs={12} sx={{ mb: 5, textAlign: 'center' }}>
                  <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                    {STEPS.map((label) => (
                      <Step key={label}>
                        <StepLabel
                          StepIconComponent={StepIcon}
                          sx={{
                            '& .MuiStepLabel-label': {
                              typography: 'subtitle2',
                              color: 'text.disabled',
                            },
                          }}
                        >
                          {label}
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>
              </Grid>
            </Card>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <ProjectInfo projectInfo={projectInfo} />
              </Grid>
              <Grid item xs={12} md={8}>
                <UnitList />
              </Grid>
            </Grid>
          </Container>
        )}
      </RootStyle>
    </Page>
  );
}
