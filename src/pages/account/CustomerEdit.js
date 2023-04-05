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
// hooks
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';
// roots
import { PATH_ACCOUNT } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import GroupBox from '../../components/GroupBox';
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

  return (
    <Page>
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <HeaderBreadcrumbs
              heading="Project Submittal"
              links={[
                { name: 'My account', href: PATH_ACCOUNT.account },
                { name: 'Customers', href: PATH_ACCOUNT.customers },
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
                  <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <RHFTextField size="small" name="customerID" label="Customer ID" />
                    <RHFSelect size="small" name="customerType" label="Customer type" placeholder="">
                      <option value="Internal" />
                      <option value="External" />
                    </RHFSelect>
                    <RHFTextField size="small" name="companyName" label="Company name" />
                    <RHFSelect size="small" name="customerName" label="Customer name" placeholder="">
                      <option value="N/A" />
                      <option value="John" />
                      <option value="James" />
                      <option value="Joey" />
                    </RHFSelect>
                    <RHFTextField size="small" name="contactName" label="Contact name" />
                    <RHFSelect size="small" name="fobPoint" label="FOB point" placeholder="">
                      <option value="Vancouver" />
                      <option value="Harvard" />
                    </RHFSelect>
                    <RHFSelect size="small" name="country" label="Country" placeholder="">
                      <option value="CAN" />
                      <option value="USA" />
                    </RHFSelect>
                    <RHFTextField size="small" name="createdDate" label="Create date" />
                    <RHFTextField size="small" name="address" label="Address" />
                    <RHFTextField size="small" name="shippingFactor" label="Shipping factor(%)" />
                  </Box>
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
