import React, { useState, useEffect, useRef } from 'react';
import { capitalCase } from 'change-case';
import { useLocation, useParams } from 'react-router';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Tab, Box, Tabs } from '@mui/material';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getInitUnitinfo } from '../redux/slices/unitReducer';
// routes
import { PATH_JOBS, PATH_JOB } from '../routes/paths';
// hooks
import useTabs from '../hooks/useTabs';
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
// sections
import { UnitEdit, Drawing, Layout, Selection } from '../sections/configureUnit';
import Loading from '../sections/Loading';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function SetUnitInfo() {
  const { themeStretch } = useSettings();
  const { jobId, unitId } = useParams();
  const { state } = useLocation();
  const dispatch = useDispatch();
  // console.log(state);
  const [isSelection, setIsSelection] = useState({state: false, event: undefined});

  const onSubmit = useRef();
  const { unitInfo } = useSelector((state) => state.unit);
  const { currentTab, onChangeTab } = useTabs('Unit Info');

  useEffect(() => {
    dispatch(
      getInitUnitinfo({
        intUserID: localStorage.getItem('userId'),
        intUAL: localStorage.getItem('UAL'),
        intJobID: jobId,
        intProductTypeID: state.intProductTypeID,
        intUnitTypeID: state.intUnitTypeID,
        intUnitNo: unitId === undefined ? -1 : unitId,
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeTabHandler = async (e, newValue) => {
    if (newValue === 'Selection' && isSelection !== 'Selection') {
      await setIsSelection({state: true, event: e});
      await onSubmit.current.click();
    } else {
      onChangeTab(e, newValue);
    }
  };

  const onChangeTabInChild = async () => {
    if (isSelection.state) {
      await setIsSelection({state: false, event: null});
      await onChangeTab(isSelection.event, 'Selection');
    }
  };

  const isLoading = JSON.stringify(unitInfo) === '{}';

  const ACCOUNT_TABS = !isLoading
    ? [
        {
          value: 'Unit Info',
          icon: <Iconify icon={'fa-brands:unity'} width={20} height={20} />,
          component: (
            <UnitEdit
              intUnitTypeID={state.intUnitTypeID.toString()}
              intProductTypeID={state.intProductTypeID}
              refSubmit={onSubmit}
              onChangeTab={onChangeTabInChild}
            />
          ),
        },
        {
          value: 'Layout',
          icon: <Iconify icon={'ant-design:layout-outlined'} width={20} height={20} />,
          component: <Layout intUnitTypeID={state.intUnitTypeID.toString()} intProductTypeID={state.intProductTypeID} />,
        },
        {
          value: 'Drawing',
          icon: <Iconify icon={'arcticons:grid-drawing-for-artist'} width={20} height={20} />,
          component: <Drawing />,
        },
        {
          value: 'Selection',
          icon: <Iconify icon={'mdi:selection-ellipse'} width={20} height={20} />,
          component: <Selection />,
        },
      ]
    : [];

  return isLoading ? (
    <Loading />
  ) : (
    <Page title="Unit: View">
      <RootStyle>
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading={currentTab}
            links={[
              { name: 'My Jobs', href: PATH_JOBS.root },
              { name: 'Job Dashboard', href: PATH_JOB.dashboard(jobId) },
              { name: currentTab },
            ]}
          />

          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={currentTab}
            onChange={onChangeTabHandler}
          >
            {ACCOUNT_TABS.map((tab) => (
              <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>

          <Box sx={{ mb: 5 }} />

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Container>
      </RootStyle>
    </Page>
  );
}
