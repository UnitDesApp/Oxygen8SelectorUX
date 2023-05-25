// react
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
// @mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getProjectsAndUnitsInfo } from '../redux/slices/projectDashboardReducer';
// routes
import { PATH_PROJECTS, PATH_PROJECT } from '../routes/paths';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import { UnitList } from '../sections/unit-list';
import Loading from '../sections/Loading';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

export default function ViewUnitInfo() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const { isLoading } = useSelector((state) => state.projectDashboard);

  useEffect(() => {
    dispatch(getProjectsAndUnitsInfo({ projectId }));
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
              { name: 'Projects', href: PATH_PROJECTS.root },
              { name: 'Dashboard', href: PATH_PROJECT.dashboard(projectId) },
              { name: 'Unit Info' },
            ]}
          />
          <UnitList />
        </Container>
      </RootStyle>
    </Page>
  );
}
