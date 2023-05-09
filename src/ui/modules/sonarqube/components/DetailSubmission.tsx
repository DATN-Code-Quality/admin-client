/* eslint-disable no-plusplus */
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Spin } from 'antd';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';

import IssueItem from './IssueItem';

import { useSonarqube } from '~/adapters/appService/sonarqube.service';
import SonarqubeSelector from '~/adapters/redux/selectors/sonarqube';

import './index.less';

import { LINE_EMPTY_CODE } from '~/constant';

const DetailSubmission = () => {
  const { getIssuesWithSource } = useSonarqube();
  const issueSelected = useSelector(SonarqubeSelector.getIssueSelected);
  const [componentIssue, setComponentIssue] = useState<string>('');
  const oldComponentIssue = useRef('');

  const submissionIssues = useSelector(SonarqubeSelector.getSubmissionIssues);

  const [selected, setSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const issueContainer = useRef();

  const handleGetDetail = useCallback(async () => {
    if (!componentIssue) return;
    setLoading(true);
    const response = await getIssuesWithSource(componentIssue);
    if (response.error !== 0) return;
    setData(response.data);
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
    // oldComponentIssue.current = issueSelected?.component;
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

  useEffect(() => {
    if (issueContainer?.current) {
      const nextTop = selected?.line < 5 ? 0 : (selected?.line + 5) * 30;
      console.log(selected?.line, nextTop);
      issueContainer?.current?.scrollTo({
        top: nextTop,
        behavior: 'smooth',
      });
    }
  }, [selected, componentIssue]);

  const renderListIssues = useCallback(
    (fileName: string, issueData: any) => {
      const value = fileName.split(':');
      const fileNameShort = value[value.length - 1];
      return (
        <div>
          <p style={{ marginBottom: '8px' }}>
            <span className="font-semibold">File: </span>
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

    const dataResult: string[] = parse(`${htmlString}`);
    for (let i = 0; i < dataResult.length; i++) {
      if (
        typeof dataResult[i] === 'string' &&
        contentError.includes(dataResult[i]?.replace(/\(\)/g, ''))
      ) {
        dataResult[i] = (
          <span className="s source-line-code-issue">{dataResult[i]}</span>
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

  return (
    <>
      <div className="detail-submission ">
        <div
          style={{
            overflow: 'hidden',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p style={{ height: '44px' }}>Issues</p>
          <div style={{ flex: 1, overflow: 'auto' }}>
            {Object.keys(submissionIssues)?.map((file) => {
              return (
                <Fragment key={file}>
                  {renderListIssues(file, submissionIssues[file] || [])}
                </Fragment>
              );
            })}
          </div>
        </div>
        <div
          style={{
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p className="mb-2 text-right" style={{ height: '44px' }}>
            {componentIssue}
          </p>
          <div className="issues-container" ref={issueContainer}>
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
                : parse(`${item.code}`);

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
                    <p className="source-line-code code">
                      <pre>{result}</pre>
                    </p>
                    {isExistIssues && (
                      <IssueItem issue={issueList[+item.line] || {}} />
                    )}
                  </div>
                </div>
              );
            })}
            {loading && (
              <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center z-100">
                <Spin />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailSubmission;
