import { lazy } from 'react';

import { DownloadOutlined } from '@ant-design/icons';

import { Role } from './enum';
import ROUTE from './routes';

const ViewUser = lazy(() => import('../ui/modules/user/containers/ViewUser'));

const Login = lazy(() => import('../ui/modules/login/containers/Login'));

const Dashboard = lazy(
  () => import('../ui/modules/dashboard/containers/Dashboard')
);

const ViewCourseList = lazy(
  () => import('../ui/modules/course/containers/ViewCourseList')
);

const CreateOrViewCourse = lazy(
  () => import('../ui/modules/course/containers/ViewOrCreateCourse')
);

const ViewCourseDetail = lazy(
  () => import('../ui/modules/course/containers/ViewCourseDetail')
);

const CreateOrViewAssignment = lazy(
  () => import('../ui/modules/course/containers/ViewOrCreateAssignment')
);

const Sonarqube = lazy(
  () => import('../ui/modules/sonarqube/containers/Sonarqube')
);

const SonarqubeSubmission = lazy(
  () => import('../ui/modules/sonarqube/containers/Submission')
);

// TODO: update allow route for each role

export const MAIN_ROUTES = [
  {
    path: ROUTE.LOGIN,
    name: 'login',
    element: Login,
  },
  {
    path: ROUTE.DASHBOARD,
    name: 'dashboard',
    element: Dashboard,
    roles: [Role.ADMIN, Role.SUPERADMIN, Role.USER],
  },
  {
    path: ROUTE.USER.LIST,
    name: 'users',
    element: ViewUser,
    roles: [Role.ADMIN, Role.SUPERADMIN, Role.USER],
  },
  {
    path: ROUTE.COURSE.LIST,
    name: 'courseList',
    element: ViewCourseList,
    roles: [Role.ADMIN, Role.SUPERADMIN, Role.USER],
  },
  {
    path: ROUTE.COURSE.CREATE,
    name: 'createCourse',
    element: CreateOrViewCourse,
    roles: [Role.ADMIN, Role.SUPERADMIN, Role.USER],
  },
  {
    path: ROUTE.COURSE.EDIT,
    name: 'updateCourse',
    element: CreateOrViewCourse,
    roles: [Role.ADMIN, Role.SUPERADMIN, Role.USER],
  },
  {
    path: ROUTE.COURSE.DETAIL,
    name: 'courseDetail',
    element: ViewCourseDetail,
    roles: [Role.ADMIN, Role.SUPERADMIN, Role.USER],
  },
  {
    path: ROUTE.COURSE.CREATE_ASSIGNMENT,
    name: 'createCourseAssignment',
    element: CreateOrViewAssignment,
    roles: [Role.ADMIN, Role.SUPERADMIN, Role.USER],
  },
  {
    path: ROUTE.COURSE.EDIT_ASSIGNMENT,
    name: 'updateCourseAssignment',
    element: CreateOrViewAssignment,
    roles: [Role.ADMIN, Role.SUPERADMIN, Role.USER],
  },
  {
    path: ROUTE.SONARQUBE.LIST,
    name: 'Sonarqube',
    element: Sonarqube,
    roles: [Role.ADMIN, Role.SUPERADMIN, Role.USER],
  },

  {
    path: ROUTE.SONARQUBE.SUBMISSION,
    name: 'Submission',
    element: SonarqubeSubmission,
    roles: [Role.ADMIN, Role.SUPERADMIN, Role.USER],
  },
];

export const menus = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    // icon: DownloadOutlined,
    route: ROUTE.DASHBOARD,
    roles: [Role.ADMIN, Role.SUPERADMIN, Role.USER],
  },
  {
    id: 'user',
    name: 'Quản lý người dùng',
    // icon: DownloadOutlined,
    route: ROUTE.USER.LIST,
    roles: [Role.ADMIN, Role.SUPERADMIN, Role.USER],
  },
  {
    id: 'course',
    name: 'Quản lý khoá học',
    // icon: DownloadOutlined,
    route: ROUTE.COURSE.LIST,
    roles: [Role.ADMIN, Role.SUPERADMIN, Role.USER],
  },
  {
    id: 'history',
    name: 'Lịch sử',
    // icon: DownloadOutlined,
    route: ROUTE.HISTORY,
    roles: [Role.ADMIN, Role.SUPERADMIN, Role.USER],
  },
  // {
  //   id: 'sonarqube',
  //   name: 'Sonarqube',
  //   // icon: DownloadOutlined,
  //   route: ROUTE.SONARQUBE.LIST,
  //   role: [Role.ROOT_ADMIN, Role.TEACHER, Role.STUDENT],
  // },
];
