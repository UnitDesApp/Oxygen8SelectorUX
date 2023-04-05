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

NewUserDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
};

export default function NewUserDialog({ open, onClose, onSuccess, onFail }) {
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
      onSuccess();
    } catch (error) {
      console.error(error);
      onFail();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ mt: 10 }}>
      <DialogTitle>Add new user</DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ minWidth: '500px', display: 'grid', rowGap: 3, columnGap: 2 }}>
            <Stack direction="row" justifyContent="space-around" spacing={1}>
              <RHFTextField size="small" name="firstname" label="First Name" />
              <RHFTextField size="small" name="lastname" label="Last Name" />
            </Stack>
            <RHFTextField size="small" name="username" label="User Name" />
            <RHFTextField size="small" type="password" name="password" label="Password" />
            <RHFTextField size="small" type="password" name="confirm_password" label="Confirm Password" />
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
