import * as Yup from 'yup';
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Box, Grid, CardHeader, CardContent, Card, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// paths
import { PATH_PROJECT, PATH_PROJECTS } from '../routes/paths';
// redux
import { useSelector, useDispatch } from '../redux/store';
import { getProjectsInfo, addNewProject, updateProject } from '../redux/slices/projectsReducer';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { FormProvider, RHFTextField, RHFSelect, RHFCheckbox } from '../components/hook-form';
import Iconify from '../components/Iconify';
// utils
import axios from '../utils/axios';
// config
import { serverUrl } from '../config';

//------------------------------------------------

const CardHeaderStyle = styled(CardHeader)(({ theme }) => ({
  padding: '15px 30px',
  // color: 'white',
  color: theme.palette.primary.main,
}));

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));
//------------------------------------------------

export default function EditProjectInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { state } = useLocation();
  const { projectList, projectInitInfo, isLoading } = useSelector((state) => state.projects);
  const isNew = window.location.href.includes('new');

  useEffect(() => {
    dispatch(getProjectsInfo());
  }, [dispatch]);

  const { baseOfDesign, UoM, country, applications, designCondition, companyInfo, weatherData, provState, usersInfo } =
  projectInitInfo;

  const tempArray = projectList.filter((item) => item.id.toString() === projectId);
  const projectInfo = tempArray[0];

  const [provStateInfo, setProvStateInfo] = useState([]);
  const [cityInfo, setCityInfo] = useState([]);
  const [companyNameId, setCompanyNameId] = useState(
    state !== null ? state.companyNameId : !isLoading && projectInfo.company_name_id
  );
  console.log(projectInfo);
  const projectInfoSchema = Yup.object().shape({
    projectName: Yup.string().required('Please enter a Project Name'),
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
    ashareDesignConditions: Yup.string().required('Please enter a ASHARE Design Conditions'),
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
    testNewPrice: Yup.bool(),
  });
  const defaultValues = useMemo(
    () =>
      !isLoading
        ? {
            projectName: projectInfo ? projectInfo.project_name : state.projectName,
            basisOfDesign: projectInfo ? projectInfo.basis_of_design_id : 1,
            referenceNo: projectInfo ? projectInfo.reference_no : state.referenceNo,
            revision: projectInfo ? projectInfo.revision_no : 0,
            createdDate: projectInfo ? projectInfo.created_date : state.createdDate,
            revisedDate: projectInfo ? projectInfo.revised_date : state.revisedDate,
            companyName: projectInfo ? projectInfo.company_name : state.companyName,
            companyNameId: projectInfo ? projectInfo.company_name_id : state.companyNameId,
            contactName: projectInfo ? projectInfo.contact_name : '',
            contactNameId: projectInfo ? projectInfo.contact_name_id : 0,
            application: projectInfo ? projectInfo.application_id : state.applicationId,
            uom: projectInfo ? projectInfo.uom_id : 1,
            country: projectInfo ? projectInfo.country : '',
            state: projectInfo ? projectInfo.prov_state : '',
            city: projectInfo ? projectInfo.city_id : '',
            ashareDesignConditions: projectInfo ? projectInfo.design_conditions_id : 1,
            altitude: projectInfo ? projectInfo.altitude : 0,
            summer_air_db: projectInfo ? projectInfo.summer_outdoor_air_db : 0,
            summer_air_wb: projectInfo ? projectInfo.summer_outdoor_air_rh : 0,
            summer_air_rh: projectInfo ? projectInfo.summer_outdoor_air_wb : 0,
            winter_air_db: projectInfo ? projectInfo.winter_outdoor_air_db : 0,
            winter_air_wb: projectInfo ? projectInfo.winter_outdoor_air_rh : 0,
            winter_air_rh: projectInfo ? projectInfo.winter_outdoor_air_wb : 0,
            summer_return_db: projectInfo ? projectInfo.summer_return_air_db : 75,
            summer_return_wb: projectInfo ? projectInfo.summer_return_air_rh : 63,
            summer_return_rh: projectInfo ? projectInfo.summer_return_air_wb : 51.17,
            winter_return_db: projectInfo ? projectInfo.winter_return_air_db : 70,
            winter_return_wb: projectInfo ? projectInfo.winter_return_air_rh : 52.9,
            winter_return_rh: projectInfo ? projectInfo.winter_return_air_wb : 30,
            testNewPrice: projectInfo && projectInfo.is_test_new_price === 1,
          }
        : {},
    [projectInfo, state, isLoading]
  );

  const methods = useForm({
    resolver: yupResolver(projectInfoSchema),
    defaultValues,
  });

  useEffect(() => {
    if (provState && weatherData) {
      const provStateInfoTemp = provState.filter((item) => item.country === country[0].value);
      const cityInfoTemp = weatherData.filter(
        (item) => item.country === country[0].value && item.prov_state === provStateInfoTemp[0].prov_state
      );
      setProvStateInfo(provStateInfoTemp);
      setCityInfo(cityInfoTemp);
    }
  }, [country, provState, weatherData]);

  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

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

  // get HR value from server
  const get_RH_By_DBWB = (first, second, setValueId) => {
    if (first === '' || second === '') return;
    axios
      .post(`${serverUrl}/api/project/getoutdoorinfo`, {
        action: 'GET_RH_BY_DB_WB',
        first,
        second,
        altitude: getValues('altitude'),
      })
      .then((response) => {
        setValue(setValueId, response.data);
      });
  };

  // get WB value from server
  const get_WB_By_DBRH = (first, second, setValueId) => {
    if (first === '' || second === '') return;
    axios
      .post(`${serverUrl}/api/project/getoutdoorinfo`, {
        action: 'GET_WB_BY_DB_HR',
        first,
        second,
        altitude: getValues('altitude'),
      })
      .then((response) => {
        setValue(setValueId, response.data);
      });
  };

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
    try {
      setValue('country', e.target.value);

      const provStateInfoTemp = provState.filter((item) => item.country === e.target.value);
      setProvStateInfo(provStateInfoTemp);
      setValue('state', provStateInfoTemp[0].prov_state);

      const cityInfoTemp = weatherData.filter(
        (item) => item.prov_state === provStateInfoTemp[0].prov_state && item.country === e.target.value
      );
      setCityInfo(cityInfoTemp);
      setValue('city', cityInfoTemp[0].id);

      getAllOutdoorInfo();
    } catch (e) {
      console.log(e);
    }
  };

  // onChange handle for State
  const handleChangeProvState = (e) => {
    try {
      setValue('state', e.target.value);

      const cityInfoTemp = weatherData.filter(
        (item) => item.prov_state === e.target.value && item.country === getValues('country')
      );
      setCityInfo(cityInfoTemp);
      setValue('city', cityInfoTemp[0].id);

      getAllOutdoorInfo();
    } catch (e) {
      console.log(e);
    }
  };

  // onChange handle for city
  const handleChangeCity = (e) => {
    setValue('city', e.target.value);
    getAllOutdoorInfo();
  };

  // Onchange handle for design condition
  const handleChangeDesignCondition = (e) => {
    setValue('ashareDesignConditions', e.target.value);
    getAllOutdoorInfo();
  };

  // Onchange handle for Text New Price Check box
  const handleChangeTestNewPrice = (e) => {
    setValue('testNewPrice', e.target.checked);
  };

  // Summer Outdoor Air DB
  const handleChangeSummerOutdoorAirDBChanged = (e) => {
    setValue('summer_air_db', e.target.value);
    get_RH_By_DBWB(getValues('summer_air_db'), getValues('summer_air_wb'), 'summer_air_rh');
  };
  // Summer Outdoor Air WB
  const handleChangeSummerOutdoorAirWBChanged = (e) => {
    setValue('summer_air_wb', e.target.value);
    get_RH_By_DBWB(getValues('summer_air_db'), getValues('summer_air_wb'), 'summer_air_rh');
  };
  // Summer Outdoor Air RH
  const handleChangeSummerOutdoorAirRHChanged = (e) => {
    setValue('summer_air_rh', e.target.value);
    get_WB_By_DBRH(getValues('summer_air_db'), getValues('summer_air_rh'), 'summer_air_wb');
  };

  // Winter Outdoor Air DB
  const handleChangeWinterOutdoorAirDBChanged = (e) => {
    setValue('winter_air_db', e.target.value);
    get_RH_By_DBWB(getValues('winter_air_db'), getValues('winter_air_wb'), 'winter_air_rh');
  };

  // Winter Outdoor Air WB
  const handleChangeWinterOutdoorAirWBChanged = (e) => {
    setValue('winter_air_wb', e.target.value);
    get_RH_By_DBWB(getValues('winter_air_db'), getValues('winter_air_wb'), 'winter_air_rh');
  };

  // Winter Outdoor Air RH
  const handleChangeWinterOutdoorAirRHChanged = (e) => {
    setValue('winter_air_rh', e.target.value);
    get_WB_By_DBRH(getValues('winter_air_db'), getValues('winter_air_rh'), 'winter_air_wb');
  };

  // Summer Return Air DB
  const handleChangeSummerReturnAirDBChanged = (e) => {
    setValue('summer_return_db', e.target.value);
    get_RH_By_DBWB(getValues('summer_return_db'), getValues('summer_return_wb'), 'summer_return_rh');
  };
  // Summer Return Air WB
  const handleChangeSummerReturnAirWBChanged = (e) => {
    setValue('summer_return_wb', e.target.value);
    get_RH_By_DBWB(getValues('summer_return_db'), getValues('summer_return_wb'), 'summer_return_rh');
  };
  // Summer Return Air RH
  const handleChangeSummerReturnAirRHChanged = (e) => {
    setValue('summer_return_rh', e.target.value);
    get_WB_By_DBRH(getValues('summer_return_db'), getValues('summer_return_rh'), 'summer_return_wb');
  };

  // Winter Return Air DB
  const handleChangeWinterReturnAirDBChanged = (e) => {
    setValue('winter_return_db', e.target.value);
    get_RH_By_DBWB(getValues('winter_return_db'), getValues('winter_return_wb'), 'winter_return_rh');
  };

  // Winter Return Air WB
  const handleChangeWinterReturnAirWBChanged = (e) => {
    setValue('winter_return_wb', e.target.value);
    get_RH_By_DBWB(getValues('winter_return_db'), getValues('winter_return_wb'), 'winter_return_rh');
  };

  // Winter Return Air RH
  const handleChangeWinterReturnAirRHChanged = (e) => {
    setValue('winter_return_rh', e.target.value);
    get_WB_By_DBRH(getValues('winter_return_db'), getValues('winter_return_rh'), 'winter_return_wb');
  };

  // handle submit
  const onProjectInfoSubmit = async (data) => {
    try {

      if (isNew){
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
        )
        navigate(PATH_PROJECT.dashboard(projectId));  
      }
    } catch (error) {
      console.error(error);
    }
  };

  const newProjectNavigator = [{ name: 'Projects', href: PATH_PROJECTS.root }, { name: 'Add Project' }];

  const editProjectNavigator = [
    { name: 'Projects', href: PATH_PROJECTS.root },
    { name: 'Dashboard', href: PATH_PROJECT.dashboard(projectId) },
    { name: 'Edit Project Information' },
  ];

  return (
    <Page title="Project: Edit">
      <RootStyle>
        <Container sx={{ mt: '20px' }}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onProjectInfoSubmit)}>
            <HeaderBreadcrumbs
              heading="Edit Project Info"
              links={isNew ? newProjectNavigator : editProjectNavigator}
              action={
                <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton
                    type="submit"
                    variant="string"
                    startIcon={<Iconify icon={'fluent:save-24-regular'} />}
                    loading={isSubmitting}
                  >
                    {isNew ? 'Add Project' : 'Save Changes'}
                  </LoadingButton>
                </Stack>
              }
            />
            {isLoading ? (
              <></>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={4} md={4}>
                  <Card sx={{ mb: 3 }}>
                    <CardHeaderStyle title="PROJECT INFORMATION" />
                    <CardContent>
                      <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                        <RHFTextField size="small" name="projectName" label="Project Name" />
                        <RHFSelect size="small" name="basisOfDesign" label="Basis of Design" placeholder="">
                          {baseOfDesign.map((info, index) => (
                            <option key={index} value={info.id}>
                              {info.items}
                            </option>
                          ))}
                        </RHFSelect>
                        <RHFTextField size="small" name="referenceNo" label="Reference #" />
                        <RHFTextField size="small" name="revision" label="Revision #" />
                        <RHFTextField size="small" name="createdDate" label="Created Date" />
                        <RHFTextField size="small" name="revisedDate" label="Revised Date" />
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
                        <RHFSelect size="small" name="application" label="Applicaton" placeholder="">
                          {applications.map((info, index) => (
                            <option key={index} value={info.id}>
                              {info.items}
                            </option>
                          ))}
                        </RHFSelect>
                        <RHFSelect size="small" name="uom" label="UoM" placeholder="">
                          {UoM.map((info, index) => (
                            <option key={index} value={info.id}>
                              {info.items}
                            </option>
                          ))}
                        </RHFSelect>
                      </Box>
                    </CardContent>
                  </Card>
                  <Card sx={{ mb: 3 }}>
                    <CardHeaderStyle title="PROJECT TEST SECTION" />
                    <CardContent>
                      <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                        <RHFCheckbox
                          size="small"
                          name="testNewPrice"
                          label="Test New price"
                          onChange={handleChangeTestNewPrice}
                          checked={false}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Card sx={{ mb: 3 }}>
                    <CardHeaderStyle title="PROJECT LOCATION" />
                    <CardContent>
                      <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                        <RHFSelect
                          size="small"
                          name="country"
                          label="Country"
                          placeholder=""
                          onChange={handleChangeCountry}
                        >
                          <option value="" />
                          {country.map((info, index) => (
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
                          {provStateInfo.map((info, index) => (
                            <option key={index} value={info.prov_state}>
                              {info.prov_state}
                            </option>
                          ))}
                        </RHFSelect>
                        <RHFSelect size="small" name="city" label="City" placeholder="" onChange={handleChangeCity}>
                          <option value="" />
                          {cityInfo.map((info, index) => (
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
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4} md={4}>
                  <Card sx={{ mb: 3 }}>
                    <CardHeaderStyle title="OUTDOOR AIR DESIGN CONDITIONS" />
                    <CardContent>
                      <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                        <RHFTextField size="small" name="altitude" label="Altitude" />
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
                    </CardContent>
                  </Card>
                  <Card sx={{ mb: 3 }}>
                    <CardHeaderStyle title="RETURN AIR DESIGN CONDITIONS" />
                    <CardContent>
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
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
          </FormProvider>
        </Container>
      </RootStyle>
    </Page>
  );
}
