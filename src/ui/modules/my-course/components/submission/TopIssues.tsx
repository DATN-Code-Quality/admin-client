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
import ProTable from '@ant-design/pro-table';
import { Drawer, Select } from 'antd';
import Button from 'antd-button-color';
import parse from 'html-react-parser';

import { useAssignment } from '~/adapters/appService/assignment.service';
import { useCourse } from '~/adapters/appService/course.service';
import { BugType, SeverityType, SeverityTypeConstant } from '~/constant/enum';
import TableToolbar from '~/ui/shared/toolbar';
import BaseFilter from '~/ui/shared/forms/baseFilter';
import { metaFilterTopIssues } from './props';
import { MAP_LANGUAGE } from '~/constant';

const ISSUE_LIMIT_OPTIONS = [
  { value: 5, label: 'Top 5' },
  { value: 10, label: 'Top 10' },
  { value: 20, label: 'Top 20' },
];

const TopIssues = ({ courseId, assignmentId, type }) => {
  const { getTopIssuesAsssignment } = useAssignment();
  const { getTopIssuesCourse } = useCourse();
  const [ruleSelected, setRuleSelected] = useState(null);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [filter, setFilter] = useState({
    limit: ISSUE_LIMIT_OPTIONS[1].value,
  });

  const getData = async () => {
    console.log(filter);
    setLoading(true);
    let response;
    if (type === 'assignment') {
      response = await getTopIssuesAsssignment(courseId, assignmentId, filter);
    } else {
      response = await getTopIssuesCourse(courseId, filter);
    }

    if (response?.status !== 0) {
      setLoading(false);
      return;
    }
    setData(response?.data?.issues?.rules);
    setLanguages(response?.data?.languages);
    setLoading(false);
  };

  const languageOptions = useMemo(() => {
    return languages.map((language) => {
      return MAP_LANGUAGE.find((item) => item.value === language);
    });
  }, [languages]);

  useEffect(() => {
    getData();
  }, [filter]);
  const columns = [
    {
      title: 'Key',
      dataIndex: 'rule',
      key: 'rule',
      fixed: 'left',
      render: (val, record) => {
        return (
          <Button
            type="link"
            style={{
              color: '#236a97',
            }}
            onClick={() => {
              setRuleSelected(record?.rule);
            }}
          >
            {val.key}
          </Button>
        );
      },
    },
    {
      title: 'Name',
      dataIndex: 'rule',
      key: 'rule',
      render: (val) => {
        return <span>{val.name}</span>;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'count',
      key: 'count',
      align: 'center',
      render: (val) => {
        return (
          <b
            style={{
              color: 'red',
            }}
          >
            {val}
          </b>
        );
      },
    },
  ];

  const handleFilter = (type, value) => {
    console.log(type, value);
    console.log('filter', filter);
    setFilter((prevFilter) => {
      console.log('prevFilter', prevFilter);
      return {
        ...prevFilter,
        [type]: value,
      };
    });
  };

  return (
    <div>
      <ProTable
        search={false}
        dataSource={data}
        columns={columns}
        scroll={{ x: '800px' }}
        responsive
        className="responsive-table top-issues"
        loading={loading}
        options={{
          reload: false,
        }}
        pagination={false}
        toolBarRender={() => [
          <Select
            loading={loading}
            key="limit"
            options={ISSUE_LIMIT_OPTIONS}
            defaultValue={ISSUE_LIMIT_OPTIONS[1].value}
            placeholder="Limit"
            onChange={(option) => handleFilter('limit', option)}
          />,
          <Select
            loading={loading}
            key="language"
            options={languageOptions}
            placeholder="Language"
            onChange={(option) => {
              console.log('option', option);
              handleFilter('language', option);
            }}
          />,
        ]}
      />
      <IssueDetail
        data={ruleSelected}
        open={!!ruleSelected}
        onClose={() => setRuleSelected(null)}
      />
    </div>
  );
};

const IssueDetail = ({ data, open, onClose }) => {
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
    <Drawer
      headerStyle={{
        background: 'black',
      }}
      title={
        <div className="detail-rule flex items-center justify-between">
          <p
            className="title "
            style={{ color: 'white', fontWeight: 600, marginBottom: 0 }}
          >
            {data?.name}
          </p>
        </div>
      }
      placement="bottom"
      width={500}
      onClose={onClose}
      open={open}
    >
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
    </Drawer>
  );
};

export default TopIssues;
