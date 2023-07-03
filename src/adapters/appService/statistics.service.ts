import { useNavigate } from 'react-router-dom';

import { formatResponse, getWithPath } from '../api.http';

import { ResponseData } from '~/constant';
import API from '~/constant/api';
import { User } from '~/domain/user';
import { mockReport } from '~/mock/report.mock';
import { Assignment } from '~/domain/assignment';

export type Result = Partial<{
  total: string;
  code_smells: string;
  bugs: string;
  vulnerabilities: string;
  blocker_violations: string;
  critical_violations: string;
  major_violations: string;
  info_violations: string;
  minor_violations: string;
  duplicated_lines_density: number;
  coverage: number;
}>;

export function useStatistics() {
  const navigate = useNavigate();

  const handleFilterResult = (result: Result) => {
    const exludeMetrics = ['total', 'coverage', 'duplicated_lines_density'];
    const updatedResult = Object.keys(result).reduce((acc, key) => {
      if (!exludeMetrics.includes(key)) {
        acc[key] = result[key];
      }
      return acc;
    }, {});
    return updatedResult;
  };

  return {
    async getCourseMetricStatistics(
      courseId
    ): Promise<ResponseData<{ result: Result }>> {
      const response = await getWithPath(
        `${API.COURSE.GET.COURSE}/${courseId}/result`
      );
      // const response = await mockReport().geCourseStatistics();
      response.data.result = handleFilterResult(response.data.result);
      return formatResponse(response);
    },

    async getCourseUserStatistics(
      courseId,
      filter?
    ): Promise<
      ResponseData<{
        results: {
          user: User;
          result: Result;
        }[];
      }>
    > {
      const response = await getWithPath(
        `${API.COURSE.GET.COURSE}/${courseId}/user-result`
      );
      // const response = await mockReport().getCourseUserStatistics();
      return formatResponse(response);
    },

    async getCourseAssignmentStatistics(
      courseId,
      userId
    ): Promise<
      ResponseData<{
        results: {
          assignment: Assignment;
          result: Result;
        }[];
      }>
    > {
      const response = await getWithPath(
        `${API.COURSE.GET.COURSE}/${courseId}/${userId}/assignment-result`
      );
      // const response = await mockReport().getCourseUserStatistics();
      return formatResponse(response);
    },
  };
}
