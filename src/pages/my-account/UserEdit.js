import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// yup
import * as Yup from 'yup';
// mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Grid, Container, Button, Snackbar, Alert, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// hooks
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';
// roots
import { PATH_ACCOUNT } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import GroupBox from '../../components/GroupBox';
import Iconify from '../../components/Iconify';
import { NewUserDialog, NewCustomerDialog } from '../../sections/my-account';

// ------------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ------------------------------------------------------------------------

export default function UserEdit() {
  const navigate = useNavigate();
  const { state } = useParams();

  const NewUserSchema = Yup.object().shape({
    firstname: Yup.string().required('This field is required!'),
    lastname: Yup.string().required('This field is required!'),
    email: Yup.string().required('This field is required!'),
    username: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
    customerType: Yup.string().required('This field is required!'),
    customerName: Yup.string().required('This field is required!'),
    access: Yup.string().required('This field is required!'),
    accessLevel: Yup.string().required('This field is required!'),
    accessPricing: Yup.string().required('This field is required!'),
    fobPoint: Yup.string().required('This field is required!'),
    createdDate: Yup.string().required('This field is required!'),
  });

  const defaultValues = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    customerType: '',
    customerName: '',
    access: '',
    accessLevel: '',
    accessPricing: '',
    fobPoint: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const [addUserDlgOpen, setAddUserDlgOpen] = useState(false);
  const [addCustomerDlgOpen, setAddCustomerDlgOpen] = useState(false);
  const [successDlgOpen, setSuccessDlgOpen] = useState(false);
  const [failDlgOpen, setFailDlgOpen] = useState(false);
  const [successText, setSuccessText] = useState('');

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

  return (
    <Page>
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <HeaderBreadcrumbs
              heading="Project Submittal"
              links={[
                { name: 'My account', href: PATH_ACCOUNT.myAccount },
                { name: 'Users', href: PATH_ACCOUNT.users },
                { name: '' },
              ]}
              action={
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
              }
            />

            <Grid container spacing={2}>
              <Grid item xs={7}>
                <GroupBox title="USE INFO" bordersx={{ borderColor: 'gray' }}>
                  <Stack spacing={2} p={2}>
                    <Stack direction="row" justifyContent="space-around" spacing={1}>
                      <RHFTextField size="small" name="firstname" label="First Name" />
                      <RHFTextField size="small" name="lastname" label="Last Name" />
                    </Stack>
                    <RHFTextField size="small" name="email" label="Email" />
                    <RHFTextField size="small" name="username" label="User Name" />
                    <Divider />
                    <Stack direction="row" justifyContent="space-around" spacing={1}>
                      <RHFSelect size="small" name="customerType" label="Customer type" placeholder="">
                        <option value="Internal" />
                        <option value="External" />
                      </RHFSelect>
                      <RHFSelect size="small" name="customerName" label="Customer name" placeholder="">
                        <option value="N/A" />
                        <option value="John" />
                        <option value="James" />
                        <option value="Joey" />
                      </RHFSelect>
                    </Stack>
                    <Stack direction="row" justifyContent="space-around" spacing={1}>
                      <RHFSelect size="small" name="access" label="Access" placeholder="">
                        <option value="Yes" />
                        <option value="No" />
                      </RHFSelect>
                      <RHFSelect size="small" name="accessLevel" label="Access level" placeholder="">
                        <option value="Internal User" />
                        <option value="External User" />
                      </RHFSelect>
                      <RHFSelect size="small" name="accessPricing" label="Access pricing" placeholder="">
                        <option value="No" />
                        <option value="Yes" />
                      </RHFSelect>
                    </Stack>
                    <RHFSelect size="small" name="fobPoint" label="FOB point" placeholder="">
                      <option value="Vancouver" />
                      <option value="Harvard" />
                    </RHFSelect>
                    <RHFTextField size="small" name="createDate" label="Created Date" />
                  </Stack>
                </GroupBox>
              </Grid>
              <Grid item xs={5}>
                <GroupBox title="UPDATE PASSWORD" bordersx={{ borderColor: 'gray' }}>
                  <Stack spacing={2} p={2}>
                    <RHFTextField size="small" type="password" name="password" label="Password" />
                    <RHFTextField size="small" type="password" name="confirm_password" label="Confirm Password" />
                    <Stack direction="row" justifyContent="flex-end">
                      <LoadingButton
                        loading={isSubmitting}
                        variant="contained"
                        color="primary"
                        onClick={() => console.log(getValues())}
                      >
                        Update
                      </LoadingButton>
                    </Stack>
                  </Stack>
                </GroupBox>
              </Grid>
            </Grid>
          </FormProvider>
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
