import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { Box, Stack, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// components
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';

NewCustomerDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setOpenSuccess: PropTypes.func,
  setOpenFail: PropTypes.func,
};

export default function NewCustomerDialog({ open, onClose, setOpenSuccess, setOpenFail }) {
  const NewCustomerSchema = Yup.object().shape({
    customerType: Yup.string().required('This field is required!'),
    customerName: Yup.string().required('This field is required!'),
    customerID: Yup.string().required('This field is required!'),
    companyName: Yup.string().required('This field is required!'),
    country: Yup.string().required('This field is required!'),
    access: Yup.string().required('This field is required!'),
    contactName: Yup.string().required('This field is required!'),
    fobPoint: Yup.string().required('This field is required!'),
    shippingFactor: Yup.string().required('This field is required!'),
  });

  const defaultValues = {
    customerType: '',
    customerName: '',
    customerID: '',
    companyName: '',
    country: '',
    access: '',
    contactName: '',
    fobPoint: '',
    shippingFactor: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewCustomerSchema),
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
      setOpenSuccess();
    } catch (error) {
      console.error(error);
      setOpenFail();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ mt: 10 }}>
      <DialogTitle>Add new customer</DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ minWidth: '500px', display: 'grid', rowGap: 3, columnGap: 2 }}>
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
            <RHFTextField size="small" name="customerID" label="Customer ID" />
            <RHFTextField size="small" type="companyName" name="Company Name" label="" />
            <RHFSelect size="small" name="country" label="Country" placeholder="">
              <option value="CAD" />
              <option value="USA" />
            </RHFSelect>
            <RHFTextField size="small" name="access" label="Access" />
            <RHFTextField size="small" name="contactName" label="Contact name" />
            <RHFSelect size="small" name="fobPoint" label="FOB point" placeholder="">
              <option value="Vancouver" />
              <option value="Harvard" />
            </RHFSelect>
            <RHFTextField size="small" name="shippingFactor" label="Shipping factor (%)" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
            <Button onClick={onClose} sx={{ width: '50%' }}>
              Cancel
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              onClick={() => console.log(getValues())}
              loading={isSubmitting}
              sx={{ width: '50%' }}
            >
              Save
            </LoadingButton>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
