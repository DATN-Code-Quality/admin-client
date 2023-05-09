import React, { useCallback, useEffect, useState } from 'react';
import { useSubmission } from '~/adapters/appService/submission.service';
import './style.css';
import { Submission } from '~/domain/submission';
import Overview from './Overview';

const SubmissionComponent: React.FC<{ assignment: any }> = ({ assignment }) => {
  const [submission, setSubmission] = useState<Submission>();

  const fetchSubmission = useCallback(async () => {
    const response = await getSubmissionByAssignmentId(assignment.id);
    const { data } = response;
    if (data?.length === 0) return;
    setSubmission(data[0]);
  }, [assignment.id]);

  useEffect(() => {
    fetchSubmission();
  }, [fetchSubmission]);

  const { getSubmissionByAssignmentId } = useSubmission();

  return (
    <div className="grid grid-col-2 bg-white p-4 rounded-2 gap-4">
      <div>
        <p className="assignment-name">{assignment?.name}</p>
        <p>{assignment?.description}</p>
        <div className="submission-container">
          <p className="title">Bài nộp</p>

          {submission && (
            <>
              <a href={submission?.link} target="_blank" rel="noreferrer">
                {submission?.link}
              </a>
            </>
          )}
          {!submission && (
            <p style={{ fontSize: '16px', fontWeight: 700 }}>Chưa có bài nộp</p>
          )}
        </div>
      </div>
      <Overview submission={submission} />
    </div>
  );
};

export default SubmissionComponent;
