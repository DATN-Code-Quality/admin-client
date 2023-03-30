import React, { useCallback, useState } from 'react';

import {
  EditOutlined,
  PlusCircleOutlined,
  SyncOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Modal, Space } from 'antd';
import Button from 'antd-button-color';
import { useNavigate } from 'react-router-dom';

import { columnTableAssignment, metaFilterCourse } from './props';

import { useCourse } from '~/adapters/appService/course.service';
import { PAGE_SIZE_OPTIONS } from '~/constant';
import ROUTE from '~/constant/routes';
import { Assignment } from '~/domain/assignment';
import useDialog from '~/hooks/useDialog';
import useList from '~/hooks/useList';
import Card from '~/ui/shared/card';
import BaseFilter from '~/ui/shared/forms/baseFilter';
import ImportedModal from '~/ui/shared/imported-modal';
import Loading from '~/ui/shared/loading';
import BaseModal from '~/ui/shared/modal';
import { ButtonType } from '~/ui/shared/modal/props';
import BaseTable from '~/ui/shared/tables';
import TableToolbar from '~/ui/shared/toolbar';
import { formatNumber } from '~/utils';

import './TableViewAssignment.less';

function TableViewAssignment() {
  const navigate = useNavigate();
  const { getAssignmentsByCourseId, blockCourse } = useCourse();

  const [loading, setLoading] = useState<boolean>(false);

  const [importedAssignments, setImportedAssignments] = useState<Assignment[]>(
    []
  );
  const [importedModalVisible, importedModalActions] = useDialog();

  const [list, { onPageChange, onAddItem, onEditItem, onFilterChange }] =
    useList({
      fetchFn: (args) => getAssignmentsByCourseId(args),
    });

  const handleSyncMoodle = async () => {
    try {
      setLoading(true);
      const res = await getAssignmentsByCourseId('');
      setImportedAssignments([...res.data, ...res.data, ...res.data]);
      importedModalActions.handleOpen();
    } finally {
      setLoading(false);
    }
  };

  const handleImportExcel = async () => {
    try {
      setLoading(true);
      const res = await getAssignmentsByCourseId('');
      setImportedAssignments([...res.data, ...res.data, ...res.data]);
      importedModalActions.handleOpen();
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async () => {
    navigate(ROUTE.COURSE.CREATE);
  };

  const handleUpdateAssignment = async (id) => {
    navigate(`${ROUTE.COURSE.EDIT}?id=${id}`);
  };

  const handleBlockAssignment = (id) => {
    return blockCourse(id).then((data) => {
      onEditItem(data, 'id');
    });
  };

  const columnTableProps = () => [
    ...columnTableAssignment(),
    {
      dataIndex: 'action',
      title: 'Action',
      width: 100,
      render: (_, record, index) => {
        return (
          <Space size="small">
            <Button
              type="primary"
              size="small"
              ghost
              icon={<EditOutlined />}
              onClick={() => handleUpdateAssignment(record.id)}
            />
            <BaseModal
              onOkFn={handleBlockAssignment}
              itemTitle="Bạn có muốn chặn assignment"
              id={record.id}
              mode={ButtonType.BLOCK}
              isDelete
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      {loading && <Loading />}
      <BaseFilter
        loading={list.isLoading}
        meta={metaFilterCourse()}
        onFilter={onFilterChange}
      />
      <Card>
        <TableToolbar
          title={`Tìm thấy ${formatNumber(list.items?.length || 0)} assignment`}
        >
          <Button
            type="primary"
            className="mr-4"
            icon={<SyncOutlined />}
            loading={list.isLoading}
            onClick={handleSyncMoodle}
          >
            Sync Moodle
          </Button>
          <Button
            type="primary"
            className="mr-4"
            icon={<UploadOutlined />}
            loading={list.isLoading}
            onClick={handleImportExcel}
          >
            Import Excel
          </Button>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            loading={list.isLoading}
            onClick={handleCreateAssignment}
          >
            Tạo mới
          </Button>
        </TableToolbar>
        <BaseTable
          idKey="id"
          columns={columnTableProps()}
          data={list}
          paginationProps={{
            showSizeChanger: true,
            pageSizeOptions: PAGE_SIZE_OPTIONS,
          }}
          onChange={onPageChange}
        />
      </Card>
      {importedAssignments.length > 0 && (
        <>
          <ImportedModal
            visible={importedModalVisible}
            data={importedAssignments}
            onOk={importedModalActions.handleClose}
            onCancel={importedModalActions.handleClose}
          />
        </>
      )}
    </>
  );
}

export default TableViewAssignment;
