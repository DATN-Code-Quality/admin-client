import React, { useCallback, useState } from 'react';

import { PlusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { message, Select, Space } from 'antd';
import Button from 'antd-button-color';
import { useNavigate } from 'react-router-dom';

import {
  columnTableAddParticipant,
  columnTableParticipant,
  columnTableSyncParticipant,
  metaFilterAddParticipant,
  metaFilterParticipant,
  metaFilterSyncParticipant,
  metaUpdateParticipant,
} from './props';

import { useCourse } from '~/adapters/appService/course.service';
import { useUser } from '~/adapters/appService/user.service';
import { MAP_SUB_ROLES, PAGE_SIZE_OPTIONS } from '~/constant';
import { Role, SubRole } from '~/constant/enum';
import { MESSAGE } from '~/constant/message';
import { Course } from '~/domain/course';
import { User } from '~/domain/user';
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
import { formatNumber, removeFromArr } from '~/utils';
import ExcelToObject from '~/ui/shared/data-import';

function TableViewParticipant({ course }: { course: Course }) {
  const navigate = useNavigate();
  const {
    getParticipantsByCourseId,
    getMoodleParticipantsByCourseId,
    importParticipants,
    addParticipants,
    getOutsideUsersByCourseId,
    updateParticipant,
    removeParticipants,
  } = useCourse();

  const { getAllUsers } = useUser();

  const [loading, setLoading] = useState<boolean>(false);

  const [syncMoodleModalVisible, syncMoodleModalActions] = useDialog();
  const [addParticipantModalVisible, addParticipantModalActions] = useDialog();
  const [currentRole, setCurrentRole] = useState<SubRole>(SubRole.STUDENT);
  const [currentTeacherIds, setCurrentTeacherIds] = useState<any[]>([]);

  const handleGetParticipants = async () => {
    const res = await getParticipantsByCourseId(course.id);
    setCurrentRole(res.data.role);
    return {
      ...res,
      data: res.data.users,
    };
  };

  const handleGetMoodleParticipants = async (args?) => {
    const res = await getMoodleParticipantsByCourseId(course.id, {
      courseMoodleId: course.courseMoodleId,
    });
    return res;
  };

  const [
    list,
    { onPageChange, onAddItem, onEditItem, onFilterChange, onUpdateList },
  ] = useList({
    fetchFn: (args) => handleGetParticipants(args),
  });

  const handleGetOutsideUsers = async (args) => {
    const res = await getOutsideUsersByCourseId(course.id, {
      ...args,
      limit: null,
      offset: null,
      role: Role.USER,
    });
    return res;
  };

  const handleUpdateList = async () => {
    const response = await handleGetParticipants();
    onUpdateList(response.data);
  };

  const handleImportModalSyncMoodleOk = async (values) => {
    try {
      await importParticipants(course.id, values);
      handleUpdateList();
      message.success(MESSAGE.SUCCESS);
    } catch (error) {
      message.error(MESSAGE.ERROR);
    } finally {
      syncMoodleModalActions.handleClose();
    }
  };

  const handleImportExcelAddParticipantOk = async (values) => {
    const teacherRoleIds = [];
    const studentRoleIds = [];
    values.forEach((item) => {
      if (item.role === SubRole.TEACHER) {
        teacherRoleIds.push(item.id);
      } else if (item.role === SubRole.STUDENT) {
        studentRoleIds.push(item.id);
      }
    });

    try {
      await addParticipants(course.id, {
        teacherRoleIds,
        studentRoleIds,
      });
      handleUpdateList();
      message.success(MESSAGE.SUCCESS);
    } catch (error) {
      console.log('error', error);
      message.error(MESSAGE.ERROR);
    } finally {
      addParticipantModalActions.handleClose();
    }
  };

  const handleImportModalAddParticipantOk = async (values) => {
    console.log(values);
    const addedIds = values.map((item) => item.id);
    const teacherRoleIds = currentTeacherIds.filter((item) =>
      addedIds.includes(item)
    );

    const studentRoleIds = addedIds.filter(
      (item) => !currentTeacherIds.includes(item)
    );

    try {
      await addParticipants(course.id, {
        teacherRoleIds,
        studentRoleIds,
      });
      handleUpdateList();
      message.success(MESSAGE.SUCCESS);
    } catch (error) {
      console.log('error', error);
      message.error(MESSAGE.ERROR);
    } finally {
      addParticipantModalActions.handleClose();
    }
  };

  const handleUpdateParticipantRole = async (values, id) => {
    const body = {
      role: values.role,
      userId: id,
    };
    try {
      await updateParticipant(course.id, body);
      handleUpdateList();
      message.success(MESSAGE.SUCCESS);
    } catch (error) {
      message.error(MESSAGE.ERROR);
    }
  };

  const handleRemoveParticipants = async (values, id) => {
    const body = {
      userIds: [id],
    };
    try {
      await removeParticipants(course.id, body);
      handleUpdateList();
      message.success(MESSAGE.SUCCESS);
    } catch (error) {
      message.error(MESSAGE.ERROR);
    }
  };

  const columnTableProps = () => [
    ...columnTableParticipant(),
    {
      dataIndex: 'action',
      title: 'Action',
      width: 100,
      render: (_, record, index) => {
        const meta = metaUpdateParticipant(record);
        return (
          <Space size="small">
            <BaseModal
              onOkFn={handleUpdateParticipantRole}
              itemTitle=""
              id={record.id}
              mode={ButtonType.EDIT}
              meta={meta}
            />
            <BaseModal
              onOkFn={handleRemoveParticipants}
              itemTitle="Participant"
              id={record.id}
              mode={ButtonType.DELETE}
              isDelete
            />
          </Space>
        );
      },
    },
  ];

  const handleAddParticipantRoleChange = (record) => (role: SubRole) => {
    let updatedIds = [...currentTeacherIds];
    if (role === SubRole.TEACHER) {
      updatedIds.push(record.id);
    } else {
      updatedIds = removeFromArr(updatedIds, record.id, null);
    }
    setCurrentTeacherIds(updatedIds);
  };

  const columnTableAddParticipantProps = () => {
    return [
      ...columnTableAddParticipant(),
      {
        title: 'Role In Course',
        width: 120,
        ellipsis: true,
        render: (value, record) => {
          return (
            <Select
              defaultValue={SubRole.STUDENT}
              options={MAP_SUB_ROLES}
              style={{ width: '100%' }}
              onChange={handleAddParticipantRoleChange(record)}
            />
          );
        },
      },
    ];
  };

  return (
    <>
      {loading && <Loading />}
      <BaseFilter
        loading={list.isLoading}
        meta={metaFilterParticipant()}
        onFilter={onFilterChange}
      />
      <Card>
        <TableToolbar
          title={`Found ${formatNumber(list.items?.length || 0)} user`}
        >
          <div className="flex items-center" style={{ gap: '16px' }}>
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
              onClick={addParticipantModalActions.handleOpen}
            >
              Add Participant
            </Button>

            <ExcelToObject
              handleImportModalOk={handleImportExcelAddParticipantOk}
              loading={list.isLoading}
              name="Import users"
              handleConvertData={(data, columnNames) => {
                return data
                  ?.slice(1)
                  .map<Record<string, string | number>>((row) => {
                    const obj: Record<string, string | number> = {
                      role: row[columnNames.indexOf('role')]?.toString(),
                      id: row[columnNames.indexOf('userId')]?.toString(),
                    };
                    return obj;
                  });
              }}
              templateLink="list-participant.xlsx"
            />
          </div>
          {/* <Button
            type="primary"
            className="mr-4"
            icon={<UploadOutlined />}
            loading={list.isLoading}
            onClick={handleImportExcel}
          >
            Import Excel
          </Button>
          <BaseModal
            onOkFn={handleCreateOrUpdate}
            itemTitle=""
            id={0}
            mode={ButtonType.CREATE}
            loading={list.isLoading}
            meta={metaCreateUser()}
          /> */}
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
            idKey="moodleId"
            baseFilterMeta={metaFilterSyncParticipant()}
            columns={columnTableSyncParticipant()}
            fetchFn={(args) => handleGetMoodleParticipants(args)}
            onOk={handleImportModalSyncMoodleOk}
            onCancel={syncMoodleModalActions.handleClose}
          />
        </>
      )}
      {addParticipantModalVisible && (
        <>
          <ImportedModal
            idKey="id"
            baseFilterMeta={metaFilterAddParticipant()}
            columns={columnTableAddParticipantProps()}
            fetchFn={(args) => handleGetOutsideUsers(args)}
            defaultFilters={{ role: Role.USER }}
            onOk={handleImportModalAddParticipantOk}
            onCancel={addParticipantModalActions.handleClose}
          />
        </>
      )}
    </>
  );
}

export default TableViewParticipant;
