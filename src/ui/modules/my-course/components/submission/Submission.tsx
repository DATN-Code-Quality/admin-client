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
import useCurrentWidth from '~/hooks/useCurrentWidth';
import { FormAddAssignment } from '../form-add-assignment';

const SubmissionComponent: React.FC<{ assignment: Assignment }> = ({
  assignment,
}) => {
  const [submissionList, setSubmissionList] = useState<Submission[]>([]);
  const [submission, setSubmission] = useState<Submission>();
  const [subRole, setRole] = useState<SubRole | null>(null);
  const [tab, setTab] = useState<SubmisisonTab>(SubmisisonTab.STATISTIC);
  const { getSubmissionByAssignmentId } = useSubmission();
  const width = useCurrentWidth();

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

  useEffect(() => {
    fetchSubmission();
  }, [fetchSubmission]);
  const query = useQuery();

  let teacherTabs = Object.keys(SubmisisonTab).map((tab) => {
    const tabName =
      tab.charAt(0).toUpperCase() + tab.substring(1).toLowerCase();
    return {
      label: tabName,
      key: tab,
    };
  });

  teacherTabs = [
    {
      label: 'Detail',
      key: 'detail',
    },
    ...teacherTabs,
  ];

  return (
    <>
      {/* first CARD */}
      <div className="bg-white p-4 rounded-2 gap-4">
        {/* <p className="assignment-name" style={{ marginTop: 8, marginBottom: 8 }}>
        {assignment?.name}
      </p>
      <p>{assignment?.description}</p> */}
        {subRole === SubRole.STUDENT && (
          <>
            <AddSubmission
              assignment={assignment}
              submission={submission}
              onSubmitted={() => fetchSubmission()}
            />
          </>
        )}
        <div
          className="grid bg-white p-4 rounded-2"
          style={{
            gridTemplateColumns:
              tab === SubmisisonTab.SUBMISSION ? '1fr 1fr' : '1fr',
          }}
        >
          <div className="assignment-information">
            {subRole === SubRole.ADMIN ||
              (subRole === SubRole.TEACHER && (
                <div className="flex items-center">
                  <Tabs
                    defaultActiveKey={tab}
                    size="middle"
                    type="card"
                    onChange={(selectedTab) => {
                      setTab(selectedTab);
                    }}
                    style={{ marginBottom: 8, marginTop: 8 }}
                    hidden={false}
                    items={teacherTabs}
                  />
                </div>
              ))}
          </div>
          <div />
        </div>
      </div>

      {/* SECOND CARD */}
      <div className="bg-white p-4 rounded-2 gap-4 mt-4">
        <div
          className="grid bg-white p-4 rounded-2"
          style={{
            gridTemplateColumns:
              tab !== SubmisisonTab.SUBMISSION || width < 768
                ? '1fr'
                : '1fr 1fr',
          }}
        >
          <div style={{ width: '100%', overflow: 'hidden' }}>
            <div className="submission-container">
              {tab === SubmisisonTab.SUBMISSION && (
                <>
                  {subRole !== SubRole.STUDENT && (
                    <h3>Student submissions list</h3>
                  )}
                  {subRole === SubRole.STUDENT && (
                    <h3 className="submission-title">Submitted submission</h3>
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
              {tab === 'detail' && (
                <FormAddAssignment
                  courseId={assignment?.courseId}
                  assignmentId={assignment?.id}
                  initialViewMode
                />
              )}
            </div>
          </div>
          {tab === SubmisisonTab.SUBMISSION && (
            <Overview submission={submission} assignment={assignment} />
          )}
        </div>
      </div>
    </>
  );
};

const SubmissionItem: React.FC<{
  submission: Submission;
  setSubmission: (submission: Submission) => void;
  active: boolean;
}> = ({ submission, setSubmission, active }) => {
  const renderStatus = useCallback((status: SubmissionType) => {
    let backgroundColor = '';
    let statusStr = '';
    switch (status) {
      case SubmissionType.SCANNING:
        backgroundColor = 'blue';
        statusStr = 'Scanning';
        break;
      case SubmissionType.PASS:
        backgroundColor = 'green';
        statusStr = 'Pass';
        break;
      case SubmissionType.FAIL:
        backgroundColor = 'red';
        statusStr = 'Failed';
        break;
      case SubmissionType.SCANNED_FAIL:
        backgroundColor = 'red';
        statusStr = 'Error';
        break;
      default:
        statusStr = 'Submitted';
        backgroundColor = 'gray';
    }

    return (
      <div
        className="rounded-2"
        style={{
          background: backgroundColor,
          color: 'white',
          fontWeight: 600,
          minWidth: '80px',
          textAlign: 'center',
          paddingLeft: 6,
          paddingRight: 6,
          paddingTop: 2,
          paddingBottom: 2,
        }}
      >
        {statusStr}
      </div>
    );
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
              new Date(submission.updatedAt ?? ''),
              'vi-VN',
              'YYYY-MM-DD hh:mm:ss'
            )}
            {/* {submission?.updatedAt} */}
          </div>
          {/* <div>
            <span className="font-semibold">Submitted file: </span>
            <a href={submission.link} target="_blank" rel="noopener noreferrer">
              link
            </a>
          </div> */}
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
