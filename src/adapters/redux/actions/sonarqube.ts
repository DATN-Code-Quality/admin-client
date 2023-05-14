import { SubmissionSelected } from '~/domain/sonarqube';
import { Issue } from '~/domain/submission';

export const SET_SUBMISSION_SELECTED = 'SET_SUBMISSION_SELECTED';
export const SET_SUBMISSION_ISSUES = 'SET_SUBMISSION_ISSUES';
export const SET_ISSUE_SELECTED = 'SET_ISSUE_SELECTED';

export const setSubmissionSelected = (data: SubmissionSelected) => ({
  type: SET_SUBMISSION_SELECTED,
  payload: data,
});

export const setSubmissionIssues = (data: Record<string, unknown>) => ({
  type: SET_SUBMISSION_ISSUES,
  payload: data,
});

export const setIssueSelected = (data: Issue | null) => ({
  type: SET_ISSUE_SELECTED,
  payload: data,
});
