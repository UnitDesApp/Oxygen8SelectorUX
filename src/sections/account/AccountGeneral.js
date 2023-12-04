import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Grid, Divider, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../hooks/useAuth';
// redux
import { updateMyProfile } from '../../redux/slices/AccountReducer';
import { useSelector, useDispatch } from '../../redux/store';
// components
import { FormProvider, RHFTextField, RHFSelect } from '../../components/hook-form';
import GroupBox from '../../components/GroupBox';
import AccountChangePassword from './AccountChangePassword';
// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const dispatch = useDispatch();
  const { updateUser } = useAuth();
  const { user } = useAuth();
  const { customerType, fobPoint, customerList } = useSelector((state) => state.account);

  const UpdateUserSchema = Yup.object().shape({
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
  });

  const defaultValues = useMemo(
    () => ({
      username: user?.username,
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      customerType: customerType[0]?.id,
      customerId: customerList[0]?.id,
      access: user?.access,
      accessLevel: 10,
      accessPricing: user?.accessPricing,
      fobPoint: fobPoint[0]?.id,
      createdDate: user?.createdDate,
    }),
    [
      customerList,
      customerType,
      fobPoint,
      user?.access,
      user?.accessPricing,
      user?.createdDate,
      user?.email,
      user?.firstname,
      user?.lastname,
      user?.username,
    ]
  );

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data) => {
      try {
        await dispatch(updateMyProfile({ ...data, userId: user?.userId }));
        updateUser(data);
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch, updateUser, user?.userId]
  );

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      <Grid item xs={7} md={7}>
        <GroupBox title="Profile">
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} p={2}>
              <Stack direction="row" justifyContent="space-around" spacing={1}>
                <RHFTextField size="small" name="firstname" label="First Name" />
                <RHFTextField size="small" name="lastname" label="Last Name" />
              </Stack>
              <RHFTextField size="small" name="email" label="Email" />
              <RHFTextField size="small" name="company_name" label="Company Name" />
              <RHFTextField size="small" name="job_name" label="Job Name" />
              <RHFTextField size="small" name="phone_number" label="Phone Number" />
              <Stack direction="row" justifyContent="space_around" spacing={1}>
                <RHFTextField size="small" name="address1" label="Address1" />
                <RHFTextField size="small" name="address2" label="Address2" />
              </Stack>
              <Stack direction="row" justifyContent="space_around" spacing={1}>
                <RHFTextField size="small" name="city" label="City" />
                <RHFTextField size="small" name="status" label="Status" />
                <RHFTextField size="small" name="country" label="Country" />
              </Stack>
              <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </Stack>
            </Stack>
          </FormProvider>
        </GroupBox>
      </Grid>
      <Grid item xs={5} md={5}>
        <AccountChangePassword />
      </Grid>
    </Grid>
  );
}
