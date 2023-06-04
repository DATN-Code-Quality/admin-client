const ROUTE = {
  INDEX: '/',
  DASHBOARD: '/dashboard',
  HISTORY: '/history',
  ACTIVE_ACCOUNT: '/active-account',
  PROFILE: {
    DETAIL: '/profile',
    CHANGE_PASSWORD: '/profile/change-password',
  },
  USER: {
    LIST: '/user/list',
  },
  COURSE: {
    LIST: '/course/list',
    DETAIL: '/course/detail',
    CREATE: '/course/create',
    EDIT: '/course/edit',
  },
  MY_COURSE: {
    LIST: '/my-course/list',
    DETAIL: '/my-course/detail',
    ASSIGN: '/my-course/assign',
    CREATE_ASSIGNMENT: '/my-course/create-assignment',
    EDIT_ASSIGNMENT: '/my-course/edit-assignment',
  },
  LOGIN: '/login',
  SONARQUBE: {
    LIST: '/sonarqube/list',
    SUBMISSION: '/sonarqube/submission',
  },
};

export default ROUTE;
