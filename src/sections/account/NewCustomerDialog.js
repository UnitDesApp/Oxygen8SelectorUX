import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Box, Stack, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { addNewCustomer } from '../../redux/slices/AccountReducer';
// components
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';

NewCustomerDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
};

export default function NewCustomerDialog({ open, onClose, onSuccess, onFail }) {
  const dispatch = useDispatch();
  const { customerList, customerType, fobPoint, country } = useSelector((state) => state.account);

  const NewCustomerSchema = Yup.object().shape({
    username: Yup.string().required('This field is required!'),
    customerType: Yup.number().required('This field is required!'),
    countryId: Yup.number().required('This field is required!'),
    address: Yup.string().required('This field is required!'),
    contactName: Yup.string().required('This field is required!'),
    fobPoint: Yup.number().required('This field is required!'),
    shippingFactor: Yup.number().required('This field is required!'),
  });

  const defaultValues = {
    username: '',
    customerType: 0,
    countryId: 0,
    address: '',
    contactName: '',
    fobPoint: 0,
    shippingFactor: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewCustomerSchema),
    defaultValues,
  });

  const {
    getValues,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await dispatch(addNewCustomer({ ...data, createdDate: '' }));
      onSuccess();
      reset(defaultValues);
      onClose();
    } catch (error) {
      console.error(error);
      onFail();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ mt: 10 }}>
      <DialogTitle>Add new customer</DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ minWidth: '500px', display: 'grid', rowGap: 3, columnGap: 2 }}>
            <Stack direction="row" justifyContent="space-around" spacing={1}>
              <RHFTextField size="small" name="username" label="Customer Name" />
              <RHFSelect size="small" name="customerType" label="Customer type" placeholder="">
                {customerType?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.items}
                  </option>
                ))}
                {!customerType && <option value="" />}
              </RHFSelect>
            </Stack>
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
            <RHFTextField size="small" name="shippingFactor" label="Shipping factor(%)" />
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
