import { useState, useEffect, useCallback, useMemo } from 'react';
import { capitalCase } from 'change-case';
import { useParams, useNavigate } from 'react-router';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Box, Tab, Tabs, Button, Stack, Snackbar, Alert } from '@mui/material';

// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

// hooks
import useTabs from '../hooks/useTabs';
import useAuth from '../hooks/useAuth';

// redux
import { getAccountInfo } from '../redux/slices/AccountReducer';
import { useDispatch } from '../redux/store';

// components
import { AccountGeneral, Users, Customers, NewUserDialog, NewCustomerDialog } from '../sections/account';
import Loading from '../sections/Loading';

// config
import { intUAL_Admin, intUAL_IntAdmin, intUAL_IntLvl_2 } from '../config';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------
export default function Account() {
  const { tab } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentTab, onChangeTab } = useTabs(tab || 'general');

  const [addUserDlgOpen, setAddUserDlgOpen] = useState(false);
  const [addCustomerDlgOpen, setAddCustomerDlgOpen] = useState(false);
  const [successDlgOpen, setSuccessDlgOpen] = useState(false);
  const [failDlgOpen, setFailDlgOpen] = useState(false);
  const [successText, setSuccessText] = useState('');
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const get = async () => {
      await dispatch(getAccountInfo());
      setIsloading(false);
    };
    get();
  }, [dispatch]);

  const onCloseUserDlg = useCallback(() => {
    setAddUserDlgOpen(false);
  }, []);

  const onCloseCustomerDlg = useCallback(() => {
    setAddCustomerDlgOpen(false);
  }, []);

  const onCloseSuccessDlgOpen = useCallback(() => {
    setSuccessDlgOpen(false);
  }, []);

  const onCloseFailDlgOpen = useCallback(() => {
    setFailDlgOpen(false);
  }, []);

  const onSuccessAddUser = useCallback(() => {
    setSuccessText('New user has been added');
    setSuccessDlgOpen(true);
  }, []);

  const onSuccessAddCustomer = useCallback(() => {
    setSuccessText('New customer has been added');
    setSuccessDlgOpen(true);
  }, []);

  const ACCOUNT_TABS = useMemo(() => {
    let tab = [
      {
        value: 'general',
        icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
        component: <AccountGeneral />,
      },
    ];

    const intUAL = parseInt(user?.UAL, 10);

    if (
      (intUAL === intUAL_Admin || intUAL === intUAL_IntLvl_2 || intUAL === intUAL_IntAdmin) &&
      Number(user.verified)
    ) {
      tab = [
        ...tab,
        {
          value: 'users',
          icon: <Iconify icon={'ph:users-three'} width={20} height={20} />,
          component: <Users />,
        },
        {
          value: 'customers',
          icon: <Iconify icon={'raphael:users'} width={20} height={20} />,
          component: <Customers />,
        },
      ];
    }

    return tab;
  }, [user?.UAL, user.verified]);

  const handleChangeTab = useCallback(
    (event, newValue) => {
      navigate(`/account/${newValue}`);
      onChangeTab(event, newValue);
    },
    [navigate, onChangeTab]
  );

  const moveToVerificationPage = () => {
    navigate('/auth/email-verification');
  };

  if (isLoading) return <Loading />;

  return (
    <Page title="User: Account Settings">
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <HeaderBreadcrumbs
            heading="My Account"
            links={[{ name: 'Edit Account' }]}
            action={
              (currentTab === 'users' || currentTab === 'customers') && (
                <Stack direction="row" justifyContent="center" spacing={1}>
                  <Button
                    color="primary"
                    variant="outlined"
                    startIcon={<Iconify icon="mdi:plus" />}
                    onClick={() => {
                      setAddCustomerDlgOpen(true);
                    }}
                  >
                    Add new customer
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={<Iconify icon="mdi:user" />}
                    onClick={() => {
                      setAddUserDlgOpen(true);
                    }}
                  >
                    Add new user
                  </Button>
                </Stack>
              )
            }
          />
          {!Number(user.verified) && (
            <Alert sx={{ width: '100%', mt: 3 }} severity="warning">
              <b>You are not verified!</b> - Please check your email inbox, if you didn't receive the message,{' '}
              <a href="" onClick={moveToVerificationPage}>
                please resend verification link!
              </a>
              .
            </Alert>
          )}
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={currentTab}
            onChange={handleChangeTab}
            sx={{marginTop: "16px"}}
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
        <Snackbar open={successDlgOpen} autoHideDuration={3000} onClose={onCloseSuccessDlgOpen}>
          <Alert onClose={onCloseSuccessDlgOpen} severity="success" sx={{ width: '100%' }}>
            {successText}
          </Alert>
        </Snackbar>
        <Snackbar open={failDlgOpen} autoHideDuration={3000} onClose={onCloseFailDlgOpen}>
          <Alert onClose={onCloseFailDlgOpen} severity="warning" sx={{ width: '100%' }}>
            Server error!
          </Alert>
        </Snackbar>
        <NewUserDialog
          open={addUserDlgOpen}
          onClose={onCloseUserDlg}
          onSuccess={onSuccessAddUser}
          onFail={() => setFailDlgOpen(true)}
        />
        <NewCustomerDialog
          open={addCustomerDlgOpen}
          onClose={onCloseCustomerDlg}
          onSuccess={onSuccessAddCustomer}
          onFail={() => setFailDlgOpen(true)}
        />
      </RootStyle>
    </Page>
  );
}
