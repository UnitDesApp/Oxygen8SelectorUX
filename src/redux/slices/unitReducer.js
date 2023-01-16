import { createSlice } from '@reduxjs/toolkit';
// utils
// import axios from '../../utils/axios';
// FileSaveer
import { saveAs } from 'file-saver';
// store
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: true,
  productTypeDataTbl: [],
  unitTypeDataTbl: [],
  productTypeUnitTypeLinkDataTbl: [],
  controlInfo: {},
  unitInfo: {},
  layoutInfo: {},
  visibleInfo: {},
  viewSelectionInfo: {},
};

const UnitSlice = createSlice({
  name: 'unit',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setJobInfo(state, actions) {
      state.productTypeDataTbl = actions.payload.productTypeDataTbl;
      state.unitTypeDataTbl = actions.payload.unitTypeDataTbl;
      state.productTypeUnitTypeLinkDataTbl = actions.payload.productTypeUnitTypeLinkDataTbl;
      state.isLoading = false;
    },
    setInitInfo(state, actions) {
      const { controlInfo, unitInfo } = actions.payload;
      state.controlInfo = {
        ualInfo: controlInfo.ualInfo,
        locationInfo: controlInfo.locationInfo,
        downshotInfo: controlInfo.downshotInfo,
        orientationInfo: controlInfo.orientationInfo,
        controlsPreferenceInfo: controlInfo.controlsPreferenceInfo,
        unitTypeInfo: controlInfo.unitTypeInfo,
        unitModelInfo: controlInfo.unitModelInfo,
        unitVoltageInfo: controlInfo.unitVoltageInfo,
        unitVoltageSPPInfo: controlInfo.unitVoltageSPPInfo,
        bypassInfo: controlInfo.bypassInfo,
        summerSupplyAirCFMInfo: controlInfo.summerSupplyAirCFMInfo,
        summerReturnAirCFMInfo: controlInfo.summerReturnAirCFMInfo,
        supplyAirESPInfo: controlInfo.supplyAirESPInfo,
        returnAirESPInfo: controlInfo.returnAirESPInfo,
        outdoorAirFilterInfo: controlInfo.outdoorAirFilterInfo,
        returnAirFilterInfo: controlInfo.returnAirFilterInfo,
        preheatRequiredInfo: controlInfo.preheatRequiredInfo,
        componentInfo: controlInfo.componentInfo,
        heatPumpInfo: controlInfo.heatPumpInfo,
        dehumidificationInfo :controlInfo.dehumidificationInfo,
        reheatInfo :controlInfo.reheatInfo,
        damperAndActuatorInfo :controlInfo.damperAndActuatorInfo,
        elecHeaterVoltageInfo : controlInfo.elecHeaterVoltageInfo,
        preheatElecHeaterInstallationInfo :  controlInfo.preheatElecHeaterInstallationInfo,
        heatElecHeaterInstallationInfo: controlInfo.heatElecHeaterInstallationInfo,
        valveAndActuatorInfo : controlInfo.valveAndActuatorInfo,
        drainPanInfo : controlInfo.drainPanInfo,
        setpointsInfo :controlInfo.setpointsInfo,
        preheatSetpointInfo :controlInfo.preheatSetpointInfo,
        coolingSetpointInfo :controlInfo.coolingSetpointInfo,
        heatingSetpointInfo : controlInfo.heatingSetpointInfo,
        reheatSetpointInfo:  controlInfo.reheatSetpointInfo,
        customInputsInfo: controlInfo.customInputsInfo, 
        coolingFluidDesignCondInfo:  controlInfo.coolingFluidDesignCondInfo,
        heatingFluidDesignCondInfo : controlInfo.heatingFluidDesignCondInfo,
        dxCoilRefrigDesignCondInfo:  controlInfo.dxCoilRefrigDesignCondInfo,
        condCoilRefrigDesignCondInfo: controlInfo.condCoilRefrigDesignCondInfo,
        handingInfo: controlInfo.handingInfo,
        preheatCoilHandingInfo: controlInfo.preheatCoilHandingInfo,
        coolingCoilHandingInfo: controlInfo.coolingCoilHandingInfo,
        heatingCoilHandingInfo: controlInfo.heatingCoilHandingInfo,
        valveTypeInfo: controlInfo.valveTypeInfo,
        supplyAirOpeningInfo:  controlInfo.supplyAirOpeningInfo,
        remainingOpeningsInfo:  controlInfo.remainingOpeningsInfo,
      };
      state.unitInfo = {
        ...unitInfo,
        ddlHandingId: unitInfo.isLayout && unitInfo.ddlHandingId !== 0 ? unitInfo.ddlHandingId : 1,
        ddlSupplyAirOpeningId:
          unitInfo.isLayout && unitInfo.ddlSupplyAirOpeningId !== 0 ? unitInfo.ddlSupplyAirOpeningId : 1,
        ddlSupplyAirOpeningText:
          unitInfo.isLayout && unitInfo.ddlSupplyAirOpeningText !== '' ? unitInfo.ddlSupplyAirOpeningText : '1',
        ddlExhaustAirOpeningId:
          unitInfo.isLayout && unitInfo.ddlExhaustAirOpeningId!== 0 ? unitInfo.ddlExhaustAirOpeningId : 1,
        ddlExhaustAirOpeningText:
          unitInfo.isLayout && unitInfo.ddlExhaustAirOpeningText !== '' ? unitInfo.ddlExhaustAirOpeningText : '2',
        ddlOutdoorAirOpeningId:
          unitInfo.isLayout && unitInfo.ddlOutdoorAirOpeningId !== 0 ? unitInfo.ddlOutdoorAirOpeningId : 1,
        ddlOutdoorAirOpeningText:
          unitInfo.isLayout && unitInfo.ddlOutdoorAirOpeningText !== '' ? unitInfo.ddlOutdoorAirOpeningText : '4',
        ddlReturnAirOpeningId:
          unitInfo.isLayout && unitInfo.ddlReturnAirOpeningId !== 0 ? unitInfo.ddlReturnAirOpeningId: 1,
        ddlReturnAirOpeningText:
          unitInfo.isLayout && unitInfo.ddlReturnAirOpeningText !== '' ? unitInfo.ddlReturnAirOpeningText : '3',
        ddlSupplyAirOpeningDataTbl: unitInfo.ddlSupplyAirOpeningDataTbl,
        ddlOutdoorAirOpeningDataTbl: unitInfo.ddlOutdoorAirOpeningDataTbl,
        ddlExhaustAirOpeningDataTbl: unitInfo.ddlExhaustAirOpeningDataTbl,
        ddlReturnAirOpeningDataTbl: unitInfo.ddlReturnAirOpeningDataTbl,
      };
      state.layoutInfo = {
        // ddlHandingDataTbl: controlInfo.ddlHandingDataTbl,
        // ddlHandingId: controlInfo.ddlHandingDataTbl[0].id,
        // ddlSupplyAirOpeningDataTbl: controlInfo.ddlSupplyAirOpeningDataTbl,
        // ddlSupplyAirOpeningText: controlInfo.ddlSupplyAirOpeningText,
        // ddlSupplyAirOpeningId: controlInfo.ddlSupplyAirOpeningId,
        // ddlExhaustAirOpeningDataTbl: controlInfo.ddlExhaustAirOpeningDataTbl,
        // ddlExhaustAirOpeningText: controlInfo.ddlExhaustAirOpeningText,
        // ddlExhaustAirOpeningId: controlInfo.ddlExhaustAirOpeningId,
        // ddlOutdoorAirOpeningDataTbl: controlInfo.ddlOutdoorAirOpeningDataTbl,
        // ddlOutdoorAirOpeningText: controlInfo.ddlOutdoorAirOpeningText,
        // ddlOutdoorAirOpeningId: controlInfo.ddlOutdoorAirOpeningId,
        // ddlReturnAirOpeningDataTbl: controlInfo.ddlReturnAirOpeningDataTbl,
        // ddlReturnAirOpeningText: controlInfo.ddlReturnAirOpeningText,
        // ddlReturnAirOpeningId: controlInfo.ddlReturnAirOpeningId,
      };
      state.isLoading = false;
    },
    ddlLocationChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        orientationInfo: data.orientationInfo,
        downshotInfo: data.downshotInfo,
        unitModelInfo: data.unitModelInfo,
        damperAndActuatorInfo: data.damperAndActuatorInfo,
        elecHeaterVoltageInfo: data.elecHeaterVoltageInfo,
        preheatElecHeaterInstallationInfo: data.preheatElecHeaterInstallationInfo,
        bypassInfo: data.bypassInfo,
        supplyAirOpeningInfo: data.supplyAirOpeningInfo,
      };
    },
    ddlOrientationChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        unitModelInfo: data.unitModelInfo,
        bypassInfo: data.bypassInfo,
        supplyAirOpeningInfo: data.others.supplyAirOpeningInfo,
      };
    },
    txbSummerSupplyAirCFMChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        summerSupplyAirCFMInfo: data.summerSupplyAirCFMInfo,
        orientationInfo: data.orientationInfo,
        unitModelInfo: data.unitModelInfo,
        bypassInfo: data.bypassInfo,
        supplyAirOpeningInfo: data.supplyAirOpeningInfo,
        remainingOpeningsInfo: data.remainingOpeningsInfo,
      };
    },
    txbSummerReturnAirCFMChanged(state, actions) {
      state.controlInfo = {
        ...state.controlInfo,
        summerReturnAirCFMInfo: actions.payload.summerReturnAirCFMInfo,
      };
    },
    txbSupplyAirESPChanged(state, actions) {
      state.controlInfo = {
        ...state.controlInfo,
        supplyAirOpeningInfo: actions.payload,
      };
    },
    txbExhaustAirESPChanged(state, actions) {
      state.controlInfo = {
        ...state.controlInfo,
        exhaustAirESPInfo: actions.payload,
      };
    },
    ddlUnitModelChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        unitVoltageInfo: data.unitVoltageInfo,
        supplyAirESPInfo: data.supplyAirESPInfo,
        exhaustAirESPInfo: data.exhaustAirESPInfo,
        elecHeaterVoltageInfo: data.elecHeaterVoltageInfo,
        bypassInfo: data.bypassInfo,
      };
    },
    ddlPreheatCompChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        preheatRequiredInfo: data.preheatRequiredInfo,
        elecHeaterVoltageInfo: data.elecHeaterVoltageInfo,
        preheatElecHeaterInstallationInfo: data.preheatElecHeaterInstallationInfo,
        valveAndActuatorInfo: data.valveAndActuatorInfo,
        preheatCoilHandingInfo: data.preheatCoilHandingInfo,
        valveTypeInfo: data.valveTypeInfo,
        preheatSetpointInfo: data.preheatSetpointInfo,
        setpointsInfo: data.setpointsInfo,
        customInputsInfo: data.customInputsInfo,
        heatingFluidDesignCondInfo: data.heatingFluidDesignCondInfo,
      };
    },
    ddlCoolingCompChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        heatPumpInfo: data.heatPumpInfo,
        dehumidificationInfo:  data.dehumidificationInfo,
        reheatInfo: data.reheatInfo,
        heatElecHeaterInstallationInfo: data.heatElecHeaterInstallationInfo,
        valveAndActuatorInfo: data.valveAndActuatorInfo,
        coolingCoilHandingInfo: data.coolingCoilHandingInfo,
        valveTypeInfo: data.valveTypeInfo,
//        setpointsInfo: data.setpointsInfo,
        coolingSetpointInfo: data.coolingSetpointInfo,
        heatingSetpointInfo: data.heatingSetpointInfo,
        reheatSetpointInfo: data.reheatSetpointInfo,
        customInputsInfo: data.customInputsInfo,
        coolingFluidDesignCondInfo: data.coolingFluidDesignCondInfo,
        dxCoilRefrigDesignCondInfo: data.dxCoilRefrigDesignCondInfo,
        condCoilRefrigDesignCondInfo: data.condCoilRefrigDesignCondInfo,
        supplyAirOpeningInfo: data.supplyAirOpeningInfo,
        remainingOpeningsInfo: data.remainingOpeningsInfo,

      };
    },
    ddlHeatingCompChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        heatElecHeaterInstallationInfo: data.heatElecHeaterInstallationInfo,
        heatingFluidDesignCondInfo: data.heatingFluidDesignCondInfo,
        valveAndActuatorInfo: data.valveAndActuatorInfo,
        heatingCoilHandingInfo: data.heatingCoilHandingInfo,
        valveTypeInfo: data.valveTypeInfo,
        heatingSetpointInfo: data.heatingSetpointInfo,
        customInputsInfo: data.customInputsInfo,
        elecHeaterVoltageInfo: data.elecHeaterVoltageInfo,
        supplyAirOpeningInfo: data.supplyAirOpeningInfo,
        setpointsInfo: data.setpointsInfo,
        // ddlHeatElecHeaterInstallationId: data.heatElecHeaterInstallationInfo.ddlHeatElecHeaterInstallationId,
        // divHeatingFluidDesignConditionsVisible: data.divHeatingFluidDesignConditionsVisible,
        // divHeatingSetpointVisible: data.divHeatingSetpointVisible,
        // divSetpointsVisible: data.divSetpointsVisible,
        // ddlElecHeaterVoltageId: data.elecHeaterVoltageInfo.ddlElecHeaterVoltageId,
      };
    },
    ckbHeatPumpChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        elecHeaterVoltageInfo: data.elecHeaterVoltageInfo,
        heatElecHeaterInstallationInfo: data.heatElecHeaterInstallationInfo,
        heatingFluidDesignCondInfo: data.heatingFluidDesignCondInfo,
        valveAndActuatorInfo: data.valveAndActuatorInfo,
        reheatSetpointInfo: data.reheatSetpointInfo,
        condCoilRefrigDesignCondInfo: data.condCoilRefrigDesignCondInfo,
      };
    },
    ckbDehumidificationChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        reheatInfo: data.reheatInfo,
        heatingFluidDesignCondInfo: data.heatingFluidDesignCondInfo,
      };
    },
    ddlReheatCompChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        elecHeaterVoltageInfo: data.elecHeaterVoltageInfo,
        heatElecHeaterInstallationInfo: data.heatElecHeaterInstallationInfo,
        valveAndActuatorInfo: data.valveAndActuatorInfo,
        heatingCoilHandingInfo: data.heatingCoilHandingInfo,
        valveTypeInfo: data.valveTypeInfo,
        reheatSetpointInfo: data.reheatSetpointInfo,
        heatingFluidDesignCondInfo: data.heatingFluidDesignCondInfo,
        condCoilRefrigDesignCondInfo: data.condCoilRefrigDesignCondInfo,
      };
    },
    ddlUnitVoltageChanged(state, actions) {
      state.controlInfo = {
        ...state.controlInfo,
        elecHeaterVoltageInfo: actions.payload,
      };
    },
    txbSummerOutdoorAirWBChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSummerOutdoorAirRH: actions.payload,
      };
    },
    txbSummerOutdoorAirRHChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSummerOutdoorAirWB: actions.payload,
      };
    },
    txbWinterOutdoorAirWBChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbWinterOutdoorAirRH: actions.payload,
      };
    },
    txbWinterOutdoorAirRHChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbWinterOutdoorAirWB: actions.payload,
      };
    },
    txbSummerReturnAirWBChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSummerReturnAirRH: actions.payload,
      };
    },
    txbSummerReturnAirRHChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSummerReturnAirWB: actions.payload,
      };
    },
    txbWinterReturnAirWBChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbWinterReturnAirRH: actions.payload,
      };
    },
    txbWinterReturnAirRHChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbWinterReturnAirWB: actions.payload,
      };
    },
    getViewSelectionInfo(state, actions) {
      state.isLoading = false;
      const data = actions.payload;
      state.viewSelectionInfo = {
        pricingDetail: data.pricingOutput?.pricingDataTbl,
        pricingVisible: data.pricingOutput?.visible,
        unitDetails: data.unitDetailsOutput?.unitDetails_1DataTbl.concat(
          data.unitDetailsOutput?.unitDetails_2DataTbl
        ),
        unitDetailsVisible: data.unitDetailsOutput.visible,
        electricalRequirements: {
          unitData: data.elecReqOutput?.unitDataTbl,
          unitDataVisible: data.elecReqOutput?.unitVisible,
          unitOnlyData: data.elecReqOutput?.unitOnlyDataTbl,
          unitOnlyDataVisible: data.elecReqOutput?.unitOnlyVisible,
          coolingDXCData: data.elecReqOutput?.coolingDXCDataTbl,
          coolingDXCVisible: data.elecReqOutput?.coolingDXCVisible,
          preheatElecHeaterData: data.elecReqOutput?.preheatElecHeaterDataTbl,
          preheatElecHeaterVisible: data.elecReqOutput?.preheatElecHeaterVisible,
          heatingElecHeaterData: data.elecReqOutput?.heatingElecHeaterDataTbl,
          heatingElecHeaterVisible: data.elecReqOutput?.heatingElecHeaterVisible,
        },
        preheatElecHeater: {
          Visible: data?.preheatElecHeaterOutput?.visible,
          Data: data?.preheatElecHeaterOutput?.featuresDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
        },
        preheatHWC: {
          Visible: data?.preheatHWC_Output?.visible,
          Data: data?.preheatHWC_Output?.featuresDataTbl?.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.preheatHWC_Output?.enteringDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          Leaving: data?.preheatHWC_Output?.leavingDataTbl?.map((item) => [item.cLabel, item.cValue]),
          ValveActuatorVisible: data?.preheatHWC_Output?.valveActuatorVisible,
          ValveActuator: data?.preheatHWC_Output?.valveActuatorDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
        },
        heatExchCORE: {
          performanceVisible: data?.fixedPlateCORE_Output?.visible,
          performance: data?.fixedPlateCORE_Output?.performanceDataTbl?.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          designConditions: data?.fixedPlateCORE_Output?.enteringDataTbl?.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          performanceLeavingAir: data?.fixedPlateCORE_Output?.leavingDataTbl?.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          // performanceLeavingAirVisible: data?.fixedPlateCORE_Output?.gvOutHX_FP_LvgAirVisible,
        },
        heatExchRECUTECH: {
          performanceVisible: data?.fixedPlateRECUTECH_Output?.visible,
          performance: data?.fixedPlateRECUTECH_Output?.performanceDataTbl?.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          designConditions: data?.fixedPlateRECUTECH_Output?.enteringDataTbl?.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          // designConditionsVisible: data?.fixedPlateRECUTECH_Output?.gvOutHX_FP_EntAirVisible,
          performanceLeavingAir: data?.fixedPlateRECUTECH_Output?.leavingDataTbl?.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          // performanceLeavingAirVisible: data?.fixedPlateRECUTECH_Output?.gvOutHX_FP_LvgAirVisible,
        },
        heatExchPOLYBLOC: {
          performanceVisible: data?.fixedPlatePOLYBLOC_Output?.visible,
          performance: data?.fixedPlatePOLYBLOC_Output?.performanceDataTbl?.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          designConditions: data?.fixedPlatePOLYBLOC_Output?.enteringDataTbl?.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          // designConditionsVisible: data?.fixedPlatePOLYBLOC_Output?.gvOutHX_FP_EntAirVisible,
          performanceLeavingAir: data?.fixedPlatePOLYBLOC_Output?.leavingDataTbl?.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          // performanceLeavingAirVisible: data?.fixedPlatePOLYBLOC_Output?.gvOutHX_FP_LvgAirVisible,
        },
        coolingCWC: {
          Visible: data?.coolingCWC_Output?.visible,
          Data: data?.coolingCWC_Output?.featuresDataTbl?.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.coolingCWC_Output?.enteringDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          Leaving: data?.coolingCWC_Output?.leavingDataTbl?.map((item) => [item.cLabel, item.cValue]),
          ValveActuatorVisible: data?.coolingCWC_Output?.valveActuatorVisible,
          ValveActuator: data?.coolingCWC_Output?.valveActuatorDataTbl?.map((item) => [item.cLabel, item.cValue]),
        },
        coolingDXC: {
          Visible: data?.coolingDXC_Output?.visible,
          Data: data?.coolingDXC_Output?.featuresDataTbl?.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.coolingDXC_Output?.enteringDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          Leaving: data?.coolingDXC_Output?.leavingDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          PerfOutputs: data?.coolingDXC_Output?.performanceDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          EKEXV_Kit: data?.coolingDXC_Output?.ekexvKitDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
        },
        heatingCondCoil: {
          Visible: data?.heatingCondCoilOutput?.visible,
          Data: data?.heatingCondCoilOutput?.featuresDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          Entering: data?.heatingCondCoilOutput?.enteringDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          Leaving: data?.heatingCondCoilOutput?.leavingDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
        },
        heatingElecHeater: {
          Visible: data?.heatingElecHeaterOutput?.visible,
          Data: data?.heatingElecHeaterOutput?.featuresDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
        },
        heatingHWC: {
          Visible: data?.heatingHWC_Output?.visible,
          Data: data?.heatingHWC_Output?.featuresDataTbl?.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.heatingHWC_Output?.enteringDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          Leaving: data?.heatingHWC_Output?.leavingDataTbl?.map((item) => [item.cLabel, item.cValue]),
          ValveActuatorVisible: data?.heatingHWC_Output?.valveActuatorVisible,
          ValveActuator: data?.heatingHWC_Output?.valveActuatorDataTbl?.map((item) => [item.cLabel, item.cValue]),
        },
        reheatElecHeater: {
          Visible: data?.reheatElecHeaterOutput?.visible,
          Data: data?.reheatElecHeaterOutput?.featuresDataTbl?.map((item) => [item.cLabel, item.cValue]),
        },
        reheatHWC: {
          Visible: data?.reheatHWC_Output?.visible,
          Data: data?.reheatHWC_Output?.featuresDataTbl?.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.reheatHWC_Output?.enteringDataTbl?.map((item) => [item.cLabel, item.cValue]),
          Leaving: data?.reheatHWC_Output?.leavingDataTbl?.map((item) => [item.cLabel, item.cValue]),
          ValveActuatorVisible: data?.reheatHWC_Output?.valveActuatorVisible,
          ValveActuator: data?.reheatHWC_Output?.valveActuatorDataTbl.map((item) => [item.cLabel, item.cValue]),
        },
        reheatHGRC: {
          Visible: data?.reheatHGRC_Output?.visible,
          Data: data?.reheatHGRC_Output?.featuresDataTbl?.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.reheatHGRC_Output?.enteringDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          Leaving: data?.reheatHGRC_Output?.leavingDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          PerfOutputs: data?.reheatHGRC_Output?.performanceDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          EKEXV_Kit: data?.reheatHGRC_Output?.ekexvKitDataTbl?.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
        },
        supplyFan: {
          Visible: data?.supplyFanOutput?.visible,
          Data: data?.supplyFanOutput?.featuresDataTbl?.map((item) => [item.cLabel, item.cValue]),
          GraphImageUrl: data?.supplyFanOutput?.graphImageUrl,
          soundDataVisible: data?.supplyFanOutput?.soundDataVisible,
          soundData: data?.supplyFanOutput?.soundDataDataTbl,
        },
        exhaustFan: {
          Visible: data?.exhaustFanOutput?.visible,
          Data: data?.exhaustFanOutput?.featuresDataTbl?.map((item) => [item.cLabel, item.cValue]),
          GraphImageUrl: data?.exhaustFanOutput?.graphImageUrl,
          soundDataVisible: data?.exhaustFanOutput?.soundDataVisible,
          soundData: data?.exhaustFanOutput?.soundDataDataTbl,
        },
        soundData: {
          Visible: data?.soundDataOutput?.visible,
          Data: data?.soundDataOutput?.soundDataDataTbl?.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
            item.cValue_3,
            item.cValue_4,
            item.cValue_5,
            item.cValue_6,
            item.cValue_7,
            item.cValue_8,
            item.cValue_9,
            item.cValue_10,
          ]),
        },
        // heatingElectricHeater: data.outputHeatingElecHeater.gvOutHeatElecHeaterDataSource,
        // heatingElectricHeaterVisible: data.outputHeatingElecHeater.divOutHeatingElecHeaterVisible,
      };
    },
    updateLayoutValues(state, action) {
      state.controlInfo = {
        ...state.controlInfo,
        ddlHandingId: parseInt(action.payload.ddlHandingId, 10),
        ddlSupplyAirOpeningText: action.payload.ddlSupplyAirOpeningText,
        ddlSupplyAirOpeningId: parseInt(action.payload.ddlSupplyAirOpeningId, 10),
        ddlExhaustAirOpeningText: action.payload.ddlExhaustAirOpeningText,
        ddlExhaustAirOpeningId: parseInt(action.payload.ddlExhaustAirOpeningId, 10),
        ddlOutdoorAirOpeningText: action.payload.ddlOutdoorAirOpeningText,
        ddlOutdoorAirOpeningId: parseInt(action.payload.ddlOutdoorAirOpeningId, 10),
        ddlReturnAirOpeningText: action.payload.ddlReturnAirOpeningText,
        ddlReturnAirOpeningId: parseInt(action.payload.ddlReturnAirOpeningId, 10),
      };

      state.unitInfo = {
        ...state.unitInfo,
        ddlHandingId: parseInt(action.payload.ddlHandingID, 10),
        ddlSupplyAirOpeningText: action.payload.ddlSupplyAirOpeningText,
        ddlSupplyAirOpeningId: parseInt(action.payload.ddlSupplyAirOpeningId, 10),
        ddlExhaustAirOpeningText: action.payload.ddlExhaustAirOpeningText,
        ddlExhaustAirOpeningId: parseInt(action.payload.ddlExhaustAirOpeningId, 10),
        ddlOutdoorAirOpeningText: action.payload.ddlOutdoorAirOpeningText,
        ddlOutdoorAirOpeningId: parseInt(action.payload.ddlOutdoorAirOpeningId, 10),
        ddlReturnAirOpeningText: action.payload.ddlReturnAirOpeningText,
        ddlReturnAirOpeningId: parseInt(action.payload.ddlReturnAirOpeningId, 10),
      };
    },
    ddlHandingChanged(state, action) {
      const data = action.payload;
      state.controlInfo = {
        ...state.controlInfo,
        supplyAirOpeningInfo: data.supplyAirOpeningInfo,
        remainingOpeningsInfo: data.remainingOpeningsInfo,
      };
    },
    ddlSupplyAirOpeningChanged(state, action) {
      const data = action.payload;
      state.controlInfo = {
        ...state.controlInfo,
        remainingOpeningsInfo: data.remainingOpeningsInfo,
      };
    },
  },
});

export const { getUnitInfoByJobId } = UnitSlice.actions;

// Reducer
export default UnitSlice.reducer;

// ----------------------------------------------------------------------

export function getUnitTypeInfo() {
  return async () => {
    dispatch(UnitSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/units/getunittypeinfo`);
    dispatch(UnitSlice.actions.setJobInfo(response.data));
  };
}

export function getInitUnitinfo(data) {
  return async () => {
    dispatch(UnitSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/units/getunitinfo`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.setInitInfo(response.data));
  };
}

export function saveUnitInfo(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/Save`, data);
    dispatch(UnitSlice.actions.setInitInfo(response.data.unitData));
    return response.data.intUnitNo;
  };
}

export function saveLayout(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SaveLayout`, data);
    return response.data;
  };
}

export function ddlLocationChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/LocationChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlLocationChanged(response.data));
    return response.data;
  };
}

export function ddlOrientationChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/OrientationChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlOrientationChanged(response.data));
    return response.data;
  };
}

export function txbSummerSupplyAirCFMChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SummerSupplyAirCFMChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSummerSupplyAirCFMChanged(response.data));
    return response.data;
  };
}

export function txbSummerReturnAirCFMChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SummerReturnAirCFMChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSummerReturnAirCFMChanged(response.data));
    return response.data;
  };
}

export function txbSupplyAirESPChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SupplyAirESPChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSupplyAirESPChanged(response.data));
    return response.data;
  };
}

export function txbExhaustAirESPChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/ExhaustAirESPChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSupplyAirESPChanged(response.data));
    return response.data;
  };
}

export function ddlUnitModelChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/UnitModelChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlUnitModelChanged(response.data));
    return response.data;
  };
}

export function ddlUnitVoltageChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/UnitVoltageChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlUnitVoltageChanged(response.data));
    return response.data;
  };
}

export function txbSummerOutdoorAirWBChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SummerOutdoorAirWBChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSummerOutdoorAirWBChanged(response.data));
    return response.data;
  };
}

export function txbSummerOutdoorAirRHChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api//units/SummerOutdoorAirRHChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSummerOutdoorAirRHChanged(response.data));
    return response.data;
  };
}

export function txbWinterOutdoorAirWBChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api//units/WinterOutdoorAirWBChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbWinterOutdoorAirWBChanged(response.data));
    return response.data;
  };
}

export function txbWinterOutdoorAirRHChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/WinterOutdoorAirRHChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbWinterOutdoorAirRHChanged(response.data));
    return response.data;
  };
}

export function txbSummerReturnAirWBChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SummerReturnAirWBChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbSummerReturnAirWBChanged(response.data));
    return response.data;
  };
}

export function txbSummerReturnAirRHChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/SummerReturnAirRHChanged`, data);
    console.log(response.data);
    console.log(UnitSlice.actions);
    dispatch(UnitSlice.actions.txbSummerReturnAirRHChanged(response.data));
    return response.data;
  };
}

export function txbWinterReturnAirWBChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/WinterReturnAirWBChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbWinterReturnAirWBChanged(response.data));
    return response.data;
  };
}

export function txbWinterReturnAirRHChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/WinterReturnAirRHChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.txbWinterReturnAirRHChanged(response.data));
    return response.data;
  };
}

export function ddlPreheatCompChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/ddlPreheatCompChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlPreheatCompChanged({ ...response.data, ddlPreheatCompId: data.ddlPreheatCompId }));
    return response.data;
  };
}

export function ddlCoolingCompChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/ddlCoolingCompChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlCoolingCompChanged(response.data));
    return response.data;
  };
}

export function ckbHeatPumpChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/ckbHeatPumpChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ckbHeatPumpChanged(response.data));
    return response.data;
  };
}

export function ckbDehumidificationChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/ckbDehumidificationChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ckbDehumidificationChanged(response.data));
    return response.data;
  };
}


export function ddlHeatingCompChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/ddlHeatingCompChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlHeatingCompChanged(response.data));
    return response.data;
  };
}


export function ddlReheatCompChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/ddlReheatCompChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlReheatCompChanged(response.data));
    return response.data;
  };
}


export function getViewSelectionInfo(data) {
  return async () => {
    dispatch(UnitSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/units/ViewSelection`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.getViewSelectionInfo(response.data));
    return response.data;
  };
}

export function updateLayoutValues(data) {
  return async () => {
    console.log('-------------Updated Layout Values--------------');
    console.log(data);
    dispatch(UnitSlice.actions.updateLayoutValues(data));
  };
}

export function ddlHandingChanged(data) {
  return async () => {
    console.log('---------------Handing Changed-----------------');
    // console.log(data);
    const response = await axios.post(`${serverUrl}/api/units/ddlHandingChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlHandingChanged(response.data));
    return response.data;
  };
}

export function ddlSupplyAirOpeningChanged(data) {
  return async () => {
    console.log('-----------SupplyAirOpendingChanged------------');
    // console.log(data);
    const response = await axios.post(`${serverUrl}/api/units/ddlSupplyAirOpeningChanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlSupplyAirOpeningChanged(response.data));
    return response.data;
  };
}
// ----------------------------------------------------------------------
