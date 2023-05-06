import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { List, IconButton, ListItemText, ListItem } from '@mui/material';
// utils
import { fData } from '../../utils/formatNumber';
import getFileData from '../../utils/getFileData';
//
import Iconify from '../Iconify';

// ----------------------------------------------------------------------

CustomMultiFilePreview.propTypes = {
  files: PropTypes.array.isRequired,
  onRemove: PropTypes.func,
};

export default function CustomMultiFilePreview({ files, onRemove }) {
  const hasFile = files.length > 0;

  return (
    <List disablePadding sx={{ ...(hasFile && { my: 3 }), maxHeight: 220, overflowY: 'scroll' }}>
      {files.map((file, index) => {
        const { key, name, size } = getFileData(file, index);
        return (
          <ListItem
            key={key}
            component={m.div}
            sx={{
              my: 1,
              px: 2,
              py: 0.75,
              borderRadius: 0.75,
              border: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            <Iconify icon={'eva:file-fill'} sx={{ width: 28, height: 28, color: 'text.secondary', mr: 2 }} />

            <ListItemText
              primary={typeof file === 'string' ? file : name}
              secondary={typeof file === 'string' ? '' : fData(size || 0)}
              primaryTypographyProps={{ variant: 'subtitle2' }}
              secondaryTypographyProps={{ variant: 'caption' }}
            />

            {onRemove && (
              <IconButton edge="end" size="small" onClick={() => onRemove(file)}>
                <Iconify icon={'eva:close-fill'} />
              </IconButton>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
