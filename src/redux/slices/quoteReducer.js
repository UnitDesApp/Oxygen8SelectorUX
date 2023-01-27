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
  quoteFormInfo: {},
  quoteControlInfo: {},
  gvPricingGeneral: [],
  gvPricingUnits: [],
  gvPricingMisc: [],
  gvPricingShipping: [],
  gvMisc: [],
  gvNotes: [],
};

const QuoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setQuoteInfo(state, action) {
      const {
        controlInfo, 
        initControlInfo, 
        pricingTotal,
      } = action.payload;

      state.gvPricingGeneral = action.payload.pricingGeneral;
      state.gvPricingUnits = action.payload.pricingUnits;
      state.gvPricingMisc = action.payload.pricingMisc;
      state.gvPricingShipping = action.payload.pricingShipping;
      state.gvMisc = action.payload.gvNotes;
      state.gvNotes = action.payload.gvMisc;

      const isEdit = controlInfo.isSaved;
      state.quoteFormInfo = {
        txbRevisionNo: isEdit ? controlInfo.txbRevisionNo : '0',
        txbProjectName: controlInfo.txbProjectName,
        txbQuoteNo: isEdit ? controlInfo.txbQuoteNo : '0',
        txbTerms: 'Net 30',
        txbCreatedDate:isEdit ? controlInfo.txbCreatedDate : initControlInfo.txbCreatedDate,
        txbRevisedDate: isEdit ? controlInfo.txbRevisedDate : initControlInfo.txbRevisedDate,
        txbValidDate: isEdit ? controlInfo.txbValidDate : initControlInfo.txbValidDate,
        txbCurrencyRate: isEdit ? controlInfo.txbCurrencyRate : '0',
        txbShippingFactor: isEdit ? controlInfo.txbShippingFactor : '0',
        txbDiscountFactor: isEdit ? controlInfo.txbDiscountFactor : '0',
        txbPriceAllUnits: isEdit ? controlInfo.txbPriceAllUnits : pricingTotal.txbPriceAllUnits,
        txbPriceMisc: isEdit ? controlInfo.txbPriceMisc : pricingTotal.txbPriceMisc,
        txbPriceShipping: isEdit ? controlInfo.txbPriceShipping : pricingTotal.txbPriceShipping,
        txbPriceSubtotal: isEdit ? controlInfo.txbPriceSubtotal : pricingTotal.txbPriceSubtotal,
        txbPriceDiscount: isEdit ? controlInfo.txbPriceDiscount : pricingTotal.txbPriceDiscount,
        txbPriceFinalTotal: isEdit ? controlInfo.txbPriceFinalTotal : pricingTotal.txbPriceFinalTotal,
        ddlQuoteStageVal: isEdit ? controlInfo.ddlQuoteStageVal : '1',
        ddlFOB_PointVal: isEdit ? controlInfo.ddlFOB_PointVal : '1',
        ddlCountryVal: isEdit ? controlInfo.ddlCountryVal : '2',
        ddlShippingTypeVal: isEdit ? controlInfo.ddlShippingTypeVal : '1',
        ddlDiscountTypeVal: isEdit ? controlInfo.ddlDiscountTypeVal : '2',
      };
      
      state.quoteControlInfo = {
        ddlCountry: initControlInfo.ddlCountry,
        ddlFOB_Point: initControlInfo.ddlFOB_Point,
        ddlQuoteStage: initControlInfo.ddlQuoteStage,
        ddlCountryEnabled: action.payload.ddlCountryEnabled,
        ddlFOB_PointEnabled: action.payload.ddlFOB_PointEnabled,
        divFinalPricingVisible: action.payload.divFinalPricingVisible,
        divMiscVisible: action.payload.divMiscVisible,
        divNotesVisible: action.payload.divNotesVisible,
        divPricingGeneralVisible: action.payload.divPricingGeneralVisible,
        divPricingSettingsVisible: action.payload.divPricingSettingsVisible,
        divPricingVisible: action.payload.divPricingVisible,
        gvNotesVisible: action.payload.gvNotesVisible,
        gvPricingMiscVisible: action.payload.gvPricingMiscVisible,
      }


      state.isLoading = false;
    },
    updateQuoteInfo(state, action) {
      const { quoteFormInfo, updatedInfo } = action.payload;
      state.gvPricingGeneral = updatedInfo.pricingGeneral;
      state.gvPricingUnits = updatedInfo.pricingUnits;
      state.gvPricingMisc = updatedInfo.pricingMisc;
      state.gvPricingShipping = updatedInfo.pricingShipping;
      
      const { pricingTotal } = updatedInfo;
      state.quoteFormInfo = {
        ...quoteFormInfo,
        txbPriceAllUnits: pricingTotal.txbPriceAllUnits,
        txbPriceMisc: pricingTotal.txbPriceMisc,
        txbPriceShipping: pricingTotal.txbPriceShipping,
        txbPriceSubtotal: pricingTotal.txbPriceSubtotal,
        txbPriceDiscount: pricingTotal.txbPriceDiscount,
        txbPriceFinalTotal: pricingTotal.txbPriceFinalTotal,
      }
    },
    addNewShippingNote(state, action) {
      state.shippingNotes = action.payload;
    }
  },
});

// Reducer
export default QuoteSlice.reducer;

// ----------------------------------------------------------------------

export function getQuoteInfo(data) {
  return async () => {
    dispatch(QuoteSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/Quote/get`, data);
    console.log(response.data);
    if (response.data.status === "success") dispatch(QuoteSlice.actions.setQuoteInfo(response.data));
    return response.data.status;
  };
}

export function saveQuoteInfo(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/Quote/save`, data);
    console.log(response.data);
    if (response.data.status === "success") dispatch(QuoteSlice.actions.updateQuoteInfo({quoteFormInfo: data, updatedInfo: response.data}));
    return response.data.status;
  }
}

export function addNewNote(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/Submittals/noteadd`, data);
    console.log(response.data);
    dispatch(QuoteSlice.actions.addNewNote(response.data));
  }
}

export function addNewShippingNote(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/Submittals/shippingnoteadd`, data);
    console.log(response.data);
    dispatch(QuoteSlice.actions.addNewShippingNote(response.data));
  }
}

// ----------------------------------------------------------------------
