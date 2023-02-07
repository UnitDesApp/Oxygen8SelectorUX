import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Card } from '@mui/material';
// jwt
import jwtDecode from 'jwt-decode';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
// hooks
import useResponsive from '../../hooks/useResponsive';
// sections
import { Message } from '../../sections/auth/message';
import { NewPassword } from '../../sections/auth/new-password';
import { ResetPasswordForm } from '../../sections/auth/reset-password';
// utils
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';
// Path
import { PATH_AUTH } from '../../routes/paths';
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
  minWidth: 370,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));


// ----------------------------------------------------------------------
export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate(); 

  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const [error, setError] = useState('');
  const [currentTokenState, setCurrentTokenState] = useState(false);
  const [isConfirming, setIsConfirming] = useState(true);
  const [tokenEmail, setTokenEmail] = useState("");

  useEffect(() => {
    if (token !== undefined) {
      const tokenData = jwtDecode(token);
      axios.post(`${serverUrl}/api/user/completeresetpassword`, { email: tokenData.email }).then((response) => {
        if (response.data) {
          const now = new Date();
          if (tokenData.expireTime > now.getTime()) {
            setCurrentTokenState(true);
            setError('');
          } else {
            setError('Token has expired!');
          }
        } else {
          setError('You have already changed your password!');
        }
        setTokenEmail(tokenData.email);
        setIsConfirming(false);
      });
    } else {
      setIsConfirming(false);
    }
  }, [token]);

  const initStates = () => {
    setError('');
    setCurrentTokenState(false);
    setIsConfirming(false);
    navigate(PATH_AUTH.resetPassword);
  }

  let renderTag; 
  if (error === '') {
    renderTag = currentTokenState ? <NewPassword email={tokenEmail}/> : <ResetPasswordForm />;
  } else {
    renderTag = <Message text={error} initStates={initStates}/>;
  }

  return isConfirming ? (
    <h1>Checking token...</h1>
  ) : (
    <Page title="Reset Password">
      <RootStyle>
        <HeaderStyle>
          <Logo sx={{height: '30px', width: '300px'}}/>
        </HeaderStyle>
        <Container>
          <ContentStyle>
            {renderTag}
          </ContentStyle>
        </Container>
        {mdUp && (
          <SectionStyle />
        )}
      </RootStyle>
    </Page>
  );
}
