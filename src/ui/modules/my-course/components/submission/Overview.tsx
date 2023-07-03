import React, { useCallback, useEffect, useState } from 'react';

import {
  BugOutlined,
  DribbbleCircleFilled,
  UnlockOutlined,
} from '@ant-design/icons';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useSonarqube } from '~/adapters/appService/sonarqube.service';
import { Assignment } from '~/domain/assignment';
import { Submission } from '~/domain/submission';
import useCurrentWidth from '~/hooks/useCurrentWidth';
import { renderColorRatting } from '~/utils';
import { OverviewDataRespond, ResultOverview } from '~/domain/sonarqube';

const Overview: React.FC<{
  submission?: Submission;
  assignment: Assignment;
}> = ({ submission, assignment }) => {
  const width = useCurrentWidth();
  const { getOverViewSubmission } = useSonarqube();
  const navigate = useNavigate();

  const [data, setData] = useState<ResultOverview>({});
  const [loading, setLoading] = useState(false);

  const handleShowResult = useCallback(() => {
    navigate(
      `/sonarqube/submission?courseId=${assignment?.courseId}&assignmentId=${assignment?.id}&submissionId=${submission?.id}`
    );
  }, [assignment?.courseId, assignment?.id, navigate, submission?.id]);
  const fetchOverview = useCallback(async () => {
    const initMap = new Map();
    if (!submission) {
      setData({});
      return;
    }

    if (
      !assignment?.id ||
      !assignment?.courseId ||
      ![3, 4].includes(submission?.status)
    )
      return;
    setLoading(true);
    const response = await getOverViewSubmission(
      assignment?.courseId,
      assignment?.id,
      submission?.id
    );
    if (response.status !== 0) {
      setData(initMap);
      return;
    }
    const resultData = response.data;

    setData(resultData || {});
    setLoading(false);
  }, [assignment?.courseId, assignment?.id, submission]);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  if (!data || ![3, 4].includes(submission?.status)) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span style={{ fontStyle: 'italic', textAlign: 'center' }}>
          No data display for this submission
        </span>
      </div>
    );
  }
  return (
    <div>
      {!loading && (
        <div
          style={{
            marginLeft: width < 768 ? 0 : 16,
            marginTop: 32,
            padding: 16,
            border: '1px solid ',
            borderRadius: 16,
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{ borderBottom: '1px solid #ccc' }}
          >
            <p className="flex items-center">
              <span className="issues-amount mr-2" style={{ minWidth: '50px' }}>
                {data.bugs}
              </span>
              <span>
                <BugOutlined style={{ color: 'red' }} /> Bugs
              </span>
            </p>
            <p className="flex items-center">
              <span className="mr-2">Reliability</span>
              {renderColorRatting(
                +(data.reliability_rating || 0),
                'rating'
              )}
            </p>
          </div>

          <div
            className="flex items-center justify-between py-4"
            style={{ borderBottom: '1px solid #ccc' }}
          >
            <p className="flex items-center">
              <span className="issues-amount mr-2" style={{ minWidth: '50px' }}>
                {data.vulnerabilities}
              </span>
              <span>
                <UnlockOutlined style={{ color: 'black' }} /> Vulnerabilities
              </span>
            </p>
            <p className="flex items-center">
              <span className="mr-2">Reliability</span>
              {renderColorRatting(
                +(data.security_rating || 0),
                'rating'
              )}
            </p>
          </div>

          <div
            className="flex items-center justify-between py-4"
            style={{ borderBottom: '1px solid #ccc' }}
          >
            <p className="flex items-center">
              <span className="issues-amount mr-2" style={{ minWidth: '50px' }}>
                {data.code_smells}
              </span>
              <span>
                <DribbbleCircleFilled /> Code Smell
              </span>
            </p>
            <p className="flex items-center">
              <span className="mr-2">Sqale</span>
              {renderColorRatting(+(data.sqale_rating || 0), 'rating')}
            </p>
          </div>

          <div className="flex items-center justify-between py-4">
            <p className="flex items-center">
              <span className="issues-amount mr-2" style={{ minWidth: '50px' }}>
                {data.duplicated_lines_density|| 0}
              </span>
              <span>Duplicated lines</span>
              <span className="ml-2 mr-2 font-semibold">in</span>
              <span className="issues-amount mr-1">
                {data.ncloc || 0}
              </span>
              <span>lines</span>
            </p>
          </div>

          <div className="btn-show-result mt-4" onClick={handleShowResult}>
            Detail Result
          </div>
        </div>
      )}
      {loading && (
        <div
          className="flex items-center justify-center"
          style={{ height: '200px' }}
        >
          <Spin />
        </div>
      )}
    </div>
  );
};

export default Overview;
