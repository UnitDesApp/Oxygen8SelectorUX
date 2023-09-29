import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const LogoStyle = styled('img')(() => ({
  marginLeft: "auto",
  marginRight: "auto"
}));


Logo.propTypes = {
  width: PropTypes.number,
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ width, disabledLink = false, sx }) {
  // OR
  // const logo = '/logo/logo_single.svg';

  const logo = (
    <Box sx={{ width, ...sx }}>
      <LogoStyle src = "/logo/logo_full.png" />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}
