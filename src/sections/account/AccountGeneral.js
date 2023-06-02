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

  const defaultValues = useMemo(() => ({
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
  }), [customerList, customerType, fobPoint, user?.access, user?.accessPricing, user?.createdDate, user?.email, user?.firstname, user?.lastname, user?.username]);

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(async (data) => {
    try {
      await dispatch(updateMyProfile({ ...data, userId: user?.userId }));
      updateUser(data);
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, updateUser, user?.userId]);

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
