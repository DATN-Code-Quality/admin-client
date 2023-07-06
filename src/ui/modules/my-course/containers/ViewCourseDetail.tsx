import React, { useEffect, useMemo, useState } from 'react';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';

import { TableViewAssignment } from '../components/table-view-assignment';
import { TableViewParticipant } from '../components/table-view-participant';

import ViewCourse from './ViewCourse';

import { useCourse } from '~/adapters/appService/course.service';
import { authSelector } from '~/adapters/redux/selectors/auth';
import { Role, SubRole } from '~/constant/enum';
import ROUTE from '~/constant/routes';
import useQuery from '~/hooks/useQuery';
import CourseMetricsStatistic from '~/ui/shared/course-statistic';
import CourseSubmissionsStatistic from '~/ui/shared/course-statistic/CourseSubmissionsStatistic';

function ViewCourseDetailContainer() {
  const query = useQuery();
  const navigate = useNavigate();
  const { getDetailCourse } = useCourse();

  const [roleInCourse, setRoleInCourse] = useState();

  const type: any = query.get('type') || 'overview';
  const courseId = query.get('course_id');

  const [course, setCourse] = React.useState<any>(null);

  useEffect(() => {
    getDetailCourse(courseId)
      .then((res) => {
        setRoleInCourse(res.data.role);
        setCourse(res.data.course);
      })
      .catch((err) => {
        // TODO: handle error
      });
  }, [courseId]);

  const items = [
    {
      label: 'Course Detail',
      key: 'overview',
      children: <ViewCourse course={course} initialViewMode />,
    },
    {
      label: 'Participants',
      key: 'participant',
      children: <TableViewParticipant course={course} />,
    },
    {
      label: 'Assignments',
      key: 'assignment',
      children: <TableViewAssignment course={course} />,
    },
  ];

  const extraTab = useMemo(
    () => [
      {
        label: 'Submissions Report',
        key: 'course-submissions-report',
        children: <CourseSubmissionsStatistic courseId={course?.id} />,
        hidden: true,
      },
      {
        label: 'Metrics Report',
        key: 'course-metrics-report',
        children: <CourseMetricsStatistic courseId={course?.id} />,
        hidden: true,
      },
    ],
    [course?.id]
  );

  return (
    <>
      <p
        className="cursor-pointer mb-2"
        style={{
          display: 'inline-block',
        }}
        onClick={() => {
          navigate(ROUTE.MY_COURSE.LIST);
        }}
      >
        <ArrowLeftOutlined size={32} className=" mr-2" />
        <span>Back</span>
      </p>
      <Tabs
        destroyInactiveTabPane
        defaultActiveKey={type}
        items={
          roleInCourse === SubRole.TEACHER ? [...items, ...extraTab] : items
        }
      />
    </>
  );
}

export default ViewCourseDetailContainer;
