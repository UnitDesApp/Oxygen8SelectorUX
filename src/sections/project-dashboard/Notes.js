import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import { LoadingButton } from '@mui/lab';
import { Alert, Box, Snackbar, Stack } from '@mui/material';
// component
import Iconify from 'src/components/Iconify';
// hooks
import { useDispatch, useSelector } from 'src/redux/store';
import { saveNotes, getProjectNote } from 'src/redux/slices/projectDashboardReducer';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../components/hook-form';

// ----------------------------------------------------------------------
export default function Notes() {
  const dispatch = useDispatch();
  const { projectNote } = useSelector((state) => state.projectDashboard);
  const { projectId } = useParams();

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openFail, setOpenFail] = useState(false);

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const handleCloseFail = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFail(false);
  };

  // const navigate = useNavigate();
  const projectInfoSchema = Yup.object().shape({
    notes: Yup.string().required('Please enter a Project Name'),
  });

  // hooks
  const defaultValues = {
    notes: projectNote,
  };

  const methods = useForm({
    resolver: yupResolver(projectInfoSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data) => {
      try {
        await dispatch(saveNotes({ ...data, projectId }));
        setOpenSuccess(true);
      } catch (error) {
        setOpenFail(true);
        console.error(error);
      }
    },
    [dispatch, projectId]
  );

  useEffect(() => {
    dispatch(getProjectNote({ projectId }));
  }, [dispatch, projectId]);

  useEffect(() => {
    setValue('notes', projectNote);
  }, [setValue, projectNote]);

  return (
    <Box sx={{ paddingTop: 1, width: '100%' }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField
          id="standard-multiline-flexible"
          name="notes"
          label="Notes"
          placeholder="Take a notes..."
          multiline
          maxRows={15}
          rows={15}
          sx={{ width: '100%' }}
        />
        <Stack direction="row" justifyContent="flex-end" sx={{ paddingTop: 2, paddingBottom: 10 }}>
          <LoadingButton
            type="submit"
            startIcon={<Iconify icon={'fluent:save-24-regular'} />}
            loading={isSubmitting}
            sx={{ width: '150px' }}
          >
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSuccess}>
        <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
          New project update success!
        </Alert>
      </Snackbar>
      <Snackbar open={openFail} autoHideDuration={3000} onClose={handleCloseFail}>
        <Alert onClose={handleCloseFail} severity="error" sx={{ width: '100%' }}>
          Server Error!
        </Alert>
      </Snackbar>
    </Box>
  );
}
