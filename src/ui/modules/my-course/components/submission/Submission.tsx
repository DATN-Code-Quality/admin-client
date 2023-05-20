import React, { useCallback, useEffect, useState } from 'react';

import Overview from './Overview';

import { useSubmission } from '~/adapters/appService/submission.service';
import './style.css';
import { Assignment } from '~/domain/assignment';
import { ReportAssignment, Submission } from '~/domain/submission';
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
    // const response = await getSubmissionByAssignmentId(
    //   assignment.courseId,
    //   assignment.id
    // );
    const response = {
      status: 0,
      data: {
        submissions: [
          {
            id: '17151723-1001-4f3d-9789-aaec3c9daff9',
            createdAt: '2023-05-10T17:13:46.903Z',
            updatedAt: '2023-05-10T17:17:31.000Z',
            deletedAt: null,
            assignmentId: 'e8c2559c-629d-4c45-b9bb-87a532445f7d',
            link: 'https://codeload.github.com/anhvinhphan659/meme-generator/zip/refs/heads/main',
            note: null,
            submitType: 'system',
            timemodified: '2023-05-06T09:44:34.000Z',
            userId: '1a514261-43d4-4586-8b21-def3f77db8e6',
            origin: 'origin',
            status: 0,
            grade: null,
            submissionMoodleId: '',
            user: {
              id: '1a514261-43d4-4586-8b21-def3f77db8e6',
              createdAt: '2023-05-06T09:44:34.258Z',
              updatedAt: '2023-05-06T09:44:34.258Z',
              deletedAt: null,
              name: 'Nghĩa',
              role: 'user',
              email: 'nghia@gmail.com',
              userId: '03',
              moodleId: '03',
              status: 1,
            },
          },
          {
            id: '29076df9-68e9-4b5f-b209-e73a400e386d',
            createdAt: '2023-05-09T13:24:46.840Z',
            updatedAt: '2023-05-09T16:05:13.000Z',
            deletedAt: null,
            assignmentId: 'e8c2559c-629d-4c45-b9bb-87a532445f7d',
            link: 'https://codeload.github.com/anhvinhphan659/meme-generator/zip/refs/heads/main',
            note: null,
            submitType: 'system',
            timemodified: '2023-05-06T09:44:34.000Z',
            userId: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
            origin: 'origin',
            status: 0,
            grade: null,
            submissionMoodleId: '',
            user: {
              id: 'e126f344-5fbf-4654-8d9d-37dfd6cc094a',
              createdAt: '2023-05-04T16:18:28.303Z',
              updatedAt: '2023-05-09T13:22:49.657Z',
              deletedAt: null,
              name: 'Nhân',
              role: 'user',
              email: 'nhan@gmail.com',
              userId: '01',
              moodleId: '01',
              status: 1,
            },
          },
          {
            id: 'cba2cb50-0c82-4e8a-9707-99eb0f4241e5',
            createdAt: '2023-05-09T12:35:14.412Z',
            updatedAt: '2023-05-12T12:35:30.087Z',
            deletedAt: null,
            assignmentId: 'e8c2559c-629d-4c45-b9bb-87a532445f7d',
            link: 'D:/source/f7690d16-1217-453c-868e-c6fbb5d27ce6/e8c2559c-629d-4c45-b9bb-87a532445f7d/9d8d78b9-dc53-4e96-a98d-56ce36ff2116/CountReact-master.zip',
            note: 'Note',
            submitType: 'system',
            timemodified: '2023-05-06T09:44:34.000Z',
            userId: '9d8d78b9-dc53-4e96-a98d-56ce36ff2116',
            origin: 'origin',
            status: 0,
            grade: 10,
            submissionMoodleId: '0001',
            user: {
              id: '9d8d78b9-dc53-4e96-a98d-56ce36ff2116',
              createdAt: '2023-05-04T16:18:28.315Z',
              updatedAt: '2023-05-09T04:54:52.000Z',
              deletedAt: null,
              name: 'Lễ',
              role: 'user',
              email: 'le@gmail.com',
              userId: '02',
              moodleId: '02',
              status: 1,
            },
          },
          {
            id: 'e25b393e-cf56-4e12-8a0b-e7213648ac76',
            createdAt: '2023-05-04T16:15:16.700Z',
            updatedAt: '2023-05-04T16:15:16.700Z',
            deletedAt: null,
            assignmentId: 'e8c2559c-629d-4c45-b9bb-87a532445f7d',
            link: 'abc.com',
            note: null,
            submitType: 'moodle',
            timemodified: '2023-03-29T17:55:44.000Z',
            userId: '95a4f22f-3c69-4f84-bdb4-00caa6f6007',
            origin: 'origin',
            status: 0,
            grade: null,
            submissionMoodleId: '0001',
            user: {
              id: '95a4f22f-3c69-4f84-bdb4-00caa6f6007',
              createdAt: '2023-05-04T16:15:16.596Z',
              updatedAt: '2023-05-04T16:30:08.146Z',
              deletedAt: null,
              name: 'Nguyễn Văn A',
              role: 'admin',
              email: 'a@gmail.com',
              userId: '0003',
              moodleId: '0001',
              status: 1,
            },
          },
        ],
        role: 'teacher',
      },
    };
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

              {tab === SubmisisonTab.SUBMISSION && (
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
