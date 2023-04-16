import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSonarqube } from '~/adapters/appService/sonarqube.service';
import {
  setIssueSelected,
  setSubmissionIssues,
} from '~/adapters/redux/actions/sonarqube';
import SonarqubeSelector from '~/adapters/redux/selectors/sonarqube';
import DetailSubmission from './DetailSubmission';

import './index.less';

const Submission = () => {
  const { getIssuesSubmission, getIssuesWithSource } = useSonarqube();
  const issueSelected = useSelector(SonarqubeSelector.getIssueSelected);
  const dispatch = useDispatch();
  const data = useSelector(SonarqubeSelector.getSubmissionIssues);
  const assignmentSelected = useSelector(
    SonarqubeSelector.getAssignmentSelected
  );

  const [loading, setLoading] = useState(false);

  const handleFetchData = useCallback(async () => {
    if (!assignmentSelected) return;
    const response = await getIssuesSubmission(assignmentSelected);
    if (response.error !== 0) return;
    const { issues: dataRes } = response;
    const { issues } = dataRes || { components: [], issues: [] };
    const issuesOfComponents: Record<string, unknown> = {};
    issues?.reduce((objectResult, issue) => {
      if (objectResult[issue.component]) {
        const data = [...objectResult[issue.component]];
        data.push(issue);
        objectResult[issue.component] = data;
      } else {
        objectResult[issue.component] = [issue];
      }
      return objectResult;
    }, issuesOfComponents);
    dispatch(setSubmissionIssues(issuesOfComponents));
  }, [assignmentSelected]);

  const handleSetIssue = useCallback(
    (issue) => {
      dispatch(setIssueSelected(issue));
    },
    [dispatch]
  );

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  return (
    <>
      {issueSelected && <DetailSubmission />}

      {!issueSelected &&
        Object.values(data).map((componentIssues) => {
          return componentIssues.map((issue) => (
            <div
              className="issue-component"
              key={issue.key}
              onClick={() => {
                handleSetIssue(issue);
              }}
            >
              {issue.message}
            </div>
          ));
        })}
    </>
  );
};

export default Submission;
