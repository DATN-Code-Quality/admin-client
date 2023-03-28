import React from 'react';

import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TableViewPartner } from '../components/table-view-partner';
import ROUTE from '~/src/constant/routes';

function ViewArticleContainer() {
  const navigate = useNavigate();

  return (
    <div>
      <TableViewPartner />
    </div>
  );
}

export default ViewArticleContainer;
