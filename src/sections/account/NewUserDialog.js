import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Box, Stack, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { addNewUser } from '../../redux/slices/AccountReducer';
// components
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';

NewUserDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
};

export default function NewUserDialog({ open, onClose, onSuccess, onFail }) {
  const dispatch = useDispatch();
  const { customerType, fobPoint, customerList } = useSelector((state) => state.account);

  const NewUserSchema = Yup.object().shape({
    firstname: Yup.string().required('This field is required!'),
    lastname: Yup.string().required('This field is required!'),
    email: Yup.string().required('This field is required!'),
    username: Yup.string().required('This field is required!'),
    password: Yup.string().required('This field is required!'),
    customerType: Yup.string().required('This field is required!'),
    customerId: Yup.string().required('This field is required!'),
    access: Yup.string().required('This field is required!'),
    accessLevel: Yup.string().required('This field is required!'),
    accessPricing: Yup.string().required('This field is required!'),
    fobPoint: Yup.string().required('This field is required!'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const defaultValues = useMemo(
    () => ({
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      customerType: 'All',
      customerId: '1',
      access: '1',
      accessLevel: '10',
      accessPricing: '0',
      fobPoint: 0,
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    getValues,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data) => {
      try {
        await dispatch(addNewUser({ ...data, createdDate: '' }));
        onSuccess();
        reset(defaultValues);
        onClose();
      } catch (error) {
        console.error(error);
        onFail();
      }
    },
    [defaultValues, dispatch, onClose, onFail, onSuccess, reset]
  );

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
            <RHFTextField size="small" name="email" label="Email" />
            <RHFTextField size="small" name="username" label="User Name" />
            <RHFTextField size="small" type="password" name="password" label="Password" />
            <RHFTextField size="small" type="password" name="confirmPassword" label="Confirm Password" />
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
