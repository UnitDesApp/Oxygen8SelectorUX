import React from 'react';
import { Stack, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import Iconify from '../../components/Iconify';

const ResourceHeader = ({ curValue, updateCurValue }) => {
  const handleAlignment = (e, newValue) => {
    if (newValue) updateCurValue(newValue);
  };

  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={5}>
      <ToggleButtonGroup color="primary" value={curValue} exclusive onChange={handleAlignment} aria-label="Platform">
        <ToggleButton value="all">
          {curValue === 'all' && <Iconify icon="material-symbols:check-circle-outline" sx={{ marginRight: '10px' }} />}
          <Typography>All</Typography>
        </ToggleButton>
        <ToggleButton value="nova">
          {curValue === 'nova' && <Iconify icon="material-symbols:check-circle-outline" sx={{ marginRight: '10px' }} />}
          <Typography>Nova</Typography>
        </ToggleButton>
        <ToggleButton value="ventum">
          {curValue === 'ventum' && (
            <Iconify icon="material-symbols:check-circle-outline" sx={{ marginRight: '10px' }} />
          )}
          <Typography>Ventum</Typography>
        </ToggleButton>
        <ToggleButton value="terra">
          {curValue === 'terra' && (
            <Iconify icon="material-symbols:check-circle-outline" sx={{ marginRight: '10px' }} />
          )}
          <Typography>Terra</Typography>
        </ToggleButton>
        <ToggleButton value="ventum_lite">
          {curValue === 'ventum_lite' && (
            <Iconify icon="material-symbols:check-circle-outline" sx={{ marginRight: '10px' }} />
          )}
          <Typography>Ventum lite</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};

ResourceHeader.propTypes = {
  curValue: PropTypes.string,
  updateCurValue: PropTypes.func,
};

export default ResourceHeader;
