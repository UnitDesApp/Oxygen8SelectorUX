import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
import PropTypes from 'prop-types';

// @mui
import { styled } from '@mui/material/styles';
import {
  Container,
  Box,
  Grid,
  CardHeader,
  CardContent,
  Card,
  Stack,
  Divider,
  Snackbar,
  Alert,
  // Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useUnitEditFormSchema } from '../../hooks/useUnitEditForm';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import * as unitReducer from '../../redux/slices/unitReducer';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { FormProvider, RHFTextField, RHFSelect, RHFCheckbox, RHFControlCheckbox } from '../../components/hook-form';
import { PATH_UNIT } from '../../routes/paths';
// config
import * as IDs from './config';
//------------------------------------------------

const CardHeaderStyle = styled(CardHeader)(({ theme }) => ({
  padding: '15px 30px',
  color: theme.palette.primary.main,
}));

const dblTempErrorValue = 0.0;
// -----------------------------------------------

UnitEdit.propTypes = {
  intUnitTypeID: PropTypes.string,
  intProductTypeID: PropTypes.number,
  refSubmit: PropTypes.any,
  onChangeTab: PropTypes.func,
};

export default function UnitEdit({ intUnitTypeID, intProductTypeID, refSubmit, onChangeTab }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobId, unitId } = useParams();
  const { state } = useLocation();
  console.log(jobId, unitId);

  const isEdit = unitId !== undefined;
  const { controlInfo, unitInfo, layoutInfo } = useSelector((state) => state.unit);

  const {
    ualInfo,
    locationInfo,
    orientationInfo,
    unitTypeInfo,
    bypassInfo,
    unitModelInfo,
    unitVoltageInfo,
    unitVoltageSPPInfo,
    preheatRequiredInfo,
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
    setpointsInfo,
    // preheatSetpointInfo,
    heatingSetpointInfo,
    coolingSetpointInfo,
    // customInputsInfo,
    reheatSetpointInfo,
    supplyAirOpeningInfo,
    remainingOpeningsInfo,
    // returnAirESPInfo,
    returnAirFilterInfo,
    // summerReturnAirCFMInfo,
    // summerSupplyAirCFMInfo,
    // supplyAirESPInfo,
  } = controlInfo;

  console.log(controlInfo, unitInfo);

  /* Start State Variables *
  ----------------------------------------------------------------------- */
  const [ckbBypassVal, setCkbBypassVal] = useState(
    isEdit? !!unitInfo.ckbBypass : !!bypassInfo?.ckbBypassVal
  );
  const [ckbDrainPanVal, setCkbDrainPanVal] = useState(
    isEdit? !!unitInfo.ckbDrainPan : !!drainPanInfo?.ckbDrainPanVal
  );
  const [ckbVoltageSPPVal, setCkbVoltageSPPVal] = useState(
    isEdit ? !!unitInfo.ckbVoltageSPP : !!unitVoltageSPPInfo.ckbVoltageSPPVal
  );
  const [ckbDehumidificationVal, setCkbDehumidificationVal] = useState(
    isEdit ? !!unitInfo.ckbDehumidification : !!dehumidificationInfo.ckbDehumidificationVal
  );
  const [ckbValveAndActuator, setCkbValveAndActuatorVal] = useState(
    isEdit ? !!unitInfo.ckbValveAndActuator : !!valveAndActuatorInfo.ckbValveAndActuatorVal
  );
  const [ckbHeatPumpVal, setCkbHeatPumpVal] = useState(
    isEdit ? !!unitInfo.ckbHeatPump : !!heatPumpInfo.ckbHeatPumpVal
  );
  const [ckbDownshotVal, setCkbDownshotVal] = useState(
    isEdit ? !!unitInfo.ckbDownshot : !!downshotInfo.isDownshotVal
  );
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
  /* -----------------------------------------------------------------------
   * End State Variables */

  /* Start Initialize Form *
  ----------------------------------------------------------------------- */
  const defaultValues = {
    txtTag: isEdit ? unitInfo.txbTagText : '',
    txbQty: isEdit ? unitInfo.txbQtyText : '1',
    ddlLocationId: isEdit ? unitInfo.locationID : locationInfo.ddlLocationId,
    ddlOrientationId: isEdit ? unitInfo.orientationID : orientationInfo.ddlOrientationId,
    ddlUnitTypeId: isEdit ? unitInfo.unitTypeID : unitTypeInfo.ddlUnitTypeId,
    ddlControlsPreferenceId: isEdit ? unitInfo.ddlControlsPreferenceId : controlsPreferenceInfo.ddlControlsPreferenceId,
    txbSummerSupplyAirCFM: isEdit ? unitInfo.txbSummerSupplyAirCFMText : 325,
    txbSummerReturnAirCFM: isEdit ? unitInfo.txbSummerReturnAirCFMText : 325,
    txbSupplyAirESP: isEdit ? unitInfo.txbSupplyAirESPText : 0.75,
    txbExhaustAirESP: isEdit ? unitInfo.txbExhaustAirESPText : 0.75,
    ddlUnitModelId: isEdit ? unitInfo.unitModelID : unitModelInfo.ddlUnitModelId,
    ddlUnitVoltageId: isEdit ? unitInfo.unitVoltageID : unitVoltageInfo.ddlUnitVoltageId,
    txbAltitude: unitInfo.txbAltitudeText,
    txbSummerOutdoorAirDB: unitInfo.txbSummerOutdoorAirDBText,
    txbSummerOutdoorAirWB: unitInfo.txbSummerOutdoorAirRHText,
    txbSummerOutdoorAirRH: unitInfo.txbSummerOutdoorAirWBText,
    txbWinterOutdoorAirDB: unitInfo.txbSummerReturnAirDBText,
    txbWinterOutdoorAirWB: unitInfo.txbSummerReturnAirRHText,
    txbWinterOutdoorAirRH: unitInfo.txbSummerReturnAirWBText,
    txbSummerReturnAirDB: unitInfo.txbWinterOutdoorAirDBText,
    txbSummerReturnAirWB: unitInfo.txbWinterOutdoorAirRHText,
    txbSummerReturnAirRH: unitInfo.txbWinterOutdoorAirWBText,
    txbWinterReturnAirDB: unitInfo.txbWinterReturnAirDBText,
    txbWinterReturnAirWB: unitInfo.txbWinterReturnAirRHText,
    txbWinterReturnAirRH: unitInfo.txbWinterReturnAirWBText,
    txbWinterPreheatSetpointDB: isEdit ? unitInfo.txbWinterPreheatSetpointDBText : 0,
    txbSummerCoolingSetpointDB: isEdit ? unitInfo.txbSummerCoolingSetpointDBText : 55,
    txbSummerCoolingSetpointWB: isEdit ? unitInfo.txbSummerCoolingSetpointWBText : 55,
    txbWinterHeatingSetpointDB: isEdit ? unitInfo.txbWinterHeatingSetpointDBText : 72,
    txbSummerReheatSetpointDB: isEdit ? unitInfo.txbSummerReheatSetpointDBText : 70,
    ddlOA_FilterModelId: isEdit ? unitInfo.OA_FilterModelID : outdoorAirFilterInfo.ddlOA_FilterModelId,
    ddlRA_FilterModelId: isEdit ? unitInfo.RA_FilterModelID : returnAirFilterInfo.ddlRA_FilterModelId,
    ddlPreheatCompId: isEdit ? unitInfo.PreheatCompID : componentInfo.ddlPreheatCompId,
    ddlHeatExchCompId: isEdit ? unitInfo.HeatExchCompID : componentInfo.ddlHeatExchCompId,
    ddlCoolingCompId: isEdit ? unitInfo.CoolingCompID : componentInfo.ddlCoolingCompId,
    ddlHeatingCompId: isEdit ? unitInfo.HeatingCompID : componentInfo.ddlHeatingCompId,
    txbOA_FilterPDId: isEdit ? unitInfo.txbOA_FilterPDText : 0.5,
    txbRA_FilterPDId: isEdit ? unitInfo.txbRA_FilterPDText : 0.5,
    ddlReheatCompId: isEdit ? unitInfo.ReheatCompID : reheatInfo.ddlReheatCompId,
    ddlDamperAndActuatorId: isEdit ? unitInfo.DamperActuatorID : damperAndActuatorInfo.ddlDamperAndActuatorId,
    ddlElecHeaterVoltageId: isEdit ? unitInfo.ElecHeaterVoltageID : elecHeaterVoltageInfo.ddlElecHeaterVoltageId,
    ddlPreheatElecHeaterInstallationId: isEdit
      ? unitInfo.PreheatElecHeaterInstallationID
      : preheatElecHeaterInstallationInfo.ddlPreheatElecHeaterInstallationId,
    ddlHeatElecHeaterInstallationId: isEdit
      ? unitInfo.HeatElecHeaterInstallationID
      : heatElecHeaterInstallationInfo.ddlHeatElecHeaterInstallationId,
    ddlPreheatCoilHandingId: isEdit ? unitInfo.PreheatCoilHandingID : preheatCoilHandingInfo.ddlPreheatCoilHandingId,
    ddlCoolingCoilHandingId: isEdit ? unitInfo.CoolingCoilHandingID : coolingCoilHandingInfo.ddlCoolingCoilHandingId,
    ddlHeatingCoilHandingId: isEdit ? unitInfo.HeatingCoilHandingID : heatingCoilHandingInfo.ddlHeatingCoilHandingId,
    ddlValveTypeId: isEdit ? unitInfo.ValveTypeID : valveTypeInfo.ddlValveTypeId,
    txbPreheatHWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbPreheatHWC_CapText : 0,
    txbPreheatHWC_FlowRate: isEdit && unitInfo.isCustoms ? unitInfo.txbPreheatHWC_FlowRateText : 0,
    txbCoolingCWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbCoolingCWC_CapText : 0,
    txbCoolingCWC_FlowRate: isEdit && unitInfo.isCustoms ? unitInfo.txbCoolingCWC_FlowRateText : 0,
    txbHeatingHWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbHeatingHWC_CapText : 0,
    txbHeatingHWC_FlowRate: isEdit && unitInfo.isCustoms ? unitInfo.txbHeatingHWC_FlowRateText : 0,
    txbReheatHWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbReheatHWC_CapText : 0,
    txbReheatHWC_FlowRate: isEdit && unitInfo.isCustoms ? unitInfo.txbReheatHWC_FlowRateText : 0,
    ddlCoolingFluidTypeId: isEdit ? unitInfo.CoolingFluidTypeID : coolingFluidDesignCondInfo.ddlCoolingFluidTypeId,
    ddlCoolingFluidConcentrationId: isEdit
      ? unitInfo.CoolingFluidConcentrationID
      : coolingFluidDesignCondInfo.ddlCoolingFluidConcentrationId,
    txbCoolingFluidEntTemp: isEdit ? unitInfo.txbCoolingFluidEntTempText : 45,
    txbCoolingFluidLvgTemp: isEdit ? unitInfo.txbCoolingFluidLvgTempText : 55,
    txbRefrigSuctionTemp: isEdit ? unitInfo.txbRefrigSuctionTempText : 43,
    txbRefrigLiquidTemp: isEdit ? unitInfo.txbRefrigLiquidTempText : 77,
    txbRefrigSuperheatTemp: isEdit ? unitInfo.txbRefrigSuperheatTempText : 9,
    ddlHeatingFluidTypeId: isEdit ? unitInfo.HeatingFluidTypeID : heatingFluidDesignCondInfo.ddlHeatingFluidTypeId,
    ddlHeatingFluidConcentrationId: isEdit
      ? unitInfo.HeatingFluidConcentrationID
      : heatingFluidDesignCondInfo.ddlHeatingFluidConcentrationId,
    txbHeatingFluidEntTemp: isEdit ? unitInfo.txbHeatingFluidEntTempText : 140,
    txbHeatingFluidLvgTemp: isEdit ? unitInfo.txbHeatingFluidLvgTempText : 120,
    txbRefrigCondensingTemp: isEdit ? unitInfo.txbRefrigCondensingTempText : 115,
    txbRefrigVaporTemp: isEdit ? unitInfo.txbRefrigVaporTempText : 140,
    txbRefrigSubcoolingTemp: isEdit ? unitInfo.txbRefrigSubcoolingTempText : 5.4,
    txbPercentCondensingLoad: 0,
    txbUnitHeightText: isEdit ? unitInfo.txbUnitHeightText : 0,
    txbUnitLengthText: isEdit ? unitInfo.txbUnitLengthText : 0,
    txbUnitWeightText: isEdit ? unitInfo.txbUnitWeightText : 0,
    txbUnitWidthText: isEdit ? unitInfo.txbUnitWidthText : 0,
    ddlHandingId: isEdit ? unitInfo.ddlHandingId : handingInfo.ddlHandingId,
    ddlSupplyAirOpeningId: isEdit ? unitInfo.ddlSupplyAirOpeningId : supplyAirOpeningInfo.ddlSupplyAirOpeningId,
    ddlSupplyAirOpeningText: isEdit ? unitInfo.ddlSupplyAirOpeningText : supplyAirOpeningInfo.ddlSupplyAirOpeningText,
    ddlExhaustAirOpeningId: isEdit ? unitInfo.ddlExhaustAirOpeningId : remainingOpeningsInfo.ddlExhaustAirOpeningId,
    ddlExhaustAirOpeningText: isEdit
      ? unitInfo.ddlExhaustAirOpeningText
      : remainingOpeningsInfo.ddlExhaustAirOpeningText,
    ddlOutdoorAirOpeningId: isEdit ? unitInfo.ddlOutdoorAirOpeningId : remainingOpeningsInfo.ddlOutdoorAirOpeningId,
    ddlOutdoorAirOpeningText: isEdit
      ? unitInfo.ddlOutdoorAirOpeningText
      : remainingOpeningsInfo.ddlOutdoorAirOpeningText,
    ddlReturnAirOpeningId: isEdit ? unitInfo.ddlReturnAirOpeningId : remainingOpeningsInfo.ddlReturnAirOpeningId,
    ddlReturnAirOpeningText: isEdit ? unitInfo.ddlReturnAirOpeningText : remainingOpeningsInfo.ddlReturnAirOpeningText,
  };

  console.log(defaultValues);

  const methods = useForm({
    resolver: yupResolver(useUnitEditFormSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting },
  } = methods;

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

  const getDisplay = (key) => ({ display: key ? 'block' : 'none' });
  const getAllFormData = () => ({
    ...getValues(),
    intJobID: jobId,
    intUnitNo: unitId,
    intProductTypeID,
    intUnitTypeID,
    intUAL: localStorage.getItem('UAL'),
    intUserID: localStorage.getItem('userId'),
    ckbBypassVal,
    ckbDrainPanVal,
    ckbVoltageSPPVal,
    ckbDehumidificationVal,
    ckbValveAndActuator,
    ckbHeatPumpVal,
    ckbDownshotVal,
    ...ckbFlowRateAndCap,
  });

  /* -----------------------------------------------------------------------
   * End Initialize Form */

  /* Start Submit function *
  ----------------------------------------------------------------------- */

  const onSubmit = async () => {
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

    console.log('---------------------Start Submit Data----------------------');
    console.log(data);
    console.log('--------------------- End Submit Data ----------------------');

    const result = await dispatch(unitReducer.saveUnitInfo(getAllFormData()));
    setOpenSuccessNotification(true);
    onChangeTab();
    navigate(PATH_UNIT.edit(jobId, result), { state });
  };

  // useImperativeHandle(refSubmit, () => ({
  //   doSomething: onSubmit
  // }));

  /* -------------------------------------------------------------------------
   * End Submit Function */

  /* Start Event Functions *
  -------------------------------------------------------------------------- */

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
    setValue('ddlElecHeaterVoltageId', result.elecHeaterVoltage.ddlElecHeaterVoltageId);
    setValue('txbSupplyAirESP', result.txbSupplyAirESP);
  };

  const ddlUnitVoltageChanged = async (e) => {
    setValue('ddlUnitVoltageId', parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlUnitVoltageChanged(getAllFormData()));
    setValue('ddlElecHeaterVoltageId', result.ddlElecHeaterVoltageId);
  };

  const txbSummerOutdoorAirDBChanged = async (e) => {
    setValue('txbSummerOutdoorAirDB', parseFloat(e.target.value, 10));
    if (e.target.value === 0) {
      setValue('txbSummerOutdoorAirWB', 0);
      setValue('txbSummerOutdoorAirRH', 100);
    } else {
      setValue('txbSummerOutdoorAirWB', dblTempErrorValue);
      setValue('txbSummerOutdoorAirRH', dblTempErrorValue);
    }
  };

  const txbSummerOutdoorAirWBChanged = async (e) => {
    setValue('txbSummerOutdoorAirWB', parseFloat(e.target.value, 10));
    const result = await dispatch(unitReducer.txbSummerOutdoorAirWBChanged(getAllFormData()));
    setValue('txbSummerOutdoorAirRH', result);
  };

  const txbSummerOutdoorAirRHChanged = async (e) => {
    setValue('txbSummerOutdoorAirRH', parseFloat(e.target.value, 10));
    const result = await dispatch(unitReducer.txbSummerOutdoorAirRHChanged(getAllFormData()));
    setValue('txbSummerOutdoorAirWB', result);
  };

  const txbWinterOutdoorAirDBChanged = async (e) => {
    setValue('txbWinterOutdoorAirDB', parseFloat(e.target.value, 10));
    if (e.target.value === 0) {
      setValue('txbWinterOutdoorAirWB', 0);
      setValue('txbWinterOutdoorAirRH', 100);
    } else {
      setValue('txbWinterOutdoorAirWB', dblTempErrorValue);
      setValue('txbWinterOutdoorAirRH', dblTempErrorValue);
    }
  };

  const txbWinterOutdoorAirWBChanged = async (e) => {
    setValue('txbWinterOutdoorAirWB', parseFloat(e.target.value, 10));
    const result = await dispatch(unitReducer.txbWinterOutdoorAirWBChanged(getAllFormData()));
    setValue('txbWinterOutdoorAirRH', result);
  };

  const txbWinterOutdoorAirRHChanged = async (e) => {
    setValue('txbWinterOutdoorAirRH', parseFloat(e.target.value, 10));
    const result = await dispatch(unitReducer.txbWinterOutdoorAirRHChanged(getAllFormData()));
    setValue('txbWinterOutdoorAirWB', result);
  };

  const txbSummerReturnAirDBChanged = (e) => {
    setValue('txbSummerReturnAirDB', parseFloat(e.target.value, 10));
    if (e.target.value === 0) {
      setValue('txbSummerReturnAirWB', 0);
      setValue('txbSummerReturnAirRH', 100);
    } else {
      setValue('txbSummerReturnAirWB', dblTempErrorValue);
      setValue('txbSummerReturnAirRH', dblTempErrorValue);
    }
  };

  const txbSummerReturnAirWBChanged = async (e) => {
    setValue('txbSummerReturnAirWB', parseFloat(e.target.value, 10));
    const result = await dispatch(unitReducer.txbSummerReturnAirWBChanged(getAllFormData()));
    setValue('txbSummerReturnAirRH', result);
  };

  const txbSummerReturnAirRHChanged = async (e) => {
    setValue('txbSummerReturnAirRH', parseFloat(e.target.value, 10));
    const result = await dispatch(unitReducer.txbSummerReturnAirRHChanged(getAllFormData()));
    setValue('txbSummerReturnAirWB', result);
  };

  const txbWinterReturnAirDBChanged = (e) => {
    if (e.target.value === '') {
      setValue('txbWinterReturnAirWB', '');
    } else if (!isNaN(+e.target.value)) {
      setValue('txbWinterReturnAirDB', parseFloat(e.target.value, 10));

      if (e.target.value === 0) {
        setValue('txbWinterReturnAirWB', 0);
        setValue('txbWinterReturnAirRH', 100);
      } else {
        setValue('txbWinterReturnAirWB', dblTempErrorValue);
        setValue('txbWinterReturnAirRH', dblTempErrorValue);
      }
    }
  };

  const txbWinterReturnAirWBChanged = async (e) => {
    if (e.target.value === '') {
      setValue('txbWinterReturnAirWB', '');
    } else if (!isNaN(+e.target.value)) {
      setValue('txbWinterReturnAirWB', parseFloat(e.target.value, 10));
      const result = await dispatch(unitReducer.txbWinterReturnAirWBChanged(getAllFormData()));
      setValue('txbWinterReturnAirRH', result);
    }
  };

  const txbWinterReturnAirRHChanged = async (e) => {
    if (e.target.value === '') {
      setValue('txbWinterReturnAirRH', '');
    } else if (!isNaN(+e.target.value)) {
      setValue('txbWinterReturnAirRH', parseFloat(e.target.value, 10));
      const result = await dispatch(unitReducer.txbWinterReturnAirRHChanged(getAllFormData()));
      setValue('txbWinterReturnAirWB', result);
    }
  };

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

  const ddlHeatExchCompChanged = (e) => {
    console.log(e.target.value);
  };

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

  const ckbDehumidificationChanged = async () => {
    setCkbDehumidificationVal(!ckbDehumidificationVal);
    const data = {
      ...getAllFormData(),
      ckbDehumidificationVal: !ckbDehumidificationVal,
    };
    await dispatch(unitReducer.ckbDehumidificationChanged(data));
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

  const txbOA_FilterPDChanged = async (e) => {
    if (e.target.value > 1.0) {
      setValue('txbOA_FilterPDId', 1.0);
    } else if (e.target.value < 0.3) {
      setValue('txbOA_FilterPDId', 0.3);
    } else {
      setValue('txbOA_FilterPDId', parseFloat(e.target.value, 10));
    }
  };

  const txbRA_FilterPDChanged = (e) => {
    if (e.target.value > 1.0) {
      setValue('txbRA_FilterPDId', 1.0);
    } else if (e.target.value < 0.3) {
      setValue('txbRA_FilterPDId', 0.3);
    } else {
      setValue('txbRA_FilterPDId', parseFloat(e.target.value, 10));
    }
  };

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

  /* -------------------------------------------------------------------------
   * End Event Functions */

  /* Start Visible Validation Functions *
  -------------------------------------------------------------------------- */

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

  const isPreheatCompHWC = () => unitId === IDs.intUnitTypeAHU_ID && getValues('ddlPreheatComp') === IDs.intCompHWC_ID;
  const isCoolingCompCWC = () => getValues('ddlCoolingComp') === IDs.intCompCWC_ID;
  const isHeatingCompHWC = () => getValues('ddlHeatingComp') === IDs.intCompHWC_ID;
  const isReheatCompHWC = () => getValues('ddlReheatComp') === IDs.intCompHWC_ID;

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
  const isUnitTypeAHU = () => intUnitTypeID === IDs.intUnitTypeAHU_ID;
  // const isTxbSummerReturnAirCFMVisible = () => intUnitTypeID !== IDs.intUnitTypeAHU_ID;
  // const isTxbReturnAirESPVisible = () => intUnitTypeID !== IDs.intUnitTypeAHU_ID;
  /* -------------------------------------------------------------------------
   * End Visible Validation Functions */

  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3, mb: 3 }}>
          <LoadingButton
            type="submit"
            ref={refSubmit}
            startIcon={<Iconify icon={isEdit ? 'bx:save' : 'carbon:add'} />}
            variant="contained"
            loading={isSubmitting}
          >
            {isEdit ? 'Save Changes' : 'Add Unit to Project'}
          </LoadingButton>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'grid', rowGap: 0, columnGap: 1 }}>
              <Card sx={{ mb: 3 }}>
                <CardHeaderStyle title="GENTERAL UNIT INFORMATION" />
                <CardContent sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFTextField size="small" name="txtTag" label="Tag" />
                    <RHFTextField
                      size="small"
                      name="txbQty"
                      label="Quantity"
                      onChange={(e) => {
                        setValueWithCheck(e, 'txbQty');
                      }}
                    />
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
                    <RHFControlCheckbox
                      size="small"
                      name="ckbDownshotVal"
                      label="Downshot"
                      sx={getDisplay(ckbDownshotVal === 1)}
                      checked={ckbDownshotVal}
                      onChange={() => setCkbDownshotVal(!ckbDownshotVal)}
                    />
                    <RHFSelect
                      size="small"
                      name="ddlOrientationId"
                      label="Orientation"
                      placeholder=""
                      onChange={ddlOrientationChanged}
                    >
                      {orientationInfo.ddlOrientationDataTbl.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}..
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="ddlUnitTypeId" label="Unit Type" placeholder="" disabled>
                      {unitTypeInfo.unitTypeDataTbl.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
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
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ mb: 3 }}>
                <CardHeaderStyle title="AIR FLOW DATA" />
                <CardContent sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'grid', rowGap: 2, columnGap: 1 }}>
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
                    <Divider />
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFControlCheckbox
                        size="small"
                        name="ckbBypassVal"
                        label="Bypass for Economizer"
                        sx={getDisplay(bypassInfo.divUnitBypassVisible)}
                        checked={ckbBypassVal}
                        onChange={() => setCkbBypassVal(!ckbBypassVal)}
                      />

                      <RHFSelect size="small" name="ddlUnitModelId" label="Unit Model" onChange={ddlUnitModelChanged}>
                        {unitModelInfo.ddlUnitModelDataTbl?.map((item, index) => (
                          <option key={index} value={item.id}>
                            {item.items}
                          </option>
                        ))}
                      </RHFSelect>
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
                      <RHFControlCheckbox
                        size="small"
                        name="ckbVoltageSPPVal"
                        label="Single Point Power Connection"
                        sx={getDisplay(unitVoltageInfo.divVoltageSPPVisible)}
                        checked={ckbVoltageSPPVal}
                        onChange={() => setCkbVoltageSPPVal(!ckbVoltageSPPVal)}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ ...getDisplay(ualInfo.divOutdoorAirDesignCondVisible), mb: 3 }}>
                <CardHeaderStyle title="Outdoor Air Design Conditions" />
                <CardContent sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'grid', rowGap: 2, columnGap: 1 }}>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField
                        size="small"
                        name="txbAltitude"
                        label="Altitude (ft):"
                        autoComplete="off"
                        disabled
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerOutdoorAirDB"
                        label="Summer Outdoor Air DB (F)"
                        onBlur={txbSummerOutdoorAirDBChanged}
                        onChange={(e) => {
                          setValueWithCheck(e, 'txbSummerOutdoorAirDB');
                        }}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerOutdoorAirWB"
                        label="Summer Outdoor Air WB (F)"
                        onBlur={txbSummerOutdoorAirWBChanged}
                        onChange={(e) => {
                          setValueWithCheck(e, 'txbSummerOutdoorAirWB');
                        }}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerOutdoorAirRH"
                        label="Summer Outdoor Air RH (%)"
                        onBlur={txbSummerOutdoorAirRHChanged}
                        onChange={(e) => {
                          setValueWithCheck(e, 'txbSummerOutdoorAirRH');
                        }}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterOutdoorAirDB"
                        label="Winter Outdoor Air DB"
                        onBlur={txbWinterOutdoorAirDBChanged}
                        onChange={(e) => {
                          setValueWithCheck(e, 'txbWinterOutdoorAirDB');
                        }}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterOutdoorAirWB"
                        label="Winter Outdoor Air WB"
                        onBlur={txbWinterOutdoorAirWBChanged}
                        onChange={(e) => {
                          setValueWithCheck(e, 'txbWinterOutdoorAirWB');
                        }}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterOutdoorAirRH"
                        label="Winter Outdoor Air RH"
                        onBlur={txbWinterOutdoorAirRHChanged}
                        onChange={(e) => {
                          setValueWithCheck(e, 'txbWinterOutdoorAirRH');
                        }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ ...getDisplay(ualInfo.divReturnAirDesignCondVisible), mb: 3 }}>
                <CardHeaderStyle title="Return Air Design Conditions" />
                <CardContent sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'grid', rowGap: 2, columnGap: 1 }}>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFTextField
                        size="small"
                        name="txbSummerReturnAirDB"
                        label="Summer Return Air DB (F)"
                        onBlur={txbSummerReturnAirDBChanged}
                        onChange={(e) => {
                          setValueWithCheck(e, 'txbSummerReturnAirDB');
                        }}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerReturnAirWB"
                        label="Summer Return Air WB (F)"
                        onBlur={txbSummerReturnAirWBChanged}
                        onChange={(e) => {
                          setValueWithCheck(e, 'txbSummerReturnAirWB');
                        }}
                      />
                      <RHFTextField
                        size="small"
                        name="txbSummerReturnAirRH"
                        label="Summer Return Air RH (%)"
                        onBlur={txbSummerReturnAirRHChanged}
                        onChange={(e) => {
                          setValueWithCheck(e, 'txbSummerReturnAirRH');
                        }}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterReturnAirDB"
                        label="Winter Return Air DB"
                        onBlur={txbWinterReturnAirDBChanged}
                        onChange={(e) => {
                          setValueWithCheck(e, 'txbWinterReturnAirDB');
                        }}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterReturnAirWB"
                        label="Winter Return Air WB"
                        onBlur={txbWinterReturnAirWBChanged}
                        onChange={(e) => {
                          setValueWithCheck(e, 'txbWinterReturnAirWB');
                        }}
                      />
                      <RHFTextField
                        size="small"
                        name="txbWinterReturnAirRH"
                        label="Winter Return Air RH"
                        onBlur={txbWinterReturnAirRHChanged}
                        onChange={(e) => {
                          setValueWithCheck(e, 'txbWinterReturnAirRH');
                        }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              {/* <Card sx={{ ...getDisplay(divNotesVisible), mb: 3 }}>
                <CardHeaderStyle title="Notes" />
                <CardContent sx={{ height: 'auto' }}>
                  <Box sx={{ display: 'grid', rowGap: 2, columnGap: 1 }}>
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <Typography id="lblSelectionType" sx={{ p: 3 }}>
                      Velocity (FPM):
                    </Typography>
                    <Typography id="lblVelocity" sx={{ p: 3}}>
                      Selection Type: 
                    </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card> */}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardHeaderStyle title="COMPONENTS" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
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
                    <RHFSelect
                      size="small"
                      name="ddlHeatExchCompId"
                      label="Heat Exchanger"
                      sx={getDisplay(componentInfo.divHeatExchCompVisible)}
                      onChange={ddlHeatExchCompChanged}
                    >
                      {componentInfo.ddlHeatExchCompDataTbl?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
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
                    {/* <Typography id="lblDXC_Message" sx={{ ...getDisplay(componentInfo.divDXC_MsgVisible), p: 3 }}>
                      DX Coil : Contact sales@oxygen8.ca for EEV/DX
                    </Typography> */}
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFTextField
                      size="small"
                      name="txbOA_FilterPDId"
                      label="QA Filter PD (in w.g.)"
                      onBlur={txbOA_FilterPDChanged}
                      onChange={(e) => {
                        setValueWithCheck(e, 'txbOA_FilterPDId');
                      }}
                    />
                    <RHFTextField
                      size="small"
                      name="txbRA_FilterPDId"
                      label="RA Filter PD (in w.g.)"
                      sx={getDisplay(returnAirFilterInfo.divRA_FilterPDVisible)}
                      onBlur={txbRA_FilterPDChanged}
                      onChange={(e) => {
                        setValueWithCheck(e, 'txbRA_FilterPDId');
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
                    <RHFSelect
                      size="small"
                      name="ddlReheatCompId"
                      label="Reheat"
                      placeholder=""
                      sx={getDisplay(reheatInfo.divReheatCompVisible)}
                      onChange={ddlReheatCompChanged}
                    >
                      {reheatInfo?.ddlReheatCompDataTbl?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFSelect
                      size="small"
                      name="ddlDamperAndActuatorId"
                      label="Dampers & Actuator"
                      sx={getDisplay(damperAndActuatorInfo.divDamperActuatorVisible)}
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
                    <RHFSelect
                      size="small"
                      name="ddlPreheatElecHeaterInstallationId"
                      label="Preheat Elec. Heater Installation"
                      sx={getDisplay(preheatElecHeaterInstallationInfo.divPreheatElecHeaterInstallationVisible)}
                      onChange={(e) => setValue('ddlPreheatElecHeaterInstallationId', parseInt(e.target.value, 10))}
                      placeholder=""
                    >
                      {preheatElecHeaterInstallationInfo.ddlPreheatElecHeaterInstallationDataTbl?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlHeatElecHeaterInstallationId"
                      label="Heating Elec. Heater Installation"
                      sx={getDisplay(heatElecHeaterInstallationInfo.divHeatElecHeaterInstallationVisible)}
                      onChange={(e) => setValue('ddlHeatElecHeaterInstallationId', parseInt(e.target.value, 10))}
                      placeholder=""
                    >
                      {heatElecHeaterInstallationInfo.ddlHeatElecHeaterInstallationDataTbl?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFCheckbox
                      size="small"
                      name="ckbValveAndActuatorVal"
                      label="Include Valves & Actuator"
                      sx={getDisplay(valveAndActuatorInfo.divValveAndActuatorVisible)}
                      checked={ckbValveAndActuator}
                      onChange={() => setCkbValveAndActuatorVal(!ckbValveAndActuator)}
                    />
                    <RHFControlCheckbox
                      size="small"
                      name="ckbDrainPanVal"
                      label="Drain Pan Required"
                      sx={getDisplay(drainPanInfo.divDrainPanVisible)}
                      checked={ckbDrainPanVal}
                      onChange={() => setCkbDrainPanVal(!ckbDrainPanVal)}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ ...getDisplay(getValues('intPreheatCompId') > 1), mb: 3 }}>
              <CardHeaderStyle title="SUBMITTALS" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
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
                    <RHFSelect
                      size="small"
                      name="ddlCoolingCoilHandingId"
                      label="Cooling Coil Handing"
                      sx={getDisplay(valveAndActuatorInfo.divValveAndActuatorVisible)}
                      onChange={(e) => setValue('ddlCoolingCoilHandingId', parseInt(e.target.value, 10))}
                    >
                      {coolingCoilHandingInfo.ddlCoolingCoilHandingDataTbl?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlHeatingCoilHandingId"
                      label="Heating Coil Handing"
                      sx={getDisplay(valveAndActuatorInfo.divValveAndActuatorVisible)}
                      onChange={(e) => setValue('ddlHeatingCoilHandingId', parseInt(e.target.value, 10))}
                    >
                      {heatingCoilHandingInfo.ddlHeatingCoilHandingDataTbl?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect
                      size="small"
                      name="ddlValveTypeId"
                      sx={getDisplay(valveAndActuatorInfo.divValveAndActuatorVisible)}
                      label="Valve Type"
                    >
                      {valveTypeInfo.ddlValveTypeDataTbl?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ ...getDisplay(setpointsInfo.divSetpointsVisible), mb: 3 }}>
              <CardHeaderStyle title="SETPOINTS" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 2, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
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
                  </Box>
                </Box>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Divider />
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFControlCheckbox
                      size="small"
                      name="ckbPreheatHWC_UseCap"
                      label="Preheat HWC Use Capacity"
                      sx={getDisplay(isPreheatCompHWC())}
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
                      sx={getDisplay(isPreheatCompHWC())}
                      onChange={(e) => {
                        setValueWithCheck(e, 'txbPreheatHWC_Cap');
                      }}
                    />
                    <RHFControlCheckbox
                      size="small"
                      name="ckbPreheatHWC_UseFlowRate"
                      label="Preheat HWC Use Flow Rate"
                      sx={getDisplay(isPreheatCompHWC())}
                      checked={ckbFlowRateAndCap.ckbPreheatHWC_UseFlowRate}
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
                      sx={getDisplay(isPreheatCompHWC())}
                      onChange={(e) => {
                        setValueWithCheck(e, 'txbPreheatHWC_FlowRate');
                      }}
                    />
                    <RHFControlCheckbox
                      size="small"
                      name="ckbCoolingCWC_UseCap"
                      label="Cooling CWC Use Capacity"
                      sx={getDisplay(isCoolingCompCWC())}
                      checked={ckbFlowRateAndCap.ckbCoolingCWC_UseCap}
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
                      sx={getDisplay(isCoolingCompCWC())}
                      onChange={(e) => {
                        setValueWithCheck(e, 'txbCoolingCWC_Cap');
                      }}
                    />
                    <RHFControlCheckbox
                      size="small"
                      name="ckbCoolingCWC_UseFlowRate"
                      label="Cooling CWC Use Flow Rate"
                      sx={getDisplay(isCoolingCompCWC())}
                      checked={ckbFlowRateAndCap.ckbCoolingCWC_UseFlowRate}
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
                      sx={getDisplay(isCoolingCompCWC())}
                      onChange={(e) => {
                        setValueWithCheck(e, 'txbCoolingCWC_FlowRate');
                      }}
                    />
                    <RHFControlCheckbox
                      size="small"
                      name="ckbHeatingHWC_UseCap"
                      label="Heating HWC Use Capacity"
                      sx={getDisplay(isHeatingCompHWC())}
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
                      sx={getDisplay(isHeatingCompHWC())}
                      onChange={(e) => {
                        setValueWithCheck(e, 'txbHeatingHWC_Cap');
                      }}
                    />
                    <RHFControlCheckbox
                      size="small"
                      name="ckbHeatingHWC_UseFlowRate"
                      label="Heating HWC Use Flow Rate"
                      sx={getDisplay(isHeatingCompHWC())}
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
                      sx={getDisplay(isHeatingCompHWC())}
                      onChange={(e) => {
                        setValueWithCheck(e, 'txbHeatingHWC_FlowRate');
                      }}
                    />
                    <RHFControlCheckbox
                      size="small"
                      name="ckbReheatHWC_UseCap"
                      label="Reheat HWC Use Capacity"
                      sx={getDisplay(isReheatCompHWC())}
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
                      sx={getDisplay(isReheatCompHWC())}
                      onChange={(e) => {
                        setValueWithCheck(e, 'txbReheatHWC_Cap');
                      }}
                    />
                    <RHFControlCheckbox
                      size="small"
                      name="ckbReheatHWC_UseFlowRate"
                      label="Reheat HWC Use Flow Rate"
                      sx={getDisplay(isReheatCompHWC())}
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
                      sx={getDisplay(isReheatCompHWC())}
                      onChange={(e) => {
                        setValueWithCheck(e, 'txbReheatHWC_FlowRate');
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ ...getDisplay(coolingFluidDesignCondInfo.divCoolingFluidDesignCondVisible), mb: 3 }}>
              <CardHeaderStyle title="Cooling Fluid Design Conditions" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFSelect size="small" name="ddlCoolingFluidTypeId" label="Cooling Fluid Type">
                      {coolingFluidDesignCondInfo.ddlCoolingFluidTypeDataTbl?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="ddlCoolingFluidConcentrationId" label="Cooling Fluid %">
                      {coolingFluidDesignCondInfo.ddlCoolingFluidConcentrationDataTbl?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
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
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ ...getDisplay(dxCoilRefrigDesignCondInfo.divDXCoilRefrigDesignCondVisible), mb: 3 }}>
              <CardHeaderStyle title="DX Coil Refrigerant" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
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
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ ...getDisplay(heatingFluidDesignCondInfo.divHeatingFluidDesignCondVisible), mb: 3 }}>
              <CardHeaderStyle title="Heating Fluid Design Conditions" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFSelect size="small" name="ddlHeatingFluidTypeId" label="Heating Fluid Type">
                      {heatingFluidDesignCondInfo.ddlHeatingFluidTypeDataTbl?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="ddlHeatingFluidConcentrationId" label="Heating Fluid %">
                      {heatingFluidDesignCondInfo.ddlHeatingFluidConcentrationDataTbl?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
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
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ ...getDisplay(condCoilRefrigDesignCondInfo.divCondCoilRefrigDesignCondVisible), mb: 3 }}>
              <CardHeaderStyle title="Condenser Coil Refrigerant" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
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
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
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
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Card>
              <Image src={'/assets/Layouts/layout_nova_in_h_rh.png'} wdith="100%" height="100%" />
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
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
