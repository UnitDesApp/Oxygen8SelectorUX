// react
import React, { useCallback, useRef, useState } from 'react';
// yup
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
// proptypes
import { PropTypes } from 'prop-types';
// material
import { Box, IconButton, Dialog, Stack, Typography } from '@mui/material';
// reducer
import { uploadFiles } from 'src/redux/slices/ResourceReducer';
import { useDispatch } from 'src/redux/store';
// hooks
import { useForm } from 'react-hook-form';
// components
import Iconify from 'src/components/Iconify';
import { FormProvider, RHFSelect } from 'src/components/hook-form';
import { CustomUpload } from 'src/components/hook-form/CustomUpload';
// lodash
import { union } from 'lodash';

const FileUploadDialog = ({ isOpen, onClose }) => {
  const submitRef = useRef(null);
  const dispatch = useDispatch();

  const formData = new FormData();

  const RegisterSchema = Yup.object().shape({
    resourceType: Yup.string().required('This field is required'),
    files: Yup.array().required('Please select resource files'),
  });

  const defaultValues = {
    resourceType: 'nova',
    files: [],
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      await dispatch(uploadFiles(data));
      reset();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.files || [];
      setValue('files', union(files, acceptedFiles));
    },
    [setValue, values.files]
  );

  const handleRemoveAll = () => {
    setValue('files', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.files?.filter((_file) => _file !== file);
    setValue('files', filteredItems);
  };

  const handleUpload = () => {
    submitRef?.current?.onClick();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} sx={{ marginX: 'auto', borderRadius: '6px!important' }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ width: '500px', minHeight: '300px', mt: '16px', paddingX: '16px' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box sx={{ paddingX: '16px' }}>
              <Typography variant="h5">Resource File Upload</Typography>
            </Box>
            <IconButton onClick={onClose}>
              <Iconify icon="material-symbols:close-rounded" />
            </IconButton>
          </Stack>
          <Box sx={{ mt: '16px' }}>
            <RHFSelect size="small" name="resourceType" label="Resource Type" placeholder="">
              <option value="nova">NOVA</option>
              <option value="terra">TERRA</option>
              <option value="ventum">VENTUM</option>
              <option value="ventum_lite">VENTUM LITE</option>
            </RHFSelect>
            <Box sx={{ mt: '8px', mb: '24px' }}>
              <CustomUpload
                name="files"
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
                onUpload={handleUpload}
                isSubmitting={isSubmitting}
              />
            </Box>
          </Box>
        </Box>
      </FormProvider>
    </Dialog>
  );
};

FileUploadDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default FileUploadDialog;
