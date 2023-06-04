import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getWithPath, postWithPath, putWithPath } from '~/adapters/api.http';
import { setUserInfo } from '~/adapters/redux/actions/auth';
import { ResponseData } from '~/constant';
import API from '~/constant/api';
import { ApiStatus } from '~/constant/enum';
import ROUTE from '~/constant/routes';
import { Auth } from '~/domain/auth';
import LocalStorage from '~/libs/LocalStorage';
import { mockAuth } from '~/mock/auth.mock';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return {
    async login(body: {
      username: string;
      password: string;
    }): Promise<ResponseData<Auth>> {
      try {
        const resp = await postWithPath(`${API.AUTH.POST.LOGIN}`, {}, body);
        if (resp.status === ApiStatus.SUCCESS) {
          const { accessToken, user } = resp.data;
          LocalStorage.set({
            accessToken,
          });
          dispatch(setUserInfo(user));
        } else {
          throw new Error(JSON.stringify(resp));
        }
        return resp;
      } catch (e) {
        message.error('Đăng nhập thất bại!');
        throw e;
      }
    },

    async loginMicrosoft(): Promise<ResponseData<string>> {
      try {
        // const resp = await getWithPath(`${API.AUTH.GET.LOGIN_MICROSOFT}`);
        const resp = await mockAuth().loginMicrosoft();
        if (resp.status === ApiStatus.SUCCESS) {
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
    async checkProfile(): Promise<ResponseData<Auth>> {
      const resp = await getWithPath(`${API.AUTH.GET.CHECK_PROFILE}`);
      if (resp.status === ApiStatus.SUCCESS) {
        const auth = resp.data;
        dispatch(setUserInfo(auth));
      } else {
        throw new Error(JSON.stringify(resp));
      }
      return resp;
    },
    async changePassword(body: {
      username: string;
      password: string;
    }): Promise<ResponseData<Auth>> {
      try {
        const resp = await putWithPath(
          `${API.AUTH.PUT.CHANGE_PASSWORD}`,
          {},
          body
        );
        if (resp.status === ApiStatus.SUCCESS) {
          const { accessToken, user } = resp.data;
          LocalStorage.set({
            accessToken,
          });
          dispatch(setUserInfo(user));
        } else {
          throw new Error(JSON.stringify(resp));
        }
        return resp;
      } catch (e) {
        message.error('Đăng nhập thất bại!');
        throw e;
      }
    },
    async changePasswordV2(
      token: string,
      body: {
        newPassword: string;
      }
    ): Promise<ResponseData<Auth>> {
      try {
        const resp = await putWithPath(
          `${API.AUTH.PUT.CHANGE_PASSWORD_V2}`,
          { token },
          body
        );
        if (resp.status === ApiStatus.SUCCESS) {
          const { accessToken, user } = resp.data;
          LocalStorage.set({
            accessToken,
          });
          dispatch(setUserInfo(user));
        } else {
          throw new Error(JSON.stringify(resp));
        }
        return resp;
      } catch (e) {
        message.error('Error in changing password!');
        throw e;
      }
    },
    async forgotPassword(body: {
      username: string;
    }): Promise<ResponseData<Auth>> {
      try {
        const resp = await putWithPath(
          `${API.AUTH.PUT.FORGOT_PASSWORD}`,
          {},
          body
        );
        if (resp.status === ApiStatus.SUCCESS) {
        } else {
          throw new Error(JSON.stringify(resp));
        }
        return resp;
      } catch (e) {
        message.error('Error in reset password!');
        throw e;
      }
    },
    async logout(): Promise<ResponseData<any>> {
      // const resp = await getWithPath(`${API.AUTH.GET.LOGOUT}`);
      const resp = await mockAuth().logout();
      LocalStorage.remove(['accessToken']);
      if (resp.status === ApiStatus.SUCCESS) {
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
