import React, { useEffect } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';

import { TableViewParticipant } from '../components/table-view-participant';

import ViewOrCreateCourse from './ViewOrCreateCourse';

import { useCourse } from '~/adapters/appService/course.service';
import ROUTE from '~/constant/routes';
import useQuery from '~/hooks/useQuery';
import Card from '~/ui/shared/card';
import CourseStatistic from '~/ui/shared/course-statistic';

function ViewCourseDetailContainer() {
  const query = useQuery();
  const navigate = useNavigate();

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
      label: 'Course Details',
      key: 'overview',
      children: <ViewOrCreateCourse course={course} initialViewMode />,
    },
    {
      label: 'Participants',
      key: 'participant',
      children: <TableViewParticipant course={course} />,
    },
    {
      label: 'Statistics',
      key: 'course-report',
      children: <CourseStatistic courseId={course?.id} />,
    },
  ];

  return (
    <>
      <p
        className="cursor-pointer mb-2"
        style={{
          display: 'inline-block',
        }}
        onClick={() => {
          navigate(ROUTE.COURSE.LIST);
        }}
      >
        <ArrowLeftOutlined size={32} className=" mr-2" />
        <span>Back</span>
      </p>
      <Tabs defaultActiveKey={type || 'overview'} items={items} />
    </>
  );
}

export default ViewCourseDetailContainer;
