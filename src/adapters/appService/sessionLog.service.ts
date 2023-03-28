import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { User } from "~/src/domain/user";

import API from "~/src/constant/api";
import ROUTE from "~/src/constant/routes";
import { mockSessionLog } from "~/src/mock/sessionLog.mock";

import {
  postWithPath,
  putWithPath,
  formatResponse,
  getWithPath,
} from "../api.http";
import { ResponseData } from "~/src/constant";

export function useSessionLog() {
  const navigate = useNavigate();

  return {
    async getSessionLog(): Promise<ResponseData<any>> {
      // const data = await getWithPath(API.SESSION_LOG.GET.SESSION_LOG);
      const data = await mockSessionLog().getSessionLog();
      return formatResponse(data);
    },
  };
}
