/* eslint-disable import/order */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import {
  BugOutlined,
  BulbOutlined,
  CloseOutlined,
  DownCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
  UpCircleFilled,
  WarningFilled,
  WarningOutlined,
} from '@ant-design/icons';
import { Drawer, Spin } from 'antd';

import parse from 'html-react-parser';

import { useSonarqube } from '~/adapters/appService/sonarqube.service';

import './index.less';

import { BugType, SeverityType, SeverityTypeConstant } from '~/constant/enum';

const DetailRule: React.FC<{
  setRuleSelected: (val: string) => void;
  ruleKey: string | null;
}> = ({ setRuleSelected, ruleKey }) => {
  const { getRuleDetail } = useSonarqube();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<{
    key: string;
    repo: string;
    lang: string;
    langName: string;
    name: string;
    type: string;
    severity: string;
    debtRemFnOffset: string;
    htmlDesc: string;
    mdDesc: string;
    status: string;
    scope: string;
    createdAt: string;
  } | null>();

  useEffect(() => {
    if (ruleKey) {
      setOpen(true);
    }
  }, [ruleKey]);

  const handleFetchRuleDetail = useCallback(async () => {
    if (!ruleKey) return;
    setLoading(true);
    const response = await getRuleDetail(ruleKey);
    if (response.status !== 0) return;
    setData(response.data);
    setLoading(false);
  }, [ruleKey]);

  useEffect(() => {
    handleFetchRuleDetail();
  }, [handleFetchRuleDetail]);

  const onClose = () => {
    setOpen(false);
    setRuleSelected('');
  };

  const renderBugType = useCallback((type: BugType) => {
    switch (type) {
      case BugType.CODE_SMELL:
        return (
          <div className="issue-type-container">
            <p>
              <WarningOutlined style={{ fontWeight: 800 }} />
              <span className="issue-type">Code Smell</span>
            </p>
          </div>
        );
      case BugType.BUG:
        return (
          <div className="issue-type-container">
            <p>
              <BugOutlined />
              <span className="issue-type">Bug</span>
            </p>
          </div>
        );
      default:
        return <></>;
    }
  }, []);

  const severityConstant = useMemo(() => {
    return {
      [SeverityType.BLOCKER]: {
        icon: (
          <ExclamationCircleFilled style={{ color: 'red', fontWeight: 600 }} />
        ),
        label: SeverityTypeConstant.BLOCKER,
      },
      [SeverityType.CRITICAL]: {
        icon: <WarningFilled style={{ color: '#a7a73a' }} />,
        label: SeverityTypeConstant.CRITICAL,
      },
      [SeverityType.INFO]: {
        icon: <InfoCircleFilled style={{ color: 'blue' }} />,
        label: SeverityTypeConstant.INFO,
      },
      [SeverityType.MAJOR]: {
        icon: <UpCircleFilled style={{ color: 'red' }} />,
        label: SeverityTypeConstant.MAJOR,
      },
      [SeverityType.MINOR]: {
        icon: <DownCircleFilled style={{ color: 'green' }} />,
        label: SeverityTypeConstant.MINOR,
      },
    };
  }, []);

  const severity = useMemo(() => {
    if (!data?.severity) return { label: '', icon: '' };
    return severityConstant[data?.severity as SeverityType];
  }, [data?.severity, severityConstant]);

  return (
    <>
      <Drawer
        title={
          <div className="detail-rule flex items-center justify-between">
            <p className="title">
              <span>
                <BulbOutlined style={{ color: 'blue', marginRight: '8px' }} />
              </span>
              {data?.name}
            </p>
            <CloseOutlined style={{ right: '20px', color: 'white' }} />
          </div>
        }
        placement="bottom"
        width={500}
        onClose={onClose}
        open={open}
      >
        {!loading && (
          <>
            <p className="medium-title">{data?.name}</p>
            <div className="flex items-center ">
              {renderBugType(data?.type as BugType)}
              <div
                className={`bug-label cursor-pointer pl-4 `}
                style={{ marginTop: 0 }}
              >
                {severity.icon}
                <span className="ml-2">{severity.label}</span>
              </div>
            </div>
            <div className="mt-4 rule">
              {data?.htmlDesc && parse(data?.htmlDesc)}
            </div>
          </>
        )}
        {loading && (
          <div className="h-full flex items-center justify-center">
            <Spin />
          </div>
        )}
      </Drawer>
    </>
  );
};

export default DetailRule;
