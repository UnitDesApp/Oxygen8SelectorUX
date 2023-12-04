import { Outlet } from 'react-router-dom';
// @mui
import { Box, Stack } from '@mui/material';
// components
// import Logo from '../../components/Logo';
//
// import MainFooter from './MainFooter';
import MainHeader from './MainHeader';

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <Stack sx={{ minHeight: 1 }}>
      <MainHeader />

      <Box sx={{ mt: '40px' }}>
        <Outlet />
      </Box>

      <Box sx={{ flexGrow: 1 }} />
    </Stack>
  );
}
