import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import { TableViewCourse } from '../components/table-view-course';

import ROUTE from '~/constant/routes';

function ViewCourseListContainer() {
  const navigate = useNavigate();

  return (
    <div>
      <TableViewCourse />
    </div>
  );
}

export default ViewCourseListContainer;
