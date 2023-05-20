import {
  SET_ISSUE_SELECTED,
  SET_SUBMISSION_ISSUES,
  SET_SUBMISSION_SELECTED,
} from '../actions/sonarqube';

const defaultState = {
  filterSetting: {
    coverage: 1,
    reliabilityRatiing: 1,
    duplicatedLines: 1,
    languages: '',
    securityRating: 1,
    ncloc: '',
    securityReviewRating: 1,
    sqaleRating: 1,
  },
  dataResponse: {},
  component: [],
  submissionIssues: {},
  issueSelected: '',
  detailSubmissionIssues: {},
};

const sonarqubeReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_SUBMISSION_ISSUES:
      return {
        ...state,
        submissionIssues: payload,
      };
    case SET_ISSUE_SELECTED:
      return { ...state, issueSelected: payload };
    case SET_SUBMISSION_SELECTED:
      return { ...state, submissionSelected: payload };
    default:
      return state;
  }
};

export default sonarqubeReducer;
