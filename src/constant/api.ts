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
  },
  POST: {
    CREATE_USER: '/user/add-users',
  },
  PUT: {
    UPDATE_USER: '/user/update-user',
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
  PARTNER,
  AGENCY,
};

export default API;
