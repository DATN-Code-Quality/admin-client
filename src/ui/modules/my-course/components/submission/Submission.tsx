import React, { useCallback, useEffect, useState } from 'react';

import Overview from './Overview';

import { useSubmission } from '~/adapters/appService/submission.service';
import './style.css';
import { Assignment } from '~/domain/assignment';
import { Submission } from '~/domain/submission';
import AddSubmission from './AddSubmission';
import { Empty } from 'antd';
import { SubRole, SubmisisonTab, SubmissionType } from '~/constant/enum';
import Statistic from './Statistic';

const SubmissionComponent: React.FC<{ assignment: Assignment }> = ({
  assignment,
}) => {
  const [submissionList, setSubmissionList] = useState<Submission[]>([]);
  const [submission, setSubmission] = useState<Submission>();
  const [subRole, setRole] = useState<SubRole | null>(null);
  const [tab, setTab] = useState<SubmisisonTab>(SubmisisonTab.SUBMISSION);

  const { getSubmissionByAssignmentId } = useSubmission();

  const fetchSubmission = useCallback(async () => {
    const response = await getSubmissionByAssignmentId(
      assignment.courseId,
      assignment.id
    );
    if (response.status !== 0) return;
    const { submissions, role } = response.data;
    if (submissions?.length === 0) return;
    setRole(role as SubRole);
    setSubmissionList(submissions);
    setSubmission(submissions[0]);
  }, [assignment.courseId, assignment.id]);

  useEffect(() => {
    fetchSubmission();
  }, [fetchSubmission]);

  return (
    <div className="bg-white p-4 rounded-2 gap-4">
      {submissionList?.length > 0 && (
        <div className="grid grid-col-2 bg-white p-4 rounded-2 gap-4">
          <div>
            <p className="assignment-name">{assignment?.name}</p>
            <p>{assignment?.description}</p>
            <div className="submission-container">
              {subRole === SubRole.ADMIN ||
                (subRole === SubRole.TEACHER && (
                  <div className="flex items-center">
                    <p
                      className={`title cursor-pointer ${
                        tab === SubmisisonTab.SUBMISSION
                          ? 'submission-tab-active'
                          : ''
                      }`}
                      onClick={() => setTab(SubmisisonTab.SUBMISSION)}
                    >
                      Bài nộp
                    </p>
                    <p
                      className={`title cursor-pointer  ml-4 ${
                        tab === SubmisisonTab.STATISTIC
                          ? 'submission-tab-active'
                          : ''
                      }`}
                      onClick={() => setTab(SubmisisonTab.STATISTIC)}
                    >
                      Thống kê
                    </p>
                  </div>
                ))}

              {subRole === SubRole.STUDENT && <p className="title">Bài nộp</p>}

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
            </div>
          </div>
          <Overview submission={submission} assignment={assignment} />
        </div>
      )}
      {tab === SubmisisonTab.SUBMISSION && (
        <>
          {submissionList?.length === 0 && (
            <div className=" bg-white p-4 rounded-2 gap-4">
              <div className="submission-container ">
                {subRole === SubRole.ADMIN ||
                  (SubRole.TEACHER && (
                    <div>
                      <p className="title">Bài nộp</p>
                      <Empty description="Không tồn tại bài nôp" />
                    </div>
                  ))}

                {subRole === SubRole.STUDENT && (
                  <div>
                    <AddSubmission />
                    <Overview submission={submission} assignment={assignment} />
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
      {tab === SubmisisonTab.STATISTIC && <Statistic />}
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
            className="px-2 py-1 rounded-2"
            style={{
              background: '#7e7676',
              color: 'white',
              fontWeight: 600,
              minWidth: '60px',
              textAlign: 'center',
            }}
          >
            Submitted
          </div>
        );
      case SubmissionType.SCANNING:
        return (
          <div
            className="px-2 py-1 rounded-2"
            style={{
              background: 'blue',
              color: 'white',
              fontWeight: 600,
              minWidth: '60px',
              textAlign: 'center',
            }}
          >
            Scanning
          </div>
        );
      case SubmissionType.PASS:
        return (
          <div
            className="px-2 py-1 rounded-2"
            style={{
              background: 'green',
              color: 'white',
              fontWeight: 600,
              minWidth: '60px',
              textAlign: 'center',
            }}
          >
            Pass
          </div>
        );
      case SubmissionType.FAIL:
        return (
          <div
            className="px-2 py-1 rounded-2"
            style={{
              background: 'red',
              color: 'white',
              fontWeight: 600,
              minWidth: '60px',
              textAlign: 'center',
            }}
          >
            Fail
          </div>
        );
      case SubmissionType.SCANNED_FAIL:
        return (
          <div
            className="px-2 py-1 rounded-2"
            style={{
              background: 'green',
              color: 'white',
              fontWeight: 600,
              minWidth: '60px',
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
        <a className="flex-1" href={submission.link}>
          {submission.link}
        </a>
        <span>{renderStatus(submission?.status as SubmissionType)}</span>
      </div>
      <div className="flex items-center justify-between">
        <p>
          Name : <span className="font-semibold">{submission?.user?.name}</span>
        </p>
        <p>
          Time submit :{' '}
          <span className="font-semibold">{submission?.updatedAt} </span>{' '}
        </p>
      </div>
    </div>
  );
};

export default SubmissionComponent;
