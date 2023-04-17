import React, { useCallback, useEffect, useState } from 'react';

import { Card, Pagination } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useSubmission } from '~/adapters/appService/submission.service';
import { setSubmissionSelected } from '~/adapters/redux/actions/sonarqube';
import './style.css';
import { Submission } from '~/domain/submission';

const SubmissionComponent: React.FC<{ assignment: any }> = ({ assignment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleShowResult = useCallback(() => {
    dispatch(setSubmissionSelected(submission?.id));
    navigate(`/sonarqube/submission?id=${submission?.id}`);
  }, [dispatch, navigate, submission?.id]);

  return (
    <Card>
      <p className="assignment-name">{assignment?.name}</p>
      <p>{assignment?.description}</p>
      <div className="submission-container">
        <p className="title">Bài nộp</p>

        {submission && (
          <>
            <a href={submission?.link} target="_blank" rel="noreferrer">
              {submission?.link}
            </a>
            <div className="btn-show-result mt-4" onClick={handleShowResult}>
              Kết quả
            </div>
          </>
        )}
        {!submission && (
          <p style={{ fontSize: '16px', fontWeight: 700 }}>Chưa có bài nộp</p>
        )}
      </div>
    </Card>
  );
};

export default SubmissionComponent;
