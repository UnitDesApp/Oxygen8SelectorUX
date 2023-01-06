import * as React from 'react';

import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

// PropTypes
import { PropTypes } from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';

import {
  Box,
  Paper,
  Container,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Stack,
  Typography,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// redux
import { useSelector, useDispatch } from '../../redux/store';
import { getViewSelectionInfo } from '../../redux/slices/unitReducer';
// components
import Iconify from '../../components/Iconify';
import GraphChart from './GraphChart';

// sections
import Loading from '../Loading';
// ----------------------------------------------------------------------

const CustomGroupBoxBorder = styled(Box)(() => ({
  display: 'inline-flex',
  flexDirection: 'column',
  position: 'relative',
  minWidth: '0',
  padding: '10px',
  margin: '0',
  verticalAlign: 'top',
  width: '100%',
  border: '1px solid black',
  borderRadius: '8px',
  zIndex: '-999999',
}));

const CustomGroupBoxTitle = styled(Typography)(() => ({
  lineHeight: '1.4375em',
  fontSize: '25px',
  fontFamily: '"Public Sans", sans-serif',
  fontWeight: 400,
  // color: 'rgb(145, 158, 171)',
  display: 'block',
  transformOrigin: 'left top',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 'calc(133% - 24px)',
  position: 'absolute',
  left: '0px',
  top: '0px',
  transform: 'translate(40px, -12px) scale(0.75)',
  transition: 'color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms',
  zIndex: 100,
  background: 'white',
  paddingLeft: '10px',
  paddingRight: '10px',
}));

// ----------------------------------------------------------------------
CustomGroupBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  bordersx: PropTypes.object,
  titlesx: PropTypes.object,
};

function CustomGroupBox({ title, children, bordersx, titlesx }) {
  return (
    <CustomGroupBoxBorder sx={{ ...bordersx }}>
      <CustomGroupBoxTitle sx={{ ...titlesx }}>{title}</CustomGroupBoxTitle>
      {children}
    </CustomGroupBoxBorder>
  );
}

export default function Selection() {
  const { jobId, unitId } = useParams();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { viewSelectionInfo } = useSelector((state) => state.unit);

  useEffect(() => {
    dispatch(
      getViewSelectionInfo({
        intUserID: localStorage.getItem('userId'),
        intUAL: localStorage.getItem('UAL'),
        intJobID: jobId,
        intProductTypeID: state.intProductTypeID,
        intUnitTypeID: state.intUnitTypeID,
        intUnitNo: unitId === undefined ? -1 : unitId,
        // ddlPreheatElecHeaterInstallation: preheatElectricHeater.ddlPreheatElecHeaterInstallationValue,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            groupName: 'Unit Details',
            direction: 'column',
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 2fr)',
            },
            visible: unitDetailsVisible,
            subGroups: [
              {
                title: 'Unit Details 1',
                data: unitDetails?.slice(0, 6).map((item) => [item.cLabel, item.cValue]),
                visible: unitDetailsVisible,
              },
              {
                title: 'Unit Details 2',
                data: unitDetails?.slice(6).map((item) => [item.cLabel, item.cValue]),
                visible: unitDetailsVisible,
              },
            ],
          },
          {
            groupName: 'Electrical Requirements',
            direction: 'row',
            style: {},
            visible:
              electricalRequirements?.coolingDXCDataVisible ||
              electricalRequirements?.unitDataVisible ||
              electricalRequirements?.preheatDataVisible ||
              electricalRequirements?.heatingDataVisible,
            subGroups: [
              {
                title: 'Unit',
                data: electricalRequirements?.unitData?.map((item) => [item.cLabel, item.cValue]),
                visible: electricalRequirements?.unitDataVisible,
              },
              {
                title: 'W-controller',
                data:
                  electricalRequirements?.coolingDXCData !== undefined &&
                  electricalRequirements?.coolingDXCData?.map((item) => [item.cLabel, item.cValue]),
                visible:
                  electricalRequirements?.coolingDXCDataVisible !== undefined &&
                  electricalRequirements?.coolingDXCDataVisible,
              },
              {
                title: 'Preheat Electric Heater',
                data:
                  electricalRequirements?.preheatData !== undefined &&
                  electricalRequirements?.preheatData?.map((item) => [item.cLabel, item.cValue]),
                visible:
                  electricalRequirements?.preheatDataVisible !== undefined && electricalRequirements?.preheatDataVisible,
              },
              {
                title: 'Heating Electric Heater',
                data:
                  electricalRequirements?.heatingData !== undefined &&
                  electricalRequirements?.heatingData?.map((item) => [item.cLabel, item.cValue]),
                visible:
                  electricalRequirements?.heatingDataVisible !== undefined && electricalRequirements?.heatingDataVisible,
              },
            ],
          },
          {
            groupName: 'Preheat Electric Heater',
            direction: 'column',
            visible: preheatElecHeater?.Visible,
            style: {},
            subGroups: [
              {
                title: 'Actual',
                // data: preheatElecHeater !== undefined && preheatElecHeater.Data.map((item) => [item.cLabel, item.cValue]),
                data: preheatElecHeater?.Data,
                visible: preheatElecHeater?.Visible,
              },
            ],
          },
          {
            groupName: 'Preheat HWC',
            direction: 'row',
            visible: preheatHWC?.Visible,
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
            visible: heatExchCORE?.performanceVisible,
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
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
            visible: heatExchRECUTECH?.performanceVisible,
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
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
            visible: heatExchPOLYBLOC?.performanceVisible,
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(1, 1fr)',
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
            visible: coolingCWC?.Visible,
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
            },
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
            visible: coolingDXC?.Visible,
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
            },
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
              [
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
              ],
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
            visible: heatingCondCoil?.Visible,
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
            visible: heatingElecHeater?.Visible,
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
            visible: heatingHWC?.Visible,
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
            visible: reheatElecHeater?.Visible,
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
            visible: reheatHWC?.Visible,
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
            visible: reheatHGRC?.Visible,
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
            visible: supplyFan?.Visible,
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
            visible: exhaustFan?.Visible,
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

  console.log(viewSelectionInfo);
  console.log(SelectionInfo);

  return JSON.stringify(viewSelectionInfo) === '{}' ? (
    <Loading />
  ) : (
    <Container>
      <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3, mb: 3 }}>
          <LoadingButton 
            variant="contained"
            endIcon={
              <Iconify icon={'carbon:generate-pdf'} width="20px" height="20px"/>
            }
          >
            Download
          </LoadingButton >
        </Stack>
      <Stack spacing={5} sx={{ mt: 2 }}>
        {SelectionInfo.map((item, index) => (
          <CustomGroupBox
            title={item.groupName}
            key={index}
            bordersx={{ display: item.visible !== true ? 'none' : 'block' }}
            titlesx={{ fontSize: '25px', transform: 'translate(40px, -12px) scale(0.75)' }}
          >
            <Stack
              direction={item.direction}
              alignItems="flex-start"
              justifyContent="left"
              spacing={3}
              sx={{ ...item.style }}
            >
              {item.subGroups.map((element, index) =>
                Array.isArray(element) ? (
                  element.map((ele, index) => (
                    <CustomGroupBox
                      title={ele.title}
                      key={ele.title + index}
                      bordersx={{
                        display: ele.data !== undefined && ele.data.length > 0 ? 'block' : 'none',
                        width: 'auto',
                        m: '20px 30px!important',
                        padding: '20px',
                      }}
                      titlesx={{
                        fontSize: '18px',
                        transform: 'translate(25px, -10px) scale(0.75)',
                      }}
                    >
                      <TableContainer component={Paper}>
                        <Table size="small">
                          <TableBody>
                            {ele.data &&
                              ele.data.map((row, index) => (
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
                    </CustomGroupBox>
                  ))
                ) : (
                  <CustomGroupBox
                    title={element.title}
                    key={element.title + index}
                    bordersx={{
                      display: element.title === 'Graph' || (element.data !== undefined && element.data.length > 0 ? 'block' : 'none'),
                      width: 'auto',
                      m: '20px 30px!important',
                      padding: '20px',
                    }}
                    titlesx={{
                      fontSize: '18px',
                      transform: 'translate(25px, -10px) scale(0.75)',
                    }}
                  >
                    {element.title === 'Graph' && (
                      <GraphChart
                        // title="Yearly Sales"
                        subheader="Air Performance"
                        chartLabels={['200', '400', '600', '800', '1000', '1200', '1400']}
                        chartData={{
                          data: [
                            { name: '1', data: [0.7, 0.5, 0.3, 0, 0, 0, 0] },
                            { name: '2', data: [1.3, 1.0, 0.7, 0.5, 0, 0, 0] },
                            { name: '3', data: [1.7, 1.3, 0.9, 0.6, 0, 0, 0] },
                            { name: '4', data: [2.2, 1.6, 1.1, 0.7, 0.3, 0, 0] },
                            { name: '5', data: [2.7, 2.2, 1.7, 1.0, 0.5, 0, 0] },
                            { name: '6', data: [3.5, 3.0, 2.4, 1.9, 1.2, 0.5, 0] },
                          ],
                        }}
                      />
                    )}

                    {element.title !== 'Graph' && (
                      <TableContainer component={Paper}>
                        <Table size="small">
                          <TableBody>
                            {element.data &&
                              element.data.map((row, index) => (
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
                    )}
                  </CustomGroupBox>
                )
              )}
            </Stack>
          </CustomGroupBox>
        ))}
      </Stack>
    </Container>
  );
}
