import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSonarqube } from '~/adapters/appService/sonarqube.service';

import parse from 'html-react-parser';

import './index.less';
import SonarqubeSelector from '~/adapters/redux/selectors/sonarqube';
import { useSelector } from 'react-redux';
import { LINE_EMPTY_CODE } from '~/constant';

const DetailSubmission = () => {
  const { getIssuesWithSource } = useSonarqube();
  const issueSelected = useSelector(SonarqubeSelector.getIssueSelected);
  const [componentIssue, setComponentIssue] = useState<string>('');

  const submissionIssues = useSelector(SonarqubeSelector.getSubmissionIssues);

  const [selected, setSelected] = useState();

  const [data, setData] = useState([]);

  const handleGetDetail = useCallback(async () => {
    if (!componentIssue) return;
    const response = await getIssuesWithSource(componentIssue);
    if (response.error !== 0) return;
    setData(response.sources);
  }, [componentIssue]);

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

  useEffect(() => {
    setComponentIssue(issueSelected?.component);
    setSelected(issueSelected);
  }, [issueSelected, issueSelected?.component]);

  useEffect(() => {
    handleGetDetail();
  }, [handleGetDetail]);

  const handleSelect = useCallback(
    (item: any) => {
      setSelected(item);
      if (componentIssue !== item.component) {
        setComponentIssue(() => item.component);
      }
    },
    [componentIssue]
  );

  const renderListIssues = useCallback(
    (fileName: string, issueData: any) => {
      const fileNameShort = fileName.substring(fileName.lastIndexOf('/') + 1);
      return (
        <div>
          <p style={{ marginBottom: '8px', textAlign: 'right' }}>
            {fileNameShort}
          </p>
          {issueData?.map((item) => {
            return (
              <div
                key={item.key}
                className={`issue-message ${
                  selected?.key === item.key ? 'active' : ''
                }`}
                onClick={() => handleSelect(item)}
              >
                {item.message}
              </div>
            );
          })}
        </div>
      );
    },
    [selected]
  );

  return (
    <div className="detail-submission ">
      <div>
        {Object.keys(submissionIssues)?.map((file) => {
          return renderListIssues(file, submissionIssues[file] || []);
        })}
      </div>
      <div>
        <p className="mb-2 text-right">{issueSelected.component}</p>
        <div className="issues-container">
          {data?.map((item, index) => {
            // console.log(issueList.);
            const isExistIssues =
              item.code !== LINE_EMPTY_CODE &&
              lineIssueList.includes(+item.line);

            const isActiveLine =
              isExistIssues && issueList[+item.line]?.key === selected?.key;

            return (
              <div
                key={`${item.code}_${item.line}`}
                className={`pl-6 line-code-container ${
                  isActiveLine ? 'active' : ''
                }`}
              >
                <div className="line-index">{index + 1}</div>
                <div
                  className={`${
                    item.code !== LINE_EMPTY_CODE
                      ? 'line-code-detail'
                      : 'empty-line'
                  } bg-white`}
                  style={{ paddingBottom: isExistIssues ? '8px' : '0' }}
                >
                  <p className="source-line-code code">{parse(item.code)}</p>
                  {isExistIssues && (
                    <div
                      className="issue-component mt-2 "
                      //   onClick={() => {
                      //     handleSetIssue(issue);
                      //   }}
                    >
                      {issueList[+item.line].message}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailSubmission;
