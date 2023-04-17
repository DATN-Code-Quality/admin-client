/* eslint-disable no-plusplus */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSonarqube } from '~/adapters/appService/sonarqube.service';

import parse from 'html-react-parser';

import './index.less';
import SonarqubeSelector from '~/adapters/redux/selectors/sonarqube';
import { useSelector } from 'react-redux';
import { LINE_EMPTY_CODE } from '~/constant';
import { Spin } from 'antd';

const DetailSubmission = () => {
  const { getIssuesWithSource } = useSonarqube();
  const issueSelected = useSelector(SonarqubeSelector.getIssueSelected);
  const [componentIssue, setComponentIssue] = useState<string>('');

  const submissionIssues = useSelector(SonarqubeSelector.getSubmissionIssues);

  const [selected, setSelected] = useState();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const handleGetDetail = useCallback(async () => {
    if (!componentIssue) return;
    setLoading(true);
    const response = await getIssuesWithSource(componentIssue);
    if (response.error !== 0) return;
    setData(response.sources);
    setLoading(false);
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
    [handleSelect, selected?.key]
  );

  const addClassIfConditionSatisfied = (
    htmlString: string,
    startError: number,
    endError: number,
    className: string
  ) => {
    const content = htmlString?.replace(/<[^>]+>/g, '');
    const contentError = content?.substring(startError, endError);

    const dataResult: string[] = [...(parse(htmlString) as [])];
    for (let i = 0; i < dataResult.length; i++) {
      if (
        typeof dataResult[i] === 'string' &&
        contentError.includes(dataResult[i]?.replace(/\(\)/g, ''))
      ) {
        dataResult[i] = (
          <span className="s source-line-code-issue">"{dataResult[i]}"</span>
        ) as unknown as string;
      } else if (
        contentError.includes(
          dataResult[i].props?.children?.replace(/\(\)/g, '')
        )
      ) {
        const temp = {
          ...dataResult[i],
          props: {
            className: `${dataResult[i]?.props.className} ${className}`,
            children: dataResult[i]?.props.children,
          },
        };
        dataResult[i] = temp;
      }
    }
    return dataResult;
  };
  const listIssues = useMemo(() => {
    Object.keys(submissionIssues)?.map((file) => {
      return submissionIssues[file];
    });
  }, [submissionIssues]);

  // const handleRenderListIssues = useCallback(() => {
  //   console.log('Submission', submissionIssues);
  //   return Object.keys(submissionIssues)?.map((file, index) => {
  //     console.log(submissionIssues);
  //     return renderListIssues(file, listIssues[index] || []);
  //   });
  // }, [listIssues, renderListIssues, submissionIssues]);

  return (
    <>
      {loading && <Spin />}
      {!loading && (
        <>
          <div className="detail-submission ">
            <div style={{ overflow: 'auto', height: '100%' }}>
              {Object.keys(submissionIssues)?.map((file) => {
                return renderListIssues(file, submissionIssues[file] || []);
              })}
            </div>
            <div style={{ height: '100%', overflow: 'hidden' }}>
              <p className="mb-2 text-right">{componentIssue}</p>
              <div className="issues-container">
                {data?.map((item, index) => {
                  const isExistIssues =
                    item.code !== LINE_EMPTY_CODE &&
                    lineIssueList.includes(+item.line);

                  const result = isExistIssues
                    ? addClassIfConditionSatisfied(
                        item.code,
                        issueList[+item.line]?.textRange?.startOffset,
                        issueList[+item.line]?.textRange?.endOffset,
                        'source-line-code-issue'
                      )
                    : parse(item.code);

                  const isActiveLine =
                    isExistIssues &&
                    issueList[+item.line]?.key === selected?.key;

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
                        <p className="source-line-code code">
                          {/* {parse(item.code)} */}
                          {result}
                        </p>
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
        </>
      )}
    </>
  );
};

export default DetailSubmission;
