import React from 'react';

import { PageHeader } from 'antd';

import { FormAddAssignment } from '../components/form-add-assignment';

import useQuery from '~/hooks/useQuery';
import Card from '~/ui/shared/card';
import Loading from '~/ui/shared/loading';

const ViewOrCreateAssignment = ({ initialViewMode = false }) => {
  const query = useQuery();
  const courseId: any = query.get('course_id');
  const assignmentId: any = query.get('assignment_id');
  const renderTitle = () => {
    let preTitle = 'Tạo mới ';
    if (assignmentId && initialViewMode) {
      preTitle = 'Thông tin ';
    }
    if (assignmentId && !initialViewMode) {
      preTitle = 'Cập nhật ';
    }
    return `${preTitle}Assignment`;
  };
  return (
    <Card className="card-edit-view">
      <PageHeader className="site-page-header" title={renderTitle()} ghost />
      <FormAddAssignment
        courseId={courseId}
        id={assignmentId}
        initialViewMode={initialViewMode}
      />
    </Card>
  );
};

export default ViewOrCreateAssignment;
