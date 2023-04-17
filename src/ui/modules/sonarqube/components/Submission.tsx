import React, { useCallback, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import DetailSubmission from './DetailSubmission';

import { useSonarqube } from '~/adapters/appService/sonarqube.service';
import {
  setSubmissionSelected,
  setIssueSelected,
  setSubmissionIssues,
} from '~/adapters/redux/actions/sonarqube';
import SonarqubeSelector from '~/adapters/redux/selectors/sonarqube';

import { Pagination, Spin } from 'antd';

import './index.less';

const Submission = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { getIssuesSubmission } = useSonarqube();

  const issueSelected = useSelector(SonarqubeSelector.getIssueSelected);
  const data = useSelector(SonarqubeSelector.getSubmissionIssues);
  const assignmentSelected = useSelector(
    SonarqubeSelector.getAssignmentSelected
  );

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
  });
  console.log(pagination);
  const handleFetchData = useCallback(async () => {
    if (!assignmentSelected) return;
    setLoading(true);
    const response = await getIssuesSubmission(assignmentSelected, {
      page: pagination.page,
      pageSize: 6,
    });
    if (response.error !== 0) return;
    const { issues: dataRes } = response;
    const { issues } = dataRes || { components: [], issues: [] };
    console.log(issues);
    setPagination({
      page: dataRes.p,
      total: dataRes.total,
    });
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
    setLoading(false);
  }, [assignmentSelected, dispatch, pagination.page]);

  const handleSetIssue = useCallback(
    (issue) => {
      dispatch(setIssueSelected(issue));
    },
    [dispatch]
  );

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const submissionId = queryParams.get('id');
    if (!submissionId) {
      navigate('/course/list');
      return;
    }
    dispatch(setSubmissionSelected(submissionId));
  }, [dispatch, location.search, navigate]);

  console.log(data);
  return (
    <>
      {loading && (
        <div
          style={{
            height: '500px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spin />
        </div>
      )}
      {!loading && issueSelected && <DetailSubmission />}

      {!loading && !issueSelected && (
        <div>
          {Object.values(data).map((componentIssues) => {
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
          <Pagination
            style={{
              marginTop: '16px',
              display: 'flex',
              justifyContent: 'center',
            }}
            defaultCurrent={pagination.page}
            total={pagination.total}
            pageSize={6}
            onChange={(val) =>
              setPagination((prev) => ({ ...prev, page: val }))
            }
          />
        </div>
      )}
    </>
  );
};

export default Submission;
