import { createSlice } from '@reduxjs/toolkit';
// utils
// import axios from '../../utils/axios';
// store
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: true,
  productType: [],
  unitType: [],
  productTypeUnitTypeLink: [],
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
      state.productType = actions.payload.productType;
      state.unitType = actions.payload.unitType;
      state.productTypeUnitTypeLink = actions.payload.productTypeUnitTypeLink;
      state.isLoading = false;
    },
    setInitInfo(state, actions) {
      const { controlInfo, unitInfo, visibleInfo } = actions.payload;
      state.controlInfo = {
        ddlOrientation: controlInfo.mainControlData.ddlOrientation,
        ddlOrientationValue: controlInfo.mainControlData.ddlOrientationValue,
        ddlUnitModel: controlInfo.mainControlData.ddlUnitModel,
        ddlUnitModelValue: controlInfo.mainControlData.ddlUnitModelValue,
        divCustomVisible: visibleInfo.divCustomVisible,
        divHeatExchCompVisible: visibleInfo.divHeatExchCompVisible,
        divOutdoorAirDesignConditionsVisible: visibleInfo.divOutdoorAirDesignConditionsVisible,
        divReturnAirDesignConditionsVisible: visibleInfo.divReturnAirDesignConditionsVisible,
        divSetpoint_1Visible: visibleInfo.divSetpoint_1Visible,
        divSubmittalItemsVisible: visibleInfo.divSubmittalItemsVisible,
        ddlUnitType: controlInfo.ddlUnitType,
        ddlUnitTypeValue: controlInfo.ddlUnitTypeValue,
        ddlControlsPreference: controlInfo.ddlControlsPreference,
        ddlControlsPreferenceValue: controlInfo.ddlControlsPreferenceValue,
        ddlDamperAndActuator: controlInfo.ddlDamperAndActuator,
        ddlDamperAndActuatorValue: controlInfo.ddlDamperAndActuatorValue,
        ddlDamperAndActuatorVisible: controlInfo.ddlDamperAndActuatorVisible,
        ddlCoolingCoilHanding: controlInfo.ddlCoolingCoilHanding,
        ddlCoolingCoilHandingValue: controlInfo.ddlCoolingCoilHandingValue,
        ddlHeatingCoilHanding: controlInfo.ddlHeatingCoilHanding,
        ddlHeatingCoilHandingValue: controlInfo.ddlHeatingCoilHandingValue,
        ddlPreheatCoilHanding: controlInfo.ddlPreheatCoilHanding,
        ddlPreheatCoilHandingValue: controlInfo.ddlPreheatCoilHandingValue,
        ddlValveType: controlInfo.ddlValveType,
        ddlValveTypeValue: controlInfo.ddlValveTypeValue,
        ckbVoltageSPP: controlInfo.ckbVoltageSPP,
        divUnitBypassVisible: controlInfo.divUnitBypassVisible,
        divVoltageSPPVisible: controlInfo.divVoltageSPPVisible,
        ddlLocation: controlInfo.unitTypes.ddlLocation,
        ddlLocationValue: controlInfo.unitTypes.ddlLocationValue,
        ckbDownshot: controlInfo.unitTypes.ckbDownshot,
        ddlOA_FilterModel: controlInfo.unitTypes.ddlOA_FilterModel,
        ddlOA_FilterModelValue: controlInfo.unitTypes.ddlOA_FilterModelValue,
        ddlRA_FilterModel: controlInfo.unitTypes.ddlRA_FilterModel,
        ddlRA_FilterModelValue: controlInfo.unitTypes.ddlRA_FilterModelValue,
        ddlPreheatComp: controlInfo.unitTypes.ddlPreheatComp,
        ddlPreheatCompValue: controlInfo.unitTypes.ddlPreheatCompValue,
        ddlHeatExchComp: controlInfo.unitTypes.ddlHeatExchComp,
        ddlHeatExchCompValue: controlInfo.unitTypes.ddlHeatExchCompValue,
        ddlCoolingComp: controlInfo.unitTypes.ddlCoolingComp,
        ddlCoolingCompValue: controlInfo.unitTypes.ddlCoolingCompValue,
        ddlHeatingComp: controlInfo.unitTypes.ddlHeatingComp,
        ddlHeatingCompValue: controlInfo.unitTypes.ddlHeatingCompValue,
        ddlCoolingFluidType: controlInfo.unitTypes.ddlCoolingFluidType,
        ddlCoolingFluidTypeValue: controlInfo.unitTypes.ddlCoolingFluidTypeValue,
        ddlCoolingFluidConcentration: controlInfo.unitTypes.ddlCoolingFluidConcentration,
        ddlCoolingFluidConcentrationValue: controlInfo.unitTypes.ddlCoolingFluidConcentrationValue,
        ddlHeatingFluidType: controlInfo.unitTypes.ddlHeatingFluidType,
        ddlHeatingFluidTypeValue: controlInfo.unitTypes.ddlHeatingFluidTypeValue,
        ddlHeatingFluidConcentration: controlInfo.unitTypes.ddlHeatingFluidConcentration,
        ddlHeatingFluidConcentrationValue: controlInfo.unitTypes.ddlHeatingFluidConcentrationValue,
        divCoolingCompVisible: controlInfo.unitTypes.divCoolingCompVisible,
        divExhaustAirESPVisible: controlInfo.unitTypes.divExhaustAirESPVisible,
        divHeatingCompVisible: controlInfo.unitTypes.divHeatingCompVisible,
        divPreheatCompVisible: controlInfo.unitTypes.divPreheatCompVisible,
        divRA_FilterModelVisible: controlInfo.unitTypes.divRA_FilterModelVisible,
        divRA_FilterPDVisible: controlInfo.unitTypes.divRA_FilterPDVisible,
        divSummerReturnAirCFMVisible: controlInfo.unitTypes.divSummerReturnAirCFMVisible,
        reheat: controlInfo.unitTypes.componentOptions.reheat,
        cooling: controlInfo.unitTypes.componentOptions.cooling,
        drainPan: controlInfo.unitTypes.componentOptions.drainPan,
        customInputs: controlInfo.unitTypes.componentOptions.customInputs,
        reheatSetpoints: controlInfo.unitTypes.componentOptions.reheatSetpoints,
        refrigerantInfo: controlInfo.unitTypes.componentOptions.refrigerantInfo,
        dehumidification: controlInfo.unitTypes.componentOptions.dehumidification,
        valveAndActuator: controlInfo.unitTypes.componentOptions.valveAndActuator,
        divDXC_MsgVisible: controlInfo.unitTypes.componentOptions.divDXC_MsgVisible,
        heatElectricHeater: controlInfo.unitTypes.componentOptions.heatElectricHeater,
        preheatElectricHeater: controlInfo.unitTypes.componentOptions.preheatElectricHeater,
        electricHeaterVoltage: controlInfo.unitTypes.componentOptions.electricHeaterVoltage,
        divPreheatSetpointVisible: controlInfo.unitTypes.componentOptions.divPreheatSetpointVisible,
        divCoolingSetpointVisible: controlInfo.unitTypes.componentOptions.divCoolingSetpointVisible,
        divHeatingSetpointVisible: controlInfo.unitTypes.componentOptions.divHeatingSetpointVisible,
        divSetpointsVisible: controlInfo.unitTypes.componentOptions.divSetpointsVisible,
        divHeatingFluidDesignConditionsVisible:
          controlInfo.unitTypes.componentOptions.divHeatingFluidDesignConditionsVisible,
        ddlUnitVoltage: controlInfo.mainControlData.others.ddlUnitVoltage,
        ddlUnitVoltageValue: controlInfo.mainControlData.others.ddlUnitVoltageValue,
        elecHeaterVoltage: controlInfo.mainControlData.others.elecHeaterVoltage,
        ckbBypass: controlInfo.mainControlData.others.ckbBypass,
        btnNextVisible: visibleInfo.btnNextVisible,
        btnOutputVisible: visibleInfo.btnOutputVisible,
        btnQuoteVisible: visibleInfo.btnQuoteVisible,
        btnSubmittalsVisible: visibleInfo.btnSubmittalsVisible,
        btnViewModelOptionVisible: visibleInfo.btnViewModelOptionVisible,
        divNotesVisible: visibleInfo.divNotesVisible,
        divUnitOpeningsMsgVisible: visibleInfo.divUnitOpeningsMsgVisible,
        div_hx_fp_hiddenVisible: visibleInfo.div_hx_fp_hiddenVisible,
        ddlHanding: controlInfo.ddlHanding,
      };
      state.unitInfo = {
        ...unitInfo,
        ddlHandingValue: unitInfo.isLayout && unitInfo.ddlHandingValue !== 0 ? unitInfo.ddlHandingValue : 1,
        ddlSupplyAirOpeningValue:
          unitInfo.isLayout && unitInfo.ddlSupplyAirOpeningValue !== 0 ? unitInfo.ddlSupplyAirOpeningValue : 1,
        ddlSupplyAirOpeningText:
          unitInfo.isLayout && unitInfo.ddlSupplyAirOpeningText !== '' ? unitInfo.ddlSupplyAirOpeningText : '1',
        ddlExhaustAirOpeningValue:
          unitInfo.isLayout && unitInfo.ddlExhaustAirOpeningValue !== 0 ? unitInfo.ddlExhaustAirOpeningValue : 1,
        ddlExhaustAirOpeningText:
          unitInfo.isLayout && unitInfo.ddlExhaustAirOpeningText !== '' ? unitInfo.ddlExhaustAirOpeningText : '2',
        ddlOutdoorAirOpeningValue:
          unitInfo.isLayout && unitInfo.ddlOutdoorAirOpeningValue !== 0 ? unitInfo.ddlOutdoorAirOpeningValue : 1,
        ddlOutdoorAirOpeningText:
          unitInfo.isLayout && unitInfo.ddlOutdoorAirOpeningText !== '' ? unitInfo.ddlOutdoorAirOpeningText : '4',
        ddlReturnAirOpeningValue:
          unitInfo.isLayout && unitInfo.ddlReturnAirOpeningValue !== 0 ? unitInfo.ddlReturnAirOpeningValue : 1,
        ddlReturnAirOpeningText:
          unitInfo.isLayout && unitInfo.ddlReturnAirOpeningText !== '' ? unitInfo.ddlReturnAirOpeningText : '3',
      };
      state.layoutInfo = {
        ddlHanding: controlInfo.ddlHanding,
        ddlHandingID: controlInfo.ddlHanding[0].id,
        ddlSupplyAirOpeningData: controlInfo.ddlSupplyAirOpeningData,
        ddlSupplyAirOpeningText: controlInfo.ddlSupplyAirOpeningText,
        ddlSupplyAirOpeningValue: controlInfo.ddlSupplyAirOpeningValue,
        ddlExhaustAirOpeningData: controlInfo.ddlExhaustAirOpeningData,
        ddlExhaustAirOpeningText: controlInfo.ddlExhaustAirOpeningText,
        ddlExhaustAirOpeningValue: controlInfo.ddlExhaustAirOpeningValue,
        ddlOutdoorAirOpeningData: controlInfo.ddlOutdoorAirOpeningData,
        ddlOutdoorAirOpeningText: controlInfo.ddlOutdoorAirOpeningText,
        ddlOutdoorAirOpeningValue: controlInfo.ddlOutdoorAirOpeningValue,
        ddlReturnAirOpeningData: controlInfo.ddlReturnAirOpeningData,
        ddlReturnAirOpeningText: controlInfo.ddlReturnAirOpeningText,
        ddlReturnAirOpeningValue: controlInfo.ddlReturnAirOpeningValue,
      };
      state.isLoading = false;
    },
    ddlLocationChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        ddlOrientation: data.ddlOrientation,
        ddlOrientationValue: data.ddlOrientationValue,
        ddlDamperAndActuatorValue: data.ddlDamperAndActuatorValue,
        ddlDamperAndActuatorVisible: data.divDamperAndActuatorVisible,
        ddlUnitModel: data.ddlUnitModel,
        ddlUnitModelValue: data.ddlUnitModelValue,
        ddlUnitVoltage: data.others.ddlUnitVoltage,
        ddlUnitVoltageValue: data.others.ddlUnitVoltageValue,
        elecHeaterVoltage: data.others.elecHeaterVoltage,
        ckbBypass: data.others.ckbBypass.ckbBypassChecked,
        ckbDownshot: data.downshot,
        electricHeaterVoltage: data.electricHeaterVoltage,
        preheatElectricHeater: data.preheatElectricHeater,
      };

      state.unitInfo = {
        ...state.unitInfo,
        txbSupplyAirESP: data.txbSupplyAirESP,
        txbExhaustAirESP: data.txbExhaustAirESP,
      };
    },
    ddlOrientationChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        ddlUnitModel: data.ddlUnitModel,
        ddlUnitModelValue: data.ddlUnitModelValue,
        ddlUnitVoltage: data.others.ddlUnitVoltage,
        ddlUnitVoltageValue: data.others.ddlUnitVoltageValue,
        elecHeaterVoltage: data.others.elecHeaterVoltage,
        ckbBypass: data.others.ckbBypass.ckbBypassChecked,
        ddlSupplyAirOpening: data.ddlSupplyAirOpening,
      };

      state.unitInfo = {
        ...state.unitInfo,
        ddlSupplyAirOpeningValue: data.ddlSupplyAirOpeningValue,
        ddlSupplyAirOpeningText: data.ddlSupplyAirOpeningText,
      };
    },
    txbSummerSupplyAirCFMChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        ddlOrientation: data.ddlOrientation,
        ddlOrientationValue: data.ddlOrientationValue,
        ddlUnitModel: data.ddlUnitModel,
        ddlUnitModelValue: data.ddlUnitModelValue,
        ddlUnitVoltage: data.others.ddlUnitVoltage,
        ddlUnitVoltageValue: data.others.ddlUnitVoltageValue,
        ddlSupplyAirOpening: data.ddlSupplyAirOpening,
        elecHeaterVoltage: data.others.elecHeaterVoltage,
        ckbBypass: data.others.ckbBypass,
      };

      state.unitInfo = {
        ...state.unitInfo,
        txbSummerSupplyAirCFM: data.txbSummerSupplyAirCFM,
        txbSummerReturnAirCFM: data.txbSummerReturnAirCFM,
        ddlSupplyAirOpeningValue: data.ddlSupplyAirOpeningValue,
        ddlSupplyAirOpeningText: data.ddlSupplyAirOpeningText,
      };
    },
    txbSummerReturnAirCFMChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSummerReturnAirCFM: actions.payload,
      };
    },
    txbSupplyAirESPChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbSupplyAirESP: actions.payload,
      };
    },
    txbExhaustAirESPChanged(state, actions) {
      state.unitInfo = {
        ...state.unitInfo,
        txbExhaustAirESP: actions.payload,
      };
    },
    ddlUnitModelChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        ddlUnitVoltage: data.ddlUnitVoltage,
        ddlUnitVoltageValue: data.ddlUnitVoltageValue,
        elecHeaterVoltage: data.elecHeaterVoltage,
        ckbBypass: data.ckbBypass,
      };

      state.unitInfo = {
        ...state.unitInfo,
        txbSupplyAirESP: data.txbSupplyAirESP,
      };
    },
    ddlPreheatCompChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        customInputs: data.customInputs,
        divHeatingFluidDesignConditionsVisible: data.divHeatingFluidDesignConditionsVisible,
        preheatElectricHeater: data.preheatElectricHeater,
        elecHeaterVoltage: data.preheatElectricHeater.electricHeaterVoltageInfo,
        lblPreheatWarningText: data.preheatInfomation.lblPreheatWarningText,
        lblPreheatWarningVisible: data.preheatInfomation.lblPreheatWarningVisible,
        valveAndActuator: data.valveAndActuator,
        divPreheatSetpointVisible: data.isAUHID ? data.divPreheatSetpointVisible : false,
        divSetpointsVisible: data.isAUHID ? data.divSetpointsVisible : false,
      };
    },
    ddlCoolingCompChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        reheat: data.reheat,
        cooling: data.cooling,
        dehumidification: data.dehumidification,
        valveAndActuator: data.valveAndActuator,
        heatElectricHeater: data.heatElectricHeater,
        divHeatingFluidDesignConditionsVisible: data.divHeatingFluidDesignConditionsVisible,
        refrigerantInfo: data.refrigerantInfo,
        divCoolingSetpointVisible: data.divCoolingSetpointVisible,
        divHeatingSetpointVisible: data.divHeatingSetpointVisible,
        reheatSetpoints: data.reheatSetpoints,
        divSetpointsVisible: data.divSetpointsVisible,
        customInputs: data.customInputs,
      };
    },
    ddlHeatingCompChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        heatElectricHeater: data.heatElectricHeater,
        divHeatingFluidDesignConditionsVisible: data.divHeatingFluidDesignConditionsVisible,
        valveAndActuator: data.valveAndActuator,
        divHeatingSetpointVisible: data.divHeatingSetpointVisible,
        divSetpointsVisible: data.divSetpointsVisible,
        customInputs: data.customInputs,
      };
    },
    ddlUnitVoltageChanged(state, actions) {
      state.controlInfo = {
        ...state.controlInfo,
        elecHeaterVoltage: actions.payload,
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
        pricingDetail: data.outputPricing.gvPricingDataSource,
        performanceVisible: data.outputPricing.divPricingVisible,
        unitDetails: data.outputUnitDetails.gvOutUnitDetails_1DataSource.concat(
          data.outputUnitDetails.gvOutUnitDetails_2DataSource
        ),
        unitDetailsVisible: data.outputUnitDetails.divOutUnitDetailsVisible,
        electricalRequirements: {
          unitData: data.outputElecReq.gvOutElecReqUnitDataDataSource,
          unitDataVisible: data.outputElecReq.divOutElecReqUnitDataVisible,
          unitOnlyData: data.outputElecReq.gvOutElecReqUnitOnlyDataDataSource,
          unitOnlyDataVisible: data.outputElecReq.divOutElecReqUnitOnlyDataVisible,
          coolingDXCData: data.outputElecReq.gvOutElecReqCoolingDXCDataSource,
          coolingDXCVisible: data.outputElecReq.gvOutElecReqCoolingDXCVisible,
          preheatElecHeaterData: data.outputElecReq.gvOutElecReqPreheatElecHeaterDataSource,
          preheatElecHeaterVisible: data.outputElecReq.divOutElecReqPreheatElecHeaterVisible,
          heatingElecHeaterData: data.outputElecReq.gvOutElecReqHeatingElecHeaterDataSource,
          heatingElecHeaterVisible: data.outputElecReq.divOutElecReqHeatingElecHeaterVisible,
        },
        preheatElecHeater: {
          Visible: data.divOutPreheatElecHeaterVisible,
          Data: data?.outputPreheatElecHeater?.gvOutPreheatElecHeaterDataSource.map((item) => [item.cLabel, item.cValue]),
        },
        preheatHWC: {
          Visible: data?.divOutPreheatHWCVisible,
          Data: data?.outputPreheatHWC?.gvOutPreheatHWC_DataDataSource.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.outputPreheatHWC?.gvOutPreheatHWC_EnteringDataSource.map((item) => [item.cLabel, item.cValue]),
          Leaving: data?.outputPreheatHWC?.gvOutPreheatHWC_LeavingDataSource.map((item) => [item.cLabel, item.cValue]),
          ValveActuator: data?.outputPreheatHWC?.gvOutPreheatHWC_ValveActuatorDataDataSource?.map((item) => [item.cLabel, item.cValue]),
        },
        heatExchCORE: {
          performanceVisible: data.divOutHX_FPVisible && data?.outputFixedPlateCORE?.divOutHX_FPVisible,
          performance: data?.outputFixedPlateCORE?.gvOutHX_FP_PerfDataSource.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
          designConditions: data?.outputFixedPlateCORE?.gvOutHX_FP_EntAirDataSource.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
          designConditionsVisible: data?.outputFixedPlateCORE?.gvOutHX_FP_EntAirVisible,
          performanceLeavingAir: data?.outputFixedPlateCORE?.gvOutHX_FP_LvgAirDataSource.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
          performanceLeavingAirVisible: data?.outputFixedPlateCORE?.gvOutHX_FP_LvgAirVisible,
        },
        heatExchRECUTECH: {
          performanceVisible: data.divOutHX_FPVisible && data?.outputFixedRECUTECH?.divOutHX_FPVisible,
          performance: data?.outputFixedRECUTECH?.gvOutHX_FP_PerfDataSource.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
          designConditions: data?.outputFixedRECUTECH?.gvOutHX_FP_EntAirDataSource.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
          designConditionsVisible: data?.outputFixedRECUTECH?.gvOutHX_FP_EntAirVisible,
          performanceLeavingAir: data?.outputFixedRECUTECH?.gvOutHX_FP_LvgAirDataSource.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
          performanceLeavingAirVisible: data?.outputFixedRECUTECH?.gvOutHX_FP_LvgAirVisible,
        },
        heatExchPOLYBLOC: {
          performanceVisible: data.divOutHX_FPVisible && data?.outputFixedPOLYBLOC?.divOutHX_FPVisible,
          performance: data?.outputFixedPOLYBLOC?.gvOutHX_FP_PerfDataSource.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
          designConditions: data?.outputFixedPOLYBLOC?.gvOutHX_FP_EntAirDataSource.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
          designConditionsVisible: data?.outputFixedPOLYBLOC?.gvOutHX_FP_EntAirVisible,
          performanceLeavingAir: data?.outputFixedPOLYBLOC?.gvOutHX_FP_LvgAirDataSource.map((item) => [item.cLabel, item.cValue_1, item.cValue_2]),
          performanceLeavingAirVisible: data?.outputFixedPOLYBLOC?.gvOutHX_FP_LvgAirVisible,
        },
        coolingCWC: {
          Visible: data.divOutCoolingCWCVisible,
          Data: data?.outputCoolingCWC?.gvOutCoolingCWC_DataDataSource.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.outputCoolingCWC?.gvOutCoolingCWC_EnteringDataSource.map((item) => [item.cLabel, item.cValue]),
          Leaving: data?.outputCoolingCWC?.gvOutCoolingCWC_LeavingDataSource.map((item) => [item.cLabel, item.cValue]),
          ValveActuator: data?.outputCoolingCWC?.gvOutCoolingCWC_ValveActuatorDataDataSource?.map((item) => [item.cLabel, item.cValue]),
        },
        coolingDXC: {
          Visible: data.divOutCoolingDXC_RAE_Visible,
          Data: data?.outputCoolingDXC?.gvOutCoolingDXC_RAE_DataDataSource.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.outputCoolingDXC?.gvOutCoolingDXC_RAE_EnteringDataSource.map((item) => [item.cLabel, item.cValue]),
          Leaving: data?.outputCoolingDXC?.gvOutCoolingDXC_RAE_LeavingDataSource.map((item) => [item.cLabel, item.cValue]),
          PerfOutputs: data?.outputCoolingDXC?.gvOutCoolingDXC_RAE_PerfOutputsDataSource.map((item) => [item.cLabel, item.cValue]),
          EKEXV_Kit: data?.outputCoolingDXC?.gvOutCoolingDXC_RAE_EKEXV_KitDataDataSource.map((item) => [item.cLabel, item.cValue]),
        },
        heatingCondCoil: {
          Visible: data.divOutHeatingCondCoilVisible,
          Data: data?.outputHeatingCondCoil?.gvOutHeatingCondCoil_DataDataSource.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.outputHeatingCondCoil?.gvOutHeatingCondCoil_EnteringDataSource.map((item) => [item.cLabel, item.cValue]),
          Leaving: data?.outputHeatingCondCoil?.gvOutHeatingCondCoil_LeavingDataSource.map((item) => [item.cLabel, item.cValue]),
        },
        heatingElecHeater: {
          Visible: data.divOutHeatingElecHeaterVisible,
          Data: data?.outputHeatingElecHeater?.gvOutHeatingElecHeaterDataDataSource.map((item) => [item.cLabel, item.cValue]),
        },
        heatingHWC: {
          Visible: data.divOutHeatingHWCVisible,
          Data: data?.outputHeatingHWC?.gvOutHeatingHWC_DataDataSource.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.outputHeatingHWC?.gvOutHeatingHWC_EnteringDataSource.map((item) => [item.cLabel, item.cValue]),
          Leaving: data?.outputHeatingHWC?.gvOutHeatingHWC_LeavingDataSource.map((item) => [item.cLabel, item.cValue]),
          ValveActuator: data?.outputHeatingHWC?.gvOutHeatingHWC_ValveActuatorDataDataSource?.map((item) => [item.cLabel, item.cValue]),
        },
        reheatElecHeater: {
          Visible: data.divOutReheatElecHeaterVisible,
          Data: data?.outputReheatElecHeater?.gvOutReheatElecHeaterDataSource.map((item) => [item.cLabel, item.cValue]),
        },
        reheatHWC: {
          Visible: data.divOutReheatHWCVisible,
          Data: data?.outputReheatHWC?.gvOutReheatHWC_DataDataSource.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.outputReheatHWC?.gvOutReheatHWC_EnteringDataSource.map((item) => [item.cLabel, item.cValue]),
          Leaving: data?.outputReheatHWC?.gvOutReheatHWC_LeavingDataSource.map((item) => [item.cLabel, item.cValue]),
          // ValveActuator: data?.outputReheatHWC?.gvOutReheatHWC_ValveActuatorDataDataSource.map((item) => [item.cLabel, item.cValue]),
        },
        reheatHGRC: {
          Visible: data.divOutReheatHGRCVisible,
          Data: data?.outputReheatHGRC?.gvOutReheatHGRC_RAE_DataDataSource.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.outputReheatHGRC?.gvOutReheatHGRC_RAE_EnteringDataSource.map((item) => [item.cLabel, item.cValue]),
          Leaving: data?.outputReheatHGRC?.gvOutReheatHGRC_RAE_LeavingDataSource.map((item) => [item.cLabel, item.cValue]),
          PerfOutputs: data?.outputReheatHGRC?.gvOutReheatHGRC_RAE_PerfOutputsDataSource.map((item) => [item.cLabel, item.cValue]),
          EKEXV_Kit: data?.outputReheatHGRC?.gvOutReheatHGRC_RAE_EKEXV_KitDataDataSource.map((item) => [item.cLabel, item.cValue]),
        },
        supplyFan: {
          Visible: data.divOutSF_ZAVisible,
          Data: data?.outputSupplyFan?.gvOutSF_DataDataSource.map((item) => [item.cLabel, item.cValue]),
          GraphImageUrl: data?.outputSupplyFan.imgSF_GraphImageUrl,
          // SoundData: data.outputSupplyFan !== undefined && data.outputSupplyFan.gvOutSF_SoundDataDataSource.map((item) => [item.cLabel, item.cValue_1, item.cValue_2, item.cValue_3, item.cValue_4,item.cValue_5, item.cValue_6,item.cValue_7, item.cValue_8,item.cValue_9, item.cValue_10]),
        },
        exhaustFan: {
          Visible: data.divOutEF_ZAVisible,
          Data: data?.outputExhaustFan?.gvOutEF_DataDataSource.map((item) => [item.cLabel, item.cValue]),
          GraphImageUrl: data?.outputExhaustFan?.imgEF_GraphImageUrl,
          // SoundData: data.outputExhaustFan !== undefined && data.outputExhaustFan.gvOutEF_SoundDataDataSource.map((item) => [item.cLabel, item.cValue_1, item.cValue_2, item.cValue_3, item.cValue_4,item.cValue_5, item.cValue_6,item.cValue_7, item.cValue_8,item.cValue_9, item.cValue_10]),
        },
        soundData: {
          Visible: data.divOutSoundDataVisible,
          Data: data?.outputSoundData?.gvOutSoundDataDataSource.map((item) => [item.cLabel, item.cValue_1, item.cValue_2, item.cValue_3, item.cValue_4,item.cValue_5, item.cValue_6,item.cValue_7, item.cValue_8,item.cValue_9, item.cValue_10]),
        },
        // heatingElectricHeater: data.outputHeatingElecHeater.gvOutHeatElecHeaterDataSource,
        // heatingElectricHeaterVisible: data.outputHeatingElecHeater.divOutHeatingElecHeaterVisible,
      };
    },
    updateLayoutValues(state, action) {
      state.layoutInfo = {
        ...state.layoutInfo,
        ddlHandingID: parseInt(action.payload.ddlHandingID, 10),
        ddlSupplyAirOpeningText: action.payload.ddlSupplyAirOpeningText,
        ddlSupplyAirOpeningValue: parseInt(action.payload.ddlSupplyAirOpeningValue, 10),
        ddlExhaustAirOpeningText: action.payload.ddlExhaustAirOpeningText,
        ddlExhaustAirOpeningValue: parseInt(action.payload.ddlExhaustAirOpeningValue, 10),
        ddlOutdoorAirOpeningText: action.payload.ddlOutdoorAirOpeningText,
        ddlOutdoorAirOpeningValue: parseInt(action.payload.ddlOutdoorAirOpeningValue, 10),
        ddlReturnAirOpeningText: action.payload.ddlReturnAirOpeningText,
        ddlReturnAirOpeningValue: parseInt(action.payload.ddlReturnAirOpeningValue, 10),
      };

      state.unitInfo = {
        ...state.unitInfo,
        ddlHandingValue: parseInt(action.payload.ddlHandingID, 10),
        ddlSupplyAirOpeningText: action.payload.ddlSupplyAirOpeningText,
        ddlSupplyAirOpeningValue: parseInt(action.payload.ddlSupplyAirOpeningValue, 10),
        ddlExhaustAirOpeningText: action.payload.ddlExhaustAirOpeningText,
        ddlExhaustAirOpeningValue: parseInt(action.payload.ddlExhaustAirOpeningValue, 10),
        ddlOutdoorAirOpeningText: action.payload.ddlOutdoorAirOpeningText,
        ddlOutdoorAirOpeningValue: parseInt(action.payload.ddlOutdoorAirOpeningValue, 10),
        ddlReturnAirOpeningText: action.payload.ddlReturnAirOpeningText,
        ddlReturnAirOpeningValue: parseInt(action.payload.ddlReturnAirOpeningValue, 10),
      };
    },
    ddlHandingChanged(state, action) {
      state.layoutInfo = {
        ...state.layoutInfo,
        ddlHandingID: parseInt(action.payload.ddlHandingID, 10),
        ddlSupplyAirOpeningData: action.payload.ddlSupplyAirOpeningData,
        ddlSupplyAirOpeningValue: parseInt(action.payload.ddlSupplyAirOpeningValue, 10),
        ddlSupplyAirOpeningText: action.payload.ddlSupplyAirOpeningText,
      };

      state.unitInfo = {
        ...state.unitInfo,
        ddlHandingID: parseInt(action.payload.ddlHandingID, 10),
        ddlPreheatCoilHandingValue: parseInt(action.payload.ddlHandingID, 10),
        ddlCoolingCoilHandingValue: parseInt(action.payload.ddlHandingID, 10),
        ddlHeatingCoilHandingValue: parseInt(action.payload.ddlHandingID, 10),
      };
    },
    ddlSupplyAirOpeningChanged(state, action) {
      state.layoutInfo = {
        ...state.layoutInfo,
        ddlSupplyAirOpeningValue: parseInt(action.payload.ddlSupplyAirOpeningValue, 10),
        ddlSupplyAirOpeningText: action.payload.ddlSupplyAirOpeningText,
        ddlOutdoorAirOpeningData: action.payload.ddlOutdoorAirOpeningData,
        ddlOutdoorAirOpeningValue: parseInt(action.payload.ddlOutdoorAirOpeningValue, 10),
        ddlOutdoorAirOpeningText: action.payload.ddlOutdoorAirOpeningText,
        ddlExhaustAirOpeningData: action.payload.ddlExhaustAirOpeningData,
        ddlExhaustAirOpeningValue: parseInt(action.payload.ddlExhaustAirOpeningValue, 10),
        ddlExhaustAirOpeningText: action.payload.ddlExhaustAirOpeningText,
        ddlReturnAirOpeningData: action.payload.ddlReturnAirOpeningData,
        ddlReturnAirOpeningValue: parseInt(action.payload.ddlReturnAirOpeningValue, 10),
        ddlReturnAirOpeningText: action.payload.ddlReturnAirOpeningText,
      };

      state.unitInfo = {
        ...state.unitInfo,
        ddlSupplyAirOpeningValue: parseInt(action.payload.ddlSupplyAirOpeningValue, 10),
        ddlSupplyAirOpeningText: action.payload.ddlSupplyAirOpeningText,
        ddlOutdoorAirOpeningValue: parseInt(action.payload.ddlOutdoorAirOpeningValue, 10),
        ddlOutdoorAirOpeningText: action.payload.ddlOutdoorAirOpeningText,
        ddlExhaustAirOpeningValue: parseInt(action.payload.ddlExhaustAirOpeningValue, 10),
        ddlExhaustAirOpeningText: action.payload.ddlExhaustAirOpeningText,
        ddlReturnAirOpeningValue: parseInt(action.payload.ddlReturnAirOpeningValue, 10),
        ddlReturnAirOpeningText: action.payload.ddlReturnAirOpeningText,
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
    const response = await axios.post(`${serverUrl}/api/units/locationchanged`, data);
    console.log(response.data);
    dispatch(UnitSlice.actions.ddlLocationChanged(response.data));
    return response.data;
  };
}

export function ddlOrientationChanged(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/units/orientationchanged`, data);
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
    dispatch(UnitSlice.actions.ddlPreheatCompChanged(response.data));
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

export function ddlHandingChanged(ddlHandingID) {
  return async () => {
    console.log('---------------Handing Changed-----------------');
    const response = await axios.post(`${serverUrl}/api/units/ddlHandingChanged`);
    console.log({ ...response.data, ddlHandingID });
    dispatch(UnitSlice.actions.ddlHandingChanged({ ...response.data, ddlHandingID }));
  };
}

export function ddlSupplyAirOpeningChanged(data) {
  return async () => {
    console.log('-----------SupplyAirOpendingChanged------------');
    console.log('          -------Input Values--------          ');
    console.log(data);
    const response = await axios.post(`${serverUrl}/api/units/ddlSupplyAirOpeningChanged`, data);
    console.log('          ------Output  Values-------          ');
    console.log({ ...data, ...response.data });
    dispatch(UnitSlice.actions.ddlSupplyAirOpeningChanged({ ...data, ...response.data }));
  };
}
// ----------------------------------------------------------------------
// console.log(data);
