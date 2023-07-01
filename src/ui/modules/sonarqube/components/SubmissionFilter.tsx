import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  BugOutlined,
  CloseOutlined,
  DownCircleFilled,
  ExclamationCircleFilled,
  FileTextOutlined,
  InfoCircleFilled,
  SettingOutlined,
  UnlockOutlined,
  UpCircleFilled,
  WarningFilled,
  WarningOutlined,
} from '@ant-design/icons';
import { Collapse, Drawer, DrawerProps, Spin } from 'antd';
import { useSelector } from 'react-redux';

import SonarqubeSelector from '~/adapters/redux/selectors/sonarqube';
import {
  BugType,
  BugTypeConstant,
  SeverityType,
  SeverityTypeConstant,
} from '~/constant/enum';
import useCurrentWidth from '~/hooks/useCurrentWidth';
import { useSonarqube } from '~/adapters/appService/sonarqube.service';

const { Panel } = Collapse;

const SubmissionFilter: React.FC<{
  filters: { type: BugType | ''; file: string; severity: SeverityType | '' };
  setFilters: (val: string) => void;
  componentFiles: any;
  loading: boolean;
}> = ({ filters, setFilters, componentFiles, loading }) => {
  const width = useCurrentWidth();

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
        width: width > 1024 ? '27%' : 'unset',
        // maxHeight: width > 1024 ? '725px' : 'unset',
        height: '100%',
        ...customPanelStyle,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <>
        <Panel
          header={
            <div className="flex items-center">
              <div className="flex-1">
                <span>Type</span>
                {/* {filters.type && (
                    <span className="ml-2 font-normal text-14 label-active-filter">
                      {BugTypeConstant[filters.type]}
                    </span>
                  )} */}
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
                onClick={() => {
                  if (filters.type === bug.value) {
                    handleSetFilter('type', '');
                  } else handleSetFilter('type', bug.value);
                }}
              >
                {bug.icon}
                <span className="ml-2">{bug.label}</span>
              </div>
            );
          })}
        </Panel>

        <Panel
          header={
            <div className="flex items-center">
              <div className="flex-1">
                <span className="font-semibold">Severity</span>
                {/* {filters.severity && (
                    <span className="ml-2 font-normal label-active-filter">
                      {SeverityTypeConstant[filters.severity]}
                    </span>
                  )} */}
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
                onClick={() => {
                  if (filters.severity === item.value) {
                    handleSetFilter('severity', '');
                  } else {
                    handleSetFilter('severity', item.value);
                  }
                }}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </div>
            );
          })}
        </Panel>
        <Panel
          style={{
            // overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
          header={
            <div className="flex items-center">
              <div className="flex-1">
                <span className="font-semibold">File</span>
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
          {loading && <Spin />}

          {!loading &&
            componentFiles?.map((fileItem) => {
              return (
                <div
                  key={JSON.stringify(fileItem)}
                  className={`bug-label mt-2 cursor-pointer pl-4 flex items-center ${
                    filters.file === fileItem?.path ? 'filter-active' : ''
                  }`}
                  onClick={() => {
                    if (filters.file === fileItem?.path) return;
                    handleSetFilter('file', fileItem?.path);
                    if (fileItem?.fileuuid) {
                      handleSetFilter('fileuuid', fileItem?.fileuuid);
                    }
                  }}
                >
                  <FileTextOutlined style={{ color: 'blue' }} />
                  <span className="ml-2">{fileItem?.path}</span>
                </div>
              );
            })}
        </Panel>
      </>
    </Collapse>
  );
};

const SubmissionFilterMobile: React.FC<{
  filters: { type: BugType | ''; file: string; severity: SeverityType | '' };
  setFilters: (val: string) => void;
  open: boolean;
  setOpen: (val: boolean) => void;
  componentFiles: any;
  loading: boolean;
}> = ({ filters, setFilters, open, setOpen, componentFiles, loading }) => {
  const [placement, setPlacement] = useState<DrawerProps['placement']>('left');

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Drawer
        width={300}
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <div className="flex items-center mb-2" onClick={() => setOpen(true)}>
          <SettingOutlined />
          <p className="ml-2 font-semibold">Setting</p>
        </div>
        <SubmissionFilter
          filters={filters}
          setFilters={setFilters}
          componentFiles={componentFiles}
          loading={loading}
        />
      </Drawer>
    </div>
  );
};

export { SubmissionFilter, SubmissionFilterMobile };
