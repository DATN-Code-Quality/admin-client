import { ListSonarqube } from '~/domain/sonarqube';

export const SET_FILTER = 'SET_FILTER';
export const SET_DATA_FILTER = 'SET_DATA_FILTER';
export const SET_ASSIGNMENT_SELECTED = 'SET_ASSIGNMENT_SELECTED';
export const SET_SUBMISSION_ISSUES = 'SET_SUBMISSION_ISSUES';
export const SET_ISSUE_SELECTED = 'SET_ISSUE_SELECTED';

export const setFilter = (data) => ({
  type: SET_FILTER,
  payload: data,
});

export const setDataFilter = (data: ListSonarqube) => ({
  type: SET_DATA_FILTER,
  payload: data,
});

export const setSubmissionSelected = (data: any) => ({
  type: SET_ASSIGNMENT_SELECTED,
  payload: data,
});

export const setSubmissionIssues = (data: any) => ({
  type: SET_SUBMISSION_ISSUES,
  payload: data,
});

export const setIssueSelected = (data: any) => ({
  type: SET_ISSUE_SELECTED,
  payload: data,
});
