import React, { useCallback } from 'react';

import './index.less';
import { BugOutlined, WarningOutlined } from '@ant-design/icons';

import { BugType } from '~/constant/enum';
import { Issue } from '~/domain/submission';
// import { formattedCodeSmell } from '~/utils';

const IssueItem: React.FC<{
  issue: Issue;
  handleSetIssue?: (val: Issue) => void;
  setRuleSelected: (val: string) => void;
}> = ({ issue, handleSetIssue, setRuleSelected }) => {
  const renderErrorPosition = useCallback(
    (errorPosition: {
      startLine: number;
      endLine: number;
      startOffset: number;
      endOffset: number;
    }) => {
      const { startLine, endLine, startOffset, endOffset } =
        errorPosition || {};
      const errorPositionStr = `${startOffset} ${
        startOffset !== endLine ? `- ${endLine}` : ''
      }`;
      const errorPositionOffsetStr = `${startOffset} ${
        startOffset !== endOffset ? `- ${endOffset}` : ''
      }`;
      return (
        <>
          {startLine && endLine && (
            <>
              <p>
                Error line :{' '}
                <span className="issue-type">{errorPositionStr}</span>
              </p>
              <p>
                Error offset :{' '}
                <span className="issue-type">{errorPositionOffsetStr}</span>
              </p>
            </>
          )}
        </>
      );
    },
    []
  );
  const renderBugError = useCallback(
    (
      type: string,
      errorPosition: {
        startLine: number;
        endLine: number;
        startOffset: number;
        endOffset: number;
      }
    ) => {
      switch (type) {
        case BugType.CODE_SMELL:
          return (
            <div className="issue-type-container">
              <p>
                <WarningOutlined style={{ fontWeight: 800 }} />
                {/* <span className="issue-type">{formattedCodeSmell(type)}</span> */}
                <span className="issue-type">Code Smell</span>
              </p>

              {renderErrorPosition(errorPosition)}
            </div>
          );
        case BugType.BUG:
          return (
            <div className="issue-type-container">
              <p>
                <BugOutlined />
                <span className="issue-type">Bug</span>
              </p>
              {renderErrorPosition(errorPosition)}
            </div>
          );
        default:
          return <></>;
      }
    },
    [renderErrorPosition]
  );
  return (
    <div key={issue.key} className="issue-component">
      <div
        className="issue-content"
        onClick={() => {
          if (typeof handleSetIssue === 'function') handleSetIssue(issue);
        }}
      >
        <p>{issue.message}</p>
        <p
          className="issue-rule-container"
          onClick={(e) => {
            e.stopPropagation();
            setRuleSelected(issue.rule);
          }}
        >
          Rule : <span className="issue-rule">{issue.rule}</span>
        </p>
        <div />
      </div>
      <div>{renderBugError(issue.type, issue?.textRange)}</div>
    </div>
  );
};

export default IssueItem;
