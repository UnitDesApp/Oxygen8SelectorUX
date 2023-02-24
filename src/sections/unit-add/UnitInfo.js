import * as Yup from 'yup';
import React, { useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import {
  Container,
  Box,
  Grid,
  Typography,
  LinearProgress,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Alert,
  AlertTitle,
  TextField,
} from '@mui/material';
// import { LoadingButton } from '@mui/lab';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// paths
import { PATH_PROJECT } from '../../routes/paths';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { addNewProject, updateProject } from '../../redux/slices/projectsReducer';
// components
import Page from '../../components/Page';
import { FormProvider, RHFTextField, RHFSelect, RHFUploadSingleFile } from '../../components/hook-form';
import Iconify from '../../components/Iconify';
// utils
// import axios from '../../utils/axios';
// config
// import { serverUrl } from '../../config';
// theme

//------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(3),
  mb: '100px',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(3),
  },
}));
//------------------------------------------------

export default function UnitInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const {
    projectList,
    // isLoading
  } = useSelector((state) => state.projects);
  const isLoading = false;
  const isNew = window.location.href.includes('new');

  useEffect(() => {
    // dispatch(getProjectsInfo());
  }, [dispatch]);

  const tempArray = projectList.filter((item) => item.id.toString() === projectId);
  const projectInfo = tempArray[0];

  const [expanded, setExpanded] = React.useState({
    panel1: true,
    panel2: true,
    panel3: true,
    panel4: true,
    panel5: true,
    panel6: true,
    panel7: true,
  });

  console.log(projectInfo);
  const projectInfoSchema = Yup.object().shape({
    tag: Yup.string().required('This field is required'),
    ervhrv: Yup.string().required('This field is required'),
    quality: Yup.string().required('This field is required'),
    location: Yup.string().required('This field is required'),
    orientation: Yup.string().required('This field is required'),
    supplyAir1: Yup.string().required('This field is required'),
    exhaustAir: Yup.string().required('This field is required'),
    supplyAir2: Yup.string().required('This field is required'),
    exhaustESP: Yup.string().required('This field is required'),
    unitModel: Yup.string().required('This field is required'),
    unitVoltage: Yup.string().required('This field is required'),
    bypass: Yup.string().required('This field is required'),
    controls: Yup.string().required('This field is required'),
    preheatOptions: Yup.string().required('This field is required'),
    setpoint: Yup.string().required('This field is required'),
    heatingFluidType: Yup.string().required('This field is required'),
    heatingFluidPercent: Yup.string().required('This field is required'),
    heatingFluidEngTemp: Yup.string().required('This field is required'),
    heatingFluidLvgTemp: Yup.string().required('This field is required'),
    coolingOption: Yup.string().required('This field is required'),
    heatingOption: Yup.string().required('This field is required'),
    altitude: Yup.string().required('This field is required'),
    exhaustAirOpening: Yup.string().required('This field is required'),
    outdoorAirOpening: Yup.string().required('This field is required'),
    returnAirOpening: Yup.string().required('This field is required'),
  });
  const defaultValues = useMemo(
    () =>
      !isLoading
        ? {
            tag: '',
            ervhrv: '',
            quality: '',
            location: '',
            orientation: '',
            supplyAir1: '',
            exhaustAir: '',
            supplyAir2: '',
            exhaustESP: '',
            unitModel: '',
            unitVoltage: '',
            bypass: '',
            controls: '',
            preheatOptions: '',
            setpoint: '',
            heatingFluidType: '',
            heatingFluidPercent: '',
            heatingFluidEngTemp: '',
            heatingFluidLvgTemp: '',
            coolingOption: '',
            heatingOption: '',
            altitude: '',
            exhaustAirOpening: '',
            outdoorAirOpening: '',
            returnAirOpening: '',
          }
        : {},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const methods = useForm({
    resolver: yupResolver(projectInfoSchema),
    defaultValues,
  });

  const {
    setValue,
    // getValues,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  // handle submit
  const onProjectInfoSubmit = async (data) => {
    try {
      if (isNew) {
        const result = await dispatch(
          addNewProject({
            ...data,
            projectId: -1,
            createdUserId: localStorage.getItem('userId'),
            revisedUserId: localStorage.getItem('userId'),
            applicationOther: '',
            testNewPrice: data.testNewPrice ? 1 : 0,
          })
        );
        navigate(PATH_PROJECT.dashboard(result));
      } else {
        await dispatch(
          updateProject({
            ...data,
            projectId,
            createdUserId: projectInfo.created_user_id,
            revisedUserId: localStorage.getItem('userId'),
            applicationOther: '',
            testNewPrice: data.testNewPrice ? 1 : 0,
          })
        );
        navigate(PATH_PROJECT.dashboard(projectId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'cover',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Page title="Project: Edit">
      <RootStyle>
        <Container>
          <FormProvider methods={methods} onSubmit={handleSubmit(onProjectInfoSubmit)}>
            {isLoading ? (
              <LinearProgress color="info" />
            ) : (
              <Stack spacing={2} sx={{ marginBottom: '150px' }}>
                <Accordion
                  expanded={expanded.panel1}
                  onChange={() => setExpanded({ ...expanded, panel1: !expanded.panel1 })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="primary.main" variant="h6">
                      UNIT DETAILS
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={5}>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFTextField size="small" name="tag" label="Tag" />
                          <RHFTextField size="small" name="ervhrv" label="ERV/HRV" />
                          <RHFTextField size="small" name="quality" label="Quality" />
                          <RHFTextField size="small" name="location" label="Location" />
                          <RHFTextField size="small" name="orientation" label="Orientation" />
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFTextField size="small" name="supplyAir1" label="Supply Air" />
                          <RHFTextField size="small" name="exhaustAir" label="Exhaust Air" />
                          <RHFTextField size="small" name="supplyAir2" label="Supply Air" />
                          <RHFTextField size="small" name="exhaustESP" label="Exhaust ESP" />
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFTextField size="small" name="unitModel" label="Unit Model" />
                          <RHFTextField size="small" name="unitVoltage" label="Unit Voltage" />
                          <RHFTextField size="small" name="bypass" label="Bypass" />
                          <RHFTextField size="small" name="controls" label="Controls" />
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded.panel2}
                  onChange={() => setExpanded({ ...expanded, panel2: !expanded.panel2 })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="primary.main" variant="h6">
                      PRE-HEAT: HWC
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={5}>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFSelect size="small" name="preheatOptions" label="Pre-heat options" placeholder="">
                            <option value={0}>HWC</option>
                          </RHFSelect>
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFTextField size="small" name="setpoint" label="Setpoint" />
                          <Alert variant="outlined" severity="info">
                            <AlertTitle>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</AlertTitle>
                            <Stack direction="row" justifyContent="left" alignItems="center" sx={{ cursor: 'pointer' }}>
                              <Typography color="primary.main" variant="h6">
                                Learn more
                              </Typography>
                              <Iconify
                                color="primary.main"
                                icon="ic:baseline-keyboard-arrow-right"
                                width="24px"
                                height="24px"
                              />
                            </Stack>
                          </Alert>
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFSelect size="small" name="heatingFluidType" label="Heating fluid type" placeholder="">
                            <option value={0}>Water</option>
                          </RHFSelect>
                          <RHFSelect size="small" name="heatingFluidPercent" label="Heating fluid %" placeholder="">
                            <option value={0}>100%</option>
                            <option value={0}>90%</option>
                            <option value={0}>80%</option>
                            <option value={0}>70%</option>
                            <option value={0}>60%</option>
                            <option value={0}>50%</option>
                          </RHFSelect>
                          <RHFTextField size="small" name="heatingFluidEngTemp" label="Heating fluid eng temp (F)" />
                          <RHFTextField size="small" name="heatingFluidLvgTemp" label="Heating fluid lvg temp (F)" />
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded.panel3}
                  onChange={() => setExpanded({ ...expanded, panel3: !expanded.panel3 })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="primary.main" variant="h6">
                      COOLING: NONE
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={5}>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFSelect size="small" name="coolingOption" label="Cooling options" placeholder="">
                            <option value={0}>None</option>
                          </RHFSelect>
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded.panel4}
                  onChange={() => setExpanded({ ...expanded, panel4: !expanded.panel4 })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="primary.main" variant="h6">
                      HEATING: NONE
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={5}>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFSelect size="small" name="heatingOption" label="Heating options" placeholder="">
                            <option value={0}>None</option>
                          </RHFSelect>
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded.panel5}
                  onChange={() => setExpanded({ ...expanded, panel5: !expanded.panel5 })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="primary.main" variant="h6">
                      ACCESSORIES
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={5}>
                      <Grid item xs={12} md={12}>
                        <Typography color="gray" textAlign="center">
                          Select components to display options and configurations
                        </Typography>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded.panel6}
                  onChange={() => setExpanded({ ...expanded, panel6: !expanded.panel6 })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="primary.main" variant="h6">
                      LAYOUT
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={5}>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFSelect size="small" name="altitude" label="Altitude (ft)" placeholder="">
                            <option value={0}>None</option>
                          </RHFSelect>
                          <RHFSelect size="small" name="exhaustAirOpening" label="Exhaust air opening" placeholder="">
                            <option value={0}>None</option>
                          </RHFSelect>
                          <RHFSelect size="small" name="outdoorAirOpening" label="Outdoor air opening" placeholder="">
                            <option value={0}>None</option>
                          </RHFSelect>
                          <RHFSelect size="small" name="returnAirOpening" label="Return air opening" placeholder="">
                            <option value={0}>None</option>
                          </RHFSelect>
                        </Box>
                      </Grid>
                      <Grid item xs={8} md={8}>
                        <RHFUploadSingleFile
                          name="layoutImage"
                          accept="image/*"
                          maxSize={3145728}
                          onDrop={handleDrop}
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded.panel7}
                  onChange={() => setExpanded({ ...expanded, panel7: !expanded.panel7 })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="primary.main" variant="h6">
                      CONFIGURATION NOTES
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container>
                      <TextField label="Take a note..." variant="standard" fullWidth />
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Stack>
            )}
          </FormProvider>
        </Container>
      </RootStyle>
    </Page>
  );
}
