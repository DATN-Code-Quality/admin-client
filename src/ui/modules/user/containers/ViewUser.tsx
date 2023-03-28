import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TableViewUser } from '../components/table-view-user';
import ROUTE from '~/src/constant/routes';

function ViewUserContainer() {
  const navigate = useNavigate();

  return (
    <div>
      <TableViewUser />
    </div>
  );
}

export default ViewUserContainer;
