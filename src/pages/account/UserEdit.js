import { useState } from 'react';
import { useParams } from 'react-router-dom';
// yup
import * as Yup from 'yup';
// mui
import { styled } from '@mui/material/styles';
import { Stack, Grid, Container, Button, Snackbar, Alert, Divider } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { updateUser } from '../../redux/slices/AccountReducer';
// hooks
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';
// roots
import { PATH_ACCOUNT } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import GroupBox from '../../components/GroupBox';
import Iconify from '../../components/Iconify';
import { NewUserDialog, NewCustomerDialog } from '../../sections/account';

// ------------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ------------------------------------------------------------------------

export default function UserEdit() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { userList, customerType, fobPoint, customerList } = useSelector((state) => state.account);
  const selectedUser = userList.filter((user) => user.id === parseInt(userId, 10))[0];

  const UserSchema = Yup.object().shape({
    firstname: Yup.string().required('This field is required!'),
    lastname: Yup.string().required('This field is required!'),
    email: Yup.string().required('This field is required!'),
    username: Yup.string().required('This field is required!'),
    customerType: Yup.string().required('This field is required!'),
    customerId: Yup.string().required('This field is required!'),
    access: Yup.string().required('This field is required!'),
    accessLevel: Yup.string().required('This field is required!'),
    accessPricing: Yup.string().required('This field is required!'),
    fobPoint: Yup.string().required('This field is required!'),
    createdDate: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const defaultValues = {
    firstname: selectedUser?.first_name,
    lastname: selectedUser?.last_name,
    email: selectedUser?.email,
    username: selectedUser?.username,
    password: '',
    confirmPassword: '',
    customerType: selectedUser?.customer_type,
    customerId: selectedUser?.customer_id,
    access: selectedUser?.access,
    accessLevel: selectedUser?.access_level,
    accessPricing: selectedUser?.access_pricing,
    fobPoint: fobPoint[0]?.id,
    createdDate: selectedUser?.created_date,
  };

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues,
  });

  const {
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

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

  const onSubmit = async (data) => {
    try {
      await dispatch(updateUser({ ...data, userId }));
      setSuccessText('Successfully updated!');
      setSuccessDlgOpen(true);
    } catch (error) {
      setFailDlgOpen(true);
      console.error(error);
    }
  };

  return (
    <Page>
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <HeaderBreadcrumbs
              heading="Project Submittal"
              links={[
                { name: 'My account', href: PATH_ACCOUNT.account },
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

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={7}>
                <GroupBox title="USER INFO" bordersx={{ borderColor: 'gray' }}>
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
                        {customerType?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.items}
                          </option>
                        ))}
                        {!customerType && <option value="" />}
                      </RHFSelect>
                      <RHFSelect size="small" name="customerId" label="Customer name" placeholder="">
                        {customerList?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                        {!customerList && <option value="" />}
                      </RHFSelect>
                    </Stack>
                    <Stack direction="row" justifyContent="space-around" spacing={1}>
                      <RHFSelect size="small" name="access" label="Access" placeholder="">
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </RHFSelect>
                      <RHFSelect size="small" name="accessLevel" label="Access level" placeholder="">
                        <option value="10">Admin</option>
                        <option value="4">Internal Admin</option>
                        <option value="3">Internal 2</option>
                        <option value="2">Internal 1</option>
                        <option value="1">External</option>
                        <option value="5">External Special</option>
                      </RHFSelect>
                      <RHFSelect size="small" name="accessPricing" label="Access pricing" placeholder="">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </RHFSelect>
                    </Stack>
                    <RHFSelect size="small" name="fobPoint" label="FOB point" placeholder="">
                      {fobPoint?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                      {!fobPoint && <option value="" />}
                    </RHFSelect>
                    <RHFTextField size="small" name="createdDate" label="Created Date" />
                  </Stack>
                </GroupBox>
              </Grid>
              <Grid item xs={5}>
                <GroupBox title="UPDATE PASSWORD" bordersx={{ borderColor: 'gray' }}>
                  <Stack spacing={2} p={2}>
                    <RHFTextField size="small" type="password" name="password" label="Password" />
                    <RHFTextField size="small" type="password" name="confirmPassword" label="Confirm Password" />
                    <Stack direction="row" justifyContent="flex-end">
                      <LoadingButton
                        type="summit"
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
