import React from 'react';

import { Tabs } from 'antd';

import { TableViewParticipant } from '../components/table-view-participant';

import useQuery from '~/hooks/useQuery';
import Card from '~/ui/shared/card';

function ViewCourseDetailContainer() {
  const query = useQuery();
  const type: any = query.get('type');
  const items = [
    {
      label: 'Overview',
      key: 'overview',
      children: <TableViewParticipant />,
    },
    {
      label: 'Participant',
      key: 'participant',
      children: <TableViewParticipant />,
    },
    {
      label: 'Assignment',
      key: 'assignment',
      children: <TableViewParticipant />,
    },
    {
      label: 'Submission',
      key: 'submission',
      children: <TableViewParticipant />,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey={type || 'overview'} items={items} />
    </>
  );
}

export default ViewCourseDetailContainer;
