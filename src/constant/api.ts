import { DOMAIN_API_URL } from ".";

export const API_UPLOAD_IMAGE = `${DOMAIN_API_URL}/upload/image_url`;

export const DASHBOARD = {
  GET: {
    OVERVIEW: "/api-overview",
  }
};

export const SESSION_LOG = {
  GET: {
    SESSION_LOG: "/session-logs",
  }
};


export const USER = {
  GET: {
    USERS: "/user",
  },
  POST: {
    CREATE_USER: "/user",
  },
  PUT: {
    UPDATE_USER: "/user",
  },
};

export const PARTNER = {
  GET: {
    PARTNERS: "/partner",
  },
  POST: {
    CREATE_PARTNER: "/partner",
  },
  PUT: {
    UPDATE_PARTNER: "/partner",
  },
};

export const AGENCY = {
  GET: {
    AGENCIES: "/agencies",
  },
  POST: {
    CREATE_AGENCY: "/agencies",
  },
  PUT: {
    UPDATE_AGENCY: "/agencies",
  },
};

export const AUTH = {
  GET: {
    LOGIN_ZALO: "/auth/login-via-zalo",
    CHECK_SESSION: "/auth/session",
    LOGOUT: "/auth/logout",
  },
};
const API = {
  DASHBOARD,
  SESSION_LOG,
  AUTH,
  USER,
  PARTNER,
  AGENCY,
};

export default API;
