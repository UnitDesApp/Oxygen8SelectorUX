const ClsID = require('../config');

// const bolExecuteSummerWB = true;
// const bolExecuteSummerRH = true;
// const bolExecuteWinterWB = true;
// const bolExecuteWinterRH = true;

// const dblTempErrorValue = 0.0;

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

// const bolPreheatRequired = false;
// const intVelocity = 0;
// const intSelectedValue = 0;
// const dblHtgEntFluidTempSavedByInternalUser = 0;
// const dblHtgLvgFluidTempSavedByInternalUser = 0;

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

// const get_ddlItemsAddedOnValue = (_dt, _strLinkColumn, _dtLink) => {
//   const dt = Array.from(_dt);
//   const dtLink = Array.from(_dtLink);
//   let intID = '';
//   let intLinkID = '';
//   let intDummyID = 0;

//   const dtSelected = [];

//   for (let i = 0; i < dt.length; i += 1) {
//     intID = dt[i].items.toString();
//     for (let j = 0; j < dtLink.length; j += 1) {
//       intLinkID = dtLink[j][_strLinkColumn].toString();

//       if (intID === intLinkID) {
//         const dr = {
//           id: 0,
//           items: '',
//         };
//         dr.id = ++intDummyID;
//         dr.items = dt[i].items.toString();

//         dtSelected.push(dr);
//         break;
//       }
//     }
//   }

//   return dtSelected;
// };

// const get_ddlItemsAddedOnID = (_dt, _strLinkColumn, _dtLink) => {
//   if (!_dt?.length || !_dtLink?.length) return;
//   const dt = Array.from(_dt);
//   const dtLink = Array.from(_dtLink);
//   dt.sort((a, b) => a.id - b.id);
//   dtLink.sort((a, b) => a[_strLinkColumn] - b[_strLinkColumn]);
//   let intID = 0;
//   let intLinkID = 0;

//   const dtSelected = [];

//   for (let i = 0; i < dt.length; i += 1) {
//     intID = Number(dt[i].id);
//     for (let j = 0; j < dtLink.length; j += 1) {
//       intLinkID = Number(dtLink[j][_strLinkColumn]);

//       if (intID === intLinkID) {
//         const dr = {};
//         dr.id = Number(dt[i].id);
//         dr.items = dt[i].items.toString();

//         dtSelected.push(dr);
//         break;
//       }

//       if (intLinkID > intID) {
//         break;
//       }
//     }
//   }

//   // eslint-disable-next-line consistent-return
//   return dtSelected;
// };

const sortColume = (data, colume) => data.sort((a, b) => a[colume] - b[colume]);

const unitModelFilter = (data, value, minColumeName, maxColumeName, unitModelId) =>
  data
    ?.filter((item) => (item[minColumeName] >= value && value <= item[maxColumeName]) || item.id === unitModelId)
    .sort((a, b) => a.cfm_max - b.cfm_max);

export const getUnitModel = (
  data,
  intUnitTypeID,
  intProductTypeID,
  unitModelId,
  locationId,
  orientationId,
  summerSupplyAirCFM,
  ckbBypassVal,
  intUAL
) => {
  let unitModel = [];
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
            item.location_value === location?.[0]?.value.toString() &&
            item.orientation_value === orientation?.[0]?.value
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

        if (ckbBypassVal === 1) {
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
            unitModel = unitModelFilter(
              data.ventumPlusUnitModel,
              summerSupplyAirCFM,
              'erv_cfm_min_ext_users',
              'erv_cfm_max_ext_users',
              unitModelId
            );
          } else if (intUnitTypeID === ClsID.intUnitTypeHRV_ID) {
            unitModel = unitModelFilter(
              data.ventumPlusUnitModel,
              summerSupplyAirCFM,
              'hrv_cfm_min_ext_users',
              'hrv_cfm_max_ext_users',
              unitModelId
            );
          }
        } else {
          unitModel = unitModelFilter(data.ventumPlusUnitModel, summerSupplyAirCFM, 'cfm_min', 'cfm_max', unitModelId);
        }
        location = data.generalLocation?.filter((item) => item.id === locationId);
        unitModel = unitModel?.filter(
          (item) => item.location_id_key === location?.[0]?.id_key && item.enabled === 1 && item.bypass === ckbBypassVal
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
      if (
        intUAL === ClsID.intUAL_Admin ||
        intUAL === ClsID.intUAL_IntAdmin ||
        intUAL === ClsID.intUAL_IntLvl_2 ||
        intUAL === ClsID.intUAL_IntLvl_1
      ) {
        if (intSummerSupplyAirCFM < intNOVA_MIN_CFM) {
          intSummerSupplyAirCFM = intNOVA_MIN_CFM;
        } else if (intSummerSupplyAirCFM > intNOVA_MAX_CFM) {
          intSummerSupplyAirCFM = intNOVA_MAX_CFM;
        }
      } else if (intSummerSupplyAirCFM < intNOVA_INT_USERS_MIN_CFM) {
        intSummerSupplyAirCFM = intNOVA_INT_USERS_MIN_CFM;
      } else if (intSummerSupplyAirCFM > intNOVA_INT_USERS_MAX_CFM) {
        intSummerSupplyAirCFM = intNOVA_INT_USERS_MAX_CFM;
      }
      break;
    case ClsID.intProdTypeVentumID:
      if (
        intUAL === ClsID.intUAL_Admin ||
        intUAL === ClsID.intUAL_IntAdmin ||
        intUAL === ClsID.intUAL_IntLvl_2 ||
        intUAL === ClsID.intUAL_IntLvl_1
      ) {
        if (ckbBypassVal === 1) {
          if (intSummerSupplyAirCFM < intVEN_INT_USERS_MIN_CFM_WITH_BYPASS) {
            intSummerSupplyAirCFM = intVEN_INT_USERS_MIN_CFM_WITH_BYPASS;
          } else if (intSummerSupplyAirCFM > intVEN_INT_USERS_MAX_CFM_WITH_BYPASS) {
            intSummerSupplyAirCFM = intVEN_INT_USERS_MAX_CFM_WITH_BYPASS;
          }
        } else if (intSummerSupplyAirCFM < intVEN_INT_USERS_MIN_CFM_NO_BYPASS) {
          intSummerSupplyAirCFM = intVEN_INT_USERS_MIN_CFM_NO_BYPASS;
        } else if (intSummerSupplyAirCFM > intVEN_INT_USERS_MAX_CFM_NO_BYPASS) {
          intSummerSupplyAirCFM = intVEN_INT_USERS_MAX_CFM_NO_BYPASS;
        }
      } else if (ckbBypassVal === 1) {
        if (intSummerSupplyAirCFM < intVEN_MIN_CFM_WITH_BYPASS) {
          intSummerSupplyAirCFM = intVEN_MIN_CFM_WITH_BYPASS;
        } else if (intSummerSupplyAirCFM > intVEN_MAX_CFM_WITH_BYPASS) {
          intSummerSupplyAirCFM = intVEN_MAX_CFM_WITH_BYPASS;
        }
      } else if (intSummerSupplyAirCFM < intVEN_MIN_CFM_NO_BYPASS) {
        intSummerSupplyAirCFM = intVEN_MIN_CFM_NO_BYPASS;
      } else if (intSummerSupplyAirCFM > intVEN_MAX_CFM_NO_BYPASS) {
        intSummerSupplyAirCFM = intVEN_MAX_CFM_NO_BYPASS;
      }
      break;
    case ClsID.intProdTypeVentumLiteID:
      if (
        intUAL === ClsID.intUAL_Admin ||
        intUAL === ClsID.intUAL_IntAdmin ||
        intUAL === ClsID.intUAL_IntLvl_2 ||
        intUAL === ClsID.intUAL_IntLvl_1
      ) {
        if (ckbBypassVal === 1) {
          if (intSummerSupplyAirCFM < intVENLITE_INT_USERS_MIN_CFM_WITH_BYPASS) {
            intSummerSupplyAirCFM = intVENLITE_INT_USERS_MIN_CFM_WITH_BYPASS;
          } else if (intSummerSupplyAirCFM > intVENLITE_INT_USERS_MAX_CFM_WITH_BYPASS) {
            intSummerSupplyAirCFM = intVENLITE_INT_USERS_MAX_CFM_WITH_BYPASS;
          }
        } else if (intSummerSupplyAirCFM < intVENLITE_INT_USERS_MIN_CFM_NO_BYPASS) {
          intSummerSupplyAirCFM = intVENLITE_INT_USERS_MIN_CFM_NO_BYPASS;
        } else if (intSummerSupplyAirCFM > intVENLITE_INT_USERS_MAX_CFM_NO_BYPASS) {
          intSummerSupplyAirCFM = intVENLITE_INT_USERS_MAX_CFM_NO_BYPASS;
        }
      } else if (ckbBypassVal === 1) {
        if (intSummerSupplyAirCFM < intVENLITE_MIN_CFM_WITH_BYPASS) {
          intSummerSupplyAirCFM = intVENLITE_MIN_CFM_WITH_BYPASS;
        } else if (intSummerSupplyAirCFM > intVENLITE_MAX_CFM_WITH_BYPASS) {
          intSummerSupplyAirCFM = intVENLITE_MAX_CFM_WITH_BYPASS;
        }
      } else if (intSummerSupplyAirCFM < intVENLITE_MIN_CFM_NO_BYPASS) {
        intSummerSupplyAirCFM = intVENLITE_MIN_CFM_NO_BYPASS;
      } else if (intSummerSupplyAirCFM > intVENLITE_MAX_CFM_NO_BYPASS) {
        intSummerSupplyAirCFM = intVENLITE_MAX_CFM_NO_BYPASS;
      }
      break;
    case ClsID.intProdTypeVentumPlusID:
      if (
        intUAL === ClsID.intUAL_Admin ||
        intUAL === ClsID.intUAL_IntAdmin ||
        intUAL === ClsID.intUAL_IntLvl_2 ||
        intUAL === ClsID.intUAL_IntLvl_1
      ) {
        if (ckbBypassVal === 1) {
          if (intSummerSupplyAirCFM < intVENPLUS_INT_USERS_MIN_CFM_WITH_BYPASS) {
            intSummerSupplyAirCFM = intVENPLUS_INT_USERS_MIN_CFM_WITH_BYPASS;
          } else if (intSummerSupplyAirCFM > intVENPLUS_INT_USERS_MAX_CFM_WITH_BYPASS) {
            intSummerSupplyAirCFM = intVENPLUS_INT_USERS_MAX_CFM_WITH_BYPASS;
          }
        } else if (intSummerSupplyAirCFM < intVENPLUS_INT_USERS_MIN_CFM_NO_BYPASS) {
          intSummerSupplyAirCFM = intVENPLUS_INT_USERS_MIN_CFM_NO_BYPASS;
        } else if (intSummerSupplyAirCFM > intVENPLUS_INT_USERS_MAX_CFM_NO_BYPASS) {
          intSummerSupplyAirCFM = intVENPLUS_INT_USERS_MAX_CFM_NO_BYPASS;
        }
      } else if (ckbBypassVal === 1) {
        if (intSummerSupplyAirCFM < intVENPLUS_MIN_CFM_WITH_BYPASS) {
          intSummerSupplyAirCFM = intVENPLUS_MIN_CFM_WITH_BYPASS;
        } else if (intSummerSupplyAirCFM > intVENPLUS_MAX_CFM_WITH_BYPASS) {
          intSummerSupplyAirCFM = intVENPLUS_MAX_CFM_WITH_BYPASS;
        }
      } else if (intSummerSupplyAirCFM < intVENPLUS_MIN_CFM_NO_BYPASS) {
        intSummerSupplyAirCFM = intVENPLUS_MIN_CFM_NO_BYPASS;
      } else if (intSummerSupplyAirCFM > intVENPLUS_MAX_CFM_NO_BYPASS) {
        intSummerSupplyAirCFM = intVENPLUS_MAX_CFM_NO_BYPASS;
      }
      break;
    case ClsID.intProdTypeTerraID:
      if (
        intUAL === ClsID.intUAL_Admin ||
        intUAL === ClsID.intUAL_IntAdmin ||
        intUAL === ClsID.intUAL_IntLvl_2 ||
        intUAL === ClsID.intUAL_IntLvl_1
      ) {
        if (ckbBypassVal === 1) {
          if (intSummerSupplyAirCFM < intTERA_INT_USERS_MIN_CFM_WITH_BYPASS) {
            intSummerSupplyAirCFM = intTERA_INT_USERS_MIN_CFM_WITH_BYPASS;
          } else if (intSummerSupplyAirCFM > intTERA_INT_USERS_MAX_CFM_WITH_BYPASS) {
            intSummerSupplyAirCFM = intTERA_INT_USERS_MAX_CFM_WITH_BYPASS;
          }
        } else if (intSummerSupplyAirCFM < intTERA_INT_USERS_MIN_CFM_NO_BYPASS) {
          intSummerSupplyAirCFM = intTERA_INT_USERS_MIN_CFM_NO_BYPASS;
        } else if (intSummerSupplyAirCFM > intTERA_INT_USERS_MAX_CFM_NO_BYPASS) {
          intSummerSupplyAirCFM = intTERA_INT_USERS_MAX_CFM_NO_BYPASS;
        }
      } else if (ckbBypassVal === 1) {
        if (intSummerSupplyAirCFM < intTERA_MIN_CFM_WITH_BYPASS) {
          intSummerSupplyAirCFM = intTERA_MIN_CFM_WITH_BYPASS;
        } else if (intSummerSupplyAirCFM > intTERA_MAX_CFM_WITH_BYPASS) {
          intSummerSupplyAirCFM = intTERA_MAX_CFM_WITH_BYPASS;
        }
      } else if (intSummerSupplyAirCFM < intTERA_MIN_CFM_NO_BYPASS) {
        intSummerSupplyAirCFM = intTERA_MIN_CFM_NO_BYPASS;
      } else if (intSummerSupplyAirCFM > intTERA_MAX_CFM_NO_BYPASS) {
        intSummerSupplyAirCFM = intTERA_MAX_CFM_NO_BYPASS;
      }
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
        if (intSummerReturnAirCFM < Number(dtModel.Rows?.[0]?.erv_cfm_min_ext_users)) {
          intSummerReturnAirCFM = Number(dtModel.Rows?.[0]?.erv_cfm_min_ext_users);
        } else if (intSummerReturnAirCFM > Number(dtModel.Rows?.[0]?.erv_cfm_max_ext_users)) {
          intSummerReturnAirCFM = Number(dtModel.Rows?.[0]?.erv_cfm_max_ext_users);
        }
      } else if (intSummerReturnAirCFM < Number(dtModel.Rows?.[0]?.erv_cfm_min_ext_users)) {
        intSummerReturnAirCFM = Number(dtModel.Rows?.[0]?.erv_cfm_min_ext_users);
      } else if (intSummerReturnAirCFM > Number(dtModel.Rows?.[0]?.erv_cfm_max_ext_users)) {
        intSummerReturnAirCFM = Number(dtModel.Rows?.[0]?.erv_cfm_max_ext_users);
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
        if (intSummerReturnAirCFM < Number(dtModel.Rows?.[0]?.erv_cfm_min_ext_users)) {
          intSummerReturnAirCFM = Number(dtModel.Rows?.[0]?.erv_cfm_min_ext_users);
        } else if (intSummerReturnAirCFM > Number(dtModel.Rows?.[0]?.erv_cfm_max_ext_users)) {
          intSummerReturnAirCFM = Number(dtModel.Rows?.[0]?.erv_cfm_max_ext_users);
        }
      } else if (intSummerReturnAirCFM < Number(dtModel.Rows?.[0]?.erv_cfm_min_ext_users)) {
        intSummerReturnAirCFM = Number(dtModel.Rows?.[0]?.erv_cfm_min_ext_users);
      } else if (intSummerReturnAirCFM > Number(dtModel.Rows?.[0]?.erv_cfm_max_ext_users)) {
        intSummerReturnAirCFM = Number(dtModel.Rows?.[0]?.erv_cfm_max_ext_users);
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
        if (intSummerReturnAirCFM < Number(dtModel.Rows?.[0]?.erv_cfm_min_ext_users)) {
          intSummerReturnAirCFM = Number(dtModel.Rows?.[0]?.erv_cfm_min_ext_users);
        } else if (intSummerReturnAirCFM > Number(dtModel.Rows?.[0]?.erv_cfm_max_ext_users)) {
          intSummerReturnAirCFM = Number(dtModel.Rows?.[0]?.erv_cfm_max_ext_users);
        }
      } else if (intSummerReturnAirCFM < Number(dtModel.Rows?.[0]?.erv_cfm_min_ext_users)) {
        intSummerReturnAirCFM = Number(dtModel.Rows?.[0]?.erv_cfm_min_ext_users);
      } else if (intSummerReturnAirCFM > Number(dtModel.Rows?.[0]?.erv_cfm_max_ext_users)) {
        intSummerReturnAirCFM = Number(dtModel.Rows?.[0]?.erv_cfm_max_ext_users);
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

  // const unitVoltage = get_ddlItemsAddedOnID(dtVoltage, 'voltage_id', dtLink);
  const unitVoltage = dtVoltage.filter(
    (e) => dtLink.filter((e_link) => e.id === e_link.voltage_id).length === 1 // 1: Matching items, 0: Not matching items
  );

  const ddlUnitVoltageId = unitVoltage?.[0]?.id || 0;

  return { unitVoltage, ddlUnitVoltageId };
};

// const get_dtDataFromImportRows = (_dt, _strColumnMultipleID, _intMatchID) => {
//   const dtData = [];
//   for (let i = 0; i < _dt.length; i += 1) {
//     const strArrID = _dt[i][_strColumnMultipleID].toString().split(',');

//     for (let j = 0; j < strArrID.length; j += 1) {
//       const strID = strArrID[j];

//       if (strID !== '') {
//         if (Number(strID) === Number(_intMatchID) || strID === _intMatchID) {
//           dtData.push(_dt[i]);
//         }
//       }
//     }
//   }

//   return dtData;
// };

export const getComponentInfo = (data, intProductTypeID, intUnitTypeID) => {
  const unitCoolingHeadingInfo = data?.components;
  const heatExchangeInfo = data?.heatExch;

  let dtPreheatComp = unitCoolingHeadingInfo;
  let dtHeatExchComp = heatExchangeInfo;
  let dtCoolingComp = unitCoolingHeadingInfo;
  let dtHeatingComp = unitCoolingHeadingInfo;

  if (intUnitTypeID === ClsID.intUnitTypeERV_ID) {
    // dtPreheatComp = get_dtDataFromImportRows(unitCoolingHeadingInfo, 'erv_preheat', 1);
    dtPreheatComp = unitCoolingHeadingInfo?.filter((e) => Number(e.erv_preheat) === 1) || [];

    if (intProductTypeID === ClsID.intProdTypeVentumLiteID) {
      dtPreheatComp = unitCoolingHeadingInfo?.filter((item) => Number(item.id) !== ClsID.intCompHWC_ID) || [];
    }

    // dtHeatExchComp = get_dtDataFromImportRows(heatExchangeInfo, 'erv', 1);
    dtHeatExchComp = heatExchangeInfo?.filter((e) => Number(e.erv) === 1) || [];

    // dtCoolingComp = get_dtDataFromImportRows(unitCoolingHeadingInfo, 'erv_cooling', 1);
    dtCoolingComp = unitCoolingHeadingInfo?.filter((e) => Number(e.erv_cooling) === 1) || [];

    // dtHeatingComp = get_dtDataFromImportRows(unitCoolingHeadingInfo, 'erv_heating', 1);
    dtHeatingComp = unitCoolingHeadingInfo?.filter((e) => Number(e.erv_heating) === 1) || [];
  } else if (intUnitTypeID === ClsID.intUnitTypeHRV_ID) {
    // dtPreheatComp = get_dtDataFromImportRows(unitCoolingHeadingInfo, 'hrv_preheat', 1);
    dtPreheatComp = unitCoolingHeadingInfo?.filter((e) => Number(e.hrv_preheat) === 1) || [];

    if (intProductTypeID === ClsID.intProdTypeVentumLiteID) {
      dtPreheatComp = unitCoolingHeadingInfo.filter((e) => parseInt(e.id, 10) !== ClsID.intCompHWC_ID);
    }

    // dtHeatExchComp = get_dtDataFromImportRows(heatExchangeInfo, 'hrv', 1);
    dtHeatExchComp = heatExchangeInfo?.filter((e) => Number(e.hrv) === 1) || [];

    // dtCoolingComp = get_dtDataFromImportRows(unitCoolingHeadingInfo, 'hrv_cooling', 1);
    dtCoolingComp = unitCoolingHeadingInfo?.filter((e) => Number(e.hrv_cooling) === 1) || [];

    // dtHeatingComp = get_dtDataFromImportRows(unitCoolingHeadingInfo, 'hrv_heating', 1);
    dtHeatingComp = unitCoolingHeadingInfo?.filter((e) => Number(e.hrv_heating) === 1) || [];
  } else if (intUnitTypeID === ClsID.intUnitTypeAHU_ID) {
    // dtHeatExchComp = get_dtDataFromImportRows(heatExchangeInfo, 'fc', 1);
    dtHeatExchComp = heatExchangeInfo?.filter((e) => Number(e.fc) === 1) || [];

    // dtPreheatComp = get_dtDataFromImportRows(unitCoolingHeadingInfo, 'fc_preheat', 1);
    dtPreheatComp = unitCoolingHeadingInfo?.filter((e) => Number(e.fc_preheat) === 1) || [];
    dtCoolingComp = unitCoolingHeadingInfo?.filter((e) => Number(e.fc_cooling) === 1) || [];
    dtHeatingComp = unitCoolingHeadingInfo?.filter((e) => Number(e.fc_heating) === 1) || [];
  }

  return {
    dtPreheatComp,
    dtHeatExchComp,
    dtCoolingComp,
    dtHeatingComp,
    dtReheatComp: unitCoolingHeadingInfo,
    // dtReheatComp = getReheatInfo().dtReheatComp;
  };
};

export const getPreheatElecHeaterInstallationInfo = (data, intPreheatCompID, intLocationID, intProductTypeID) => {
  const returnInfo = {
    ddlPreheatElecHeaterInstallationDataTbl: [],
    ddlPreheatElecHeaterInstallationId: 0,
  };

  let dtPreheatElecHeaterInstallation = data.elecHeaterInstallation.filter((item) => item.id !== 1);
  if (intPreheatCompID === ClsID.intCompElecHeaterID || intPreheatCompID === ClsID.intCompAutoID) {
    returnInfo.ddlPreheatElecHeaterInstallationDataTbl = dtPreheatElecHeaterInstallation;

    if (intLocationID === ClsID.intLocationOutdoorID) {
      switch (intProductTypeID) {
        case ClsID.intProdTypeNovaID:
        case ClsID.intProdTypeVentumID:
        case ClsID.intProdTypeVentumLiteID:
        case ClsID.intProdTypeTerraID:
          dtPreheatElecHeaterInstallation = dtPreheatElecHeaterInstallation.filter(
            (item) => item.id === ClsID.intElecHeaterInstallInCasingFieldID
          );
          break;
        case ClsID.intProdTypeVentumPlusID:
          dtPreheatElecHeaterInstallation = dtPreheatElecHeaterInstallation.filter(
            (item) => item.id === ClsID.intElecHeaterInstallInCasingFactoryID
          );
          break;

        default:
          break;
      }
    } else {
      let dtLink = data.electricHeaterInstallProdTypeLink;
      dtLink = dtLink?.filter((item) => item.product_type_id === intProductTypeID) || [];

      // dtPreheatElecHeaterInstallation = get_ddlItemsAddedOnID(dtPreheatElecHeaterInstallation, 'elec_heater_install_id', dtLink);
      dtPreheatElecHeaterInstallation = dtPreheatElecHeaterInstallation.filter(
        (e) => dtLink.filter((e_link) => e.id === e_link.elec_heater_install_id).length === 1 // 1: Matching items, 0: Not matching items
      );

      switch (intProductTypeID) {
        case ClsID.intProdTypeNovaID:
        case ClsID.intProdTypeVentumID:
          returnInfo.ddlPreheatElecHeaterInstallationId = ClsID.intElecHeaterInstallInCasingFieldID.toString();
          break;
        case ClsID.intProdTypeTerraID:
        case ClsID.intProdTypeVentumPlusID:
          returnInfo.ddlPreheatElecHeaterInstallationId = ClsID.intElecHeaterInstallInCasingFactoryID.toString();
          break;
        case ClsID.intProdTypeVentumLiteID:
          dtPreheatElecHeaterInstallation = dtPreheatElecHeaterInstallation.filter(
            (item) => item.id === ClsID.intElecHeaterInstallDuctMountedID
          );
          returnInfo.ddlPreheatElecHeaterInstallationDataTbl = dtPreheatElecHeaterInstallation;
          break;
        default:
          break;
      }
    }

    returnInfo.ddlPreheatElecHeaterInstallationId = dtPreheatElecHeaterInstallation?.[0]?.id;

    return returnInfo;
  }

  return [];
};

export const getItemsAddedOnIDDataTable = (dt, strColumnMultipleID, intMatchID) => {
  const newDt = [];

  for (let i = 0; i < dt.length; i++) {
    const strArrID = dt[i][strColumnMultipleID].split(',');

    for (let j = 0; j < strArrID.length; j++) {
      if (parseInt(strArrID[j], 10) === intMatchID) {
        const dr = {
          id: parseInt(dt[i].id, 10),
          items: dt[i].items,
        };

        newDt.push(dr);
        break;
      }
    }
  }

  return newDt;
};

export const getCustomInputsInfo = (
  intPreheatCompID,
  intCoolingCompID,
  intHeatingCompID,
  intReheatCompID,
  intUnitTypeID
) => {
  const returnInfo = {
    divPreheatHWC_UseFlowRateVisible: false,
    divPreheatHWC_FlowRateVisible: false,
    divPreheatHWC_UseCapVisible: false,
    divPreheatHWC_CapVisible: false,
    divCoolingCWC_UseCapVisible: false,
    divCoolingCWC_CapVisible: false,
    divCoolingCWC_UseFlowRateVisible: false,
    divCoolingCWC_FlowRateVisible: false,
    divHeatingHWC_UseCapVisible: false,
    divHeatingHWC_CapVisible: false,
    divHeatingHWC_UseFlowRateVisible: false,
    divHeatingHWC_FlowRateVisible: false,
    divReheatHWC_UseCapVisible: false,
    divReheatHWC_CapVisible: false,
    divReheatHWC_UseFlowRateVisible: false,
    divReheatHWC_FlowRateVisible: false,
  };

  if (intPreheatCompID === ClsID.intCompHWC_ID) {
    returnInfo.divPreheatHWC_UseFlowRateVisible = true;
    returnInfo.divPreheatHWC_FlowRateVisible = true;

    if (intUnitTypeID === ClsID.intUnitTypeAHU_ID) {
      returnInfo.divPreheatHWC_UseCapVisible = true;
      returnInfo.divPreheatHWC_CapVisible = true;
    } else {
      returnInfo.divPreheatHWC_UseCapVisible = false;
      returnInfo.divPreheatHWC_CapVisible = false;
    }
  } else {
    returnInfo.divPreheatHWC_UseCapVisible = false;
    returnInfo.divPreheatHWC_CapVisible = false;
    returnInfo.divPreheatHWC_UseFlowRateVisible = false;
    returnInfo.divPreheatHWC_FlowRateVisible = false;
  }

  if (intCoolingCompID === ClsID.intCompCWC_ID) {
    returnInfo.divCoolingCWC_UseCapVisible = true;
    returnInfo.divCoolingCWC_CapVisible = true;
    returnInfo.divCoolingCWC_UseFlowRateVisible = true;
    returnInfo.divCoolingCWC_FlowRateVisible = true;
  } else {
    returnInfo.divCoolingCWC_UseCapVisible = false;
    returnInfo.divCoolingCWC_CapVisible = false;
    returnInfo.divCoolingCWC_UseFlowRateVisible = false;
    returnInfo.divCoolingCWC_FlowRateVisible = false;
  }

  if (intHeatingCompID === ClsID.intCompHWC_ID) {
    returnInfo.divHeatingHWC_UseCapVisible = true;
    returnInfo.divHeatingHWC_CapVisible = true;
    returnInfo.divHeatingHWC_UseFlowRateVisible = true;
    returnInfo.divHeatingHWC_FlowRateVisible = true;
  } else {
    returnInfo.divHeatingHWC_UseCapVisible = false;
    returnInfo.divHeatingHWC_CapVisible = false;
    returnInfo.divHeatingHWC_UseFlowRateVisible = false;
    returnInfo.divHeatingHWC_FlowRateVisible = false;
  }

  if (intReheatCompID === ClsID.intCompHWC_ID) {
    returnInfo.divReheatHWC_UseCapVisible = true;
    returnInfo.divReheatHWC_CapVisible = true;
    returnInfo.divReheatHWC_UseFlowRateVisible = true;
    returnInfo.divReheatHWC_FlowRateVisible = true;
  } else {
    returnInfo.divReheatHWC_UseCapVisible = false;
    returnInfo.divReheatHWC_CapVisible = false;
    returnInfo.divReheatHWC_UseFlowRateVisible = false;
    returnInfo.divReheatHWC_FlowRateVisible = false;
  }

  return returnInfo;
};

export const getUALInfo = (intUAL) => {
  const returnInfo = {
    divOutdoorAirDesignCondVisible: false,
    divReturnAirDesignCondVisible: false,
    divCustomVisible: false,
    divHandingValveVisible: false,
  };

  switch (intUAL) {
    case ClsID.intUAL_Admin:
      returnInfo.divOutdoorAirDesignCondVisible = true;
      returnInfo.divReturnAirDesignCondVisible = true;
      returnInfo.divCustomVisible = true;
      returnInfo.divHandingValveVisible = true;
      break;
    case ClsID.intUAL_IntAdmin:
    case ClsID.intUAL_IntLvl_1:
    case ClsID.intUAL_IntLvl_2:
      returnInfo.divOutdoorAirDesignCondVisible = false;
      returnInfo.divReturnAirDesignCondVisible = false;
      returnInfo.divCustomVisible = true;
      returnInfo.divHandingValveVisible = true;
      break;
    default:
      returnInfo.divOutdoorAirDesignCondVisible = false;
      returnInfo.divReturnAirDesignCondVisible = false;
      returnInfo.divCustomVisible = false;
      returnInfo.divHandingValveVisible = false;
      break;
  }

  return returnInfo;
};

export const getHeatPumpInfo = (intCoolingCompID) => {
  const returnInfo = {
    ckbHeatPumpVal: false,
    divHeatPumpVisible: false,
    ckbHeatPumpChecked: false,
  };

  if (intCoolingCompID === ClsID.intCompCWC_ID) {
    returnInfo.ckbHeatPumpVal = 0;
    returnInfo.divHeatPumpVisible = false;
  } else if (intCoolingCompID === ClsID.intCompDX_ID) {
    returnInfo.divHeatPumpVisible = true;
    returnInfo.ckbHeatPumpChecked = 0;
  } else {
    returnInfo.ckbHeatPumpVal = 0;
    returnInfo.divHeatPumpVisible = false;
  }

  return returnInfo;
};

export const getDehumidificationInfo = (intCoolingCompID) => {
  const returnInfo = {
    divDehumidificationVisible: false,
    ckbDehumidification: 0,
    ckbDehumidificationChecked: 0,
  };
  if (intCoolingCompID === ClsID.intCompCWC_ID || intCoolingCompID === ClsID.intCompDX_ID) {
    returnInfo.divDehumidificationVisible = true;
  } else {
    returnInfo.divDehumidificationVisible = false;
    returnInfo.ckbDehumidification = 0;
    returnInfo.ckbDehumidificationChecked = 0;
  }

  returnInfo.ckbDehumidificationChecked = 0;

  return returnInfo;
};

export const getDXCoilRefrigDesignCondInfo = (intUAL, intCoolingCompID) => {
  const returnInfo = { divDXCoilRefrigDesignCondVisible: false };

  if (
    intUAL === ClsID.intUAL_Admin ||
    intUAL === ClsID.intUAL_IntAdmin ||
    intUAL === ClsID.intUAL_IntLvl_1 ||
    intUAL === ClsID.intUAL_IntLvl_2
  ) {
    returnInfo.divDXCoilRefrigDesignCondVisible = intCoolingCompID === ClsID.intCompDX_ID;
  } else {
    returnInfo.divDXCoilRefrigDesignCondVisible = false;
  }

  return returnInfo;
};

export const getHeatElecHeaterInstallationInfo = (data, intHeatingCompID, intReheatCompID) => {
  const returnInfo = {
    ddlHeatElecHeaterInstallationDataTbl: [],
    ddlHeatElecHeaterInstallationId: 0,
  };

  if (intHeatingCompID === ClsID.intCompElecHeaterID || intReheatCompID === ClsID.intCompElecHeaterID) {
    returnInfo.divHeatElecHeaterInstallationVisible = true;

    let dtElecHeaterInstallation = data.elecHeaterInstallation;
    dtElecHeaterInstallation = dtElecHeaterInstallation.filter((item) => item.id !== 0);

    returnInfo.ddlHeatElecHeaterInstallationDataTbl = dtElecHeaterInstallation;
  } else {
    returnInfo.divHeatElecHeaterInstallationVisible = false;

    let dtElecHeaterInstallation = data.elecHeaterInstallation;
    dtElecHeaterInstallation = dtElecHeaterInstallation.filter((item) => item.id !== 0);

    returnInfo.ddlHeatElecHeaterInstallationDataTbl = dtElecHeaterInstallation;
  }

  return returnInfo;
};

export const getReheatInfo = (
  data,
  ckbDehumidificationVal,
  intCoolingCompID,
  intUAL,
  intUnitTypeID,
  intProductTypeID,
  intUnitModelID
) => {
  const reheatInfo = [];
  let dtReheatComp = [];

  if (ckbDehumidificationVal) {
    dtReheatComp = data.components;

    switch (intCoolingCompID) {
      case ClsID.intCompCWC_ID:
        dtReheatComp = dtReheatComp.filter((item) => item.id.toString() !== ClsID.intCompHGRH_ID.toString());
        break;
      case ClsID.intCompDX_ID:
        if (
          intUAL === ClsID.intUAL_External &&
          (intUnitTypeID === ClsID.intUnitTypeERV_ID || intUnitTypeID === ClsID.intUnitTypeHRV_ID)
        ) {
          dtReheatComp = dtReheatComp.filter((item) => item.id.toString() !== ClsID.intCompHGRH_ID.toString());
        } else if (
          intProductTypeID === ClsID.intProdTypeVentumID &&
          (intUnitModelID === ClsID.intVentumUnitModelID_H05IN_ERV ||
            intUnitModelID === ClsID.intVentumUnitModelID_H05IN_HRV)
        ) {
          dtReheatComp = dtReheatComp.fitler((item) => item.id.toString() !== ClsID.intCompHGRH_ID.toString());
        }
        break;
      default:
        break;
    }

    switch (intUnitTypeID) {
      case ClsID.intUnitTypeERV_ID:
        // dtReheatComp = get_dtDataFromImportRows(dtReheatComp, 'erv_reheat', 1);
        dtReheatComp = dtReheatComp?.filter((e) => Number(e.erv_reheat) === 1) || [];
        break;
      case ClsID.intUnitTypeHRV_ID:
        // dtReheatComp = get_dtDataFromImportRows(dtReheatComp, 'hrv_reheat', 1);
        dtReheatComp = dtReheatComp?.filter((e) => Number(e.hrv_reheat) === 1) || [];
        break;
      case ClsID.intUnitTypeAHU_ID:
        // dtReheatComp = get_dtDataFromImportRows(dtReheatComp, 'fc_reheat', 1);
        dtReheatComp = dtReheatComp?.filter((e) => Number(e.fc_reheat) === 1) || [];
        break;
      default:
        // code block
        break;
    }

    reheatInfo.dtReheatComp = dtReheatComp;
    reheatInfo.ddlReheatCompId = dtReheatComp?.[0]?.id;
    reheatInfo.divReheatCompVisible = true;
  } else {
    dtReheatComp = data.components;
    reheatInfo.dtReheatComp = dtReheatComp;
    reheatInfo.ddlReheatCompId = ClsID.intCompNA_ID;
    reheatInfo.divReheatCompVisible = false;
  }

  return reheatInfo;
};

export const getHeatingFluidDesignCondInfo = (data, intPreheatCompID, intHeatingCompID, intReheatCompID) => {
  const returnInfo = [];

  returnInfo.divHeatingFluidDesignCondVisible = !!(
    intPreheatCompID === ClsID.intCompHWC_ID ||
    intHeatingCompID === ClsID.intCompHWC_ID ||
    intReheatCompID === ClsID.intCompHWC_ID
  );

  const dtHeatingFluidType = data.fluidType;
  returnInfo.ddlHeatingFluidTypeDataTbl = dtHeatingFluidType;
  returnInfo.ddlHeatingFluidTypeId = dtHeatingFluidType?.[0]?.id;
  returnInfo.ddlHeatingFluidConcentrationDataTbl = getItemsAddedOnIDDataTable(
    data.fluidConcentration,
    'fluid_type_id',
    returnInfo.ddlHeatingFluidTypeId
  );
  returnInfo.ddlHeatingFluidConcentrationId = returnInfo.ddlHeatingFluidConcentrationDataTbl?.[0]?.id;

  return returnInfo;
};

export const getDamperAndActuatorInfo = (data, intProductTypeID, intLocationID) => {
  const returnInfo = [];

  let dtDamperAndAct = data.damperActuator;

  switch (intProductTypeID) {
    case ClsID.intProdTypeNovaID:
    case ClsID.intProdTypeVentumID:
    case ClsID.intProdTypeVentumLiteID:
    case ClsID.intProdTypeTerraID:
      dtDamperAndAct = dtDamperAndAct.filter((item) => item.std_selection === 1);
      break;
    case ClsID.intProdTypeVentumPlusID:
      dtDamperAndAct = dtDamperAndAct.filter((item) => item.ventumplus === 1);
      break;
    default:
      break;
  }

  returnInfo.ddlDamperAndActuatorDataTbl = dtDamperAndAct;
  returnInfo.ddlDamperAndActuatorId = dtDamperAndAct?.[0]?.id;

  if (intLocationID === ClsID.intLocationOutdoorID) {
    switch (intProductTypeID) {
      case ClsID.intProdTypeNovaID:
      case ClsID.intProdTypeVentumID:
      case ClsID.intProdTypeVentumLiteID:
      case ClsID.intProdTypeTerraID:
        returnInfo.ddlDamperAndActuatorId = ClsID.intDamperActFieldInstAndWiredID;
        break;
      case ClsID.intProdTypeVentumPlusID:
        returnInfo.ddlDamperAndActuatorId = ClsID.intDamperActFactMountedAndWiredID;
        break;
      default:
        break;
    }

    returnInfo.divDamperAndActuatorVisible = false;
  } else {
    returnInfo.divDamperAndActuatorVisible = true;
  }

  return returnInfo;
};

export const getElecHeaterVoltageInfo = (
  data,
  intPreheatCompID,
  intHeatingCompID,
  intReheatCompID,
  intProductTypeID,
  intUnitModelID,
  intElecHeaterVoltageID,
  intUnitVoltageID,
  ckbVoltageSPPVal
) => {
  let dtElecHeaterVoltage = [];
  const returnInfo = [];

  if (
    intPreheatCompID === ClsID.intCompElecHeaterID ||
    intHeatingCompID === ClsID.intCompElecHeaterID ||
    intReheatCompID === ClsID.intCompElecHeaterID
  ) {
    returnInfo.divElecHeaterVoltageVisible = true;

    let bol208V_1Ph = false;

    if (intProductTypeID === ClsID.intProdTypeNovaID) {
      if (
        intUnitModelID === ClsID.intNovaUnitModelID_A16IN ||
        intUnitModelID === ClsID.intNovaUnitModelID_B20IN ||
        intUnitModelID === ClsID.intNovaUnitModelID_A18OU ||
        intUnitModelID === ClsID.intNovaUnitModelID_B22OU
      ) {
        bol208V_1Ph = true;
        dtElecHeaterVoltage = data.electricalVoltage.filter(
          (item) => item.electric_heater_2 === 1 || item.id === intElecHeaterVoltageID
        );
      } else {
        dtElecHeaterVoltage = data.electricalVoltage.filter(
          (item) => item.electric_heater === 1 || item.id === intElecHeaterVoltageID
        );
      }
    } else if (intProductTypeID === ClsID.intProdTypeVentumID) {
      if (
        intUnitModelID === ClsID.intVentumUnitModelID_H05IN_ERV ||
        intUnitModelID === ClsID.intVentumUnitModelID_H10IN_ERV ||
        intUnitModelID === ClsID.intVentumUnitModelID_H05IN_HRV ||
        intUnitModelID === ClsID.intVentumUnitModelID_H10IN_HRV
      ) {
        bol208V_1Ph = true;
        dtElecHeaterVoltage = data.electricalVoltage.filter(
          (item) => item.electric_heater_2 === 1 || item.id === intElecHeaterVoltageID
        );
      } else {
        dtElecHeaterVoltage = data.electricalVoltage.filter(
          (item) => item.electric_heater === 1 || item.id === intElecHeaterVoltageID
        );
      }
    } else if (intProductTypeID === ClsID.intProdTypeVentumLiteID) {
      bol208V_1Ph = true;
      dtElecHeaterVoltage = data.electricalVoltage.filter(
        (item) => item.electric_heater_3 === 1 || item.id === intElecHeaterVoltageID
      );
    } else if (intProductTypeID === ClsID.intProdTypeTerraID) {
      if (ckbVoltageSPPVal === 1) {
        dtElecHeaterVoltage = data.electricalVoltage.filter(
          (item) => item.terra_spp === 1 || item.id === intElecHeaterVoltageID
        );
        returnInfo.ddlElecHeaterVoltageOldId = intUnitVoltageID;
        returnInfo.ddlElecHeaterVoltageEnabled = false;
      } else {
        dtElecHeaterVoltage = data.electricalVoltage.filter(
          (item) => item.terra_non_spp === 1 || item.id === intElecHeaterVoltageID
        );
        returnInfo.ddlElecHeaterVoltageEnabled = true;
      }
    }

    if (dtElecHeaterVoltage.length > 0) {
      returnInfo.ddlElecHeaterVoltageDataTbl = dtElecHeaterVoltage;

      if (bol208V_1Ph) {
        returnInfo.ddlElecHeaterVoltageId = ClsID.intElectricVoltage_208V_1Ph_60HzID;
      } else {
        returnInfo.ddlElecHeaterVoltageId = ClsID.intElectricVoltage_208V_3Ph_60HzID;
      }

      returnInfo.ddlElecHeaterVoltageOldId = intUnitVoltageID;
    }
  } else {
    if (intProductTypeID === ClsID.intProdTypeVentumLiteID) {
      dtElecHeaterVoltage = data.electricalVoltage.filter(
        (item) => item.electric_heater_3 === 1 || item.id === intElecHeaterVoltageID
      );
      returnInfo.ddlElecHeaterVoltageDataTbl = dtElecHeaterVoltage;
      returnInfo.ddlElecHeaterVoltageId = intUnitVoltageID;
      returnInfo.ddlElecHeaterVoltageEnabled = false;
    } else {
      dtElecHeaterVoltage = data.electricalVoltage.filter(
        (item) => item.electric_heater === 1 || item.id === intElecHeaterVoltageID
      );
      returnInfo.ddlElecHeaterVoltageDataTbl = dtElecHeaterVoltage;
      returnInfo.ddlElecHeaterVoltageId = ClsID.intElectricVoltage_208V_3Ph_60HzID;
    }

    returnInfo.divElecHeaterVoltageVisible = false;
  }

  return returnInfo;
};

export const getValveAndActuatorInfo = (intCoolingCompID, intPreheatCompID, intHeatingCompID, intReheatCompID) => {
  const valveAndActuator = [];
  if (
    intCoolingCompID === ClsID.intCompCWC_ID ||
    intPreheatCompID === ClsID.intCompHWC_ID ||
    intHeatingCompID === ClsID.intCompHWC_ID ||
    intReheatCompID === ClsID.intCompHWC_ID
  ) {
    valveAndActuator.divValveAndActuatorVisible = true;
    valveAndActuator.ckbValveAndActuatorVal = 1;
    valveAndActuator.divValveTypeVisible = true;
  } else {
    valveAndActuator.divValveAndActuatorVisible = false;
    valveAndActuator.ckbValveAndActuatorVal = 0;
    valveAndActuator.divValveTypeVisible = false;
  }

  return valveAndActuator;
};

export const getDrainPanInfo = (intProductTypeID, intUnitTypeID) => {
  const returnInfo = [];

  if (intProductTypeID === ClsID.intProdTypeNovaID) {
    returnInfo.divDrainPanVisible = false;
    returnInfo.ckbDrainPanVal = 0;
  } else if (
    intProductTypeID === ClsID.intProdTypeVentumID ||
    intProductTypeID === ClsID.intProdTypeVentumLiteID ||
    intProductTypeID === ClsID.intProdTypeVentumPlusID
  ) {
    if (intUnitTypeID === ClsID.intUnitTypeERV_ID) {
      returnInfo.divDrainPanVisible = false;
      returnInfo.ckbDrainPanVal = 0;
    } else if (intUnitTypeID === ClsID.intUnitTypeHRV_ID) {
      returnInfo.divDrainPanVisible = true;
      returnInfo.ckbDrainPanVal = 1;
    }
  }

  return returnInfo;
};

export const getHandingInfo = (data) => {
  const returnInfo = [];

  returnInfo.ddlHandingDataTbl = data.handing;
  returnInfo.ddlHandingId = returnInfo.ddlHandingDataTbl?.[0]?.id;

  return returnInfo;
};

const isContain = (_dt, _strColumn, value) => {
  for (let i = 0; i < _dt.length; i += 1) {
    if (_dt[i][_strColumn].toString() === value) return true;
  }

  return false;
};

export const getSupplyAirOpeningInfo = (
  data,
  intUnitTypeID,
  intProductTypeID,
  intLocationID,
  intOrientationID,
  intSupplyAirOpeningId,
  strSupplyAirOpening,
  intCoolingCompID,
  intHeatingCompID,
  intReheatCompID
) => {
  const returnInfo = [];
  let dtLink = [];
  let dtSelectionTable = [];
  let dtSelectionFinalTable = [];

  if (intUnitTypeID === ClsID.intUnitTypeERV_ID || intUnitTypeID === ClsID.intUnitTypeHRV_ID) {
    dtLink = data.oriOpeningERV_SA_Link.filter((item) => item.product_type_id === Number(intProductTypeID));
    // dtLink = get_dtDataFromImportRows(dtLink, 'location_id', intLocationID);
    // dtLink = get_dtDataFromImportRows(dtLink, 'orientation_id', intOrientationID);
    dtLink = dtLink.filter((item) => item.location_id === Number(intLocationID));
    dtLink = dtLink.filter((item) => item.orientation_id === Number(intOrientationID));

    dtSelectionTable = data.openingERV_SA;
    // dtSelectionTable = get_dtDataFromImportRows(dtSelectionTable, 'product_type_id', Number(intProductTypeID));
    dtSelectionTable = dtSelectionTable.filter((item) => item.product_type_id === Number(intProductTypeID));
    // dtSelectionFinalTable = get_ddlItemsAddedOnValue(dtSelectionTable, 'openings_sa', dtLink);
    dtSelectionFinalTable = dtSelectionTable.filter(
      (e) => dtLink.filter((e_link) => e.items === e_link.openings_sa).length === 1 // 1: Matching items, 0: Not matching items
    );

    returnInfo.ddlSupplyAirOpeningDataTbl = dtSelectionFinalTable;

    if (
      intOrientationID === ClsID.intOrientationVerticalID &&
      (intCoolingCompID > 1 || intHeatingCompID > 1 || intReheatCompID > 1)
    ) {
      returnInfo.ddlSupplyAirOpeningId = ClsID.intSA_Open_2_ID;
    }

    if (isContain(dtSelectionFinalTable, 'items', strSupplyAirOpening)) {
      returnInfo.ddlSupplyAirOpeningId = intSupplyAirOpeningId;
      returnInfo.ddlSupplyAirOpeningText = strSupplyAirOpening;
    } else {
      returnInfo.ddlSupplyAirOpeningId = dtSelectionTable?.[0]?.id;
      returnInfo.ddlSupplyAirOpeningText = dtSelectionTable?.[0]?.items.toString();
    }
  } else if (intUnitTypeID === ClsID.intUnitTypeAHU_ID) {
    dtSelectionTable = data.openingAHU_SA;

    returnInfo.ddlSupplyAirOpeningDataTbl = dtSelectionTable;
    if (isContain(dtSelectionFinalTable, 'items', strSupplyAirOpening)) {
      returnInfo.ddlSupplyAirOpeningId = intSupplyAirOpeningId;
      returnInfo.ddlSupplyAirOpeningText = strSupplyAirOpening;
    } else {
      returnInfo.ddlSupplyAirOpeningId = dtSelectionTable?.[0]?.id;
      returnInfo.ddlSupplyAirOpeningText = dtSelectionTable?.[0]?.items.toString();
    }
  }

  return returnInfo;
};

export const getRemainingOpeningsInfo = (
  data,
  intUnitTypeID,
  intProductTypeID,
  strSupplyAirOpening,
  intOrientationID
) => {
  const returnInfo = [];
  let dtLink = [];
  let dtSelectionTable = [];
  let dtSelectionFinalTable = [];

  if (intUnitTypeID === ClsID.intUnitTypeERV_ID || intUnitTypeID === ClsID.intUnitTypeHRV_ID) {
    dtLink = data.openingERV_SA_EA_Link.filter((item) => item.product_type_id === intProductTypeID);
    // dtLink = get_dtDataFromImportRows(dtLink, 'openings_sa', strSupplyAirOpening);
    // dtLink = get_dtDataFromImportRows(dtLink, 'orientation_id', intOrientationID);
    dtLink = dtLink.filter((item) => item.openings_sa === strSupplyAirOpening);
    dtLink = dtLink.filter((item) => item.orientation_id === Number(intOrientationID));

    dtSelectionTable = data.openingERV_EA;
    // dtSelectionTable = get_dtDataFromImportRows(dtSelectionTable, 'product_type_id', intProductTypeID);
    dtSelectionTable = dtSelectionTable.filter((item) => item.product_type_id === Number(intProductTypeID));
    // dtSelectionFinalTable = get_ddlItemsAddedOnValue(dtSelectionTable, 'openings_ea', dtLink);
    dtSelectionFinalTable = dtSelectionTable.filter(
      (e) => dtLink.filter((e_link) => e.items === e_link.openings_ea).length === 1 // 1: Matching items, 0: Not matching items
    );

    returnInfo.ddlExhaustAirOpeningDataTbl = dtSelectionFinalTable;
    returnInfo.ddlExhaustAirOpeningId = dtSelectionFinalTable[0]?.id;
    returnInfo.ddlExhaustAirOpeningText = dtSelectionFinalTable[0]?.items;
    returnInfo.ddlExhaustAirOpeningVisible = true;

    dtLink = data.openingERV_SA_OA_Link.filter((item) => item.product_type_id === intProductTypeID);
    // dtLink = get_dtDataFromImportRows(dtLink, 'openings_sa', strSupplyAirOpening);
    // dtLink = get_dtDataFromImportRows(dtLink, 'orientation_id', intOrientationID);
    dtLink = dtLink.filter((item) => item.openings_sa === strSupplyAirOpening);
    dtLink = dtLink.filter((item) => item.orientation_id === intOrientationID);

    dtSelectionTable = data.openingERV_OA;
    // dtSelectionTable = get_dtDataFromImportRows(dtSelectionTable, 'product_type_id', intProductTypeID);
    dtSelectionTable = dtSelectionTable.filter((item) => item.product_type_id === Number(intProductTypeID));
    // dtSelectionFinalTable = get_ddlItemsAddedOnValue(dtSelectionTable, 'openings_oa', dtLink);
    dtSelectionFinalTable = dtSelectionTable.filter(
      (e) => dtLink.filter((e_link) => e.items === e_link.openings_oa).length === 1 // 1: Matching items, 0: Not matching items
    );

    returnInfo.ddlOutdoorAirOpeningDataTbl = dtSelectionFinalTable;
    returnInfo.ddlOutdoorAirOpeningId = dtSelectionFinalTable[0]?.id;
    returnInfo.ddlOutdoorAirOpeningText = dtSelectionFinalTable[0]?.items;

    dtLink = data.openingERV_SA_RA_Link.filter((item) => item.product_type_id === intProductTypeID);
    // dtLink = get_dtDataFromImportRows(dtLink, 'openings_sa', strSupplyAirOpening);
    // dtLink = get_dtDataFromImportRows(dtLink, 'orientation_id', intOrientationID);
    dtLink = dtLink.filter((item) => item.openings_sa === strSupplyAirOpening);
    dtLink = dtLink.filter((item) => item.orientation_id === Number(intOrientationID));

    dtSelectionTable = data.openingERV_RA;
    // dtSelectionTable = get_dtDataFromImportRows(dtSelectionTable, 'product_type_id', intProductTypeID);
    dtSelectionTable = dtSelectionTable.filter((item) => item.product_type_id === Number(intProductTypeID));
    // dtSelectionFinalTable = get_ddlItemsAddedOnValue(dtSelectionTable, 'openings_ra', dtLink);
    dtSelectionFinalTable = dtSelectionTable.filter(
      (e) => dtLink.filter((e_link) => e.items === e_link.openings_ra).length === 1 // 1: Matching items, 0: Not matching items
    );

    returnInfo.ddlReturnAirOpeningDataTbl = dtSelectionFinalTable;
    returnInfo.ddlReturnAirOpeningId = dtSelectionFinalTable[0]?.id;
    returnInfo.ddlReturnAirOpeningText = dtSelectionFinalTable[0]?.items;
    returnInfo.ddlReturnAirOpeningVisible = true;
  } else if (intUnitTypeID === ClsID.intUnitTypeAHU_ID) {
    dtSelectionTable = data.openingAHU_OA;

    returnInfo.ddlOutdoorAirOpeningDataTbl = dtSelectionTable;
    returnInfo.ddlOutdoorAirOpeningId = dtSelectionTable[0]?.id;
    returnInfo.ddlOutdoorAirOpeningText = dtSelectionTable[0]?.items;

    dtSelectionTable = [{ id: 0, items: 'NA' }, ...dtSelectionTable];

    returnInfo.ddlExhaustAirOpeningDataTbl = dtSelectionTable;
    returnInfo.ddlExhaustAirOpeningId = '0';
    returnInfo.ddlExhaustAirOpeningText = 'NA';
    returnInfo.ddlExhaustAirOpeningVisible = false;

    returnInfo.ddlReturnAirOpeningDataTbl = dtSelectionTable;
    returnInfo.ddlReturnAirOpeningId = '0';
    returnInfo.ddlReturnAirOpeningText = 'NA';
    returnInfo.ddlReturnAirOpeningVisible = false;
  }

  return returnInfo;
};
