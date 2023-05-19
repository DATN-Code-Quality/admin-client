/* eslint-disable import/order */
import React, { useCallback, useEffect, useState } from 'react';

import { ArrowLeftOutlined, FileTextOutlined } from '@ant-design/icons';
import { Pagination, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import DetailSubmission from './DetailSubmission';
import EmptyIssue from './EmptyIssue';
import IssueItem from './IssueItem';
import SubmissionFilter from './SubmissionFilter';

import { useSonarqube } from '~/adapters/appService/sonarqube.service';
import {
  setSubmissionSelected,
  setIssueSelected,
  setSubmissionIssues,
} from '~/adapters/redux/actions/sonarqube';
import SonarqubeSelector from '~/adapters/redux/selectors/sonarqube';

import './index.less';

import { BugType, SeverityType } from '~/constant/enum';
import { Issue } from '~/domain/submission';
import DetailRule from './DetailRule';

const Submission = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { getIssuesSubmission } = useSonarqube();

  const issueSelected = useSelector(SonarqubeSelector.getIssueSelected);
  const data = useSelector(SonarqubeSelector.getSubmissionIssues);
  const dataSelected = useSelector(SonarqubeSelector.getSubmissionSelected);

  const [filters, setFilters] = useState<{
    type: BugType | '';
    file: string;
    severity: SeverityType | '';
  }>({
    type: '',
    file: '',
    severity: '',
  });

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
  });
  const [ruleSelected, setRuleSelected] = useState<string | null>(null);

  const handleFetchData = useCallback(async () => {
    if (!dataSelected) return;
    setLoading(true);
    const response = await getIssuesSubmission(
      dataSelected.courseId,
      dataSelected.assignmentId,
      dataSelected?.submissionId || '',
      {
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '')
        ),
        page: pagination.page,
        pageSize: 7,
      }
    );
    if (response?.status !== 0) return;
    const { data: dataRes } = response;
    const { issues } = dataRes || { components: [], issues: [] };
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
  }, [dataSelected, filters, pagination.page, dispatch]);

  const handleSetIssue = useCallback(
    (issue: Issue) => {
      dispatch(setIssueSelected(issue));
    },
    [dispatch]
  );

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get('courseId');
    const assignmentId = queryParams.get('assignmentId');
    const submissionId = queryParams.get('submissionId');

    if (!courseId || !assignmentId || !submissionId) {
      navigate('/course/list');
      return;
    }
    dispatch(setSubmissionSelected({ courseId, assignmentId, submissionId }));
  }, [dispatch, location.search, navigate]);

  return (
    <>
      {!loading && issueSelected && <DetailSubmission />}

      {!issueSelected && (
        <div
          onClick={() =>
            navigate(`/course/detail?id=${dataSelected?.courseId}`)
          }
        >
          <p className="font-semibold cursor-pointer">
            <ArrowLeftOutlined size={32} className=" mr-2" />
            <span>Back</span>
          </p>
          <div className="flex gap-4 h-full ">
            <SubmissionFilter filters={filters} setFilters={setFilters} />

            <div className="submission-issues-container ">
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
              {!loading && (
                <>
                  <div className="flex-1">
                    {Object.keys(data).map((key) => {
                      const value = key.split(':');
                      const fileNameShort = value[value.length - 1];

                      return (
                        <div key={key}>
                          <p className="mt-4 mb-2 flex items-center">
                            <FileTextOutlined />
                            <span className="ml-2">{fileNameShort}</span>
                          </p>
                          {data[key].map((issue) => (
                            <IssueItem
                              key={issue}
                              issue={issue}
                              handleSetIssue={handleSetIssue}
                              setRuleSelected={setRuleSelected}
                            />
                          ))}
                        </div>
                      );
                    })}
                    {Object.keys(data).length === 0 && <EmptyIssue />}
                  </div>
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
                </>
              )}
            </div>
            <DetailRule
              ruleKey={ruleSelected}
              setRuleSelected={setRuleSelected}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Submission;
