import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
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
  TextField,
  Snackbar,
  Alert,
  // AlertTitle,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useUnitEditFormSchema } from '../../hooks/useUnitEditForm';
// paths
// import { PATH_PROJECT } from '../../routes/paths';
// redux
import { useSelector, useDispatch } from '../../redux/store';
// import { addNewProject, updateProject } from '../../redux/slices/projectsReducer';
import * as unitReducer from '../../redux/slices/unitReducer';
// components
import Page from '../../components/Page';
import {
  FormProvider,
  RHFTextField,
  RHFSelect,
  RHFControlCheckbox,
  RHFCheckbox,
  RHFUploadSingleFile,
} from '../../components/hook-form';
import Iconify from '../../components/Iconify';
// utils
// import axios from '../../utils/axios';
// config
import * as IDs from './config';
// import { serverUrl } from '../../config';
// theme

//------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(3),
  mb: '100px',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(3),
  },
}));

//------------------------------------------------

// const dblTempErrorValue = 0.0;

//------------------------------------------------
UnitInfo.propTypes = {
  unitTypeData: PropTypes.object,
  setIsAddedNewUnit: PropTypes.func,
  isAddedNewUnit: PropTypes.bool,
};

export default function UnitInfo({ unitTypeData, setIsAddedNewUnit, isAddedNewUnit }) {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { controlInfo, unitInfo, layoutInfo } = useSelector((state) => state.unit);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUnitInfo = async () => {
      await dispatch(
        unitReducer.getInitUnitinfo({
          intUserID: localStorage.getItem('userId'),
          intUAL: localStorage.getItem('UAL'),
          intProjectID: projectId,
          intProductTypeID: unitTypeData.intProductTypeID,
          intUnitTypeID: unitTypeData.intUnitTypeID,
          intUnitNo: -1,
        })
      );

      setIsLoading(false);
    };

    getUnitInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('==================== Unit Information ==================');
  console.log(controlInfo, unitInfo, layoutInfo, isLoading);

  const [openSuccess, setOpenSuccess] = useState(false);
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const [openError, setOpenError] = useState(false);
  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  const {
    ualInfo,
    locationInfo,
    orientationInfo,
    // unitTypeInfo,
    bypassInfo,
    unitModelInfo,
    unitVoltageInfo,
    unitVoltageSPPInfo,
    // preheatRequiredInfo,
    componentInfo,
    dxCoilRefrigDesignCondInfo,
    condCoilRefrigDesignCondInfo,
    controlsPreferenceInfo,
    coolingFluidDesignCondInfo,
    damperAndActuatorInfo,
    downshotInfo,
    drainPanInfo,
    elecHeaterVoltageInfo,
    handingInfo,
    heatPumpInfo,
    dehumidificationInfo,
    reheatInfo,
    preheatElecHeaterInstallationInfo,
    heatElecHeaterInstallationInfo,
    valveAndActuatorInfo,
    preheatCoilHandingInfo,
    coolingCoilHandingInfo,
    heatingCoilHandingInfo,
    valveTypeInfo,
    heatingFluidDesignCondInfo,
    outdoorAirFilterInfo,
    returnAirFilterInfo,
    // setpointsInfo,
    heatingSetpointInfo,
    coolingSetpointInfo,
    customInputsInfo,
    reheatSetpointInfo,
    supplyAirOpeningInfo,
    remainingOpeningsInfo,
    // supplyAirESPInfo,
    // returnAirESPInfo,
    // summerReturnAirCFMInfo,
    // summerSupplyAirCFMInfo,
  } = controlInfo;

  const [ckbBypassVal, setCkbBypassVal] = useState(!!bypassInfo?.ckbBypassVal);
  const [ckbDrainPanVal, setCkbDrainPanVal] = useState(!!drainPanInfo?.ckbDrainPanVal);
  const [ckbVoltageSPPVal, setCkbVoltageSPPVal] = useState(!!unitVoltageSPPInfo?.ckbVoltageSPPVal);
  const [ckbDehumidificationVal, setCkbDehumidificationVal] = useState(
    !!dehumidificationInfo?.ckbDehumidificationChecked
  );
  const [ckbValveAndActuatorVal, setCkbValveAndActuatorVal] = useState(!!valveAndActuatorInfo?.ckbValveAndActuatorVal);
  const [ckbHeatPumpVal, setCkbHeatPumpVal] = useState(!!heatPumpInfo?.ckbHeatPumpVal);
  const [ckbDownshotVal, setCkbDownshotVal] = useState(!!downshotInfo?.isDownshotVal);
  const [ckbFlowRateAndCap, setCkbFlowRateAndCap] = useState({
    ckbPreheatHWC_UseCap: false,
    ckbPreheatHWC_UseFlowRate: false,
    ckbCoolingCWC_UseCap: false,
    ckbCoolingCWC_UseFlowRate: false,
    ckbHeatingHWC_UseCap: false,
    ckbHeatingHWC_UseFlowRate: false,
    ckbReheatHWC_UseCap: false,
    ckbReheatHWC_UseFlowRate: false,
  });

  const [expanded, setExpanded] = React.useState({
    panel1: true,
    panel2: true,
    panel3: true,
    panel4: true,
    panel5: true,
    panel6: true,
    panel7: true,
  });

  const defaultValues = useMemo(
    () => ({
      txtTag: '',
      txbQty: 0,
      ddlLocationId: locationInfo?.ddlLocationId,
      ddlOrientationId: orientationInfo?.ddlOrientationId,
      ddlUnitTypeId: 1,
      ddlControlsPreferenceId: controlsPreferenceInfo?.ddlControlsPreferenceId,
      txbSummerSupplyAirCFM: 325,
      txbSummerReturnAirCFM: 325,
      txbSupplyAirESP: 0.75,
      txbExhaustAirESP: 0.75,
      ddlUnitModelId: unitModelInfo?.ddlUnitModelId,
      ddlUnitVoltageId: unitVoltageInfo?.ddlUnitVoltageId,
      txbAltitude: unitInfo?.txbAltitudeText,
      txbSummerOutdoorAirDB: unitInfo?.txbSummerOutdoorAirDBText,
      txbSummerOutdoorAirWB: unitInfo?.txbSummerOutdoorAirWBText,
      txbSummerOutdoorAirRH: unitInfo?.txbSummerOutdoorAirRHText,
      txbWinterOutdoorAirDB: unitInfo?.txbWinterOutdoorAirDBText,
      txbWinterOutdoorAirWB: unitInfo?.txbWinterOutdoorAirWBText,
      txbWinterOutdoorAirRH: unitInfo?.txbWinterOutdoorAirRHText,
      txbSummerReturnAirDB: unitInfo?.txbSummerReturnAirDBText,
      txbSummerReturnAirWB: unitInfo?.txbSummerReturnAirWBText,
      txbSummerReturnAirRH: unitInfo?.txbSummerReturnAirRHText,
      txbWinterReturnAirDB: unitInfo?.txbWinterReturnAirDBText,
      txbWinterReturnAirWB: unitInfo?.txbWinterReturnAirWBText,
      txbWinterReturnAirRH: unitInfo?.txbWinterReturnAirRHText,
      txbWinterPreheatSetpointDB: 0,
      txbSummerCoolingSetpointDB: 55,
      txbSummerCoolingSetpointWB: 55,
      txbWinterHeatingSetpointDB: 72,
      txbSummerReheatSetpointDB: 70,
      ddlOA_FilterModelId: outdoorAirFilterInfo?.ddlOA_FilterModelId,
      ddlRA_FilterModelId: returnAirFilterInfo?.ddlRA_FilterModelId,
      ddlPreheatCompId: componentInfo?.ddlPreheatCompId,
      ddlHeatExchCompId: componentInfo?.ddlHeatExchCompId,
      ddlCoolingCompId: componentInfo?.ddlCoolingCompId,
      ddlHeatingCompId: componentInfo?.ddlHeatingCompId,
      txbOA_FilterPD: 0.5,
      txbRA_FilterPD: 0.5,
      ckbHeatPumpVal: heatPumpInfo?.ckbHeatPumpVal,
      ckbDehumidificationVal: dehumidificationInfo?.ckbDehumidificationChecked,
      ddlReheatCompId: reheatInfo?.ddlReheatCompId,
      ddlDamperAndActuatorId: damperAndActuatorInfo?.ddlDamperAndActuatorId,
      ddlElecHeaterVoltageId: elecHeaterVoltageInfo?.ddlElecHeaterVoltageId,
      ddlPreheatElecHeaterInstallationId: isLoading
        ? 0
        : preheatElecHeaterInstallationInfo?.ddlPreheatElecHeaterInstallationId,
      ddlHeatElecHeaterInstallationId: heatElecHeaterInstallationInfo?.ddlHeatElecHeaterInstallationId,
      ckbValveAndActuatorVal: valveAndActuatorInfo?.ckbValveAndActuatorVal,
      ckbDrainPanVal: drainPanInfo?.ckbDrainPanVal,
      ddlPreheatCoilHandingId: preheatCoilHandingInfo?.ddlPreheatCoilHandingId,
      ddlCoolingCoilHandingId: coolingCoilHandingInfo?.ddlCoolingCoilHandingId,
      ddlHeatingCoilHandingId: heatingCoilHandingInfo?.ddlHeatingCoilHandingId,
      ddlValveTypeId: valveTypeInfo?.ddlValveTypeId,
      txbPreheatHWC_Cap: 0,
      txbPreheatHWC_FlowRate: 0,
      txbCoolingCWC_Cap: 0,
      txbCoolingCWC_FlowRate: 0,
      txbHeatingHWC_Cap: 0,
      txbHeatingHWC_FlowRate: 0,
      txbReheatHWC_Cap: 0,
      txbReheatHWC_FlowRate: 0,
      ddlCoolingFluidTypeId: coolingFluidDesignCondInfo?.ddlCoolingFluidTypeId,
      ddlCoolingFluidConcentrationId: coolingFluidDesignCondInfo?.ddlCoolingFluidConcentrationId,
      txbCoolingFluidEntTemp: 45,
      txbCoolingFluidLvgTemp: 55,
      txbRefrigSuctionTemp: 43,
      txbRefrigLiquidTemp: 77,
      txbRefrigSuperheatTemp: 9,
      ddlHeatingFluidTypeId: heatingFluidDesignCondInfo?.ddlHeatingFluidTypeId,
      ddlHeatingFluidConcentrationId: heatingFluidDesignCondInfo?.ddlHeatingFluidConcentrationId,
      txbHeatingFluidEntTemp: 140,
      txbHeatingFluidLvgTemp: 120,
      txbRefrigCondensingTemp: 115,
      txbRefrigVaporTemp: 140,
      txbRefrigSubcoolingTemp: 5.4,
      txbPercentCondensingLoad: 0,
      txbUnitHeightText: 0,
      txbUnitLengthText: 0,
      txbUnitWeightText: 0,
      txbUnitWidthText: 0,
      ddlHandingId: handingInfo?.ddlHandingId,
      ddlSupplyAirOpeningId: supplyAirOpeningInfo?.ddlSupplyAirOpeningId,
      ddlSupplyAirOpeningText: supplyAirOpeningInfo?.ddlSupplyAirOpeningText,
      ddlExhaustAirOpeningId: remainingOpeningsInfo?.ddlExhaustAirOpeningId,
      ddlExhaustAirOpeningText: remainingOpeningsInfo?.ddlExhaustAirOpeningText,
      ddlOutdoorAirOpeningId: remainingOpeningsInfo?.ddlOutdoorAirOpeningId,
      ddlOutdoorAirOpeningText: remainingOpeningsInfo?.ddlOutdoorAirOpeningText,
      ddlReturnAirOpeningId: remainingOpeningsInfo?.ddlReturnAirOpeningId,
      ddlReturnAirOpeningText: remainingOpeningsInfo?.ddlReturnAirOpeningText,
      layoutImage: {},
    }),
    [
      componentInfo?.ddlCoolingCompId,
      componentInfo?.ddlHeatExchCompId,
      componentInfo?.ddlHeatingCompId,
      componentInfo?.ddlPreheatCompId,
      controlsPreferenceInfo?.ddlControlsPreferenceId,
      coolingCoilHandingInfo?.ddlCoolingCoilHandingId,
      coolingFluidDesignCondInfo?.ddlCoolingFluidConcentrationId,
      coolingFluidDesignCondInfo?.ddlCoolingFluidTypeId,
      damperAndActuatorInfo?.ddlDamperAndActuatorId,
      dehumidificationInfo?.ckbDehumidificationChecked,
      drainPanInfo?.ckbDrainPanVal,
      elecHeaterVoltageInfo?.ddlElecHeaterVoltageId,
      handingInfo?.ddlHandingId,
      heatElecHeaterInstallationInfo?.ddlHeatElecHeaterInstallationId,
      heatPumpInfo?.ckbHeatPumpVal,
      heatingCoilHandingInfo?.ddlHeatingCoilHandingId,
      heatingFluidDesignCondInfo?.ddlHeatingFluidConcentrationId,
      heatingFluidDesignCondInfo?.ddlHeatingFluidTypeId,
      isLoading,
      locationInfo?.ddlLocationId,
      orientationInfo?.ddlOrientationId,
      outdoorAirFilterInfo?.ddlOA_FilterModelId,
      preheatCoilHandingInfo?.ddlPreheatCoilHandingId,
      preheatElecHeaterInstallationInfo?.ddlPreheatElecHeaterInstallationId,
      reheatInfo?.ddlReheatCompId,
      remainingOpeningsInfo?.ddlExhaustAirOpeningId,
      remainingOpeningsInfo?.ddlExhaustAirOpeningText,
      remainingOpeningsInfo?.ddlOutdoorAirOpeningId,
      remainingOpeningsInfo?.ddlOutdoorAirOpeningText,
      remainingOpeningsInfo?.ddlReturnAirOpeningId,
      remainingOpeningsInfo?.ddlReturnAirOpeningText,
      returnAirFilterInfo?.ddlRA_FilterModelId,
      supplyAirOpeningInfo?.ddlSupplyAirOpeningId,
      supplyAirOpeningInfo?.ddlSupplyAirOpeningText,
      unitInfo?.txbAltitudeText,
      unitInfo?.txbSummerOutdoorAirDBText,
      unitInfo?.txbSummerOutdoorAirRHText,
      unitInfo?.txbSummerOutdoorAirWBText,
      unitInfo?.txbSummerReturnAirDBText,
      unitInfo?.txbSummerReturnAirRHText,
      unitInfo?.txbSummerReturnAirWBText,
      unitInfo?.txbWinterOutdoorAirDBText,
      unitInfo?.txbWinterOutdoorAirRHText,
      unitInfo?.txbWinterOutdoorAirWBText,
      unitInfo?.txbWinterReturnAirDBText,
      unitInfo?.txbWinterReturnAirRHText,
      unitInfo?.txbWinterReturnAirWBText,
      unitModelInfo?.ddlUnitModelId,
      unitVoltageInfo?.ddlUnitVoltageId,
      valveAndActuatorInfo?.ckbValveAndActuatorVal,
      valveTypeInfo?.ddlValveTypeId,
    ]
  );

  console.log(defaultValues);

  const methods = useForm({
    resolver: yupResolver(useUnitEditFormSchema),
    defaultValues,
  });

  const {
    setValue,
    getValues,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    // reset(defaultValues);
  }, [reset, defaultValues]);

  const getDisplay = (key) => ({ display: key ? 'block' : 'none' });

  const getAllFormData = () => ({
    ...getValues(),
    intProjectID: projectId,
    intUnitNo: 0,
    intProductTypeID: unitTypeData.intProductTypeID,
    intUnitTypeID: unitTypeData.intUnitTypeID,
    ddlUnitTypeId: unitTypeData.intUnitTypeID,
    intUAL: localStorage.getItem('UAL'),
    intUserID: localStorage.getItem('userId'),
  });

  // handle submit
  const onSubmit = async () => {
    try {
      const data = {
        ...getAllFormData(),
        ddlHandingId: layoutInfo.ddlHandingId,
        ddlSupplyAirOpeningId: layoutInfo.ddlSupplyAirOpeningId,
        ddlSupplyAirOpeningText: layoutInfo.ddlSupplyAirOpeningText,
        ddlExhaustAirOpeningId: layoutInfo.ddlExhaustAirOpeningId,
        ddlExhaustAirOpeningText: layoutInfo.ddlExhaustAirOpeningText,
        ddlOutdoorAirOpeningId: layoutInfo.ddlOutdoorAirOpeningId,
        ddlOutdoorAirOpeningText: layoutInfo.ddlOutdoorAirOpeningText,
        ddlReturnAirOpeningId: layoutInfo.ddlReturnAirOpeningId,
        ddlReturnAirOpeningText: layoutInfo.ddlReturnAirOpeningText,
      };

      console.log('--------------------- Submit Data----------------------');
      console.log(data);

      const intUnitNo = await dispatch(unitReducer.saveUnitInfo(getAllFormData()));
      setOpenSuccess(true);
      setIsAddedNewUnit(intUnitNo);
    } catch (e) {
      console.log(e);
      setOpenError(true);
    }
  };

  const ddlLocationChanged = async (e) => {
    setValue('ddlLocationId', parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlLocationChanged(getAllFormData()));
    setValue('ddlOrientationId', result.ddlOrientationId);
    setValue('ddlDamperAndActuatorId', result.ddlDamperAndActuatorId);
    setValue('ddlUnitModelId', result.ddlUnitModelId);
    setValue('ddlElecHeaterVoltageId', result.others.elecHeaterVoltage.ddlElecHeaterVoltageId);
    setValue('ckbDownshotVal', result.downshot);
    setValue('ddlPreheatElecHeaterInstallationId', result.preheatElectricHeater.ddlPreheatElecHeaterInstallationId);
    setValue('txbSupplyAirESP', result.txbSupplyAirESP);
    setValue('txbExhaustAirESP', result.txbExhaustAirESP);
  };

  const ddlOrientationChanged = async (e) => {
    setValue('ddlOrientationId', parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlOrientationChanged(getAllFormData()));
    setValue('ddlUnitModelId', result.ddlUnitModelId);
    setValue('ddlElecHeaterVoltageId', result.others.elecHeaterVoltage.ddlElecHeaterVoltageId);
    setValue('ddlSupplyAirOpeningId', result.ddlSupplyAirOpeningId);
    setValue('ddlSupplyAirOpeningText', result.ddlSupplyAirOpeningText);
  };

  const txbSummerSupplyAirCFMChanged = async () => {
    const result = await dispatch(unitReducer.txbSummerSupplyAirCFMChanged(getAllFormData()));
    setValue('ddlOrientationId', result.ddlOrientationId);
    setValue('ddlUnitModelId', result.ddlUnitModelId);
    setValue('ddlElecHeaterVoltageId', result.others.elecHeaterVoltage.ddlElecHeaterVoltageId);
    setValue('ddlSupplyAirOpeningId', result.ddlSupplyAirOpeningId);
    setValue('ddlSupplyAirOpeningText', result.ddlSupplyAirOpeningText);
    setValue('txbSummerSupplyAirCFM', result.txbSummerSupplyAirCFM);
    setValue('txbSummerReturnAirCFM', result.txbSummerReturnAirCFM);
  };

  const txbSummerReturnAirCFMChanged = async () => {
    const result = await dispatch(unitReducer.txbSummerReturnAirCFMChanged(getAllFormData()));
    setValue('txbSummerReturnAirCFM', result);
  };

  const txbSupplyAirESPChanged = async () => {
    const result = await dispatch(unitReducer.txbSupplyAirESPChanged(getAllFormData()));
    setValue('txbSupplyAirESP', result);
  };

  const txbExhaustAirESPChanged = async () => {
    const result = await dispatch(unitReducer.txbExhaustAirESPChanged(getAllFormData()));
    setValue('txbExhaustAirESP', result);
  };

  const ddlUnitModelChanged = async (e) => {
    setValue('ddlUnitModelId', parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlUnitModelChanged(getAllFormData()));
    setValue('ddlUnitVoltageId', result.ddlUnitVoltageId);
    setValue('ddlElecHeaterVoltageId', result.elecHeaterVoltageInfo.ddlElecHeaterVoltageId);
    setValue('txbSupplyAirESP', result.txbSupplyAirESP);
  };

  const ddlUnitVoltageChanged = async (e) => {
    setValue('ddlUnitVoltageId', parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlUnitVoltageChanged(getAllFormData()));
    setValue('ddlElecHeaterVoltageId', result.ddlElecHeaterVoltageId);
  };

  // const txbSummerOutdoorAirDBChanged = async (e) => {
  //   setValue('txbSummerOutdoorAirDB', parseFloat(e.target.value, 10));
  //   if (e.target.value === 0) {
  //     setValue('txbSummerOutdoorAirWB', 0);
  //     setValue('txbSummerOutdoorAirRH', 100);
  //   } else {
  //     setValue('txbSummerOutdoorAirWB', dblTempErrorValue);
  //     setValue('txbSummerOutdoorAirRH', dblTempErrorValue);
  //   }
  // };

  // const txbSummerOutdoorAirWBChanged = async (e) => {
  //   setValue('txbSummerOutdoorAirWB', parseFloat(e.target.value, 10));
  //   const result = await dispatch(unitReducer.txbSummerOutdoorAirWBChanged(getAllFormData()));
  //   setValue('txbSummerOutdoorAirRH', result);
  // };

  // const txbSummerOutdoorAirRHChanged = async (e) => {
  //   setValue('txbSummerOutdoorAirRH', parseFloat(e.target.value, 10));
  //   const result = await dispatch(unitReducer.txbSummerOutdoorAirRHChanged(getAllFormData()));
  //   setValue('txbSummerOutdoorAirWB', result);
  // };

  // const txbWinterOutdoorAirDBChanged = async (e) => {
  //   setValue('txbWinterOutdoorAirDB', parseFloat(e.target.value, 10));
  //   if (e.target.value === 0) {
  //     setValue('txbWinterOutdoorAirWB', 0);
  //     setValue('txbWinterOutdoorAirRH', 100);
  //   } else {
  //     setValue('txbWinterOutdoorAirWB', dblTempErrorValue);
  //     setValue('txbWinterOutdoorAirRH', dblTempErrorValue);
  //   }
  // };

  // const txbWinterOutdoorAirWBChanged = async (e) => {
  //   setValue('txbWinterOutdoorAirWB', parseFloat(e.target.value, 10));
  //   const result = await dispatch(unitReducer.txbWinterOutdoorAirWBChanged(getAllFormData()));
  //   setValue('txbWinterOutdoorAirRH', result);
  // };

  // const txbWinterOutdoorAirRHChanged = async (e) => {
  //   setValue('txbWinterOutdoorAirRH', parseFloat(e.target.value, 10));
  //   const result = await dispatch(unitReducer.txbWinterOutdoorAirRHChanged(getAllFormData()));
  //   setValue('txbWinterOutdoorAirWB', result);
  // };

  // const txbSummerReturnAirDBChanged = (e) => {
  //   setValue('txbSummerReturnAirDB', parseFloat(e.target.value, 10));
  //   if (e.target.value === 0) {
  //     setValue('txbSummerReturnAirWB', 0);
  //     setValue('txbSummerReturnAirRH', 100);
  //   } else {
  //     setValue('txbSummerReturnAirWB', dblTempErrorValue);
  //     setValue('txbSummerReturnAirRH', dblTempErrorValue);
  //   }
  // };

  // const txbSummerReturnAirWBChanged = async (e) => {
  //   setValue('txbSummerReturnAirWB', parseFloat(e.target.value, 10));
  //   const result = await dispatch(unitReducer.txbSummerReturnAirWBChanged(getAllFormData()));
  //   setValue('txbSummerReturnAirRH', result);
  // };

  // const txbSummerReturnAirRHChanged = async (e) => {
  //   setValue('txbSummerReturnAirRH', parseFloat(e.target.value, 10));
  //   const result = await dispatch(unitReducer.txbSummerReturnAirRHChanged(getAllFormData()));
  //   setValue('txbSummerReturnAirWB', result);
  // };

  // const txbWinterReturnAirDBChanged = (e) => {
  //   if (e.target.value === '') {
  //     setValue('txbWinterReturnAirWB', '');
  //   } else if (!isNaN(+e.target.value)) {
  //     setValue('txbWinterReturnAirDB', parseFloat(e.target.value, 10));

  //     if (e.target.value === 0) {
  //       setValue('txbWinterReturnAirWB', 0);
  //       setValue('txbWinterReturnAirRH', 100);
  //     } else {
  //       setValue('txbWinterReturnAirWB', dblTempErrorValue);
  //       setValue('txbWinterReturnAirRH', dblTempErrorValue);
  //     }
  //   }
  // };

  // const txbWinterReturnAirWBChanged = async (e) => {
  //   if (e.target.value === '') {
  //     setValue('txbWinterReturnAirWB', '');
  //   } else if (!isNaN(+e.target.value)) {
  //     setValue('txbWinterReturnAirWB', parseFloat(e.target.value, 10));
  //     const result = await dispatch(unitReducer.txbWinterReturnAirWBChanged(getAllFormData()));
  //     setValue('txbWinterReturnAirRH', result);
  //   }
  // };

  // const txbWinterReturnAirRHChanged = async (e) => {
  //   if (e.target.value === '') {
  //     setValue('txbWinterReturnAirRH', '');
  //   } else if (!isNaN(+e.target.value)) {
  //     setValue('txbWinterReturnAirRH', parseFloat(e.target.value, 10));
  //     const result = await dispatch(unitReducer.txbWinterReturnAirRHChanged(getAllFormData()));
  //     setValue('txbWinterReturnAirWB', result);
  //   }
  // };

  const ddlPreheatCompChanged = async (e) => {
    setValue('ddlPreheatCompId', parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlPreheatCompChanged(getAllFormData()));
    if (result.preheatElecHeaterInstallationInfo.divPreheatElecHeaterInstallationVisible) {
      setValue(
        'ddlPreheatElecHeaterInstallationId',
        result.preheatElecHeaterInstallationInfo.ddlPreheatElecHeaterInstallationId
      );
    }
    if (result.elecHeaterVoltageInfo.divElecHeaterVoltageVisible) {
      setValue('ddlElecHeaterVoltageId', result.elecHeaterVoltageInfo.ddlElecHeaterVoltageId);
    }
  };

  // const ddlHeatExchCompChanged = (e) => {
  //   console.log(e.target.value);
  // };

  const ddlCoolingCompChanged = async (e) => {
    setValue('ddlCoolingCompId', parseInt(e.target.value, 10));
    if (getValues('ddlCoolingCompId') !== IDs.intCompDX_ID) setCkbHeatPumpVal(false);
    if (getValues('ddlCoolingCompId') === IDs.intCompNA_ID) setCkbDehumidificationVal(false);
    await dispatch(unitReducer.ddlCoolingCompChanged(getAllFormData()));
  };

  const ckbHeatPumpChanged = async () => {
    setCkbHeatPumpVal(!ckbHeatPumpVal);
    const data = {
      ...getAllFormData(),
      ckbHeatPumpVal: !ckbHeatPumpVal,
    };
    await dispatch(unitReducer.ckbHeatPumpChanged(data));
  };

  const ckbDehumidificationChanged = async (e) => {
    setCkbDehumidificationVal(!ckbDehumidificationVal);
    setValue('ckbDehumidificationVal', e.target.checked);
    await dispatch(unitReducer.ckbDehumidificationChanged(getAllFormData()));
  };

  const ddlHeatingCompChanged = async (e) => {
    setValue('ddlHeatingCompId', parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlHeatingCompChanged(getAllFormData()));
    setValue(
      'ddlHeatingElecHeaterInstallationId',
      result.heatElecHeaterInstallationInfo.divHeatElecHeaterInstallationVisible &&
        result.heatElecHeaterInstallationInfo.ddlHeatElecHeaterInstallationId
    );
  };

  const ddlReheatCompChanged = async (e) => {
    setValue('ddlReheatCompId', parseInt(e.target.value, 10));
    await dispatch(unitReducer.ddlReheatCompChanged(getAllFormData()));
  };

  // const txbOA_FilterPDChanged = async (e) => {
  //   if (e.target.value > 1.0) {
  //     setValue('txbOA_FilterPD', 1.0);
  //   } else if (e.target.value < 0.3) {
  //     setValue('txbOA_FilterPD', 0.3);
  //   } else {
  //     setValue('txbOA_FilterPD', parseFloat(e.target.value, 10));
  //   }
  // };

  // const txbRA_FilterPDChanged = (e) => {
  //   if (e.target.value > 1.0) {
  //     setValue('txbRA_FilterPD', 1.0);
  //   } else if (e.target.value < 0.3) {
  //     setValue('txbRA_FilterPD', 0.3);
  //   } else {
  //     setValue('txbRA_FilterPD', parseFloat(e.target.value, 10));
  //   }
  // };

  const ddlElecHeaterVoltageChanged = async (e) => {
    setValue('ddlElecHeaterVoltageId', parseInt(e.target.value, 10));
  };

  const setValueWithCheck = (e, key) => {
    if (e.target.value === '') {
      setValue(key, '');
    } else if (!isNaN(+e.target.value)) {
      setValue(key, parseFloat(e.target.value, 10));
    }
  };

  // const ckbDehumidificationInfo = async (e) => {
  //   setCkbDehumidificationVal(e.target.checked);
  //   await dispatch(unitReducer.ckbDehumidificationChanged(getAllFormData()));
  // };

  const ddlHandingChanged = async (e) => {
    setValue('ddlHandingId', parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlHandingChanged(getAllFormData()));
    setValue('ddlSupplyAirOpeningId', parseInt(result.supplyAirOpeningInfo.ddlSupplyAirOpeningId, 10));
    setValue('ddlSupplyAirOpeningText', result.supplyAirOpeningInfo.ddlSupplyAirOpeningText);
    setValue('ddlExhaustAirOpeningId', parseInt(result.remainingOpeningsInfo.ddlExhaustAirOpeningId, 10));
    setValue('ddlExhaustAirOpeningText', result.remainingOpeningsInfo.ddlExhaustAirOpeningText);
    setValue('ddlOutdoorAirOpeningId', parseInt(result.remainingOpeningsInfo.ddlOutdoorAirOpeningId, 10));
    setValue('ddlOutdoorAirOpeningText', result.remainingOpeningsInfo.ddlOutdoorAirOpeningText);
    setValue('ddlReturnAirOpeningId', parseInt(result.remainingOpeningsInfo.ddlReturnAirOpeningId, 10));
    setValue('ddlReturnAirOpeningText', result.remainingOpeningsInfo.ddlReturnAirOpeningText);
  };

  const ddlSupplyAirOpeningChanged = async (e) => {
    setValue('ddlSupplyAirOpeningId', parseInt(e.target.value, 10));
    setValue('ddlSupplyAirOpeningText', e.target.options[e.target.selectedIndex].text);
    const result = await dispatch(unitReducer.ddlSupplyAirOpeningChanged(getAllFormData()));
    setValue('ddlExhaustAirOpeningId', parseInt(result.remainingOpeningsInfo.ddlExhaustAirOpeningId, 10));
    setValue('ddlExhaustAirOpeningText', result.remainingOpeningsInfo.ddlExhaustAirOpeningText);
    setValue('ddlOutdoorAirOpeningId', parseInt(result.remainingOpeningsInfo.ddlOutdoorAirOpeningId, 10));
    setValue('ddlOutdoorAirOpeningText', result.remainingOpeningsInfo.ddlOutdoorAirOpeningText);
    setValue('ddlReturnAirOpeningId', parseInt(result.remainingOpeningsInfo.ddlReturnAirOpeningId, 10));
    setValue('ddlReturnAirOpeningText', result.remainingOpeningsInfo.ddlReturnAirOpeningText);
  };

  const ddlExhaustAirOpeningChanged = async (e) => {
    setValue('ddlExhaustAirOpeningId', parseInt(e.target.value, 10));
    setValue('ddlExhaustAirOpeningText', e.target.options[e.target.selectedIndex].text);
  };

  const ddlOutdoorAirOpeningChanged = async (e) => {
    setValue('ddlOutdoorAirOpeningId', parseInt(e.target.value, 10));
    setValue('ddlOutdoorAirOpeningText', e.target.options[e.target.selectedIndex].text);
  };

  const ddlReturnAirOpeningChanged = async (e) => {
    setValue('ddlReturnAirOpeningId', parseInt(e.target.value, 10));
    setValue('ddlReturnAirOpeningText', e.target.options[e.target.selectedIndex].text);
  };

  // const isCkbValuesAndActuatorVisible = () =>
  //   getValues('ddlPreheatCompId') === IDs.intCompHWC_ID ||
  //   getValues('ddlHeatingCompId') === IDs.intCompHWC_ID ||
  //   getValues('ddlReheatCompId') === IDs.intCompHWC_ID ||
  //   getValues('ddlCoolingCompId') === IDs.intCompCWC_ID;
  // const isCkbHeatPumpVisible = () => getValues('ddlCoolingCompId') === IDs.intCompDX_ID;
  // const isCkbDehumidificationVisible = () =>
  //   getValues('ddlCoolingCompId') === IDs.intCompCWC_ID || getValues('ddlCoolingCompId') === IDs.intCompDX_ID;
  // const isCbkDrainPanVisible = () =>
  //   (intProductTypeID === IDs.intProdTypeVentumID || intProductTypeID === IDs.intProdTypeVentumLiteID) &&
  //   intProductTypeID === IDs.intUnitTypeHRV_ID;
  // const isCkbVoltageSPPVisible = () => intProductTypeID === IDs.intProdTypeTerraID;
  // const isDdlElecHeaterVolatageVisible = () =>
  //   getValues('ddlPreheatCompId') === IDs.intCompElecHeaterID ||
  //   getValues('ddlHeatingCompId') === IDs.intCompElecHeaterID ||
  //   getValues('ddlReheatCompId') === IDs.intCompElecHeaterID;
  // const isDdlHeatElecHeaterInstallationVisible = () =>
  //   getValues('ddlHeatingCompId') === IDs.intCompElecHeaterID ||
  //   getValues('ddlReheatCompId') === IDs.intCompElecHeaterID;
  // const isDdlPreheatElecHeaterInstallationVisible = () => getValues('ddlPreheatCompId') === IDs.intCompElecHeaterID;
  // const isTxbReheatSetpointDBVisible = () =>
  //   getValues('ddlReheatCompId') !== IDs.intCompNA_ID &&
  //   getValues('ddlCoolingCompId') !== IDs.intCompNA_ID &&
  //   ckbDehumidificationVal;
  // const isDivHeatingFluidDesignConditionsVisible = () =>
  //   getValues('ddlPreheatCompId') === IDs.intCompHWC_ID ||
  //   getValues('ddlHeatingCompId') === IDs.intCompHWC_ID ||
  //   getValues('ddlReheatCompId') === IDs.intCompHWC_ID;

  // const isPreheatCompHWC = () => getValues('ddlPreheatComp') === IDs.intCompHWC_ID;
  // const isCoolingCompCWC = () => getValues('ddlCoolingComp') === IDs.intCompCWC_ID;
  // const isHeatingCompHWC = () => getValues('ddlHeatingComp') === IDs.intCompHWC_ID;
  // const isReheatCompHWC = () => getValues('ddlReheatComp') === IDs.intCompHWC_ID;

  // const isDivSetpointsVisible = () =>
  //   (getValues('intUnitTypeID') === IDs.intUnitTypeAHU_ID && getValues('intPreheatCompId') > 1) ||
  //   getValues('ddlCoolingCompId') > 1 ||
  //   getValues('ddlHeatingCompId') > 1 ||
  //   getValues('ddlReheatCompId') > 1;
  // const isDivDXCoilRefrigDesignCondVisible = () => {
  //   const intUAL = localStorage.getItem('UAL');
  //   return (
  //     (intUAL === IDs.intUAL_Admin ||
  //       intUAL === IDs.intUAL_IntAdmin ||
  //       intUAL === IDs.intUAL_IntLvl_1 ||
  //       intUAL === IDs.intUAL_IntLvl_2) &&
  //     getValues('ddlCoolingCompId') === IDs.intCompDX_ID
  //   );
  // };
  // const isDivHeatingFluidDesignCondVisible = () =>
  //   getValues('intPreheatCompId') === IDs.intCompHWC_ID ||
  //   getValues('ddlHeatingCompId') === IDs.intCompHWC_ID ||
  //   getValues('ddlReheatCompId') === IDs.intCompHWC_ID;
  // const isDivCondCoilRefrigDesignCondVisible = () => ckbHeatPumpVal || getValues('ddlReheatCompId') === IDs.intCompHGRH_ID;
  // const isTxbCoolingSetpointVisible = () =>
  //   getValues('ddlCoolingCompId') === IDs.intCompCWC_ID || getValues('ddlCoolingCompId') === IDs.intCompDX_ID;
  // const isTxbHeatingSetpointVisible = () =>
  //   getValues('ddlHeatingCompId') === IDs.intCompElecHeaterID ||
  //   getValues('ddlHeatingCompId') === IDs.intCompHWC_ID ||
  //   ckbHeatPumpVal;
  const isUnitTypeAHU = () => unitTypeData.intProductTypeID === IDs.intUnitTypeAHU_ID;
  // const isTxbSummerReturnAirCFMVisible = () => intUnitTypeID !== IDs.intUnitTypeAHU_ID;
  // const isTxbReturnAirESPVisible = () => intUnitTypeID !== IDs.intUnitTypeAHU_ID;

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file) {
      setValue(
        'layoutImage',
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  };

  const isAvailable = (value) => !!value && value.length > 0;

  return (
    <Page title="Project: Edit">
      <RootStyle>
        <Container>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {isLoading ? (
              <LinearProgress color="info" />
            ) : (
              <Stack spacing={2} sx={{ marginBottom: '150px' }}>
                <Stack direction="row" alignContent="center" justifyContent="center">
                  <Typography variant="h3" color="primary.main">
                    {unitTypeData.txbProductType}/{unitTypeData.txbUnitType}
                  </Typography>
                </Stack>
                <Accordion
                  expanded={expanded.panel1}
                  onChange={() => setExpanded({ ...expanded, panel1: !expanded.panel1 })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="primary.main" variant="h6">
                      UNIT DETAILS
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={5}>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFTextField size="small" name="txtTag" label="Tag" />
                          <RHFTextField
                            size="small"
                            name="txbQty"
                            label="Quantity"
                            // onChange={(e) => {
                            //   setValueWithCheck(e, 'txbQty');
                            // }}
                          />
                          {isAvailable(locationInfo.ddlLocationDataTbl) && (
                            <RHFSelect
                              size="small"
                              name="ddlLocationId"
                              label="Location"
                              placeholder=""
                              onChange={ddlLocationChanged}
                            >
                              {locationInfo.ddlLocationDataTbl.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.items}
                                </option>
                              ))}
                            </RHFSelect>
                          )}
                          <RHFControlCheckbox
                            size="small"
                            name="ckbDownshotVal"
                            label="Downshot"
                            sx={getDisplay(ckbDownshotVal === 1)}
                            checked={ckbDownshotVal}
                            onChange={() => setCkbDownshotVal(!ckbDownshotVal)}
                          />
                          {isAvailable(orientationInfo.ddlOrientationDataTbl) && (
                            <RHFSelect
                              size="small"
                              name="ddlOrientationId"
                              label="Orientation"
                              placeholder=""
                              onChange={ddlOrientationChanged}
                            >
                              {orientationInfo.ddlOrientationDataTbl.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.items}
                                </option>
                              ))}
                            </RHFSelect>
                          )}
                          {isAvailable(controlsPreferenceInfo.ddlControlsPreferenceDataTbl) && (
                            <RHFSelect
                              size="small"
                              name="ddlControlsPreferenceId"
                              label="Control Preference"
                              placeholder=""
                              onChange={(e) => {
                                setValue('ddlControlsPreferenceId', parseInt(e.target.value, 10));
                              }}
                            >
                              {controlsPreferenceInfo.ddlControlsPreferenceDataTbl?.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.items}
                                </option>
                              ))}
                            </RHFSelect>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFTextField
                            size="small"
                            name="txbSummerSupplyAirCFM"
                            label="Supply Air (CFM)"
                            onBlur={txbSummerSupplyAirCFMChanged}
                            onChange={(e) => {
                              setValueWithCheck(e, 'txbSummerSupplyAirCFM');
                            }}
                          />
                          <RHFTextField
                            size="small"
                            name="txbSummerReturnAirCFM"
                            label="Exhaust Air (CFM)"
                            sx={getDisplay(!isUnitTypeAHU())}
                            onBlur={txbSummerReturnAirCFMChanged}
                            onChange={(e) => {
                              setValueWithCheck(e, 'txbSummerReturnAirCFM');
                            }}
                          />
                          <RHFTextField
                            size="small"
                            name="txbSupplyAirESP"
                            label="Supply Air ESP (inH2O)"
                            onBlur={txbSupplyAirESPChanged}
                            onChange={(e) => {
                              setValueWithCheck(e, 'txbSupplyAirESP');
                            }}
                          />
                          <RHFTextField
                            size="small"
                            name="txbExhaustAirESP"
                            label="Supply Air ESP(inH2O)"
                            sx={getDisplay(!isUnitTypeAHU())}
                            onBlur={txbExhaustAirESPChanged}
                            onChange={(e) => {
                              setValueWithCheck(e, 'txbExhaustAirESP');
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFControlCheckbox
                            size="small"
                            name="ckbBypassVal"
                            label="Bypass for Economizer"
                            sx={getDisplay(!!bypassInfo?.divUnitBypassVisible)}
                            checked={ckbBypassVal}
                            onChange={() => setCkbBypassVal(!ckbBypassVal)}
                          />
                          {isAvailable(unitModelInfo.ddlUnitModelDataTbl) && (
                            <RHFSelect
                              size="small"
                              name="ddlUnitModelId"
                              label="Unit Model"
                              onChange={ddlUnitModelChanged}
                            >
                              {unitModelInfo.ddlUnitModelDataTbl?.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.items}
                                </option>
                              ))}
                            </RHFSelect>
                          )}
                          {isAvailable(unitVoltageInfo.ddlUnitVoltageDataTbl) && (
                            <RHFSelect
                              size="small"
                              name="ddlUnitVoltageId"
                              label="Unit Voltage"
                              onChange={ddlUnitVoltageChanged}
                            >
                              {unitVoltageInfo.ddlUnitVoltageDataTbl?.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.items}
                                </option>
                              ))}
                            </RHFSelect>
                          )}
                          <RHFControlCheckbox
                            size="small"
                            name="ckbVoltageSPPVal"
                            label="Single Point Power Connection"
                            sx={getDisplay(unitVoltageInfo.divVoltageSPPVisible)}
                            checked={ckbVoltageSPPVal}
                            onChange={() => setCkbVoltageSPPVal(!ckbVoltageSPPVal)}
                          />
                          {isAvailable(outdoorAirFilterInfo.ddlOA_FilterModelDataTbl) && (
                            <RHFSelect
                              size="small"
                              name="ddlOA_FilterModelId"
                              label="QA Filter"
                              onChange={(e) => setValue('ddlOA_FilterModelId', parseInt(e.target.value, 10))}
                            >
                              {outdoorAirFilterInfo.ddlOA_FilterModelDataTbl?.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.items}
                                </option>
                              ))}
                            </RHFSelect>
                          )}
                          {isAvailable(returnAirFilterInfo.ddlRA_FilterModelDataTbl) && (
                            <RHFSelect
                              size="small"
                              name="ddlRA_FilterModelId"
                              label="RA Filter"
                              sx={getDisplay(returnAirFilterInfo.divRA_FilterModelVisible)}
                              onChange={(e) => setValue('ddlRA_FilterModelId', parseInt(e.target.value, 10))}
                            >
                              {returnAirFilterInfo.ddlRA_FilterModelDataTbl?.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.items}
                                </option>
                              ))}
                            </RHFSelect>
                          )}
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
                    <Typography color="primary.main" variant="h6">
                      PRE-HEAT
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        display: 'grid',
                        rowGap: 3,
                        columnGap: 3,
                        gridTemplateColumns: {
                          xs: 'repeat(3, 1fr)',
                        },
                      }}
                    >
                      <Stack spacing={1}>
                        {isAvailable(componentInfo.ddlPreheatCompDataTbl) && (
                          <RHFSelect
                            size="small"
                            name="ddlPreheatCompId"
                            label="Preheat"
                            sx={getDisplay(componentInfo.divPreheatCompVisible)}
                            onChange={ddlPreheatCompChanged}
                          >
                            {componentInfo.ddlPreheatCompDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        {isAvailable(preheatCoilHandingInfo.ddlPreheatCoilHandingDataTbl) && (
                          <RHFSelect
                            size="small"
                            name="ddlPreheatCoilHandingId"
                            label="Preheat Coil Handing"
                            sx={getDisplay(preheatCoilHandingInfo.divPreheatCoilHandingVisible)}
                          >
                            {preheatCoilHandingInfo.ddlPreheatCoilHandingDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                      </Stack>
                      <Stack
                        spacing={1}
                        sx={{
                          ...getDisplay(preheatElecHeaterInstallationInfo.divPreheatElecHeaterInstallationVisible),
                        }}
                      >
                        {isAvailable(preheatElecHeaterInstallationInfo.ddlPreheatElecHeaterInstallationDataTbl) && (
                          <RHFSelect
                            size="small"
                            name="ddlPreheatElecHeaterInstallationId"
                            label="Preheat Elec. Heater Installation"
                            onChange={(e) =>
                              setValue('ddlPreheatElecHeaterInstallationId', parseInt(e.target.value, 10))
                            }
                            placeholder=""
                          >
                            {preheatElecHeaterInstallationInfo.ddlPreheatElecHeaterInstallationDataTbl?.map(
                              (item, index) => (
                                <option key={index} value={item.id}>
                                  {item.items}
                                </option>
                              )
                            )}
                          </RHFSelect>
                        )}
                      </Stack>

                      <Stack
                        spacing={1}
                        sx={{ ...getDisplay(heatingFluidDesignCondInfo.ddlHeatingFluidTypeDataTbl) }}
                      >
                        {isAvailable(heatingFluidDesignCondInfo.ddlHeatingFluidTypeDataTbl) && (
                          <RHFSelect size="small" name="ddlHeatingFluidTypeId" label="Heating Fluid Type">
                            {heatingFluidDesignCondInfo.ddlHeatingFluidTypeDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        {isAvailable(heatingFluidDesignCondInfo.ddlHeatingFluidConcentrationDataTbl) && (
                          <RHFSelect size="small" name="ddlHeatingFluidConcentrationId" label="Heating Fluid %">
                            {heatingFluidDesignCondInfo.ddlHeatingFluidConcentrationDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        <RHFTextField
                          size="small"
                          name="txbHeatingFluidEntTemp"
                          label="Heating Fluid Ent Temp (F)"
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbHeatingFluidEntTemp');
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbHeatingFluidLvgTemp"
                          label="Heating Fluid Lvg Temp (F)"
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbHeatingFluidLvgTemp');
                          }}
                        />
                      </Stack>
                      <Stack
                        spacing={1}
                        sx={{
                          ...getDisplay(ualInfo.divCustomVisible && customInputsInfo.divPreheatHWC_Visible),
                          mb: 3,
                        }}
                      >
                        <RHFControlCheckbox
                          size="small"
                          name="ckbPreheatHWC_UseCap"
                          label="Preheat HWC Use Capacity"
                          sx={getDisplay(customInputsInfo.divPreheatHWC_UseCapVisible)}
                          checked={ckbFlowRateAndCap.ckbPreheatHWC_UseCap}
                          onChange={() => {
                            setCkbFlowRateAndCap({
                              ...ckbFlowRateAndCap,
                              ckbPreheatHWC_UseCap: !ckbFlowRateAndCap.ckbPreheatHWC_UseCap,
                            });
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbPreheatHWC_Cap"
                          label="Preheat HWC Capacity (MBH)"
                          sx={getDisplay(customInputsInfo.divPreheatHWC_UseCapVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbPreheatHWC_Cap');
                          }}
                        />
                        <RHFControlCheckbox
                          size="small"
                          name="ckbPreheatHWC_UseFlowRate"
                          label="Preheat HWC Use Flow Rate"
                          // sx={getDisplay(customInputsInfo.divPreheatHWC_UseFlowRateVisible)}
                          checked={!!ckbFlowRateAndCap.ckbPreheatHWC_UseFlowRate}
                          onChange={() => {
                            setCkbFlowRateAndCap({
                              ...ckbFlowRateAndCap,
                              ckbPreheatHWC_UseFlowRate: !ckbFlowRateAndCap.ckbPreheatHWC_UseFlowRate,
                            });
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbPreheatHWC_FlowRate"
                          label="Preheat HWC Flow Rate (GPM)"
                          // sx={getDisplay(customInputsInfo.divPreheatHWC_UseFlowRateVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbPreheatHWC_FlowRate');
                          }}
                        />
                        {/* <Alert variant="outlined" severity="info">
                          <AlertTitle>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</AlertTitle>
                          <Stack direction="row" justifyContent="left" alignItems="center" sx={{ cursor: 'pointer' }}>
                            <Typography color="primary.main" variant="h6">
                              Learn more
                            </Typography>
                            <Iconify
                              color="primary.main"
                              icon="ic:baseline-keyboard-arrow-right"
                              width="24px"
                              height="24px"
                            />
                          </Stack>
                        </Alert> */}
                      </Stack>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded.panel3}
                  onChange={() => setExpanded({ ...expanded, panel3: !expanded.panel3 })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="primary.main" variant="h6">
                      COOLING
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        display: 'grid',
                        rowGap: 3,
                        columnGap: 3,
                        gridTemplateColumns: {
                          xs: 'repeat(3, 1fr)',
                        },
                      }}
                    >
                      <Stack spacing={1}>
                        {isAvailable(componentInfo.ddlCoolingCompDataTbl) && (
                          <RHFSelect
                            size="small"
                            name="ddlCoolingCompId"
                            label="Cooling"
                            sx={getDisplay(componentInfo.divCoolingCompVisible)}
                            onChange={ddlCoolingCompChanged}
                          >
                            {componentInfo.ddlCoolingCompDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        <RHFTextField
                          size="small"
                          name="txbSummerCoolingSetpointDB"
                          label="Cooling LAT Setpoint DB (F):"
                          autoComplete="off"
                          sx={getDisplay(coolingSetpointInfo.divCoolingSetpointVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbSummerCoolingSetpointDB');
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbSummerCoolingSetpointWB"
                          label="Cooling LAT Setpoint WB (F):"
                          autoComplete="off"
                          sx={getDisplay(coolingSetpointInfo.divCoolingSetpointVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbSummerCoolingSetpointWB');
                          }}
                        />
                        <RHFControlCheckbox
                          size="small"
                          name="ckbHeatPumpVal"
                          label="Heat Pump"
                          sx={getDisplay(heatPumpInfo.divHeatPumpVisible)}
                          checked={ckbHeatPumpVal}
                          onChange={ckbHeatPumpChanged}
                        />
                        <RHFControlCheckbox
                          size="small"
                          name="ckbDehumidificationVal"
                          label="Dehumidification"
                          sx={getDisplay(dehumidificationInfo.divDehumidificationVisible)}
                          checked={ckbDehumidificationVal}
                          onChange={ckbDehumidificationChanged}
                        />
                        {isAvailable(coolingCoilHandingInfo.ddlCoolingCoilHandingDataTbl) && (
                          <RHFSelect
                            size="small"
                            name="ddlCoolingCoilHandingId"
                            label="Cooling Coil Handing"
                            sx={getDisplay(coolingCoilHandingInfo.divCoolingCoilHandingVisible)}
                            onChange={(e) => setValue('ddlCoolingCoilHandingId', parseInt(e.target.value, 10))}
                          >
                            {coolingCoilHandingInfo.ddlCoolingCoilHandingDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                      </Stack>
                      <Stack
                        spacing={1}
                        sx={{ ...getDisplay(dxCoilRefrigDesignCondInfo.divDXCoilRefrigDesignCondVisible), mb: 3 }}
                      >
                        <RHFTextField
                          size="small"
                          name="txbRefrigSuctionTemp"
                          label="Suction Temp (F)"
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbRefrigSuctionTemp');
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbRefrigLiquidTemp"
                          label="Liquid Temp (F)"
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbRefrigLiquidTemp');
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbRefrigSuperheatTemp"
                          label="Superheat Temp (F)"
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbRefrigSuperheatTemp');
                          }}
                        />
                      </Stack>
                      <Stack
                        spacing={1}
                        sx={{ ...getDisplay(coolingFluidDesignCondInfo.divCoolingFluidDesignCondVisible) }}
                      >
                        {isAvailable(coolingFluidDesignCondInfo.ddlCoolingFluidTypeDataTbl) && (
                          <RHFSelect size="small" name="ddlCoolingFluidTypeId" label="Cooling Fluid Type">
                            {coolingFluidDesignCondInfo.ddlCoolingFluidTypeDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        {isAvailable(coolingFluidDesignCondInfo.ddlCoolingFluidConcentrationDataTbl) && (
                          <RHFSelect size="small" name="ddlCoolingFluidConcentrationId" label="Cooling Fluid %">
                            {coolingFluidDesignCondInfo.ddlCoolingFluidConcentrationDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        <RHFTextField
                          size="small"
                          name="txbCoolingFluidEntTemp"
                          label="Cooling Fluid Ent Temp (F)"
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbCoolingFluidEntTemp');
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbCoolingFluidLvgTemp"
                          label="Cooling Fluid Lvg Temp (F)"
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbCoolingFluidLvgTemp');
                          }}
                        />
                      </Stack>

                      <Stack
                        spacing={1}
                        sx={{ ...getDisplay(ualInfo.divCustomVisible && customInputsInfo.divCoolingCWC_Visible) }}
                      >
                        <RHFControlCheckbox
                          size="small"
                          name="ckbCoolingCWC_UseCap"
                          label="Cooling CWC Use Capacity"
                          sx={{ ...getDisplay(customInputsInfo.divCoolingCWC_UseCapVisible), margin: 0 }}
                          checked={!!ckbFlowRateAndCap.ckbCoolingCWC_UseCap}
                          onChange={() => {
                            setCkbFlowRateAndCap({
                              ...ckbFlowRateAndCap,
                              ckbCoolingCWC_UseCap: !ckbFlowRateAndCap.ckbCoolingCWC_UseCap,
                            });
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbCoolingCWC_Cap"
                          label="Cooling CWC Capacity (MBH)"
                          sx={getDisplay(customInputsInfo.divCoolingCWC_UseCapVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbCoolingCWC_Cap');
                          }}
                        />
                        <RHFControlCheckbox
                          size="small"
                          name="ckbCoolingCWC_UseFlowRate"
                          label="Cooling CWC Use Flow Rate"
                          sx={getDisplay(customInputsInfo.divCoolingCWC_UseFlowRateVisible)}
                          checked={!!ckbFlowRateAndCap.ckbCoolingCWC_UseFlowRate}
                          onChange={() => {
                            setCkbFlowRateAndCap({
                              ...ckbFlowRateAndCap,
                              ckbCoolingCWC_UseFlowRate: !ckbFlowRateAndCap.ckbCoolingCWC_UseFlowRate,
                            });
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbCoolingCWC_FlowRate"
                          label="Cooling CWC Flow Rate (GPM)"
                          sx={getDisplay(customInputsInfo.divCoolingCWC_UseFlowRateVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbCoolingCWC_FlowRate');
                          }}
                        />
                      </Stack>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded.panel4}
                  onChange={() => setExpanded({ ...expanded, panel4: !expanded.panel4 })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="primary.main" variant="h6">
                      HEATING
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        display: 'grid',
                        rowGap: 3,
                        columnGap: 3,
                        gridTemplateColumns: {
                          xs: 'repeat(3, 1fr)',
                        },
                      }}
                    >
                      <Stack spacing={1}>
                        {isAvailable(componentInfo.ddlHeatingCompDataTbl) && (
                          <RHFSelect
                            size="small"
                            name="ddlHeatingCompId"
                            label="Heating"
                            sx={getDisplay(componentInfo.divHeatingCompVisible)}
                            onChange={ddlHeatingCompChanged}
                          >
                            {componentInfo.ddlHeatingCompDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        <RHFTextField
                          size="small"
                          name="txbWinterHeatingSetpointDB"
                          label="Heating LAT Setpoint DB (F):"
                          autoComplete="off"
                          sx={getDisplay(heatingSetpointInfo.divHeatingSetpointVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbWinterHeatingSetpointDB');
                          }}
                        />
                        {isAvailable(heatingCoilHandingInfo.ddlHeatingCoilHandingDataTbl) && (
                          <RHFSelect
                            size="small"
                            name="ddlHeatingCoilHandingId"
                            label="Heating Coil Handing"
                            sx={getDisplay(heatingCoilHandingInfo.divHeatingCoilHandingVisible)}
                            onChange={(e) => setValue('ddlHeatingCoilHandingId', parseInt(e.target.value, 10))}
                          >
                            {heatingCoilHandingInfo.ddlHeatingCoilHandingDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                      </Stack>
                      <Stack
                        spacing={1}
                        sx={{ ...getDisplay(heatElecHeaterInstallationInfo.divHeatElecHeaterInstallationVisible) }}
                      >
                        {isAvailable(heatElecHeaterInstallationInfo.ddlHeatElecHeaterInstallationDataTbl) && (
                          <RHFSelect
                            size="small"
                            name="ddlHeatElecHeaterInstallationId"
                            label="Heating Elec. Heater Installation"
                            onChange={(e) => setValue('ddlHeatElecHeaterInstallationId', parseInt(e.target.value, 10))}
                            placeholder=""
                          >
                            {heatElecHeaterInstallationInfo.ddlHeatElecHeaterInstallationDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                      </Stack>

                      <Stack
                        spacing={1}
                        sx={{ ...getDisplay(heatingFluidDesignCondInfo.divHeatingFluidDesignCondVisible) }}
                      >
                        {isAvailable(heatingFluidDesignCondInfo.ddlHeatingFluidTypeDataTbl) && (
                          <RHFSelect size="small" name="ddlHeatingFluidTypeId" label="Heating Fluid Type">
                            {heatingFluidDesignCondInfo.ddlHeatingFluidTypeDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}``
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        {isAvailable(heatingFluidDesignCondInfo.ddlHeatingFluidConcentrationDataTbl) && (
                          <RHFSelect size="small" name="ddlHeatingFluidConcentrationId" label="Heating Fluid %">
                            {heatingFluidDesignCondInfo.ddlHeatingFluidConcentrationDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        <RHFTextField
                          size="small"
                          name="txbHeatingFluidEntTemp"
                          label="Heating Fluid Ent Temp (F)"
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbHeatingFluidEntTemp');
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbHeatingFluidLvgTemp"
                          label="Heating Fluid Lvg Temp (F)"
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbHeatingFluidLvgTemp');
                          }}
                        />
                      </Stack>

                      <Stack
                        spacing={1}
                        sx={{ ...getDisplay(ualInfo.divCustomVisible && customInputsInfo.divHeatingHWC_Visible) }}
                      >
                        <RHFControlCheckbox
                          size="small"
                          name="ckbHeatingHWC_UseCap"
                          label="Heating HWC Use Capacity"
                          sx={getDisplay(customInputsInfo.divHeatingHWC_UseCapVisible)}
                          checked={ckbFlowRateAndCap.ckbHeatingHWC_UseCap}
                          onChange={() => {
                            setCkbFlowRateAndCap({
                              ...ckbFlowRateAndCap,
                              ckbHeatingHWC_UseCap: !ckbFlowRateAndCap.ckbHeatingHWC_UseCap,
                            });
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbHeatingHWC_Cap"
                          label="Heating HWC Capacity (MBH)"
                          sx={getDisplay(customInputsInfo.divHeatingHWC_UseCapVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbHeatingHWC_Cap');
                          }}
                        />
                        <RHFControlCheckbox
                          size="small"
                          name="ckbHeatingHWC_UseFlowRate"
                          label="Heating HWC Use Flow Rate"
                          sx={getDisplay(customInputsInfo.divHeatingHWC_UseFlowRateVisible)}
                          checked={ckbFlowRateAndCap.ckbHeatingHWC_UseFlowRate}
                          onChange={() => {
                            setCkbFlowRateAndCap({
                              ...ckbFlowRateAndCap,
                              ckbHeatingHWC_UseFlowRate: !ckbFlowRateAndCap.ckbHeatingHWC_UseFlowRate,
                            });
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbHeatingHWC_FlowRate"
                          label="Heating HWC Flow Rate (GPM)"
                          sx={getDisplay(customInputsInfo.divHeatingHWC_UseFlowRateVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbHeatingHWC_FlowRate');
                          }}
                        />
                      </Stack>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={getDisplay(reheatInfo.divReheatCompVisible || ckbDehumidificationVal)}
                  expanded={expanded.panel4}
                  onChange={() => setExpanded({ ...expanded, panel4: !expanded.panel4 })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="primary.main" variant="h6">
                      REHEAT
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        display: 'grid',
                        rowGap: 3,
                        columnGap: 3,
                        gridTemplateColumns: {
                          xs: 'repeat(3, 1fr)',
                        },
                      }}
                    >
                      <Stack spacing={1}>
                        {isAvailable(reheatInfo.ddlReheatCompDataTbl) && (
                          <RHFSelect
                            size="small"
                            name="ddlReheatCompId"
                            label="Reheat"
                            placeholder=""
                            sx={getDisplay(reheatInfo.divReheatCompVisible || ckbDehumidificationVal)}
                            onChange={ddlReheatCompChanged}
                          >
                            {reheatInfo?.ddlReheatCompDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        <RHFTextField
                          size="small"
                          name="txbSummerReheatSetpointDB"
                          label="Dehum. Reheat Setpoint DB (F):"
                          autoComplete="off"
                          sx={getDisplay(reheatSetpointInfo.divReheatSetpointVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbSummerReheatSetpointDB');
                          }}
                        />
                        <RHFControlCheckbox
                          size="small"
                          name="ckbDehumidificationVal"
                          label="Dehumidification"
                          sx={getDisplay(dehumidificationInfo.divDehumidificationVisible)}
                          checked={!!ckbDehumidificationVal}
                          onChange={ckbDehumidificationChanged}
                        />
                      </Stack>
                      <Stack
                        spacing={1}
                        sx={{ ...getDisplay(condCoilRefrigDesignCondInfo.divCondCoilRefrigDesignCondVisible) }}
                      >
                        <RHFTextField
                          size="small"
                          name="txbRefrigCondensingTemp"
                          label="Condensing Temp (F)"
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbRefrigCondensingTemp');
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbRefrigVaporTemp"
                          label="Condensing Temp (F)"
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbRefrigVaporTemp');
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbRefrigSubcoolingTemp"
                          label="Subcooling Temp (F)"
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbRefrigSubcoolingTemp');
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbPercentCondensingLoad"
                          label="% Condensing Load"
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbPercentCondensingLoad');
                          }}
                        />
                      </Stack>
                      <Stack
                        spacing={1}
                        sx={{ ...getDisplay(ualInfo.divCustomVisible && customInputsInfo.divReheatHWC_Visible) }}
                      >
                        <RHFControlCheckbox
                          size="small"
                          name="ckbReheatHWC_UseCap"
                          label="Reheat HWC Use Capacity"
                          sx={getDisplay(customInputsInfo.divReheatHWC_UseCapVisible)}
                          checked={ckbFlowRateAndCap.ckbReheatHWC_UseCap}
                          onChange={() => {
                            setCkbFlowRateAndCap({
                              ...ckbFlowRateAndCap,
                              ckbReheatHWC_UseCap: !ckbFlowRateAndCap.ckbReheatHWC_UseCap,
                            });
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbReheatHWC_Cap"
                          label="Reheat HWC Capacity (MBH)"
                          sx={getDisplay(customInputsInfo.divReheatHWC_UseCapVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbReheatHWC_Cap');
                          }}
                        />
                        <RHFControlCheckbox
                          size="small"
                          name="ckbReheatHWC_UseFlowRate"
                          label="Reheat HWC Use Flow Rate"
                          sx={getDisplay(customInputsInfo.divReheatHWC_UseFlowRateVisible)}
                          checked={ckbFlowRateAndCap.ckbReheatHWC_UseFlowRate}
                          onChange={() => {
                            setCkbFlowRateAndCap({
                              ...ckbFlowRateAndCap,
                              ckbReheatHWC_UseFlowRate: !ckbFlowRateAndCap.ckbReheatHWC_UseFlowRate,
                            });
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbReheatHWC_FlowRate"
                          label="Reheat HWC Flow Rate (GPM)"
                          sx={getDisplay(customInputsInfo.divReheatHWC_UseFlowRateVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbReheatHWC_FlowRate');
                          }}
                        />
                      </Stack>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded.panel5}
                  onChange={() => setExpanded({ ...expanded, panel5: !expanded.panel5 })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="primary.main" variant="h6">
                      ACCESSORIES
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        display: 'grid',
                        rowGap: 3,
                        columnGap: 3,
                        gridTemplateColumns: {
                          xs: 'repeat(3, 1fr)',
                        },
                      }}
                    >
                      <Stack spacing={1}>
                        {isAvailable(damperAndActuatorInfo.ddlDamperAndActuatorDataTbl) && (
                          <RHFSelect
                            size="small"
                            name="ddlDamperAndActuatorId"
                            label="Dampers & Actuator"
                            sx={getDisplay(damperAndActuatorInfo.divDamperAndActuatorVisible)}
                            onChange={(e) => {
                              setValue('ddlDamperAndActuatorId', parseInt(e.target.value, 10));
                            }}
                            placeholder=""
                          >
                            {damperAndActuatorInfo.ddlDamperAndActuatorDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        {isAvailable(elecHeaterVoltageInfo.ddlElecHeaterVoltageDataTbl) && (
                          <RHFSelect
                            size="small"
                            name="ddlElecHeaterVoltageId"
                            label="Elec. Heater Voltage"
                            placeholder=""
                            sx={getDisplay(elecHeaterVoltageInfo.divElecHeaterVoltageVisible)}
                            onChange={ddlElecHeaterVoltageChanged}
                          >
                            {elecHeaterVoltageInfo.ddlElecHeaterVoltageDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        <RHFCheckbox
                          size="small"
                          name="ckbValveAndActuatorVal"
                          label="Include Valves & Actuator"
                          sx={getDisplay(valveAndActuatorInfo.divValveAndActuatorVisible)}
                          checked={ckbValveAndActuatorVal}
                          onChange={() => setCkbValveAndActuatorVal(!ckbValveAndActuatorVal)}
                        />
                        <RHFControlCheckbox
                          size="small"
                          name="ckbDrainPanVal"
                          label="Drain Pan Required"
                          sx={getDisplay(drainPanInfo.divDrainPanVisible)}
                          checked={ckbDrainPanVal}
                          onChange={() => setCkbDrainPanVal(!ckbDrainPanVal)}
                        />
                      </Stack>
                      <Stack spacing={1}>
                        {isAvailable(valveTypeInfo.ddlValveTypeDataTbl) && (
                          <RHFSelect
                            size="small"
                            name="ddlValveTypeId"
                            sx={getDisplay(valveTypeInfo.divValveTypeVisible)}
                            label="Valve Type"
                          >
                            {valveTypeInfo.ddlValveTypeDataTbl?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                      </Stack>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded.panel6}
                  onChange={() => setExpanded({ ...expanded, panel6: !expanded.panel6 })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="primary.main" variant="h6">
                      LAYOUT
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={5}>
                      <Grid item xs={4} md={4}>
                        <Stack spacing={3}>
                          {isAvailable(handingInfo.ddlHandingDataTbl) && (
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
                          )}
                          {isAvailable(supplyAirOpeningInfo.ddlSupplyAirOpeningDataTbl) && (
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
                          )}
                          {isAvailable(remainingOpeningsInfo.ddlExhaustAirOpeningDataTbl) && (
                            <RHFSelect
                              size="small"
                              name="ddlExhaustAirOpeningId"
                              label="Exhaust Air Opening"
                              sx={getDisplay(remainingOpeningsInfo.ddlExhaustAirOpeningVisible)}
                              placeholder=""
                              onChange={ddlExhaustAirOpeningChanged}
                            >
                              {remainingOpeningsInfo.ddlExhaustAirOpeningDataTbl.map((data, index) => (
                                <option key={index} value={data.id}>
                                  {data.items}
                                </option>
                              ))}
                            </RHFSelect>
                          )}
                          {isAvailable(remainingOpeningsInfo.ddlOutdoorAirOpeningDataTbl) && (
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
                          )}
                          {isAvailable(remainingOpeningsInfo.ddlReturnAirOpeningDataTbl) && (
                            <RHFSelect
                              size="small"
                              name="ddlReturnAirOpeningId"
                              label="Return Air Opening"
                              sx={getDisplay(remainingOpeningsInfo.ddlReturnAirOpeningVisible)}
                              placeholder=""
                              onChange={ddlReturnAirOpeningChanged}
                            >
                              {remainingOpeningsInfo.ddlReturnAirOpeningDataTbl.map((data, index) => (
                                <option key={index} value={data.id}>
                                  {data.items}
                                </option>
                              ))}
                            </RHFSelect>
                          )}
                        </Stack>{' '}
                      </Grid>
                      <Grid item xs={8} md={8}>
                        <RHFUploadSingleFile
                          name="layoutImage"
                          accept="image/*"
                          maxSize={3145728}
                          onDrop={handleDrop}
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded.panel7}
                  onChange={() => setExpanded({ ...expanded, panel7: !expanded.panel7 })}
                >
                  <AccordionSummary
                    expandIcon={<Iconify icon="il:arrow-down" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography color="primary.main" variant="h6">
                      CONFIGURATION NOTES
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container>
                      <TextField label="Take a note..." variant="standard" fullWidth />
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Stack direction="row" justifyContent="flex-end">
                  <Box sx={{ width: '150px' }}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      onClick={() => console.log(getValues())}
                      loading={isSubmitting}
                      disabled={isAddedNewUnit}
                    >
                      Add New Unit
                    </LoadingButton>
                  </Box>
                </Stack>
              </Stack>
            )}
          </FormProvider>
          <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
            <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
              Unit was successfully added!
            </Alert>
          </Snackbar>
          <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
            <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
              Server Error!
            </Alert>
          </Snackbar>
        </Container>
      </RootStyle>
    </Page>
  );
}
