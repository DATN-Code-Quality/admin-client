import { combineReducers } from 'redux';

import auth from './auth';
import sonarqube from './sonarqube';

export default combineReducers({ auth, sonarqube });
