import React from 'react';

import { Tabs } from 'antd';

import { TableViewAssignment } from '../components/table-view-assignment';
import { TableViewParticipant } from '../components/table-view-participant';

import ViewOrCreateCourse from './ViewOrCreateCourse';

import useQuery from '~/hooks/useQuery';
import Card from '~/ui/shared/card';

function ViewCourseDetailContainer() {
  const query = useQuery();
  const type: any = query.get('type');
  const id = query.get('id');
  const items = [
    {
      label: 'Overview',
      key: 'overview',
      children: <ViewOrCreateCourse initialViewMode />,
    },
    {
      label: 'Participant',
      key: 'participant',
      children: <TableViewParticipant />,
    },
    {
      label: 'Assignment',
      key: 'assignment',
      children: <TableViewAssignment courseId={id} />,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey={type || 'overview'} items={items} />
    </>
  );
}

export default ViewCourseDetailContainer;
