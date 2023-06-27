/* eslint-disable import/order */
import React, { useCallback, useEffect, useState } from 'react';

import {
  ArrowLeftOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Pagination, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import DetailSubmission from './DetailSubmission';
import EmptyIssue from './EmptyIssue';
import IssueItem from './IssueItem';
import { SubmissionFilter, SubmissionFilterMobile } from './SubmissionFilter';

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
  const [width, setWidth] = useState(window.innerWidth);

  const [components, setComponents] = useState();
  const { getIssuesSubmission } = useSonarqube();

  const issueSelected = useSelector(SonarqubeSelector.getIssueSelected);
  const data = useSelector(SonarqubeSelector.getSubmissionIssues);
  const dataSelected = useSelector(SonarqubeSelector.getSubmissionSelected);

  const [filters, setFilters] = useState<{
    type: BugType | '';
    file: string;
    severity: SeverityType | '';
    fileuuid: string;
  }>({
    type: '',
    file: '',
    severity: '',
    fileuuid: '',
  });

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
  });

  const [open, setOpen] = useState(false);

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
    const { issues, components } = dataRes || { components: [], issues: [] };
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
    setComponents(components);
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
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

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
      {!loading && issueSelected && (
        <DetailSubmission
          courseId={dataSelected?.courseId}
          assignmentId={dataSelected?.assignmentId}
          submissionId={dataSelected?.submissionId || ''}
        />
      )}

      {!issueSelected && (
        <div className="h-full overflow-hidden ">
          <div className="flex items-center w-full justify-between p-4">
            <p
              className="font-semibold cursor-pointer"
              onClick={() => {
                navigate(
                  `/my-course/assign?id=${dataSelected.assignmentId}&course_id=${dataSelected.courseId}`
                );
              }}
            >
              <ArrowLeftOutlined size={32} className=" mr-2" />
              <span>Back</span>
            </p>
            {width < 1024 && (
              <div className="flex items-center" onClick={() => setOpen(true)}>
                <SettingOutlined />
                <p className="ml-2 font-semibold">Setting</p>
              </div>
            )}
          </div>
          <div className="flex gap-4 h-full ">
            {width >= 1024 ? (
              <SubmissionFilter
                filters={filters}
                setFilters={setFilters}
                components={components}
              />
            ) : (
              <SubmissionFilterMobile
                filters={filters}
                setFilters={setFilters}
                open={open}
                setOpen={setOpen}
                components={components}
              />
            )}

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
                        <div key={key} className="h-full flex flex-col">
                          <p className="mt-4 mb-2 flex items-center">
                            <FileTextOutlined />
                            <span className="ml-2">{fileNameShort}</span>
                          </p>
                          <div className="flex-1 flex flex-col ">
                            {data[key].map((issue) => (
                              <IssueItem
                                key={issue}
                                issue={issue}
                                handleSetIssue={handleSetIssue}
                                setRuleSelected={setRuleSelected}
                              />
                            ))}
                          </div>
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
                      paddingBottom: '32px',
                      marginBottom: '40px',
                    }}
                    defaultCurrent={pagination.page}
                    total={pagination.total}
                    pageSize={7}
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
