import { useMemo } from 'react';

export const useGetDefaultValue = (edit, unitInfo, data) => {
  const defaultValues = useMemo(
    () => ({
      txtTag: edit ? unitInfo?.txbTagText : '',
      txbQty: edit ? unitInfo?.txbQtyText : 1,
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

  return defaultValues;
};

export const useUnit = (unit) => {
  console.log(unit);
};