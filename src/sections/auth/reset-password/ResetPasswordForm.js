import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// jwt
import sign from 'jwt-encode';
// @mui
import { styled } from '@mui/material/styles';
import { Stack, Alert, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// routes
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import { FormProvider, RHFTextField } from '../../../components/hook-form';
// components
import Iconify from '../../../components/Iconify';
// utils
import axios from '../../../utils/axios';
// config
import { serverUrl } from '../../../config';
// ----------------------------------------------------------------------

const ContentStyle = styled('div')(() => ({
  width: '100%',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${serverUrl}/api/user/SaveResetpassword`, data);

      if (response.data) {
        const now = new Date();
        const jwt = sign({ email: data.email, expireTime: now.getTime() + 900000 }, 'secret');
        const emailBody = `https://oxygen8selectorv08nike.netlify.app/auth/reset-password/${jwt}`;
        axios.post(`${serverUrl}/api/auth/sendrequest`, {
          email: data.email,
          subject: 'Oxygent8Selctor Reset Password',
          emailBody,
        });

        navigate(PATH_AUTH.verify);
      } else {
        setError('afterSubmit', { ...errors, message: 'Your email does not exist!' });
      }
    } catch (error) {
      setError('afterSubmit', { ...error, message: "Can't connect server!" });
    }
  };

  return (
    <ContentStyle sx={{ textAlign: 'center' }}>
      <Typography variant="h3" paragraph>
        Forgot password?
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 3 }}>No worries, we'll send you reset instructions.</Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
          <RHFTextField name="email" label="Email address" />
          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
            Send Request
          </LoadingButton>
        </Stack>
      </FormProvider>
      <Button
        fullWidth
        size="large"
        component={RouterLink}
        to={PATH_AUTH.login}
        sx={{ mt: 3 }}
        startIcon={<Iconify icon="ic:twotone-arrow-back" />}
      >
        Back to log in
      </Button>
    </ContentStyle>
  );
}
