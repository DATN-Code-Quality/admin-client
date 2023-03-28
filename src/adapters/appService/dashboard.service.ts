import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { User } from "~/src/domain/user";

import API from "~/src/constant/api";
import ROUTE from "~/src/constant/routes";
import { mockDashboard } from "~/src/mock/dashboard.mock";

import {
  postWithPath,
  putWithPath,
  formatResponse,
  getWithPath,
} from "../api.http";
import { ResponseData } from "~/src/constant";

export function useDashboard() {
  const navigate = useNavigate();

  return {
    async getOverview(params?): Promise<ResponseData<any>> {
      // const data = await getWithPath(API.DASHBOARD.GET.OVERVIEW);
      const data = await mockDashboard().getDashboard();
      return formatResponse(data);
    },
  };
}
