import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';

// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, Button, Typography, ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
// import { PATH_PROJECT } from '../../routes/paths';

// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

// Quote.propTypes = {

// };

export default function SubmittalInternal() {
  // const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Box>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ paddingTop: 7 }}>
        <Typography variant="h5">
          You don't have a selection in this project
        </Typography>
        <Typography variant="subtitle1">
          Make a selection to generate a submittal
        </Typography>
      </Stack>
    </Box>
  );
}
