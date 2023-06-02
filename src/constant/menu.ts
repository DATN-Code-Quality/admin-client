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

const ViewMyCourseList = lazy(
  () => import('../ui/modules/my-course/containers/ViewCourseList')
);

const ViewMyCourseDetail = lazy(
  () => import('../ui/modules/my-course/containers/ViewCourseDetail')
);

const CreateOrViewAssignment = lazy(
  () => import('../ui/modules/my-course/containers/ViewOrCreateAssignment')
);

const Sonarqube = lazy(
  () => import('../ui/modules/sonarqube/containers/Sonarqube')
);

const SonarqubeSubmission = lazy(
  () => import('../ui/modules/sonarqube/containers/Submission')
);
const ViewAssignment=lazy(
  () => import('../ui/modules/my-course/containers/ViewAssignment')
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
    roles: [Role.ADMIN, Role.SUPERADMIN],
  },
  {
    path: ROUTE.USER.LIST,
    name: 'users',
    element: ViewUser,
    roles: [Role.ADMIN, Role.SUPERADMIN],
  },
  {
    path: ROUTE.COURSE.LIST,
    name: 'courseList',
    element: ViewCourseList,
    roles: [Role.ADMIN, Role.SUPERADMIN],
  },
  {
    path: ROUTE.COURSE.CREATE,
    name: 'createCourse',
    element: CreateOrViewCourse,
    roles: [Role.ADMIN, Role.SUPERADMIN],
  },
  {
    path: ROUTE.COURSE.EDIT,
    name: 'updateCourse',
    element: CreateOrViewCourse,
    roles: [Role.ADMIN, Role.SUPERADMIN],
  },
  {
    path: ROUTE.COURSE.DETAIL,
    name: 'courseDetail',
    element: ViewCourseDetail,
    roles: [Role.ADMIN, Role.SUPERADMIN],
  },
  {
    path: ROUTE.MY_COURSE.LIST,
    name: 'courseList',
    element: ViewMyCourseList,
    roles: [Role.USER],
  },
  {
    path: ROUTE.MY_COURSE.DETAIL,
    name: 'courseDetail',
    element: ViewMyCourseDetail,
    roles: [Role.USER],
  },
  {
    path: ROUTE.MY_COURSE.ASSIGN,
    name: 'assignment',
    element: ViewAssignment,
    roles: [Role.USER, Role.ADMIN],
  },
  {
    path: ROUTE.MY_COURSE.CREATE_ASSIGNMENT,
    name: 'createCourseAssignment',
    element: CreateOrViewAssignment,
    roles: [Role.USER],
  },
  {
    path: ROUTE.MY_COURSE.EDIT_ASSIGNMENT,
    name: 'updateCourseAssignment',
    element: CreateOrViewAssignment,
    roles: [Role.USER],
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
    roles: [Role.ADMIN, Role.SUPERADMIN],
  },
  {
    id: 'user',
    name: 'User Management',
    // icon: DownloadOutlined,
    route: ROUTE.USER.LIST,
    roles: [Role.ADMIN, Role.SUPERADMIN],
  },
  {
    id: 'course',
    name: 'Course Management',
    // icon: DownloadOutlined,
    route: ROUTE.COURSE.LIST,
    roles: [Role.ADMIN, Role.SUPERADMIN],
  },
  {
    id: 'myCourse',
    name: 'My Course',
    // icon: DownloadOutlined,
    route: ROUTE.MY_COURSE.LIST,
    roles: [Role.USER],
  },
  {
    id: 'history',
    name: 'History',
    // icon: DownloadOutlined,
    route: ROUTE.HISTORY,
    roles: [Role.USER],
  },
  // {
  //   id: 'sonarqube',
  //   name: 'Sonarqube',
  //   // icon: DownloadOutlined,
  //   route: ROUTE.SONARQUBE.LIST,
  //   role: [Role.ROOT_ADMIN, Role.TEACHER, Role.STUDENT],
  // },
];
