import { lazy } from 'react';

import { DownloadOutlined } from '@ant-design/icons';

import { Role } from './enum';
import ROUTE from './routes';

const ViewUser = lazy(() => import('../ui/modules/user/containers/ViewUser'));

const ViewPartner = lazy(
  () => import('../ui/modules/partner/containers/ViewPartner')
);

const Login = lazy(() => import('../ui/modules/login/containers/Login'));

const Dashboard = lazy(
  () => import('../ui/modules/dashboard/containers/Dashboard')
);

const ViewCourseList = lazy(
  () => import('../ui/modules/course/containers/ViewCourseList')
);

const CreateCourse = lazy(
  () => import('../ui/modules/course/containers/CreateCourse')
);

const UpdateCourse = lazy(
  () => import('../ui/modules/course/containers/CreateCourse')
);

const ViewCourseDetail = lazy(
  () => import('../ui/modules/course/containers/ViewCourseDetail')
);

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
  },
  {
    path: ROUTE.USER.LIST,
    name: 'users',
    element: ViewUser,
  },
  {
    path: ROUTE.PARTNER.LIST,
    name: 'Partners',
    element: ViewPartner,
  },
  {
    path: ROUTE.COURSE.LIST,
    name: 'courseList',
    element: ViewCourseList,
  },
  {
    path: ROUTE.COURSE.CREATE,
    name: 'createCourse',
    element: CreateCourse,
  },
  {
    path: ROUTE.COURSE.EDIT,
    name: 'updateCourse',
    element: UpdateCourse,
  },
  {
    path: ROUTE.COURSE.DETAIL,
    name: 'courseDetail',
    element: ViewCourseDetail,
  },
];

export const menus = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    // icon: DownloadOutlined,
    route: ROUTE.DASHBOARD,
    role: [Role.ROOT_ADMIN, Role.TEACHER, Role.STUDENT],
  },
  {
    id: 'user',
    name: 'Users',
    // icon: DownloadOutlined,
    route: ROUTE.USER.LIST,
    role: [Role.ROOT_ADMIN, Role.TEACHER, Role.STUDENT],
  },
  
  {
    id: 'course',
    name: 'Courses',
    // icon: DownloadOutlined,
    route: ROUTE.COURSE.LIST,
    role: [Role.ROOT_ADMIN, Role.TEACHER, Role.STUDENT],
  },
  {
    id: 'history',
    name: 'History',
    // icon: DownloadOutlined,
    route: ROUTE.HISTORY,
    role: [Role.ROOT_ADMIN, Role.TEACHER, Role.STUDENT],
  },
];
