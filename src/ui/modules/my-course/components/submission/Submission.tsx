/* eslint-disable import/order */
import React from 'react';

import { Assignment } from '~/domain/assignment';
import './style.css';

import { TabsProps } from 'antd';

import Statistic from './Statistic';

import { Tabs } from 'antd';
import SubmissionTab from './SubmissionTab';

const SubmissionComponent: React.FC<{ assignment: Assignment }> = ({
  assignment,
}) => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps['items'] = [
    {
      key: 'statistic',
      label: `Statistic`,
      children: (
        <Statistic
          courseId={assignment?.courseId}
          assignmentId={assignment?.id}
        />
      ),
    },
    {
      key: 'submission',
      label: `Submission`,
      children: <SubmissionTab assignment={assignment} />,
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

export default SubmissionComponent;
