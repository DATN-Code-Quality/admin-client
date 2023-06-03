import React, { useCallback, useState } from 'react';

import { SyncOutlined } from '@ant-design/icons';
import { message, Space } from 'antd';
import Button from 'antd-button-color';
import { useNavigate } from 'react-router-dom';

import {
  columnTableParticipant,
  columnTableSyncParticipant,
  metaFilterParticipant,
  metaFilterSyncParticipant,
} from './props';

import { useCourse } from '~/adapters/appService/course.service';
import { useUser } from '~/adapters/appService/user.service';
import { PAGE_SIZE_OPTIONS } from '~/constant';
import { SubRole } from '~/constant/enum';
import { MESSAGE } from '~/constant/message';
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
import { formatNumber } from '~/utils';

function TableViewParticipant({ course }) {
  const navigate = useNavigate();
  const {
    getParticipantsByCourseId,
    getMoodleParticipantsByCourseId,
    importParticipants,
  } = useCourse();

  const [loading, setLoading] = useState<boolean>(false);

  const [syncMoodleModalVisible, syncMoodleModalActions] = useDialog();
  const [currentRole, setCurrentRole] = useState<SubRole>(SubRole.STUDENT);

  const handleGetParticipants = async (args) => {
    const res = await getParticipantsByCourseId(course.id, args);
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

  const handleUpdateList = async () => {
    const response = await handleGetParticipants();
    onUpdateList(response.data);
  };

  const handleImportModalOk = async (values) => {
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

  const columnTableProps = () => [...columnTableParticipant()];

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
          {/* <Button
            type="primary"
            className="mr-4"
            icon={<SyncOutlined />}
            loading={list.isLoading}
            onClick={syncMoodleModalActions.handleOpen}
          >
            Sync Moodle
          </Button> */}
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
            onOk={handleImportModalOk}
            onCancel={syncMoodleModalActions.handleClose}
          />
        </>
      )}
    </>
  );
}

export default TableViewParticipant;
