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
import { renderColorRatting } from '~/utils';

const Overview: React.FC<{
  submission?: Submission;
  assignment: Assignment;
}> = ({ submission, assignment }) => {
  const { getOverViewSubmission } = useSonarqube();
  const navigate = useNavigate();

  const [data, setData] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState(false);

  const handleShowResult = useCallback(() => {
    navigate(
      `/sonarqube/submission?courseId=${assignment?.courseId}&assignmentId=${assignment?.id}&submissionId=${submission?.id}`
    );
  }, [assignment?.courseId, assignment?.id, navigate, submission?.id]);

  const fetchOverview = useCallback(async () => {
    const initMap = new Map();
    if (!submission) {
      setData(initMap);
      return;
    }
    setLoading(true);
    if (!assignment?.id || !assignment?.courseId) return;
    // const response = await getOverViewSubmission(
    //   assignment?.courseId,
    //   assignment?.id,
    //   submission?.id
    // );
    const response = {
      status: 0,
      data: {
        paging: {
          pageIndex: 1,
          pageSize: 100,
          total: 1,
        },
        measures: [
          {
            metric: 'bugs',
            history: [
              {
                date: '2023-05-23T19:42:15+0700',
                value: '1',
              },
            ],
          },
          {
            metric: 'code_smells',
            history: [
              {
                date: '2023-05-23T19:42:15+0700',
                value: '11',
              },
            ],
          },
          {
            metric: 'coverage',
            history: [
              {
                date: '2023-05-23T19:42:15+0700',
                value: '0.0',
              },
            ],
          },
          {
            metric: 'duplicated_lines_density',
            history: [
              {
                date: '2023-05-23T19:42:15+0700',
                value: '0.0',
              },
            ],
          },
          {
            metric: 'ncloc',
            history: [
              {
                date: '2023-05-23T19:42:15+0700',
                value: '156',
              },
            ],
          },
          {
            metric: 'reliability_rating',
            history: [
              {
                date: '2023-05-23T19:42:15+0700',
                value: '3.0',
              },
            ],
          },
          {
            metric: 'security_rating',
            history: [
              {
                date: '2023-05-23T19:42:15+0700',
                value: '1.0',
              },
            ],
          },
          {
            metric: 'sqale_index',
            history: [
              {
                date: '2023-05-23T19:42:15+0700',
                value: '43',
              },
            ],
          },
          {
            metric: 'sqale_rating',
            history: [
              {
                date: '2023-05-23T19:42:15+0700',
                value: '1.0',
              },
            ],
          },
          {
            metric: 'vulnerabilities',
            history: [
              {
                date: '2023-05-23T19:42:15+0700',
                value: '0',
              },
            ],
          },
        ],
      },
    };
    if (response.status !== 0) {
      setData(initMap);
      return;
    }
    const rawData = response.data?.measures || [];
    const dataRes = rawData?.reduce((obj, item) => {
      const { history } = item;

      const { value } = history[history.length - 1];
      obj.set(item.metric, value);
      return obj;
    }, initMap);
    setData(dataRes);
    setLoading(false);
  }, [assignment?.courseId, assignment?.id, submission]);

  useEffect(() => {
    fetchOverview();
  }, [fetchOverview]);

  if (!data || data?.size === 0) return <></>;
  return (
    <div>
      {!loading && (
        <div className="p-4" style={{ marginTop: '16px' }}>
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
              {renderColorRatting(
                +(data.get('reliability_rating') || 0),
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
                {data.get('vulnerabilities')}
              </span>
              <span>
                <UnlockOutlined style={{ color: 'black' }} /> Vulnerabilities
              </span>
            </p>
            <p className="flex items-center">
              <span className="mr-2">Reliability</span>
              {renderColorRatting(
                +(data.get('security_rating') || 0),
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
                {data.get('code_smells')}
              </span>
              <span>
                <DribbbleCircleFilled /> Code Smell
              </span>
            </p>
            <p className="flex items-center">
              <span className="mr-2">Sqale</span>
              {renderColorRatting(+(data.get('sqale_rating') || 0), 'rating')}
            </p>
          </div>

          <div className="flex items-center justify-between py-4">
            <p className="flex items-center">
              <span className="issues-amount mr-2" style={{ minWidth: '50px' }}>
                {data.get('duplicated_lines_density') || 0}
              </span>
              <span>Duplicated lines</span>
              <span className="ml-2 mr-2 font-semibold">in</span>
              <span className="issues-amount mr-1">
                {data.get('ncloc') || 0}
              </span>
              <span>lines</span>
            </p>
          </div>

          <div className="btn-show-result mt-4" onClick={handleShowResult}>
            Kết quả chi tiết
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
