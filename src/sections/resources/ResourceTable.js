import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { Box, IconButton, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { serverUrl } from 'src/config';
import Iconify from '../../components/Iconify';
import axios from '../../utils/axios';

const ResourceTable = ({ objResources, title, resourceType, sx }) => {
  const theme = useTheme();

  const onDownload = (fileName) => {
    axios
      .post(
        `${serverUrl}/api/resource/filedownload`,
        { resourceType, fileName },
        {
          responseType: 'blob',
        }
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
      });
  };

  const convertDate = (date) => {
    const originalDate = new Date(date);
    const isoString = originalDate.toISOString(); // convert to ISO format
    const formattedString = isoString.replace('T', ' ').slice(0, -5);
    return formattedString;
  };

  return (
    <Box sx={{ ...sx, margin: 1, px: '20px' }}>
      <Typography variant="h6" component="div" sx={{ px: '20px' }}>
        {title}
      </Typography>
      <Table size="small">
        <TableBody>
          {objResources.map((resourceRow, i) => (
            <TableRow
              key={i}
              hover
              sx={{ borderBottom: '1px solid #a7b1bc', '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {resourceRow.Name}
              </TableCell>
              <TableCell component="th" scope="row">
                {convertDate(resourceRow.Date)}
              </TableCell>
              <TableCell component="th" scope="row">
                {resourceRow.FileType}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  sx={{ color: theme.palette.primary.main }}
                  onClick={() => {
                    onDownload(resourceRow.Name);
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
  objResources: PropTypes.array,
  resourceType: PropTypes.string,
  title: PropTypes.string,
  sx: PropTypes.object,
};

export default ResourceTable;
