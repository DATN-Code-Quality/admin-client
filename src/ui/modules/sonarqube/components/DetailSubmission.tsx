/* eslint-disable import/order */
/* eslint-disable no-plusplus */
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Spin, Drawer } from 'antd';
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';

import IssueItem from './IssueItem';

import { useSonarqube } from '~/adapters/appService/sonarqube.service';
import SonarqubeSelector from '~/adapters/redux/selectors/sonarqube';

import './index.less';

import { LINE_EMPTY_CODE } from '~/constant';
import { Issue, IssueWithSource } from '~/domain/submission';
import {
  ArrowLeftOutlined,
  BookOutlined,
  CloseSquareOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';
import { setIssueSelected } from '~/adapters/redux/actions/sonarqube';
import DetailRule from './DetailRule';
import { useLocation } from 'react-router-dom';

const DetailSubmission: React.FC<{
  courseId: string;
  assignmentId: string;
  submissionId: string;
}> = ({ courseId, assignmentId, submissionId }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { getIssuesWithSource, getIssuesSubmission } = useSonarqube();
  const issueSelected = useSelector(SonarqubeSelector.getIssueSelected);
  const [componentIssue, setComponentIssue] = useState<string>('');

  // const submissionIssues = useSelector(SonarqubeSelector.getSubmissionIssues);
  const [submissionIssues, setSubmissionIssues] = useState({});
  const [loadingIssues, setLoadingIssues] = useState(false);

  const [selected, setSelected] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IssueWithSource[]>([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);

  const issueContainer = useRef(null);

  const handleGetDetail = useCallback(async () => {
    if (!componentIssue) return;
    setLoading(true);
    const response = await getIssuesWithSource(componentIssue);
    if (response.status !== 0) return;
    setData(response.data);
    setLoading(false);
  }, [componentIssue]);

  const handleGetAllIssues = useCallback(async () => {
    if (!courseId || !assignmentId || !submissionId) {
      return;
    }
    setLoadingIssues(true);
    const response = await getIssuesSubmission(
      courseId,
      assignmentId,
      submissionId
    );

    if (response?.status !== 0) return;
    const { data: dataRes } = response;
    const { issues } = dataRes || { components: [], issues: [] };
    const issuesOfComponents: Record<string, unknown> = {};
    issues?.reduce((objectResult, issue) => {
      if (objectResult[issue.component]) {
        const data = [...objectResult[issue.component]];
        data.push(issue);
        objectResult[issue.component] = data;
      } else {
        objectResult[issue.component] = [issue];
      }
      return objectResult;
    }, issuesOfComponents);
    setSubmissionIssues(issuesOfComponents);
    setLoadingIssues(false);
  }, [assignmentId, courseId, submissionId]);

  useEffect(() => {
    handleGetAllIssues();
  }, [handleGetAllIssues]);

  const issueList = useMemo(() => {
    const result: Record<string | number, unknown> = {};
    Object.values(submissionIssues)?.forEach((issueGroup) => {
      (issueGroup as Issue[])?.forEach((issue) => {
        result[issue?.textRange?.endLine] = [
          ...(result[issue?.textRange?.endLine] || []),
          issue,
        ];
      });
    });
    return result;
  }, [submissionIssues]);

  const lineIssueList = useMemo(
    () => Object.keys(issueList || {})?.map((item) => +item),
    [issueList]
  );

  const [ruleSelected, setRuleSelected] = useState<string | null>(null);

  useEffect(() => {
    setComponentIssue(issueSelected?.component);
    // oldComponentIssue.current = issueSelected?.component;
    setSelected(issueSelected);
  }, [issueSelected, issueSelected?.component]);

  useEffect(() => {
    handleGetDetail();
  }, [handleGetDetail]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  const handleSelect = useCallback(
    (item: Issue) => {
      console.log(selected);
      setSelected(item);
      if (componentIssue !== item.component) {
        setComponentIssue(() => item.component);
      }
    },
    [componentIssue]
  );

  useEffect(() => {
    const element = document.getElementById(
      `${selected?.hash}_${JSON.stringify(selected?.textRange)}`
    );
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  }, [selected, componentIssue]);

  const renderListIssues = useCallback(
    (fileName: string, issueData: Issue[]) => {
      const value = fileName.split(':');
      const fileNameShort = value[value.length - 1];
      return (
        <div>
          <p style={{ marginBottom: '8px' }} className="overflow-auto">
            <span className="font-semibold ">File: </span>
            {fileNameShort}
          </p>
          {issueData?.map((item) => {
            if (
              item.message ===
              'Use "java.nio.file.Files#delete" here for better messages on error conditions.'
            ) {
              console.log(item);
            }
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
    if (typeof dataResult === 'string') return dataResult;
    for (let i = 0; i < dataResult.length; i++) {
      try {
        if (
          typeof dataResult[i] === 'string' &&
          contentError.includes(dataResult?.[i]?.replace(/\(\)/g, ''))
        ) {
          dataResult[i] = (
            <span className="s source-line-code-issue">{dataResult[i]}</span>
          ) as unknown as string;
        } else if (
          contentError.includes(
            dataResult?.[i]?.props?.children?.replace(/\(\)/g, '')
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
      } catch (err) {
        console.log(err);
      }
    }

    return dataResult;
  };

  const setEmptyIssue = useCallback(() => {
    dispatch(setIssueSelected(null));
  }, [dispatch]);

  const renderIssueListOptions = useMemo(() => {
    if (width < 1024)
      return (
        <Drawer
          placement="left"
          closable={false}
          onClose={() => setOpen(false)}
          open={open}
          title="Issues"
          extra={<CloseSquareOutlined onClick={() => setOpen(false)} />}
        >
          <div
            style={{
              overflow: 'hidden',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ flex: 1, overflow: 'auto' }}>
              {!loadingIssues &&
                Object.keys(submissionIssues)?.map((file) => {
                  return (
                    <Fragment key={file}>
                      {renderListIssues(file, submissionIssues[file] || [])}
                    </Fragment>
                  );
                })}
              {loadingIssues && <Spin />}
            </div>
          </div>
        </Drawer>
      );
    return (
      <div
        style={{
          overflow: 'hidden',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ height: '44px' }}
        >
          <ArrowLeftOutlined
            size={32}
            className="cursor-pointer"
            onClick={setEmptyIssue}
          />
          <p>Issues</p>
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          {!loadingIssues &&
            Object.keys(submissionIssues)?.map((file) => {
              return (
                <Fragment key={file}>
                  {renderListIssues(file, submissionIssues[file] || [])}
                </Fragment>
              );
            })}
          {loadingIssues && (
            <div className="flex items-center justify-center h-full w-full">
              <Spin />
            </div>
          )}
        </div>
      </div>
    );
  }, [
    loadingIssues,
    open,
    renderListIssues,
    setEmptyIssue,
    submissionIssues,
    width,
  ]);

  const fileNameShort = useMemo(() => {
    const value = componentIssue.split(':');
    if (!value) return '';
    return value[value.length - 1];
  }, [componentIssue]);
  console.log('Issues list ', issueList);

  return (
    <>
      <div className="detail-submission ">
        {renderIssueListOptions}
        <div
          style={{
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {width < 1024 && (
            <p className="font-semibold cursor-pointer" onClick={setEmptyIssue}>
              <ArrowLeftOutlined size={32} className=" mr-2" />
              <span>Back</span>
            </p>
          )}
          <div className="flex items-center justify-between mt-2">
            {width < 1024 && (
              <div className="flex items-center">
                <div
                  onClick={() => setOpen(true)}
                  className="ml-2 flex items-center"
                >
                  <p className="ml-2 font-semibold">Issues</p>
                  <BookOutlined />
                </div>
              </div>
            )}
            <p
              className="mb-2 text-right"
              style={{ height: width >= 1024 ? '44px' : 'unset' }}
            >
              {fileNameShort}
            </p>
          </div>
          <div className="issues-container" ref={issueContainer}>
            {Object.values(issueList).map((itemI) =>
              itemI
                .filter((item) => !item.textRange)
                .map((issueItem) => (
                  <div
                    className="pl-6 line-code-container w-full"
                    style={{
                      paddingTop: 0,
                      paddingBottom: '12px',
                      background: '#f3f3f3',
                      paddingRight: '32px',
                      width: '100%',
                    }}
                    key={JSON.stringify(issueItem)}
                  >
                    <div className="line-index" />
                    <IssueItem
                      issue={issueItem}
                      style={{ width: '100%' }}
                      setRuleSelected={setRuleSelected}
                    />
                  </div>
                ))
            )}
            {data?.map((item, index) => {
              const isExistIssues =
                item.code !== LINE_EMPTY_CODE &&
                lineIssueList.includes(+item.line);

              const result = isExistIssues
                ? addClassIfConditionSatisfied(
                    item.code,
                    (issueList[+item.line] as Issue)?.textRange?.startOffset,
                    (issueList[+item.line] as Issue)?.textRange?.endOffset,
                    'source-line-code-issue'
                  )
                : parse(`${item.code}`);

              const isActiveLine =
                isExistIssues &&
                (issueList[+item.line][0] as Issue)?.key === selected?.key;

              return (
                <div
                  key={`${item.code}_${item.line}`}
                  id={
                    isExistIssues
                      ? `${issueList[+item.line][0]?.hash}_${JSON.stringify(
                          issueList[+item.line][0]?.textRange
                        )}`
                      : ''
                  }
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

                    {isExistIssues &&
                      issueList[+item.line]?.map((issueItemLine) => {
                        return (
                          <IssueItem
                            issue={issueItemLine || null}
                            style={{ maxWidth: 'unset' }}
                            setRuleSelected={setRuleSelected}
                          />
                        );
                      })}
                  </div>
                </div>
              );
            })}
            {loading && loadingIssues && (
              <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center z-100">
                <Spin />
              </div>
            )}
            <div className="flex-1 bg-white">
              <div className="line-index" />
            </div>
            <DetailRule
              ruleKey={ruleSelected}
              setRuleSelected={setRuleSelected}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailSubmission;
