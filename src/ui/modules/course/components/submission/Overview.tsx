import React, { useCallback, useEffect, useState } from 'react';

import {
  BugOutlined,
  DribbbleCircleFilled,
  UnlockOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useSonarqube } from '~/adapters/appService/sonarqube.service';
import { setSubmissionSelected } from '~/adapters/redux/actions/sonarqube';
import { Submission } from '~/domain/submission';
import { renderColorRatting } from '~/utils';

const Overview: React.FC<{ submission: Submission }> = ({ submission }) => {
  const { getOverViewSubmission } = useSonarqube();
  const dispatch = useDispatch();
  const navigate = useNavigate();
    
  const [data, setData] = useState<Map<string, number>>(new Map());
  const handleShowResult = useCallback(() => {
    dispatch(setSubmissionSelected(submission?.id));
    navigate(`/sonarqube/submission?id=${submission?.id}`);
  }, [dispatch, navigate, submission?.id]);

  const fetchOverview = useCallback(async () => {
    const response = await getOverViewSubmission('123');
    if (response.error !== 0) return {};
    const rawData = response.data?.measures || [];
    const dataRes = rawData?.reduce((obj, item) => {
      const value = +item.history[0].value;
      obj.set(item.metric, value);
      return obj;
    }, new Map());
    setData(dataRes);
    return 0;
  }, [getOverViewSubmission]);

  useEffect(() => {
    fetchOverview();
  }, []);

  if (!data || data?.size === 0) return <></>;
  return (
    <div className="p-4">
      <div
        className="flex items-center justify-between"
        style={{ borderBottom: '1px solid #ccc' }}
      >
        <p className="flex items-center">
          <span className="issues-amount mr-2" style={{ minWidth: '50px' }}>
            {data.get('bugs')}
          </span>
          <span>
            <BugOutlined style={{ color: 'red' }} /> Bugs
          </span>
        </p>
        <p className="flex items-center">
          <span className="mr-2">Reliability</span>
          {renderColorRatting(data.get('reliability_rating') || 0, 'rating')}
        </p>
      </div>

      <div
        className="flex items-center justify-between py-4"
        style={{ borderBottom: '1px solid #ccc' }}
      >
        <p className="flex items-center">
          <span className="issues-amount mr-2" style={{ minWidth: '50px' }}>
            {data.get('vulnerabilities')}
          </span>
          <span>
            <UnlockOutlined style={{ color: 'black' }} /> Vulnerabilities
          </span>
        </p>
        <p className="flex items-center">
          <span className="mr-2">Reliability</span>
          {renderColorRatting(data.get('security_rating') || 0, 'rating')}
        </p>
      </div>

      <div
        className="flex items-center justify-between py-4"
        style={{ borderBottom: '1px solid #ccc' }}
      >
        <p className="flex items-center">
          <span className="issues-amount mr-2" style={{ minWidth: '50px' }}>
            {data.get('code_smells')}
          </span>
          <span>
            <DribbbleCircleFilled /> Code Smell
          </span>
        </p>
        <p className="flex items-center">
          <span className="mr-2">Sqale</span>
          {renderColorRatting(data.get('sqale_rating') || 0, 'rating')}
        </p>
      </div>

      <div className="flex items-center justify-between py-4">
        <p className="flex items-center">
          <span className="issues-amount mr-2" style={{ minWidth: '50px' }}>
            {data.get('duplicated_lines_density') || 0}
          </span>
          <span>Duplicated lines</span>
          <span className="ml-2 mr-2 font-semibold">in</span>
          <span className="issues-amount mr-1">{data.get('ncloc') || 0}</span>
          <span>lines</span>
        </p>
      </div>

      <div className="btn-show-result mt-4" onClick={handleShowResult}>
        Kết quả chi tiết
      </div>
    </div>
  );
};

export default Overview;
