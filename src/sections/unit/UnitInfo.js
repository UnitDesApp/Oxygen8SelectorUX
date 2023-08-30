import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Container,
  Grid,
  LinearProgress,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useUnitEditFormSchema } from '../../hooks/useUnitEditForm';
// redux
import * as unitReducer from '../../redux/slices/unitReducer';
import { useDispatch, useSelector } from '../../redux/store';
// components
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import {
  FormProvider,
  RHFCheckbox,
  RHFControlCheckbox,
  RHFSelect,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../components/hook-form';
// config
import * as IDs from '../../config';
import {
  getComponentInfo,
  getCustomInputsInfo,
  getDXCoilRefrigDesignCondInfo,
  getDamperAndActuatorInfo,
  getDehumidificationInfo,
  getDrainPanInfo,
  getElecHeaterVoltageInfo,
  getExhaustAirESP,
  getHandingInfo,
  getHeatElecHeaterInstallationInfo,
  getHeatPumpInfo,
  getHeatingFluidDesignCondInfo,
  getItemsAddedOnIDDataTable,
  getPreheatElecHeaterInstallationInfo,
  getRemainingOpeningsInfo,
  getSummerReturnAirCFM,
  getSummerSupplyAirCFM,
  getSupplyAirESPInfo,
  getSupplyAirOpeningInfo,
  getUALInfo,
  getUnitModel,
  getUnitVoltage,
  getValveAndActuatorInfo,
  getReheatInfo,
} from '../../utils/handleUnitControls';
import { getUnitModelCodes } from '../../utils/handleUnitModelCodes';

//------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(3),
  mb: '100px',
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(3),
  },
}));

//------------------------------------------------
UnitInfo.propTypes = {
  projectId: PropTypes.number,
  unitId: PropTypes.number,
  unitTypeData: PropTypes.object,
  setIsAddedNewUnit: PropTypes.func,
  isAddedNewUnit: PropTypes.bool,
  setFunction: PropTypes.func,
  edit: PropTypes.bool,
};

export default function UnitInfo({
  projectId,
  unitId,
  unitTypeData,
  setIsAddedNewUnit,
  isAddedNewUnit,
  setFunction,
  edit = false,
}) {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { unitInfo } = useSelector((state) => state.unit);
  const { data } = useSelector((state) => state.base);
  const [isLoading, setIsLoading] = useState(true);
  const [remainingOpeningsInfo, setRemainingOpeningsInfo] = useState([]);
  const { intProductTypeID, intUnitTypeID } = unitTypeData;
  const isResetCalled = useRef(false);

  useEffect(() => {
    const getUnitInfo = async () => {
      await dispatch(
        unitReducer.getInitUnitinfo({
          intUserID: localStorage.getItem('userId'),
          intUAL: localStorage.getItem('UAL'),
          intProjectID: projectId,
          intProductTypeID,
          intUnitTypeID,
          intUnitNo: edit ? unitId : Number(-1),
        })
      );

      setIsLoading(false);
    };

    getUnitInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openSuccess, setOpenSuccess] = useState(false);
  const handleCloseSuccess = useCallback((event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  }, []);

  const [openError, setOpenError] = useState(false);
  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };

  const [ckbBypassVal, setCkbBypassVal] = useState(false);
  const [ckbDrainPanVal, setCkbDrainPanVal] = useState(false);
  const [ckbVoltageSPPVal, setCkbVoltageSPPVal] = useState(false);
  const [ckbDehumidificationVal, setCkbDehumidificationVal] = useState(false);
  const [ckbValveAndActuatorVal, setCkbValveAndActuatorVal] = useState(false);
  const [ckbHeatPumpVal, setCkbHeatPumpVal] = useState(false);
  const [ckbDownshotVal, setCkbDownshotVal] = useState(false);
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

  useEffect(() => {
    if (edit) {
      setCkbBypassVal(!!unitInfo?.ckbBypassVal);
      setCkbDrainPanVal(!!unitInfo?.ckbDrainPanVal);
      setCkbVoltageSPPVal(!!unitInfo?.ckbVoltageSPPVal);
      setCkbDehumidificationVal(!!unitInfo?.ckbDehumidificationVal);
      setCkbValveAndActuatorVal(!!unitInfo?.ckbValveAndActuatorVal);
      setCkbHeatPumpVal(!!unitInfo?.ckbHeatPumpVal);
      setCkbDownshotVal(!!unitInfo?.ckbDownshot?.isDownshot);
      setCkbFlowRateAndCap({
        ckbPreheatHWC_UseCap: false,
        ckbPreheatHWC_UseFlowRate: false,
        ckbCoolingCWC_UseCap: false,
        ckbCoolingCWC_UseFlowRate: false,
        ckbHeatingHWC_UseCap: false,
        ckbHeatingHWC_UseFlowRate: false,
        ckbReheatHWC_UseCap: false,
        ckbReheatHWC_UseFlowRate: false,
      });
    }
  }, [
    edit,
    unitInfo?.ckbBypassVal,
    unitInfo?.ckbDehumidificationChecked,
    unitInfo?.ckbDehumidificationVal,
    unitInfo?.ckbDownshot?.isDownshot,
    unitInfo?.ckbDrainPanVal,
    unitInfo?.ckbHeatPumpVal,
    unitInfo?.ckbValveAndActuatorVal,
    unitInfo?.ckbVoltageSPPVal,
  ]);

  const [expanded, setExpanded] = useState({
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
      txtTag: edit ? unitInfo?.txbTagText : '',
      txbQty: edit ? unitInfo?.txbQtyText : 0,
      ddlLocationId: edit ? unitInfo?.locationID : 1,
      ddlOrientationId: edit ? unitInfo?.orientationID : 1,
      ddlUnitTypeId: edit ? unitInfo?.unitTypeID : 1,
      ddlControlsPreferenceId: edit ? unitInfo?.ddlControlsPreferenceId : 1,
      txbSummerSupplyAirCFM: edit ? unitInfo?.txbSummerSupplyAirCFMText : 325,
      txbSummerReturnAirCFM: edit ? unitInfo?.txbSummerReturnAirCFMText : 325,
      txbSupplyAirESP: edit ? unitInfo?.txbSupplyAirESPText : 0.75,
      txbExhaustAirESP: edit ? unitInfo?.txbExhaustAirESPText : 0.75,
      ddlUnitModelId: edit ? unitInfo?.unitModelID : 1,
      ddlUnitVoltageId: edit ? unitInfo?.unitVoltageID : 1,
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
      txbWinterPreheatSetpointDB: edit ? unitInfo?.txbWinterPreheatSetpointDBText : 0,
      txbSummerCoolingSetpointDB: edit ? unitInfo?.txbSummerCoolingSetpointDBText : 55,
      txbSummerCoolingSetpointWB: edit ? unitInfo?.txbSummerCoolingSetpointWBText : 55,
      txbWinterHeatingSetpointDB: edit ? unitInfo?.txbWinterHeatingSetpointDBText : 72,
      txbSummerReheatSetpointDB: edit ? unitInfo?.txbSummerReheatSetpointDBText : 70,
      ddlOA_FilterModelId: edit ? unitInfo?.OA_FilterModelID : 0,
      ddlRA_FilterModelId: edit ? unitInfo?.RA_FilterModelID : 0,
      ddlPreheatCompId: edit ? unitInfo?.PreheatCompID : 0,
      ddlHeatExchCompId: edit ? unitInfo?.HeatExchCompID : 0,
      ddlCoolingCompId: edit ? unitInfo?.CoolingCompID : 0,
      ddlHeatingCompId: edit ? unitInfo?.HeatingCompID : 0,
      txbOA_FilterPD: edit ? unitInfo?.txbOA_FilterPDText : 0.5,
      txbRA_FilterPD: edit ? unitInfo?.txbRA_FilterPDText : 0.5,
      ddlReheatCompId: edit ? unitInfo?.ReheatCompID : 0,
      ddlDamperAndActuatorId: edit ? unitInfo?.DamperActuatorID : 0,
      ddlElecHeaterVoltageId: edit ? unitInfo?.ElecHeaterVoltageID : 0,
      ddlPreheatElecHeaterInstallationId: edit ? unitInfo?.PreheatElecHeaterInstallationID : 0,
      ddlHeatElecHeaterInstallationId: edit ? unitInfo?.HeatElecHeaterInstallationID : 0,
      ddlPreheatCoilHandingId: edit ? unitInfo?.PreheatCoilHandingID : 0,
      ddlCoolingCoilHandingId: edit ? unitInfo?.CoolingCoilHandingID : 0,
      ddlHeatingCoilHandingId: edit ? unitInfo?.HeatingCoilHandingID : 0,
      ddlValveTypeId: edit ? unitInfo?.ddlValveTypeId : data?.valveType[0]?.id,
      txbPreheatHWC_Cap: edit ? unitInfo?.txbPreheatHWC_CapText || 0 : 0,
      txbPreheatHWC_FlowRate: edit ? unitInfo?.txbPreheatHWC_FlowRateText || 0 : 0,
      txbCoolingCWC_Cap: edit ? unitInfo?.txbCoolingCWC_CapText || 0 : 0,
      txbCoolingCWC_FlowRate: edit ? unitInfo?.txbCoolingCWC_FlowRateText || 0 : 0,
      txbHeatingHWC_Cap: edit ? unitInfo?.txbHeatingHWC_CapText || 0 : 0,
      txbHeatingHWC_FlowRate: edit ? unitInfo?.txbHeatingHWC_FlowRateText || 0 : 0,
      txbReheatHWC_Cap: edit ? unitInfo?.txbReheatHWC_CapText || 0 : 0,
      txbReheatHWC_FlowRate: edit ? unitInfo?.txbReheatHWC_FlowRateText || 0 : 0,
      ddlCoolingFluidTypeId: edit ? unitInfo?.CoolingFluidTypeID : 0,
      ddlCoolingFluidConcentrationId: edit ? unitInfo?.CoolingFluidConcentrationID : 0,
      txbCoolingFluidEntTemp: edit ? unitInfo?.txbCoolingFluidEntTempText : 45,
      txbCoolingFluidLvgTemp: edit ? unitInfo?.txbCoolingFluidLvgTempText : 55,
      txbRefrigSuctionTemp: edit ? unitInfo?.txbRefrigSuctionTempText : 43,
      txbRefrigLiquidTemp: edit ? unitInfo?.txbRefrigLiquidTempText : 77,
      txbRefrigSuperheatTemp: edit ? unitInfo?.txbRefrigSuperheatTempText : 9,
      ddlHeatingFluidTypeId: edit ? unitInfo?.HeatingFluidTypeID : 0,
      ddlHeatingFluidConcentrationId: edit ? unitInfo?.HeatingFluidConcentrationID : 0,
      txbHeatingFluidEntTemp: edit ? unitInfo?.txbHeatingFluidEntTempText : 140,
      txbHeatingFluidLvgTemp: edit ? unitInfo?.txbHeatingFluidLvgTempText : 120,
      txbRefrigCondensingTemp: edit ? unitInfo?.txbRefrigCondensingTempText : 115,
      txbRefrigVaporTemp: edit ? unitInfo?.txbRefrigVaporTempText : 140,
      txbRefrigSubcoolingTemp: edit ? unitInfo?.txbRefrigSubcoolingTempText : 5.4,
      txbPercentCondensingLoad: 100,
      txbUnitHeightText: edit ? unitInfo?.txbUnitHeightText : 0,
      txbUnitLengthText: edit ? unitInfo?.txbUnitLengthText : 0,
      txbUnitWeightText: edit ? unitInfo?.txbUnitWeightText : 0,
      txbUnitWidthText: edit ? unitInfo?.txbUnitWidthText : 0,
      ddlHandingId: edit ? unitInfo?.ddlHandingId : 0,
      ddlSupplyAirOpeningId: edit ? unitInfo?.ddlSupplyAirOpeningId : 0,
      ddlSupplyAirOpeningText: edit ? unitInfo?.ddlSupplyAirOpeningText : '',
      ddlExhaustAirOpeningId: edit ? unitInfo?.ddlExhaustAirOpeningId : 0,
      ddlExhaustAirOpeningText: edit ? unitInfo?.ddlExhaustAirOpeningText : '',
      ddlOutdoorAirOpeningId: edit ? unitInfo?.ddlOutdoorAirOpeningId : 0,
      ddlOutdoorAirOpeningText: edit ? unitInfo?.ddlOutdoorAirOpeningText : '',
      ddlReturnAirOpeningId: edit ? unitInfo?.ddlReturnAirOpeningId : 0,
      ddlReturnAirOpeningText: edit ? unitInfo?.ddlReturnAirOpeningText : '',
      layoutImage: {},
    }),
    [
      data?.valveType,
      edit,
      unitInfo?.CoolingCoilHandingID,
      unitInfo?.CoolingCompID,
      unitInfo?.CoolingFluidConcentrationID,
      unitInfo?.CoolingFluidTypeID,
      unitInfo?.DamperActuatorID,
      unitInfo?.ElecHeaterVoltageID,
      unitInfo?.HeatElecHeaterInstallationID,
      unitInfo?.HeatExchCompID,
      unitInfo?.HeatingCoilHandingID,
      unitInfo?.HeatingCompID,
      unitInfo?.HeatingFluidConcentrationID,
      unitInfo?.HeatingFluidTypeID,
      unitInfo?.OA_FilterModelID,
      unitInfo?.PreheatCoilHandingID,
      unitInfo?.PreheatCompID,
      unitInfo?.PreheatElecHeaterInstallationID,
      unitInfo?.RA_FilterModelID,
      unitInfo?.ReheatCompID,
      unitInfo?.ddlControlsPreferenceId,
      unitInfo?.ddlExhaustAirOpeningId,
      unitInfo?.ddlExhaustAirOpeningText,
      unitInfo?.ddlHandingId,
      unitInfo?.ddlOutdoorAirOpeningId,
      unitInfo?.ddlOutdoorAirOpeningText,
      unitInfo?.ddlReturnAirOpeningId,
      unitInfo?.ddlReturnAirOpeningText,
      unitInfo?.ddlSupplyAirOpeningId,
      unitInfo?.ddlSupplyAirOpeningText,
      unitInfo?.ddlValveTypeId,
      unitInfo?.locationID,
      unitInfo?.orientationID,
      unitInfo?.txbAltitudeText,
      unitInfo?.txbCoolingCWC_CapText,
      unitInfo?.txbCoolingCWC_FlowRateText,
      unitInfo?.txbCoolingFluidEntTempText,
      unitInfo?.txbCoolingFluidLvgTempText,
      unitInfo?.txbExhaustAirESPText,
      unitInfo?.txbHeatingFluidEntTempText,
      unitInfo?.txbHeatingFluidLvgTempText,
      unitInfo?.txbHeatingHWC_CapText,
      unitInfo?.txbHeatingHWC_FlowRateText,
      unitInfo?.txbOA_FilterPDText,
      unitInfo?.txbPreheatHWC_CapText,
      unitInfo?.txbPreheatHWC_FlowRateText,
      unitInfo?.txbQtyText,
      unitInfo?.txbRA_FilterPDText,
      unitInfo?.txbRefrigCondensingTempText,
      unitInfo?.txbRefrigLiquidTempText,
      unitInfo?.txbRefrigSubcoolingTempText,
      unitInfo?.txbRefrigSuctionTempText,
      unitInfo?.txbRefrigSuperheatTempText,
      unitInfo?.txbRefrigVaporTempText,
      unitInfo?.txbReheatHWC_CapText,
      unitInfo?.txbReheatHWC_FlowRateText,
      unitInfo?.txbSummerCoolingSetpointDBText,
      unitInfo?.txbSummerCoolingSetpointWBText,
      unitInfo?.txbSummerOutdoorAirDBText,
      unitInfo?.txbSummerOutdoorAirRHText,
      unitInfo?.txbSummerOutdoorAirWBText,
      unitInfo?.txbSummerReheatSetpointDBText,
      unitInfo?.txbSummerReturnAirCFMText,
      unitInfo?.txbSummerReturnAirDBText,
      unitInfo?.txbSummerReturnAirRHText,
      unitInfo?.txbSummerReturnAirWBText,
      unitInfo?.txbSummerSupplyAirCFMText,
      unitInfo?.txbSupplyAirESPText,
      unitInfo?.txbTagText,
      unitInfo?.txbUnitHeightText,
      unitInfo?.txbUnitLengthText,
      unitInfo?.txbUnitWeightText,
      unitInfo?.txbUnitWidthText,
      unitInfo?.txbWinterHeatingSetpointDBText,
      unitInfo?.txbWinterOutdoorAirDBText,
      unitInfo?.txbWinterOutdoorAirRHText,
      unitInfo?.txbWinterOutdoorAirWBText,
      unitInfo?.txbWinterPreheatSetpointDBText,
      unitInfo?.txbWinterReturnAirDBText,
      unitInfo?.txbWinterReturnAirRHText,
      unitInfo?.txbWinterReturnAirWBText,
      unitInfo?.unitModelID,
      unitInfo?.unitTypeID,
      unitInfo?.unitVoltageID,
    ]
  );

  // initalize form using useform and setup the default value
  const methods = useForm({
    resolver: yupResolver(useUnitEditFormSchema),
    defaultValues,
  });

  // define form control methods
  const {
    setValue,
    getValues,
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  // reset form data based on updated default values, NOTE: this is for when the redux data is updated.
  useEffect(() => {
    if (!isLoading && !isResetCalled.current) {
      reset(defaultValues);
      isResetCalled.current = true;
    }
  }, [isLoading, reset, defaultValues]);

  // values for form, NOTE: it will be updated real time when the form data is changed
  const values = watch();

  // calculate unit model values
  const { strUnitModelValue } = useMemo(() => {
    let unitModel = [];

    switch (Number(intProductTypeID)) {
      case IDs.intProdTypeNovaID:
        unitModel = data.novaUnitModel;
        break;
      case IDs.intProdTypeVentumID:
        unitModel = data.ventumHUnitModel;
        break;
      case IDs.intProdTypeVentumLiteID:
        unitModel = data.ventumLiteUnitModel;
        break;
      case IDs.intProdTypeVentumPlusID:
        unitModel = data.ventumPlusUnitModel;
        break;
      case IDs.intProdTypeTerraID:
        unitModel = data.terraUnitModel;
        break;
      default:
        break;
    }

    // get unit model codes
    return getUnitModelCodes(
      unitModel[0].value.toString(),
      intProductTypeID,
      intUnitTypeID,
      values.ddlLocationId,
      values.ddlOrientationId,
      Number(ckbBypassVal),
      data
    );
  }, [ckbBypassVal, data, intProductTypeID, intUnitTypeID, values.ddlLocationId, values.ddlOrientationId]);

  // function that check if the compoment is okay for displaying
  const getDisplay = useCallback((key) => ({ display: key ? 'block' : 'none' }), []);

  // function that merge all data include checkbox and unit types, etc, everything!
  const getAllFormData = useCallback(
    () => ({
      ...getValues(),
      intProjectID: projectId,
      intUnitNo: edit ? unitId : 0,
      intProductTypeID,
      intUnitTypeID,
      ddlUnitTypeId: intUnitTypeID,
      intUAL: localStorage.getItem('UAL'),
      intUserID: localStorage.getItem('userId'),
      ckbBypassVal,
      ckbDrainPanVal,
      ckbVoltageSPPVal,
      ckbDehumidificationVal,
      ckbValveAndActuatorVal,
      ckbHeatPumpVal,
      ckbDownshotVal,
      ...ckbFlowRateAndCap,
    }),
    [
      getValues,
      projectId,
      edit,
      unitId,
      intProductTypeID,
      intUnitTypeID,
      ckbBypassVal,
      ckbDrainPanVal,
      ckbVoltageSPPVal,
      ckbDehumidificationVal,
      ckbValveAndActuatorVal,
      ckbHeatPumpVal,
      ckbDownshotVal,
      ckbFlowRateAndCap,
    ]
  );

  // handle submit
  const onSubmit = useCallback(async () => {
    try {
      const intUnitNo = await dispatch(unitReducer.saveUnitInfo(getAllFormData()));
      setOpenSuccess(true);
      if (!edit) setIsAddedNewUnit(intUnitNo);
    } catch (e) {
      console.log(e);
      setOpenError(true);
    }
  }, [dispatch, edit, getAllFormData, setIsAddedNewUnit]);

  /* Start OnChange functions */
  const ddlLocationChanged = useCallback(
    (e) => {
      setValue('ddlLocationId', Number(e.target.value));
    },
    [setValue]
  );

  const ddlOrientationChanged = useCallback(
    async (e) => {
      setValue('ddlOrientationId', parseInt(e.target.value, 10));
    },
    [setValue]
  );

  const ddlUnitModelChanged = useCallback(
    async (e) => {
      setValue('ddlUnitModelId', parseInt(e.target.value, 10));
    },
    [setValue]
  );

  const ddlUnitVoltageChanged = useCallback(
    async (e) => {
      setValue('ddlUnitVoltageId', parseInt(e.target.value, 10));
    },
    [setValue]
  );

  const ddlPreheatCompChanged = useCallback(
    async (e) => {
      setValue('ddlPreheatCompId', parseInt(e.target.value, 10));
    },
    [setValue]
  );

  const ddlCoolingCompChanged = useCallback(
    async (e) => {
      setValue('ddlCoolingCompId', parseInt(e.target.value, 10));
    },
    [setValue]
  );

  const ckbHeatPumpChanged = useCallback(async () => {
    setCkbHeatPumpVal(!ckbHeatPumpVal);
  }, [ckbHeatPumpVal]);

  const ckbDehumidificationChanged = useCallback(async () => {
    setCkbDehumidificationVal(!ckbDehumidificationVal);
  }, [ckbDehumidificationVal]);

  const ddlHeatingCompChanged = useCallback(
    async (e) => {
      setValue('ddlHeatingCompId', parseInt(e.target.value, 10));
    },
    [setValue]
  );

  const ddlReheatCompChanged = useCallback(
    async (e) => {
      setValue('ddlReheatCompId', parseInt(e.target.value, 10));
    },
    [setValue]
  );

  const ddlElecHeaterVoltageChanged = useCallback(
    async (e) => {
      setValue('ddlElecHeaterVoltageId', parseInt(e.target.value, 10));
    },
    [setValue]
  );

  const setValueWithCheck = useCallback(
    (e, key) => {
      if (e.target.value === '') {
        setValue(key, '');
      } else if (!isNaN(+e.target.value)) {
        setValue(key, parseFloat(e.target.value, 10));
        return true;
      }
      return false;
    },
    [setValue]
  );

  const ddlHandingChanged = useCallback(
    async (e) => {
      setValue('ddlHandingId', parseInt(e.target.value, 10));
    },
    [setValue]
  );

  const ddlSupplyAirOpeningChanged = useCallback(
    async (e) => {
      setValue('ddlSupplyAirOpeningId', parseInt(e.target.value, 10));
      setValue('ddlSupplyAirOpeningText', e.target.options[e.target.selectedIndex].text);
    },
    [setValue]
  );

  const ddlExhaustAirOpeningChanged = useCallback(
    async (e) => {
      setValue('ddlExhaustAirOpeningId', parseInt(e.target.value, 10));
      setValue('ddlExhaustAirOpeningText', e.target.options[e.target.selectedIndex].text);
    },
    [setValue]
  );

  const ddlOutdoorAirOpeningChanged = useCallback(
    async (e) => {
      setValue('ddlOutdoorAirOpeningId', parseInt(e.target.value, 10));
      setValue('ddlOutdoorAirOpeningText', e.target.options[e.target.selectedIndex].text);
    },
    [setValue]
  );

  const ddlReturnAirOpeningChanged = useCallback(
    async (e) => {
      setValue('ddlReturnAirOpeningId', parseInt(e.target.value, 10));
      setValue('ddlReturnAirOpeningText', e.target.options[e.target.selectedIndex].text);
    },
    [setValue]
  );

  /* End OnChange functions */

  /* Form Controle functions */

  // checking if unit type is AHU
  const isUnitTypeAHU = useCallback(() => intProductTypeID === IDs.intUnitTypeAHU_ID, [intProductTypeID]);

  // file drop functions
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'layoutImage',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  // calculating unit model information
  const unitModel = useMemo(() => {
    const { unitModel, summerSupplyAirCFM } = getUnitModel(
      data,
      Number(intUnitTypeID),
      Number(intProductTypeID),
      Number(values.ddlUnitModelId),
      Number(values.ddlLocationId),
      Number(values.ddlOrientationId),
      values.txbSummerSupplyAirCFM,
      Number(ckbBypassVal),
      Number(user?.UAL || 0)
    );

    // set unit model value based calculated value
    if (unitModel.length > 0 && unitModel.filter((item) => item.id === Number(values.ddlUnitModelId)).length <= 0) {
      setValue('ddlUnitModelId', unitModel?.[1]?.id);
    }

    // set supply air CFM value based calculated value
    if (summerSupplyAirCFM && values.txbSummerSupplyAirCFM === summerSupplyAirCFM.toString()) {
      setValue('txbSummerSupplyAirCFM', summerSupplyAirCFM.toString());
    }

    return unitModel;
  }, [
    data,
    intUnitTypeID,
    intProductTypeID,
    values.ddlUnitModelId,
    values.ddlLocationId,
    values.ddlOrientationId,
    values.txbSummerSupplyAirCFM,
    ckbBypassVal,
    user?.UAL || 0,
    setValue,
  ]);

  const unitVoltage = useMemo(() => {
    const { unitVoltage, ddlUnitVoltageId } = getUnitVoltage(data, getAllFormData(), strUnitModelValue);
    if (!edit) setValue('ddlUnitVoltageId', ddlUnitVoltageId);
    return unitVoltage;
  }, [edit, data, getAllFormData, setValue, strUnitModelValue]);

  const QAFilterModel = useMemo(
    () => data.filterModel?.filter((item) => item.outdoor_air === 1 || item.id === values.ddlOA_FilterModelId),
    [data, values]
  );

  const RAFilterModel = useMemo(
    () => data.filterModel?.filter((item) => item.return_air === 1 || item.id === values.ddlOA_FilterModelId),
    [data, values]
  );

  const { dtPreheatComp, dtCoolingComp, dtHeatingComp } = useMemo(
    () => getComponentInfo(data, Number(intProductTypeID), Number(intUnitTypeID), values),
    [data, intProductTypeID, intUnitTypeID, values]
  );

  const { dtReheatComp } = useMemo(
    () =>
      getReheatInfo(
        data,
        ckbDehumidificationVal,
        Number(values.ddlCoolingCompId),
        Number(user?.UAL || 0),
        Number(intUnitTypeID),
        Number(intProductTypeID),
        Number(values.ddlUnitModelId)
      ),
    [
      ckbDehumidificationVal,
      data,
      intProductTypeID,
      intUnitTypeID,
      user?.UAL || 0,
      values.ddlCoolingCompId,
      values.ddlUnitModelId,
    ]
  );

  const preheatElecHeaterInstallationInfo = useMemo(() => {
    const result = getPreheatElecHeaterInstallationInfo(
      data,
      Number(values.ddlPreheatCompId),
      Number(values.ddlLocationId),
      intProductTypeID
    );

    if (!edit) setValue('ddlPreheatElecHeaterInstallationId', result?.ddlPreheatElecHeaterInstallationId || 1);

    return result.ddlPreheatElecHeaterInstallationDataTbl;
  }, [edit, data, setValue, intProductTypeID, values.ddlLocationId, values.ddlPreheatCompId]);

  const customInputs = useMemo(
    () =>
      getCustomInputsInfo(
        Number(values.ddlPreheatCompId),
        Number(values.ddlCoolingCompId),
        Number(values.ddlHeatingCompId),
        Number(values.ddlReheatCompId),
        Number(intUnitTypeID)
      ),
    [intUnitTypeID, values.ddlCoolingCompId, values.ddlHeatingCompId, values.ddlPreheatCompId, values.ddlReheatCompId]
  );

  const ualInfo = useMemo(() => getUALInfo(Number(localStorage.getItem('UAL'))), []);

  const heatPumpInfo = useMemo(() => getHeatPumpInfo(Number(values.ddlCoolingCompId)), [values.ddlCoolingCompId]);

  const dehumidificationInfo = useMemo(
    () => getDehumidificationInfo(Number(values.ddlCoolingCompId)),
    [values.ddlCoolingCompId]
  );

  const dxCoilRefrigDesignCondInfo = useMemo(
    () => getDXCoilRefrigDesignCondInfo(Number(localStorage.getItem('UAL')), Number(values.ddlCoolingCompId)),
    [values.ddlCoolingCompId]
  );

  const heatElecHeaterInstallationInfo = useMemo(
    () =>
      getHeatElecHeaterInstallationInfo(
        data,
        Number(values.ddlHeatingCompId),
        Number(values.ddlReheatCompId),
        intProductTypeID
      ),
    [data, intProductTypeID, values.ddlHeatingCompId, values.ddlReheatCompId]
  );

  const heatingFluidDesignCondInfo = useMemo(() => {
    const result = getHeatingFluidDesignCondInfo(
      data,
      Number(values.ddlPreheatCompId),
      Number(values.ddlHeatingCompId),
      Number(values.ddlReheatCompId)
    );

    if (!edit) {
      setValue('ddlHeatingFluidTypeId', result?.ddlHeatingFluidTypeId);
      setValue('ddlHeatingFluidConcentrationId', result?.ddlHeatingFluidConcentrationId);
    }

    return result;
  }, [edit, data, setValue, values.ddlHeatingCompId, values.ddlPreheatCompId, values.ddlReheatCompId]);

  const damperAndActuatorInfo = useMemo(() => {
    const result = getDamperAndActuatorInfo(data, Number(intProductTypeID), Number(values.ddlLocationId));
    if (!edit) setValue('ddlDamperAndActuatorId', result?.ddlDamperAndActuatorId);
    return result;
  }, [edit, data, setValue, intProductTypeID, values.ddlLocationId]);

  const elecHeaterVoltageInfo = useMemo(() => {
    const result = getElecHeaterVoltageInfo(
      data,
      Number(values.ddlPreheatCompId),
      Number(values.ddlHeatingCompId),
      Number(values.ddlReheatCompId),
      Number(intProductTypeID),
      Number(intUnitTypeID),
      Number(values.ddlElecHeaterVoltageId),
      Number(values.ddlUnitVoltageId),
      Number(ckbVoltageSPPVal)
    );

    if (!edit) setValue('ddlElecHeaterVoltageId', result?.ddlElecHeaterVoltageId);

    return result;
  }, [
    edit,
    ckbVoltageSPPVal,
    data,
    setValue,
    intProductTypeID,
    intUnitTypeID,
    values.ddlElecHeaterVoltageId,
    values.ddlHeatingCompId,
    values.ddlPreheatCompId,
    values.ddlReheatCompId,
    values.ddlUnitVoltageId,
  ]);

  const valveAndActuatorInfo = useMemo(
    () =>
      getValveAndActuatorInfo(
        Number(values.ddlCoolingCompId),
        Number(values.ddlPreheatCompId),
        Number(values.ddlHeatingCompId),
        Number(values.ddlReheatCompId)
      ),
    [values.ddlCoolingCompId, values.ddlHeatingCompId, values.ddlPreheatCompId, values.ddlReheatCompId]
  );

  const drainPanInfo = useMemo(
    () => getDrainPanInfo(Number(intProductTypeID), Number(intUnitTypeID)),
    [intProductTypeID, intUnitTypeID]
  );

  const handingInfo = useMemo(() => {
    const result = getHandingInfo(data);
    if (!edit) setValue('ddlHandingId', result.ddlHandingId);
    return result;
  }, [edit, data, setValue]);

  const supplyAirOpeningInfo = useMemo(() => {
    const result = getSupplyAirOpeningInfo(
      data,
      Number(intUnitTypeID),
      Number(intProductTypeID),
      Number(values.ddlLocationId),
      Number(values.ddlOrientationId),
      values.ddlSupplyAirOpeningId,
      values.ddlSupplyAirOpeningText,
      Number(values.ddlCoolingCompId),
      Number(values.ddlHeatingCompId),
      Number(values.ddlReheatCompId)
    );

    setValue('ddlSupplyAirOpeningId', result?.ddlSupplyAirOpeningId);
    setValue('ddlSupplyAirOpeningText', result?.ddlSupplyAirOpeningText);
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    edit,
    data,
    setValue,
    intProductTypeID,
    intUnitTypeID,
    values.ddlCoolingCompId,
    values.ddlHeatingCompId,
    values.ddlLocationId,
    values.ddlOrientationId,
    values.ddlReheatCompId,
  ]);

  useEffect(() => {
    if (!values.ddlOrientationId || !values.ddlSupplyAirOpeningText || !intProductTypeID) return;

    const result = getRemainingOpeningsInfo(
      data,
      Number(intUnitTypeID),
      Number(intProductTypeID),
      values.ddlSupplyAirOpeningText,
      Number(values.ddlOrientationId)
    );

    if (!edit) setValue('ddlExhaustAirOpeningId', result?.ddlExhaustAirOpeningId);
    if (!edit) setValue('ddlExhaustAirOpeningText', result?.ddlExhaustAirOpeningText);
    if (!edit) setValue('ddlOutdoorAirOpeningId', result?.ddlOutdoorAirOpeningId);
    if (!edit) setValue('ddlOutdoorAirOpeningText', result?.ddlOutdoorAirOpeningText);
    if (!edit) setValue('ddlReturnAirOpeningId', result?.ddlReturnAirOpeningId);
    if (!edit) setValue('ddlReturnAirOpeningText', result?.ddlReturnAirOpeningText);

    setRemainingOpeningsInfo(result);
  }, [edit, data, setValue, intProductTypeID, intUnitTypeID, values.ddlOrientationId, values.ddlSupplyAirOpeningText]);

  // onChange functions
  const handleBlurSummerSupplyAirCFM = useCallback(
    (e) => {
      const value = getSummerSupplyAirCFM(
        e.target.value,
        getAllFormData(),
        Number(user?.UAL || 0),
        Number(ckbBypassVal)
      );
      setValue('txbSummerSupplyAirCFM', value);
    },
    [ckbBypassVal, getAllFormData, setValue, user?.UAL || 0]
  );

  const handleBlurSummerReturnAirCFM = useCallback(
    (e) => {
      const value = getSummerReturnAirCFM(e.target.value, getAllFormData(), Number(user?.UAL || 0), data);
      setValue('txbSummerReturnAirCFM', value);
    },
    [data, getAllFormData, setValue, user?.UAL || 0]
  );

  const handleBlurSupplyAirESP = useCallback(
    (e) => {
      const value = getSupplyAirESPInfo(e.target.value, intProductTypeID, values.ddlUnitModelId);
      setValue('txbSupplyAirESP', value);
    },
    [setValue, intProductTypeID, values.ddlUnitModelId]
  );

  const handleBlurExhaustAirESP = useCallback(
    (e) => {
      const value = getExhaustAirESP(
        e.target.value,
        intProductTypeID,
        intUnitTypeID,
        values.ddlUnitModelId,
        strUnitModelValue
      );
      setValue('txbExhaustAirESP', value);
    },
    [setValue, strUnitModelValue, intProductTypeID, intUnitTypeID, values.ddlUnitModelId]
  );

  const isAvailable = useCallback((value) => !!value && value.length > 0, []);
  if (edit) setFunction(handleSubmit(onSubmit));

  return (
    <Page title="Project: Edit">
      <RootStyle>
        <Container>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            {isLoading ? (
              <LinearProgress color="info" />
            ) : (
              <Stack spacing={2} sx={{ marginBottom: '150px' }}>
                {edit ? (
                  <Stack direction="row" alignContent="center" justifyContent="center">
                    <Typography variant="h3" color="primary.main">
                      {getValues('txtTag')}
                    </Typography>
                  </Stack>
                ) : (
                  <Stack direction="row" alignContent="center" justifyContent="center">
                    <Typography variant="h3" color="primary.main">
                      {unitTypeData.txbProductType}/{unitTypeData.txbUnitType}
                    </Typography>
                  </Stack>
                )}
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
                          {isAvailable(data.unitType) && (
                            <RHFSelect size="small" name="ddlUnitTypeId" label="Unit Type" placeholder="" disabled>
                              {data.unitType.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.items}
                                </option>
                              ))}
                            </RHFSelect>
                          )}
                          {isAvailable(data?.generalLocation) && (
                            <RHFSelect
                              size="small"
                              name="ddlLocationId"
                              label="Location"
                              placeholder=""
                              onChange={ddlLocationChanged}
                            >
                              {data?.generalLocation.map((item, index) => (
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
                          {isAvailable(data?.generalOrientation) && (
                            <RHFSelect
                              size="small"
                              name="ddlOrientationId"
                              label="Orientation"
                              placeholder=""
                              onChange={ddlOrientationChanged}
                            >
                              {data?.generalOrientation?.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.items}
                                </option>
                              ))}
                            </RHFSelect>
                          )}
                          {isAvailable(data?.controlsPreference) && (
                            <RHFSelect
                              size="small"
                              name="ddlControlsPreferenceId"
                              label="Control Preference"
                              placeholder=""
                              onChange={(e) => {
                                setValue('ddlControlsPreferenceId', parseInt(e.target.value, 10));
                              }}
                            >
                              {data?.controlsPreference?.map((item, index) => (
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
                            onChange={(e) => {
                              setValueWithCheck(e, 'txbSummerSupplyAirCFM');
                            }}
                            onBlur={handleBlurSummerSupplyAirCFM}
                          />
                          <RHFTextField
                            size="small"
                            name="txbSummerReturnAirCFM"
                            label="Exhaust Air (CFM)"
                            sx={getDisplay(!isUnitTypeAHU())}
                            onChange={(e) => {
                              setValueWithCheck(e, 'txbSummerReturnAirCFM');
                            }}
                            onBlur={handleBlurSummerReturnAirCFM}
                          />
                          <RHFTextField
                            size="small"
                            name="txbSupplyAirESP"
                            label="Supply Air ESP (inH2O)"
                            onChange={(e) => {
                              setValueWithCheck(e, 'txbSupplyAirESP');
                            }}
                            onBlur={handleBlurSupplyAirESP}
                          />
                          <RHFTextField
                            size="small"
                            name="txbExhaustAirESP"
                            label="Supply Air ESP(inH2O)"
                            sx={getDisplay(!isUnitTypeAHU())}
                            onChange={(e) => {
                              setValueWithCheck(e, 'txbExhaustAirESP');
                            }}
                            onBlur={handleBlurExhaustAirESP}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={4} md={4}>
                        <Box sx={{ display: 'grid', rowGap: 1, columnGap: 1 }}>
                          <RHFControlCheckbox
                            size="small"
                            name="ckbBypassVal"
                            label="Bypass for Economizer"
                            checked={ckbBypassVal}
                            onChange={() => setCkbBypassVal(!ckbBypassVal)}
                          />
                          {isAvailable(unitModel) && (
                            <RHFSelect
                              size="small"
                              name="ddlUnitModelId"
                              label="Unit Model"
                              onChange={ddlUnitModelChanged}
                            >
                              {unitModel?.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.items}
                                </option>
                              ))}
                            </RHFSelect>
                          )}
                          {isAvailable(unitVoltage) && (
                            <RHFSelect
                              size="small"
                              name="ddlUnitVoltageId"
                              label="Unit Voltage"
                              onChange={ddlUnitVoltageChanged}
                            >
                              {unitVoltage?.map((item, index) => (
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
                            checked={ckbVoltageSPPVal}
                            onChange={() => setCkbVoltageSPPVal(!ckbVoltageSPPVal)}
                          />
                          {isAvailable(QAFilterModel) && (
                            <RHFSelect
                              size="small"
                              name="ddlOA_FilterModelId"
                              label="QA Filter"
                              onChange={(e) => setValue('ddlOA_FilterModelId', parseInt(e.target.value, 10))}
                            >
                              {QAFilterModel?.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.items}
                                </option>
                              ))}
                            </RHFSelect>
                          )}
                          {isAvailable(RAFilterModel) && (
                            <RHFSelect
                              size="small"
                              name="ddlRA_FilterModelId"
                              label="RA Filter"
                              onChange={(e) => setValue('ddlRA_FilterModelId', parseInt(e.target.value, 10))}
                            >
                              {RAFilterModel?.map((item, index) => (
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
                  sx={getDisplay(intProductTypeID !== IDs.intProdTypeVentumLiteID)}
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
                        {isAvailable(dtPreheatComp) && (
                          <RHFSelect
                            size="small"
                            name="ddlPreheatCompId"
                            label="Preheat"
                            sx={getDisplay(intProductTypeID !== IDs.intProdTypeVentumLiteID)}
                            onChange={ddlPreheatCompChanged}
                          >
                            {dtPreheatComp?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        {isAvailable(data?.handing) && (
                          <RHFSelect
                            size="small"
                            name="ddlPreheatCoilHandingId"
                            label="Preheat Coil Handing"
                            sx={getDisplay(Number(getValues('ddlPreheatCompId')) > 0)}
                          >
                            {data?.handing?.map((item, index) => (
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
                          ...getDisplay(values.ddlPreheatCompId === IDs.intCompElecHeaterID),
                        }}
                      >
                        {isAvailable(preheatElecHeaterInstallationInfo) && (
                          <RHFSelect
                            size="small"
                            name="ddlPreheatElecHeaterInstallationId"
                            label="Preheat Elec. Heater Installation"
                            onChange={(e) =>
                              setValue('ddlPreheatElecHeaterInstallationId', parseInt(e.target.value, 10))
                            }
                            placeholder=""
                          >
                            {preheatElecHeaterInstallationInfo?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                      </Stack>
                      <Stack spacing={1} sx={{ ...getDisplay(getValues('ddlPreheatCompId') === IDs.intCompHWC_ID) }}>
                        {isAvailable(data?.fluidType) && (
                          <RHFSelect size="small" name="ddlHeatingFluidTypeId" label="Heating Fluid Type">
                            {data?.fluidType?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        {isAvailable(data.fluidConcentration) && (
                          <RHFSelect size="small" name="ddlHeatingFluidConcentrationId" label="Heating Fluid %">
                            {getItemsAddedOnIDDataTable(
                              data.fluidConcentration,
                              'fluid_type_id',
                              Number(values.ddlHeatingFluidTypeId)
                            )?.map((item, index) => (
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
                      <Stack spacing={1} sx={{ mb: 3 }}>
                        <RHFControlCheckbox
                          size="small"
                          name="ckbPreheatHWC_UseCap"
                          label="Preheat HWC Use Capacity"
                          sx={getDisplay(customInputs.divPreheatHWC_UseCapVisible)}
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
                          sx={getDisplay(customInputs.divPreheatHWC_UseCapVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbPreheatHWC_Cap');
                          }}
                        />
                        <RHFControlCheckbox
                          size="small"
                          name="ckbPreheatHWC_UseFlowRate"
                          label="Preheat HWC Use Flow Rate"
                          sx={getDisplay(customInputs.divPreheatHWC_UseFlowRateVisible)}
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
                          sx={getDisplay(customInputs.divPreheatHWC_UseFlowRateVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbPreheatHWC_FlowRate');
                          }}
                        />
                      </Stack>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  expanded={expanded.panel3}
                  sx={getDisplay(intProductTypeID !== IDs.intProdTypeVentumLiteID)}
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
                        {isAvailable(dtCoolingComp) && (
                          <RHFSelect
                            size="small"
                            name="ddlCoolingCompId"
                            label="Cooling"
                            onChange={ddlCoolingCompChanged}
                          >
                            {dtCoolingComp?.map((item, index) => (
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
                          sx={getDisplay(
                            Number(values.ddlCoolingCompId) === IDs.intCompCWC_ID ||
                              Number(values.ddlCoolingCompId) === IDs.intCompDX_ID
                          )}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbSummerCoolingSetpointDB');
                          }}
                        />
                        <RHFTextField
                          size="small"
                          name="txbSummerCoolingSetpointWB"
                          label="Cooling LAT Setpoint WB (F):"
                          autoComplete="off"
                          sx={getDisplay(
                            Number(values.ddlCoolingCompId) === IDs.intCompCWC_ID ||
                              Number(values.ddlCoolingCompId) === IDs.intCompDX_ID
                          )}
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
                        {isAvailable(data.handing) && (
                          <RHFSelect
                            size="small"
                            name="ddlCoolingCoilHandingId"
                            label="Cooling Coil Handing"
                            sx={getDisplay(Number(values.ddlCoolingCompId) > 1)}
                            onChange={(e) => setValue('ddlCoolingCoilHandingId', parseInt(e.target.value, 10))}
                          >
                            {data.handing?.map((item, index) => (
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
                      <Stack spacing={1} sx={{ ...getDisplay(Number(values.ddlCoolingCompId) === IDs.intCompCWC_ID) }}>
                        {isAvailable(data.fluidType) && (
                          <RHFSelect size="small" name="ddlCoolingFluidTypeId" label="Cooling Fluid Type">
                            {data.fluidType?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        {isAvailable(data.fluidConcentration) && (
                          <RHFSelect size="small" name="ddlCoolingFluidConcentrationId" label="Cooling Fluid %">
                            {getItemsAddedOnIDDataTable(
                              data.fluidConcentration,
                              'fluid_type_id',
                              Number(values.ddlCoolingFluidTypeId)
                            )?.map((item, index) => (
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

                      <Stack spacing={1}>
                        <RHFControlCheckbox
                          size="small"
                          name="ckbCoolingCWC_UseCap"
                          label="Cooling CWC Use Capacity"
                          sx={{ ...getDisplay(customInputs.divCoolingCWC_UseCapVisible), margin: 0 }}
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
                          sx={getDisplay(customInputs.divCoolingCWC_UseCapVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbCoolingCWC_Cap');
                          }}
                        />
                        <RHFControlCheckbox
                          size="small"
                          name="ckbCoolingCWC_UseFlowRate"
                          label="Cooling CWC Use Flow Rate"
                          sx={getDisplay(customInputs.divCoolingCWC_UseFlowRateVisible)}
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
                          sx={getDisplay(customInputs.divCoolingCWC_UseFlowRateVisible)}
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
                  sx={getDisplay(intProductTypeID !== IDs.intProdTypeVentumLiteID)}
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
                        {isAvailable(dtHeatingComp) && (
                          <RHFSelect
                            size="small"
                            name="ddlHeatingCompId"
                            label="Heating"
                            sx={getDisplay(intProductTypeID !== IDs.intProdTypeVentumLiteID)}
                            onChange={ddlHeatingCompChanged}
                          >
                            {dtHeatingComp?.map((item, index) => (
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
                          sx={getDisplay(
                            Number(values.ddlHeatingCompId) === IDs.intCompElecHeaterID ||
                              Number(values.ddlHeatingCompId) === IDs.intCompHWC_ID ||
                              ckbHeatPumpVal === 1
                          )}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbWinterHeatingSetpointDB');
                          }}
                        />
                        {isAvailable(data.handing) && (
                          <RHFSelect
                            size="small"
                            name="ddlHeatingCoilHandingId"
                            label="Heating Coil Handing"
                            sx={getDisplay(Number(values.ddlHeatingCompId) > 1 || Number(values.ddlReheatCompId) > 1)}
                            onChange={(e) => setValue('ddlHeatingCoilHandingId', parseInt(e.target.value, 10))}
                          >
                            {data.handing?.map((item, index) => (
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

                      <Stack spacing={1} sx={{ ...getDisplay(getValues('ddlHeatingCompId') === IDs.intCompHWC_ID) }}>
                        {isAvailable(data.fluidType) && (
                          <RHFSelect size="small" name="ddlHeatingFluidTypeId" label="Heating Fluid Type">
                            {data.fluidType?.map((item, index) => (
                              <option key={index} value={item.id}>
                                {item.items}
                              </option>
                            ))}
                          </RHFSelect>
                        )}
                        {isAvailable(data.fluidType && data.fluidConcentration) && (
                          <RHFSelect size="small" name="ddlHeatingFluidConcentrationId" label="Heating Fluid %">
                            {getItemsAddedOnIDDataTable(
                              data.fluidConcentration,
                              'fluid_type_id',
                              Number(values.ddlHeatingFluidTypeId)
                            )?.map((item, index) => (
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
                        sx={{ ...getDisplay(ualInfo.divCustomVisible && customInputs.divHeatingHWC_Visible) }}
                      >
                        <RHFControlCheckbox
                          size="small"
                          name="ckbHeatingHWC_UseCap"
                          label="Heating HWC Use Capacity"
                          sx={getDisplay(customInputs.divHeatingHWC_UseCapVisible)}
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
                          sx={getDisplay(customInputs.divHeatingHWC_UseCapVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbHeatingHWC_Cap');
                          }}
                        />
                        <RHFControlCheckbox
                          size="small"
                          name="ckbHeatingHWC_UseFlowRate"
                          label="Heating HWC Use Flow Rate"
                          sx={getDisplay(customInputs.divHeatingHWC_UseFlowRateVisible)}
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
                          sx={getDisplay(customInputs.divHeatingHWC_UseFlowRateVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbHeatingHWC_FlowRate');
                          }}
                        />
                      </Stack>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  sx={getDisplay(ckbDehumidificationVal)}
                  expanded={expanded.panel5}
                  onChange={() => setExpanded({ ...expanded, panel5: !expanded.panel5 })}
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
                        {isAvailable(dtReheatComp) && (
                          <RHFSelect
                            size="small"
                            name="ddlReheatCompId"
                            label="Reheat"
                            placeholder=""
                            sx={getDisplay(ckbDehumidificationVal)}
                            onChange={ddlReheatCompChanged}
                          >
                            {dtReheatComp?.map((item, index) => (
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
                          sx={getDisplay(
                            values.ddlHeatingCompId === IDs.intCompElecHeaterID ||
                              values.ddlHeatingCompId === IDs.intCompHWC_ID ||
                              ckbHeatPumpVal
                          )}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbSummerReheatSetpointDB');
                          }}
                        />
                      </Stack>
                      <Stack
                        spacing={1}
                        sx={{ ...getDisplay(ckbHeatPumpVal || values.ddlReheatCompId === IDs.intCompHGRH_ID) }}
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
                        sx={{ ...getDisplay(ualInfo.divCustomVisible && customInputs.divReheatHWC_Visible) }}
                      >
                        <RHFControlCheckbox
                          size="small"
                          name="ckbReheatHWC_UseCap"
                          label="Reheat HWC Use Capacity"
                          sx={getDisplay(customInputs.divReheatHWC_UseCapVisible)}
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
                          sx={getDisplay(customInputs.divReheatHWC_UseCapVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbReheatHWC_Cap');
                          }}
                        />
                        <RHFControlCheckbox
                          size="small"
                          name="ckbReheatHWC_UseFlowRate"
                          label="Reheat HWC Use Flow Rate"
                          sx={getDisplay(customInputs.divReheatHWC_UseFlowRateVisible)}
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
                          sx={getDisplay(customInputs.divReheatHWC_UseFlowRateVisible)}
                          onChange={(e) => {
                            setValueWithCheck(e, 'txbReheatHWC_FlowRate');
                          }}
                        />
                      </Stack>
                      <Stack spacing={1} sx={{ ...getDisplay(getValues('ddlReheatCompId') === IDs.intCompHWC_ID) }}>
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
                        <RHFSelect
                          size="small"
                          name="ddlValveTypeId"
                          sx={getDisplay(
                            values.ddlPreheatCompId === IDs.intCompHWC_ID ||
                              values.ddlCoolingCompId === IDs.intCompHWC_ID ||
                              values.ddlHeatingCompId === IDs.intCompHWC_ID ||
                              values.ddlReheatCompId === IDs.intCompHWC_ID
                          )}
                          label="Valve Type"
                        >
                          {data.valveType?.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.items}
                            </option>
                          ))}
                        </RHFSelect>
                      </Stack>
                    </Box>
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
                  expanded={expanded.panel8}
                  onChange={() => setExpanded({ ...expanded, panel8: !expanded.panel8 })}
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
                      {edit ? 'Update Unit' : 'Add New Unit'}
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
