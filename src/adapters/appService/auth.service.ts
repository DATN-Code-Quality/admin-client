import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getWithPath, postWithPath } from '~/adapters/api.http';
import { setUserInfo } from '~/adapters/redux/actions/auth';
import { ResponseData } from '~/constant';
import API from '~/constant/api';
import ROUTE from '~/constant/routes';
import { Auth } from '~/domain/auth';
import { mockAuth } from '~/mock/auth.mock';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return {
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
        message.error('Đăng nhập thất bại!');
        throw e;
      }
    },
    async checkSession(): Promise<ResponseData<Auth>> {
      // const resp = await getWithPath(`${API.AUTH.GET.CHECK_SESSION}`);
      const resp = await mockAuth().checkSession();
      if (resp.success) {
        const auth = resp.data;
        if (auth.roles) {
          auth.roles = JSON.parse(auth.roles);
        }
        dispatch(setUserInfo(auth));
      } else {
        throw new Error(JSON.stringify(resp));
      }
      return resp;
    },
    async logout(): Promise<ResponseData<any>> {
      // const resp = await getWithPath(`${API.AUTH.GET.LOGOUT}`);
      const resp = await mockAuth().logout();
      if (resp.success) {
        dispatch(
          setUserInfo({
            name: '',
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
