import { useNavigate } from 'react-router-dom';

import { formatResponse, getWithPath } from '../api.http';

import { ResponseData } from '~/constant';
import API from '~/constant/api';
import { SubRole } from '~/constant/enum';
import { Assignment } from '~/domain/assignment';
import { Submission } from '~/domain/submission';
import { SubmissionDTO, submissionFromDTO } from '~/dto/submission';
import { mockAssignment } from '~/mock/assignment.mock';

export function useSubmission() {
  const navigate = useNavigate();

  return {
    async getSubmissionByAssignmentId(
      courseId: string,
      assignmentId: string
    ): Promise<ResponseData<{ role: SubRole; submissions: Submission[] }>> {
      const response = await getWithPath(
        `${API.SUBMISSION.GET.SUBMISSIONS_BY_ASSIGNMENT_ID}/${courseId}/${assignmentId}`
      );

      return response;
    },

    async getMoodleSubmissionByAssignmentId(
      id: string
    ): Promise<ResponseData<Submission[]>> {
      const response = await getWithPath(
        API.SUBMISSION.GET.MOODLE_SUBMISSIONS_BY_ASSIGNMENT_ID,
        { assignmentMoodleId: id }
      );
      const validResponse = formatResponse<SubmissionDTO[]>(response);
      const convertedData = validResponse.data.map(submissionFromDTO);
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
  };
}
