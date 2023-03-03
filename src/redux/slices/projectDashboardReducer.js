import { createSlice } from '@reduxjs/toolkit';
// store
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// config
import { serverUrl } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: true,
  projectInfo: {},
  unitList: [],
};

const ProjectDashboardSlice = createSlice({
  name: 'projectDashboard',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setProjectAndUnitInfo(state, action) {
      state.isLoading = false;
      state.projectInfo = action.payload.jobInfo[0];
      state.unitList = action.payload.unitList;
    },
    updateProjectInfo(state, action) {
      state.projectInfo = action.payload;
    },
    setUnitInfo(state, action){
      state.unitList = action.payload;
    }
  },
});

export const { setProjectAndUnitInfo } = ProjectDashboardSlice.actions;

// Reducer
export default ProjectDashboardSlice.reducer;

// ----------------------------------------------------------------------

export function getProjectsAndUnitsInfo(data) {
  return async () => {
    dispatch(ProjectDashboardSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/job/getwithunit`, data);
    dispatch(setProjectAndUnitInfo(response.data));
  };
}


export function updateProjectInfo(data) {
  return async () => {
    await dispatch(ProjectDashboardSlice.actions.updateProjectInfo(data));
  };
}

export const deleteUnits = async (data) => {
  const response = await axios.post(`${serverUrl}/api/units/Delete`, data);
  dispatch(ProjectDashboardSlice.actions.setUnitInfo(response.data));
  return response.data;
}

// ----------------------------------------------------------------------
