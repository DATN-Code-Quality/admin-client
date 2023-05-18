import React from 'react';

import { PlusCircleOutlined } from '@ant-design/icons';
import { Checkbox, Modal } from 'antd';
import Button from 'antd-button-color';

import BaseFilter from '../forms/baseFilter';
import BaseTable from '../tables';

import { PAGE_SIZE_OPTIONS } from '~/constant';
import useList from '~/hooks/useList';
import TableToolbar from '~/ui/shared/toolbar';

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
    const { checked } = e.target;
    if (checked) {
      setImportIds([...importIds, record[idKey]]);
    } else {
      setImportIds(importIds.filter((id) => id !== record[idKey]));
    }
  };

  const handleImportAll = () => {
    const ids = list.items.map((item) => item[idKey]);
    setImportIds(ids);
  };

  const handleImportNone = () => {
    setImportIds([]);
  };

  const tableColumns = [
    ...columns,
    {
      dataIndex: 'action',
      title: 'Import',
      width: 100,
      render: (_, record, index) => {
        const defaultChecked = importIds.includes(record[idKey]);
        return (
          <Checkbox
            checked={defaultChecked}
            onChange={handleCheckboxChange(record)}
          />
        );
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
      <TableToolbar>
        {importIds.length > 0 && (
          <Button
            type="primary"
            ghost
            onClick={handleImportNone}
            className="ml-4"
          >
            Huỷ chọn
          </Button>
        )}
        {importIds.length <= list.items.length && (
          <Button
            type="primary"
            onClick={handleImportAll}
            className="ml-4"
            disabled={importIds.length === list.items.length}
          >
            Chọn tất cả
          </Button>
        )}
      </TableToolbar>
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
