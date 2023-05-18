import React from 'react';

import { Checkbox, Form, Modal } from 'antd';

import BaseFilter from '../forms/baseFilter';
import BaseTable from '../tables';

import { PAGE_SIZE_OPTIONS } from '~/constant';
import { Assignment } from '~/domain/assignment';
import { Course } from '~/domain/course';
import { User } from '~/domain/user';
import useForm from '~/hooks/useForm';
import useList from '~/hooks/useList';
import { asyncAction, formatDate } from '~/utils';
import './ImportedModal.less';

export interface ImportedModalProps {
  idKey?: string;
  baseFilterMeta?: any;
  columns: any;
  fetchFn: (args) => Promise<any>;
  onOk: (values) => Promise<any>;
  onCancel: () => void;
}

const ImportedModal: React.FC<ImportedModalProps> = ({
  idKey = 'id',
  baseFilterMeta,
  columns,
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
  });

  const handleOk = (values: any): Promise<any> => {
    const resultList = list.items.filter((item) =>
      importIds.includes(item[idKey])
    );
    return onOk(resultList).then((resp) => {
      return resp;
    });
  };

  const [importIds, setImportIds] = React.useState<any[]>([]);

  const handleClose = () => {
    onCancel?.();
  };

  const handleCheckboxChange = (record) => (e) => {
    console.log(record);
    const { checked } = e.target;
    if (checked) {
      setImportIds([...importIds, record[idKey]]);
    } else {
      setImportIds(importIds.filter((id) => id !== record[idKey]));
    }
  };

  const tableColumns = [
    ...columns,
    {
      dataIndex: 'action',
      title: 'Import',
      width: 100,
      render: (_, record, index) => {
        return <Checkbox onChange={handleCheckboxChange(record)} />;
      },
    },
  ];

  return (
    <Modal
      open
      closable
      confirmLoading={list.isLoading}
      onOk={handleOk}
      okButtonProps={{
        disabled: importIds.length === 0,
      }}
      onCancel={handleClose}
      width="100%"
    >
      {baseFilterMeta && (
        <BaseFilter
          loading={list.isLoading}
          meta={baseFilterMeta}
          onFilter={onFilterChange}
        />
      )}
      <BaseTable
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

export default ImportedModal;
