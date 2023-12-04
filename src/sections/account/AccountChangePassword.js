import { useCallback } from 'react';
import * as Yup from 'yup';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../components/hook-form';
import GroupBox from '../../components/GroupBox';
// axios
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const ChangePassWordSchema = Yup.object().shape({
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const defaultValues = {
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data) => {
      try {
        const response = await axios.post(`${serverUrl}/api/user/updatePassword`, {
          userId: localStorage.getItem('userId'),
          updatedPassword: data.newPassword,
        });

        if (response.data === 'success') {
          setError('afterSubmitSuccess', { message: 'Updated successfully!' });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [setError]
  );

  return (
    <GroupBox title="Change Password">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} alignItems="flex-end" sx={{ mt: 3, p: 2 }}>
          {!!errors.afterSubmit && (
            <Alert sx={{ width: '100%' }} severity="error">
              {errors.afterSubmit.message}
            </Alert>
          )}
          {!!errors.afterSubmitSuccess && (
            <Alert sx={{ width: '100%' }} severity="success">
              {errors.afterSubmitSuccess.message}
            </Alert>
          )}

          <RHFTextField size="small" name="newPassword" type="password" label="New Password" />

          <RHFTextField size="small" name="confirmNewPassword" type="password" label="Confirm New Password" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Update Password
          </LoadingButton>
        </Stack>
      </FormProvider>
    </GroupBox>
  );
}
