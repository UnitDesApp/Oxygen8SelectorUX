// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';

// @mui
// import { useTheme } from '@mui/material/styles';
import { Box, TextField } from '@mui/material';
// import { PATH_PROJECT } from '../../routes/paths';

// components
// import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

// Quote.propTypes = {

// };

export default function Notes() {
  // const navigate = useNavigate();
  return (
    <Box sx={{ paddingTop: 1, width: '100%' }}>
      <TextField
        id="standard-multiline-flexible"
        label="Notes"
        placeholder="Take a notes..."
        multiline
        maxRows={15}
        rows={15}
        sx={{ width: '100%', height: '500px' }}
      />
    </Box>
  );
}
