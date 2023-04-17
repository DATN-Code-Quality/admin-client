import React, { useCallback, useEffect, useState } from 'react';

import { Card, Pagination } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setSubmissionSelected } from '~/adapters/redux/actions/sonarqube';

import './style.css';
import { useAssignment } from '~/adapters/appService/assignment.service';

const Submission: React.FC<{ assignment: any }> = ({ assignment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState<{
    id: number;
    link: string;
    assignmentId: string;
  }>();

  const { getSubmissionByAssignmentId } = useAssignment();

  const fetchSubmission = useCallback(async () => {
    const response = await getSubmissionByAssignmentId(assignment.id);
    if (response?.status !== 0 || response?.data?.length === 0) return;
    setSubmission(response.data[0]);
  }, [assignment.id]);

  useEffect(() => {
    fetchSubmission();
  }, [fetchSubmission]);

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

export default Submission;
