import { Link as RouterLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import Page from '../../components/Page';
// ----------------------------------------------------------------------

export default function RegisterSuccess() {
  return (
    <Page title="Register Success">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <h1
          style={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          Thank you for your interest in Oxygen8 software. <br />
          Our team will get back to you with the login credentials
        </h1>
        <RouterLink to={'/login'}>
          <Button variant="contained" sx={{ marginTop: '32px' }}>
            Go to login
          </Button>
        </RouterLink>
      </Box>
    </Page>
  );
}
