import React, { useState } from 'react';

import {
  EditOutlined,
  PlusCircleOutlined,
  SyncOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Modal, Space } from 'antd';
import Button from 'antd-button-color';
import { useNavigate } from 'react-router-dom';

import Submission from '../submission';

import { columnTableAssignment, metaFilterAssignment } from './props';

import { useAssignment } from '~/adapters/appService/assignment.service';
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

function TableViewAssignment({ course }) {
  const navigate = useNavigate();
  const {
    getAllAssignments,
    getAssignmentByCourseId,
    createAssignment,
    updateAssignment,
    blockAssignment,
  } = useAssignment();

  const [assignmentSelected, setAssignmentSelected] = useState(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [importedAssignments, setImportedAssignments] = useState<Assignment[]>(
    []
  );
  const [isSyncMoodle, setIsSyncMoodle] = useState<boolean>(false);
  const [importedModalVisible, importedModalActions] = useDialog();

  const [list, { onPageChange, onAddItem, onEditItem, onFilterChange }] =
    useList({
      fetchFn: (args) => getAllAssignments(args),
    });

  const handleSyncMoodle = async () => {
    try {
      setLoading(true);
      setIsSyncMoodle(true);
      const res = await getAssignmentByCourseId(course.moodleCourseId);
      console.log(res);
      setImportedAssignments(res.data);
      importedModalActions.handleOpen();
    } finally {
      setLoading(false);
    }
  };

  const handleImportExcel = async () => {
    try {
      setLoading(true);
      const res = await getAllAssignments();
      setImportedAssignments([...res.data, ...res.data, ...res.data]);
      importedModalActions.handleOpen();
    } finally {
      setLoading(false);
    }
  };

  const handleImportModalOk = async (values) => {
    if (isSyncMoodle) {
      const dataSubmit = values.data;
      console.log(dataSubmit);
      createAssignment(dataSubmit);
    }
    importedModalActions.handleClose();
    return values;
  };

  const handleCreateAssignment = async () => {
    navigate(ROUTE.COURSE.CREATE_ASSIGNMENT);
  };

  const handleUpdateAssignment = async (id) => {
    navigate(`${ROUTE.COURSE.EDIT_ASSIGNMENT}?id=${id}`);
  };

  const handleBlockAssignment = (id) => {
    return blockAssignment(id).then((data) => {
      onEditItem(data, 'id');
    });
  };

  console.log(assignmentSelected);

  const columnTableProps = () => [
    ...columnTableAssignment(setAssignmentSelected),
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
      {!assignmentSelected && (
        <>
          {loading && <Loading />}
          <BaseFilter
            loading={list.isLoading}
            meta={metaFilterAssignment()}
            onFilter={onFilterChange}
          />
          <Card>
            <TableToolbar
              title={`Tìm thấy ${formatNumber(
                list.items?.length || 0
              )} assignment`}
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
                type="assignment"
                id="assignmentMoodleId"
                data={importedAssignments}
                onOk={handleImportModalOk}
                onCancel={importedModalActions.handleClose}
              />
              <Card>
                <TableToolbar
                  title={`Tìm thấy ${formatNumber(
                    list.items?.length || 0
                  )} assignment`}
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
          )}
        </>
      )}
      {assignmentSelected && <Submission assignment={assignmentSelected} />}
    </>
  );
}

export default TableViewAssignment;
