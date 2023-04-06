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

export function updateMyProfile(userInfo) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/account/getAllInfo`, userInfo);
    return response.data;
  };
}