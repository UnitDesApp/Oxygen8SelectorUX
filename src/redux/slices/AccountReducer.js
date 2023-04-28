import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';

// -------------------------------------------------------

const initialState = {
  userList: [],
  customerList: [],
  customerType: [],
  fobPoint: [],
  country: [],
};

const AccountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccountInfo(state, action) {
      state.userList = action.payload.users;
      state.customerList = action.payload.customers;
      state.customerType = action.payload.customerType;
      state.fobPoint = action.payload.fobPoint;
      state.country = action.payload.country;
    },
    setUserInfo(state, action) {
      state.userList = action.payload;
    },
    setCustomerInfo(state, action) {
      state.customerList = action.payload;
    }
  },
});

export const { setAccountInfo } = AccountSlice.actions;

export default AccountSlice.reducer;

export function getAccountInfo() {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/account/getAllInfo`, {
      intUAL: localStorage.getItem('UAL'),
    });
    dispatch(AccountSlice.actions.setAccountInfo(response.data));
  };
}

export function updateUser(userInfo) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/account/updateUser`, userInfo);
    dispatch(AccountSlice.actions.setUserInfo(response.data));
  }
}

export function updateMyProfile(userInfo) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/account/updateMyProfile`, userInfo);
    return response.data;
  };
}

export function updateCustomer(customerInfo) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/account/updateCustomer`, customerInfo);
    dispatch(AccountSlice.actions.setCustomerInfo(response.data));
  }
}

export function addNewUser(userInfo) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/account/addNewUser`, userInfo);
    dispatch(AccountSlice.actions.setUserInfo(response.data));
  }
}

export function addNewCustomer(customerInfo) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/account/addNewCustomer`, customerInfo);
    dispatch(AccountSlice.actions.setCustomerInfo(response.data));
  }
}

export function removeUser(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/account/deleteUser`, data);
    dispatch(AccountSlice.actions.setUserInfo(response.data));
    return response.data
  }
}

export function removeCustomer(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/account/deleteCustomer`, data);
    dispatch(AccountSlice.actions.setCustomerInfo(response.data));
    return response.data;
  }
}