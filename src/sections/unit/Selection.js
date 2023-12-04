import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
// file-saver
// import { saveAs } from 'file-saver';
// PropTypes
import { PropTypes } from 'prop-types';

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
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
// lodash
import { isEmpty } from 'lodash';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { getViewSelectionInfo } from '../../redux/slices/unitReducer';

// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Image from '../../components/Image';

//------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(3),
  marginBottom: '200px!important',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(3),
  },
}));

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
}));

const CustomGroupBoxTitle = styled(Typography)(() => ({
  lineHeight: '1.4375em',
  fontSize: '25px',
  fontFamily: '"Public Sans", sans-serif',
  fontWeight: 400,
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

//------------------------------------------------
Selection.propTypes = {
  unitTypeData: PropTypes.object,
  intUnitNo: PropTypes.number,
};

export default function Selection({ unitTypeData, intUnitNo }) {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [expanded, setExpanded] = React.useState({
    panel1: true,
    panel2: true,
    panel3: true,
    panel4: true,
    panel5: true,
    panel6: true,
    panel7: true,
    panel8: true,
    panel9: true,
    panel10: true,
    panel11: true,
    panel12: true,
    panel13: true,
    panel14: true,
    panel15: true,
    panel16: true,
    panel17: true,
    panel18: true,
    panel19: true,
    panel20: true,
  });

  const { viewSelectionInfo } = useSelector((state) => state.unit);

  useEffect(() => {
    const getSelectionData = async () => {
      try {
        await dispatch(
          getViewSelectionInfo({
            intUserID: localStorage.getItem('userId'),
            intUAL: localStorage.getItem('UAL'),
            intProjectID: projectId,
            intProductTypeID: unitTypeData.intProductTypeID,
            intUnitTypeID: unitTypeData.intUnitTypeID,
            intUnitNo,
          })
        );
        setIsLoading(false);
      } catch (e) {
        setError(false);
      }
    };

    getSelectionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    pricingDetail,
    performanceVisible,
    unitDetails,
    unitDetailsVisible,
    electricalRequirements,
    preheatElecHeater,
    preheatHWC,
    heatExchCORE,
    heatExchRECUTECH,
    heatExchPOLYBLOC,
    coolingCWC,
    coolingDXC,
    heatingCondCoil,
    heatingElecHeater,
    heatingHWC,
    reheatElecHeater,
    reheatHWC,
    reheatHGRC,
    supplyFan,
    exhaustFan,
    soundData,
  } = viewSelectionInfo;

  const SelectionInfo = useMemo(() => {
    const data = [];

    if (pricingDetail) {
      data.push({
        groupName: 'Pricing',
        direction: 'column',
        style: {},
        visible: performanceVisible,
        subGroups: [
          {
            title: 'Pricing Detail',
            data: pricingDetail?.map((item) => [item.cLabel, item.cValue, item.cNotes]),
            visible: performanceVisible,
          },
        ],
      });
    }

    if (unitDetails) {
      data.push({
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
      });
    }

    if (electricalRequirements) {
      data.push({
        groupName: 'Electrical Requirements',
        direction: 'row',
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        },
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
      });
    }

    if (preheatElecHeater) {
      data.push({
        groupName: 'Preheat Electric Heater',
        direction: 'column',
        visible: preheatElecHeater?.Visible,
        style: {},
        subGroups: [
          {
            title: 'Actual',
            data: preheatElecHeater?.Data,
            visible: preheatElecHeater?.Visible,
          },
        ],
      });
    }

    if (preheatHWC) {
      data.push({
        groupName: 'Preheat HWC',
        direction: 'row',
        visible: preheatHWC?.Visible,
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        },
        subGroups: [
          {
            title: 'Coil',
            data: preheatHWC?.Data,
          },
          {
            title: 'Entering',
            data: preheatHWC?.Entering,
          },
          {
            title: 'Leaving',
            data: preheatHWC?.Leaving,
          },
          {
            title: 'Valve & Actuator',
            data: preheatHWC?.ValveActuator,
          },
        ],
      });
    }

    if (heatExchCORE) {
      data.push({
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
            data: heatExchCORE?.designConditions,
          },
          {
            title: 'Performance Leaving Air',
            data: heatExchCORE?.performanceLeavingAir,
          },
          {
            title: 'Performance',
            data: heatExchCORE?.performance,
          },
        ],
      });
    }

    if (heatExchRECUTECH) {
      data.push({
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
            data: heatExchRECUTECH?.designConditions,
          },
          {
            title: 'Performance Leaving Air',
            data: heatExchRECUTECH?.performanceLeavingAir,
          },
          {
            title: 'Performance',
            data: heatExchRECUTECH?.performance,
          },
        ],
      });
    }

    if (heatExchPOLYBLOC) {
      data.push({
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
            data: heatExchPOLYBLOC?.designConditions,
          },
          {
            title: 'Performance Leaving Air',
            data: heatExchPOLYBLOC?.performanceLeavingAir,
          },
          {
            title: 'Performance',
            data: heatExchPOLYBLOC?.performance,
          },
        ],
      });
    }

    if (coolingCWC) {
      data.push({
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
            data: coolingCWC?.Data,
          },
          {
            title: 'Entering',
            data: coolingCWC?.Entering,
          },
          {
            title: 'Leaving',
            data: coolingCWC?.Leaving,
          },
          {
            title: 'Valve & Actuator',
            data: coolingCWC?.ValveActuator,
          },
        ],
      });
    }

    if (coolingDXC) {
      data.push({
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
            data: coolingDXC?.Data,
          },
          {
            title: 'Entering',
            data: coolingDXC?.Entering,
          },
          [
            {
              title: 'Setpoint',
              data: coolingDXC?.Leaving,
            },
            {
              title: 'Coil Performance',
              data: coolingDXC?.PerfOutputs,
            },
          ],
          {
            title: 'VRV Integration Kit',
            data: coolingDXC?.EKEXV_Kit,
          },
        ],
      });
    }

    if (heatingCondCoil) {
      data.push({
        groupName: 'Heating Mode DX Coil',
        direction: 'row',
        visible: heatingCondCoil?.Visible,
        style: {},
        subGroups: [
          {
            title: 'Coil',
            data: heatingCondCoil?.Data,
          },
          {
            title: 'Entering',
            data: heatingCondCoil?.Entering,
          },
          {
            title: 'Setpoint',
            data: heatingCondCoil?.Leaving,
          },
        ],
      });
    }

    if (heatingElecHeater) {
      data.push({
        groupName: 'Heating Electric Heater',
        direction: 'column',
        visible: heatingElecHeater?.Visible,
        style: {},
        subGroups: [
          {
            title: 'Actual',
            data: heatingElecHeater?.Data,
          },
        ],
      });
    }

    if (heatingHWC) {
      data.push({
        groupName: 'Heating HWC',
        direction: 'row',
        visible: heatingHWC?.Visible,
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        },
        subGroups: [
          {
            title: 'Coil',
            data: heatingHWC?.Data,
          },
          {
            title: 'Entering',
            data: heatingHWC?.Entering,
          },
          {
            title: 'Leaving',
            data: heatingHWC?.Leaving,
          },
          {
            title: 'Valve & Actuator',
            data: heatingHWC?.ValveActuator,
          },
        ],
      });
    }

    if (reheatElecHeater) {
      data.push({
        groupName: 'Reheat Electric Heater',
        direction: 'column',
        visible: reheatElecHeater?.Visible,
        style: {},
        subGroups: [
          {
            title: 'Actual',
            data: reheatElecHeater?.Data,
          },
        ],
      });
    }

    if (reheatHWC) {
      data.push({
        groupName: 'Reheat HWC',
        direction: 'row',
        visible: reheatHWC?.Visible,
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        },
        subGroups: [
          {
            title: 'Coil',
            data: reheatHWC?.Data,
          },
          {
            title: 'Entering',
            data: reheatHWC?.Entering,
          },
          {
            title: 'Leaving',
            data: reheatHWC?.Leaving,
          },
          {
            title: 'Valve & Actuator',
            data: reheatHWC?.ValveActuator,
          },
        ],
      });
    }

    if (reheatHGRC) {
      data.push({
        groupName: 'Reheat HGRC',
        direction: 'row',
        visible: reheatHGRC?.Visible,
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        },
        subGroups: [
          {
            title: 'Coil',
            data: reheatHGRC?.Data,
          },
          {
            title: 'Entering',
            data: reheatHGRC?.Entering,
          },
          [
            {
              title: 'Setpoint',
              data: reheatHGRC?.Leaving,
            },
            {
              title: 'Coil Performance',
              data: reheatHGRC?.PerfOutputs,
            },
          ],
          {
            title: 'VRV Integration Kit',
            data: reheatHGRC?.EKEXV_Kit,
          },
        ],
      });
    }

    if (supplyFan) {
      data.push({
        groupName: 'Supply Fan',
        direction: 'row',
        visible: supplyFan?.Visible,
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        subGroups: [
          {
            title: 'Fan Data',
            data: supplyFan?.Data,
          },
          {
            title: 'Graph',
            data: supplyFan?.GraphImageUrl,
          },
          {
            title: 'Sound Data',
            data: supplyFan?.SoundData,
          },
        ],
      });
    }

    if (exhaustFan) {
      data.push({
        groupName: 'Exhaust Fan',
        direction: 'row',
        visible: exhaustFan?.Visible,
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
        },
        subGroups: [
          {
            title: 'Fan Data',
            data: exhaustFan?.Data,
          },
          {
            title: 'Graph',
            data: exhaustFan?.GraphImageUrl,
          },
          {
            title: 'Sound Data',
            data: exhaustFan?.SoundData,
          },
        ],
      });
    }

    if (soundData) {
      data.push({
        groupName: 'Unit Sound Data (Hz)',
        direction: 'row',
        style: {},
        visible: soundData?.Visible,
        subGroups: [
          {
            data: soundData?.Data,
          },
        ],
      });
    }

    return data;
  }, [
    coolingCWC,
    coolingDXC,
    electricalRequirements,
    exhaustFan,
    heatExchCORE,
    heatExchPOLYBLOC,
    heatExchRECUTECH,
    heatingCondCoil,
    heatingElecHeater,
    heatingHWC,
    performanceVisible,
    preheatElecHeater,
    preheatHWC,
    pricingDetail,
    reheatElecHeater,
    reheatHGRC,
    reheatHWC,
    soundData,
    supplyFan,
    unitDetails,
    unitDetailsVisible,
  ]);

  console.log(SelectionInfo, viewSelectionInfo);

  return (
    <Page title="Project: Edit">
      <RootStyle>
        <Container>
          {error && <Box sx={{ maringLeft: 'auto', marginRight: 'auto', marginTop: '50px' }}>Server Error!</Box>}
          {isLoading ? (
            <LinearProgress color="info" />
          ) : (
            <Stack spacing={5} sx={{ mt: 2 }}>
              {SelectionInfo.map((item, index) => (
                <Accordion
                  key={index}
                  expanded={expanded[`panel${index}`]}
                  sx={{ display: item.visible !== true ? 'none' : 'block' }}
                  onChange={() => setExpanded({ ...expanded, [`panel${index}`]: !expanded[`panel${index}`] })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="primary.main" variant="h6">
                      {item.groupName}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid item xs={6}>
                      <Stack
                        direction={item.direction}
                        alignItems="stretch"
                        justifyContent="left"
                        spacing={3}
                        sx={{ ...item.style }}
                      >
                        {item.subGroups.map((element, index) =>
                          Array.isArray(element) ? (
                            <Box key={index}>
                              {element.map((ele, index) => (
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
                                            <TableRow
                                              key={index}
                                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                              {row.map((item, index) => (
                                                <TableCell key={item + index} component="th" scope="row" align="left">
                                                  {item}
                                                </TableCell>
                                              ))}
                                            </TableRow>
                                          ))}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </CustomGroupBox>
                              ))}
                            </Box>
                          ) : (
                            <CustomGroupBox
                              title={element.title}
                              key={element.title + index}
                              bordersx={{
                                display:
                                  element.title === 'Graph' ||
                                  (element.data !== undefined && element.data.length > 0 ? 'block' : 'none'),
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
                                <Image
                                  src={unitTypeData.intProductTypeID === 3 ? `/${element.data}` : element.data}
                                  height="100%"
                                />
                              )}

                              {element.title !== 'Graph' && (
                                <TableContainer component={Paper}>
                                  <Table size="small">
                                    <TableBody>
                                      {element.data &&
                                        element.data.map((row, index) => (
                                          <TableRow
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                          >
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
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          )}
        </Container>
      </RootStyle>
    </Page>
  );
}
