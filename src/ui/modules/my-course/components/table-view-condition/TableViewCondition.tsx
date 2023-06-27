import React, { useEffect } from 'react';

import { Space } from 'antd';

import { columnTableCondition, metaFormUpdateCondition } from './props';

import useList from '~/hooks/useList';
import BaseModal from '~/ui/shared/modal';
import { ButtonType } from '~/ui/shared/modal/props';
import BaseTable from '~/ui/shared/tables';

import './TableViewCondition.less';

function TableViewCondition({
  data,
  idKey,
  readOnly = false,
  handleUpdateItem = (record) => {},
  handleDeleteItem = (record) => {},
}) {
  const handleGetData = async (args?) => {
    console.log('data', data);
    return data;
  };

  const [list, { onPageChange, onUpdateList }] = useList({
    fetchFn: (args) => handleGetData(args),
  });

  useEffect(() => {
    onUpdateList(data);
  }, [data]);

  const columnTableProps = () => {
    const columns = [...columnTableCondition()];

    if (!readOnly) {
      columns.push({
        dataIndex: 'action',
        title: 'Action',
        width: 100,
        render: (_, record, index) => {
          const meta = metaFormUpdateCondition(record);
          return (
            <Space size="small">
              <BaseModal
                onOkFn={handleUpdateItem}
                itemTitle=""
                id={record[idKey]}
                mode={ButtonType.EDIT}
                meta={meta}
              />
              <BaseModal
                onOkFn={() => handleDeleteItem(record[idKey])}
                itemTitle=""
                id={record[idKey]}
                mode={ButtonType.DELETE}
                isDelete
              />
            </Space>
          );
        },
      });
    }

    return columns;
  };

  return (
    <>
      <BaseTable
        idKey={idKey}
        columns={columnTableProps()}
        data={list}
        disablePagination
      />
    </>
  );
}

export default TableViewCondition;
