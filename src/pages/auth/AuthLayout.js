import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Container } from '@mui/material';
// hooks
// import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// components
import Logo from '../../components/Logo';

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

const SectionStyle = styled(Card)(() => ({
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
AuthLayout.propTypes = {
  children: PropTypes.element
}

export default function AuthLayout(props) {
  const mdUp = useResponsive('up', 'md');

  return (
    <RootStyle>
      <HeaderStyle>
        <Logo sx={{height: '30px', width: '300px'}}/>
      </HeaderStyle>
      <Container>
        <ContentStyle>
          {props.children}
        </ContentStyle>
      </Container>
      {mdUp && (
        <SectionStyle />
      )}
    </RootStyle>
  );
}
