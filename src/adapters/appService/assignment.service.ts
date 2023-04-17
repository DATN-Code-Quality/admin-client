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
import {
  AssignmentDTO,
  assignmentFromDTO,
  assignmentToDTO,
} from '~/dto/assignment';
import { removeSubmitProps } from '~/dto/baseDTO';

export function useAssignment() {
  const navigate = useNavigate();

  return {
    async getAllAssignments(): Promise<ResponseData<Assignment[]>> {
      // const data = await mockAssignment().getAllAssignments();
      const response = await getWithPath(API.ASSIGNMENT.GET.ASSIGNMENTS);
      const validResponse = formatResponse<AssignmentDTO[]>(response);
      const convertedData = validResponse.data.map(assignmentFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async getAssignmentByCourseId(
      id: string
    ): Promise<ResponseData<Assignment[]>> {
      const response = await getWithPath(
        API.ASSIGNMENT.GET.MOODLE_ASSIGNMENTS_BY_COURSE_ID,
        { courseMoodleId: id }
      );
      const validResponse = formatResponse<AssignmentDTO[]>(response);
      const convertedData = validResponse.data.map(assignmentFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async getDetailAssignment(id: string): Promise<ResponseData<Assignment>> {
      // const data = await getWithPath(`${API.PARTNER.GET.PARTNERS}/${id}`, {});
      const data = await mockAssignment().getAssignmentById(id);
      return formatResponse(data);
    },

    async createAssignment(body): Promise<ResponseData<Assignment[]>> {
      const submitData = body.map((course) => {
        return removeSubmitProps(assignmentToDTO(course));
      });
      const response = await postWithPath(
        `${API.ASSIGNMENT.POST.CREATE_ASSIGNMENT}`,
        {},
        submitData
      );
      const validResponse = formatResponse<Assignment[]>(response);
      return validResponse;
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
  };
}
