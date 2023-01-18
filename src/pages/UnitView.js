// react
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getJobsAndUnitsInfo } from '../redux/slices/jobDashboardReducer';
// routes
import { PATH_JOBS, PATH_JOB } from '../routes/paths';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import { UnitList } from '../sections/unitView';
import Loading from '../sections/Loading';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function ViewUnitInfo() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { jobId } = useParams();

  const { isLoading } = useSelector((state) => state.jobDashboard);

  useEffect(() => {
    dispatch(getJobsAndUnitsInfo({ jobId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <Page title="Unit: View">
      <RootStyle>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={'Unit View'}
            links={[
              { name: 'My Jobs', href: PATH_JOBS.root },
              { name: 'Job Dashboard', href: PATH_JOB.dashboard(jobId) },
              { name: 'Unit Info' },
            ]}
          />
          <UnitList />
        </Container>
      </RootStyle>
    </Page>
  );
}
