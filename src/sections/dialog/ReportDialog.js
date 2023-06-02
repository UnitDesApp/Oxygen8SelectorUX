import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Grid,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from '../../redux/store';
import { useExport } from '../../hooks/useExport';

const EXPORT_METHODS = [
  { label: 'Submittal', id: 'submittal' },
  { label: 'Schedule', id: 'schedule' },
  { label: 'Revit files', id: 'revit_files' },
  { label: 'Quote', id: 'quote' },
];

ReportDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  intProjectID: PropTypes.string,
  intUnitNo: PropTypes.number,
  QuoteTitle: PropTypes.string,
};

export default function ReportDialog({ isOpen, onClose, intProjectID, intUnitNo, QuoteTitle }) {
  const [methods, setMethods] = useState({
    submittal: false,
    schedule: false,
    revit_files: false,
    quote: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [openSuccessNotify, setOpenSuccessNotify] = useState(false);
  const [successNotifyText, setSuccessNotifyText] = useState(false);
  const [openFailNotify, setOpenFailNotify] = useState(false);
  const [failNotifyText, setFailNotifyText] = useState(false);
  const { ExportSubmittal, ExportSubmittalEpicor, ExportQuote, ExportRevit, ExportSchedule } = useExport();

  const onChangeMethods = useCallback(
    (label, value) => {
      setMethods({ ...methods, [label]: !value });
    },
    [methods]
  );

  const onClickExports = useCallback(async () => {
    setIsLoading(true);
    if (methods.submittal) {
      const isSubmittalSuccess = await ExportSubmittal(intProjectID);
      const isSubmitallEpicorSuccess = await ExportSubmittalEpicor(intProjectID);

      if (isSubmittalSuccess && isSubmitallEpicorSuccess) {
        setSuccessNotifyText('Success export report for Submitall!');
        openSuccessNotify(true);
      } else if (!isSubmittalSuccess) {
        setFailNotifyText('Unfortunately, fail in downloading Submttal Data!');
        openFailNotify(true);
      } else if (!isSubmitallEpicorSuccess) {
        setFailNotifyText('Unfortunately, fail in downloading file, please check  Submttal and Quote data!');
        openFailNotify(true);
      } else {
        setFailNotifyText('Please check the project submittal project!');
        openFailNotify(true);
      }
    }

    if (methods.schedule) {
      await ExportSchedule(intProjectID);
    }

    if (methods.revit_files) {
      await ExportRevit(intProjectID);
    }

    if (methods.quote) {
      const result = await ExportQuote(intProjectID);
      if (result === 'server_error') {
        setFailNotifyText('Server Error!');
        setOpenFailNotify(true);
      } else if (result === 'fail') {
        setFailNotifyText('Please check your the project Quote info!');
        setOpenFailNotify(true);
      }
    }
    setIsLoading(false);
  }, [
    ExportQuote,
    ExportRevit,
    ExportSchedule,
    ExportSubmittal,
    ExportSubmittalEpicor,
    intProjectID,
    methods.quote,
    methods.revit_files,
    methods.schedule,
    methods.submittal,
    openFailNotify,
    openSuccessNotify,
  ]);

  const onCloseDialog = useCallback(() => {
    setIsLoading(false);
    onClose();
  }, [onClose]);

  const handleCloseNotify = useCallback((key) => {
    if (key === 'success') {
      setOpenSuccessNotify(false);
    } else if (key === 'fail') {
      setOpenFailNotify(false);
    }
  }, []);

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="responsive-dialog-title">
      <Box sx={{ width: '100%', minWidth: 450 }}>
        <DialogTitle id="responsive-dialog-title" sx={{ px: '40px' }}>
          Select report(s) to export
        </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {EXPORT_METHODS.map(({ label, id }) => (
              <ListItem key={id}>
                <ListItemButton role={undefined} onClick={() => onChangeMethods(id, methods[id])} dense>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={methods[id]}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': 'checkbox-list-label-selection' }}
                    />
                  </ListItemIcon>
                  <ListItemText id={'checkbox-list-label-selection'} primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Grid container sx={{ width: '100%' }} spacing={3}>
            <Grid item xs={6}>
              <Button fullWidth variant="outlined" onClick={onCloseDialog}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <LoadingButton loading={isLoading} fullWidth onClick={onClickExports} variant="contained" autoFocus>
                Export
              </LoadingButton>
            </Grid>
          </Grid>
        </DialogActions>
        <Snackbar open={openSuccessNotify} autoHideDuration={3000} onClose={() => handleCloseNotify('success')}>
          <Alert onClose={() => handleCloseNotify('success')} severity="success" sx={{ width: '100%' }}>
            {successNotifyText}
          </Alert>
        </Snackbar>
        <Snackbar open={openFailNotify} autoHideDuration={3000} onClose={() => handleCloseNotify('warning')}>
          <Alert onClose={() => handleCloseNotify('fail')} severity="warning" sx={{ width: '100%' }}>
            {failNotifyText}
          </Alert>
        </Snackbar>
      </Box>
    </Dialog>
  );
}
