import { DOMAIN_API_URL } from '.';

export const API_UPLOAD_IMAGE = `${DOMAIN_API_URL}/upload/image_url`;

export const DASHBOARD = {
  GET: {
    OVERVIEW: '/api-overview',
  },
};

export const USER = {
  GET: {
    USERS: '/user/all-users',
    MOODLE_USERS: '/user/sync-users',
    USERS_BY_COURSE_ID: '/user-moodle/get-user-course',
  },
  POST: {
    CREATE_USER: '/user',
  },
  PUT: {
    UPDATE_USER: '/user',
  },
};

export const COURSE = {
  GET: {
    COURSES: '/course/all-courses',
    COURSE: '/course',
    MOODLE_COURSES: '/course/sync-courses',
  },
  POST: {
    CREATE_COURSE: '/course',
  },
  PUT: {
    UPDATE_COURSE: '/course',
  },
};

export const USER_COURSE = {
  GET: {
    USER_COURSE: '/user-course',
    MOODLE_USERS_COURSE: '/user-course/sync-users',
  },
  POST: {
    USER_COURSE: '/user-course',
  },
  PUT: {
    USER_COURSE: '/user-course',
  },
};

export const ASSIGNMENT = {
  GET: {
    ASSIGNMENTS: '/assignment',
    ASSIGNMENT: '/assignment/get-assignment',
    MOODLE_ASSIGNMENTS: '/assignment',
  },
  POST: {
    CREATE_ASSIGNMENT: '/assignment',
  },
  PUT: {
    UPDATE_ASSIGNMENT: '/assignment/update-assignment',
  },
};

export const SUBMISSION = {
  GET: {
    SUBMISSIONS: '/submission/get-all-submission',
    SUBMISSION: '/submission/get-submission',
    SUBMISSIONS_BY_ASSIGNMENT_ID: '/submission',
    MOODLE_SUBMISSIONS_BY_ASSIGNMENT_ID:
      '/submission-moodle/get-submissions-by-assignment-id',
  },
  POST: {
    CREATE_SUBMISSION: '/submission/add-submissions',
  },
  PUT: {
    UPDATE_SUBMISSION: '/submission/update-submission',
  },
};

export const AUTH = {
  GET: {
    LOGIN: '/auth/login',
    LOGIN_MICROSOFT: '/auth/login/outlook',
    CHECK_PROFILE: '/auth/profile',
    LOGOUT: '/auth/logout',
  },
};

export const SONARQUBE = {
  GET: {
    ISSUES_SUBMISSION: '/sonarqube/issue/e25b393e-cf56-4e12-8a0b-e7213648ac76',
  },
};
const API = {
  DASHBOARD,
  AUTH,
  USER,
  COURSE,
  USER_COURSE,
  ASSIGNMENT,
  SUBMISSION,
};

export default API;
