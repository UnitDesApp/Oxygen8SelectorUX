import { useState } from 'react';
import { capitalCase } from 'change-case';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Box, Tab, Tabs, Button, Stack, Snackbar, Alert } from '@mui/material';

// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

// hooks
import useTabs from '../hooks/useTabs';

// components
import { Users, Customers, NewUserDialog, NewCustomerDialog } from '../sections/my-account';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ----------------------------------------------------------------------

export default function MyAccount() {
  const { currentTab, onChangeTab } = useTabs('users');

  const [addUserDlgOpen, setAddUserDlgOpen] = useState(false);
  const [addCustomerDlgOpen, setAddCustomerDlgOpen] = useState(false);
  const [successDlgOpen, setSuccessDlgOpen] = useState(false);
  const [failDlgOpen, setFailDlgOpen] = useState(false);
  const [successText, setSuccessText] = useState('');
  const [failText, setFailText] = useState('');

  const onCloseUserDlg = () => {
    setAddUserDlgOpen(false);
  };

  const onCloseCustomerDlg = () => {
    setAddCustomerDlgOpen(false);
  };

  const onCloseSuccessDlgOpen = () => {
    setSuccessDlgOpen(false);
  };

  const onCloseFailDlgOpen = () => {
    setFailDlgOpen(false);
  };

  const onSuccessAddUser = () => {
    setSuccessText('New user has been added');
    setSuccessDlgOpen(true);
  };

  const onSuccessAddCustomer = () => {
    setSuccessText('New customer has been added');
    setSuccessDlgOpen(true);
  };

  const ACCOUNT_TABS = [
    {
      value: 'users',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Users />,
    },
    {
      value: 'customers',
      icon: <Iconify icon={'typcn:group'} width={20} height={20} />,
      component: <Customers />,
    },
  ];
  return (
    <Page title="User: Account Settings">
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <HeaderBreadcrumbs
            heading="My Account"
            links={[{ name: 'Edit Account' }]}
            action={
              <Stack direction="row" justifyContent="center" spacing={1}>
                <Button
                  color="primary"
                  variant="outlined"
                  startIcon={<Iconify icon="mdi:plus" />}
                  onClick={() => {
                    setAddUserDlgOpen(true);
                  }}
                >
                  Add new customer
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<Iconify icon="mdi:user" />}
                  onClick={() => {
                    setAddCustomerDlgOpen(true);
                  }}
                >
                  Add new user
                </Button>
              </Stack>
            }
          />

          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={currentTab}
            onChange={onChangeTab}
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
          <Alert onClose={onCloseFailDlgOpen} severity="success" sx={{ width: '100%' }}>
            Server error!
          </Alert>
        </Snackbar>
        <NewUserDialog
          open={addUserDlgOpen}
          onClose={onCloseUserDlg}
          onSuccess={onSuccessAddUser}
          onFail={() => setFailText(true)}
        />
        <NewCustomerDialog
          open={addCustomerDlgOpen}
          onClose={onCloseCustomerDlg}
          onSuccess={onSuccessAddCustomer}
          onFail={() => setFailText(true)}
        />
      </RootStyle>
    </Page>
  );
}
