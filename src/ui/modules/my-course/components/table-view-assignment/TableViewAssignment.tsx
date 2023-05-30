import React, { useCallback, useEffect, useState } from 'react';

import {
  EditOutlined,
  PlusCircleOutlined,
  SyncOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { message, Modal, Space } from 'antd';
import Button from 'antd-button-color';
import { useNavigate } from 'react-router-dom';

import SubmissionComponent from '../submission';

import {
  columnTableAssignment,
  columnTableSyncAssignment,
  metaFilterAssignment,
  metaFilterSyncAssignment,
} from './props';

import { useAssignment } from '~/adapters/appService/assignment.service';
import { PAGE_SIZE_OPTIONS } from '~/constant';
import { SubRole } from '~/constant/enum';
import { MESSAGE } from '~/constant/message';
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
import { formatNumber, generateUrl } from '~/utils';

import './TableViewAssignment.less';

function TableViewAssignment({ course }) {
  const navigate = useNavigate();
  const {
    getAllAssignments,
    getMoodleAssignments,
    importAssignments,
    blockAssignment,
  } = useAssignment();

  const [loading, setLoading] = useState<boolean>(false);
  const [assignmentSelected, setAssignmentSelected] =
    useState<Assignment | null>(null);

  const [userRole, setUserRole] = useState<SubRole | undefined>(undefined);

  const [syncMoodleModalVisible, syncMoodleModalActions] = useDialog();
  const [currentRole, setCurrentRole] = useState<SubRole>(SubRole.STUDENT);
  const isTeacher = currentRole === SubRole.TEACHER;

  const handleGetAssignments = async (args?) => {
    const res = await getAllAssignments(course.id, args);
    setCurrentRole(res.data.role);
    return {
      ...res,
      data: res.data.assignments,
    };
  };

  const handleGetMoodleAssignments = async (args?) => {
    const res = await getMoodleAssignments(course.id, {
      courseMoodleId: course.courseMoodleId,
    });
    return {
      ...res,
      data: res.data.assignments,
    };
  };

  useEffect(() => {
    return () => {
      setAssignmentSelected(null);
    };
  }, []);

  const [
    list,
    { onPageChange, onAddItem, onEditItem, onFilterChange, onUpdateList },
  ] = useList({
    fetchFn: (args) => handleGetAssignments(args),
  });

  const handleUpdateList = async () => {
    const response = await handleGetAssignments();
    onUpdateList(response.data);
  };

  const handleImportModalOk = async (values) => {
    try {
      const newValues = values.map((item) => {
        return {
          ...item,
          configObject: {},
        };
      });
      await importAssignments(course.id, newValues);
      handleUpdateList();
      message.success(MESSAGE.SUCCESS);
    } catch (error) {
      message.error(MESSAGE.ERROR);
    } finally {
      syncMoodleModalActions.handleClose();
    }
  };

  const handleCreateAssignment = async () => {
    const url = generateUrl(ROUTE.MY_COURSE.CREATE_ASSIGNMENT, {
      course_id: course.id,
    });
    navigate(url);
  };

  const handleUpdateAssignment = async (id) => {
    const url = generateUrl(ROUTE.MY_COURSE.EDIT_ASSIGNMENT, {
      course_id: course.id,
      assignment_id: id,
    });
    navigate(url);
  };

  const handleBlockAssignment = (id) => {
    return blockAssignment(id).then((data) => {
      onEditItem(data, 'id');
    });
  };

  const columnTableProps = () => {
    const columns = [...columnTableAssignment(setAssignmentSelected)];
    if (isTeacher) {
      columns.push({
        dataIndex: 'action',
        title: 'Thao tác',
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
      });
    }
    return columns;
  };

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
              )} bài tập`}
            >
              {isTeacher && (
                <>
                  <Button
                    type="primary"
                    className="mr-4"
                    icon={<SyncOutlined />}
                    loading={list.isLoading}
                    onClick={syncMoodleModalActions.handleOpen}
                  >
                    Sync Moodle
                  </Button>
                  <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    loading={list.isLoading}
                    onClick={handleCreateAssignment}
                  >
                    Tạo mới
                  </Button>
                </>
              )}
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
                idKey="assignmentMoodleId"
                baseFilterMeta={metaFilterSyncAssignment()}
                columns={columnTableSyncAssignment()}
                fetchFn={(args) => handleGetMoodleAssignments(args)}
                onOk={handleImportModalOk}
                onCancel={syncMoodleModalActions.handleClose}
              />
            </>
          )}
        </>
      )}
      {assignmentSelected && (
        <SubmissionComponent assignment={assignmentSelected} />
      )}
    </>
  );
}

export default TableViewAssignment;
