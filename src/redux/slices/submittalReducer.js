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
  submittalInfo: {},
  submittalDetailInfo: [],
  notes: [],
  shippingNotes: [],
};

const SubmittalSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    getSubmittalInfo(state, action) {
      const data = action.payload;
      state.notes = data.gvNotes;
      state.shippingNotes = data.gvShippingNotes;
      state.submittalInfo = {
        txbJobName: data.txbProjectNameText,
        txbRepName: data.txbRepNameText,
        txbSalesEngineer: data.txbSalesEngineerText,
        txbLeadTime: data.txbLeadTimeText,
        txbRevisionNo: data.txbRevisionNoText,
        txbPONumber: data.txbPO_NumberText,
        txbShipName: data.txbShippingNameText,
        txbShippingStreetAddress: data.txbShippingStreetAddressText,
        txbShippingCity: data.txbShippingCityText,
        txbShippingProvince: data.txbShippingProvinceText,
        txbShippingPostalCode: data.txbShippingPostalCodeText,
        ddlCountry: data.ddlShippingCountryValue,
        ddlDockType: data.intDockTypeID,
        ckbBackdraftDamper: data.ckbBackdraftDamper,
        ckbBypassDefrost: data.ckbBypassDefrost,
        ckbConstantVolume: data.ckbConstantVolume,
        ckbFireAlarm: data.ckbFireAlarm,
        ckbHumidification: data.ckbHumidification,
        ckbHydronicPreheat: data.ckbHydronicPreheat,
        ckbOJHMISpec: data.ckbOJHMISpec,
        ckbTemControl: data.ckbTemControl,
        ckbTerminalWiring: data.ckbTerminalWiring,
        ckbVoltageTable: data.ckbVoltageTable,
      };
      state.submittalDetailInfo = data.gvSubmittals.gvSubmittalDetailsDataSource;
      state.isLoading = false;
    },
    addNewNote(state, action) {
      state.notes = action.payload;
    },
    addNewShippingNote(state, action) {
      state.shippingNotes = action.payload;
    }
  },
});

// Reducer
export default SubmittalSlice.reducer;

// ----------------------------------------------------------------------

export function getSubmittalInfo(data) {
  return async () => {
    dispatch(SubmittalSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/Submittals/getAllData`, data);
    console.log(response.data);
    dispatch(SubmittalSlice.actions.getSubmittalInfo(response.data));
  };
}

export function saveSubmittalInfo(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/Submittals/save`, data);
    return response.data;
  }
}

export function addNewNote(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/Submittals/noteadd`, data);
    console.log(response.data);
    dispatch(SubmittalSlice.actions.addNewNote(response.data));
  }
}

export function addNewShippingNote(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/Submittals/shippingnoteadd`, data);
    console.log(response.data);
    dispatch(SubmittalSlice.actions.addNewShippingNote(response.data));
  }
}

// ----------------------------------------------------------------------
