import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import AuthLayout from './AuthLayout';
import Page from '../../components/Page';
// sections
import { RegisterForm } from '../../sections/auth/register';
// ----------------------------------------------------------------------

export default function Register() {
  return (
    <Page title="Register">
      <AuthLayout>
        <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
              Request Registration to Support Team
            </Typography>
          </Box>
        </Box>
        <RegisterForm />
        <Typography variant="body2" sx={{ mt: 3, pb: 3, textAlign: 'center' }}>
          Already have an account?{' '}
          <Link variant="subtitle2" to={PATH_AUTH.login} component={RouterLink}>
            Login
          </Link>
        </Typography>
      </AuthLayout>
    </Page>
  );
}
