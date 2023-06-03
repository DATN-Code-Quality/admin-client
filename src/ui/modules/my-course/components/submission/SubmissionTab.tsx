import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Empty, Table } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import AddSubmission from './AddSubmission';
import Overview from './Overview';

import { useSonarqube } from '~/adapters/appService/sonarqube.service';
import { useSubmission } from '~/adapters/appService/submission.service';
import { SubRole, SubmissionType } from '~/constant/enum';
import { Assignment } from '~/domain/assignment';
import { Submission } from '~/domain/submission';
import { formatDate, renderColorRatting } from '~/utils';

const SubmissionTab: React.FC<{ assignment: Assignment }> = ({
  assignment,
}) => {
  const [submissionList, setSubmissionList] = useState<Submission[]>([]);
  const [submission, setSubmission] = useState<Submission>();
  const [subRole, setRole] = useState<SubRole | null>(null);
  const { getSubmissionByAssignmentId } = useSubmission();
  const { getOverViewSubmission } = useSonarqube();

  const fetchSubmission = useCallback(async () => {
    const response = await getSubmissionByAssignmentId(
      assignment.courseId,
      assignment.id
    );
    if (response.status !== 0) return;
    const { role } = response.data;
    let { submissions } = response.data;
    if (role === SubRole.TEACHER) {
      const submissionsRes = [];
      submissions.forEach(async (submissionItem) => {
        // const overviewRes = await getOverViewSubmission(
        //   assignment?.courseId,
        //   assignment?.id,
        //   submissionItem?.id
        // );
        const overviewRes = {
          status: 0,
          data: {
            paging: {
              pageIndex: 1,
              pageSize: 100,
              total: 1,
            },
            measures: [
              {
                metric: 'bugs',
                history: [
                  {
                    date: '2023-05-23T19:42:15+0700',
                    value: '1',
                  },
                ],
              },
              {
                metric: 'code_smells',
                history: [
                  {
                    date: '2023-05-23T19:42:15+0700',
                    value: '11',
                  },
                ],
              },
              {
                metric: 'coverage',
                history: [
                  {
                    date: '2023-05-23T19:42:15+0700',
                    value: '0.0',
                  },
                ],
              },
              {
                metric: 'duplicated_lines_density',
                history: [
                  {
                    date: '2023-05-23T19:42:15+0700',
                    value: '0.0',
                  },
                ],
              },
              {
                metric: 'ncloc',
                history: [
                  {
                    date: '2023-05-23T19:42:15+0700',
                    value: '156',
                  },
                ],
              },
              {
                metric: 'reliability_rating',
                history: [
                  {
                    date: '2023-05-23T19:42:15+0700',
                    value: '3.0',
                  },
                ],
              },
              {
                metric: 'security_rating',
                history: [
                  {
                    date: '2023-05-23T19:42:15+0700',
                    value: '1.0',
                  },
                ],
              },
              {
                metric: 'sqale_index',
                history: [
                  {
                    date: '2023-05-23T19:42:15+0700',
                    value: '43',
                  },
                ],
              },
              {
                metric: 'sqale_rating',
                history: [
                  {
                    date: '2023-05-23T19:42:15+0700',
                    value: '1.0',
                  },
                ],
              },
              {
                metric: 'vulnerabilities',
                history: [
                  {
                    date: '2023-05-23T19:42:15+0700',
                    value: '0',
                  },
                ],
              },
            ],
          },
        };
        // if (overviewRes.status == 0) ;
        overviewRes.data?.measures.forEach((item) => {
          const { history } = item;
          const { value } = history[history.length - 1];
          submissionItem[item.metric] = value;
        });

        submissionsRes.push(submissionItem);
      });

      submissions = submissionsRes;
    }

    setRole(role as SubRole);
    setSubmissionList(submissions);
    setSubmission(submissions[0]);
  }, [assignment.courseId, assignment.id]);

  useEffect(() => {
    fetchSubmission();
  }, [fetchSubmission]);

  return (
    <div
      className="bg-white p-4 rounded-2 gap-4"
      style={{ minHeight: '600px' }}
    >
      {subRole === SubRole.STUDENT && submissionList?.length > 0 && (
        <>
          <div className="grid bg-white p-4 rounded-2 gap-4">
            <div style={{ width: '100%', overflow: 'hidden' }}>
              <p className="assignment-name">{assignment?.name}</p>
              <p>{assignment?.description}</p>
              <div className="submission-container">
                <p className="title">Submissions</p>
                <div className="submission-list">
                  {submissionList?.map((submissionItem) => (
                    <SubmissionItem
                      active={submission?.id === submissionItem.id}
                      key={submissionItem.id}
                      submission={submissionItem}
                      setSubmission={setSubmission}
                    />
                  ))}
                </div>
                <Overview submission={submission} assignment={assignment} />{' '}
              </div>
            </div>
          </div>
        </>
      )}

      {subRole === SubRole.TEACHER && submissionList?.length > 0 && (
        <>
          <TableSubmission data={submissionList} assignment={assignment} />
        </>
      )}

      {submissionList?.length === 0 && (
        <div className=" bg-white p-4 rounded-2 gap-4">
          <div className="submission-container ">
            {(subRole === SubRole.ADMIN || subRole === SubRole.TEACHER) && (
              <div className="flex " style={{ flexDirection: 'column' }}>
                <p className="title">Submissions</p>
                <div style={{ flex: 1 }} className="flex justify-center">
                  <Empty description="Không tồn tại bài nôp" />
                </div>
              </div>
            )}

            {subRole === SubRole.STUDENT && (
              <div>
                <AddSubmission
                  assignment={assignment}
                  onSubmitted={() => fetchSubmission()}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const SubmissionItem: React.FC<{
  submission: Submission;
  setSubmission: (submission: Submission) => void;
  active: boolean;
}> = ({ submission, setSubmission, active }) => {
  const renderStatus = useCallback((status: SubmissionType) => {
    switch (status) {
      case SubmissionType.SUBMITTED:
        return (
          <div
            className="px-4 py-2 rounded-2"
            style={{
              background: '#7e7676',
              color: 'white',
              fontWeight: 600,
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            Submitted
          </div>
        );
      case SubmissionType.SCANNING:
        return (
          <div
            className="px-4 py-3 rounded-2"
            style={{
              background: 'blue',
              color: 'white',
              fontWeight: 600,
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            Scanning
          </div>
        );
      case SubmissionType.PASS:
        return (
          <div
            className="px-4 py-2 rounded-2"
            style={{
              background: 'green',
              color: 'white',
              fontWeight: 600,
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            Pass
          </div>
        );
      case SubmissionType.FAIL:
        return (
          <div
            className="px-4 py-2 rounded-2"
            style={{
              background: 'red',
              color: 'white',
              fontWeight: 600,
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            Fail
          </div>
        );
      case SubmissionType.SCANNED_FAIL:
        return (
          <div
            className="px-4 py-2 rounded-2"
            style={{
              background: 'green',
              color: 'white',
              fontWeight: 600,
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            Scanned Fail
          </div>
        );
      default:
        return <></>;
    }
  }, []);
  return (
    <div
      className="rounded-2 p-4 mt-4 cursor-pointer"
      style={{ border: active ? '2px solid blue' : '1px solid #ccc' }}
      onClick={() => setSubmission(submission)}
    >
      <div className="flex items-center justify-between">
        {/* <p className="flex-1">{submission.link}</p> */}
        <div>
          <div>
            <span className="font-semibold">Name: </span>
            {submission?.user?.name}
          </div>
          <div>
            <span className="font-semibold">Time submit: </span>
            {formatDate(
              new Date(submission.createdAt ?? ''),
              'vi-VN',
              'YYYY-MM-DD hh:mm:ss'
            )}
            {/* {submission?.updatedAt} */}
          </div>
          <div>
            <span className="font-semibold">Submitted file: </span>
            <a href={submission.link} target="_blank" rel="noopener noreferrer">
              link
            </a>
          </div>
        </div>
        <div
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            display: 'flex',
            borderLeftStyle: 'solid',
            borderLeftWidth: 1,
            borderLeftColor: 'black',
            padding: 4,
          }}
        >
          <h3 style={{ fontWeight: 700 }}>STATUS</h3>
          <span>{renderStatus(submission?.status as SubmissionType)}</span>
        </div>
      </div>
    </div>
  );
};

const TableSubmission: React.FC<{
  assignment: Assignment;
  data: Record<string, unknown>;
}> = ({ assignment, data }) => {
  const navigate = useNavigate();

  const handleShowResult = useCallback(
    (submissionId) => {
      navigate(
        `/sonarqube/submission?courseId=${assignment?.courseId}&assignmentId=${assignment?.id}&submissionId=${submissionId}`
      );
    },
    [assignment?.courseId, assignment?.id, navigate]
  );

  const renderStatus = useCallback((status: SubmissionType) => {
    switch (status) {
      case SubmissionType.SUBMITTED:
        return (
          <div
            className="px-4 py-2 rounded-2"
            style={{
              background: '#7e7676',
              color: 'white',
              fontWeight: 600,
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            Submitted
          </div>
        );
      case SubmissionType.SCANNING:
        return (
          <div
            className="px-4 py-3 rounded-2"
            style={{
              background: 'blue',
              color: 'white',
              fontWeight: 600,
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            Scanning
          </div>
        );
      case SubmissionType.PASS:
        return (
          <div
            className="px-4 py-2 rounded-2"
            style={{
              background: 'green',
              color: 'white',
              fontWeight: 600,
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            Pass
          </div>
        );
      case SubmissionType.FAIL:
        return (
          <div
            className="px-4 py-2 rounded-2"
            style={{
              background: 'red',
              color: 'white',
              fontWeight: 600,
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            Fail
          </div>
        );
      case SubmissionType.SCANNED_FAIL:
        return (
          <div
            className="px-4 py-2 rounded-2"
            style={{
              background: 'green',
              color: 'white',
              fontWeight: 600,
              minWidth: '80px',
              textAlign: 'center',
            }}
          >
            Scanned Fail
          </div>
        );
      default:
        return <></>;
    }
  }, []);
  const columns = useMemo(
    () => [
      {
        title: 'User ID',
        dataIndex: 'userId',
        key: 'userId',
        render: (_, record) => {
          return <p>{record.user.name}</p>;
        },
        fixed: 'left',
        width: 200,
      },
      {
        title: 'Result',
        dataIndex: 'status',
        key: 'status',
        render: (value: string) => {
          return <span>{renderStatus(value as SubmissionType)}</span>;
        },
        // fixed: 'left',
      },
      {
        title: 'Submit Type',
        dataIndex: 'submitType',
        key: 'submitType',
        render: (val: string) => {
          const capitalizeFirstChar = ([first, ...rest]) =>
            first.toUpperCase() + rest.join('');
          return capitalizeFirstChar(val);
        },
      },

      {
        title: 'Bugs',
        dataIndex: 'bugs',
        key: 'bugs',
        align: 'center',
      },
      {
        title: 'Code Smells',
        dataIndex: 'code_smells',
        key: 'code_smells',
        align: 'center',
      },
      {
        title: 'Coverage',
        dataIndex: 'coverage',
        key: 'coverage',
        align: 'center',
      },
      {
        title: 'Duplicated Lines Density',
        dataIndex: 'duplicated_lines_density',
        key: 'duplicated_lines_density',
        align: 'center',
      },
      {
        title: 'NCLOC',
        dataIndex: 'ncloc',
        key: 'ncloc',
        align: 'center',
      },
      {
        title: 'Reliability Rating',
        dataIndex: 'reliability_rating',
        key: 'reliability_rating',
        align: 'center',
        render: (value: string) => {
          return renderColorRatting(+(value || 0), 'rating');
        },
      },
      {
        title: 'Security Rating',
        dataIndex: 'security_rating',
        key: 'security_rating',
        align: 'center',
        render: (value: string) => {
          return renderColorRatting(+(value || 0), 'rating');
        },
      },
      {
        title: 'SQALE Rating',
        dataIndex: 'sqale_rating',
        key: 'sqale_rating',
        align: 'center',
        render: (value: string) => {
          return renderColorRatting(+(value || 0), 'rating');
        },
      },
      {
        title: 'Vulnerabilities',
        dataIndex: 'vulnerabilities',
        key: 'vulnerabilities',
        align: 'center',
      },
      {
        title: 'Detail',
        key: 'id',
        dataIndex: 'id',
        align: 'center',
        render: (value: string) => {
          return (
            <div
              className="btn-show-result mt-4"
              onClick={() => handleShowResult(value)}
            >
              Detail
            </div>
          );
        },
      },
    ],
    [handleShowResult, renderStatus]
  );
  return (
    <div style={{ width: '100%', padding: '16px' }}>
      <p style={{ fontWeight: 600, fontSize: '16px', marginBottom: '20px' }}>
        Submissions
      </p>
      <Table dataSource={data} columns={columns} scroll={{ x: 2000 }} />
    </div>
  );
};

export default SubmissionTab;
