/* eslint-disable no-prototype-builtins */
import { StoreState } from '../types';

export const sonarqubeSelector = (state: StoreState) => state.sonarqube;

export default class SonarqubeSelector {
  static getSubmissionSelected = (state: StoreState) => {
    return state.sonarqube.submissionSelected;
  };

  static getSubmissionIssues = (state: StoreState) => {
    return state.sonarqube.submissionIssues;
  };

  static getIssueSelected = (state: StoreState) => {
    return state.sonarqube.issueSelected;
  };
}
