import {
  SET_DATA_FILTER,
  SET_FILTER,
  SET_ISSUE_SELECTED,
  SET_SUBMISSION_ISSUES,
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
    case SET_FILTER:
      // return {
      //   ...state,
      //   filter: { ...state?.filter, ...payload },
      // };
      break;
    case SET_DATA_FILTER:
      return {
        ...state,
        dataResponse: { ...payload },
      };
    case SET_SUBMISSION_ISSUES:
      return {
        ...state,
        submissionIssues: payload,
      };
    case SET_ISSUE_SELECTED:
      return { ...state, issueSelected: payload };
    default:
      return state;
  }
};

export default sonarqubeReducer;
