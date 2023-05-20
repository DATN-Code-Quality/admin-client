import React, { useCallback, useEffect, useState } from 'react';

import Overview from './Overview';

import { useSubmission } from '~/adapters/appService/submission.service';
import './style.css';
import { Assignment } from '~/domain/assignment';
import { Submission } from '~/domain/submission';
import AddSubmission from './AddSubmission';
import { Empty } from 'antd';
import { SubRole } from '~/constant/enum';

const SubmissionComponent: React.FC<{ assignment: Assignment }> = ({
  assignment,
}) => {
  const [submissionList, setSubmissionList] = useState<Submission[]>([]);
  const [submission, setSubmission] = useState<Submission>();
  const [subRole, setRole] = useState<SubRole | null>(null);

  const { getSubmissionByAssignmentId } = useSubmission();

  const fetchSubmission = useCallback(async () => {
    const response = await getSubmissionByAssignmentId(
      assignment.courseId,
      assignment.id
    );
    if (response.status !== 0) return;

    const { submissions, role } = response.data;
    // ???
    // if (submissions?.length === 0) return;


    setRole(role);

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
            <p>{assignment?.description ?? ' '}</p>
            <div className="submission-container ">
              <p className="title">Bài nộp</p>

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
      {submissionList?.length === 0 && (
        <div className=" bg-white p-4 rounded-2 gap-4">
          <div className="submission-container ">
            {subRole === SubRole.ADMIN && SubRole.TEACHER && (
              <div>
                <p className="title">Bài nộp</p>
                <Empty description="Không tồn tại bài nôp" />
              </div>
            )}

            {subRole === SubRole.STUDENT && (
              <div>
                <AddSubmission assignment={assignment} />
                <Overview submission={submission} assignment={assignment} />
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
  return (
    <div
      className="rounded-2 p-4 mt-4 cursor-pointer"
      style={{ border: active ? '2px solid blue' : '1px solid #ccc' }}
      onClick={() => setSubmission(submission)}
    >
      <a href={submission.link}>{submission.link}</a>
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
