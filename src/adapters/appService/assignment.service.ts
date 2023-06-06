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
  return {
    async getAllAssignments(
      courseId: string,
      filter?: any
    ): Promise<ResponseData<{ role: SubRole; assignments: Assignment[] }>> {
      const response = await getWithPath(
        `${API.ASSIGNMENT.GET.ASSIGNMENTS}/${courseId}`,
        filter
      );
      const validResponse = formatResponse<{
        role: SubRole;
        assignments: AssignmentDTO[];
        total: number;
      }>(response);
      const convertedData =
        validResponse.data.assignments.map(assignmentFromDTO);
      const covertedResponse = {
        ...validResponse,
        total: validResponse.data.total,
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

    async getDetailAssignment({
      courseId,
      assignmentId,
    }): Promise<ResponseData<Assignment>> {
      const response = await getWithPath(
        `${API.ASSIGNMENT.GET.ASSIGNMENTS}/${courseId}/${assignmentId}`
      );
      return formatResponse(response);
    },

    async importAssignments(
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

    async createAssignment(
      courseId: string,
      body
    ): Promise<ResponseData<Assignment>> {
      const submitData = removeSubmitProps(assignmentToDTO(body));
      const response = await postWithPath(
        `${API.ASSIGNMENT.POST.CREATE_ASSIGNMENT}/${courseId}`,
        {},
        submitData
      );
      const validResponse = formatResponse<AssignmentDTO>(response);
      const convertedData = assignmentFromDTO(validResponse.data);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async updateAssignment(
      courseId: string,
      body
    ): Promise<ResponseData<Assignment>> {
      const submitData = removeSubmitProps(assignmentToDTO(body));
      const { id, ...rest } = submitData;
      const response = await putWithPath(
        `${API.ASSIGNMENT.PUT.UPDATE_ASSIGNMENT}/${courseId}/${body.id}`,
        {},
        rest
      );
      const validResponse = formatResponse<AssignmentDTO>(response);
      const convertedData = assignmentFromDTO(validResponse.data);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
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
