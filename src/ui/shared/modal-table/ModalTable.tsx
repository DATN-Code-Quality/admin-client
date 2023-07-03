import React from 'react';

import { Modal } from 'antd';

import BaseFilter from '../forms/baseFilter';
import BaseTable from '../tables';

import { PAGE_SIZE_OPTIONS } from '~/constant';
import useList from '~/hooks/useList';
import TableToolbar from '~/ui/shared/toolbar';
import './ModalTable.less';

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

const ModalTable: React.FC<ModalTableProps> = ({
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
      <BaseTable
        className="modal-table"
        idKey={idKey}
        columns={tableColumns}
        data={list}
        paginationProps={{
          showSizeChanger: true,
          pageSizeOptions: PAGE_SIZE_OPTIONS,
        }}
        onChange={onPageChange}
      />
    </Modal>
  );
};

export default ModalTable;
