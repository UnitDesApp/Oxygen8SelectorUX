import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';

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
  Typography,
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
  unitType: PropTypes.string,
  productType: PropTypes.number,
};
export default function UnitEdit({ unitType, productType }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobId, unitId } = useParams();
  const { state } = useLocation();

  console.log(jobId, unitId);

  const isEdit = unitId !== undefined;
  const { controlInfo, unitInfo, layoutInfo } = useSelector((state) => state.unit);
  console.log(controlInfo, unitInfo);

  const {
    // ddlOrientationDataTbl,
    // ddlOrientationId,
    // ddlUnitModelDataTbl,
    // ddlUnitModelId,
    // divHeatExchCompVisible,
    // divOutdoorAirDesignConditionsVisible,
    // divReturnAirDesignConditionsVisible,
    // divSetpoint_1Visible,
    // divDXRefrigSetpointVisible,
    // divCondRefrigSetpointVisible,
    // divSubmittalItemsVisible,
    // ddlUnitTypeDataTbl,
    // ddlUnitTypeId,
    // ddlControlsPreferenceDataTbl,
    // ddlControlsPreferenceId,
    // ddlDamperAndActuatorDataTbl,
    // ddlDamperAndActuatorId,
    // // ddlDamperAndActuatorVisible,
    // ddlCoolingCoilHandingDataTbl,
    // ddlCoolingCoilHandingId,
    // ddlHeatingCoilHandingDataTbl,
    // ddlHeatingCoilHandingId,
    // ddlPreheatCoilHandingDataTbl,
    // ddlPreheatCoilHandingId,
    // ddlValveTypeDataTbl,
    // ddlValveTypeId,
    // ckbVoltageSPP,
    // divUnitBypassVisible,
    // divVoltageSPPVisible,
    // ddlLocationDataTbl,
    // ddlLocationId,
    // // ckbDownshot,
    // ddlOA_FilterModelDataTbl,
    // ddlOA_FilterModelId,
    // ddlRA_FilterModelDataTbl,
    // ddlRA_FilterModelId,
    // ddlPreheatCompDataTbl,
    // ddlPreheatCompId,
    // ddlHeatExchCompDataTbl,
    // ddlHeatExchCompId,
    // ddlCoolingCompDataTbl,
    // ddlCoolingCompId,
    // ddlHeatingCompDataTbl,
    // ddlHeatingCompId,
    // ddlCoolingFluidTypeDataTbl,
    // ddlCoolingFluidTypeId,
    // ddlCoolingFluidConcentrationDataTbl,
    // ddlCoolingFluidConcentrationId,
    // ddlHeatingFluidTypeDataTbl,
    // ddlHeatingFluidTypeId,
    // ddlHeatingFluidConcentrationDataTbl,
    // ddlHeatingFluidConcentrationId,
    // divCoolingCompVisible,
    // divExhaustAirESPVisible,
    // divHeatingCompVisible,
    // divPreheatCompVisible,
    // divRA_FilterModelVisible,
    // divRA_FilterPDVisible,
    // divSummerReturnAirCFMVisible,
    // ddlUnitVoltageDataTbl,
    // ddlUnitVoltageId,
    // divDXC_MsgVisible,
    // ckbBypass,
    // drainPanInfo,
    
    ualInfo,
    locationInfo,
    orientationInfo,
    controlsPreferenceInfo,
    unitTypeInfo,
    unitModelInfo,
    unitVoltageInfo,
    unitVoltageSPPInfo,
    bypassInfo,
    summerSupplyAirCFMInfo,
    summerReturnAirCFMInfo,
    supplyAirESPInfo,
    returnAirESPInfo,
    outdoorAirFilterInfo,
    returnAirFilterInfo,
    preheatRequiredInfo,
    componentInfo,
    heatPumpInfo,
    dehumidificationInfo,
    reheatInfo,
    damperAndActuatorInfo,
    elecHeaterVoltageInfo,
    preheatElecHeaterInstallationInfo,
    heatElecHeaterInstallationInfo,
    valveAndActuatorInfo,
    drainPanInfo,
    setpointsInfo,
    coolingSetpointInfo,
    heatingSetpointInfo,
    reheatSetpointInfo,
    customInputsInfo, 
    coolingFluidDesignCondInfo,
    heatingFluidDesignCondInfo,
    dxCoilRefrigDesignCondInfo,
    condCoilRefrigDesignCondInfo,
    handingInfo,
    preheatCoilHandingInfo,
    coolingCoilHandingInfo,
    heatingCoilHandingInfo,
    valveTypeInfo,
    supplyAirOpeningInfo,
    remainingOpeningsInfo,
} = controlInfo;

  /* Start State Variables *
  ----------------------------------------------------------------------- */
  const [ckbDehumidification, setCkbDehumidification] = useState( isEdit ? unitInfo.ckbDehumidification === 1 : controlInfo.dehumidificationInfo.ckbDehumidification === 1 );
  const [ckbHeatPump, setCkbHeatPump] = useState( isEdit ? unitInfo.ckbHeatPump === 1 : heatPumpInfo.ckbHeatPumpChecked === 1 );
  const [ckbDownshot, setCkbDownshot] = useState( isEdit ? unitInfo.ckbDownshot === 1 : ckbDownshot === 1 );
  // const [flag, setFlag] = useState(true);

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
    ddlControlsPreferenceId:isEdit ? unitInfo.ddlControlsPreferenceID :  controlsPreferenceInfo.ddlControlsPreferenceId,
    txbSummerSupplyAirCFM: isEdit ? unitInfo.txbSummerSupplyAirCFMText : 325,
    txbSummerReturnAirCFM: isEdit ? unitInfo.txbSummerReturnAirCFMText : 325,
    txbSupplyAirESP: isEdit ? unitInfo.txbSupplyAirESPText : 0.75,
    txbExhaustAirESP: isEdit ? unitInfo.txbExhaustAirESPText : 0.75,
    ckbBypass: isEdit ? unitInfo.ckbBypass === 1 : bypassInfo.ckbBypassChecked === 1,
    ddlUnitModelId: isEdit ? unitInfo.unitModelID : unitModelInfo.ddlUnitModelId,
    ddlUnitVoltageId: isEdit ? unitInfo.unitVoltageID : unitVoltageInfo.ddlUnitVoltageId,
    ckbVoltageSPP: isEdit ? unitInfo.ckbVoltageSPP === 1 : unitVoltageSPPInfo.ckbVoltageSPP === 1,
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
    ddlOA_FilterModelId: isEdit ? unitInfo.OA_FilterModelID : outdoorAirFilterInfo.ddlOutdoorAirFilterModelId,
    ddlRA_FilterModelId: isEdit ? unitInfo.RA_FilterModelID : returnAirFilterInfo.ddlReturnAairFilterModelId,
    ddlPreheatCompId: isEdit ? unitInfo.PreheatCompID : componentInfo.ddlPreheatCompId,
    ddlHeatExchCompId: isEdit ? unitInfo.HeatExchCompID : componentInfo.ddlHeatExchCompId, //
    ddlCoolingCompId: isEdit ? unitInfo.CoolingCompID : componentInfo.ddlCoolingCompId, //
    ddlHeatingCompId: isEdit ? unitInfo.HeatingCompID : componentInfo.ddlHeatingCompId,
    txbOA_FilterPDId: isEdit ? unitInfo.txbOA_FilterPDText : 0.5,
    txbRA_FilterPDId: isEdit ? unitInfo.txbRA_FilterPDText : 0.5,
    ddlReheatCompId: isEdit ? unitInfo.ReheatCompID : reheatInfo.ddlReheatCompId,
    ddlDamperAndActuatorId: isEdit ? unitInfo.DamperActuatorID : damperAndActuatorInfo.ddlDamperAndActuatorId,
    
    // elecHeaterVoltageInfo: isEdit ? unitInfo.elecHeaterVoltageInfo : elecHeaterVoltageInfo,
    // preheatElecHeaterInstallationInfo: isEdit ? unitInfo.preheatElecHeaterInstallationInfo : preheatElecHeaterInstallationInfo,
    // heatElecHeaterInstallationInfo: isEdit ? unitInfo.heatElecHeaterInstallationInfo : heatElecHeaterInstallationInfo,
    // valveAndActuatorInfo: isEdit  ? unitInfo.valveAndActuatorInfo : valveAndActuatorInfo,

    ddlElecHeaterVoltageId: isEdit ? unitInfo.ElecHeaterVoltageID : elecHeaterVoltageInfo.ddlElecHeaterVoltageId,
    ddlPreheatElecHeaterInstallationId: isEdit ? unitInfo.PreheatElecHeaterInstallationID : preheatElecHeaterInstallationInfo.ddlPreheatElecHeaterInstallationId,
    ddlHeatElecHeaterInstallationId: isEdit ? unitInfo.HeatElecHeaterInstallationID : heatElecHeaterInstallationInfo.ddlHeatElecHeaterInstallationId,
    ckbValveAndActuator: isEdit  ? unitInfo.ckbValveAndActuator === 1  : valveAndActuatorInfo.ckbValveAndActuatorChecked === 1,
    drainPanInfo: isEdit ? unitInfo.ckbDrainPan === 1 : drainPanInfo.ckbDrainPanChecked === 1,
    ddlPreheatCoilHandingId: isEdit ? unitInfo.PreheatCoilHandingID : preheatCoilHandingInfo.ddlPreheatCoilHandingId,
    ddlCoolingCoilHandingId: isEdit ? unitInfo.CoolingCoilHandingID : coolingCoilHandingInfo.ddlCoolingCoilHandingId,
    ddlHeatingCoilHandingId: isEdit ? unitInfo.HeatingCoilHandingID : heatingCoilHandingInfo.ddlHeatingCoilHandingId,
    ddlValveTypeId: isEdit ? unitInfo.ValveTypeID : valveTypeInfo.ddlValveTypeId,
    ckbPreheatHWC_UseCap: isEdit && unitInfo.isCustoms ? unitInfo.ckbPreheatHWC_UseCapValue === 1 : false,
    txbPreheatHWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbPreheatHWC_CapText : 0,
    ckbPreheatHWC_UseFlowRate: isEdit && unitInfo.isCustoms ? unitInfo.ckbPreheatHWC_UseFlowRateValue === 1 : false,
    txbPreheatHWC_FlowRate: isEdit && unitInfo.isCustoms ? unitInfo.txbPreheatHWC_FlowRateText : 0,
    ckbCoolingCWC_UseCap: isEdit && unitInfo.isCustoms ? unitInfo.ckbCoolingCWC_UseCapValue === 1 : false,
    txbCoolingCWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbCoolingCWC_CapText : 0,
    ckbCoolingCWC_UseFlowRate: isEdit && unitInfo.isCustoms ? unitInfo.ckbCoolingCWC_UseFlowRateValue === 1 : false,
    txbCoolingCWC_FlowRate: isEdit && unitInfo.isCustoms ? unitInfo.txbCoolingCWC_FlowRateText : 0,
    ckbHeatingHWC_UseCap: isEdit && unitInfo.isCustoms ? unitInfo.ckbHeatingHWC_UseCapValue === 1 : 0,
    txbHeatingHWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbHeatingHWC_CapText : 0,
    ckbHeatingHWC_UseFlowRate: isEdit && unitInfo.isCustoms ? unitInfo.ckbHeatingHWC_UseFlowRateValue === 1 : false,
    txbHeatingHWC_FlowRate: isEdit && unitInfo.isCustoms ? unitInfo.txbHeatingHWC_FlowRateText : 0,
    ckbReheatHWC_UseCap: isEdit && unitInfo.isCustoms ? unitInfo.ckbReheatHWC_UseCapValue === 1 : 0,
    txbReheatHWC_Cap: isEdit && unitInfo.isCustoms ? unitInfo.txbReheatHWC_CapText : 0,
    ckbReheatHWC_UseFlowRate: isEdit && unitInfo.isCustoms ? unitInfo.ckbReheatHWC_UseFlowRateValue === 1 : false,
    txbReheatHWC_FlowRate: isEdit && unitInfo.isCustoms ? unitInfo.txbReheatHWC_FlowRateText : 0,
    ddlCoolingFluidTypeId: isEdit ? unitInfo.CoolingFluidTypeID : coolingFluidDesignCondInfo.ddlCoolingFluidTypeId,
    ddlCoolingFluidConcentrationId: isEdit ? unitInfo.CoolingFluidConcentrationID : coolingFluidDesignCondInfo.ddlCoolingFluidConcentrationId,
    txbCoolingFluidEntTemp: isEdit ? unitInfo.txbCoolingFluidEntTempText : 45,
    txbCoolingFluidLvgTemp: isEdit ? unitInfo.txbCoolingFluidLvgTempText : 55,
    txbRefrigSuctionTemp: isEdit ? unitInfo.txbRefrigSuctionTempText : 43,
    txbRefrigLiquidTemp: isEdit ? unitInfo.txbRefrigLiquidTempText : 77,
    txbRefrigSuperheatTemp: isEdit ? unitInfo.txbRefrigSuperheatTempText : 9,
    ddlHeatingFluidTypeId: isEdit ? unitInfo.HeatingFluidTypeID : heatingFluidDesignCondInfo.ddlHeatingFluidTypeId,
    ddlHeatingFluidConcentrationId: isEdit ? unitInfo.HeatingFluidConcentrationID : heatingFluidDesignCondInfo.ddlHeatingFluidConcentrationId,
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
    ddlSupplyAirOpeningId: isEdit ? unitInfo.ddlSupplyAirOpeningId: supplyAirOpeningInfo.ddlSupplyAirOpeningId,
    ddlSupplyAirOpeningText: isEdit ? unitInfo.ddlSupplyAirOpeningText : supplyAirOpeningInfo.ddlSupplyAirOpeningText,
    ddlExhaustAirOpeningId: isEdit ? unitInfo.ddlExhaustAirOpeningId : remainingOpeningsInfo.ddlExhaustAirOpeningId,
    ddlExhaustAirOpeningText: isEdit ? unitInfo.ddlExhaustAirOpeningText : remainingOpeningsInfo.ddlExhaustAirOpeningText,
    ddlOutdoorAirOpeningId: isEdit ? unitInfo.ddlOutdoorAirOpeningId : remainingOpeningsInfo.ddlOutdoorAirOpeningId,
    ddlOutdoorAirOpeningText: isEdit ? unitInfo.ddlOutdoorAirOpeningText : remainingOpeningsInfo.ddlOutdoorAirOpeningText,
    ddlReturnAirOpeningId: isEdit ? unitInfo.ddlReturnAirOpeningId : remainingOpeningsInfo.ddlReturnAirOpeningId,
    ddlReturnAirOpeningText: isEdit ? unitInfo.ddlReturnAirOpeningText : remainingOpeningsInfo.ddlReturnAirOpeningText,

    // locationInfo: isEdit ? controlInfo.locationInfo : locationInfo,

  };

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
    intProductTypeID: productType,
    intUnitTypeID: unitType,
    intUAL: localStorage.getItem('UAL'),
    intUserID: localStorage.getItem('userId'),
  });

const ckbDehumidificationInfo = (e) => {
  dispatch(unitReducer.ckbDehumidificationChanged(e.target.checked));
}

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
      ckbDehumidification,
      ckbHeatPump
    };

    console.log('---------------------Start Submit Data----------------------');
    console.log(data);
    console.log('--------------------- End Submit Data ----------------------');

    const result = await dispatch(unitReducer.saveUnitInfo(data));
    setOpenSuccessNotification(true);
    navigate(PATH_UNIT.edit(jobId, result), { state });
  };

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
    setValue('ckbBypass', result.others.ckbBypass);
    setValue('ddlElecHeaterVoltageId', result.others.elecHeaterVoltage.ddlElecHeaterVoltageId);
    setValue('ckbDownshot', result.downshot);
    setValue('ddlPreheatElecHeaterInstallationId', result.preheatElectricHeater.ddlPreheatElecHeaterInstallationId);
    setValue('txbSupplyAirESP', result.txbSupplyAirESP);
    setValue('txbExhaustAirESP', result.txbExhaustAirESP);
  };

  const ddlOrientationChanged = async (e) => {
    setValue('ddlOrientationId', parseInt(e.target.value, 10));
    const result = await dispatch(unitReducer.ddlOrientationChanged(getAllFormData()));
    setValue('ddlUnitModelId', result.ddlUnitModelId);
    setValue('ckbBypass', result.others.ckbBypass.ckbBypassChecked);
    setValue('ddlElecHeaterVoltageId', result.others.elecHeaterVoltage.ddlElecHeaterVoltageId);
    setValue('ddlSupplyAirOpeningId', result.ddlSupplyAirOpeningId);
    setValue('ddlSupplyAirOpeningText', result.ddlSupplyAirOpeningText);
  };

  const txbSummerSupplyAirCFMChanged = async () => {
    const result = await dispatch(unitReducer.txbSummerSupplyAirCFMChanged(getAllFormData()));
    setValue('ddlOrientationId', result.ddlOrientationId);
    setValue('ddlUnitModelId', result.ddlUnitModelId);
    setValue('ckbBypass', result.others.ckbBypass.ckbBypassChecked);
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
      setValue('ddlPreheatElecHeaterInstallationId', result.preheatElecHeaterInstallationInfo.ddlPreheatElecHeaterInstallationId);
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
    if (getValues("ddlCoolingCompId") !== IDs.intCompDX_ID) setCkbHeatPump(false);
    if (getValues("ddlCoolingCompId") === IDs.intCompNA_ID) setCkbDehumidification(false);
    await dispatch(unitReducer.ddlCoolingCompChanged(getAllFormData()));
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
      setValue('txbOA_FilterPD', 1.0);
    } else if (e.target.value < 0.3) {
      setValue('txbOA_FilterPD', 0.3);
    } else {
      setValue('txbOA_FilterPD', parseFloat(e.target.value, 10));
    }
  };

  const txbRA_FilterPDChanged = (e) => {
    if (e.target.value > 1.0) {
      setValue('txbRA_FilterPD', 1.0);
    } else if (e.target.value < 0.3) {
      setValue('txbRA_FilterPD', 0.3);
    } else {
      setValue('txbRA_FilterPD', parseFloat(e.target.value, 10));
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

  const clickedCheckbox = (key) => {
    setValue(key, 1 - getValues(key));
  };

  /* -------------------------------------------------------------------------
  * End Event Functions */

  /* Start Visible Validation Functions *
  -------------------------------------------------------------------------- */

  const isCkbValuesAndActuatorVisible = () =>
    getValues('ddlPreheatCompId') === IDs.intCompHWC_ID ||
    getValues('ddlHeatingCompId') === IDs.intCompHWC_ID ||
    getValues('ddlReheatCompId') === IDs.intCompHWC_ID ||
    getValues('ddlCoolingCompId') === IDs.intCompCWC_ID;
  const isDdlElecHeaterVoltageVisible = () =>
    getValues('ddlPreheatCompId') === IDs.intCompElecHeaterID ||
    getValues('ddlHeatingCompId') === IDs.intCompElecHeaterID ||
    getValues('ddlReheatCompId') === IDs.intCompElecHeaterID;
  const isCkbDehumidificationVisible = () =>
    getValues('ddlCoolingCompId') === IDs.intCompCWC_ID || getValues('ddlCoolingCompId') === IDs.intCompDX_ID;
  const isTxbReheatSetpointDBVisible = () =>
    getValues('ddlReheatCompId') !== IDs.intCompNA_ID &&
    getValues('ddlCoolingCompId') !== IDs.intCompNA_ID &&
    ckbDehumidification;
  const isDdlHeatElecHeaterInstallationVisible = () =>
    getValues('ddlHeatingCompId') === IDs.intCompElecHeaterID || getValues('ddlReheatCompId') === IDs.intCompElecHeaterID;
  const isDivHeatingFluidDesignConditionsVisible = () =>
    getValues('ddlPreheatCompId') === IDs.intCompHWC_ID ||
    getValues('ddlHeatingCompId') === IDs.intCompHWC_ID ||
    getValues('ddlReheatCompId') === IDs.intCompHWC_ID;
  const isPreheatCompHWC = () => unitId === IDs.intUnitTypeAHU_ID && getValues("ddlPreheatCompId") === IDs.intCompHWC_ID;
  const isCoolingCompCWC = () => getValues("ddlCoolingCompId") === IDs.intCompCWC_ID;
  const isHeatingCompHWC = () => getValues("ddlHeatingCompId") === IDs.intCompHWC_ID;
  const isReheatCompHWC = () => getValues("ddlReheatCompId") === IDs.intCompHWC_ID;

  /* -------------------------------------------------------------------------
  * End Visible Validation Functions */

  return (
    <Container>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3, mb: 3 }}>
          <LoadingButton
            type="submit"
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
                    <RHFCheckbox
                      size="small"
                      name="ckbDownshot"
                      label="Downshot"
                      sx={getDisplay(ckbDownshot === 1)}
                      defaultChecked={getValues('ckbDownshot') === 1}
                      onChange={(e) => {
                        e.preventDefault();
                        clickedCheckbox('ckbDownshot');
                      }}
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
                          {item.items}
                        </option>
                      ))}
                    </RHFSelect>
                    <RHFSelect size="small" name="ddlUnitTypeId" label="Unit Type" placeholder="" disabled>
                      {unitTypeInfo.ddlUnitTypeDataTbl.map((item, index) => (
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
                        sx={getDisplay(summerReturnAirCFMInfo.divSummerReturnAirCFMVisible)}
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
                        sx={getDisplay(returnAirESPInfo.divReturnAirESPVisible)}
                        onBlur={txbExhaustAirESPChanged}
                        onChange={(e) => {
                          setValueWithCheck(e, 'txbExhaustAirESP');
                        }}
                      />
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                      <RHFCheckbox
                        size="small"
                        name="ckbBypass"
                        label="Bypass for Economizer"
                        sx={getDisplay(bypassInfo.divUnitBypassVisible)}
                        checked={getValues('ckbBypass') === 1}
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
                      <RHFCheckbox
                        size="small"
                        name="ckbVoltageSPP"
                        label="Single Point Power Connection"
                        sx={getDisplay(unitVoltageInfo.divVoltageSPPVisible)}
                        checked={isEdit ? unitInfo.ckbVoltageSPP === 1 : unitVoltageInfo.ckbVoltageSPP === 1}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Card sx={{ ...getDisplay(ualInfo.divOutdoorAirDesignConditionsVisible), mb: 3 }}>
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
              <Card sx={{ ...getDisplay(ualInfo.divReturnAirDesignConditionsVisible), mb: 3 }}>
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
                    <Typography id="lblDXC_Message" sx={{ ...getDisplay(componentInfo.divDXC_MsgVisible), p: 3 }}>
                      DX Coil : Contact sales@oxygen8.ca for EEV/DX
                    </Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFTextField
                      size="small"
                      name="txbOA_FilterPD"
                      label="QA Filter PD (in w.g.)"
                      onBlur={txbOA_FilterPDChanged}
                      onChange={(e) => {
                        setValueWithCheck(e, 'txbOA_FilterPD');
                      }}
                    />
                    <RHFTextField
                      size="small"
                      name="txbRA_FilterPD"
                      label="RA Filter PD (in w.g.)"
                      sx={getDisplay(returnAirFilterInfo.divRA_FilterPDVisible)}
                      onBlur={txbRA_FilterPDChanged}
                      onChange={(e) => {
                        setValueWithCheck(e, 'txbRA_FilterPD');
                      }}
                    />
                    <RHFControlCheckbox
                      size="small"
                      name="ckbHeatPump"
                      label="Heat Pump"
                      sx={getDisplay(heatPumpInfo.divHeatPumpVisible)}
                      checked={heatPumpInfo.ckbHeatPump}
                      onChange={() => {
                        setCkbHeatPump(!ckbHeatPump);
                      }}
                    />
                    <RHFControlCheckbox
                      size="small"
                      name="ckbDehumidification"
                      label="Dehumidification"
                      sx={getDisplay(dehumidificationInfo.divDehumidificationVisible)}
                      checked={dehumidificationInfo.ckbDehumidification}
                      onChange={ckbDehumidificationInfo}
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
                      name="ckbValveAndActuator"
                      label="Include Valves & Actuator"
                      sx={getDisplay(valveAndActuatorInfo.divValveAndActuatorVisible )}
                      checked={
                        isEdit ? unitInfo.ckbValveAndActuator === 1 : valveAndActuatorInfo.ckbValveAndActuatorChecked === 1
                      }
                    />
                    <RHFCheckbox
                      size="small"
                      name="ckbDrainPan"
                      label="Drain Pan Required"
                      sx={getDisplay(drainPanInfo.divDrainPanVisible)}
                      checked={isEdit ? unitInfo.ckbDrainPan === 1 : drainPanInfo.ckbDrainPanChecked === 1}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
            <Card sx={{ ...getDisplay(preheatCoilHandingInfo.divPreheatCoilHandingVisible), mb: 3 }}>
              <CardHeaderStyle title="SUBMITTALS" />
              <CardContent sx={{ height: 'auto' }}>
                <Box sx={{ display: 'grid', rowGap: 3, columnGap: 1 }}>
                  <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                    <RHFSelect
                      size="small"
                      name="ddlPreheatCoilHandingId"
                      label="Preheat Coil Handing"
                      onChange={(e) => setValue('ddlPreheatCoilHandingId', parseInt(e.target.value, 10))}
                      sx={getDisplay(getValues('ddlPreheatCompId') > 1)}
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
                      onChange={(e) => setValue('ddlCoolingCoilHandingId', parseInt(e.target.value, 10))}
                      sx={getDisplay(coolingCoilHandingInfo.divCoolingCoilHandingVisible)}
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
                      onChange={(e) => setValue('ddlHeatingCoilHandingId', parseInt(e.target.value, 10))}
                      sx={getDisplay(heatingCoilHandingInfo.divHeatingCoilHandingVisible)}
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
                      sx={getDisplay(valveTypeInfo.divValveTypeVisible)}
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
                    <RHFCheckbox
                      size="small"
                      name="ckbPreheatHWC_UseCap"
                      label="Preheat HWC Use Capacity"
                      sx={getDisplay(isPreheatCompHWC())}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbPreheatHWC_UseCapValue : false}
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
                    <RHFCheckbox
                      size="small"
                      name="ckbPreheatHWC_UseFlowRate"
                      label="Preheat HWC Use Flow Rate"
                      sx={getDisplay(isPreheatCompHWC())}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbPreheatHWC_UseFlowRateValue : false}
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
                    <RHFCheckbox
                      size="small"
                      name="ckbCoolingCWC_UseCap"
                      label="Cooling CWC Use Capacity"
                      sx={getDisplay(isCoolingCompCWC())}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbCoolingCWC_UseCapValue : false}
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
                    <RHFCheckbox
                      size="small"
                      name="ckbCoolingCWC_UseFlowRate"
                      label="Cooling CWC Use Flow Rate"
                      sx={getDisplay(isCoolingCompCWC())}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbCoolingCWC_UseFlowRateValue : false}
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
                    <RHFCheckbox
                      size="small"
                      name="ckbHeatingHWC_UseCap"
                      label="Heating HWC Use Capacity"
                      sx={getDisplay(isHeatingCompHWC())}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbHeatingHWC_UseCapValue : false}
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
                    <RHFCheckbox
                      size="small"
                      name="ckbHeatingHWC_UseFlowRate"
                      label="Heating HWC Use Flow Rate"
                      sx={getDisplay(isHeatingCompHWC())}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbHeatingHWC_UseFlowRateValue : false}
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
                    <RHFCheckbox
                      size="small"
                      name="ckbReheatHWC_UseCap"
                      label="Reheat HWC Use Capacity"
                      sx={getDisplay(isReheatCompHWC())}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbReheatHWC_UseCapValue : false}
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
                    <RHFCheckbox
                      size="small"
                      name="ckbReheatHWC_UseFlowRate"
                      label="Reheat HWC Use Flow Rate"
                      sx={getDisplay(isReheatCompHWC())}
                      checked={isEdit && unitInfo.isCustoms ? unitInfo.ckbReheatHWC_UseFlowRateValue : false}
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
            <Card sx={{ ...getDisplay(condCoilRefrigDesignCondInfo.divCondCoilDesignCondVisible), mb: 3 }}>
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
