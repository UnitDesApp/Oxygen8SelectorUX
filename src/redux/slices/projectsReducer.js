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
  projectList: [],
  unitList: [],
  projectInitInfo: {},
  projectInfo: {},
};

const ProjectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    setProjectInfo(state, action) {
      state.isLoading = false;
      state.projectList = action.payload.jobList;
      state.projectInitInfo = action.payload.jobInitInfo;
    },
    setProjectInitInfo(state, action) {
      state.isLoading = false;
      state.projectInitInfo = action.payload;
    },
    addNewProject(state, action) {
      state.projectList.push(action.payload);
    },
    setProjectsAndUnitsInfo(state, action) {
      state.isLoading = false;
      state.projectList = action.payload.jobList;
      state.unitList = action.payload.unitList;
    },
    updateProject(state, action) {
      state.projectList = action.payload;
    },
    deleteProject(state, action) {
      const { projectData } = action.payload;
      state.projectList = projectData;
      state.unitList = state.unitList.filter((item) => projectData.find((element) => element.jobId === item.jobId));
    },
    updateUnit(state, action) {
      const { jobId, unitId, data } = action.payload;
      const selectedProjectIdx = state.unitList.findIndex((item) => item.jobId.toString() === jobId);
      const selectedUnitIdx = state.unitList[selectedProjectIdx].data.findIndex(
        (item) => item.unitId.toString() === unitId
      );
      state.unitList[selectedProjectIdx].data[selectedUnitIdx] = data;
    },
    addUnitInfo(state, action) {
      const { jobId, data } = action.payload;
      const selectedId = state.unitList.findIndex((item) => item.jobId.toString() === jobId);
      state.unitList[selectedId].data.unshift(data);
    },
    deleteUnit(state, action) {
      const { jobId, data } = action.payload;
      const selectedId = state.unitList.findIndex((item) => item.jobId.toString() === jobId);
      state.unitList[selectedId].data = data;
    },
  },
});

export const { getUnitInfoByProjectId } = ProjectsSlice.actions;

// Reducer
export default ProjectsSlice.reducer;

// ----------------------------------------------------------------------

export function getProjectsInfo() {
  return async () => {
    dispatch(ProjectsSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/jobs/get`);
    dispatch(ProjectsSlice.actions.setProjectInfo(response.data));
  };
};

export function getProjectsInitInfo() {
  return async () => {
    dispatch(ProjectsSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/job/get`);
    dispatch(ProjectsSlice.actions.setProjectInitInfo(response.data));
  };
};

export function addNewProject(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/job/add`, data);
    dispatch(ProjectsSlice.actions.addNewProject(response.data[0]));
    return response.data[0].id;
  };
}

export function updateProject(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/job/update`, data);
    await dispatch(ProjectsSlice.actions.updateProject(response.data.projectList));
    return response.data.projectInfo[0];
  };
}

export function deleteProject(data) {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/job/delete`, data);
    dispatch(ProjectsSlice.actions.updateProject(response.data));
  };
}

export function duplicateProject(data)  {
  return async () => {
    const response = await axios.post(`${serverUrl}/api/job/duplicate`, data);
    dispatch(ProjectsSlice.actions.updateProject(response.data));
  };
}

export function getProjectsAndUnitsInfo(data) {
  return async () => {
    dispatch(ProjectsSlice.actions.startLoading());
    const response = await axios.post(`${serverUrl}/api/job/getwithunit`, data);
    dispatch(ProjectsSlice.actions.setProjectsAndUnitsInfo(response.data));
  };
}

export function addNewUnit(data) {
  dispatch(ProjectsSlice.actions.addUnitInfo(data));
}

export function updateUnit(data) {
  dispatch(ProjectsSlice.actions.updateUnit(data));
}

export function deleteUnit(data) {
  dispatch(ProjectsSlice.actions.deleteUnit(data));
}
// ----------------------------------------------------------------------
