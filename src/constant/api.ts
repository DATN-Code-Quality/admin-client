import { DOMAIN_API_URL } from '.';

export const API_UPLOAD_IMAGE = `${DOMAIN_API_URL}/upload/image_url`;

export const DASHBOARD = {
  GET: {
    OVERVIEW: '/api-overview',
  },
};

export const USER = {
  GET: {
    USERS: '/user/users',
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
    COURSES: '/course/courses',
    COURSE: '/course/get-course',
    MOODLE_COURSES: '/course/sync-courses',
  },
  POST: {
    CREATE_COURSE: '/course',
  },
  PUT: {
    UPDATE_COURSE: '/course',
  },
};

export const ASSIGNMENT = {
  GET: {
    ASSIGNMENTS: '/assignment/get-all-assignment',
    ASSIGNMENT: '/assignment/get-assignment',
    MOODLE_ASSIGNMENTS_BY_COURSE_ID:
      '/assignment-moodle/get-assignments-by-course-id',
  },
  POST: {
    CREATE_ASSIGNMENT: '/assignment/add-assignments',
  },
  PUT: {
    UPDATE_ASSIGNMENT: '/assignment/update-assignment',
  },
};

export const SUBMISSION = {
  GET: {
    SUBMISSIONS: '/submission/get-all-submission',
    SUBMISSION: '/submission/get-submission',
    SUBMISSIONS_BY_ASSIGNMENT_ID: '/submission/get-submissions',
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

export const PARTNER = {
  GET: {
    PARTNERS: '/partner',
  },
  POST: {
    CREATE_PARTNER: '/partner',
  },
  PUT: {
    UPDATE_PARTNER: '/partner',
  },
};

export const AGENCY = {
  GET: {
    AGENCIES: '/agencies',
  },
  POST: {
    CREATE_AGENCY: '/agencies',
  },
  PUT: {
    UPDATE_AGENCY: '/agencies',
  },
};

export const AUTH = {
  GET: {
    LOGIN: '/auth/login',
    LOGIN_ZALO: '/auth/login-via-zalo',
    CHECK_SESSION: '/auth/session',
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
  ASSIGNMENT,
  SUBMISSION,
  PARTNER,
  AGENCY,
};

export default API;
