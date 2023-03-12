// -------------------------------------------------------------------------
// DATABASE TABLES SAVING COLUMNS ID's
// -------------------------------------------------------------------------
export const strColumnID = 'id';
export const strColumnJobID = 'job_id';
export const strColumnUnitNo = 'unit_no';
export const strColumnComponentNo = 'component_no';
export const strColumnDrawingRequestID = 'drawing_request_id';
export const strColumnAttachedUnitNo = 'attached_Unit_no';

// -------------------------------------------------------------------------
// SESSION
// -------------------------------------------------------------------------
// export const strCtrlName = "CtrlName";
export const strSesVarElecHeaterVoltageID = 'ElecHeaterVoltageID';

// -------------------------------------------------------------------------
// ATTRIBUTES
// -------------------------------------------------------------------------
// export const strAttUnitNo = "UnitNo";
export const strAttProductTypeID = 'ProductTypeID';
// export const strAttQuoteID = "QuoteID";
// export const strAttUnitModelID = "UnitModelID";
export const strAttSelectionTypeID = 'SelectionTypeID';
export const strAttUnitVoltageID = 'UnitVoltageID';
export const strAttUnitModelSelected = 'UnitModelSelected';
// export const strAttUnitModel_1_HX_CondWarning = "UnitModel_1_HX_CondWarning";
// export const strAttUnitModel_2_HX_CondWarning = "UnitModel_2_HX_CondWarning";
// export const strAttUnitModel_3_HX_CondWarning = "UnitModel_3_HX_CondWarning";
// export const strAttUnitModel_4_HX_CondWarning = "UnitModel_4_HX_CondWarning";

// -------------------------------------------------------------------------
// ID'S FROM DATABASE TABLES
// -------------------------------------------------------------------------
export const intApplicationOtherID = 10;

export const intDesignDataCooling_010_Heating_990_ID = 1;
export const intDesignDataCooling_004_Heating_996_ID = 2;
// export const intDesignDataCooling_010_ID = 3;
// export const intDesignDataCooling_004_ID = 4;

export const intUoM_Imperial = 1;
export const intUoM_Metric = 2;

export const intCountryCanadaID = 1;
export const intCountryUSA_ID = 2;

// -------------------------------------------------------------------------
export const intProdTypeNovaID = 1;
export const intProdTypeVentumID = 2;
export const intProdTypeVentumLiteID = 3;
export const intProdTypeTerraID = 4;

export const intUnitTypeERV_ID = 1;
export const intUnitTypeHRV_ID = 2;
export const intUnitTypeAHU_ID = 3;

export const intControlsPrefCV_ID = 1;
export const intControlsPrefVAV_ID = 2;
export const intControlsPrefDCV_CO2_ID = 4;
export const intControlPrefByOthersID = 6;

export const intInstallationInteriorID = 1;
export const intInstalaltionExteriorID = 2;

export const intAirFlowApplicationCAV_ID = 1;
export const intAirFlowApplciationVAV_ID = 2;

export const intGeneralConfigurationSideSideID = 2;
export const intGeneralConfigurationTopBottomID = 3;

export const intLocationIndoorID = 1;
export const intLocationOutdoorID = 2;

export const intOrientationHorizontalID = 1;
export const intOrientationVerticalID = 2;

export const intFilterLocationOutdoorAirFilterID = 2;
export const intFilterLocationFinalFilterID = 3;
export const intFilterLocationReturnAirFilterID = 4;
export const intFilterModel_NA_ID = 1;
export const intFilterModel_2in_85_MERV_13_ID = 9;

export const intCoilTypeHotWaterID = 1;
export const intCoilTypeChilledWaterID = 2;
export const intCoilTypeDX_ID = 3;
export const intCoilTypeHotGasReheatID = 4;
export const intCoilTypeCondenserID = 5;
export const intCoilTypeSteamID = 6; // Not in use

export const intCompNA_ID = 1;
export const intCompElecHeaterID = 2;
export const intCompHWC_ID = 3;
export const intCompCWC_ID = 4;
export const intCompDX_ID = 5;
export const intCompHGRH_ID = 6;
export const intCompAutoID = 7;

export const intDamperActuatorNA_ID = 1;
export const intDamperActuatorNoCasingID = 2;
export const intDamperActuatorInCasingID = 4;

export const intElecHeaterInstallNA_ID = 1;
export const intElecHeaterInstallDuctMountedID = 2;
export const intElecHeaterInstallInCasingID = 3;

export const intNovaUnitModelID_A16IN = 1;
export const intNovaUnitModelID_B20IN = 2;
export const intNovaUnitModelID_A18OU = 6;
export const intNovaUnitModelID_B22OU = 7;

export const intVentumUnitModelID_H05IN_ERV = 1;
export const intVentumUnitModelID_H10IN_ERV = 2;
export const intVentumUnitModelID_H05IN_HRV = 7;
export const intVentumUnitModelID_H10IN_HRV = 8;

export const intVentumLiteUnitModelID_H04IN_ERV = 1;

export const intElectricVoltage_208V_1Ph_60HzID = 2;
export const intElectricVoltage_240V_1Ph_60HzID = 3;
export const intElectricVoltage_208V_3Ph_60HzID = 4;
export const intElectricVoltage_460V_3ph_60HzID = 6;

export const intFanPlacementLeftID = 1;
export const intFanPlacementRightID = 2;

export const intSA_Open_2_ID = 3;

export const intFOB_PointVancouverID = 1;
export const intFOB_PointTorontoID = 2;

export const intCustomerTypeAllID = 1;
export const intCustomerTypeAdminID = 2;
export const intCustomerTypeInternalID = 3;
export const intCustomerTypeRepID = 4;
export const intCustomerTypeSpecifyingID = 5;

export const intUserAdminID = 1; // ID
export const intUserAccess = 1; // Access 1:Yes, 2:No
export const intUAL_Admin = 10; // Access Level
export const intUAL_IntAdmin = 4; // Access Level
export const intUAL_IntLvl_2 = 3; // Access Level
export const intUAL_IntLvl_1 = 2; // Access Level
export const intUAL_External = 1; // Access Level
export const intUAL_ExternalSpecial = 5; // Access Level

export const intUserID_Dorothy = 8;
export const intUserID_Jamey = 1592;
export const intUserID_Jamie_Yeh = 809; // Jaime Yeh - AHRI Test

// -------------------------------------------------------------------------------------------------------
//  NO DATABASE ID'S
export const intSelectionTypeCoupled = 1;
export const intSelectionTypeDecoupled = 2;

export const strSelectionTypeCoupledValue = 'CP';
export const strSelectionTypeDecoupledValue = 'DC';

export const intNotRequired = -999999;
export const dblWinterPreheatSetpointDB_Min = 0;
export const dblSummerReheatSetpointDB_Min = 55;

export const strYes = 'Yes';
export const strNo = 'No';

export const intReportStageSelecionID = 1;
export const intReportStageSubmittalID = 2;

export const intCurrencyPercent = 1;
export const intCurrencyDollar = 2;

export const arrFanQtyToText = ['Zero', 'Single', 'Two', 'Three', 'Four', 'Five'];

export const strSoftwareVersion = 'Version 1.0.0.4'; //  2022-Feb-02

export const strPricingVersion = 'Version 1.0.0.0';
