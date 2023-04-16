import { DOMAIN_API_URL } from '.';

export const API_UPLOAD_IMAGE = `${DOMAIN_API_URL}/upload/image_url`;

export const DASHBOARD = {
  GET: {
    OVERVIEW: '/api-overview',
  },
};

export const USER = {
  GET: {
    USERS: '/user/get-all-user',
    MOODLE_USERS: '/user-moodle/get-all-users',
    USERS_BY_COURSE_ID: '/user-moodle/get-user-course',
  },
  POST: {
    CREATE_USER: '/user/add-users',
  },
  PUT: {
    UPDATE_USER: '/user/update-user',
  },
};

export const COURSE = {
  GET: {
    COURSES: '/course/get-all-course',
    COURSE: '/course/get-course',
    MOODLE_COURSES: '/course-moodle/get-all-courses',
  },
  POST: {
    CREATE_COURSE: '/course/add-courses',
  },
  PUT: {
    UPDATE_COURSE: '/course/update-course',
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
