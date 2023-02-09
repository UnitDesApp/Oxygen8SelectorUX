import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, Typography} from '@mui/material';
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
            <Typography variant="h4" gutterBottom>
              Get started absolutely free.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Free forever. No credit card needed.</Typography>
          </Box>
        </Box>
        <RegisterForm />

        <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
          By registering, I agree to OXYGEN8&nbsp;
          <Link underline="always" color="text.primary" href="#">
            Terms of Service
          </Link>
          {''}and{''}
          <Link underline="always" color="text.primary" href="#">
            Privacy Policy
          </Link>
          .
        </Typography>
        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
          Already have an account?{' '}
          <Link variant="subtitle2" to={PATH_AUTH.login} component={RouterLink}>
            Login
          </Link>
        </Typography>
      </AuthLayout>
    </Page>
  );
}
