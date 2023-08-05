import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useUnitEditFormSchema } from '../../hooks/useUnitEditForm';
import useAuth from '../../hooks/useAuth';
// redux
import { useSelector, useDispatch } from '../../redux/store';
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
// config
import * as IDs from '../../config';
import {
  getComponentInfo,
  getPreheatElecHeaterInstallationInfo,
  getExhaustAirESP,
  getSummerReturnAirCFM,
  getSummerSupplyAirCFM,
  getSupplyAirESPInfo,
  getUnitModel,
  getUnitVoltage,
  getItemsAddedOnIDDataTable,
  getCustomInputsInfo,
  getUALInfo,
  getHeatPumpInfo,
  getDehumidificationInfo,
  getDXCoilRefrigDesignCondInfo,
  getHeatElecHeaterInstallationInfo,
  getHeatingFluidDesignCondInfo,
  getDamperAndActuatorInfo,
  getElecHeaterVoltageInfo,
  getValveAndActuatorInfo,
  getDrainPanInfo,
  getHandingInfo,
  getSupplyAirOpeningInfo,
  getRemainingOpeningsInfo,
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
  unitTypeData: PropTypes.object,
  setIsAddedNewUnit: PropTypes.func,
  isAddedNewUnit: PropTypes.bool,
};

export default function UnitInfo({ unitTypeData, setIsAddedNewUnit, isAddedNewUnit }) {
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const { controlInfo, unitInfo } = useSelector((state) => state.unit);
  const { user } = useAuth();
  const { data } = useSelector((state) => state.base);
  const isResetCalled = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [remainingOpeningsInfo, setRemainingOpeningsInfo] = useState([]);

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

  const {
    locationInfo,
    controlsPreferenceInfo,
    damperAndActuatorInfo,
    summerSupplyAirCFMInfo,
    summerReturnAirCFMInfo,
    orientationInfo,
    bypassInfo,
    unitVoltageInfo,
    supplyAirESPInfo,
    returnAirESPInfo,
    outdoorAirFilterInfo,
    returnAirFilterInfo,
    componentInfo,
    controlsPreferenceInfo,
    coolingFluidDesignCondInfo,
    reheatInfo,
    elecHeaterVoltageInfo,
    preheatElecHeaterInstallationInfo,
    heatElecHeaterInstallationInfo,
    valveAndActuatorInfo,
    drainPanInfo,
    setpointsInfo,
    preheatSetpointInfo,
    heatingSetpointInfo,
    coolingSetpointInfo,
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
    outdoorAirFilterInfo,
    returnAirFilterInfo,
    reheatSetpointInfo,
    remainingOpeningsInfo,
  } = controlInfo;

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
      txtTag: '',
      txbQty: 0,
      ddlLocationId: locationInfo?.ddlLocationId,
      ddlOrientationId: orientationInfo?.ddlOrientationId,
      ddlUnitTypeId: unitTypeInfo?.ddlUnitTypeId,
      ddlControlsPreferenceId: controlsPreferenceInfo?.ddlControlsPreferenceId,
      txbSummerSupplyAirCFM: summerSupplyAirCFMInfo?.txbSummerSupplyAirCFM,
      txbSummerReturnAirCFM: summerReturnAirCFMInfo?.txbSummerReturnAirCFM,
      txbSupplyAirESP: 0.75,
      txbExhaustAirESP: 0.75,
      ddlUnitModelId: 0,
      ddlUnitVoltageId: 0,
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
      ddlReheatCompId: reheatInfo?.ddlReheatCompId,
      ddlDamperAndActuatorId: 0,
      ddlElecHeaterVoltageId: 0,
      ddlPreheatElecHeaterInstallationId: 0,
      ddlHeatElecHeaterInstallationId: 0,
      ddlPreheatCoilHandingId: 0,
      ddlCoolingCoilHandingId: 0,
      ddlHeatingCoilHandingId: 0,
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
      ddlHeatingFluidTypeId: 0,
      ddlHeatingFluidConcentrationId: 0,
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
      ddlHandingId: 0,
      ddlSupplyAirOpeningId: 0,
      ddlSupplyAirOpeningText: '',
      ddlExhaustAirOpeningId: 0,
      ddlExhaustAirOpeningText: '',
      ddlOutdoorAirOpeningId: 0,
      ddlOutdoorAirOpeningText: '',
      ddlReturnAirOpeningId: 0,
      ddlReturnAirOpeningText: '',
      layoutImage: {},
    }),
    [
      componentInfo?.ddlCoolingCompId,
      componentInfo?.ddlHeatExchCompId,
      componentInfo?.ddlHeatingCompId,
      componentInfo?.ddlPreheatCompId,
      controlsPreferenceInfo?.ddlControlsPreferenceId,
      coolingFluidDesignCondInfo?.ddlCoolingFluidConcentrationId,
      coolingFluidDesignCondInfo?.ddlCoolingFluidTypeId,
      locationInfo?.ddlLocationId,
      orientationInfo?.ddlOrientationId,
      outdoorAirFilterInfo?.ddlOA_FilterModelId,
      reheatInfo?.ddlReheatCompId,
      returnAirFilterInfo?.ddlRA_FilterModelId,
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
      valveTypeInfo?.ddlValveTypeId,
    ]
  );

  const methods = useForm({
    resolver: yupResolver(useUnitEditFormSchema),
    defaultValues,
  });

  const {
    setValue,
    getValues,
    reset,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const { strUnitModelValue } = useMemo(() => {
    let unitModel = [];

    switch (Number(unitTypeData.intProductTypeID)) {
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
    return getUnitModelCodes(
      unitModel[0].value.toString(),
      unitTypeData.intProductTypeID,
      unitTypeData.intUnitTypeID,
      values.ddlLocationId,
      values.ddlOrientationId,
      Number(ckbBypassVal),
      data
    );
  }, [
    ckbBypassVal,
    data,
    unitTypeData.intProductTypeID,
    unitTypeData.intUnitTypeID,
    values.ddlLocationId,
    values.ddlOrientationId,
  ]);

  useEffect(() => {
    if (!isLoading && !isResetCalled.current) {
      reset(defaultValues);
      isResetCalled.current = true;
    }
  }, [isLoading, reset, defaultValues]);

  const getDisplay = useCallback((key) => ({ display: key ? 'block' : 'none' }), []);

  const getAllFormData = useCallback(
    () => ({
      ...getValues(),
      intProjectID: projectId,
      intUnitNo: 0,
      intProductTypeID: unitTypeData.intProductTypeID,
      intUnitTypeID: unitTypeData.intUnitTypeID,
      ddlUnitTypeId: unitTypeData.intUnitTypeID,
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
      ckbBypassVal,
      ckbDehumidificationVal,
      ckbDownshotVal,
      ckbDrainPanVal,
      ckbFlowRateAndCap,
      ckbHeatPumpVal,
      ckbValveAndActuatorVal,
      ckbVoltageSPPVal,
      getValues,
      projectId,
      unitTypeData.intProductTypeID,
      unitTypeData.intUnitTypeID,
    ]
  );

  // handle submit
  const onSubmit = useCallback(async () => {
    try {
      const intUnitNo = await dispatch(unitReducer.saveUnitInfo(getAllFormData()));
      setOpenSuccess(true);
      setIsAddedNewUnit(intUnitNo);
    } catch (e) {
      console.log(e);
      setOpenError(true);
    }
  }, [dispatch, getAllFormData, setIsAddedNewUnit]);

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

  const isUnitTypeAHU = useCallback(
    () => unitTypeData.intProductTypeID === IDs.intUnitTypeAHU_ID,
    [unitTypeData.intProductTypeID]
  );

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

  const unitModel = useMemo(() => {
    const { unitModel, summerSupplyAirCFM } = getUnitModel(
      data,
      Number(unitTypeData.intUnitTypeID),
      Number(unitTypeData.intProductTypeID),
      Number(values.ddlUnitModelId),
      Number(values.ddlLocationId),
      Number(values.ddlOrientationId),
      values.txbSummerSupplyAirCFM,
      Number(ckbBypassVal),
      Number(user.UAL)
    );

    if (unitModel.length > 0 && unitModel.filter((item) => item.id === Number(values.ddlUnitModelId)).length <= 0) {
      setValue('ddlUnitModelId', unitModel?.[1]?.id);
    }
    if (summerSupplyAirCFM && values.txbSummerSupplyAirCFM === summerSupplyAirCFM.toString()) {
      setValue('txbSummerSupplyAirCFM', summerSupplyAirCFM.toString());
    }

    return unitModel;
  }, [
    data,
    unitTypeData.intUnitTypeID,
    unitTypeData.intProductTypeID,
    values.ddlUnitModelId,
    values.ddlLocationId,
    values.ddlOrientationId,
    values.txbSummerSupplyAirCFM,
    ckbBypassVal,
    user.UAL,
    setValue,
  ]);

  const unitVoltage = useMemo(() => {
    const { unitVoltage, ddlUnitVoltageId } = getUnitVoltage(data, getAllFormData(), strUnitModelValue);
    setValue('ddlUnitVoltageId', ddlUnitVoltageId);
    return unitVoltage;
  }, [data, getAllFormData, setValue, strUnitModelValue]);

  const QAFilterModel = useMemo(
    () => data.filterModel?.filter((item) => item.outdoor_air === 1 || item.id === values.ddlOA_FilterModelId),
    [data, values]
  );

  const RAFilterModel = useMemo(
    () => data.filterModel?.filter((item) => item.return_air === 1 || item.id === values.ddlOA_FilterModelId),
    [data, values]
  );

  const { dtPreheatComp, dtCoolingComp, dtHeatingComp, dtReheatComp } = useMemo(
    () => getComponentInfo(data, Number(unitTypeData.intProductTypeID), Number(unitTypeData.intUnitTypeID)),
    [data, unitTypeData.intProductTypeID, unitTypeData.intUnitTypeID]
  );

  const preheatElecHeaterInstallationInfo = useMemo(() => {
    const result = getPreheatElecHeaterInstallationInfo(
      data,
      Number(values.ddlPreheatCompId),
      Number(values.ddlLocationId),
      unitTypeData.intProductTypeID
    );

    setValue('ddlPreheatElecHeaterInstallationId', result?.ddlPreheatElecHeaterInstallationId);

    return result.ddlPreheatElecHeaterInstallationDataTbl;
  }, [data, setValue, unitTypeData.intProductTypeID, values.ddlLocationId, values.ddlPreheatCompId]);

  const customInputs = useMemo(
    () =>
      getCustomInputsInfo(
        Number(values.ddlPreheatCompId),
        Number(values.ddlCoolingCompId),
        Number(values.ddlHeatingCompId),
        Number(values.ddlReheatCompId),
        Number(unitTypeData.intUnitTypeID)
      ),
    [
      unitTypeData.intUnitTypeID,
      values.ddlCoolingCompId,
      values.ddlHeatingCompId,
      values.ddlPreheatCompId,
      values.ddlReheatCompId,
    ]
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
        unitTypeData.intProductTypeID
      ),
    [data, unitTypeData.intProductTypeID, values.ddlHeatingCompId, values.ddlReheatCompId]
  );

  const heatingFluidDesignCondInfo = useMemo(() => {
    const result = getHeatingFluidDesignCondInfo(
      data,
      Number(values.ddlPreheatCompId),
      Number(values.ddlHeatingCompId),
      Number(values.ddlReheatCompId)
    );

    setValue('ddlHeatingFluidTypeId', result?.ddlHeatingFluidTypeId);
    setValue('ddlHeatingFluidConcentrationId', result?.ddlHeatingFluidConcentrationId);

    return result;
  }, [data, setValue, values.ddlHeatingCompId, values.ddlPreheatCompId, values.ddlReheatCompId]);

  const damperAndActuatorInfo = useMemo(() => {
    const result = getDamperAndActuatorInfo(data, Number(unitTypeData.intProductTypeID), Number(values.ddlLocationId));
    setValue('ddlDamperAndActuatorId', result?.ddlDamperAndActuatorId);
    return result;
  }, [data, setValue, unitTypeData.intProductTypeID, values.ddlLocationId]);

  const elecHeaterVoltageInfo = useMemo(() => {
    const result = getElecHeaterVoltageInfo(
      data,
      Number(values.ddlPreheatCompId),
      Number(values.ddlHeatingCompId),
      Number(values.ddlReheatCompId),
      Number(unitTypeData.intProductTypeID),
      Number(unitTypeData.intUnitTypeID),
      Number(values.ddlElecHeaterVoltageId),
      Number(values.ddlUnitVoltageId),
      Number(ckbVoltageSPPVal)
    );

    setValue('ddlElecHeaterVoltageId', result?.ddlElecHeaterVoltageId);

    return result;
  }, [
    ckbVoltageSPPVal,
    data,
    setValue,
    unitTypeData.intProductTypeID,
    unitTypeData.intUnitTypeID,
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
    () => getDrainPanInfo(Number(unitTypeData.intProductTypeID), Number(unitTypeData.intUnitTypeID)),
    [unitTypeData.intProductTypeID, unitTypeData.intUnitTypeID]
  );

  const handingInfo = useMemo(() => {
    const result = getHandingInfo(data);
    setValue('ddlHandingId', result.ddlHandingId);
    return result;
  }, [data, setValue]);

  const supplyAirOpeningInfo = useMemo(() => {
    const result = getSupplyAirOpeningInfo(
      data,
      Number(unitTypeData.intUnitTypeID),
      Number(unitTypeData.intProductTypeID),
      Number(values.ddlLocationId),
      Number(values.ddlOrientationId),
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
    data,
    setValue,
    unitTypeData.intProductTypeID,
    unitTypeData.intUnitTypeID,
    values.ddlCoolingCompId,
    values.ddlHeatingCompId,
    values.ddlLocationId,
    values.ddlOrientationId,
    values.ddlReheatCompId,
  ]);

  useEffect(() => {
    if (!values.ddlOrientationId || !values.ddlSupplyAirOpeningText || !unitTypeData.intProductTypeID) return;

    const result = getRemainingOpeningsInfo(
      data,
      Number(unitTypeData.intUnitTypeID),
      Number(unitTypeData.intProductTypeID),
      values.ddlSupplyAirOpeningText,
      Number(values.ddlOrientationId)
    );

    setValue('ddlExhaustAirOpeningId', result?.ddlExhaustAirOpeningId);
    setValue('ddlExhaustAirOpeningText', result?.ddlExhaustAirOpeningText);
    setValue('ddlOutdoorAirOpeningId', result?.ddlOutdoorAirOpeningId);
    setValue('ddlOutdoorAirOpeningText', result?.ddlOutdoorAirOpeningText);
    setValue('ddlReturnAirOpeningId', result?.ddlReturnAirOpeningId);
    setValue('ddlReturnAirOpeningText', result?.ddlReturnAirOpeningText);

    setRemainingOpeningsInfo(result);
  }, [
    data,
    setValue,
    unitTypeData.intProductTypeID,
    unitTypeData.intUnitTypeID,
    values.ddlOrientationId,
    values.ddlSupplyAirOpeningText,
  ]);

  // onChange functions
  const handleBlurSummerSupplyAirCFM = useCallback(
    (e) => {
      const value = getSummerSupplyAirCFM(e.target.value, getAllFormData(), Number(user.UAL), Number(ckbBypassVal));
      setValue('txbSummerSupplyAirCFM', value);
    },
    [ckbBypassVal, getAllFormData, setValue, user.UAL]
  );

  const handleBlurSummerReturnAirCFM = useCallback(
    (e) => {
      const value = getSummerReturnAirCFM(e.target.value, getAllFormData(), Number(user.UAL), data);
      setValue('txbSummerReturnAirCFM', value);
    },
    [data, getAllFormData, setValue, user.UAL]
  );

  const handleBlurSupplyAirESP = useCallback(
    (e) => {
      const value = getSupplyAirESPInfo(e.target.value, unitTypeData.intProductTypeID, values.ddlUnitModelId);
      setValue('txbSupplyAirESP', value);
    },
    [setValue, unitTypeData.intProductTypeID, values.ddlUnitModelId]
  );

  const handleBlurExhaustAirESP = useCallback(
    (e) => {
      const value = getExhaustAirESP(
        e.target.value,
        unitTypeData.intProductTypeID,
        unitTypeData.intUnitTypeID,
        values.ddlUnitModelId,
        strUnitModelValue
      );
      setValue('txbExhaustAirESP', value);
    },
    [setValue, strUnitModelValue, unitTypeData.intProductTypeID, unitTypeData.intUnitTypeID, values.ddlUnitModelId]
  );

  const isAvailable = useCallback((value) => !!value && value.length > 0, []);

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
                            sx={getDisplay(!!bypassInfo?.divUnitBypassVisible)}
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
                            sx={getDisplay(unitVoltageInfo.divVoltageSPPVisible)}
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
                              sx={getDisplay(returnAirFilterInfo.divRA_FilterModelVisible)}
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
                            sx={getDisplay(unitTypeData.intProductTypeID !== IDs.intProdTypeVentumLiteID)}
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
                  sx={getDisplay(unitTypeData.intProductTypeID !== IDs.intProdTypeVentumLiteID)}
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
                        {isAvailable(coolingFluidDesignCondInfo.ddlCoolingFluidConcentrationDataTbl) && (
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
                            sx={getDisplay(unitTypeData.intProductTypeID !== IDs.intProdTypeVentumLiteID)}
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
                          sx={getDisplay(reheatSetpointInfo.divReheatSetpointVisible)}
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
