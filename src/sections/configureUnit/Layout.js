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
  const { controlInfo, unitInfo, layoutInfo } = useSelector((state) => state.unit);
  const {
    ualInfo,
    handingInfo,
    supplyAirOpeningInfo,
    remainingOpeningsInfo,

  } = controlInfo;

  console.log(controlInfo, unitInfo, layoutInfo);

  const layoutSchema = Yup.object().shape({
    ddlHandingId: Yup.number().required('This field is required!'),
    ddlSupplyAirOpeningId: Yup.number().required('This field is required!'),
    ddlSupplyAirOpeningText: Yup.string(),
    ddlExhaustAirOpeningId: Yup.number().required('This field is required!'),
    ddlExhaustAirOpeningText: Yup.string(),
    ddlOutdoorAirOpeningId: Yup.number().required('This field is required!'),
    ddlOutdoorAirOpeningText: Yup.string(),
    ddlReturnAirOpeningId: Yup.number().required('This field is required!'),
    ddlReturnAirOpeningText: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      ddlHandingId: isEdit ? unitInfo.ddlHandingId : handingInfo.ddlHandingId,
      ddlSupplyAirOpeningId: isEdit ? unitInfo.ddlSupplyAirOpeningId : supplyAirOpeningInfo.ddlSupplyAirOpeningId,
      ddlSupplyAirOpeningText: isEdit ? unitInfo.ddlSupplyAirOpeningText : supplyAirOpeningInfo.ddlSupplyAirOpeningText,
      ddlExhaustAirOpeningId: isEdit ? unitInfo.ddlExhaustAirOpeningId : remainingOpeningsInfo.ddlExhaustAirOpeningId,
      ddlExhaustAirOpeningText: isEdit ? unitInfo.ddlExhaustAirOpeningText : remainingOpeningsInfo.ddlExhaustAirOpeningText,
      ddlOutdoorAirOpeningId: isEdit ? unitInfo.ddlOutdoorAirOpeningId : remainingOpeningsInfo.ddlOutdoorAirOpeningId,
      ddlOutdoorAirOpeningText: isEdit ? unitInfo.ddlOutdoorAirOpeningText : remainingOpeningsInfo.ddlOutdoorAirOpeningText,
      ddlReturnAirOpeningId: isEdit ? unitInfo.ddlReturnAirOpeningId : remainingOpeningsInfo.ddlReturnAirOpeningId,
      ddlReturnAirOpeningText: isEdit ? unitInfo.ddlReturnAirOpeningText : remainingOpeningsInfo.ddlReturnAirOpeningText,
    }),
    [isEdit, controlInfo, unitInfo, layoutInfo]
  );

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
      ddlSupplyAirOpeningId: e.target.value,
      ddlSupplyAirOpeningText: e.target.options[e.target.selectedIndex].text,
    };
    dispatch(unitReducer.ddlSupplyAirOpeningChanged(data));
  };

  const ddlExhaustAirOpeningChanged = (e) => {
    const data = {
      ...getValues(),
      ddlExhaustAirOpeningId: e.target.value,
      ddlExhaustAirOpeningText: e.target.options[e.target.selectedIndex].text,
    };
    dispatch(unitReducer.updateLayoutValues(data));
  };

  const ddlOutdoorAirOpeningChanged = (e) => {
    const data = {
      ...getValues(),
      ddlOutdoorAirOpeningId: e.target.value,
      ddlOutdoorAirOpeningText: e.target.options[e.target.selectedIndex].text,
    };
    dispatch(unitReducer.updateLayoutValues(data));
  };

  const ddlReturnAirOpeningChanged = (e) => {
    const data = {
      ...getValues(),
      ddlReturnAirOpeningId: e.target.value,
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
                      name="ddlHandingId"
                      label="Handing"
                      placeholder=""
                      value={getValues('ddlHandingId')}
                      onChange={ddlHandingChanged}
                    >
                      {handingInfo.ddlHandingDataTbl.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlSupplyAirOpeningId"
                      label="Supply Air Opening"
                      placeholder=""
                      onChange={ddlSupplyAirOpeningChanged}
                    >
                      {supplyAirOpeningInfo.ddlSupplyAirOpeningDataTbl.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlExhaustAirOpeningId"
                      label="Exhaust Air Opening"
                      placeholder=""
                      onChange={ddlExhaustAirOpeningChanged}
                    >
                      {remainingOpeningsInfo.ddlExhaustAirOpeningDataTbl.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlOutdoorAirOpeningId"
                      label="Outdoor Air Opening"
                      placeholder=""
                      onChange={ddlOutdoorAirOpeningChanged}
                    >
                      {remainingOpeningsInfo.ddlOutdoorAirOpeningDataTbl.map((data, index) => (
                        <option key={index} value={data.id}>
                          {data.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlReturnAirOpeningId"
                      label="Return Air Opening"
                      placeholder=""
                      onChange={ddlReturnAirOpeningChanged}
                    >
                      {remainingOpeningsInfo.ddlReturnAirOpeningDataTbl.map((data, index) => (
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
