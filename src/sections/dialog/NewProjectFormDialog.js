import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { Box, Card, Stack, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// form

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// redux
import { addNewProject } from '../../redux/slices/projectsReducer';
import { useDispatch } from '../../redux/store';
import axios from '../../utils/axios';
// components
import { FormProvider, RHFSelect, RHFTextField } from '../../components/hook-form';
// config
import { serverUrl } from '../../config';

NewProjectFormDialog.propTypes = {
  newProjectDialogOpen: PropTypes.bool,
  setOpenSuccess: PropTypes.func,
  setOpenFail: PropTypes.func,
  handleNewProjectDialogClose: PropTypes.func,
  initialInfo: PropTypes.object,
};

export default function NewProjectFormDialog({
  newProjectDialogOpen,
  handleNewProjectDialogClose,
  setOpenSuccess,
  setOpenFail,
  initialInfo,
}) {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [provStateInfo, setProvStateInfo] = useState([]);
  const [cityInfo, setCityInfo] = useState([]);
  const [companyNameId, setCompanyNameId] = useState(-1);

  const {
    baseOfDesign,
    UoM,
    country,
    applications,
    designCondition,
    companyInfo,
    weatherData,
    usersInfo,
    createdDate,
    revisedDate,
  } = initialInfo;

  const NewUserSchema = Yup.object().shape({
    jobName: Yup.string().required('Please enter a Project Name'),
    basisOfDesign: Yup.string().required('Please enter a Basis Of Design'),
    referenceNo: Yup.string().required('Please select a Reference'),
    revision: Yup.number().required('Please enter a Revision'),
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
    alltitude: Yup.number(),
    summer_air_db: Yup.number(),
    summer_air_wb: Yup.number(),
    summer_air_rh: Yup.number(),
    winter_air_db: Yup.number(),
    winter_air_wb: Yup.number(),
    winter_air_rh: Yup.number(),
    summer_return_db: Yup.number(),
    summer_return_wb: Yup.number(),
    summer_return_rh: Yup.number(),
    winter_return_db: Yup.number(),
    winter_return_wb: Yup.number(),
    winter_return_rh: Yup.number(),
    testNewPrice: Yup.number(),
  });

  const defaultValues = {
    jobName: '',
    basisOfDesign: '',
    referenceNo: '',
    revision: 0,
    companyName: '',
    companyNameId: 0,
    contactName: '',
    contactNameId: 0,
    application: '',
    uom: '',
    country: 'CA',
    state: '',
    city: '',
    ashareDesignConditions: '',
    alltitude: 0,
    summer_air_db: 0,
    summer_air_wb: 0,
    summer_air_rh: 0,
    winter_air_db: 0,
    winter_air_wb: 0,
    winter_air_rh: 0,
    summer_return_db: 75,
    summer_return_wb: 63,
    summer_return_rh: 51.17,
    winter_return_db: 70,
    winter_return_wb: 52.9,
    winter_return_rh: 30,
    testNewPrice: 0,
  };

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    setValue,
    watch,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    let value = '';
    if (values.country === 'CA') {
      value = 'CAN';
    } else {
      value = 'USA';
    }

    const data = weatherData?.filter((item) => item.country === value).map((item) => item.prov_state);
    if (data) {
      const uniqueArray = [...new Set(data)];
      setValue('state', uniqueArray && uniqueArray[0] ? uniqueArray[0] : []);
      setProvStateInfo(uniqueArray);
      setCityInfo([]);
    } else {
      setProvStateInfo([]);
      setCityInfo([]);
    }
  }, [setValue, values.country, weatherData]);

  useEffect(() => {
    let country = '';
    if (values.country === 'CA') {
      country = 'CAN';
    } else {
      country = 'USA';
    }

    const newCity = weatherData.filter((ele) => ele.prov_state === values.state && ele.country === country);
    setCityInfo(newCity);
    setValue('city', newCity?.[0]?.id || '');
  }, [setValue, values.state, values.country, weatherData]);

  // onChange handle for company Name
  const handleChangeCompanyName = (e) => {
    setValue('companyNameId', e.target.value);
    setValue('companyName', e.nativeEvent.target[e.target.selectedIndex].text);
    setCompanyNameId(e.target.value);
  };

  const handleChangeContactName = (e) => {
    setValue('contactNameId', e.target.value);
    setValue('contactName', e.nativeEvent.target[e.target.selectedIndex].text);
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(
        addNewProject({
          ...data,
          jobId: -1,
          createdUserId: localStorage.getItem('userId'),
          revisedUserId: localStorage.getItem('userId'),
          createdDate,
          revisedDate,
          applicationOther: '',
          testNewPrice: data.testNewPrice ? 1 : 0,
        })
      );

      setOpenSuccess();
      handleNewProjectDialogClose();
    } catch (error) {
      setOpenFail();
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

  useEffect(() => {
    if (!values.country || !values.city || !values.ashareDesignConditions) return;
    axios
      .post(`${serverUrl}/api/job/getoutdoorinfo`, {
        action: 'GET_ALL_DATA',
        country: values.country,
        cityId: values.city,
        designCondition: values.ashareDesignConditions,
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
  }, [setValue, values.country, values.city, values.ashareDesignConditions]);

  const get_RH_By_DBWB = useCallback(
    (first, second, setValueId) => {
      if (first === '' || second === '') return;
      axios
        .post(`${serverUrl}/api/job/getoutdoorinfo`, {
          action: 'GET_RH_BY_DB_WB',
          first,
          second,
          altitude: values.alltitude,
        })
        .then((response) => {
          setValue(setValueId, response.data);
        });
    },
    [setValue, values.alltitude]
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
          altitude: values.altitude,
        })
        .then((response) => {
          setValue(setValueId, response.data);
        });
    },
    [setValue, values.altitude]
  );

  const handleChangeSummerOutdoorAirDBChanged = useCallback(
    (e) => {
      setValue('summer_air_db', e.target.value);
      get_RH_By_DBWB(values.summer_air_db, values.summer_air_wb, 'summer_air_rh');
    },
    [get_RH_By_DBWB, setValue, values.summer_air_db, values.summer_air_wb]
  );

  // Summer Outdoor Air WB
  const handleChangeSummerOutdoorAirWBChanged = useCallback(
    (e) => {
      setValue('summer_air_wb', e.target.value);
      get_RH_By_DBWB(values.summer_air_db, values.summer_air_wb, 'summer_air_rh');
    },
    [get_RH_By_DBWB, values.summer_air_db, values.summer_air_wb, setValue]
  );

  // Summer Outdoor Air RH
  const handleChangeSummerOutdoorAirRHChanged = useCallback(
    (e) => {
      setValue('summer_air_rh', e.target.value);
      get_WB_By_DBRH(values.summer_air_db, values.summer_air_rh, 'summer_air_wb');
    },
    [get_WB_By_DBRH, setValue, values.summer_air_db, values.summer_air_rh]
  );

  // Winter Outdoor Air DB
  const handleChangeWinterOutdoorAirDBChanged = useCallback(
    (e) => {
      setValue('winter_air_db', e.target.value);
      get_RH_By_DBWB(values.winter_air_db, values.winter_air_wb, 'winter_air_rh');
    },
    [get_RH_By_DBWB, setValue, values.winter_air_db, values.winter_air_wb]
  );

  // Winter Outdoor Air WB
  const handleChangeWinterOutdoorAirWBChanged = useCallback(
    (e) => {
      setValue('winter_air_wb', e.target.value);
      get_RH_By_DBWB(values.winter_air_db, values.winter_air_wb, 'winter_air_rh');
    },
    [get_RH_By_DBWB, setValue, values.winter_air_db, values.winter_air_wb]
  );

  // Winter Outdoor Air RH
  const handleChangeWinterOutdoorAirRHChanged = useCallback(
    (e) => {
      setValue('winter_air_rh', e.target.value);
      get_WB_By_DBRH(values.winter_air_db, values.winter_air_rh, 'winter_air_wb');
    },
    [get_WB_By_DBRH, setValue, values.winter_air_db, values.winter_air_rh]
  );

  // Summer Return Air DB
  const handleChangeSummerReturnAirDBChanged = useCallback(
    (e) => {
      setValue('summer_return_db', e.target.value);
      get_RH_By_DBWB(values.summer_return_db, values.summer_return_wb, 'summer_return_rh');
    },
    [get_RH_By_DBWB, setValue, values.summer_return_db, values.summer_return_wb]
  );

  // Summer Return Air WB
  const handleChangeSummerReturnAirWBChanged = useCallback(
    (e) => {
      setValue('summer_return_wb', e.target.value);
      get_RH_By_DBWB(values.summer_return_db, values.summer_return_wb, 'summer_return_rh');
    },
    [get_RH_By_DBWB, setValue, values.summer_return_db, values.summer_return_wb]
  );

  // Summer Return Air RH
  const handleChangeSummerReturnAirRHChanged = useCallback(
    (e) => {
      setValue('summer_return_rh', e.target.value);
      get_WB_By_DBRH(values.summer_return_db, values.summer_return_rh, 'summer_return_wb');
    },
    [get_WB_By_DBRH, setValue, values.summer_return_db, values.summer_return_rh]
  );

  // Winter Return Air DB
  const handleChangeWinterReturnAirDBChanged = useCallback(
    (e) => {
      setValue('winter_return_db', e.target.value);
      get_RH_By_DBWB(values.winter_return_db, values.winter_return_wb, 'winter_return_rh');
    },
    [get_RH_By_DBWB, setValue, values.winter_return_db, values.winter_return_wb]
  );

  // Winter Return Air WB
  const handleChangeWinterReturnAirWBChanged = useCallback(
    (e) => {
      setValue('winter_return_wb', e.target.value);
      get_RH_By_DBWB(values.winter_return_db, values.winter_return_wb, 'winter_return_rh');
    },
    [get_RH_By_DBWB, setValue, values.winter_return_db, values.winter_return_wb]
  );

  // Winter Return Air RH
  const handleChangeWinterReturnAirRHChanged = useCallback(
    (e) => {
      setValue('winter_return_rh', e.target.value);
      get_WB_By_DBRH(values.winter_return_db, values.winter_return_rh, 'winter_return_wb');
    },
    [get_WB_By_DBRH, setValue, values.winter_return_db, values.winter_return_rh]
  );

  const onContinueBtnClicked = () => {
    handleSubmit(() => {})();
    if (getValues('jobName') === '') return;
    if (getValues('basisOfDesign') === '') return;
    if (getValues('referenceNo') === '') return;
    if (getValues('createdDate') === '') return;
    if (getValues('revisedDate') === '') return;
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
                <RHFTextField size="small" name="jobName" label="Project name" />
                <RHFSelect size="small" name="basisOfDesign" label="Basis Of design" placeholder="Basis of design">
                  <option value="" />
                  {baseOfDesign !== undefined &&
                    baseOfDesign.map((option) => (
                      <option key={`${option.id}basisOfDesign`} value={option.id}>
                        {option.items}
                      </option>
                    ))}
                </RHFSelect>
                <RHFTextField size="small" name="referenceNo" label="Reference no" />
                <RHFTextField size="small" type="number" name="revision" label="Revision no" />
                <RHFSelect
                  size="small"
                  name="companyNameId"
                  label="Company name"
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
                  label="Contact name"
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
                <RHFSelect size="small" name="application" label="Application" placeholder="Application">
                  <option value="" />
                  {applications !== undefined &&
                    applications.map((option) => (
                      <option key={option.id + option.items} value={option.id}>
                        {option.items}
                      </option>
                    ))}
                </RHFSelect>
                <RHFSelect size="small" name="uom" label="UoM" placeholder="">
                  <option value="" />
                  {UoM.map((info, index) => (
                    <option key={index} value={info.id}>
                      {info.items}
                    </option>
                  ))}
                </RHFSelect>
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
                    {country !== undefined &&
                      country.map((option) => (
                        <option key={`${option.id}`} value={option.value}>
                          {option.items}
                        </option>
                      ))}
                  </RHFSelect>

                  <RHFSelect
                    size="small"
                    name="state"
                    label="Province/state"
                    placeholder="Please select province/state"
                  >
                    <option value="" />
                    {provStateInfo !== undefined &&
                      provStateInfo.map((option) => (
                        <option key={`${option}`} value={option}>
                          {option}
                        </option>
                      ))}
                  </RHFSelect>

                  <RHFSelect size="small" name="city" label="City" placeholder="Please select city">
                    <option value="" />
                    {cityInfo !== undefined &&
                      cityInfo.map((option) => (
                        <option key={`${option.id}`} value={option.id}>
                          {option.station}
                        </option>
                      ))}
                  </RHFSelect>
                </Stack>

                <Stack direction="row" spacing={2}>
                  <RHFSelect
                    size="small"
                    name="ashareDesignConditions"
                    label="ASHRAE Design Conditions"
                    placeholder="Please select an share design conditions"
                  >
                    <option value="" />
                    {designCondition !== undefined &&
                      designCondition.map((option) => (
                        <option key={`${option.id}`} value={option.id}>
                          {option.items}
                        </option>
                      ))}
                  </RHFSelect>
                  <RHFTextField type="number" size="small" name="altitude" label="Altitude(ft)" />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant="subtitle1">OUTDOOR AIR DESIGN CONDITIONS</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <RHFTextField
                    type="number"
                    size="small"
                    name="winter_air_db"
                    label="Winter Outdoor Air DB (F)"
                    onBlur={handleChangeWinterOutdoorAirDBChanged}
                  />
                  <RHFTextField
                    type="number"
                    size="small"
                    name="summer_air_db"
                    label="Summer Outdoor Air DB (F)"
                    onBlur={handleChangeSummerOutdoorAirDBChanged}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <RHFTextField
                    type="number"
                    size="small"
                    name="winter_air_wb"
                    label="Winter Outdoor Air WB (F)"
                    onBlur={handleChangeWinterOutdoorAirWBChanged}
                  />
                  <RHFTextField
                    type="number"
                    size="small"
                    name="summer_air_wb"
                    label="Summer Outdoor Air WB (F)"
                    onBlur={handleChangeSummerOutdoorAirWBChanged}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <RHFTextField
                    type="number"
                    size="small"
                    name="winter_air_rh"
                    label="Winter Outdoor Air RH (%)"
                    onBlur={handleChangeWinterOutdoorAirRHChanged}
                  />
                  <RHFTextField
                    type="number"
                    size="small"
                    name="summer_air_rh"
                    label="Summer Outdoor Air RH (%)"
                    onBlur={handleChangeSummerOutdoorAirRHChanged}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant="subtitle1">RETURN AIR DESIGN CONDITIONS</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <RHFTextField
                    type="number"
                    size="small"
                    name="winter_return_db"
                    label="Winter Return Air DB (F)"
                    onBlur={handleChangeWinterReturnAirDBChanged}
                  />
                  <RHFTextField
                    type="number"
                    size="small"
                    name="summer_return_db"
                    label="Summer Return Air DB (F)"
                    onBlur={handleChangeSummerReturnAirDBChanged}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <RHFTextField
                    type="number"
                    size="small"
                    name="winter_return_wb"
                    label="Winter Return Air WB (F)"
                    onBlur={handleChangeWinterReturnAirWBChanged}
                  />
                  <RHFTextField
                    type="number"
                    size="small"
                    name="summer_return_wb"
                    label="Summer Return Air WB (F)"
                    onBlur
                    hange={handleChangeSummerReturnAirWBChanged}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <RHFTextField
                    type="number"
                    size="small"
                    name="winter_return_rh"
                    label="Winter Return Air RH (%)"
                    onBlur={handleChangeWinterReturnAirRHChanged}
                  />
                  <RHFTextField
                    type="number"
                    size="small"
                    name="summer_return_rh"
                    label="Summer Return Air RH (%)"
                    onBlur={handleChangeSummerReturnAirRHChanged}
                  />
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
            onClick={
              step === 0
                ? onContinueBtnClicked
                : () => {
                    console.log(getValues());
                  }
            }
            loading={isSubmitting}
          >
            {!step ? 'Continue' : 'Create project'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
