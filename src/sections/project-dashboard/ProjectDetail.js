import * as Yup from 'yup';
import React, { useState, useEffect, useMemo } from 'react';
import {
  // useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import PropTypes from 'prop-types';

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
  Snackbar,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// paths
// import { PATH_PROJECT } from '../../routes/paths';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { getProjectsInfo, updateProject } from '../../redux/slices/projectsReducer';
import { updateProjectInfo } from '../../redux/slices/projectDashboardReducer';
// components
import Page from '../../components/Page';
import { FormProvider, RHFTextField, RHFSelect } from '../../components/hook-form';
import Iconify from '../../components/Iconify';
// utils
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';
// theme

//------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(3),
  },
}));
//------------------------------------------------

ProjectDetail.propTypes = {
  projectInfo: PropTypes.object,
};

export default function ProjectDetail({ projectInfo }) {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { state } = useLocation();
  const { projectInitInfo, isLoading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getProjectsInfo());
  }, [dispatch]);

  const { baseOfDesign, UoM, applications, designCondition, companyInfo, weatherData, provState, usersInfo } =
    projectInitInfo;

  const [expanded, setExpanded] = React.useState({ panel1: true, panel2: false });
  const [companyNameId, setCompanyNameId] = useState(
    state !== null ? state.companyNameId : !isLoading && projectInfo.company_name_id
  );

  const [openSuccess, setOpenSuccess] = useState(false);
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const [openFail, setOpenFail] = useState(false);
  const handleCloseFail = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenFail(false);
  };

  console.log(projectInfo, projectInitInfo, isLoading);
  const projectInfoSchema = Yup.object().shape({
    jobName: Yup.string().required('Please enter a Project Name'),
    basisOfDesign: Yup.string().required('Please enter a Basis Of Design'),
    referenceNo: Yup.string().required('Please select a Reference'),
    revision: Yup.string().required('Please enter a Revision'),
    createdDate: Yup.string().required('Please enter a Created Date'),
    revisedDate: Yup.string().required('Please enter a Revised Date'),
    companyName: Yup.string(),
    companyNameId: Yup.string().required('Please enter a Company Name'),
    contactName: Yup.string(),
    contactNameId: Yup.number(),
    application: Yup.string().required('Please enter a Application'),
    uom: Yup.string().required('Please select a UoM'),
    country: Yup.string().required('Please select a County'),
    state: Yup.string().required('Please select a Province / State'),
    city: Yup.string().required('Please select a City'),
    ashareDesignConditions: Yup.string().required('Please enter an ASHARE Design Conditions'),
    alltitude: Yup.string(),
    summer_air_db: Yup.string(),
    summer_air_wb: Yup.string(),
    summer_air_rh: Yup.string(),
    winter_air_db: Yup.string(),
    winter_air_wb: Yup.string(),
    winter_air_rh: Yup.string(),
    summer_return_db: Yup.string(),
    summer_return_wb: Yup.string(),
    summer_return_rh: Yup.string(),
    winter_return_db: Yup.string(),
    winter_return_wb: Yup.string(),
    winter_return_rh: Yup.string(),
    testNewPrice: Yup.number(),
  });

  const defaultValues = useMemo(
    () => ({
      jobName: !isLoading ? projectInfo.job_name : '',
      basisOfDesign: !isLoading ? projectInfo.basis_of_design_id : '',
      referenceNo: !isLoading ? projectInfo.reference_no : '',
      revision: !isLoading ? projectInfo.revision_no : '',
      createdDate: !isLoading ? projectInfo.created_date : '',
      revisedDate: !isLoading ? projectInfo.revised_date : '',
      companyName: !isLoading ? projectInfo.company_name : '',
      companyNameId: !isLoading ? projectInfo.company_name_id : '',
      contactName: !isLoading ? projectInfo.contact_name : '',
      contactNameId: !isLoading ? projectInfo.contact_name_id : '',
      application: !isLoading ? projectInfo.application_id : '',
      uom: !isLoading ? projectInfo.uom_id : '',
      country: !isLoading ? projectInfo.country : '',
      state: !isLoading ? projectInfo.prov_state : '',
      city: !isLoading ? projectInfo.city_id : '',
      ashareDesignConditions: !isLoading ? projectInfo.design_conditions_id : 0,
      altitude: !isLoading ? projectInfo.altitude : '',
      summer_air_db: !isLoading ? projectInfo.summer_outdoor_air_db : '',
      summer_air_wb: !isLoading ? projectInfo.summer_outdoor_air_rh : '',
      summer_air_rh: !isLoading ? projectInfo.summer_outdoor_air_wb : '',
      winter_air_db: !isLoading ? projectInfo.winter_outdoor_air_db : '',
      winter_air_wb: !isLoading ? projectInfo.winter_outdoor_air_rh : '',
      winter_air_rh: !isLoading ? projectInfo.winter_outdoor_air_wb : '',
      summer_return_db: !isLoading ? projectInfo.summer_return_air_db : '',
      summer_return_wb: !isLoading ? projectInfo.summer_return_air_rh : '',
      summer_return_rh: !isLoading ? projectInfo.summer_return_air_wb : '',
      winter_return_db: !isLoading ? projectInfo.winter_return_air_db : '',
      winter_return_wb: !isLoading ? projectInfo.winter_return_air_rh : '',
      winter_return_rh: !isLoading ? projectInfo.winter_return_air_wb : '',
      testNewPrice: projectInfo && !isLoading ? projectInfo.is_test_new_price : 0,
    }),
    [projectInfo, isLoading]
  );

  const methods = useForm({
    resolver: yupResolver(projectInfoSchema),
    defaultValues,
  });

  const {
    setValue,
    getValues,
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const formState = watch();

  const provStateInfo = useMemo(() => {
    const data = provState?.filter((item) => item.country === (formState.country === "CA" ? "CAN" : formState.country ));
    setValue('state', data && data[0] ? data[0].prov_state : []);
    return data;
  }, [provState, setValue, formState.country]);

  const cityInfo = useMemo(() => {
    const data = weatherData?.filter(
      (item) => item.country === (formState.country === "CA" ? "CAN" : formState.country ) && item.prov_state === formState.state
    );
    setValue('city', data && data[0] ? data[0].id : '');
    return data;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData, setValue, provStateInfo, formState.state]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  // get all ourdoor infomation from server
  const getAllOutdoorInfo = () => {
    axios
      .post(`${serverUrl}/api/project/getoutdoorinfo`, {
        action: 'GET_ALL_DATA',
        country: getValues('country'),
        cityId: getValues('city'),
        designCondition: getValues('ashareDesignConditions'),
      })
      .then((response) => {
        const { data } = response;
        setValue('altitude', data.altitude);
        setValue('summer_air_db', data.summerOutdoorAirDB);
        setValue('summer_air_wb', data.summerOutdoorAirWB);
        setValue('summer_air_rh', data.summerOutdoorAirRH);
        setValue('winter_air_db', data.winterOutdoorAirDB);
        setValue('winter_air_wb', data.winterOutdoorAirWB);
        setValue('winter_air_rh', data.winterOutdoorAirRH);
      });
  };

  // // get HR value from server
  // const get_RH_By_DBWB = (first, second, setValueId) => {
  //   if (first === '' || second === '') return;
  //   axios
  //     .post(`${serverUrl}/api/project/getoutdoorinfo`, {
  //       action: 'GET_RH_BY_DB_WB',
  //       first,
  //       second,
  //       altitude: getValues('altitude'),
  //     })
  //     .then((response) => {
  //       setValue(setValueId, response.data);
  //     });
  // };

  // // get WB value from server
  // const get_WB_By_DBRH = (first, second, setValueId) => {
  //   if (first === '' || second === '') return;
  //   axios
  //     .post(`${serverUrl}/api/project/getoutdoorinfo`, {
  //       action: 'GET_WB_BY_DB_HR',
  //       first,
  //       second,
  //       altitude: getValues('altitude'),
  //     })
  //     .then((response) => {
  //       setValue(setValueId, response.data);
  //     });
  // };

  // onChange handle for company Name
  const handleChangeCompanyName = (e) => {
    setValue('companyNameId', e.target.value);
    setValue('companyName', e.nativeEvent.target[e.target.selectedIndex].text);
    setCompanyNameId(e.target.value);
  };

  // onChange handle for contactName
  const handleChangeContactName = (e) => {
    setValue('contactNameId', e.target.value);
    setValue('contactName', e.nativeEvent.target[e.target.selectedIndex].text);
  };

  // onChange handle for country
  const handleChangeCountry = (e) => {
    setValue('country', e.target.value);
  };

  // onChange handle for State
  const handleChangeProvState = (e) => {
    setValue('state', e.target.value);
  };

  // onChange handle for city
  const handleChangeCity = (e) => {
    setValue('city', e.target.value);
    // getAllOutdoorInfo();
  };

  // Onchange handle for design condition
  const handleChangeDesignCondition = (e) => {
    setValue('ashareDesignConditions', e.target.value);
    getAllOutdoorInfo();
  };

  // Summer Outdoor Air DB
  const handleChangeSummerOutdoorAirDBChanged = (e) => {
    setValue('summer_air_db', e.target.value);
    // get_RH_By_DBWB(getValues('summer_air_db'), getValues('summer_air_wb'), 'summer_air_rh');
  };
  // Summer Outdoor Air WB
  const handleChangeSummerOutdoorAirWBChanged = (e) => {
    setValue('summer_air_wb', e.target.value);
    // get_RH_By_DBWB(getValues('summer_air_db'), getValues('summer_air_wb'), 'summer_air_rh');
  };
  // Summer Outdoor Air RH
  const handleChangeSummerOutdoorAirRHChanged = (e) => {
    setValue('summer_air_rh', e.target.value);
    // get_WB_By_DBRH(getValues('summer_air_db'), getValues('summer_air_rh'), 'summer_air_wb');
  };

  // Winter Outdoor Air DB
  const handleChangeWinterOutdoorAirDBChanged = (e) => {
    setValue('winter_air_db', e.target.value);
    // get_RH_By_DBWB(getValues('winter_air_db'), getValues('winter_air_wb'), 'winter_air_rh');
  };

  // Winter Outdoor Air WB
  const handleChangeWinterOutdoorAirWBChanged = (e) => {
    setValue('winter_air_wb', e.target.value);
    // get_RH_By_DBWB(getValues('winter_air_db'), getValues('winter_air_wb'), 'winter_air_rh');
  };

  // Winter Outdoor Air RH
  const handleChangeWinterOutdoorAirRHChanged = (e) => {
    setValue('winter_air_rh', e.target.value);
    // get_WB_By_DBRH(getValues('winter_air_db'), getValues('winter_air_rh'), 'winter_air_wb');
  };

  // Summer Return Air DB
  const handleChangeSummerReturnAirDBChanged = (e) => {
    setValue('summer_return_db', e.target.value);
    // get_RH_By_DBWB(getValues('summer_return_db'), getValues('summer_return_wb'), 'summer_return_rh');
  };
  // Summer Return Air WB
  const handleChangeSummerReturnAirWBChanged = (e) => {
    setValue('summer_return_wb', e.target.value);
    // get_RH_By_DBWB(getValues('summer_return_db'), getValues('summer_return_wb'), 'summer_return_rh');
  };
  // Summer Return Air RH
  const handleChangeSummerReturnAirRHChanged = (e) => {
    setValue('summer_return_rh', e.target.value);
    // get_WB_By_DBRH(getValues('summer_return_db'), getValues('summer_return_rh'), 'summer_return_wb');
  };

  // Winter Return Air DB
  const handleChangeWinterReturnAirDBChanged = (e) => {
    setValue('winter_return_db', e.target.value);
    // get_RH_By_DBWB(getValues('winter_return_db'), getValues('winter_return_wb'), 'winter_return_rh');
  };

  // Winter Return Air WB
  const handleChangeWinterReturnAirWBChanged = (e) => {
    setValue('winter_return_wb', e.target.value);
    // get_RH_By_DBWB(getValues('winter_return_db'), getValues('winter_return_wb'), 'winter_return_rh');
  };

  // Winter Return Air RH
  const handleChangeWinterReturnAirRHChanged = (e) => {
    setValue('winter_return_rh', e.target.value);
    // get_WB_By_DBRH(getValues('winter_return_db'), getValues('winter_return_rh'), 'winter_return_wb');
  };

  // handle submit
  const onProjectInfoSubmit = async (data) => {
    try {
      const newData = await dispatch(
        updateProject({
          ...data,
          jobId: projectId,
          createdUserId: projectInfo.created_user_id,
          revisedUserId: localStorage.getItem('userId'),
          applicationOther: '',
        })
      );
      await dispatch(updateProjectInfo(newData));
      setOpenSuccess(true);
    } catch (error) {
      setOpenFail(true);
      console.error(error);
    }
  };

  return (
    <Page title="Project: Edit">
      <RootStyle>
        <Container>
          <FormProvider methods={methods} onSubmit={handleSubmit(onProjectInfoSubmit)}>
            {isLoading ? (
              <LinearProgress color="info" />
            ) : (
              <Stack spacing={2}>
                <Accordion
                  expanded={expanded.panel1}
                  onChange={() => setExpanded({ ...expanded, panel1: !expanded.panel1 })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>PROJECT INFO & LOCATION</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={5}>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFTextField size="small" name="jobName" label="Project Name" />
                          <RHFSelect size="small" name="application" label="Applicaton" placeholder="">
                            {applications.map((info, index) => (
                              <option key={index} value={info.id}>
                                {info.items}
                              </option>
                            ))}
                          </RHFSelect>
                          <RHFSelect size="small" name="basisOfDesign" label="Basis of Design" placeholder="">
                            {baseOfDesign.map((info, index) => (
                              <option key={index} value={info.id}>
                                {info.items}
                              </option>
                            ))}
                          </RHFSelect>
                          <RHFSelect
                            size="small"
                            name="companyNameId"
                            label="Company Name"
                            placeholder=""
                            onChange={handleChangeCompanyName}
                          >
                            <option value="" />
                            {companyInfo.map(
                              (info, index) =>
                                info.id.toString() === localStorage.getItem('customerId') && (
                                  <option key={index} value={info.id}>
                                    {info.name}
                                  </option>
                                )
                            )}
                          </RHFSelect>
                          <RHFSelect
                            size="small"
                            name="contactNameId"
                            label="Contact Name"
                            placeholder=""
                            onChange={handleChangeContactName}
                          >
                            <option value="" />
                            {usersInfo.map(
                              (info, index) =>
                                info.id.toString() !== localStorage.getItem('userId') &&
                                info.customer_id.toString() === companyNameId && (
                                  <option key={index} value={info.id}>
                                    {`${info.first_name} ${info.last_name}`}
                                  </option>
                                )
                            )}
                          </RHFSelect>
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFSelect size="small" name="uom" label="UoM" placeholder="">
                            <option value="" />
                            {UoM.map((info, index) => (
                              <option key={index} value={info.id}>
                                {info.items}
                              </option>
                            ))}
                          </RHFSelect>
                          <RHFTextField size="small" name="referenceNo" label="Reference no" />
                          <RHFTextField size="small" name="revision" label="Revision no" />
                          <RHFTextField size="small" name="createdDate" label="Date Created" />
                          <RHFTextField size="small" name="revisedDate" label="Date Revised" />
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFSelect
                            size="small"
                            name="country"
                            label="Country"
                            placeholder=""
                            onChange={handleChangeCountry}
                          >
                            <option value="" />
                            {projectInitInfo?.country?.map((info, index) => (
                              <option key={index} value={info.value}>
                                {info.items}
                              </option>
                            ))}
                          </RHFSelect>
                          <RHFSelect
                            size="small"
                            name="state"
                            label="Province / State"
                            placeholder=""
                            onChange={handleChangeProvState}
                          >
                            <option value="" />
                            {provStateInfo?.map((info, index) => (
                              <option key={index} value={info.prov_state}>
                                {info.prov_state}
                              </option>
                            ))}
                          </RHFSelect>
                          <RHFSelect size="small" name="city" label="City" placeholder="" onChange={handleChangeCity}>
                            <option value="" />
                            {cityInfo?.map((info, index) => (
                              <option key={index} value={info.id}>
                                {info.station}
                              </option>
                            ))}
                          </RHFSelect>
                          <RHFSelect
                            size="small"
                            name="ashareDesignConditions"
                            label="ASHRAE Design Conditions"
                            placeholder=""
                            onChange={handleChangeDesignCondition}
                          >
                            {designCondition.map((info, index) => (
                              <option key={index} value={info.id}>
                                {info.items}
                              </option>
                            ))}
                          </RHFSelect>
                          <RHFTextField size="small" name="altitude" label="Altitude" />
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
                    <Typography>DESIGN CONDITIONS</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={5}>
                      <Grid item xs={6} md={6}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFTextField
                            size="small"
                            name="summer_air_db"
                            label="Summer Outdoor Air DB (F)"
                            onChange={handleChangeSummerOutdoorAirDBChanged}
                          />
                          <RHFTextField
                            size="small"
                            name="summer_air_wb"
                            label="Summer Outdoor Air WB (F)"
                            onChange={handleChangeSummerOutdoorAirWBChanged}
                          />
                          <RHFTextField
                            size="small"
                            name="summer_air_rh"
                            label="Summer Outdoor Air RH (%)"
                            onChange={handleChangeSummerOutdoorAirRHChanged}
                          />
                          <RHFTextField
                            size="small"
                            name="winter_air_db"
                            label="Winter Outdoor Air DB"
                            onChange={handleChangeWinterOutdoorAirDBChanged}
                          />
                          <RHFTextField
                            size="small"
                            name="winter_air_wb"
                            label="Winter Outdoor Air WB"
                            onChange={handleChangeWinterOutdoorAirWBChanged}
                          />
                          <RHFTextField
                            size="small"
                            name="winter_air_rh"
                            label="Winter Outdoor Air RH"
                            onChange={handleChangeWinterOutdoorAirRHChanged}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFTextField
                            size="small"
                            name="summer_return_db"
                            label="Summer Return Air DB (F)"
                            onChange={handleChangeSummerReturnAirDBChanged}
                          />
                          <RHFTextField
                            size="small"
                            name="summer_return_wb"
                            label="Summer Return Air WB (F)"
                            onChange={handleChangeSummerReturnAirWBChanged}
                          />
                          <RHFTextField
                            size="small"
                            name="summer_return_rh"
                            label="Summer Return Air RH (%)"
                            onChange={handleChangeSummerReturnAirRHChanged}
                          />
                          <RHFTextField
                            size="small"
                            name="winter_return_db"
                            label="Winter Return Air DB"
                            onChange={handleChangeWinterReturnAirDBChanged}
                          />
                          <RHFTextField
                            size="small"
                            name="winter_return_wb"
                            label="Winter Return Air WB"
                            onChange={handleChangeWinterReturnAirWBChanged}
                          />
                          <RHFTextField
                            size="small"
                            name="winter_return_rh"
                            label="Winter Return Air RH"
                            onChange={handleChangeWinterReturnAirRHChanged}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Stack sx={{ mb: '20px!important' }} direction="row" justifyContent="flex-end">
                  <Box sx={{ width: '150px' }}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      onClick={() => console.log(getValues())}
                      loading={isSubmitting}
                      sx={{ width: '150px' }}
                    >
                      Save
                    </LoadingButton>
                  </Box>
                </Stack>
              </Stack>
            )}
          </FormProvider>
        </Container>
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
      </RootStyle>
    </Page>
  );
}
