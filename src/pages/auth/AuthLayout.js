import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card } from '@mui/material';
// components
import Logo from '../../components/Logo';

// ----------------------------------------------------------------------
const HeaderStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3),
  justifyContent: 'center',
}));

const BoxStyle = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: 'transparent',
  height: '100vh',
  overflowY: 'scroll',
}));

const ContentStyle = styled('div')(() => ({
  backgroundColor: 'white',
  borderRadius: '4px',
  width: '40%',
  minWidth: 280,
  marginTop: 40,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  paddingBottom: '24px',
  zIndex: 999,
  maxHeight: '90vh',
  overflowY: 'scroll',
}));

// ----------------------------------------------------------------------
AuthLayout.propTypes = {
  children: PropTypes.any,
};

export default function AuthLayout(props) {
  return (
    <div>
      <Box>
        <BoxStyle>
          <ContentStyle>
            <Box sx={{ minHeight: '100%', padding: '24px' }}>
              <HeaderStyle>
                <Logo sx={{ height: '25px', width: '200px' }} />
              </HeaderStyle>
              {props.children}
            </Box>
          </ContentStyle>
        </BoxStyle>
        <img
          src="/assets/illustrations/illustration_login.png"
          alt="auth background"
          style={{ width: '100vw', height: '100%', position: 'absolute', top: 0, left: 0 }}
        />
      </Box>
    </div>
  );
}
