import PropTypes from 'prop-types';
// @mui
import { Box, Typography, IconButton, Drawer, Stack } from '@mui/material';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------
SideDescription.propTypes = {
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
};

export default function SideDescription({ open, handleDrawerClose }) {
  return (
    <Drawer anchor="right" open={open} onClose={handleDrawerClose}>
      <Box sx={{ padding: 3, width: '300px', paddingBottom: '120px', paddingTop: '100px' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography color="primary.main" variant="h6">
            Lorem ipsum
          </Typography>
          <IconButton onClick={handleDrawerClose} sx={{ width: '40px', mb: 1 }}>
            <Iconify icon={'iconoir:cancel'} />
          </IconButton>
        </Stack>
        <Box
          sx={{
            display: 'grid',
            rowGap: 3,
            columnGap: 2,
            gridTemplateColumns: 'repeat(1, 1fr)',
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consecteture adipiscing elit. Duis fringilla porta diam, eu egestas nibh
              pellentesque vel. Fusce ultrices tortor pretium vulputate viverra. Vestibulum purus sem, mattis in dolor
              vel, egestas tincidunt libero. Aliquam suscipit purus accumsan lectus ultrices, id bibendum diam
              malesuada. Nulla facilisi.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
}
