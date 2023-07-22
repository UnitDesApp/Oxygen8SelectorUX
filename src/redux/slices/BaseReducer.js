import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';

// -------------------------------------------------------

const initialState = {
  data: {
    weatherCountries: [],
    weatherStations: [],
    designConditions: [],
    countries: [],
    basisOfDesign: [],
    prodType: [],
    prodTypeControlsLink: [],
    prodTypeUnitTypeLink: [],
    prodTypeUnitTypeLocLink: [],
    unitType: [],
    controlsPreference: [],
    damperActuator: [],
    elecHeaterInstallation: [],
    fluidType: [],
    fluidConcentration: [],
    components: [],
    fobPoint: [],
    generalApplication: [],
    generalLocation: [],
    generalOrientation: [],
    handing: [],
    locOriLink: [],
    novaUnitModel: [],
    novaUnitModelLocOriLink: [],
    novaUnitModelVoltageLink: [],
    ventumHUnitModel: [],
    ventumHUnitModelVoltageLink: [],
    ventumLiteUnitModel: [],
    ventumLiteUnitModelVoltageLink: [],
    ventumPlusUnitModel: [],
    ventumPlusUnitModelVoltageLink: [],
    terraUnitModel: [],
    terraUnitModelLocOriLink: [],
    terraUnitModelVoltageLink: [],
    openingERV_EA: [],
    openingERV_OA: [],
    openingERV_RA: [],
    openingERV_SA: [],
    openingERV_SA_EA_Link: [],
    openingERV_SA_OA_Link: [],
    openingERV_SA_RA_Link: [],
    openingAHU_OA: [],
    openingAHU_SA: [],
    valveType: [],
    quoteStage: [],
    electricalVoltage: [],
  },
};

const BaseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setBaseInfo(state, action) {
      state.data = action.payload;
    },
  },
});

export default BaseSlice.reducer;

export function getAllBaseData() {
  return async () => {
    const response = await axios.get(`${serverUrl}/api/Selection/GetAll`);
    dispatch(BaseSlice.actions.setBaseInfo(response.data));
  };
}
