import * as Yup from 'yup';
import { useState } from 'react';
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
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    company_name: Yup.string().required('Company name is required'),
    job_title: Yup.string().required('Job title is required'),
    phone_number: Yup.string().required('Phone number is required'),
    address1: Yup.string().required('Address is required'),
    address2: Yup.string(),
    city: Yup.string().required('City is required'),
    province: Yup.string().required('State/Province is required'),
    country: Yup.string().required('Country is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    company_name: '',
    job_title: '',
    phone_number: '',
    address1: '',
    address2: '',
    city: '',
    province: '',
    country: '',
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
      const result = await register(
        data.email,
        data.password,
        data.username,
        data.firstname,
        data.lastname,
        data.accessLevel
      );
      if (!result) {
        setError('afterSubmit', { message: 'Your email is already existed!' });
      } else {
        location.href = '/';
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
          <RHFTextField name="firstname" label="First name" />
          <RHFTextField name="lastname" label="Last name" />
        </Stack>
        <RHFTextField name="email" label="Email address" />
        <RHFTextField name="company_name" label="Company Name" />
        <RHFTextField name="job_title" label="Job Title" />
        <RHFTextField name="phone_number" label="Phone Number" />
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
