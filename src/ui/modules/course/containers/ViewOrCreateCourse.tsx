import React from 'react';

import { PageHeader } from 'antd';

import { FormAddCourse } from '../components/form-add-course';

import useQuery from '~/hooks/useQuery';
import Card from '~/ui/shared/card';
import Loading from '~/ui/shared/loading';

const ViewOrCreateCourse = ({ course, initialViewMode = false }) => {
  const query = useQuery();
  const id: any = query.get('id');
  const renderTitle = () => {
    let preTitle = 'Tạo mới ';
    if (id && initialViewMode) {
      preTitle = 'Thông tin ';
    }
    if (id && !initialViewMode) {
      preTitle = 'Cập nhật ';
    }
    return `${preTitle}Course`;
  };
  return (
    <Card className="card-edit-view">
      <PageHeader className="site-page-header" title={renderTitle()} ghost />
      <FormAddCourse course={course} initialViewMode={initialViewMode} />
    </Card>
  );
};

export default ViewOrCreateCourse;
