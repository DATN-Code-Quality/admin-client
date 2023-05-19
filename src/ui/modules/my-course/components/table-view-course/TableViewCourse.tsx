import React, { useCallback, useState } from 'react';

import {
  EditOutlined,
  PlusCircleOutlined,
  SyncOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { message, Modal, Space } from 'antd';
import Button from 'antd-button-color';
import { useNavigate } from 'react-router-dom';

import {
  columnTableCourse,
  columnTableSyncCourse,
  metaFilterCourse,
  metaFilterSyncCourse,
} from './props';

import { useCourse } from '~/adapters/appService/course.service';
import { PAGE_SIZE_OPTIONS } from '~/constant';
import { MESSAGE } from '~/constant/message';
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
  const { getAllCourses, getAllMoodleCourses, getAllMyCourses, importCourses } =
    useCourse();

  const [loading, setLoading] = useState<boolean>(false);

  const handleGetMyCourses = async (args) => {
    const res = await getAllMyCourses(args);
    console.log(res);
    return res;
  };

  const [syncMoodleModalVisible, syncMoodleModalActions] = useDialog();

  const [list, { onPageChange, onFilterChange, onUpdateList }] = useList({
    fetchFn: (args) => handleGetMyCourses(args),
  });

  const handleUpdateList = async () => {
    const response = await getAllCourses();
    onUpdateList(response.data);
  };

  const handleImportModalOk = async (values) => {
    try {
      await importCourses(values);
      handleUpdateList();
      message.success(MESSAGE.SUCCESS);
    } catch (error) {
      message.error(MESSAGE.ERROR);
    } finally {
      syncMoodleModalActions.handleClose();
    }
  };

  // const handleCreateCourse = async () => {
  //   navigate(ROUTE.MY_COURSE.CREATE);
  // };

  // const handleUpdateCourse = async (id) => {
  //   navigate(`${ROUTE.MY_COURSE.EDIT}?id=${id}`);
  // };

  const columnTableProps = () => [...columnTableCourse()];

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
          title={`Tìm thấy ${formatNumber(list.items?.length || 0)} khoá học`}
        >
          <Button
            type="primary"
            className="mr-4"
            icon={<SyncOutlined />}
            loading={list.isLoading}
            onClick={syncMoodleModalActions.handleOpen}
          >
            Sync Moodle
          </Button>
          {/* <Button
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
            onClick={handleCreateCourse}
          >
            Tạo mới
          </Button> */}
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
      {syncMoodleModalVisible && (
        <>
          <ImportedModal
            idKey="courseMoodleId"
            baseFilterMeta={metaFilterSyncCourse()}
            columns={columnTableSyncCourse()}
            fetchFn={(args) => getAllMoodleCourses(args)}
            onOk={handleImportModalOk}
            onCancel={syncMoodleModalActions.handleClose}
          />
        </>
      )}
    </>
  );
}

export default TableViewCourse;
