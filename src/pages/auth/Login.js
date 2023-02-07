import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Link, Card, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
// import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
// sections
import { LoginForm } from '../../sections/auth/login';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3),
  position: 'absolute',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: theme.spacing(3, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '50%',
  minWidth: '50%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: '0',
  backgroundImage: 'url("/assets/illustrations/illustration_login.png")',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '50%',
  minWidth: 280,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo sx={{height: '30px', width: '300px'}}/>
        </HeaderStyle>
        <Container>
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box alignItems="center" sx={{ flexGrow: 1 }}>
                <Typography variant='h3' textAlign="center">Welcome Back</Typography>
              </Box>
            </Stack>
            <LoginForm />
            {smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                  <b>Sign Up</b>
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
        {mdUp && (
          <SectionStyle />
        )}
      </RootStyle>
    </Page>
  );
}
