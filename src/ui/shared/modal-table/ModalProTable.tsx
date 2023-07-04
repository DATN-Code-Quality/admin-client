import React from 'react';

import { Modal } from 'antd';

import BaseFilter from '../forms/baseFilter';
import BaseTable from '../tables';

import { PAGE_SIZE_OPTIONS } from '~/constant';
import useList from '~/hooks/useList';
import TableToolbar from '~/ui/shared/toolbar';
import './ModalProTable.less';
import ProTable from '@ant-design/pro-table';
import Button from 'antd-button-color';
import { ExportOutlined } from '@ant-design/icons';
import { handleExportToExcel } from '~/utils';

export interface ModalTableProps {
  idKey?: string;
  title?: string;
  baseFilterMeta?: any;
  columns: any;
  defaultFilters?: any;
  fetchFn: (args) => Promise<any>;
  onOk: (values) => Promise<any>;
  onCancel: () => void;
}

const ModalProTable: React.FC<ModalTableProps> = ({
  idKey = 'id',
  title,
  baseFilterMeta,
  columns,
  defaultFilters,
  fetchFn,
  onOk,
  onCancel,
}) => {
  const [
    list,
    { onPageChange, onAddItem, onEditItem, onFilterChange, onUpdateList },
  ] = useList({
    fetchFn,
    defaultPageSize: 5,
    defaultFilters,
  });

  const handleOk = (values: any): Promise<any> => {
    // const resultList = list.items.filter((item) =>
    //   importIds.includes(item[idKey])
    // );
    return onOk().then((resp) => {
      return resp;
    });
  };

  const handleClose = () => {
    onCancel?.();
  };

  const tableColumns = [...columns];

  return (
    <Modal
      open
      closable
      confirmLoading={list.isLoading}
      onOk={handleOk}
      onCancel={handleClose}
      width="100%"
    >
      {baseFilterMeta && (
        <BaseFilter
          loading={list.isLoading}
          meta={baseFilterMeta}
          onFilter={onFilterChange}
          style={{ marginTop: '24px' }}
        />
      )}
      <div className="mt-4 mb-4" />
      <h2>{title}</h2>
      <ProTable
        dataSource={list.items}
        columns={tableColumns}
        scroll={{ x: 1300 }}
        loading={list.isLoading}
        search={false}
        options={{
          reload: false,
        }}
        toolBarRender={() => {
          return [
            <Button
              key="export"
              type="primary"
              icon={<ExportOutlined />}
              onClick={() =>
                handleExportToExcel(list.items, tableColumns, 'user_details')
              }
            >
              Export to Excel
            </Button>,
          ];
        }}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: PAGE_SIZE_OPTIONS,
          defaultPageSize: 10,
          total: list.total,
        }}
        // onReset={onFilterChange}
        // request={onFilterChange}
        // onFilter={onFilterChange}
        onChange={onPageChange}
      />
    </Modal>
  );
};

export default ModalProTable;
