import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { formatResponse, getWithPath, postWithPath } from '../api.http';

import { DOMAIN_API_URL, ResponseData } from '~/constant';
import API from '~/constant/api';
import { SubRole } from '~/constant/enum';
import { Assignment } from '~/domain/assignment';
import { ReportAssignment, Submission } from '~/domain/submission';
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
      response.total = response.data.total;
      return response;
    },

    async getReportAssignment(
      courseId: string,
      assignmentId: string
    ): Promise<ResponseData<{ role: SubRole; report: ReportAssignment }>> {
      const response = await getWithPath(
        `${API.ASSIGNMENT.GET.ASSIGNMENTS}/${courseId}/${assignmentId}/report`
      );

      return response;
    },

    async getDataExportAssignment(
      courseId: string,
      assignmentId: string
    ): Promise<ResponseData<{ role: SubRole; report: ReportAssignment }>> {
      // const response = await getWithPath(
      //   `${API.ASSIGNMENT.GET.ASSIGNMENTS}/${courseId}/${assignmentId}/export`
      // );
      const response = {
        status: 0,
        data: {
          results: [
            {
              submission: {
                submissionId: '4fd79600-36ca-4826-9c85-19d6efb09f08',
                userId: 'a639456b-fe9b-4a9b-9273-fe8c6a0898ae',
                userName: 'Vinh Phan Nguyễn Anh',
                userMoodleId: '19120721',
                status: 4,
              },
              result: {
                id: '910fd0bd-470f-4394-81f7-2a3fcf798c20',
                createdAt: '2023-07-02T16:32:43.931Z',
                updatedAt: '2023-07-02T16:32:43.931Z',
                deletedAt: null,
                submissionId: '4fd79600-36ca-4826-9c85-19d6efb09f08',
                total: 173,
                codeSmell: 173,
                bug: 0,
                vulnerabilities: 0,
                blocker: 11,
                critical: 34,
                major: 108,
                minor: 20,
                info: 0,
                duplicatedLinesDensity: 27.5,
                coverage: 0,
                reliabilityRating: 0,
                securityRating: 0,
                sqaleRating: 0,
                ncloc: 0,
              },
            },
            {
              submission: {
                submissionId: '82c58c46-7d27-4741-865d-d87a528c091b',
                userId: 'd65be89c-6fb4-4f26-971e-5d081270475c',
                userName: 'Vỹ Trần Ngọc',
                userMoodleId: '19120731',
                status: 4,
              },
              result: {
                id: '57d29e97-a62d-4b90-bd0b-8544ec1ba877',
                createdAt: '2023-07-02T16:29:50.121Z',
                updatedAt: '2023-07-02T16:29:50.121Z',
                deletedAt: null,
                submissionId: '82c58c46-7d27-4741-865d-d87a528c091b',
                total: 118,
                codeSmell: 107,
                bug: 10,
                vulnerabilities: 1,
                blocker: 3,
                critical: 18,
                major: 58,
                minor: 39,
                info: 0,
                duplicatedLinesDensity: 1.1,
                coverage: 0,
                reliabilityRating: 0,
                securityRating: 0,
                sqaleRating: 0,
                ncloc: 0,
              },
            },
          ],
          role: 'teacher',
        },
      };

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
      console.log('domain api: ' + DOMAIN_API_URL);
      const respond = await axios({
        url: `${DOMAIN_API_URL}/submission/${assignment.courseId}/${assignment.id}`,
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
