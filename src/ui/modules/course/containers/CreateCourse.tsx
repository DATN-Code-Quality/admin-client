import React from 'react';

import { PageHeader } from 'antd';

import { FormAddCourse } from '../components/form-add-course';

import useQuery from '~/hooks/useQuery';
import Card from '~/ui/shared/card';
import Loading from '~/ui/shared/loading';

const CreateCourse = () => {
  const query = useQuery();
  const id: any = query.get('id');
  const renderTitle = () => {
    const preTitle = id ? 'Cập nhật ' : 'Tạo mới ';
    return `${preTitle}Course`;
  };
  return (
    <Card className="card-edit-view">
      <PageHeader className="site-page-header" title={renderTitle()} ghost />
      <FormAddCourse id={id} />
    </Card>
  );
};

export default CreateCourse;
