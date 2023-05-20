import React, { useEffect } from 'react';

import { Tabs } from 'antd';

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
      label: 'Thông tin khoá học',
      key: 'overview',
      children: <ViewOrCreateCourse course={course} initialViewMode />,
    },
    {
      label: 'Thành viên khoá học',
      key: 'participant',
      children: <TableViewParticipant course={course} />,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey={type || 'overview'} items={items} />
    </>
  );
}

export default ViewCourseDetailContainer;
