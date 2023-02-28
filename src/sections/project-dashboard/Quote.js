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

export default function Quote() {
  // const navigate = useNavigate();
  const theme = useTheme();
  const [alignment, setAlignment] = useState('stage1');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box sx={{ paddingTop: 5 }}>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={5}>
        <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>
          Select a stage to generate a quote
        </Typography>
        <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
          <ToggleButton value="stage1">
            <Stack direction="row" spacing={2} justifyContent="center" alignContent="center">
              {alignment === 'stage1' && (
                <Iconify icon="material-symbols:check-circle-outline" sx={{ marginTop: '5px' }} />
              )}
              Stage
            </Stack>
          </ToggleButton>
          <ToggleButton value="stage2">
            {alignment === 'stage2' && <Iconify icon="material-symbols:check-circle-outline" />}
            Stage
          </ToggleButton>
          <ToggleButton value="stage3">
            {alignment === 'stage3' && <Iconify icon="material-symbols:check-circle-outline" />}
            Stage
          </ToggleButton>
          <ToggleButton value="stage4">
            {alignment === 'stage4' && <Iconify icon="material-symbols:check-circle-outline" />}
            Stage
          </ToggleButton>
        </ToggleButtonGroup>
        <Button color="primary" variant="contained" endIcon={<Iconify icon="ooui:arrow-next-ltr" />}>
          Generate Group
        </Button>
      </Stack>
    </Box>
  );
}
