import * as Yup from 'yup';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  // useNavigate,
  useParams,
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
import useAuth from '../../hooks/useAuth';
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
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { user } = useAuth();
  const { projectInitInfo, isLoading } = useSelector((state) => state.projects);
  const [shouldRunEffect, setShouldRunEffect] = useState(false);

  useEffect(() => {
    dispatch(getProjectsInfo());
  }, [dispatch]);

  const { baseOfDesign, UoM, applications, designCondition, companyInfo, weatherData, usersInfo } = projectInitInfo;

  const [expanded, setExpanded] = React.useState({ panel1: true, panel2: true });

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
    altitude: Yup.string(),
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
      companyNameId: !isLoading ? Number(projectInfo?.company_name_id || 0) : '',
      contactName: !isLoading ? projectInfo.contact_name : '',
      contactNameId: !isLoading ? Number(projectInfo?.company_contact_name_id || 0) : '',
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

  useEffect(() => {
    if (!formState.country || !formState.city || !formState.ashareDesignConditions || !shouldRunEffect) return;
    axios
      .post(`${serverUrl}/api/job/getoutdoorinfo`, {
        action: 'GET_ALL_DATA',
        country: formState.country,
        cityId: formState.city,
        designCondition: formState.ashareDesignConditions,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue, formState.country, formState.city, formState.ashareDesignConditions]);

  useEffect(() => {
    setTimeout(() => {
      setShouldRunEffect(true);
    }, 1000);
  }, []);

  const get_RH_By_DBWB = useCallback(
    (first, second, setValueId) => {
      if (first === '' || second === '') return;
      axios
        .post(`${serverUrl}/api/job/getoutdoorinfo`, {
          action: 'GET_RH_BY_DB_WB',
          first,
          second,
          altitude: formState.altitude,
        })
        .then((response) => {
          setValue(setValueId, response.data);
        });
    },
    [setValue, formState.altitude]
  );

  // get WB value from server
  const get_WB_By_DBRH = useCallback(
    (first, second, setValueId) => {
      if (first === '' || second === '') return;
      axios
        .post(`${serverUrl}/api/job/getoutdoorinfo`, {
          action: 'GET_WB_BY_DB_HR',
          first,
          second,
          altitude: formState.altitude,
        })
        .then((response) => {
          setValue(setValueId, response.data);
        });
    },
    [setValue, formState.altitude]
  );

  const handleChangeSummerOutdoorAirDBChanged = useCallback(
    (e) => {
      setValue('summer_air_db', e.target.value);
      get_RH_By_DBWB(formState.summer_air_db, formState.summer_air_wb, 'summer_air_rh');
    },
    [get_RH_By_DBWB, setValue, formState.summer_air_db, formState.summer_air_wb]
  );

  // Summer Outdoor Air WB
  const handleChangeSummerOutdoorAirWBChanged = useCallback(
    (e) => {
      setValue('summer_air_wb', e.target.value);
      get_RH_By_DBWB(formState.summer_air_db, formState.summer_air_wb, 'summer_air_rh');
    },
    [get_RH_By_DBWB, formState.summer_air_db, formState.summer_air_wb, setValue]
  );

  // Summer Outdoor Air RH
  const handleChangeSummerOutdoorAirRHChanged = useCallback(
    (e) => {
      setValue('summer_air_rh', e.target.value);
      get_WB_By_DBRH(formState.summer_air_db, formState.summer_air_rh, 'summer_air_wb');
    },
    [get_WB_By_DBRH, setValue, formState.summer_air_db, formState.summer_air_rh]
  );

  // Winter Outdoor Air DB
  const handleChangeWinterOutdoorAirDBChanged = useCallback(
    (e) => {
      setValue('winter_air_db', e.target.value);
      get_RH_By_DBWB(formState.winter_air_db, formState.winter_air_wb, 'winter_air_rh');
    },
    [get_RH_By_DBWB, setValue, formState.winter_air_db, formState.winter_air_wb]
  );

  // Winter Outdoor Air WB
  const handleChangeWinterOutdoorAirWBChanged = useCallback(
    (e) => {
      setValue('winter_air_wb', e.target.value);
      get_RH_By_DBWB(formState.winter_air_db, formState.winter_air_wb, 'winter_air_rh');
    },
    [get_RH_By_DBWB, setValue, formState.winter_air_db, formState.winter_air_wb]
  );

  // Winter Outdoor Air RH
  const handleChangeWinterOutdoorAirRHChanged = useCallback(
    (e) => {
      setValue('winter_air_rh', e.target.value);
      get_WB_By_DBRH(formState.winter_air_db, formState.winter_air_rh, 'winter_air_wb');
    },
    [get_WB_By_DBRH, setValue, formState.winter_air_db, formState.winter_air_rh]
  );

  // Summer Return Air DB
  const handleChangeSummerReturnAirDBChanged = useCallback(
    (e) => {
      setValue('summer_return_db', e.target.value);
      get_RH_By_DBWB(formState.summer_return_db, formState.summer_return_wb, 'summer_return_rh');
    },
    [get_RH_By_DBWB, setValue, formState.summer_return_db, formState.summer_return_wb]
  );

  // Summer Return Air WB
  const handleChangeSummerReturnAirWBChanged = useCallback(
    (e) => {
      setValue('summer_return_wb', e.target.value);
      get_RH_By_DBWB(formState.summer_return_db, formState.summer_return_wb, 'summer_return_rh');
    },
    [get_RH_By_DBWB, setValue, formState.summer_return_db, formState.summer_return_wb]
  );

  // Summer Return Air RH
  const handleChangeSummerReturnAirRHChanged = useCallback(
    (e) => {
      setValue('summer_return_rh', e.target.value);
      get_WB_By_DBRH(formState.summer_return_db, formState.summer_return_rh, 'summer_return_wb');
    },
    [get_WB_By_DBRH, setValue, formState.summer_return_db, formState.summer_return_rh]
  );

  // Winter Return Air DB
  const handleChangeWinterReturnAirDBChanged = useCallback(
    (e) => {
      setValue('winter_return_db', e.target.value);
      get_RH_By_DBWB(formState.winter_return_db, formState.winter_return_wb, 'winter_return_rh');
    },
    [get_RH_By_DBWB, setValue, formState.winter_return_db, formState.winter_return_wb]
  );

  // Winter Return Air WB
  const handleChangeWinterReturnAirWBChanged = useCallback(
    (e) => {
      setValue('winter_return_wb', e.target.value);
      get_RH_By_DBWB(formState.winter_return_db, formState.winter_return_wb, 'winter_return_rh');
    },
    [get_RH_By_DBWB, setValue, formState.winter_return_db, formState.winter_return_wb]
  );

  // Winter Return Air RH
  const handleChangeWinterReturnAirRHChanged = useCallback(
    (e) => {
      setValue('winter_return_rh', e.target.value);
      get_WB_By_DBRH(formState.winter_return_db, formState.winter_return_rh, 'winter_return_wb');
    },
    [get_WB_By_DBRH, setValue, formState.winter_return_db, formState.winter_return_rh]
  );

  const provStateInfo = useMemo(() => {
    const data = weatherData
      ?.filter((item) => item.country === (formState.country === 'CA' ? 'CAN' : formState.country))
      .map((item) => item.prov_state);
    if (data) {
      const uniqueArray = [...new Set(data)];
      setValue('state', uniqueArray && uniqueArray[0] ? uniqueArray[0] : []);
      return uniqueArray;
    }
    return [];
  }, [weatherData, formState.country, setValue]);

  const cityInfo = useMemo(() => {
    const data = weatherData?.filter(
      (item) =>
        item.country === (formState.country === 'CA' ? 'CAN' : formState.country) && item.prov_state === formState.state
    );
    setValue('city', data && data[0] ? data[0].id : '');
    return data;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData, setValue, provStateInfo, formState.state]);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  // get all ourdoor infomation from server
  const getAllOutdoorInfo = useCallback(() => {
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
  }, [getValues, setValue]);

  // onChange handle for company Name
  const handleChangeCompanyName = useCallback(
    (e) => {
      setValue('companyNameId', e.target.value);
      setValue('companyName', e.nativeEvent.target[e.target.selectedIndex].text);
    },
    [setValue]
  );

  // onChange handle for contactName
  const handleChangeContactName = useCallback(
    (e) => {
      setValue('contactNameId', e.target.value);
      setValue('contactName', e.nativeEvent.target[e.target.selectedIndex].text);
    },
    [setValue]
  );

  // onChange handle for country
  const handleChangeCountry = useCallback(
    (e) => {
      setValue('country', e.target.value);
    },
    [setValue]
  );

  // onChange handle for State
  const handleChangeProvState = useCallback(
    (e) => {
      setValue('state', e.target.value);
    },
    [setValue]
  );

  // onChange handle for city
  const handleChangeCity = useCallback(
    (e) => {
      setValue('city', e.target.value);
    },
    [setValue]
  );

  // Onchange handle for design condition
  const handleChangeDesignCondition = useCallback(
    (e) => {
      setValue('ashareDesignConditions', e.target.value);
      getAllOutdoorInfo();
    },
    [getAllOutdoorInfo, setValue]
  );

  // handle submit
  const onProjectInfoSubmit = useCallback(
    async (data) => {
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
    },
    [dispatch, projectId, projectInfo.created_user_id]
  );

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
                          <RHFTextField
                            size="small"
                            name="jobName"
                            label="Project Name"
                            disabled={!Number(user?.verified)}
                          />
                          <RHFSelect
                            size="small"
                            name="application"
                            label="Applicaton"
                            disabled={!Number(user?.verified)}
                            placeholder=""
                          >
                            {applications.map((info, index) => (
                              <option key={index} value={info.id}>
                                {info.items}
                              </option>
                            ))}
                          </RHFSelect>
                          <RHFSelect
                            size="small"
                            name="basisOfDesign"
                            label="Basis of Design"
                            disabled={!Number(user?.verified)}
                            placeholder=""
                          >
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
                            disabled={!Number(user?.verified)}
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
                          {console.log(getValues("contactNameId"), localStorage.getItem('userId'))}
                          <RHFSelect
                            size="small"
                            name="contactNameId"
                            label="Contact Name"
                            placeholder=""
                            onChange={handleChangeContactName}
                            disabled={!Number(user?.verified)}
                          >
                            <option value="" />
                            {usersInfo.map(
                              (info, index) =>
                                info.id.toString() !== localStorage.getItem('userId') &&
                                info.customer_id.toString() === getValues("companyNameId").toString() && (
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
                          <RHFSelect
                            size="small"
                            name="uom"
                            label="UoM"
                            placeholder=""
                            disabled={!Number(user?.verified)}
                          >
                            <option value="" />
                            {UoM.map((info, index) => (
                              <option key={index} value={info.id}>
                                {info.items}
                              </option>
                            ))}
                          </RHFSelect>
                          <RHFTextField
                            size="small"
                            name="referenceNo"
                            label="Reference no"
                            disabled={!Number(user?.verified)}
                          />
                          <RHFTextField
                            size="small"
                            name="revision"
                            label="Revision no"
                            disabled={!Number(user?.verified)}
                          />
                          <RHFTextField
                            size="small"
                            name="createdDate"
                            label="Date Created"
                            disabled={!Number(user?.verified)}
                          />
                          <RHFTextField
                            size="small"
                            name="revisedDate"
                            label="Date Revised"
                            disabled={!Number(user?.verified)}
                          />
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
                            disabled={!Number(user?.verified)}
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
                            disabled={!Number(user?.verified)}
                          >
                            <option value="" />
                            {provStateInfo?.map((info, index) => (
                              <option key={index} value={info}>
                                {info}
                              </option>
                            ))}
                          </RHFSelect>
                          <RHFSelect
                            size="small"
                            name="city"
                            label="City"
                            placeholder=""
                            onChange={handleChangeCity}
                            disabled={!Number(user?.verified)}
                          >
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
                            disabled={!Number(user?.verified)}
                          >
                            {designCondition.map((info, index) => (
                              <option key={index} value={info.id}>
                                {info.items}
                              </option>
                            ))}
                          </RHFSelect>
                          <RHFTextField
                            size="small"
                            name="altitude"
                            label="Altitude"
                            disabled={!Number(user?.verified)}
                          />
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
                            onBlur={handleChangeSummerOutdoorAirDBChanged}
                            disabled={!Number(user?.verified)}
                          />
                          <RHFTextField
                            size="small"
                            name="summer_air_wb"
                            label="Summer Outdoor Air WB (F)"
                            onBlur={handleChangeSummerOutdoorAirWBChanged}
                            disabled={!Number(user?.verified)}
                          />
                          <RHFTextField
                            size="small"
                            name="summer_air_rh"
                            label="Summer Outdoor Air RH (%)"
                            onBlur={handleChangeSummerOutdoorAirRHChanged}
                            disabled={!Number(user?.verified)}
                          />
                          <RHFTextField
                            size="small"
                            name="winter_air_db"
                            label="Winter Outdoor Air DB"
                            onBlur={handleChangeWinterOutdoorAirDBChanged}
                            disabled={!Number(user?.verified)}
                          />
                          <RHFTextField
                            size="small"
                            name="winter_air_wb"
                            label="Winter Outdoor Air WB"
                            onBlur={handleChangeWinterOutdoorAirWBChanged}
                            disabled={!Number(user?.verified)}
                          />
                          <RHFTextField
                            size="small"
                            name="winter_air_rh"
                            label="Winter Outdoor Air RH"
                            onBlur={handleChangeWinterOutdoorAirRHChanged}
                            disabled={!Number(user?.verified)}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFTextField
                            size="small"
                            name="summer_return_db"
                            label="Summer Return Air DB (F)"
                            onBlur={handleChangeSummerReturnAirDBChanged}
                            disabled={!Number(user?.verified)}
                          />
                          <RHFTextField
                            size="small"
                            name="summer_return_wb"
                            label="Summer Return Air WB (F)"
                            onBlur={handleChangeSummerReturnAirWBChanged}
                            disabled={!Number(user?.verified)}
                          />
                          <RHFTextField
                            size="small"
                            name="summer_return_rh"
                            label="Summer Return Air RH (%)"
                            onBlur={handleChangeSummerReturnAirRHChanged}
                            disabled={!Number(user?.verified)}
                          />
                          <RHFTextField
                            size="small"
                            name="winter_return_db"
                            label="Winter Return Air DB"
                            onBlur={handleChangeWinterReturnAirDBChanged}
                            disabled={!Number(user?.verified)}
                          />
                          <RHFTextField
                            size="small"
                            name="winter_return_wb"
                            label="Winter Return Air WB"
                            onBlur={handleChangeWinterReturnAirWBChanged}
                            disabled={!Number(user?.verified)}
                          />
                          <RHFTextField
                            size="small"
                            name="winter_return_rh"
                            label="Winter Return Air RH"
                            onBlur={handleChangeWinterReturnAirRHChanged}
                            disabled={!Number(user?.verified)}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                {Number(user?.verified) ? (
                  <Stack sx={{ mb: '20px!important' }} direction="row" justifyContent="flex-end">
                    <Box sx={{ width: '150px' }}>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        onClick={() => console.log(getValues())}
                        loading={isSubmitting}
                        sx={{ width: '150px' }}
                        disabled={!Number(user?.verified)}
                      >
                        Save
                      </LoadingButton>
                    </Box>
                  </Stack>
                ) : (
                  <></>
                )}
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
