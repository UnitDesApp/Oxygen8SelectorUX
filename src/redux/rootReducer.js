import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import projectsReducer from './slices/projectsReducer';
import projectDashboardReducer from './slices/projectDashboardReducer';
import unitReducer from './slices/unitReducer';
import submittalReducer from './slices/submittalReducer';
import quoteReducer from './slices/quoteReducer';
import accountReducer from './slices/AccountReducer';
import resourceReducer from './slices/ResourceReducer';
import BaseReducer from './slices/BaseReducer';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  projects: projectsReducer,
  projectDashboard: projectDashboardReducer,
  unit: unitReducer,
  submittal: submittalReducer,
  quote: quoteReducer,
  account: accountReducer,
  resource: resourceReducer,
  base: BaseReducer,
});

export { rootPersistConfig, rootReducer };
