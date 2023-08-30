import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();

  const isMountedRef = useIsMountedRef();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    companyName: Yup.string().required('Company name is required'),
    jobTitle: Yup.string().required('Job title is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address1: Yup.string().required('Address is required'),
    address2: Yup.string(),
    city: Yup.string().required('City is required'),
    province: Yup.string().required('State/Province is required'),
    country: Yup.string().required('Country is required'),
  });

  const defaultValues = {
    firstName: 'Nadja',
    lastName: 'da',
    email: 'erik.soon.my@gmail.com',
    companyName: 'NIKE',
    jobTitle: 'Full Stack Engineer',
    phoneNumber: '+381 69898746',
    address1: '123',
    address2: '123',
    city: '123',
    province: '123',
    country: '123',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const result = await register(data);
      if (!result) {
        setError('afterSubmit', { message: result.message });
      } else {
        location.href = '/register-success';
      }
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>
        <RHFTextField name="email" label="Email address" />
        <RHFTextField name="companyName" label="Company Name" />
        <RHFTextField name="jobTitle" label="Job Title" />
        <RHFTextField name="phoneNumber" label="Phone Number" />
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="address1" label="Address1" />
          <RHFTextField name="address2" label="Address2 (optional)" />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="city" label="City" />
          <RHFTextField name="province" label="State/Province" />
          <RHFTextField name="country" label="Country" />
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Request to register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
