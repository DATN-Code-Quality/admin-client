import React, { useCallback, useState } from 'react';

import { EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Modal, Space } from 'antd';
import Button from 'antd-button-color';
import { useNavigate } from 'react-router-dom';

import { columnTableCourse, metaFilterCourse } from './props';

import { useCourse } from '~/adapters/appService/course.service';
import { PAGE_SIZE_OPTIONS } from '~/constant';
import ROUTE from '~/constant/routes';
import { Course } from '~/domain/course';
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

import './TableViewCourse.less';

function TableViewCourse() {
  const navigate = useNavigate();
  const { getAllCourses, createCourse, updateCourse, blockCourse } =
    useCourse();

  const [loading, setLoading] = useState<boolean>(false);

  const [importedCourses, setImportedCourses] = useState<Course[]>([]);
  const [importedModalVisible, importedModalActions] = useDialog();

  const [list, { onPageChange, onAddItem, onEditItem, onFilterChange }] =
    useList({
      fetchFn: (args) => getAllCourses(args),
    });

  const handleSyncMoodle = async () => {
    try {
      setLoading(true);
      const res = await getAllCourses();
      setImportedCourses([...res.data, ...res.data, ...res.data]);
      importedModalActions.handleOpen();
    } finally {
      setLoading(false);
    }
  };

  const handleImportExcel = async () => {
    try {
      setLoading(true);
      const res = await getAllCourses();
      setImportedCourses([...res.data, ...res.data, ...res.data]);
      importedModalActions.handleOpen();
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCourse = async () => {
    navigate(ROUTE.COURSE.CREATE);
  };

  const handleUpdateCourse = async (id) => {
    navigate(`${ROUTE.COURSE.EDIT}?id=${id}`);
  };

  const handleBlockCourse = (id) => {
    return blockCourse(id).then((data) => {
      onEditItem(data, 'id');
    });
  };

  const columnTableProps = () => [
    ...columnTableCourse(),
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
              onClick={() => handleUpdateCourse(record.id)}
            />
            <BaseModal
              onOkFn={handleBlockCourse}
              itemTitle="Bạn có muốn chặn course"
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
          title={`Tìm thấy ${formatNumber(list.items?.length || 0)} course`}
        >
          <Button type="primary" className="mr-4" onClick={handleSyncMoodle}>
            Sync Moodle
          </Button>
          <Button type="primary" className="mr-4" onClick={handleImportExcel}>
            Import Excel
          </Button>
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={handleCreateCourse}
          >
            Tạo mới
          </Button>
        </TableToolbar>
        {list.items.length > 0 && (
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
        )}
      </Card>
      {importedCourses.length > 0 && (
        <>
          <ImportedModal
            visible={importedModalVisible}
            data={importedCourses}
            onOk={importedModalActions.handleClose}
            onCancel={importedModalActions.handleClose}
          />
        </>
      )}
    </>
  );
}

export default TableViewCourse;
