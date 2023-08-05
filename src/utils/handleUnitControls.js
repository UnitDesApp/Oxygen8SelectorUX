import { gridVisibleColumnDefinitionsSelector } from '@mui/x-data-grid';

const ClsID = require('../config');

const bolExecuteSummerWB = true;
const bolExecuteSummerRH = true;
const bolExecuteWinterWB = true;
const bolExecuteWinterRH = true;

const dblTempErrorValue = 0.0;

const intNOVA_MIN_CFM = 325;
const intNOVA_MAX_CFM = 9000;

const intNOVA_INT_USERS_MIN_CFM = 325;
const intNOVA_INT_USERS_MAX_CFM = 8100;
const intNOVA_HORIZONTAL_MAX_CFM = 3500;

const intVEN_MIN_CFM_NO_BYPASS = 325;
const intVEN_MAX_CFM_NO_BYPASS = 3000;
const intVEN_MIN_CFM_WITH_BYPASS = 325;
const intVEN_MAX_CFM_WITH_BYPASS = 3000;

const intVEN_INT_USERS_MIN_CFM_NO_BYPASS = 300;
const intVEN_INT_USERS_MAX_CFM_NO_BYPASS = 3048;
const intVEN_INT_USERS_MIN_CFM_WITH_BYPASS = 300;
const intVEN_INT_USERS_MAX_CFM_WITH_BYPASS = 3048;

const intVENLITE_MIN_CFM_NO_BYPASS = 200;
const intVENLITE_MAX_CFM_NO_BYPASS = 500;
const intVENLITE_MIN_CFM_WITH_BYPASS = 200;
const intVENLITE_MAX_CFM_WITH_BYPASS = 500;

const intVENLITE_INT_USERS_MIN_CFM_NO_BYPASS = 170;
const intVENLITE_INT_USERS_MAX_CFM_NO_BYPASS = 500;
const intVENLITE_INT_USERS_MIN_CFM_WITH_BYPASS = 170;
const intVENLITE_INT_USERS_MAX_CFM_WITH_BYPASS = 500;

const intVENPLUS_MIN_CFM_NO_BYPASS = 1200;
const intVENPLUS_MAX_CFM_NO_BYPASS = 10000;
const intVENPLUS_MIN_CFM_WITH_BYPASS = 1200;
const intVENPLUS_MAX_CFM_WITH_BYPASS = 10000;

const intVENPLUS_INT_USERS_MIN_CFM_NO_BYPASS = 1080;
const intVENPLUS_INT_USERS_MAX_CFM_NO_BYPASS = 10000;
const intVENPLUS_INT_USERS_MIN_CFM_WITH_BYPASS = 1080;
const intVENPLUS_INT_USERS_MAX_CFM_WITH_BYPASS = 10000;

const intTERA_MIN_CFM_NO_BYPASS = 450;
const intTERA_MAX_CFM_NO_BYPASS = 2400;
const intTERA_MIN_CFM_WITH_BYPASS = 450;
const intTERA_MAX_CFM_WITH_BYPASS = 500;

const intTERA_INT_USERS_MIN_CFM_NO_BYPASS = 400;
const intTERA_INT_USERS_MAX_CFM_NO_BYPASS = 2500;
const intTERA_INT_USERS_MIN_CFM_WITH_BYPASS = 400;
const intTERA_INT_USERS_MAX_CFM_WITH_BYPASS = 2500;

const bolPreheatRequired = false;
const intVelocity = 0;
const intSelectedValue = 0;
const dblHtgEntFluidTempSavedByInternalUser = 0;
const dblHtgLvgFluidTempSavedByInternalUser = 0;

const getFromLink = (data, linkColumn, dataLink, sortColumn) => {
  if (!data || !dataLink) return [];
  const dt = data.sort((a, b) => a.id - b.id);
  const dtLink = dataLink.sort((a, b) => a[sortColumn] - b[sortColumn]);
  let intID = 0;
  let intLinkID = 0;

  const dtSelected = new Array([]);

  for (let i = 0; i < dt.length; i += 1) {
    intID = Number(dt[i].id);
    for (let j = 0; j < dtLink.length; j += 1) {
      intLinkID = Number(dtLink[j][linkColumn]);

      if (intID === intLinkID) {
        const dr = {};
        dr.id = Number(dt[i].id);
        dr.items = dt[i].items.toString();

        if (sortColumn !== '') {
          dr[sortColumn] = Number(dt[i][sortColumn]);
        }

        dr.bypass_exist = dt[i]?.bypass_exist?.toString();
        dr.bypass_exist_horizontal_unit = dt[i]?.bypass_exist_horizontal_unit?.toString();
        dr.model_bypass = dt[i]?.model_bypass?.toString();

        dtSelected.push(dr);
        break;
      }

      if (intLinkID > intID) {
        break;
      }
    }
  }

  return dtSelected;
};

const get_ddlItemsAddedOnID = (_dt, _strLinkColumn, _dtLink) => {
  if (!_dt?.length || !_dtLink?.length) return;
  const dt = Array.from(_dt)
  const dtLink = Array.from(_dtLink);
  dt.sort((a, b) => a.id - b.id);
  dtLink.sort((a, b) => a[_strLinkColumn] - b[_strLinkColumn]);
  let intID = 0;
  let intLinkID = 0;

  const dtSelected = [];

  for (let i = 0; i < dt.length; i += 1) {
    intID = Number(dt[i].id);
    for (let j = 0; j < dtLink.length; j += 1) {
      intLinkID = Number(dtLink[j][_strLinkColumn]);

      if (intID === intLinkID) {
        const dr = {};
        dr.id = Number(dt[i].id);
        dr.items = dt[i].items.toString();

        dtSelected.push(dr);
        break;
      }

      if (intLinkID > intID) {
        break;
      }
    }
  }

  // eslint-disable-next-line consistent-return
  return dtSelected;
};

const sortColume = (data, colume) => data.sort((a, b) => a[colume] - b[colume]);

const unitModelFilter = (data, value, minColumeName, maxColumeName, unitModelId) =>
  data?.filter((item) => (item[minColumeName] >= value && value <= item[maxColumeName]) || item.id === unitModelId)
    .sort((a, b) => a.cfm_max - b.cfm_max);

export const getUnitModel = (values, data, intUAL) => {
  const { intUnitTypeID, intProductTypeID } = values;
  const unitModelId = values.ddlUnitModelId;
  const locationId = values.ddlLocationId;
  const orientationId = values.ddlOrientationId;
  let unitModel = new Array([]);
  let summerSupplyAirCFM = Number(values.txbSummerSupplyAirCFM);
  let ckbBypassVal = Number(values.ckbBypassVal);

  if (locationId > -1 && orientationId > -1) {
    let unitModelLink;
    let location;
    let orientation;

    switch (intProductTypeID) {
      case ClsID.intProdTypeNovaID:
        unitModelLink = data.novaUnitModelLocOriLink;
        location = data.generalLocation?.filter((item) => item.id === locationId);
        orientation = data.generalOrientation?.filter((item) => item.id === orientationId);

        unitModelLink = unitModelLink.filter(
          (item) =>
            item.location_value === location[0].value.toString() && item.orientation_value === orientation[0].value
        );

        if (intUAL === ClsID.intUAL_External || intUAL === ClsID.intUAL_ExternalSpecial) {
          unitModel = unitModelFilter(
            data.novaUnitModel,
            summerSupplyAirCFM,
            'cfm_min_ext_users',
            'cfm_max_ext_users',
            unitModelId
          );
        } else {
          unitModel = unitModelFilter(data.novaUnitModel, summerSupplyAirCFM, 'cfm_min', 'cfm_max', unitModelId);
        }

        if (intUAL === ClsID.intUAL_External || intUAL === ClsID.intUAL_ExternalSpecial) {
          unitModel = unitModel?.filter((item) => item.enabled_ext_users === 1);
        }

        unitModel = getFromLink(unitModel, 'unit_model_id', unitModelLink, 'cfm_max');
        unitModel = sortColume(unitModel, 'cfm_max');

        if (values.ckbBypassVal === 1) {
          const drUnitModelBypass = unitModel.filter((item) => item.bypass_exist === 1);
          const unitModelBypass = drUnitModelBypass || [];

          if (unitModelBypass.length > 0) {
            unitModel = unitModel?.filter((item) => item.bypass_exist === 1);

            if (orientationId === ClsID.intOrientationHorizontalID) {
              const drUnitModelBypassHorUnit = unitModel.filter((item) => item.bypass_exist_horizontal_unit === 1);
              const unitModelBypassHorUnit = drUnitModelBypassHorUnit ? drUnitModelBypassHorUnit() : [];

              if (unitModelBypassHorUnit.length > 0) {
                unitModel = unitModel?.filter((item) => item.bypass_exist_horizontal_unit === 1);
              } else {
                ckbBypassVal = 0;
              }
            }
          }
        }
        break;
      case ClsID.intProdTypeVentumID:
        if (ckbBypassVal === 1) {
          summerSupplyAirCFM =
            summerSupplyAirCFM > intVEN_MAX_CFM_WITH_BYPASS ? intVEN_MAX_CFM_WITH_BYPASS : summerSupplyAirCFM;
        }

        if (intUAL === ClsID.intUAL_External || intUAL === ClsID.intUAL_ExternalSpecial) {
          if (intUnitTypeID === ClsID.intUnitTypeERV_ID) {
            unitModel = unitModelFilter(
              data.ventumHUnitModel,
              summerSupplyAirCFM,
              'erv_cfm_min_ext_users',
              'erv_cfm_max_ext_users',
              unitModelId
            );
          } else if (intUnitTypeID === ClsID.intUnitTypeHRV_ID) {
            unitModel = unitModelFilter(
              data.ventumHUnitModel,
              summerSupplyAirCFM,
              'hrv_cfm_min_ext_users',
              'hrv_cfm_max_ext_users',
              unitModelId
            );
          }
        } else {
          unitModel = unitModelFilter(data.ventumHUnitModel, summerSupplyAirCFM, 'cfm_min', 'cfm_max', unitModelId);
        }

        unitModel = unitModel?.filter((item) => item.bypass === ckbBypassVal);

        // getReheatInfo();    //Only for Ventum - H05 has no HGRH option
        break;
      case ClsID.intProdTypeVentumLiteID:
        ckbBypassVal = 0;

        if (intUAL === ClsID.intUAL_IntLvl_1 || intUAL === ClsID.intUAL_IntLvl_2) {
          if (intUnitTypeID === ClsID.intUnitTypeERV_ID) {
            unitModel = unitModelFilter(
              data.ventumLiteUnitModel,
              summerSupplyAirCFM,
              'cfm_min',
              'cfm_max',
              unitModelId
            );
          } else if (intUnitTypeID === ClsID.intUnitTypeHRV_ID) {
            unitModel = unitModelFilter(
              data.ventumLiteUnitModel,
              summerSupplyAirCFM,
              'cfm_min',
              'cfm_max',
              unitModelId
            );
          }
        } else if (intUAL === ClsID.intUAL_External || intUAL === ClsID.intUAL_ExternalSpecial) {
          if (intUnitTypeID === ClsID.intUnitTypeERV_ID) {
            unitModel = unitModelFilter(
              data.ventumLiteUnitModel,
              summerSupplyAirCFM,
              'erv_cfm_min_ext_users',
              'erv_cfm_max_ext_users',
              unitModelId
            );
          } else if (intUnitTypeID === ClsID.intUnitTypeHRV_ID) {
            unitModel = unitModelFilter(
              data.ventumLiteUnitModel,
              summerSupplyAirCFM,
              'hrv_cfm_min_ext_users',
              'hrv_cfm_max_ext_users',
              unitModelId
            );
          }

          const drUnitModel = unitModel.filter((item) => item.enabled_ext_users === 1);
          unitModel = drUnitModel || [];
        } else {
          unitModel = unitModelFilter(data.ventumLiteUnitModel, summerSupplyAirCFM, 'cfm_min', 'cfm_max', unitModelId);
        }

        unitModel = unitModel?.filter((item) => item.enabled === 1 && item.bypass === ckbBypassVal);
        break;
      case ClsID.intProdTypeVentumPlusID:
        if (ckbBypassVal === 1) {
          summerSupplyAirCFM =
            summerSupplyAirCFM > intVENPLUS_MAX_CFM_WITH_BYPASS ? intVENPLUS_MAX_CFM_WITH_BYPASS : summerSupplyAirCFM;
        }

        if (intUAL === ClsID.intUAL_External || intUAL === ClsID.intUAL_ExternalSpecial) {
          if (intUnitTypeID === ClsID.intUnitTypeERV_ID) {
            unitModel = unitModelFilter(data.ventumPlusUnitModel, summerSupplyAirCFM, 'erv_cfm_min_ext_users', 'erv_cfm_max_ext_users', unitModelId);
          } else if (intUnitTypeID === ClsID.intUnitTypeHRV_ID) {
            unitModel = unitModelFilter(data.ventumPlusUnitModel,summerSupplyAirCFM,'hrv_cfm_min_ext_users','hrv_cfm_max_ext_users',unitModelId);
          }
        } else {
          unitModel = unitModelFilter(data.ventumPlusUnitModel, summerSupplyAirCFM, 'cfm_min', 'cfm_max', unitModelId);
        }
        location = data.generalLocation?.filter((item) => item.id === locationId);
        unitModel = unitModel?.filter(
          (item) => item.location_id_key === location[0].id_key && item.enabled === 1 && item.bypass === ckbBypassVal
        );
        break;
      case ClsID.intProdTypeTerraID:
        if (intUAL === ClsID.intUAL_External || intUAL === ClsID.intUAL_ExternalSpecial) {
          unitModel = unitModelFilter(
            data.terraUnitModel,
            summerSupplyAirCFM,
            'cfm_min_ext_users',
            'cfm_max_ext_users',
            unitModelId
          );

          const drUnitModel = unitModel.filter((item) => item.enabled_ext_users === 1);
          unitModel = drUnitModel || [];
        } else {
          unitModel = unitModelFilter(data.terraUnitModel, summerSupplyAirCFM, 'cfm_min', 'cfm_max', unitModelId);
        }

        break;
      default:
        break;
    }
  }

  return { unitModel, summerSupplyAirCFM };
};

export const getSummerSupplyAirCFM = (summerSupplyAirCFM, intProductTypeID, intUAL, ckbBypassVal) => {
  let intSummerSupplyAirCFM = Number(summerSupplyAirCFM);
  switch (intProductTypeID) {
    case ClsID.intProdTypeNovaID:
      if (intUAL === ClsID.intUAL_Admin || intUAL === ClsID.intUAL_IntAdmin || intUAL === ClsID.intUAL_IntLvl_2 || intUAL === ClsID.intUAL_IntLvl_1) {
        if (intSummerSupplyAirCFM < intNOVA_MIN_CFM) { intSummerSupplyAirCFM = intNOVA_MIN_CFM; }
        else if (intSummerSupplyAirCFM > intNOVA_MAX_CFM) { intSummerSupplyAirCFM = intNOVA_MAX_CFM; }
      } else if (intSummerSupplyAirCFM < intNOVA_INT_USERS_MIN_CFM) { intSummerSupplyAirCFM = intNOVA_INT_USERS_MIN_CFM; }
        else if (intSummerSupplyAirCFM > intNOVA_INT_USERS_MAX_CFM) { intSummerSupplyAirCFM = intNOVA_INT_USERS_MAX_CFM; }
      break;
    case ClsID.intProdTypeVentumID:
      if (intUAL === ClsID.intUAL_Admin || intUAL === ClsID.intUAL_IntAdmin || intUAL === ClsID.intUAL_IntLvl_2 || intUAL === ClsID.intUAL_IntLvl_1) {
        if (ckbBypassVal === 1) {
          if (intSummerSupplyAirCFM < intVEN_INT_USERS_MIN_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intVEN_INT_USERS_MIN_CFM_WITH_BYPASS; }
          else if (intSummerSupplyAirCFM > intVEN_INT_USERS_MAX_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intVEN_INT_USERS_MAX_CFM_WITH_BYPASS; }
        } else if (intSummerSupplyAirCFM < intVEN_INT_USERS_MIN_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intVEN_INT_USERS_MIN_CFM_NO_BYPASS; }
          else if (intSummerSupplyAirCFM > intVEN_INT_USERS_MAX_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intVEN_INT_USERS_MAX_CFM_NO_BYPASS; }
      } else if (ckbBypassVal === 1) {
          if (intSummerSupplyAirCFM < intVEN_MIN_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intVEN_MIN_CFM_WITH_BYPASS; }
          else if (intSummerSupplyAirCFM > intVEN_MAX_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intVEN_MAX_CFM_WITH_BYPASS; }
        } else if (intSummerSupplyAirCFM < intVEN_MIN_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intVEN_MIN_CFM_NO_BYPASS; }
          else if (intSummerSupplyAirCFM > intVEN_MAX_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intVEN_MAX_CFM_NO_BYPASS; }
      break;
    case ClsID.intProdTypeVentumLiteID:
      if (intUAL === ClsID.intUAL_Admin || intUAL === ClsID.intUAL_IntAdmin || intUAL === ClsID.intUAL_IntLvl_2 || intUAL === ClsID.intUAL_IntLvl_1) {
        if (ckbBypassVal === 1) {
          if (intSummerSupplyAirCFM < intVENLITE_INT_USERS_MIN_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intVENLITE_INT_USERS_MIN_CFM_WITH_BYPASS; }
          else if (intSummerSupplyAirCFM > intVENLITE_INT_USERS_MAX_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intVENLITE_INT_USERS_MAX_CFM_WITH_BYPASS; }
        } else if (intSummerSupplyAirCFM < intVENLITE_INT_USERS_MIN_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intVENLITE_INT_USERS_MIN_CFM_NO_BYPASS; }
          else if (intSummerSupplyAirCFM > intVENLITE_INT_USERS_MAX_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intVENLITE_INT_USERS_MAX_CFM_NO_BYPASS; }
      } else if (ckbBypassVal === 1) {
          if (intSummerSupplyAirCFM < intVENLITE_MIN_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intVENLITE_MIN_CFM_WITH_BYPASS; }
          else if (intSummerSupplyAirCFM > intVENLITE_MAX_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intVENLITE_MAX_CFM_WITH_BYPASS; }
        } else if (intSummerSupplyAirCFM < intVENLITE_MIN_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intVENLITE_MIN_CFM_NO_BYPASS; }
          else if (intSummerSupplyAirCFM > intVENLITE_MAX_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intVENLITE_MAX_CFM_NO_BYPASS; }
      break;
    case ClsID.intProdTypeVentumPlusID:
      if (intUAL === ClsID.intUAL_Admin || intUAL === ClsID.intUAL_IntAdmin || intUAL === ClsID.intUAL_IntLvl_2 || intUAL === ClsID.intUAL_IntLvl_1) {
        if (ckbBypassVal === 1) {
          if (intSummerSupplyAirCFM < intVENPLUS_INT_USERS_MIN_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intVENPLUS_INT_USERS_MIN_CFM_WITH_BYPASS; }
          else if (intSummerSupplyAirCFM > intVENPLUS_INT_USERS_MAX_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intVENPLUS_INT_USERS_MAX_CFM_WITH_BYPASS; }
        } else if (intSummerSupplyAirCFM < intVENPLUS_INT_USERS_MIN_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intVENPLUS_INT_USERS_MIN_CFM_NO_BYPASS; }
          else if (intSummerSupplyAirCFM > intVENPLUS_INT_USERS_MAX_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intVENPLUS_INT_USERS_MAX_CFM_NO_BYPASS; }
      } else if (ckbBypassVal === 1) {
          if (intSummerSupplyAirCFM < intVENPLUS_MIN_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intVENPLUS_MIN_CFM_WITH_BYPASS; }
          else if (intSummerSupplyAirCFM > intVENPLUS_MAX_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intVENPLUS_MAX_CFM_WITH_BYPASS; }
        } else if (intSummerSupplyAirCFM < intVENPLUS_MIN_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intVENPLUS_MIN_CFM_NO_BYPASS; }
          else if (intSummerSupplyAirCFM > intVENPLUS_MAX_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intVENPLUS_MAX_CFM_NO_BYPASS; }
      break;
    case ClsID.intProdTypeTerraID:
      if (intUAL === ClsID.intUAL_Admin || intUAL === ClsID.intUAL_IntAdmin || intUAL === ClsID.intUAL_IntLvl_2 || intUAL === ClsID.intUAL_IntLvl_1) {
        if (ckbBypassVal === 1) {
          if (intSummerSupplyAirCFM < intTERA_INT_USERS_MIN_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intTERA_INT_USERS_MIN_CFM_WITH_BYPASS; }
          else if (intSummerSupplyAirCFM > intTERA_INT_USERS_MAX_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intTERA_INT_USERS_MAX_CFM_WITH_BYPASS; }
        } else if (intSummerSupplyAirCFM < intTERA_INT_USERS_MIN_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intTERA_INT_USERS_MIN_CFM_NO_BYPASS; }
          else if (intSummerSupplyAirCFM > intTERA_INT_USERS_MAX_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intTERA_INT_USERS_MAX_CFM_NO_BYPASS; }
      } else if (ckbBypassVal === 1) {
          if (intSummerSupplyAirCFM < intTERA_MIN_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intTERA_MIN_CFM_WITH_BYPASS; }
          else if (intSummerSupplyAirCFM > intTERA_MAX_CFM_WITH_BYPASS) { intSummerSupplyAirCFM = intTERA_MAX_CFM_WITH_BYPASS; }
        } else if (intSummerSupplyAirCFM < intTERA_MIN_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intTERA_MIN_CFM_NO_BYPASS; }
          else if (intSummerSupplyAirCFM > intTERA_MAX_CFM_NO_BYPASS) { intSummerSupplyAirCFM = intTERA_MAX_CFM_NO_BYPASS; }
      break;
    default:
      break;
  }

  return intSummerSupplyAirCFM;
};

export const getSummerReturnAirCFM = (summerReturnAirCFM, values, intUAL, data) => {
  const intSummerSupplyAirCFM = Number(values.txbSummerSupplyAirCFM);
  const intOrientationID = Number(values.ddlOrientationId);
  const intUnitModelID = Number(values.ddlUnitModelId);
  const intProductTypeID = Number(values.intProductTypeID);
  const ckbBypassVal = Number(values.ckbBypassVal);
  let intSummerReturnAirCFM = Number(summerReturnAirCFM);

  if (intOrientationID === ClsID.intOrientationHorizontalID && intSummerSupplyAirCFM > intNOVA_HORIZONTAL_MAX_CFM) {
    intSummerReturnAirCFM = intNOVA_HORIZONTAL_MAX_CFM;
  }

  let dtModel = [];
  switch (intProductTypeID) {
    case ClsID.intProdTypeNovaID:
      if (intSummerReturnAirCFM < intNOVA_MIN_CFM) {
        intSummerReturnAirCFM = intNOVA_MIN_CFM;
      } else if (intSummerReturnAirCFM > intNOVA_MAX_CFM) {
        intSummerReturnAirCFM = intNOVA_MAX_CFM;
      }
      break;
    case ClsID.intProdTypeVentumID:
      dtModel = data.ventumHUnitModel.filter((item) => item.id === intUnitModelID);

      if (
        intUAL === ClsID.intUAL_Admin ||
        intUAL === ClsID.intUAL_IntAdmin ||
        intUAL === ClsID.intUAL_IntLvl_2 ||
        intUAL === ClsID.intUAL_IntLvl_1
      ) {
        if (ckbBypassVal === 1) {
          if (intSummerReturnAirCFM < Math.max(intSummerSupplyAirCFM * 0.5, intVEN_INT_USERS_MIN_CFM_WITH_BYPASS)) {
            intSummerReturnAirCFM = Number(Math.max(intSummerSupplyAirCFM * 0.5, intVEN_INT_USERS_MIN_CFM_WITH_BYPASS));
          } else if (
            intSummerReturnAirCFM > Math.min(Number(intSummerSupplyAirCFM) * 2, intVEN_INT_USERS_MAX_CFM_WITH_BYPASS)
          ) {
            intSummerReturnAirCFM = Number(Math.min(intSummerSupplyAirCFM * 2, intVEN_INT_USERS_MAX_CFM_WITH_BYPASS));
          }
        } else if (
          intSummerReturnAirCFM < Math.max(Number(intSummerSupplyAirCFM) * 0.5, intVEN_INT_USERS_MIN_CFM_NO_BYPASS)
        ) {
          intSummerReturnAirCFM = Number(Math.max(intSummerSupplyAirCFM * 0.5, intVEN_INT_USERS_MIN_CFM_NO_BYPASS));
        } else if (intSummerReturnAirCFM > Math.min(intSummerSupplyAirCFM * 2, intVEN_INT_USERS_MAX_CFM_NO_BYPASS)) {
          intSummerReturnAirCFM = Number(Math.min(intSummerSupplyAirCFM * 2, intVEN_INT_USERS_MAX_CFM_NO_BYPASS));
        }
      } else if (ckbBypassVal === 1) {
        if (intSummerReturnAirCFM < Number(dtModel.Rows[0].erv_cfm_min_ext_users)) {
          intSummerReturnAirCFM = Number(dtModel.Rows[0].erv_cfm_min_ext_users);
        } else if (intSummerReturnAirCFM > Number(dtModel.Rows[0].erv_cfm_max_ext_users)) {
          intSummerReturnAirCFM = Number(dtModel.Rows[0].erv_cfm_max_ext_users);
        }
      } else if (intSummerReturnAirCFM < Number(dtModel.Rows[0].erv_cfm_min_ext_users)) {
        intSummerReturnAirCFM = Number(dtModel.Rows[0].erv_cfm_min_ext_users);
      } else if (intSummerReturnAirCFM > Number(dtModel.Rows[0].erv_cfm_max_ext_users)) {
        intSummerReturnAirCFM = Number(dtModel.Rows[0].erv_cfm_max_ext_users);
      }
      break;
    case ClsID.intProdTypeVentumLiteID:
      dtModel = data.ventumLiteUnitModel?.filter((item) => item.id === intUnitModelID);

      if (
        intUAL === ClsID.intUAL_Admin ||
        intUAL === ClsID.intUAL_IntAdmin ||
        intUAL === ClsID.intUAL_IntLvl_2 ||
        intUAL === ClsID.intUAL_IntLvl_1
      ) {
        if (ckbBypassVal === 1) {
          if (intSummerReturnAirCFM < Math.max(intSummerSupplyAirCFM * 0.5, intVENLITE_INT_USERS_MIN_CFM_WITH_BYPASS)) {
            intSummerReturnAirCFM = Number(
              Math.max(intSummerSupplyAirCFM * 0.5, intVENLITE_INT_USERS_MIN_CFM_WITH_BYPASS)
            );
          } else if (
            intSummerReturnAirCFM > Math.min(intSummerSupplyAirCFM * 2, intVENLITE_INT_USERS_MAX_CFM_WITH_BYPASS)
          ) {
            intSummerReturnAirCFM = Number(
              Math.min(intSummerSupplyAirCFM * 2, intVENLITE_INT_USERS_MAX_CFM_WITH_BYPASS)
            );
          }
        } else if (
          intSummerReturnAirCFM < Math.max(intSummerSupplyAirCFM * 0.5, intVENLITE_INT_USERS_MIN_CFM_NO_BYPASS)
        ) {
          intSummerReturnAirCFM = Number(Math.max(intSummerSupplyAirCFM * 0.5, intVENLITE_INT_USERS_MIN_CFM_NO_BYPASS));
        } else if (
          intSummerReturnAirCFM > Math.min(intSummerSupplyAirCFM * 2, intVENLITE_INT_USERS_MAX_CFM_NO_BYPASS)
        ) {
          intSummerReturnAirCFM = Number(Math.min(intSummerSupplyAirCFM * 2, intVENLITE_INT_USERS_MAX_CFM_NO_BYPASS));
        }
      } else if (ckbBypassVal === 1) {
        if (intSummerReturnAirCFM < Number(dtModel.Rows[0].erv_cfm_min_ext_users)) {
          intSummerReturnAirCFM = Number(dtModel.Rows[0].erv_cfm_min_ext_users);
        } else if (intSummerReturnAirCFM > Number(dtModel.Rows[0].erv_cfm_max_ext_users)) {
          intSummerReturnAirCFM = Number(dtModel.Rows[0].erv_cfm_max_ext_users);
        }
      } else if (intSummerReturnAirCFM < Number(dtModel.Rows[0].erv_cfm_min_ext_users)) {
        intSummerReturnAirCFM = Number(dtModel.Rows[0].erv_cfm_min_ext_users);
      } else if (intSummerReturnAirCFM > Number(dtModel.Rows[0].erv_cfm_max_ext_users)) {
        intSummerReturnAirCFM = Number(dtModel.Rows[0].erv_cfm_max_ext_users);
      }
      break;
    case ClsID.intProdTypeVentumPlusID:
      dtModel = data.ventumPlusUnitModel?.filter((item) => item.id === intUnitModelID);

      if (
        intUAL === ClsID.intUAL_Admin ||
        intUAL === ClsID.intUAL_IntAdmin ||
        intUAL === ClsID.intUAL_IntLvl_2 ||
        intUAL === ClsID.intUAL_IntLvl_1
      ) {
        if (ckbBypassVal === 1) {
          if (intSummerReturnAirCFM < Math.max(intSummerSupplyAirCFM * 0.5, intVENPLUS_INT_USERS_MIN_CFM_WITH_BYPASS)) {
            intSummerReturnAirCFM = Number(
              Math.max(intSummerSupplyAirCFM * 0.5, intVENPLUS_INT_USERS_MIN_CFM_WITH_BYPASS)
            );
          } else if (
            intSummerReturnAirCFM > Math.min(intSummerSupplyAirCFM * 2, intVENPLUS_INT_USERS_MAX_CFM_WITH_BYPASS)
          ) {
            intSummerReturnAirCFM = Number(
              Math.min(intSummerSupplyAirCFM * 2, intVENPLUS_INT_USERS_MAX_CFM_WITH_BYPASS)
            );
          }
        } else if (
          intSummerReturnAirCFM < Math.max(intSummerSupplyAirCFM * 0.5, intVENPLUS_INT_USERS_MIN_CFM_NO_BYPASS)
        ) {
          intSummerReturnAirCFM = Number(Math.max(intSummerSupplyAirCFM * 0.5, intVENPLUS_INT_USERS_MIN_CFM_NO_BYPASS));
        } else if (
          intSummerReturnAirCFM > Math.min(intSummerSupplyAirCFM * 2, intVENPLUS_INT_USERS_MAX_CFM_NO_BYPASS)
        ) {
          intSummerReturnAirCFM = Number(Math.min(intSummerSupplyAirCFM * 2, intVENPLUS_INT_USERS_MAX_CFM_NO_BYPASS));
        }
      } else if (ckbBypassVal === 1) {
        if (intSummerReturnAirCFM < Number(dtModel.Rows[0].erv_cfm_min_ext_users)) {
          intSummerReturnAirCFM = Number(dtModel.Rows[0].erv_cfm_min_ext_users);
        } else if (intSummerReturnAirCFM > Number(dtModel.Rows[0].erv_cfm_max_ext_users)) {
          intSummerReturnAirCFM = Number(dtModel.Rows[0].erv_cfm_max_ext_users);
        }
      } else if (intSummerReturnAirCFM < Number(dtModel.Rows[0].erv_cfm_min_ext_users)) {
        intSummerReturnAirCFM = Number(dtModel.Rows[0].erv_cfm_min_ext_users);
      } else if (intSummerReturnAirCFM > Number(dtModel.Rows[0].erv_cfm_max_ext_users)) {
        intSummerReturnAirCFM = Number(dtModel.Rows[0].erv_cfm_max_ext_users);
      }
      break;
    default:
      break;
  }

  return intSummerReturnAirCFM;
};

export const getSupplyAirESPInfo = (supplyAirESP, intProductTypeID, intUnitModelID) => {
  let dblSupplyAirESP = Number(supplyAirESP);

  if (intProductTypeID === ClsID.intProdTypeNovaID) {
    if (
      intUnitModelID === ClsID.intNovaUnitModelID_A16IN ||
      intUnitModelID === ClsID.intNovaUnitModelID_B20IN ||
      intUnitModelID === ClsID.intNovaUnitModelID_A18OU ||
      intUnitModelID === ClsID.intNovaUnitModelID_B22OU
    ) {
      if (dblSupplyAirESP > 2.0) {
        dblSupplyAirESP = 2.0;
      }
    } else if (dblSupplyAirESP > 3.0) {
      dblSupplyAirESP = 3.0;
    }
  }

  return dblSupplyAirESP;
};

export const getExhaustAirESP = (returnAirESP, intProductTypeID, intUnitTypeID, intUnitModelID) => {
  let dblReturnAirESP = Number(returnAirESP);

  if (intProductTypeID === ClsID.intProdTypeNovaID) {
    if (
      intUnitModelID === ClsID.intNovaUnitModelID_A16IN ||
      intUnitModelID === ClsID.intNovaUnitModelID_B20IN ||
      intUnitModelID === ClsID.intNovaUnitModelID_A18OU ||
      intUnitModelID === ClsID.intNovaUnitModelID_B22OU
    ) {
      if (dblReturnAirESP > 2.0) {
        dblReturnAirESP = 2.0;
      }
    } else if (dblReturnAirESP > 3.0) {
      dblReturnAirESP = 3.0;
    }
  }

  switch (intUnitTypeID) {
    case ClsID.intUnitTypeAHU_ID:
      returnAirESP = undefined;
      break;
    default:
      break;
  }

  return dblReturnAirESP;
};

export const getUnitVoltage = (data, values, strUnitModelValue) => {
  const intProductTypeID = Number(values.intProductTypeID);

  let modelVoltageLink = [];

  switch (intProductTypeID) {
    case ClsID.intProdTypeNovaID:
      modelVoltageLink = data.novaUnitModelVoltageLink;
      break;
    case ClsID.intProdTypeVentumID:
      modelVoltageLink = data.ventumHUnitModelVoltageLink;
      break;
    case ClsID.intProdTypeVentumLiteID:
      modelVoltageLink = data.ventumLiteUnitModelVoltageLink;
      break;
    case ClsID.intProdTypeVentumPlusID:
      modelVoltageLink = data.ventumPlusUnitModelVoltageLink;
      break;
    case ClsID.intProdTypeTerraID:
      modelVoltageLink = data.terraUnitModelVoltageLink;
      break;
    default:
      break;
  }

  const dtLink = modelVoltageLink.filter((item) => item.unit_model_value === strUnitModelValue) || [];
  let dtVoltage = data.electricalVoltage;
  if (intProductTypeID === ClsID.intProdTypeTerraID && true) {
    dtVoltage = data.electricalVoltage?.filter((item) => item.terra_spp === 1);
  }

  const unitVoltage = get_ddlItemsAddedOnID(dtVoltage, 'voltage_id', dtLink);
  const ddlUnitVoltageId = unitVoltage?.[0]?.id || 0;

  return { unitVoltage, ddlUnitVoltageId };
};