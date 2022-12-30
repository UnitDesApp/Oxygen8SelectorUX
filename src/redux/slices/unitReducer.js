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
      const { controlInfo, unitInfo, ualInfo } = actions.payload;
      state.controlInfo = {
        // ddlUnitTypeDataTbl: controlInfo.ddlUnitTypeDataTbl,
        // ddlUnitTypeId: controlInfo.ddlUnitTypeId,
        // ddlOrientationDataTbl: controlInfo.mainControlData.ddlOrientationDataTbl,
        // ddlOrientationId: controlInfo.mainControlData.ddlOrientationId,
        // ddlUnitModelDataTbl: controlInfo.mainControlData.ddlUnitModelDataTbl,
        // ddlUnitModelId: controlInfo.mainControlData.ddlUnitModelId,
        // divCustomVisible: visibleInfo.divCustomVisible,
        // divHeatExchCompVisible: visibleInfo.divHeatExchCompVisible,
        // divOutdoorAirDesignConditionsVisible: visibleInfo.divOutdoorAirDesignConditionsVisible,
        // divReturnAirDesignConditionsVisible: visibleInfo.divReturnAirDesignConditionsVisible,
        // divSetpoint_1Visible: visibleInfo.divSetpoint_1Visible,
        // divSubmittalItemsVisible: visibleInfo.divSubmittalItemsVisible,
        // ddlControlsPreferenceDataTbl: controlInfo.ddlControlsPreferenceDataTbl,
        // ddlControlsPreferenceId: controlInfo.ddlControlsPreferenceId,
        // ddlDamperAndActuatorDataTbl: controlInfo.ddlDamperAndActuatorDataTbl,
        // ddlDamperAndActuatorId: controlInfo.ddlDamperAndActuatorId,
        // ddlDamperAndActuatorVisible: controlInfo.ddlDamperAndActuatorVisible,
        // ddlCoolingCoilHandingDataTbl: controlInfo.ddlCoolingCoilHandingDataTbl,
        // ddlCoolingCoilHandingId: controlInfo.ddlCoolingCoilHandingId,
        // ddlHeatingCoilHandingDataTbl: controlInfo.ddlHeatingCoilHandingDataTbl,
        // ddlHeatingCoilHandingId: controlInfo.ddlHeatingCoilHandingId,
        // ddlPreheatCoilHandingDataTbl: controlInfo.ddlPreheatCoilHandingDataTbl,
        // ddlPreheatCoilHandingId: controlInfo.ddlPreheatCoilHandingId,
        // ddlValveTypeDataTbl: controlInfo.ddlValveTypeDataTbl,
        // ddlValveTypeId: controlInfo.ddlValveTypeId,
        // ckbVoltageSPP: controlInfo.ckbVoltageSPP,
        // divUnitBypassVisible: controlInfo.divUnitBypassVisible,
        // divVoltageSPPVisible: controlInfo.divVoltageSPPVisible,
        // ddlLocationDataTbl: controlInfo.unitTypes.ddlLocationDataTbl,
        // ddlLocationId: controlInfo.unitTypes.ddlLocationId,
        // ckbDownshot: controlInfo.unitTypes.ckbDownshot,
        // ddlOA_FilterModelDataTbl: controlInfo.unitTypes.ddlOA_FilterModelDataTbl,
        // ddlOA_FilterModelId: controlInfo.unitTypes.ddlOA_FilterModelId,
        // ddlRA_FilterModelDataTbl: controlInfo.unitTypes.ddlRA_FilterModelDataTbl,
        // ddlRA_FilterModelId: controlInfo.unitTypes.ddlRA_FilterModelId,
        // ddlPreheatCompDataTbl: controlInfo.unitTypes.ddlPreheatCompDataTbl,
        // ddlPreheatCompId: controlInfo.unitTypes.ddlPreheatCompId,
        // ddlHeatExchCompDataTbl: controlInfo.unitTypes.ddlHeatExchCompDataTbl,
        // ddlHeatExchCompId: controlInfo.unitTypes.ddlHeatExchCompId,
        // ddlCoolingCompDataTbl: controlInfo.unitTypes.ddlCoolingCompDataTbl,
        // ddlCoolingCompId: controlInfo.unitTypes.ddlCoolingCompId,
        // ddlHeatingCompDataTbl: controlInfo.unitTypes.ddlHeatingCompDataTbl,
        // ddlHeatingCompId: controlInfo.unitTypes.ddlHeatingCompId,
        // ddlCoolingFluidTypeDataTbl: controlInfo.unitTypes.ddlCoolingFluidTypeDataTbl,
        // ddlCoolingFluidTypeId: controlInfo.unitTypes.ddlCoolingFluidTypeId,
        // ddlCoolingFluidConcentrationDataTbl: controlInfo.unitTypes.ddlCoolingFluidConcentrationDataTbl,
        // ddlCoolingFluidConcentrationId: controlInfo.unitTypes.ddlCoolingFluidConcentrationId,
        // ddlHeatingFluidTypeDataTbl: controlInfo.unitTypes.ddlHeatingFluidTypeDataTbl,
        // ddlHeatingFluidTypeId: controlInfo.unitTypes.ddlHeatingFluidTypeId,
        // ddlHeatingFluidConcentrationDataTbl: controlInfo.unitTypes.ddlHeatingFluidConcentrationDataTbl,
        // ddlHeatingFluidConcentrationId: controlInfo.unitTypes.ddlHeatingFluidConcentrationId,
        // divCoolingCompVisible: controlInfo.unitTypes.divCoolingCompVisible,
        // divExhaustAirESPVisible: controlInfo.unitTypes.divExhaustAirESPVisible,
        // divHeatingCompVisible: controlInfo.unitTypes.divHeatingCompVisible,
        // divPreheatCompVisible: controlInfo.unitTypes.divPreheatCompVisible,
        // divRA_FilterModelVisible: controlInfo.unitTypes.divRA_FilterModelVisible,
        // divRA_FilterPDVisible: controlInfo.unitTypes.divRA_FilterPDVisible,
        // divSummerReturnAirCFMVisible: controlInfo.unitTypes.divSummerReturnAirCFMVisible,
        // // reheatInfo: controlInfo.unitTypes.componentOptions.reheatInfo,
        // coolingInfo: controlInfo.unitTypes.componentOptions.coolingInfo,
        // drainPanInfo: controlInfo.unitTypes.componentOptions.drainPanInfo,
        // customInputs: controlInfo.unitTypes.componentOptions.customInputs,
        // reheatSetpoints: controlInfo.unitTypes.componentOptions.reheatSetpoints,
        // dehumidification: controlInfo.unitTypes.componentOptions.dehumidification,
        // // valveAndActuatorInfo: controlInfo.unitTypes.componentOptions.valveAndActuatorInfo,
        // divDXC_MsgVisible: controlInfo.unitTypes.componentOptions.divDXC_MsgVisible,
        // // elecHeaterVoltageInfo: controlInfo.unitTypes.componentOptions.elecHeaterVoltageInfo,
        // // preheatElecHeaterInstallationInfo: controlInfo.unitTypes.componentOptions.preheatElecHeaterInstallationInfo,
        // // heatElecHeaterInstallationInfo: controlInfo.unitTypes.componentOptions.heatElecHeaterInstallationInfo,
        // ddlElecHeaterVoltageId: controlInfo.unitTypes.componentOptions.ddlElecHeaterVoltageId,
        // ddlPreheatElecHeaterInstallationId: controlInfo.unitTypes.componentOptions.ddlPreheatElecHeaterInstallationId,
        // ddlHeatElecHeaterInstallationId: controlInfo.unitTypes.componentOptions.ddlHeatElecHeaterInstallationId,
        // divPreheatSetpointVisible: controlInfo.unitTypes.componentOptions.divPreheatSetpointVisible,
        // divCoolingSetpointVisible: controlInfo.unitTypes.componentOptions.divCoolingSetpointVisible,
        // divHeatingSetpointVisible: controlInfo.unitTypes.componentOptions.divHeatingSetpointVisible,
        // divSetpointsVisible: controlInfo.unitTypes.componentOptions.divSetpointsVisible,
        // divHeatingFluidDesignConditionsVisible: controlInfo.unitTypes.componentOptions.divHeatingFluidDesignConditionsVisible,
        // // divCoolingFluidDesignConditionsVisible: controlInfo.unitTypes.componentOptions.coolingInfo.divCoolingFluidDesignConditionsVisible,
        // divDXRefrigSetpointVisible: controlInfo.unitTypes.componentOptions.divDXRefrigSetpointVisible,
        // divCondRefrigSetpointVisible: controlInfo.unitTypes.componentOptions.divDXRefrigSetpointVisible,
        // // ddlUnitVoltageDataTbl: controlInfo.mainControlData.others.ddlUnitVoltageDataTbl,
        // // ddlUnitVoltageId: controlInfo.mainControlData.others.ddlUnitVoltageId,
        // // ckbBypass: controlInfo.mainControlData.others.ckbBypass,
        // btnNextVisible: visibleInfo.btnNextVisible,
        // btnOutputVisible: visibleInfo.btnOutputVisible,
        // btnQuoteVisible: visibleInfo.btnQuoteVisible,
        // btnSubmittalsVisible: visibleInfo.btnSubmittalsVisible,
        // btnViewModelOptionVisible: visibleInfo.btnViewModelOptionVisible,
        // divNotesVisible: visibleInfo.divNotesVisible,
        // divUnitOpeningsMsgVisible: visibleInfo.divUnitOpeningsMsgVisible,
        // div_hx_fp_hiddenVisible: visibleInfo.div_hx_fp_hiddenVisible,
        // ddlHandingDataTbl: controlInfo.ddlHandingDataTbl,

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
        // ddlOrientationDataTbl: data.ddlOrientationDataTbl,
        // ddlOrientationId: data.ddlOrientationId,
        orientationInfo: data.orientationInfo,
        // ddlDamperAndActuatorId: data.ddlDamperAndActuatorId,
        // ddlDamperAndActuatorVisible: data.divDamperAndActuatorVisible,
        damperAndActuatorInfo: data.damperAndActuatorInfo,

        // ddlUnitModelDataTbl: data.ddlUnitModelDataTbl,
        // ddlUnitModelId: data.ddlUnitModelId,
        unitModelInfo: data.unitModelInfo,

        // ddlUnitVoltageDataTbl: data.others.ddlUnitVoltageDataTbl,
        // ddlUnitVoltageId: data.others.ddlUnitVoltageId,
        unitVoltageInfo: data.unitVoltageInfo,

        elecHeaterVoltageInfo: data.elecHeaterVoltageInfo,
        // ddlElecHeaterVoltageId: data.others.elecHeaterVoltageInfo.ddlElecHeaterVoltageId,
        // ckbBypass: data.others.ckbBypass.ckbBypassChecked,
        bypassInfo: data.bypassInfo,
        // ckbDownshot: data.downshot,
        downshotInfo: data.downshotInfo,

        preheatElecHeaterInstallationInfo: data.preheatElecHeaterInstallationInfo,
        // ddlPreheatElecHeaterInstallationId: data.preheatElecHeaterInstallationInfo.ddlPreheatElecHeaterInstallationId,
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
        // ddlUnitModelDataTbl: data.ddlUnitModelDataTbl,
        // ddlUnitModelId: data.ddlUnitModelId,
        // ddlUnitVoltageDataTbl: data.others.ddlUnitVoltageDataTbl,
        // ddlUnitVoltageId: data.others.ddlUnitVoltageId,
        // ddlElecHeaterVoltageId: data.others.elecHeaterVoltageInfo.ddlElecHeaterVoltageId,
        // ddlElecHeaterVoltageDataTbl: data.others.ddlElecHeaterVoltageDataTbl,
        // ckbBypass: data.others.ckbBypass.ckbBypassChecked,
        // ddlSupplyAirOpeningDataTbl: data.ddlSupplyAirOpeningDataTbl,
      };

      state.unitInfo = {
        ...state.unitInfo,
        // ddlSupplyAirOpeningId: data.ddlSupplyAirOpeningId,
        // ddlSupplyAirOpeningText: data.ddlSupplyAirOpeningText,
      };
    },
    txbSummerSupplyAirCFMChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        // ddlOrientationDataTbl: data.ddlOrientationDataTbl,
        // ddlOrientationId: data.ddlOrientationId,
        // ddlUnitModelDataTbl: data.ddlUnitModelDataTbl,
        // ddlUnitModelId: data.ddlUnitModelId,
        // ddlUnitVoltageDataTbl: data.others.ddlUnitVoltageDataTbl,
        // ddlUnitVoltageId: data.others.ddlUnitVoltageId,
        // ddlSupplyAirOpeningDataTbl: data.ddlSupplyAirOpeningDataTbl,
        // ddlElecHeaterVoltageId: data.others.elecHeaterVoltageInfo.ddlElecHeaterVoltageId,
        // ddlElecHeaterVoltageDataTbl: data.others.ddlElecHeaterVoltageDataTbl,
        // ckbBypass: data.others.ckbBypass,
      };

      state.unitInfo = {
        ...state.unitInfo,
        txbSummerSupplyAirCFM: data.txbSummerSupplyAirCFM,
        txbSummerReturnAirCFM: data.txbSummerReturnAirCFM,
        ddlSupplyAirOpeningId: data.ddlSupplyAirOpeningId,
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
        ddlUnitVoltageDataTbl: data.ddlUnitVoltageDataTbl,
        ddlUnitVoltageId: data.ddlUnitVoltageId,
        ddlElecHeaterVoltageId: data.others.elecHeaterVoltageInfo.ddlElecHeaterVoltageId,
        ddlElecHeaterVoltageDataTbl: data.ddlElecHeaterVoltageDataTbl,
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
        // ddlPreheatCompId: data.ddlPreheatCompId,
        // componentInfo: data.componentInfo,
        preheatRequiredInfo: data.preheatRequiredInfo,
        elecHeaterVoltageInfo: data.elecHeaterVoltageInfo,
        // ddlElecHeaterVoltageId: data.elecHeaterVoltageInfo.ddlElecHeaterVoltageId,
        preheatElecHeaterInstallationInfo: data.preheatElecHeaterInstallationInfo,
        customInputsInfo: data.customInputsInfo,
        // customInputs: data.customInputs,
        // divHeatingFluidDesignConditionsVisible: data.divHeatingFluidDesignConditionsVisible,
        // ddlPreheatElecHeaterInstallationId: data.preheatElecHeaterInstallationInfo.ddlPreheatElecHeaterInstallationId,
        // lblPreheatWarningText: data.preheatInfomation.lblPreheatWarningText,
        // lblPreheatWarningVisible: data.preheatInfomation.lblPreheatWarningVisible,
        valveAndActuatorInfo: data.valveAndActuatorInfo,
        // ckbValveAndActuator: data.ckbValveAndActuator,
        preheatCoilHandingInfo: data.preheatCoilHandingInfo,
        valveTypeInfo: data.valveTypeInfo,
        setpointsInfo: data.setpointsInfo,
        preheatSetpointsInfo: data.preheatSetpointsInfo,
        heatingFluidDesignCondInfo: data.heatingFluidDesignConditionsInfo,
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
        setpointsInfo: data.setpointsInfo,
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
        elecHeaterVoltageInfo: data.elecHeaterVoltageInfo,
        heatElecHeaterInstallationInfo: data.heatElecHeaterInstallationInfo,
        valveAndActuatorInfo: data.valveAndActuatorInfo,
        heatingCoilHandingInfo: data.heatingCoilHandingInfo,
        valveTypeInfo: data.valveTypeInfo,
        setpointsInfo: data.setpointsInfo,
        heatingSetpointInfo: data.heatingSetpointInfo,

        // ddlHeatElecHeaterInstallationId: data.heatElecHeaterInstallationInfo.ddlHeatElecHeaterInstallationId,
        // divHeatingFluidDesignConditionsVisible: data.divHeatingFluidDesignConditionsVisible,
        // divHeatingSetpointVisible: data.divHeatingSetpointVisible,
        // divSetpointsVisible: data.divSetpointsVisible,
        customInputsInfo: data.customInputsInfo,
        // ddlElecHeaterVoltageId: data.elecHeaterVoltageInfo.ddlElecHeaterVoltageId,
        heatingFluidDesignCondInfo: data.heatingFluidDesignConditionsInfo,
      };
    },
    ckbHeatPumpChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        elecHeaterVoltageInfo: data.elecHeaterVoltageInfo,
        heatElecHeaterInstallationInfo: data.heatElecHeaterInstallationInfo,
        heatingFluidDesignConditionsInfo: data.heatingFluidDesignConditionsInfo,
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
      };
    },
    ddlReheatCompChanged(state, actions) {
      const data = actions.payload;
      state.controlInfo = {
        ...state.controlInfo,
        elecHeaterVoltageInfo: data.elecHeaterVoltageInfo,
        heatElecHeaterInstallationInfo: data.heatElecHeaterInstallationInfo,
       // ddlHeatElecHeaterInstallationId: data.heatElecHeaterInstallationInfo.ddlPreheatElecHeaterInstallationId,
        valveAndActuatorInfo: data.valveAndActuatorInfo,
        preheatCoilHandingInfo: data.preheatCoilHandingInfo,
        valveTypeInfo: data.valveTypeInfo,
        setpointsInfo: data.divSetpointsVisible,
        reheatSetpointInfo: data.reheatSetpointInfo,
        heatingFluidDesignCondInfo: data.heatingFluidDesignCondInfo,
        // ddlElecHeaterVoltageId: data.elecHeaterVoltageInfo.ddlElecHeaterVoltageId,
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
          Data: data?.outputPreheatElecHeater?.gvOutPreheatElecHeaterDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
        },
        preheatHWC: {
          Visible: data?.divOutPreheatHWCVisible,
          Data: data?.outputPreheatHWC?.gvOutPreheatHWC_DataDataSource.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.outputPreheatHWC?.gvOutPreheatHWC_EnteringDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          Leaving: data?.outputPreheatHWC?.gvOutPreheatHWC_LeavingDataSource.map((item) => [item.cLabel, item.cValue]),
          ValveActuator: data?.outputPreheatHWC?.gvOutPreheatHWC_ValveActuatorDataDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
        },
        heatExchCORE: {
          performanceVisible: data.divOutHX_FPVisible && data?.outputFixedPlateCORE?.divOutHX_FPVisible,
          performance: data?.outputFixedPlateCORE?.gvOutHX_FP_PerfDataSource.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          designConditions: data?.outputFixedPlateCORE?.gvOutHX_FP_EntAirDataSource.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          designConditionsVisible: data?.outputFixedPlateCORE?.gvOutHX_FP_EntAirVisible,
          performanceLeavingAir: data?.outputFixedPlateCORE?.gvOutHX_FP_LvgAirDataSource.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          performanceLeavingAirVisible: data?.outputFixedPlateCORE?.gvOutHX_FP_LvgAirVisible,
        },
        heatExchRECUTECH: {
          performanceVisible: data.divOutHX_FPVisible && data?.outputFixedRECUTECH?.divOutHX_FPVisible,
          performance: data?.outputFixedRECUTECH?.gvOutHX_FP_PerfDataSource.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          designConditions: data?.outputFixedRECUTECH?.gvOutHX_FP_EntAirDataSource.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          designConditionsVisible: data?.outputFixedRECUTECH?.gvOutHX_FP_EntAirVisible,
          performanceLeavingAir: data?.outputFixedRECUTECH?.gvOutHX_FP_LvgAirDataSource.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          performanceLeavingAirVisible: data?.outputFixedRECUTECH?.gvOutHX_FP_LvgAirVisible,
        },
        heatExchPOLYBLOC: {
          performanceVisible: data.divOutHX_FPVisible && data?.outputFixedPOLYBLOC?.divOutHX_FPVisible,
          performance: data?.outputFixedPOLYBLOC?.gvOutHX_FP_PerfDataSource.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          designConditions: data?.outputFixedPOLYBLOC?.gvOutHX_FP_EntAirDataSource.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          designConditionsVisible: data?.outputFixedPOLYBLOC?.gvOutHX_FP_EntAirVisible,
          performanceLeavingAir: data?.outputFixedPOLYBLOC?.gvOutHX_FP_LvgAirDataSource.map((item) => [
            item.cLabel,
            item.cValue_1,
            item.cValue_2,
          ]),
          performanceLeavingAirVisible: data?.outputFixedPOLYBLOC?.gvOutHX_FP_LvgAirVisible,
        },
        coolingCWC: {
          Visible: data.divOutCoolingCWCVisible,
          Data: data?.outputCoolingCWC?.gvOutCoolingCWC_DataDataSource.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.outputCoolingCWC?.gvOutCoolingCWC_EnteringDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          Leaving: data?.outputCoolingCWC?.gvOutCoolingCWC_LeavingDataSource.map((item) => [item.cLabel, item.cValue]),
          ValveActuator: data?.outputCoolingCWC?.gvOutCoolingCWC_ValveActuatorDataDataSource.map((item) => [item.cLabel, item.cValue]),
        },
        coolingDXC: {
          Visible: data.divOutCoolingDXC_RAE_Visible,
          Data: data?.outputCoolingDXC?.gvOutCoolingDXC_RAE_DataDataSource.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.outputCoolingDXC?.gvOutCoolingDXC_RAE_EnteringDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          Leaving: data?.outputCoolingDXC?.gvOutCoolingDXC_RAE_LeavingDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          PerfOutputs: data?.outputCoolingDXC?.gvOutCoolingDXC_RAE_PerfOutputsDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          EKEXV_Kit: data?.outputCoolingDXC?.gvOutCoolingDXC_RAE_EKEXV_KitDataDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
        },
        heatingCondCoil: {
          Visible: data.divOutHeatingCondCoilVisible,
          Data: data?.outputHeatingCondCoil?.gvOutHeatingCondCoil_DataDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          Entering: data?.outputHeatingCondCoil?.gvOutHeatingCondCoil_EnteringDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          Leaving: data?.outputHeatingCondCoil?.gvOutHeatingCondCoil_LeavingDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
        },
        heatingElecHeater: {
          Visible: data.divOutHeatingElecHeaterVisible,
          Data: data?.outputHeatingElecHeater?.gvOutHeatingElecHeaterDataDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
        },
        heatingHWC: {
          Visible: data.divOutHeatingHWCVisible,
          Data: data?.outputHeatingHWC?.gvOutHeatingHWC_DataDataSource.map((item) => [item.cLabel, item.cValue]),
          Entering: data?.outputHeatingHWC?.gvOutHeatingHWC_EnteringDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          Leaving: data?.outputHeatingHWC?.gvOutHeatingHWC_LeavingDataSource.map((item) => [item.cLabel, item.cValue]),
          ValveActuator: data?.outputHeatingHWC?.gvOutHeatingHWC_ValveActuatorDataDataSource.map((item) => [item.cLabel, item.cValue]),
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
          Entering: data?.outputReheatHGRC?.gvOutReheatHGRC_RAE_EnteringDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          Leaving: data?.outputReheatHGRC?.gvOutReheatHGRC_RAE_LeavingDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          PerfOutputs: data?.outputReheatHGRC?.gvOutReheatHGRC_RAE_PerfOutputsDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
          EKEXV_Kit: data?.outputReheatHGRC?.gvOutReheatHGRC_RAE_EKEXV_KitDataDataSource.map((item) => [
            item.cLabel,
            item.cValue,
          ]),
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
          Data: data?.outputSoundData?.gvOutSoundDataDataSource.map((item) => [
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
      state.layoutInfo = {
        ...state.layoutInfo,
        ddlHandingID: parseInt(action.payload.ddlHandingID, 10),
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
      state.layoutInfo = {
        ...state.layoutInfo,
        ddlHandingId: parseInt(action.payload.ddlHandingId, 10),
        ddlSupplyAirOpeningDataTbl: action.payload.ddlSupplyAirOpeningDataTbl,
        ddlSupplyAirOpeningId: parseInt(action.payload.ddlSupplyAirOpeningId, 10),
        ddlSupplyAirOpeningText: action.payload.ddlSupplyAirOpeningText,
      };

      state.unitInfo = {
        ...state.unitInfo,
        ddlHandingId: parseInt(action.payload.ddlHandingId, 10),
        ddlPreheatCoilHandingId: parseInt(action.payload.ddlHandingId, 10),
        ddlCoolingCoilHandingId: parseInt(action.payload.ddlHandingId, 10),
        ddlHeatingCoilHandingId: parseInt(action.payload.ddlHandingId, 10),
      };
    },
    ddlSupplyAirOpeningChanged(state, action) {
      state.layoutInfo = {
        ...state.layoutInfo,
        ddlSupplyAirOpeningId: parseInt(action.payload.ddlSupplyAirOpeningId, 10),
        ddlSupplyAirOpeningText: action.payload.ddlSupplyAirOpeningText,
        ddlOutdoorAirOpeningDataTbl: action.payload.ddlOutdoorAirOpeningDataTbl,
        ddlOutdoorAirOpeningId: parseInt(action.payload.ddlOutdoorAirOpeningId, 10),
        ddlOutdoorAirOpeningText: action.payload.ddlOutdoorAirOpeningText,
        ddlExhaustAirOpeningDataTbl: action.payload.ddlExhaustAirOpeningDataTbl,
        ddlExhaustAirOpeningId: parseInt(action.payload.ddlExhaustAirOpeningId, 10),
        ddlExhaustAirOpeningText: action.payload.ddlExhaustAirOpeningText,
        ddlReturnAirOpeningDataTbl: action.payload.ddlReturnAirOpeningDataTbl,
        ddlReturnAirOpeningId: parseInt(action.payload.ddlReturnAirOpeningId, 10),
        ddlReturnAirOpeningText: action.payload.ddlReturnAirOpeningText,
      };

      state.unitInfo = {
        ...state.unitInfo,
        ddlSupplyAirOpeningId: parseInt(action.payload.ddlSupplyAirOpeningId, 10),
        ddlSupplyAirOpeningText: action.payload.ddlSupplyAirOpeningText,
        ddlOutdoorAirOpeningId: parseInt(action.payload.ddlOutdoorAirOpeningId, 10),
        ddlOutdoorAirOpeningText: action.payload.ddlOutdoorAirOpeningText,
        ddlExhaustAirOpeningId: parseInt(action.payload.ddlExhaustAirOpeningId, 10),
        ddlExhaustAirOpeningText: action.payload.ddlExhaustAirOpeningText,
        ddlReturnAirOpeningId: parseInt(action.payload.ddlReturnAirOpeningId, 10),
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
