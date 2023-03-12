import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Button, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import AuthLayout from './AuthLayout';
import Page from '../../components/Page';
// ----------------------------------------------------------------------

export default function VerifyCode() {
  return (
    <Page title="Verify Code">
      <AuthLayout>
        <Typography variant="h3" paragraph>
          Please check your email!
        </Typography>
        <Button fullWidth size="large"  component={RouterLink} to={PATH_AUTH.resetPassword} sx={{ mt: 1 }}>
          Back
        </Button>
      </AuthLayout>
    </Page>
  );
}
