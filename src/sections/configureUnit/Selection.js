import * as React from 'react';

import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// @mui
import { styled } from '@mui/material/styles';

import {
  Box,
  Card,
  Paper,
  CardContent,
  Container,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  CardHeader,
  Stack,
} from '@mui/material';

// redux
import { useSelector, useDispatch } from '../../redux/store';
import { getViewSelectionInfo } from '../../redux/slices/unitReducer';
// components
// import Iconify from '../../components/Iconify';

// hooks
import { FormProvider, RHFTextField } from '../../components/hook-form';
// sections
import Loading from '../Loading';
// ----------------------------------------------------------------------

const GroupHeaderStyle = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: '5px 25px',
  backgroundColor: theme.palette.primary.main,
}));

const CardHeaderStyle = styled(CardHeader)(({ theme }) => ({
  padding: '0 0 2px',
  color: 'white',
  backgroundColor: theme.palette.primary.main,
}));

const CardHeaderRHFTextFieldStyle = styled(RHFTextField)(() => ({
  '& .MuiFilledInput-root': {
    background: 'rgb(255, 255, 255)',
    '&:hover': {
      background: 'rgb(239, 239, 239)',
    },
  },
}));

// ----------------------------------------------------------------------

export default function Selection() {
  const { jobId, unitId } = useParams();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { controlInfo, unitInfo, isLoading, viewSelectionInfo } = useSelector((state) => state.unit);

  const {
    pricingDetail,
    performanceVisible,
    unitDetails,
    unitDetailsVisible,
    electricalRequirements,
    preheatElecHeater,
    // preheatElecHeaterVisible,
    preheatHWC,
    // preheatHWCVisible,
    heatExchCORE,
    heatExchRECUTECH,
    heatExchPOLYBLOC,
    coolingCWC,
    // coolingCWCVisible,
    coolingDXC,
    // coolingDXCVisible,
    heatingCondCoil,
    // heatingCondCoilVisible,
    heatingElecHeater,
    // heatingElecHeaterVisible,
    heatingHWC,
    // heatingHWCVisible,
    reheatElecHeater,
    // reheatElecHeaterVisible,
    reheatHWC,
    // reheatHWCVisible,
    reheatHGRC,
    // reheatHGRCVisible,
    supplyFan,
    // supplyFanVisible,
    exhaustFan,
    // exhaustFanVisible,
    soundData,
  } = viewSelectionInfo;
  const { preheatElectricHeater } = controlInfo;

  useEffect(() => {
    dispatch(
      getViewSelectionInfo({
        intUserID: localStorage.getItem('userId'),
        intUAL: localStorage.getItem('UAL'),
        intJobID: jobId,
        intProductTypeID: state.productType,
        intUnitTypeID: state.unitType,
        intUnitNo: unitId === undefined ? -1 : unitId,
        ddlPreheatElecHeaterInstallation: preheatElectricHeater.ddlPreheatElecHeaterInstallationValue,
      })
    );
  }, [dispatch, jobId, unitId, state, preheatElectricHeater]);

  // console.log(electricalRequirements);

  const SelectionInfo =
    JSON.stringify(viewSelectionInfo) !== '{}'
      ? [
          {
            groupName: 'Pricing',
            direction: 'column',
            style: {},
            visible: performanceVisible,
            subGroups: [
              {
                title: 'Pricing Detail',
                data: pricingDetail.map((item) => [item.cLabel, item.cValue, item.cNotes]),
                visible: performanceVisible,
              },
            ],
          },
          {
            groupName: 'Summary',
            direction: 'column',
            style: {},
            visible: unitDetailsVisible,
            subGroups: [
              {
                title: 'Unit Details',
                data: unitDetails?.map((item) => [item.cLabel, item.cValue]),
                visible: unitDetailsVisible,
              },
            ],
          },
          {
            groupName: 'Electrical Requirements',
            direction: 'row',
            style: {},
            visible:
              electricalRequirements.coolingDXCDataVisible ||
              electricalRequirements.unitDataVisible ||
              electricalRequirements.preheatDataVisible ||
              electricalRequirements.heatingDataVisible,
            subGroups: [
              {
                title: 'Unit',
                data: electricalRequirements.unitData.map((item) => [item.cLabel, item.cValue]),
                visible: electricalRequirements.unitDataVisible,
              },
              {
                title: 'W-controller',
                data:
                  electricalRequirements.coolingDXCData !== undefined &&
                  electricalRequirements.coolingDXCData.map((item) => [item.cLabel, item.cValue]),
                visible:
                  electricalRequirements.coolingDXCDataVisible !== undefined &&
                  electricalRequirements.coolingDXCDataVisible,
              },
              {
                title: 'Preheat Electric Heater',
                data:
                  electricalRequirements.preheatData !== undefined &&
                  electricalRequirements.preheatData.map((item) => [item.cLabel, item.cValue]),
                visible:
                  electricalRequirements.preheatDataVisible !== undefined && electricalRequirements.preheatDataVisible,
              },
              {
                title: 'Heating Electric Heater',
                data:
                  electricalRequirements.heatingData !== undefined &&
                  electricalRequirements.heatingData?.map((item) => [item.cLabel, item.cValue]),
                visible:
                  electricalRequirements.heatingDataVisible !== undefined && electricalRequirements.heatingDataVisible,
              },
            ],
          },
          {
            groupName: 'Preheat Electric Heater',
            direction: 'column',
            visible: preheatElecHeater.Visible,
            style: {},
            subGroups: [
              {
                title: 'Actual',
                // data: preheatElecHeater !== undefined && preheatElecHeater.Data.map((item) => [item.cLabel, item.cValue]),
                data: preheatElecHeater?.Data,
                visible: preheatElecHeater.Visible,
              },
            ],
          },
          {
            groupName: 'Preheat HWC',
            direction: 'row',
            visible: preheatHWC.Visible,
            style: {},
            subGroups: [
              {
                title: 'Coil',
                // data: preheatHWC !== undefined  && preheatHWC.Data.map((item) => [item.cLabel, item.cValue]),
                data: preheatHWC?.Data,
              },
              {
                title: 'Entering',
                // data: preheatHWC !== undefined  && preheatHWC.Entering.map((item) => [item.cLabel, item.cValue]),
                data: preheatHWC?.Entering,
              },
              {
                title: 'Leaving',
                // data: preheatHWC !== undefined  && preheatHWC.Leaving.map((item) => [item.cLabel, item.cValue]),
                data: preheatHWC?.Leaving,
              },
              {
                title: 'Valve & Actuator',
                // data: preheatHWC !== undefined  && preheatHWC.ValveActuator.map((item) => [item.cLabel, item.cValue]),
                data: preheatHWC?.ValveActuator,
              },
            ],
          },
          {
            groupName: 'Heat Exchanger',
            direction: 'row',
            visible: heatExchCORE.performanceVisible,
            style: {
              // display: 'grid',
              // gridTemplateColumns: {
              //   xs: 'repeat(1, 1fr)',
              //   sm: 'repeat(2, 1fr)',
              //   md: 'repeat(2, 1fr)',
              // },
            },
            subGroups: [
              {
                title: 'Design Conditions',
                // data: heatExchCORE !== undefined  && heatExchCORE.designConditions.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
                data: heatExchCORE?.designConditions,
              },
              {
                title: 'Performance Leaving Air',
                // data: heatExchCORE !== undefined  && heatExchCORE.performanceLeavingAir.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
                data: heatExchCORE?.performanceLeavingAir,
              },
              {
                title: 'Performance',
                // data: heatExchCORE !== undefined  && heatExchCORE.performance.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
                data: heatExchCORE?.performance,
              },
            ],
          },
          {
            groupName: 'Heat Exchanger',
            direction: 'row',
            visible: heatExchRECUTECH.performanceVisible,
            style: {
              // display: 'grid',
              // gridTemplateColumns: {
              //   xs: 'repeat(1, 1fr)',
              //   sm: 'repeat(2, 1fr)',
              //   md: 'repeat(2, 1fr)',
              // },
            },
            subGroups: [
              {
                title: 'Design Conditions',
                // data: heatExchRECUTECH !== undefined  && heatExchRECUTECH.designConditions.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
                data: heatExchRECUTECH?.designConditions,
              },
              {
                title: 'Performance Leaving Air',
                // data: heatExchRECUTECH !== undefined  && heatExchRECUTECH.performanceLeavingAir.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
                data: heatExchRECUTECH?.performanceLeavingAir,
              },
              {
                title: 'Performance',
                // data: heatExchRECUTECH !== undefined  && heatExchRECUTECH.performance.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
                data: heatExchRECUTECH?.performance,
              },
            ],
          },
          {
            groupName: 'Heat Exchanger',
            direction: 'row',
            visible: heatExchPOLYBLOC.performanceVisible,
            style: {
              // display: 'grid',
              // gridTemplateColumns: {
              //   xs: 'repeat(1, 1fr)',
              //   sm: 'repeat(2, 1fr)',
              //   md: 'repeat(2, 1fr)',
              // },
            },
            subGroups: [
              {
                title: 'Design Conditions',
                // data: heatExchPOLYBLOC !== undefined  && heatExchPOLYBLOC.designConditions.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
                data: heatExchPOLYBLOC?.designConditions,
              },
              {
                title: 'Performance Leaving Air',
                // data: heatExchPOLYBLOC !== undefined  && heatExchPOLYBLOC.performanceLeavingAir.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
                data: heatExchPOLYBLOC?.performanceLeavingAir,
              },
              {
                title: 'Performance',
                // data: heatExchPOLYBLOC !== undefined  && heatExchPOLYBLOC.performance.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
                data: heatExchPOLYBLOC?.performance,
              },
            ],
          },
          {
            groupName: 'Cooling CWC',
            direction: 'row',
            visible: coolingCWC.Visible,
            style: {},
            subGroups: [
              {
                title: 'Coil',
                // data: coolingCWC !== undefined  && coolingCWC.Data.map((item) => [item.cLabel, item.cValue]),
                data: coolingCWC?.Data,
              },
              {
                title: 'Entering',
                // data: coolingCWC !== undefined  && coolingCWC.Entering.map((item) => [item.cLabel, item.cValue]),
                data: coolingCWC?.Entering,
              },
              {
                title: 'Leaving',
                // data: coolingCWC !== undefined  && coolingCWC.Leaving.map((item) => [item.cLabel, item.cValue]),
                data: coolingCWC?.Leaving,
              },
              {
                title: 'Valve & Actuator',
                // data: coolingCWC !== undefined  && coolingCWC.ValveActuator.map((item) => [item.cLabel, item.cValue]),
                data: coolingCWC?.ValveActuator,
              },
            ],
          },
          {
            groupName: 'Cooling DXC',
            direction: 'row',
            visible: coolingDXC.Visible,
            style: {},
            subGroups: [
              {
                title: 'Coil',
                // data: coolingDXC !== undefined  && coolingDXC.Data.map((item) => [item.cLabel, item.cValue]),
                data: coolingDXC?.Data,
              },
              {
                title: 'Entering',
                // data: coolingDXC !== undefined  && coolingDXC.Entering.map((item) => [item.cLabel, item.cValue]),
                data: coolingDXC?.Entering,
              },
              {
                title: 'Setpoint',
                // data: coolingDXC !== undefined  && coolingDXC.Leaving.map((item) => [item.cLabel, item.cValue]),
                data: coolingDXC?.Leaving,
              },
              {
                title: 'Coil Performance',
                // data: coolingDXC !== undefined  && coolingDXC.PerfOutputs.map((item) => [item.cLabel, item.cValue]),
                data: coolingDXC?.PerfOutputs,
              },
              {
                title: 'VRV Integration Kit',
                // data: coolingDXC !== undefined  && coolingDXC.EKEXV_Kit.map((item) => [item.cLabel, item.cValue]),
                data: coolingDXC?.EKEXV_Kit,
              },
            ],
          },
          {
            groupName: 'Heating Mode DX Coil',
            direction: 'row',
            visible: heatingCondCoil.Visible,
            style: {},
            subGroups: [
              {
                title: 'Coil',
                // data: heatingCondCoil !== undefined  && heatingCondCoil.Data.map((item) => [item.cLabel, item.cValue]),
                data: heatingCondCoil?.Data,
              },
              {
                title: 'Entering',
                // data: heatingCondCoil !== undefined  && heatingCondCoil.Entering.map((item) => [item.cLabel, item.cValue]),
                data: heatingCondCoil?.Entering,
              },
              {
                title: 'Setpoint',
                // data: heatingCondCoil !== undefined  && heatingCondCoil.Leaving.map((item) => [item.cLabel, item.cValue]),
                data: heatingCondCoil?.Leaving,
              },
            ],
          },
          {
            groupName: 'Heating Electric Heater',
            direction: 'column',
            visible: heatingElecHeater.Visible,
            style: {},
            subGroups: [
              {
                title: 'Actual',
                // data: heatingElecHeater !== undefined && heatingElecHeater.Data.map((item) => [item.cLabel, item.cValue]),
                data: heatingElecHeater?.Data,
              },
            ],
          },
          {
            groupName: 'Heating HWC',
            direction: 'row',
            visible: heatingHWC.Visible,
            style: {},
            subGroups: [
              {
                title: 'Coil',
                // data: heatingHWC !== undefined && heatingHWC.Data.map((item) => [item.cLabel, item.cValue]),
                data: heatingHWC?.Data,
              },
              {
                title: 'Entering',
                // data: heatingHWC !== undefined && heatingHWC.Entering.map((item) => [item.cLabel, item.cValue]),
                data: heatingHWC?.Entering,
              },
              {
                title: 'Leaving',
                // data: heatingHWC !== undefined && heatingHWC.Leaving.map((item) => [item.cLabel, item.cValue]),
                data: heatingHWC?.Leaving,
              },
              {
                title: 'Valve & Actuator',
                data: heatingHWC?.ValveActuator,
              },
            ],
          },
          {
            groupName: 'Reheat Electric Heater',
            direction: 'column',
            visible: reheatElecHeater.Visible,
            style: {},
            subGroups: [
              {
                title: 'Actual',
                // data: reheatElecHeater !== undefined && reheatElecHeater.Data.map((item) => [item.cLabel, item.cValue]),
                data: reheatElecHeater?.Data,
              },
            ],
          },
          {
            groupName: 'Reheat HWC',
            direction: 'row',
            visible: reheatHWC.Visible,
            style: {},
            subGroups: [
              {
                title: 'Coil',
                // data: reheatHWC !== undefined && reheatHWC.Data.map((item) => [item.cLabel, item.cValue]),
                data: reheatHWC?.Data,
              },
              {
                title: 'Entering',
                // data: reheatHWC !== undefined && reheatHWC.Entering.map((item) => [item.cLabel, item.cValue]),
                data: reheatHWC?.Entering,
              },
              {
                title: 'Leaving',
                //  data: reheatHWC !== undefined && reheatHWC.Leaving.map((item) => [item.cLabel, item.cValue]),
                data: reheatHWC?.Leaving,
              },
              // {
              //   title: 'Valve & Actuator',
              //   // data: reheatHWC !== undefined && reheatHWC.ValveActuator.map((item) => [item.cLabel, item.cValue]),
              //   data: reheatHWC?.ValveActuator,
              // },
            ],
          },
          {
            groupName: 'Reheat HGRC',
            direction: 'row',
            visible: reheatHGRC.Visible,
            style: {},
            subGroups: [
              {
                title: 'Coil',
                // data: reheatHGRC !== undefined && reheatHGRC.Data.map((item) => [item.cLabel, item.cValue]),
                data: reheatHGRC?.Data,
              },
              {
                title: 'Entering',
                // data: reheatHGRC !== undefined && reheatHGRC.Entering.map((item) => [item.cLabel, item.cValue]),
                data: reheatHGRC?.Entering,
              },
              {
                title: 'Setpoint',
                // data: reheatHGRC !== undefined && reheatHGRC.Leaving.map((item) => [item.cLabel, item.cValue]),
                data: reheatHGRC?.Leaving,
              },
              {
                title: 'Coil Performance',
                // data: reheatHGRC !== undefined && reheatHGRC.PerfOutputs.map((item) => [item.cLabel, item.cValue]),
                data: reheatHGRC?.PerfOutputs,
              },
              {
                title: 'VRV Integration Kit',
                // data: reheatHGRC !== undefined && reheatHGRC.EKEXV_Kit.map((item) => [item.cLabel, item.cValue]),
                data: reheatHGRC?.EKEXV_Kit,
              },
            ],
          },
          {
            groupName: 'Supply Fan',
            direction: 'row',
            visible: supplyFan.Visible,
            style: {},
            subGroups: [
              {
                title: 'Fan Data',
                // data: supplyFan !== undefined && supplyFan.Data.map((item) => [item.cLabel, item.cValue]),
                data: supplyFan?.Data,
              },
              {
                title: 'Graph',
                data: supplyFan?.Graph,
              },
              {
                title: 'Sound Data',
                // data: supplyFan !== undefined && supplyFan.SoundData.map((item) => [item.cLabel, item.cValue_1]),
                data: supplyFan?.SoundData,
              },
            ],
          },
          {
            groupName: 'Exhaust Fan',
            direction: 'row',
            visible: exhaustFan.Visible,
            style: {},
            subGroups: [
              {
                title: 'Fan Data',
                // data: exhaustFan !== undefined && exhaustFan.Data.map((item) => [item.cLabel, item.cValue]),
                data: exhaustFan?.Data,
              },
              {
                title: 'Graph',
                data: exhaustFan?.Graph,
              },
              {
                title: 'Sound Data',
                // data: exhaustFan !== undefined && exhaustFan.SoundData.map((item) => [item.cLabel, item.cValue_1]),
                data: exhaustFan?.SoundData,
              },
            ],
          },
          {
            groupName: 'Unit Sound Data (Hz)',
            direction: 'row',
            style: {},
            visible: soundData.Visible,
            subGroups: [
              {
                // data: soundData.Data.map((item) => [item.cLabel, item.cValue_1,
                //                                                   item.cValue_2,
                //                                                   item.cValue_3,
                //                                                   item.cValue_4,
                //                                                   item.cValue_5,
                //                                                   item.cValue_6,
                //                                                   item.cValue_7,
                //                                                   item.cValue_8,
                //                                                   item.cValue_9,
                //                                                   item.cValue_10]),
                data: soundData?.Data,
              },
            ],
          },
        ]
      : [];

  const methods = useForm();

  console.log(viewSelectionInfo);
  console.log(SelectionInfo);

  return JSON.stringify(viewSelectionInfo) === '{}' ? (
    <Loading />
  ) : (
    <Container>
      <FormProvider methods={methods}>
        <Stack spacing={5} sx={{ mt: 2 }}>
          {SelectionInfo.map((item, index) => (
            <Box key={index} sx={{ display: item.visible !== true ? 'none' : 'block' }}>
              <GroupHeaderStyle>
                <RHFTextField
                  size="small"
                  name={item.groupName}
                  color={'info'}
                  label={item.groupName}
                  sx={{ color: 'white' }}
                />
              </GroupHeaderStyle>
              <Stack
                direction={item.direction}
                alignItems="stretch"
                justifyContent="center"
                spacing={3}
                sx={{
                  ...item.style,
                  background: '#efefef',
                }}
              >
                {item.subGroups.map((element, index) => (
                  <Card
                    key={element.title + index}
                    sx={{ display: element.data !== undefined &&  element.data.length > 0 ? 'block' : 'none', m: '20px 30px!important' }}
                  >
                    <CardHeaderStyle
                      title={
                        <CardHeaderRHFTextFieldStyle
                          size="small"
                          name={element.title}
                          label={element.title}
                          variant={'filled'}
                        />
                      }
                    />
                    <CardContent>
                      <TableContainer component={Paper}>
                        <Table size="small">
                          <TableBody>
                            {element.data && element.data.map((row, index) => (
                              <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                {row.map((item, index) => (
                                  <TableCell key={index} component="th" scope="row" align="left">
                                    {item}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </FormProvider>
    </Container>
  );
}
