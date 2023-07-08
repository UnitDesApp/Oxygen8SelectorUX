// @mui
import { enUS, frFR, zhCN, viVN, arSD } from '@mui/material/locale';
// routes
import { PATH_PROJECTS } from './routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API = process.env.REACT_APP_HOST_API_KEY || '';

export const FIREBASE_API = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const COGNITO_API = {
  userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  clientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
};

export const AUTH0_API = {
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
};

export const MAPBOX_API = process.env.REACT_APP_MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_PROJECTS.root; // as '/dashboard/app'

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

// SETTINGS
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const defaultSettings = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeContrast: 'default',
  themeLayout: 'horizontal',
  themeColorPresets: 'default',
  themeStretch: false,
};

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  {
    label: 'French',
    value: 'fr',
    systemValue: frFR,
    icon: '/assets/icons/flags/ic_flag_fr.svg',
  },
  {
    label: 'Vietnamese',
    value: 'vn',
    systemValue: viVN,
    icon: '/assets/icons/flags/ic_flag_vn.svg',
  },
  {
    label: 'Chinese',
    value: 'cn',
    systemValue: zhCN,
    icon: '/assets/icons/flags/ic_flag_cn.svg',
  },
  {
    label: 'Arabic (Sudan)',
    value: 'ar',
    systemValue: arSD,
    icon: '/assets/icons/flags/ic_flag_sa.svg',
  },
];

export const defaultLang = allLangs[0]; // English

// export const serverUrl = "http://localhost:51045";
export const serverUrl = "https://173.248.135.23:80";
// export const serverUrl = "https://oxygen8api.com";

// -------------------------------------------------------------------------
// ID'S FROM DATABASE TABLES
// -------------------------------------------------------------------------
export const intApplicationOtherID = 10;

export const intDesignDataCooling_010_Heating_990_ID = 1;
export const intDesignDataCooling_004_Heating_996_ID = 2;
export const intDesignDataCooling_010_ID = 3;
export const intDesignDataCooling_004_ID = 4;

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
