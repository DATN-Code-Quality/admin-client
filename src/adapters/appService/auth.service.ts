import { message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ResponseData } from "src/constant";
import API from "src/constant/api";
import ROUTE from "src/constant/routes";
import { mockAuth } from "src/mock/auth.mock";

import { getWithPath } from "../api.http";
import { setUserInfo } from "../redux/actions/auth";

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return {
    async checkLogin(): Promise<ResponseData<any>> {
      // const resp = await getWithPath(API.AUTH.GET.CHECK_SESSION);
      const resp = await mockAuth().checkLogin();
      if (resp.success) {
        const auth = resp.data;
        if (auth.roles) {
          auth.roles = [auth.roles];
        }
        dispatch(setUserInfo(auth));
        navigate(ROUTE.JOB_POST.LIST);
      } else {
        navigate(ROUTE.LOGIN);
      }
      return resp;
    },
    async loginMicrosoft(): Promise<ResponseData<string>> {
      try {
        // const resp = await getWithPath(`${API.AUTH.GET.LOGIN_MICROSOFT}`);
        const resp = await mockAuth().loginMicrosoft();
        if (resp.success) {
          const { data: callbackUrl } = resp;
          window.location.href = callbackUrl;
        } else {
          throw new Error(JSON.stringify(resp));
        }
        return resp;
      } catch (e) {
        message.error("Đăng nhập thất bại!");
      }
    },
    async logout(): Promise<ResponseData<any>> {
      // const resp = await getWithPath(`${API.AUTH.GET.LOGOUT}`);
      const resp = await mockAuth().logout();
      if (resp.success) {
        dispatch(
          setUserInfo({
            user_id: 0,
            name: "",
            avatar: "",
            roles: [],
          })
        );
        navigate(ROUTE.LOGIN);
      } else {
        throw new Error(JSON.stringify(resp));
      }
      return resp;
    },
  };
}
