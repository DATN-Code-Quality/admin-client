/* eslint-disable no-prototype-builtins */
import { StoreState } from '../types';

import { Filter } from '~/domain/sonarqube';

export const sonarqubeSelector = (state: StoreState) => state.sonarqube;

export default class SonarqubeSelector {
  static getFiterSonarqube = (state: StoreState): Filter => {
    return state.sonarqube?.filterSetting;
  };

  static getDataReponseSonarqube = (state: StoreState) => {
    return state.sonarqube?.dataResponse;
  };

  static getAssignmentSelected = (state: StoreState) => {
    return state.sonarqube.assignmentSelected;
  };

  static getSubmissionIssues = (state: StoreState) => {
    return state.sonarqube.submissionIssues;
  };

  static getIssueSelected = (state: StoreState) => {
    return state.sonarqube.issueSelected;
  };
}
