import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSonarqube } from '~/adapters/appService/sonarqube.service';

import parse from 'html-react-parser';

import './index.less';
import SonarqubeSelector from '~/adapters/redux/selectors/sonarqube';
import { useSelector } from 'react-redux';
import { LINE_EMPTY_CODE } from '~/constant';

const DetailSubmission = () => {
  const { getIssuesWithSource } = useSonarqube();

  const submissionIssues = useSelector(SonarqubeSelector.getSubmissionIssues);

  const [data, setData] = useState([]);

  const handleGetDetail = useCallback(async () => {
    const response = await getIssuesWithSource();
    if (response.error !== 0) return;
    setData(response.sources);
  }, []);

  const issueList = useMemo(() => {
    const result = {};
    Object.values(submissionIssues)?.forEach((issueGroup) => {
      issueGroup?.forEach((issue) => {
        result[issue?.textRange?.endLine] = issue;
      });
    });
    return result;
  }, [submissionIssues]);

  const lineIssueList = useMemo(
    () => Object.keys(issueList || {})?.map((item) => +item),
    [issueList]
  );

  console.log(Object.keys(lineIssueList), submissionIssues);
  useEffect(() => {
    handleGetDetail();
  }, [handleGetDetail]);
  return (
    <div>
      {data?.map((item, index) => {
        // console.log(issueList.);
        const isExistIssues =
          item.code !== LINE_EMPTY_CODE && lineIssueList.includes(+item.line);
        return (
          <div
            key={`${item.code}_${item.line}`}
            style={{ display: 'flex', alignItems: 'flex-start' }}
          >
            <p>{index}</p>
            <div
              className={
                item.code !== LINE_EMPTY_CODE ? 'line-code-detail' : ''
              }
              style={{ paddingBottom: isExistIssues ? '8px' : '0' }}
            >
              <p className="source-line-code code">{parse(item.code)}</p>
              {isExistIssues && (
                //   <div>test</div>
                <div
                  className="issue-component mt-2 "

                  //   onClick={() => {
                  //     handleSetIssue(issue);
                  //   }}
                >
                  {issueList[+item.line].message}
                </div>
              )}
              {item.code === LINE_EMPTY_CODE && <div className="my-6"></div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetailSubmission;
