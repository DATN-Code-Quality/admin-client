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
import { SubRole } from '~/constant/enum';
import ROUTE from '~/constant/routes';
import { Assignment } from '~/domain/assignment';
import { User } from '~/domain/user';
import {
  AssignmentDTO,
  assignmentFromDTO,
  assignmentToDTO,
} from '~/dto/assignment';
import { removeSubmitProps } from '~/dto/baseDTO';
import { mockAssignment } from '~/mock/assignment.mock';

export function useAssignment() {
  const navigate = useNavigate();

  return {
    async getAllAssignments(
      courseId: string
    ): Promise<ResponseData<{ role: SubRole; assignments: Assignment[] }>> {
      const response = await getWithPath(
        `${API.ASSIGNMENT.GET.ASSIGNMENTS}/${courseId}`
      );
      const validResponse = formatResponse<{
        role: SubRole;
        assignments: AssignmentDTO[];
      }>(response);
      const convertedData =
        validResponse.data.assignments.map(assignmentFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: { ...validResponse.data, assignments: convertedData },
      };
      return covertedResponse;
    },

    async getMoodleAssignments(
      courseId: string,
      params: { courseMoodleId: string }
    ): Promise<ResponseData<{ role: SubRole; assignments: Assignment[] }>> {
      const response = await getWithPath(
        `${API.ASSIGNMENT.GET.ASSIGNMENTS}/${courseId}/sync-assignments-by-course-id`,
        params
      );
      const validResponse = formatResponse<{
        role: SubRole;
        assignments: AssignmentDTO[];
      }>(response);
      const convertedData =
        validResponse.data.assignments.map(assignmentFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: { ...validResponse.data, assignments: convertedData },
      };
      return covertedResponse;
    },

    async getDetailAssignment(id: string): Promise<ResponseData<Assignment>> {
      const data = await mockAssignment().getAssignmentById(id);
      return formatResponse(data);
    },

    async createAssignment(
      courseId: string,
      body
    ): Promise<ResponseData<Assignment[]>> {
      const submitData = body.map((assignment) => {
        return removeSubmitProps(assignmentToDTO(assignment));
      });
      const response = await postWithPath(
        `${API.ASSIGNMENT.POST.CREATE_ASSIGNMENT}/${courseId}/assignments`,
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
      return formatResponse(data);
    },

    async blockAssignment(body): Promise<ResponseData<Assignment>> {
      const data = await putWithPath(
        `${API.PARTNER.PUT.UPDATE_PARTNER}/${body?.id}`,
        {},
        body
      );
      return formatResponse(data);
    },

    async unblockAssignment(body): Promise<ResponseData<Assignment>> {
      const data = await putWithPath(
        `${API.PARTNER.PUT.UPDATE_PARTNER}/${body?.id}`,
        {},
        body
      );
      return formatResponse(data);
    },
  };
}
