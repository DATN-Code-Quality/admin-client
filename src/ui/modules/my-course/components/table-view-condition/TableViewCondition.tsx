import React, { useEffect } from 'react';

import { Space } from 'antd';

import { columnTableCondition, metaFormUpdateCondition } from './props';

import { PAGE_SIZE_OPTIONS } from '~/constant';
import useList from '~/hooks/useList';
import BaseModal from '~/ui/shared/modal';
import { ButtonType } from '~/ui/shared/modal/props';
import BaseTable from '~/ui/shared/tables';

import './TableViewCondition.less';

function TableViewCondition({
  data,
  idKey,
  handleUpdateItem,
  handleDeleteItem,
}) {
  const handleGetData = async (args?) => {
    return data;
  };

  const [list, { onPageChange, onUpdateList }] = useList({
    fetchFn: (args) => handleGetData(args),
  });

  useEffect(() => {
    onUpdateList(data);
  }, [data]);

  const columnTableProps = () => {
    const columns = [
      ...columnTableCondition(),
      {
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
                mode={ButtonType.BLOCK}
                isDelete
              />
            </Space>
          );
        },
      },
    ];

    return columns;
  };

  return (
    <>
      <BaseTable
        idKey={idKey}
        columns={columnTableProps()}
        data={list}
        paginationProps={{
          showSizeChanger: true,
          pageSizeOptions: PAGE_SIZE_OPTIONS,
        }}
        onChange={onPageChange}
      />
    </>
  );
}

export default TableViewCondition;
