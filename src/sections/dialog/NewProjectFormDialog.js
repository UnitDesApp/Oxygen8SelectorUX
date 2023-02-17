import { useState } from 'react';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { Box, Card, Stack, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';

NewProjectFormDialog.propTypes = {
  newProjectDialogOpen: PropTypes.bool,
  handleNewProjectDialogClose: PropTypes.func,
  addNewProject: PropTypes.func,
  initialInfo: PropTypes.object,
};

export default function NewProjectFormDialog({
  newProjectDialogOpen,
  handleNewProjectDialogClose,
  addNewProject,
  initialInfo,
}) {
  // const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const { applications } = initialInfo;

  // console.log(initialInfo);

  const NewUserSchema = Yup.object().shape({
    projectName: Yup.string().required('Please enter a project name.'),
    application: Yup.string().required('Please select an applicaiton type.'),
    basisOfDesign: Yup.string().required('Please select an basis of design.'),
    projectId: Yup.string().required('Please enter a project ID.'),
    repName: Yup.string().required('Please enter a rep name.'),
    companyName: Yup.string().required('Please enter company name.'),
    country: Yup.string().required('Please select a country.'),
    city: Yup.string().required('Please select a city.'),
    province: Yup.string().required('Please select a province.'),
    desingCondition: Yup.string().required('Please select an ASHRAE Design Condition.'),
    Altitude: Yup.string().required('Please select an Altitude(ft)'),
    outsideAirWinDry: Yup.string().required('This field is required.'),
    outsideAirWinWet: Yup.string().required('This field is required.'),
    outsideAirWinRelative: Yup.string().required('This field is required.'),
    outsideAirSumDry: Yup.string().required('This field is required.'),
    outsideAirSumWet: Yup.string().required('This field is required.'),
    outsideAirSumRelative: Yup.string().required('This field is required.'),
    insideAirWinDry: Yup.string().required('This field is required.'),
    insideAirWinWet: Yup.string().required('This field is required.'),
    insideAirWinRelative: Yup.string().required('This field is required.'),
    insideAirSumDry: Yup.string().required('This field is required.'),
    insideAirSumWet: Yup.string().required('This field is required.'),
    insideAirSumRelative: Yup.string().required('This field is required.'),
  });

  const defaultValues = {
    projectName: '',
    application: '',
    basisOfDesign: '',
    projectId: '',
    repName: '',
    companyName: '',
    country: '',
    city: '',
    province: '',
    desingCondition: '',
    Altitude: '',
    outsideAirWinDry: '',
    outsideAirWinWet: '',
    outsideAirWinRelative: '',
    outsideAirSumDry: '',
    outsideAirSumWet: '',
    outsideAirSumRelative: '',
    insideAirWinDry: '',
    insideAirWinWet: '',
    insideAirWinRelative: '',
    insideAirSumDry: '',
    insideAirSumWet: '',
    insideAirSumRelative: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    // setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const handleOnchangeCompanyName = (e) => {
  //   setValue('companyNameId', e.target.value);
  //   setValue('companyName', e.nativeEvent.target[e.target.selectedIndex].text);
  // };

  const onSubmit = async (data) => {
    try {
      addNewProject(data);
      // navigate(PATH_MY_JOBS.dashboard, { state: data });
    } catch (error) {
      console.error(error);
    }
  };

  const onClickedBackBtn = () => {
    if (step === 1) {
      setStep(0);
    }

    if (step === 0) {
      handleNewProjectDialogClose();
    }
  };

  const onContinueBtnClicked = () => {
    handleSubmit(() => {})();
    if (getValues('projectName') === '') return;
    if (getValues('application') === '') return;
    if (getValues('basisOfDesign') === '') return;
    if (getValues('projectID') === '') return;
    if (getValues('repName') === '') return;
    if (getValues('companyName') === '') return;
    setStep(1);
  };

  return (
    <Dialog open={newProjectDialogOpen} onClose={handleNewProjectDialogClose}>
      <DialogTitle>{!step ? 'Create new project' : 'Design conditions'}</DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {!step ? (
            <Card sx={{ p: 3 }}>
              <Box sx={{ minWidth: '500px', display: 'grid', rowGap: 3, columnGap: 2 }}>
                <RHFTextField size="small" name="projectName" label="Project name" />

                <RHFSelect size="small" name="application" label="Application" placeholder="Application">
                  <option value="" />
                  {applications !== undefined &&
                    applications.map((option) => (
                      <option key={option.id + option.items} value={option.id}>
                        {option.items}
                      </option>
                    ))}
                </RHFSelect>
                <RHFSelect size="small" name="basisOfDesign" label="Basis Of Design" placeholder="Basis of design">
                  <option value="" />
                  {applications !== undefined &&
                    applications.map((option) => (
                      <option key={`${option.id}basisOfDesign`} value={option.id}>
                        {option.items}
                      </option>
                    ))}
                </RHFSelect>
                <RHFTextField size="small" name="projectId" label="Project ID" />
                <RHFTextField size="small" name="repName" label="Rep name" />
                <RHFTextField size="small" name="companyName" label="Company Name" />
              </Box>
            </Card>
          ) : (
            <Card sx={{ p: 3 }}>
              <Box sx={{ minWidth: '500px', display: 'grid', rowGap: 3, columnGap: 2 }}>
                <Stack direction="row" spacing={2}>
                  <Typography variant="subtitle1">LOCATION</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <RHFSelect size="small" name="country" label="Country" placeholder="Please select country">
                    <option value="" />
                    {applications !== undefined &&
                      applications.map((option) => (
                        <option key={`${option.id}basisOfDesign`} value={option.id}>
                          {option.items}
                        </option>
                      ))}
                  </RHFSelect>

                  <RHFSelect size="small" name="city" label="City" placeholder="Please select city">
                    <option value="" />
                    {applications !== undefined &&
                      applications.map((option) => (
                        <option key={`${option.id}basisOfDesign`} value={option.id}>
                          {option.items}
                        </option>
                      ))}
                  </RHFSelect>

                  <RHFSelect
                    size="small"
                    name="province"
                    label="Province/state"
                    placeholder="Please select province/state"
                  >
                    <option value="" />
                    {applications !== undefined &&
                      applications.map((option) => (
                        <option key={`${option.id}basisOfDesign`} value={option.id}>
                          {option.items}
                        </option>
                      ))}
                  </RHFSelect>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <RHFSelect
                    size="small"
                    name="ashraeDesignConditions"
                    label="ASHRAE Design Conditions"
                    placeholder="Please select an share design conditions"
                  >
                    <option value="" />
                    {applications !== undefined &&
                      applications.map((option) => (
                        <option key={`${option.id}basisOfDesign`} value={option.id}>
                          {option.items}
                        </option>
                      ))}
                  </RHFSelect>
                  <RHFTextField size="small" name="altitude" label="Altitude(ft)" />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant="subtitle1">OUTSIDE AIR</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <RHFTextField size="small" name="outsideAirWinDry" label="Winter dry bulb temperature (F)" />
                  <RHFTextField size="small" name="outsideAirSumDry" label="Summer dry bulb temperature (F)" />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <RHFTextField size="small" name="outsideAirWinwet" label="Winter wet blub temperature (F)" />
                  <RHFTextField size="small" name="outsideAirSumWet" label="Summer wet bulb temperature (F)" />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <RHFTextField size="small" name="outsideAirWinRelative" label="Winter relative humidity (%)" />
                  <RHFTextField size="small" name="outsideAirSumRelative" label="Summer relative humidity (%)" />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant="subtitle1">Inside Air</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <RHFTextField size="small" name="insideAirWinDry" label="Winter dry bulb temperature (F)" />
                  <RHFTextField size="small" name="insideAirSumDry" label="Summer dry bulb temperature (F)" />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <RHFTextField size="small" name="insideAirWinwet" label="Winter wet blub temperature (F)" />
                  <RHFTextField size="small" name="insideAirSumWet" label="Summer wet bulb temperature (F)" />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <RHFTextField size="small" name="insideAirWinRelative" label="Winter relative humidity (%)" />
                  <RHFTextField size="small" name="insideAirSumRelative" label="Summer relative humidity (%)" />
                </Stack>
              </Box>
            </Card>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClickedBackBtn}>{!step ? 'Cancel' : 'Back'}</Button>
          <LoadingButton
            type={!step ? 'button' : 'submit'}
            variant="contained"
            onClick={!step ? onContinueBtnClicked : () => {}}
            loading={isSubmitting}
          >
            {!step ? 'Continue' : 'Create project'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
