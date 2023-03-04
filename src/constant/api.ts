import { DOMAIN_API_URL } from ".";

export const API_UPLOAD_IMAGE = `${DOMAIN_API_URL}/upload/image_url`;

export const LOCATION = {
  GET: {
    LOCATION: "/location",
  },
};

export const COMPANY = {
  GET: {
    COMPANIES: "/company",
  },
  POST: {
    CREATE_COMPANY: "/company",
  },
  PUT: {
    UPDATE_COMPANY: "/company",
  },
};

export const CAREER_TYPE = {
  GET: {
    CAREER_TYPES: "/career-type",
  },
  POST: {
    CREATE_CAREER_TYPE: "/career-type",
  },
  PUT: {
    UPDATE_CAREER_TYPE: "/career-type",
  },
};

export const JOB_APPLICATION = {
  GET: {
    JOB_APPLICATIONS: "/job-application",
    DOWNLOAD_REPORT: "/job-application/download-report",
  },
  POST: {
    CREATE_APPLICATION: "/job-application",
  },
  PUT: {
    UPDATE_APPLICATION: "/job-application",
  },
};

export const JOB_POST = {
  GET: {
    JOB_POSTS: "/job-post",
  },
  POST: {
    CREATE_JOB_POST: "/job-post",
  },
  PUT: {
    UPDATE_JOB_POST: "/job-post",
  },
};

export const AUTH = {
  GET: {
    LOGIN_MICROSOFT: "/auth/login-via-microsoft",
    CHECK_SESSION: "/auth/session",
    LOGOUT: "/auth/logout",
  },
};

const API = {
  AUTH,
  COMPANY,
  CAREER_TYPE,
  JOB_APPLICATION,
  JOB_POST,
  LOCATION,
};

export default API;
