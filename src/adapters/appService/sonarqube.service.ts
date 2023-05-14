import { getWithPath } from '../api.http';

import {
  IssueWithSourceResponse,
  OverviewSubmissionResponse,
  SubmissionResponse,
} from '~/domain/sonarqube';

export function useSonarqube() {
  return {
    async getIssuesSubmission(
      courseId: string,
      assignmentId: string,
      submissionId: string,
      params?: Record<string, unknown>
    ): Promise<SubmissionResponse> {
      const response = await getWithPath(
        `/sonarqube/issue/${courseId}/${assignmentId}/${submissionId}`,
        params
      ).then((res) => res);

      return response;
    },

    async getIssuesWithSource(
      componentKey: string
    ): Promise<IssueWithSourceResponse> {
      const response = await getWithPath(
        `/sonarqube/source/${encodeURIComponent(componentKey)}`
      ).then((res) => res);
      return response;
    },

    async getOverViewSubmission(
      courseId: string,
      assignmentId: string,
      submissionId: string
    ): Promise<OverviewSubmissionResponse> {
      const response = await getWithPath(
        `/sonarqube/result/${courseId}/${assignmentId}/${submissionId}`
      ).then((res) => res);

      return response;
    },

    async getRuleDetail(ruleKey: string) {
      const response = await getWithPath(`/sonarqube/rule/${ruleKey}`).then(
        (res) => res
      );
      return response;
    },
  };
}
