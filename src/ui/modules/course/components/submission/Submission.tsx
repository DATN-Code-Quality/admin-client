import { Card } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-use';
import { setAssignmentSelected } from '~/adapters/redux/actions/sonarqube';

import './style.css';

const Submission: React.FC<{ assignment: any }> = ({ assignment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowResult = useCallback(() => {
    dispatch(setAssignmentSelected("e25b393e-cf56-4e12-8a0b-e7213648ac76'"));
    navigate('/sonarqube/submission');
  }, [dispatch, navigate]);

  return (
    <Card>
      <p className="assignment-name">{assignment?.name}</p>
      <p>{assignment?.description}</p>
      <div className="submission-container">
        <p className="title">Bài nộp</p>

        <a href=" htnhátp://localhost/webservice/pluginfile.php/40/assignsubmission_file/submission_files/2/README.txt?fbclid=IwAR0eGaUrmCTrFpkjn-mI1WEWdeDzGznqughgf599XHB4UQbH8oWrknoevVY">
          tp://localhost/webservice/pluginfile.php/40/assignsubmission_file/submission_files/2/README.txt?fbclid=IwAR0eGaUrmCTrFpkjn-mI1WEWdeDzGznqughgf599XHB4UQbH8oWrknoevVY"
        </a>

        <div className="btn-show-result mt-4" onClick={handleShowResult}>
          Kết quả
        </div>
      </div>
    </Card>
  );
};

export default Submission;
