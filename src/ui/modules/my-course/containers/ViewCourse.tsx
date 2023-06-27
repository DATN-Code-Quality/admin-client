import React, { PageHeader } from 'antd';

import { FormAddCourse } from '../components/form-add-course';

import useQuery from '~/hooks/useQuery';
import Card from '~/ui/shared/card';

const ViewCourse = ({ course, initialViewMode = false }) => {
  const query = useQuery();
  const id: any = query.get('course_id');
  const renderTitle = () => {
    let preTitle = 'Create ';
    if (id && initialViewMode) {
      preTitle = 'Detail ';
    }
    if (id && !initialViewMode) {
      preTitle = 'Edit ';
    }
    return `${preTitle}course`;
  };
  return (
    <Card className="card-edit-view">
      <PageHeader className="site-page-header" title={renderTitle()} ghost />
      <FormAddCourse course={course} initialViewMode />
    </Card>
  );
};

export default ViewCourse;
