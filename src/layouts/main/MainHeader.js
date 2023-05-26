// @mui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Container, Stack, Typography } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// import useAuth from '../../hooks/useAuth';
// utils
import cssStyles from '../../utils/cssStyles';
// config
import { HEADER } from '../../config';
// components
import Logo from '../../components/Logo';
import AccountPopover from './AccountPopover';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import MyAvatar from '../../components/MyAvatar';

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('md')]: {
    height: HEADER.MAIN_DESKTOP_HEIGHT,
  },
  borderBottom: '1px solid #cbc9c9',
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

// ----------------------------------------------------------------------

export default function MainHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);
  // const { user } = useAuth();

  const theme = useTheme();
  const isDesktop = useResponsive('up', 'md');

  return (
    <AppBar sx={{ boxShadow: 0, zIndex: 1000, bgcolor: 'transparent', background: '#ffff' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            ...cssStyles(theme).bgBlur(),
            height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo sx={{ width: { xs: '138px', md: '300px' }, height: { xs: '30px', md: '40px' } }} />

          {isDesktop && <MenuDesktop isOffset={isOffset} navConfig={navConfig} />}

          <Stack direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 0.5, sm: 1.5 }}>
            <MyAvatar />
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              {localStorage.getItem('username')}
            </Typography>
            <AccountPopover />
          </Stack>

          {!isDesktop && <MenuMobile isOffset={isOffset} navConfig={navConfig} />}
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
