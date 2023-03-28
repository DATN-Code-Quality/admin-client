import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

import {
  postWithPath,
  putWithPath,
  formatResponse,
  getWithPath,
} from '../api.http';

import { ResponseData } from '~/constant';
import API from '~/constant/api';
import ROUTE from '~/constant/routes';
import { User } from '~/domain/user';
import { mockSessionLog } from '~/mock/sessionLog.mock';

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
