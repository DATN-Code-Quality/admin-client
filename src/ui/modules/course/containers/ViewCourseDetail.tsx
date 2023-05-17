import React, { useEffect } from 'react';

import { Tabs } from 'antd';

import { TableViewAssignment } from '../components/table-view-assignment';
import { TableViewParticipant } from '../components/table-view-participant';

import ViewOrCreateCourse from './ViewOrCreateCourse';

import { useCourse } from '~/adapters/appService/course.service';
import useQuery from '~/hooks/useQuery';
import Card from '~/ui/shared/card';

function ViewCourseDetailContainer() {
  const query = useQuery();
  const { getDetailCourse } = useCourse();
  const type: any = query.get('type');
  const id = query.get('id');

  const [course, setCourse] = React.useState<any>(null);

  useEffect(() => {
    getDetailCourse(id).then((res) => {
      setCourse(res.data.course);
    });
  }, []);

  const items = [
    {
      label: 'Overview',
      key: 'overview',
      children: <ViewOrCreateCourse course={course} initialViewMode />,
    },
    {
      label: 'Participant',
      key: 'participant',
      children: <TableViewParticipant course={course} />,
    },
    {
      label: 'Assignment',
      key: 'assignment',
      children: <TableViewAssignment course={course} />,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey={type || 'overview'} items={items} />
    </>
  );
}

export default ViewCourseDetailContainer;
