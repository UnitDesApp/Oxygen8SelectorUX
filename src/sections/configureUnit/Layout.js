import React, { useState } from 'react';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

// @mui
import { Card, CardContent, Container, Grid, Stack, Snackbar, Alert } from '@mui/material';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import * as unitReducer from '../../redux/slices/unitReducer';
// components
import Image from '../../components/Image';
import { FormProvider, RHFSelect } from '../../components/hook-form';

// ----------------------------------------------------------------------

Layout.propTypes = {
  unitType: PropTypes.string,
  productType: PropTypes.number,
};
export default function Layout({ productType, unitType }) {
  const dispatch = useDispatch();
  const { jobId, unitId } = useParams();
  const isEdit = unitId !== undefined;
  const { controlInfo, unitInfo } = useSelector((state) => state.unit);

  console.log(unitInfo);

  const [ddlExhaustAirOpening, setddlExhaustAirOpening] = useState(['2', '2A']);
  const [ddlOutdoorAirOpening, setddlOutdoorAirOpening] = useState(['4', '4A']);
  const [ddlReturnAirOpening, setddlReturnAirOpening] = useState(['3', '3A']);

  const { ddlCoolingCoilHandingValue, ddlHeatingCoilHandingValue, ddlPreheatCoilHandingValue } = unitInfo;

  const layoutSchema = Yup.object().shape({
    ddlHandingID: Yup.number().required('This field is required!'),
    ddlSupplyAirOpeningValue: Yup.number().required('This field is required!'),
    ddlSupplyAirOpeningText: Yup.string(),
    ddlExhaustAirOpeningValue: Yup.number().required('This field is required!'),
    ddlExhaustAirOpeningText: Yup.string(),
    ddlOutdoorAirOpeningValue: Yup.number().required('This field is required!'),
    ddlOutdoorAirOpeningText: Yup.string(),
    ddlReturnAirOpeningValue: Yup.number().required('This field is required!'),
    ddlReturnAirOpeningText: Yup.string(),
    ddlPreheatCoilHanding: Yup.number(),
    ddlCoolingCoilHanding: Yup.number(),
    ddlHeatingCoilHanding: Yup.number(),
  });

  const defaultValues = {
    ddlHandingID: unitInfo.ddlHandingValue,
    ddlSupplyAirOpeningValue: unitInfo.ddlSupplyAirOpeningValue,
    ddlSupplyAirOpeningText: unitInfo.ddlSupplyAirOpeningText,
    ddlExhaustAirOpeningValue:unitInfo.ddlExhaustAirOpeningValue,
    ddlExhaustAirOpeningText: unitInfo.ddlExhaustAirOpeningText,
    ddlOutdoorAirOpeningValue:unitInfo.ddlOutdoorAirOpeningValue,
    ddlOutdoorAirOpeningText: unitInfo.ddlOutdoorAirOpeningText,
    ddlReturnAirOpeningValue: unitInfo.ddlReturnAirOpeningValue,
    ddlReturnAirOpeningText: unitInfo.ddlReturnAirOpeningText,
    ddlPreheatCoilHanding: ddlPreheatCoilHandingValue,
    ddlCoolingCoilHanding: ddlCoolingCoilHandingValue,
    ddlHeatingCoilHanding: ddlHeatingCoilHandingValue,
  };

  console.log(defaultValues);

  const methods = useForm({
    resolver: yupResolver(layoutSchema),
    defaultValues,
  });

  const { reset, setValue, getValues, handleSubmit } = methods;

  const [successNotification, setOpenSuccessNotification] = React.useState(false);

  const handleSuccessNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessNotification(false);
  };

  const [errorNotification, setOpenErrorNotification] = React.useState(false);
  const handleErrorNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorNotification(false);
  };

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const result = await dispatch(
        unitReducer.saveLayout({
          ...data,
          intJobID: jobId,
          intUnitNo: unitId,
          intProductTypeID: productType,
          intUnitTypeID: unitType,
          intUAL: localStorage.getItem('UAL'),
        })
      );

      if (result) {
        setOpenSuccessNotification(true);
      } else {
        setOpenErrorNotification(true);
      }
    } catch (error) {
      console.error(error);
      reset();
    }
  };

  const ddlHandingChanged = (e) => {
    setValue('ddlHandingID', parseInt(e.target.value, 10));
    setValue('ddlSupplyAirOpeningValue', 1);
    setValue('ddlSupplyAirOpeningText', '1');
    setValue('ddlExhaustAirOpeningValue', 1);
    setValue('ddlExhaustAirOpeningText', '2');
    setValue('ddlOutdoorAirOpeningValue', 1);
    setValue('ddlOutdoorAirOpeningText', '4');
    setValue('ddlReturnAirOpeningValue', 1);
    setValue('ddlReturnAirOpeningText', '3');
    setddlExhaustAirOpening(['2', '2A']);
    setddlOutdoorAirOpening(['4', '4A']);
    setddlReturnAirOpening(['3', '3A']);
    dispatch(unitReducer.updateLayoutValues(getValues()));
  };

  const ddlSupplyAirOpeningChanged = (e) => {
    setValue('ddlSupplyAirOpeningValue', parseInt(e.target.value, 10));
    setValue('ddlSupplyAirOpeningText', e.target.options[e.target.selectedIndex].text);
    setValue('ddlExhaustAirOpeningValue', 1);
    setValue('ddlOutdoorAirOpeningValue', 1);
    setValue('ddlReturnAirOpeningValue', 1);
    if (e.target.selectedIndex === 2 || e.target.selectedIndex === 3) {
      setValue('ddlExhaustAirOpeningText', '1');
      setValue('ddlOutdoorAirOpeningText', '3');
      setValue('ddlReturnAirOpeningText', '4');
      setddlExhaustAirOpening(['1', '1A']);
      setddlOutdoorAirOpening(['3', '3A']);
      setddlReturnAirOpening(['4', '4A']);
    } else {
      setValue('ddlExhaustAirOpeningText', '2');
      setValue('ddlOutdoorAirOpeningText', '4');
      setValue('ddlReturnAirOpeningText', '3');
      setddlExhaustAirOpening(['2', '2A']);
      setddlOutdoorAirOpening(['4', '4A']);
      setddlReturnAirOpening(['3', '3A']);
    }

    dispatch(unitReducer.updateLayoutValues(getValues()));
  };

  const ddlExhaustAirOpeningChanged = (e) => {
    setValue('ddlExhaustAirOpeningValue', parseInt(e.target.value, 10));
    setValue('ddlExhaustAirOpeningText', e.target.options[e.target.selectedIndex].text);
    dispatch(unitReducer.updateLayoutValues(getValues()));
  };

  const ddlOutdoorAirOpeningChanged = (e) => {
    setValue('ddlOutdoorAirOpeningValue', parseInt(e.target.value, 10));
    setValue('ddlOutdoorAirOpeningText', e.target.options[e.target.selectedIndex].text);
    dispatch(unitReducer.updateLayoutValues(getValues()));
  };

  const ddlReturnAirOpeningChanged = (e) => {
    setValue('ddlReturnAirOpeningValue', parseInt(e.target.value, 10));
    setValue('ddlReturnAirOpeningText', e.target.options[e.target.selectedIndex].text);
    dispatch(unitReducer.updateLayoutValues(getValues()));
  };

  return (
    <Container>
      <Card>
        <Grid container>
          <Grid item xs={12} sm={6} md={4}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <RHFSelect
                      size="small"
                      name="ddlHandingID"
                      label="Handling"
                      placeholder=""
                      value={getValues('ddlHandingID')}
                      onChange={ddlHandingChanged}
                    >
                      {controlInfo.ddlHanding.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlSupplyAirOpeningValue"
                      label="Supply Air Opening"
                      placeholder=""
                      onChange={ddlSupplyAirOpeningChanged}
                    >
                      <option value="1">1</option>
                      <option value="2">1A</option>
                      <option value="3">2</option>
                      <option value="4">2A</option>
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlExhaustAirOpeningValue"
                      label="Exhaust Air Opening"
                      placeholder=""
                      onChange={ddlExhaustAirOpeningChanged}
                    >
                      {ddlExhaustAirOpening.map((item, index) => (
                        <option key={index} value={index + 1}>
                          {item}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlOutdoorAirOpeningValue"
                      label="Outdoor Air Opening"
                      placeholder=""
                      onChange={ddlOutdoorAirOpeningChanged}
                    >
                      {ddlOutdoorAirOpening.map((item, index) => (
                        <option key={index} value={index + 1}>
                          {item}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlReturnAirOpeningValue"
                      label="Return Air Opening"
                      placeholder=""
                      onChange={ddlReturnAirOpeningChanged}
                    >
                      {ddlReturnAirOpening.map((item, index) => (
                        <option key={index} value={index + 1}>
                          {item}
                        </option>
                      ))}
                    </RHFSelect>
                  </Stack>
                </CardContent>
              </Card>
            </FormProvider>
          </Grid>
          <Grid item xs={6}>
            <Image src={'/assets/Layouts/layout_nova_in_h_rh.png'} wdith="100%" height="100%" />
          </Grid>
        </Grid>
      </Card>
      <Snackbar open={successNotification} autoHideDuration={6000} onClose={handleSuccessNotificationClose}>
        <Alert onClose={handleSuccessNotificationClose} severity="success" sx={{ width: '100%' }}>
          {isEdit ? 'Unit update successful!!!' : 'Unit was successfully added!!!'}
        </Alert>
      </Snackbar>
      <Snackbar open={errorNotification} autoHideDuration={6000} onClose={handleErrorNotificationClose}>
        <Alert onClose={handleErrorNotificationClose} severity="error" sx={{ width: '100%' }}>
          {isEdit ? 'Unit update failed!' : 'Failed to add Unit!'}
        </Alert>
      </Snackbar>
    </Container>
  );
}
