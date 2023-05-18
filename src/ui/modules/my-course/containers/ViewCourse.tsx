import React, { PageHeader } from 'antd';

import { FormAddCourse } from '../components/form-add-course';

import useQuery from '~/hooks/useQuery';
import Card from '~/ui/shared/card';

const ViewCourse = ({ course, initialViewMode = false }) => {
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
    return `${preTitle}khoá học`;
  };
  return (
    <Card className="card-edit-view">
      <PageHeader className="site-page-header" title={renderTitle()} ghost />
      <FormAddCourse course={course} initialViewMode />
    </Card>
  );
};

export default ViewCourse;
