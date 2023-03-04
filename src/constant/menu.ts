import { lazy } from "react";

import {
  DownloadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { ROLE } from "./role";
import ROUTE from "./routes";

const ViewJobPost = lazy(
  () => import("../ui/modules/job-post/containers/ViewJobPost")
);

const CreateJobPost = lazy(
  () => import("../ui/modules/job-post/containers/CreateJobPost")
);

const UpdateJobPost = lazy(
  () => import("../ui/modules/job-post/containers/CreateJobPost")
);

const ViewCompany = lazy(
  () => import("../ui/modules/company/containers/ViewCompany")
);

const CreateCompany = lazy(
  () => import("../ui/modules/company/containers/CreateCompany")
);

const UpdateCompany = lazy(
  () => import("../ui/modules/company/containers/CreateCompany")
);

const ViewCareerType = lazy(
  () => import("../ui/modules/career-type/containers/ViewCareerType")
);

const CreateCareerType = lazy(
  () => import("../ui/modules/career-type/containers/CreateCareerType")
);

const UpdateCareerType = lazy(
  () => import("../ui/modules/career-type/containers/CreateCareerType")
);

const Login = lazy(() => import("../ui/modules/login/containers/Login"));

export const MAIN_ROUTES = [
  {
    path: ROUTE.LOGIN,
    name: "login",
    element: Login,
  },
  {
    path: ROUTE.JOB_POST.LIST,
    name: "JobPosts",
    element: ViewJobPost,
  },
  {
    path: ROUTE.JOB_POST.CREATE_JOB_POST,
    name: "createJobPost",
    element: CreateJobPost,
  },
  {
    path: ROUTE.JOB_POST.UPDATE_JOB_POST,
    name: "updateJobPost",
    element: UpdateJobPost,
  },
  {
    path: ROUTE.COMPANY.LIST,
    name: "Companies",
    element: ViewCompany,
  },
  {
    path: ROUTE.COMPANY.CREATE_COMPANY,
    name: "createCompany",
    element: CreateCompany,
  },
  {
    path: ROUTE.COMPANY.UPDATE_COMPANY,
    name: "updateCompany",
    element: UpdateCompany,
  },
  {
    path: ROUTE.CAREER_TYPE.LIST,
    name: "CareerTypes",
    element: ViewCareerType,
  },
  {
    path: ROUTE.CAREER_TYPE.CREATE_CAREER_TYPE,
    name: "createCareerType",
    element: CreateCareerType,
  },
  {
    path: ROUTE.CAREER_TYPE.UPDATE_CAREER_TYPE,
    name: "updateCareerType",
    element: UpdateCareerType,
  },
];

export const appMenu = [
  {
    id: "jobPost",
    name: "Bài đăng tuyển dụng",
    icon: DownloadOutlined,
    route: ROUTE.JOB_POST.LIST,
    role: [ROLE.Admin],
  },
  {
    id: "company",
    name: "Công ty",
    icon: DownloadOutlined,
    route: ROUTE.COMPANY.LIST,
    role: [ROLE.Admin],
  },
  {
    id: "careerType",
    name: "Ngành nghề",
    icon: DownloadOutlined,
    route: ROUTE.CAREER_TYPE.LIST,
    role: [ROLE.Admin],
  },
];
