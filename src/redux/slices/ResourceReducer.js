import { createSlice } from '@reduxjs/toolkit';

import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';

// -------------------------------------------------------

const initialState = {
  resource: {},
};

const ResourceSlice = createSlice({
  name: 'resource',
  initialState,
  reducers: {
    setResourcesInfo(state, action) {
      state.resource = action.payload;
    },
    setUserInfo(state, action) {
      state.userList = action.payload;
    },
    setCustomerInfo(state, action) {
      state.customerList = action.payload;
    },
  },
});

export default ResourceSlice.reducer;

export function uploadFiles(data) {
  const formData = new FormData();
  data.files.forEach((file) => {
    formData.append('files', file);
  })
  formData.append('resourceType', data.resourceType);
  return async () => {
    const response = await axios.post(`${serverUrl}/api/resource/uploadfiles`, formData);
    dispatch(ResourceSlice.actions.setResourcesInfo(response.data));
    return response;
  };
}

export function getFileList() {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/resource/getFiles`);
    dispatch(ResourceSlice.actions.setResourcesInfo(response.data));
  };
}