import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { formatResponse, getWithPath, postWithPath } from '../api.http';

import { ResponseData } from '~/constant';
import API from '~/constant/api';
import { SubRole } from '~/constant/enum';
import { Assignment } from '~/domain/assignment';
import { Submission } from '~/domain/submission';
import { SubmissionDTO, submissionFromDTO } from '~/dto/submission';
import LocalStorage from '~/libs/LocalStorage/LocalStorage';
import { mockAssignment } from '~/mock/assignment.mock';
import moment from 'moment';
import { RcFile } from 'antd/lib/upload';

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
    async addSubmission(
      data: {
        timemodified?: string;
        origin?: string;
        submitType: string;
        link?: string;
        file?: File | Blob | RcFile;
      },
      assignment: Assignment
    ) {
      const submitForm = new FormData();
      submitForm.append('assignmentId', assignment.id);
      submitForm.append('timemodified', moment().toISOString());
      submitForm.append('origin', 'origin');
      submitForm.append('submitType', data.submitType);

      if (data.submitType.indexOf('sys') >= 0) {
        submitForm.append('file', data.file ?? '');
      } else {
        submitForm.append('link', data.link ?? '');
      }
      const accessToken = (await LocalStorage.get(['accessToken'])).accessToken
        .token;
      const respond = await axios({
        url: `http://localhost:5000/api/submission/${assignment.courseId}/${assignment.id}`,
        data: submitForm,
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return respond;
    },
  };
}
