/* eslint-disable import/order */
import React, { useCallback, useEffect, useState } from 'react';

import Overview from './Overview';

import { useSubmission } from '~/adapters/appService/submission.service';
import './style.css';
import { SubRole, SubmisisonTab } from '~/constant/enum';
import { Assignment } from '~/domain/assignment';
import { ReportAssignment, Submission } from '~/domain/submission';

import AddSubmission from './AddSubmission';

import { Empty, Tabs } from 'antd';

import Statistic from './Statistic';
import { formatDate } from '~/utils';
import { SubmissionType } from '../../../../../constant/enum';
import useQuery from '~/hooks/useQuery';
import { useNavigate, useNavigation } from 'react-router-dom';

const SubmissionComponent: React.FC<{ assignment: Assignment }> = ({
  assignment,
}) => {
  const [submissionList, setSubmissionList] = useState<Submission[]>([]);
  const [submission, setSubmission] = useState<Submission>();
  const [subRole, setRole] = useState<SubRole | null>(null);
  const [tab, setTab] = useState<SubmisisonTab>(SubmisisonTab.STATISTIC);
  const { getSubmissionByAssignmentId } = useSubmission();

  const fetchSubmission = useCallback(async () => {
    const response = await getSubmissionByAssignmentId(
      assignment.courseId,
      assignment.id
    );
    if (response.status !== 0) return;
    const { submissions, role } = response.data;
    setRole(role as SubRole);
    if (role === SubRole.STUDENT) {
      setTab(SubmisisonTab.SUBMISSION);
    } else {
      setTab(SubmisisonTab.STATISTIC);
    }
    setSubmissionList(submissions);
    setSubmission(submissions[0]);
  }, [assignment.courseId, assignment.id]);

  console.info("Current tab: " + tab);
  useEffect(() => {
    fetchSubmission();
  }, [fetchSubmission]);
  const query = useQuery();
  return (
    <div className="bg-white p-4 rounded-2 gap-4">
      {submissionList?.length > 0 && (
        <div
          className="grid bg-white p-4 rounded-2"
          style={{
            gridTemplateColumns:
              tab === SubmisisonTab.SUBMISSION ? '1fr 1fr' : '1fr',
          }}
        >
          <div className='assignment-information'>
            <p
              className="assignment-name"
              style={{ marginTop: 8, marginBottom: 8 }}
            >
              {assignment?.name}
            </p>
            <p>{assignment?.description}</p>
            {subRole === SubRole.ADMIN ||
              (subRole === SubRole.TEACHER && (
                <div className="flex items-center">
                  <Tabs
                    defaultActiveKey={tab}
                    size="middle"
                    type="card"
                    onChange={(selectedTab) => {
                      setTab(selectedTab)
                    }}
                    style={{ marginBottom: 8, marginTop: 8 }}
                    hidden={false}
                    items={Object.keys(SubmisisonTab).map((tab) => {
                      const tabName =
                        tab.charAt(0).toUpperCase() +
                        tab.substring(1).toLowerCase();
                      return {
                        label: tabName,
                        key: tab,
                      };
                    })}
                  />
                </div>
              ))}
          </div>
          <div />

          <div style={{ width: '100%', overflow: 'hidden' }}>

            <div className="submission-container">
              {/* {subRole === SubRole.STUDENT && (
                <p className="title">Submission</p>
              )} */}

              {tab === SubmisisonTab.SUBMISSION && (
                <>
                  {subRole !== SubRole.STUDENT && (
                    <h3>Student submissions list</h3>
                  )}
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
                </>

              )}
              {tab === SubmisisonTab.STATISTIC && (
                <div className="mt-4">
                  <Statistic
                    courseId={assignment?.courseId}
                    assignmentId={assignment?.id}
                  />
                </div>
              )}
            </div>
          </div>
          {tab === SubmisisonTab.SUBMISSION && (
            <Overview submission={submission} assignment={assignment} />
          )}
        </div>
      )}
      {tab === SubmisisonTab.SUBMISSION && (
        <>
          {submissionList?.length === 0 && (
            <div className=" bg-white p-4 rounded-2 gap-4">
              <div className="submission-container ">
                {(subRole === SubRole.ADMIN || subRole === SubRole.TEACHER) && (
                  <div>
                    <p className="title">Bài nộp</p>
                    <Empty description="Không tồn tại bài nôp" />
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
        </>
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

export default SubmissionComponent;
