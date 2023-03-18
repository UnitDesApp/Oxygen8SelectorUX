import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, IconButton, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import Iconify from '../../components/Iconify';

const ResourceTable = ({ objResources, title, sx }) => {
  const theme = useTheme();

  const onDownload = (fileName, fileType, href) => {
    const link = document.createElement('a');
    link.download = `${fileName}.${fileType.toLowerCase()}`;
    link.href = href;
    link.click();
  };

  return (
    <Box sx={{ ...sx, margin: 1, px: '20px' }}>
      <Typography variant="h6" component="div" sx={{ px: '20px' }}>
        {title}
      </Typography>
      <Table size="small">
        <TableBody>
          {objResources.map((resourceRow) => (
            <TableRow
              key={resourceRow.date}
              hover
              sx={{ borderBottom: '1px solid #a7b1bc', '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {resourceRow.fileName}
              </TableCell>
              <TableCell component="th" scope="row">
                {resourceRow.date}
              </TableCell>
              <TableCell component="th" scope="row">
                {resourceRow.fileType}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  sx={{ color: theme.palette.primary.main }}
                  onClick={() => {
                    onDownload(resourceRow.fileName, resourceRow.fileType, resourceRow.href);
                  }}
                >
                  <Iconify icon="ic:baseline-download" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

ResourceTable.propTypes = {
  objResources: PropTypes.object,
  title: PropTypes.string,
  sx: PropTypes.object,
};

export default ResourceTable;
