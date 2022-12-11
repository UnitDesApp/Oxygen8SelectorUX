import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom'; 
import * as Yup from 'yup';

// @mui
import { Card, CardContent, Container, Grid, Stack } from '@mui/material';
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

export default function Layout() {
  const dispatch = useDispatch();
  const { unitId } = useParams();
  const isEdit = unitId !== undefined;
  const { unitInfo, layoutInfo } = useSelector((state) => state.unit);

  console.log(unitInfo, layoutInfo);

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
  });

  const defaultValues = useMemo(
    () => ({
      ddlHandingID: isEdit ? unitInfo.ddlHandingValue : layoutInfo.ddlHandingID,
      ddlSupplyAirOpeningValue: isEdit ? unitInfo.ddlSupplyAirOpeningValue : layoutInfo.ddlSupplyAirOpeningValue,
      ddlSupplyAirOpeningText: isEdit ? unitInfo.ddlSupplyAirOpeningText : layoutInfo.ddlSupplyAirOpeningText,
      ddlExhaustAirOpeningValue: isEdit ? unitInfo.ddlExhaustAirOpeningValue : layoutInfo.ddlExhaustAirOpeningValue,
      ddlExhaustAirOpeningText: isEdit ? unitInfo.ddlExhaustAirOpeningText : layoutInfo.ddlExhaustAirOpeningText,
      ddlOutdoorAirOpeningValue: isEdit ? unitInfo.ddlOutdoorAirOpeningValue : layoutInfo.ddlOutdoorAirOpeningValue,
      ddlOutdoorAirOpeningText: isEdit ? unitInfo.ddlOutdoorAirOpeningText : layoutInfo.ddlOutdoorAirOpeningText,
      ddlReturnAirOpeningValue: isEdit ? unitInfo.ddlReturnAirOpeningValue : layoutInfo.ddlReturnAirOpeningValue,
      ddlReturnAirOpeningText: isEdit ? unitInfo.ddlReturnAirOpeningText : layoutInfo.ddlReturnAirOpeningText,
    }),
    [isEdit, unitInfo, layoutInfo]
  );

  console.log(defaultValues);

  const methods = useForm({
    resolver: yupResolver(layoutSchema),
    defaultValues,
  });

  const { reset, getValues, handleSubmit } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const ddlHandingChanged = (e) => {
    dispatch(unitReducer.ddlHandingChanged(e.target.value));
  };

  const ddlSupplyAirOpeningChanged = (e) => {
    const data = {
      ...getValues(),
      ddlSupplyAirOpeningValue: e.target.value,
      ddlSupplyAirOpeningText: e.target.options[e.target.selectedIndex].text,
    };
    dispatch(unitReducer.ddlSupplyAirOpeningChanged(data));
  };

  const ddlExhaustAirOpeningChanged = (e) => {
    const data = {
      ...getValues(),
      ddlExhaustAirOpeningValue: e.target.value,
      ddlExhaustAirOpeningText: e.target.options[e.target.selectedIndex].text,
    };
    dispatch(unitReducer.updateLayoutValues(data));
  };

  const ddlOutdoorAirOpeningChanged = (e) => {
    const data = {
      ...getValues(),
      ddlOutdoorAirOpeningValue: e.target.value,
      ddlOutdoorAirOpeningText: e.target.options[e.target.selectedIndex].text,
    };
    dispatch(unitReducer.updateLayoutValues(data));
  };

  const ddlReturnAirOpeningChanged = (e) => {
    const data = {
      ...getValues(),
      ddlReturnAirOpeningValue: e.target.value,
      ddlReturnAirOpeningText: e.target.options[e.target.selectedIndex].text,
    };
    dispatch(unitReducer.updateLayoutValues(data));
  };

  return (
    <Container>
      <Card>
        <Grid container>
          <Grid item xs={12} sm={6} md={4}>
            <FormProvider methods={methods} onSubmit={handleSubmit()}>
              <Card>
                <CardContent>
                  <Stack spacing={3}>
                    <RHFSelect
                      size="small"
                      name="ddlHandingID"
                      label="Handing"
                      placeholder=""
                      value={getValues('ddlHandingID')}
                      onChange={ddlHandingChanged}
                    >
                      {layoutInfo.ddlHanding.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.items}
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
                      {layoutInfo.ddlSupplyAirOpeningData.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlExhaustAirOpeningValue"
                      label="Exhaust Air Opening"
                      placeholder=""
                      onChange={ddlExhaustAirOpeningChanged}
                    >
                      {layoutInfo.ddlExhaustAirOpeningData.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.items}
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
                      {layoutInfo.ddlOutdoorAirOpeningData.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.items}
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
                      {layoutInfo.ddlReturnAirOpeningData.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.items}
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
    </Container>
  );
}
