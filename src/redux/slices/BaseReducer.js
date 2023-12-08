import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';

// -------------------------------------------------------

const initialState = {
  data: undefined,
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
    dispatch(BaseSlice.actions.setBaseInfo(JSON.parse(response.data)));
  };
}
