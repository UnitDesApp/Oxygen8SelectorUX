import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// yup
import * as Yup from 'yup';
// mui
import { styled } from '@mui/material/styles';
import {
  Stack,
  Container,
  Button,
  Snackbar,
  Alert,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { updateCustomer } from '../../redux/slices/AccountReducer';
// hooks
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';
// roots
import { PATH_ACCOUNT } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Iconify from '../../components/Iconify';
import { NewUserDialog, NewCustomerDialog, Users } from '../../sections/account';

// ------------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

// ------------------------------------------------------------------------

export default function UserEdit() {
  const { customerId } = useParams();
  const dispatch = useDispatch();
  const { customerList, customerType, fobPoint, country } = useSelector((state) => state.account);

  const selectedCustomer = customerList.filter((cusstomer) => cusstomer.id === parseInt(customerId, 10))[0];
  console.log(selectedCustomer);
  const NewUserSchema = Yup.object().shape({
    username: Yup.string().required('This field is required!'),
    customerType: Yup.number().required('This field is required!'),
    countryId: Yup.number().required('This field is required!'),
    address: Yup.string().required('This field is required!'),
    contactName: Yup.string().required('This field is required!'),
    fobPoint: Yup.number().required('This field is required!'),
    shippingFactor: Yup.number().required('This field is required!'),
    createdDate: Yup.string().required('This field is required!'),
  });

  const defaultValues = {
    username: selectedCustomer?.name,
    customerType: selectedCustomer?.customer_type_id,
    countryId: selectedCustomer?.country_id,
    address: selectedCustomer?.address,
    contactName: selectedCustomer?.contact_name,
    fobPoint: selectedCustomer?.fob_point_id,
    shippingFactor: selectedCustomer?.shipping_factor_percent,
    createdDate: selectedCustomer?.created_date,
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

  const [addUserDlgOpen, setAddUserDlgOpen] = useState(false);
  const [addCustomerDlgOpen, setAddCustomerDlgOpen] = useState(false);
  const [successDlgOpen, setSuccessDlgOpen] = useState(false);
  const [failDlgOpen, setFailDlgOpen] = useState(false);
  const [successText, setSuccessText] = useState('');
  const [expanded, setExpanded] = useState({ panel1: true, panel2: true });

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
      await dispatch(updateCustomer({ ...data, customerId }));
      setSuccessText('Successfully Updated');
      setSuccessDlgOpen(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Page>
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <HeaderBreadcrumbs
            heading="Project Submittal"
            links={[
              { name: 'Customers', href: PATH_ACCOUNT.customers },
              { name: 'Customer Edit' },
            ]}
          />
          <Stack spacing={2}>
            <Accordion
              expanded={expanded.panel1}
              onChange={() => setExpanded({ ...expanded, panel1: !expanded.panel1 })}
            >
              <AccordionSummary
                expandIcon={<Iconify icon="il:arrow-down" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography color="primary.main" variant="h6">
                  CUSTOMER INFO
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <RHFTextField size="small" name="username" label="Customer Name" />
                    <RHFSelect size="small" name="customerType" label="Customer type" placeholder="">
                      {customerType?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                      {!customerType && <option value="" />}
                    </RHFSelect>
                    <RHFTextField size="small" name="address" label="Address" />
                    <RHFSelect size="small" name="countryId" label="Country" placeholder="">
                      {country?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                      {!customerList && <option value="" />}
                    </RHFSelect>
                    <RHFTextField size="small" name="contactName" label="Contact name" />
                    <RHFSelect size="small" name="fobPoint" label="FOB point" placeholder="">
                      {fobPoint?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                      {!fobPoint && <option value="" />}
                    </RHFSelect>
                    <RHFTextField size="small" name="createdDate" label="Create date" />
                    <RHFTextField size="small" name="shippingFactor" label="Shipping factor(%)" />
                  </Box>
                  <Stack spacing={2} p={2}>
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
                </FormProvider>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded.panel2}
              onChange={() => setExpanded({ ...expanded, panel2: !expanded.panel2 })}
            >
              <AccordionSummary
                expandIcon={<Iconify icon="il:arrow-down" />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography color="primary.main" variant="h6">
                  USER LIST
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Users toolbar={false} checkbox={false} />
              </AccordionDetails>
            </Accordion>
          </Stack>
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
