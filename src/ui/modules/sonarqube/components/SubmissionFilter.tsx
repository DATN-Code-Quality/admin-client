import React, { useCallback, useMemo } from 'react';

import {
  BugOutlined,
  CloseOutlined,
  DownCircleFilled,
  ExclamationCircleFilled,
  FileTextOutlined,
  InfoCircleFilled,
  UnlockOutlined,
  UpCircleFilled,
  WarningFilled,
  WarningOutlined,
} from '@ant-design/icons';
import { Collapse } from 'antd';
import { useSelector } from 'react-redux';

import SonarqubeSelector from '~/adapters/redux/selectors/sonarqube';
import {
  BugType,
  BugTypeConstant,
  SeverityType,
  SeverityTypeConstant,
} from '~/constant/enum';

const { Panel } = Collapse;

const SubmissionFilter: React.FC<{
  filters: { type: BugType | ''; file: string; severity: SeverityType | '' };
  setFilters: (val: string) => void;
  values?: Map<BugType, number>;
}> = ({ filters, setFilters, values }) => {
  const issuesOfComponents = useSelector(SonarqubeSelector.getSubmissionIssues);
  const bugTypeMap = values ?? ({} as Map<BugType, number>);

  const bugTypes = useMemo(
    () => [
      {
        icon: <WarningOutlined style={{ color: '#6d7a25' }} />,
        label: BugTypeConstant.CODE_SMELL,
        value: BugType.CODE_SMELL,
      },
      {
        icon: <BugOutlined style={{ color: 'red' }} />,
        label: BugTypeConstant.BUG,
        value: BugType.BUG,
      },
      {
        icon: <UnlockOutlined style={{ color: 'blue' }} />,
        label: BugTypeConstant.VULNERABILITY,
        value: BugType.VULNERABILITY,
      },
    ],
    []
  );

  const severity = useMemo(
    () => [
      {
        icon: (
          <ExclamationCircleFilled style={{ color: 'red', fontWeight: 600 }} />
        ),
        label: SeverityTypeConstant.BLOCKER,
        value: SeverityType.BLOCKER,
      },
      {
        icon: <WarningFilled style={{ color: '#a7a73a' }} />,
        label: SeverityTypeConstant.CRITICAL,
        value: SeverityType.CRITICAL,
      },
      {
        icon: <InfoCircleFilled style={{ color: 'blue' }} />,
        value: SeverityType.INFO,
        label: SeverityTypeConstant.INFO,
      },
      {
        icon: <UpCircleFilled style={{ color: 'red' }} />,
        label: SeverityTypeConstant.MAJOR,
        value: SeverityType.MAJOR,
      },
      {
        icon: <DownCircleFilled style={{ color: 'green' }} />,
        label: SeverityTypeConstant.MINOR,
        value: SeverityType.MINOR,
      },
    ],
    []
  );

  const handleSetFilter = useCallback(
    (name: string, value: string) => {
      setFilters((prev) => ({ ...prev, [name]: value }));
    },
    [setFilters]
  );

  const customPanelStyle = {
    borderRadius: 4,
    border: 0,
    overflow: 'hidden',
  };

  return (
    <Collapse
      defaultActiveKey={['1', '2', '3']}
      bordered={false}
      style={{
        backgroundColor: '#f0f2f5',
        minWidth: '30%',
        ...customPanelStyle,
      }}
    >
      <Panel
        header={
          <div className="flex items-center">
            <div className="flex-1">
              <span>Type</span>
              {filters.type && (
                <span className="ml-2 font-normal text-14 label-active-filter">
                  {BugTypeConstant[filters.type]}
                </span>
              )}
            </div>
            {filters.type && (
              <CloseOutlined
                className="ml-auto w-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setFilters((prev) => ({ ...prev, type: '' }));
                }}
              />
            )}
          </div>
        }
        key="1"
        style={{ fontWeight: 600 }}
      >
        {bugTypes?.map((bug) => {
          return (
            <div
              key={bug.label}
              className={`bug-label cursor-pointer pl-4 ${
                filters.type === bug.value ? 'filter-active' : ''
              }`}
              onClick={() => handleSetFilter('type', bug.value)}
              style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}
            >
              <span>
              {bug.icon}
              <span className="ml-2">{bug.label}</span>
              </span>
              <span>{bugTypeMap[bug.value]??0}</span>
              
            </div>
          );
        })}
      </Panel>
      <Panel
        header={
          <div className="flex items-center">
            <div className="flex-1">
              <span className="font-semibold">File</span>
              {filters.file && (
                <span className="ml-2 font-normal label-active-filter">
                  {filters.file}
                </span>
              )}
            </div>

            {filters.file && (
              <CloseOutlined
                className="ml-auto w-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setFilters((prev) => ({ ...prev, file: '' }));
                }}
              />
            )}
          </div>
        }
        key="2"
      >
        {Object.keys(issuesOfComponents || {})?.map((issueKey) => {
          const value = issueKey.split(':');
          const fileNameShort = value[value.length - 1];

          return (
            <div
              key={issueKey}
              className={`bug-label mt-2 cursor-pointer pl-4 ${
                filters.file === fileNameShort ? 'active' : ''
              }`}
              onClick={() => handleSetFilter('file', fileNameShort)}
            >
              <FileTextOutlined style={{ color: 'blue' }} />
              <span className="ml-2">{fileNameShort}</span>
            </div>
          );
        })}
      </Panel>

      <Panel
        header={
          <div className="flex items-center">
            <div className="flex-1">
              <span className="font-semibold">Severity</span>
              {filters.severity && (
                <span className="ml-2 font-normal label-active-filter">
                  {SeverityTypeConstant[filters.severity]}
                </span>
              )}
            </div>
            {filters.severity && (
              <CloseOutlined
                className="ml-auto w-10"
                onClick={(e) => {
                  e.stopPropagation();
                  setFilters((prev) => ({ ...prev, severity: '' }));
                }}
              />
            )}
          </div>
        }
        key="3"
      >
        {severity?.map((item) => {
          return (
            <div
              key={item.label}
              className={`bug-label cursor-pointer pl-4 ${
                filters.severity === item.value ? 'filter-active' : ''
              }`}
              onClick={() => handleSetFilter('severity', item.value)}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </div>
          );
        })}
      </Panel>
    </Collapse>
  );
};

export default SubmissionFilter;
