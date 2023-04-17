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
import { Assignment } from '~/domain/assignment';
import { User } from '~/domain/user';
import { mockAssignment } from '~/mock/assignment.mock';

export function useAssignment() {
  const navigate = useNavigate();

  return {
    async getAllAssignments(): Promise<ResponseData<Assignment[]>> {
      // const data = await getWithPath(API.PARTNER.GET.PARTNERS);
      const data = await mockAssignment().getAllAssignments();
      return formatResponse(data);
    },

    async getDetailAssignment(id: string): Promise<ResponseData<Assignment>> {
      // const data = await getWithPath(`${API.PARTNER.GET.PARTNERS}/${id}`, {});
      const data = await mockAssignment().getAssignmentById(id);
      return formatResponse(data);
    },

    async createAssignment(body): Promise<ResponseData<Assignment>> {
      const data = await postWithPath(
        `${API.PARTNER.POST.CREATE_PARTNER}`,
        {},
        body
      );
      if (data.success) {
        message.success(`Tạo mới course thành công!`);
        navigate(ROUTE.PARTNER.LIST);
      } else {
        message.error('Tạo mới course thất bại!');
      }
      return formatResponse(data);
    },

    async updateAssignment(body): Promise<ResponseData<Assignment>> {
      const data = await putWithPath(
        `${API.PARTNER.PUT.UPDATE_PARTNER}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
        navigate(ROUTE.PARTNER.LIST);
      }
      return formatResponse(data);
    },

    async blockAssignment(body): Promise<ResponseData<Assignment>> {
      const data = await putWithPath(
        `${API.PARTNER.PUT.UPDATE_PARTNER}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
        navigate(ROUTE.PARTNER.LIST);
      }
      return formatResponse(data);
    },

    async unblockAssignment(body): Promise<ResponseData<Assignment>> {
      const data = await putWithPath(
        `${API.PARTNER.PUT.UPDATE_PARTNER}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
        navigate(ROUTE.PARTNER.LIST);
      }
      return formatResponse(data);
    },

    async getSubmissionByAssignmentId(assignmentId: string) {
      const response = await fetch(
        `http://localhost:5000/api/submission/get-submissions?assignmentId=${assignmentId}`
      ).then((res) => res.json());
      return response;
    },
  };
}
