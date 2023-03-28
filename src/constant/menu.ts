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

const SessionLog = lazy(
  () => import('../ui/modules/session-log/containers/SessionLog')
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
    path: ROUTE.SESSION_LOG,
    name: 'sessionLog',
    element: SessionLog,
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
];

export const menus = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    // icon: DownloadOutlined,
    route: ROUTE.DASHBOARD,
    role: [Role.ROOT_ADMIN, Role.SYSTEM_ADMIN, Role.USER],
  },
  {
    id: 'sessionLog',
    name: 'Logs',
    // icon: DownloadOutlined,
    route: ROUTE.SESSION_LOG,
    role: [Role.ROOT_ADMIN, Role.SYSTEM_ADMIN, Role.USER],
  },
  {
    id: 'user',
    name: 'Users',
    // icon: DownloadOutlined,
    route: ROUTE.USER.LIST,
    role: [Role.ROOT_ADMIN, Role.SYSTEM_ADMIN, Role.USER],
  },
  {
    id: 'partner',
    name: 'Partners',
    // icon: DownloadOutlined,
    route: ROUTE.PARTNER.LIST,
    role: [Role.ROOT_ADMIN, Role.SYSTEM_ADMIN, Role.USER],
  },
];
