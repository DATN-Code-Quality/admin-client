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
import { mockDashboard } from '~/mock/dashboard.mock';

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
