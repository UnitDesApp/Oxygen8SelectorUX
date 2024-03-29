import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// proptypes
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Alert, IconButton, InputAdornment, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// Layout
import LogoOnlyLayout from '../../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// utils
import axios from '../../../utils/axios';
// config
import { serverUrl } from '../../../config';
// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// -----------------------------------------------------------------------
NewPassword.propTypes = {
  email: PropTypes.string,
};

export default function NewPassword({ email }) {
  const isMountedRef = useIsMountedRef();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const NewPasswordSchema = Yup.object().shape({
    newPassword: Yup.string().required('New Password is required'),
    confirmPassword: Yup.string().required('Confirm Password is required'),
  });

  const defaultValues = {
    newPassword: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
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
      if (data.newPassword !== data.confirmPassword) {
        setError('afterSubmit', { ...errors, message: 'Passwords do not match!' });
      } else {
        await axios.post(`${serverUrl}/api/user/newpassword`, {
          ...data,
          email,
        });
        navigate(PATH_AUTH.login);
      }
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: "Can't connect Server!" });
      }
    }
  };

  return (
    <ContentStyle sx={{ textAlign: 'center' }}>
      <Typography variant="h3" paragraph>
        Set a new password
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 3 }}>
        Your new password must be different to previously used password.
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

          <RHFTextField
            name="newPassword"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Set New Password
          </LoadingButton>
        </Stack>
      </FormProvider>
      <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.resetPassword} sx={{ mt: 3 }}>
        Back
      </Button>
    </ContentStyle>
  );
}
