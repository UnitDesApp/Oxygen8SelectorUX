import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Stack, Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
// sections
import AuthLayout from './AuthLayout';
import { LoginForm } from '../../sections/auth/login';

// ----------------------------------------------------------------------
export default function Login() {
  return (
    <Page title="Login">
      <AuthLayout>
        <>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box alignItems="center" sx={{ flexGrow: 1 }}>
              <Typography variant='h3' textAlign="center">Welcome to Configure8!</Typography>
            </Box>
          </Stack>
          <LoginForm />
          <Typography variant="body2" align="center" sx={{ mt: 3 }}>
            Don’t have an account?
            <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
              <b>Sign Up</b>
            </Link>
          </Typography>
        </>
      </AuthLayout>
    </Page>
  );
}
