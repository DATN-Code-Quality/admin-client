import React, { useCallback, useState } from 'react';

import { SyncOutlined, UploadOutlined } from '@ant-design/icons';
import { message, Modal, Space } from 'antd';
import Button from 'antd-button-color';
import { useNavigate } from 'react-router-dom';

import {
  columnTableSyncUser,
  columnTableUser,
  metaCreateUser,
  metaFilterSyncUser,
  metaFilterUser,
  metaUpdateUser,
} from './props';

import { useUser } from '~/adapters/appService/user.service';
import { PAGE_SIZE_OPTIONS } from '~/constant';
import { Role, UserStatus } from '~/constant/enum';
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

function TableViewUser() {
  const navigate = useNavigate();
  const {
    getAllUsers,
    getAllMoodleUsers,
    importUsers,
    createUser,
    updateUser,
    blockUser,
    unblockUser,
  } = useUser();

  const [loading, setLoading] = useState<boolean>(false);

  const [syncMoodleModalVisible, syncMoodleModalActions] = useDialog();

  const [list, { onPageChange, onFilterChange, onUpdateList }] = useList({
    fetchFn: (args) => getAllUsers(args),
  });

  const handleUpdateList = async () => {
    const response = await getAllUsers();
    onUpdateList(response.data);
  };

  const handleImportModalOk = async (values) => {
    try {
      await importUsers(values);
      handleUpdateList();
      message.success(MESSAGE.SUCCESS);
    } catch (error) {
      message.error(MESSAGE.ERROR);
    } finally {
      syncMoodleModalActions.handleClose();
    }
  };

  const handleCreateOrUpdate = async (value, id) => {
    const dataSubmit = { ...value, id, role: Role.ADMIN };
    if (!id) {
      delete dataSubmit.id;
      await createUser(dataSubmit);
    } else {
      await updateUser(dataSubmit);
    }
    handleUpdateList();
  };

  const handleBlockUser = async (value, id) => {
    await blockUser(id);
    return handleUpdateList();
  };

  const handleUnblockUser = async (value, id) => {
    await unblockUser(id);
    return handleUpdateList();
  };

  const columnTableProps = () => [
    ...columnTableUser(),
    {
      dataIndex: 'action',
      title: 'Action',
      width: 100,
      render: (_, record, index) => {
        const meta = metaUpdateUser(record);
        return (
          <Space size="small">
            <BaseModal
              onOkFn={handleCreateOrUpdate}
              itemTitle=""
              id={record.id}
              mode={ButtonType.EDIT}
              meta={meta}
            />
            {record.status === UserStatus.ACTIVE ? (
              <BaseModal
                onOkFn={handleBlockUser}
                itemTitle="User"
                id={record.id}
                mode={ButtonType.BLOCK}
                isDelete
              />
            ) : (
              <BaseModal
                onOkFn={handleUnblockUser}
                itemTitle="User"
                id={record.id}
                mode={ButtonType.UNBLOCK}
                isDelete
              />
            )}
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
        meta={metaFilterUser()}
        onFilter={onFilterChange}
      />
      <Card>
        <TableToolbar
          title={`Found ${formatNumber(list.items?.length || 0)} user`}
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
          </Button> */}
          <BaseModal
            onOkFn={handleCreateOrUpdate}
            itemTitle=""
            id={0}
            mode={ButtonType.CREATE}
            meta={metaCreateUser()}
            loading={list.isLoading}
            formProps={{ layout: 'vertical' }}
          />
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
            baseFilterMeta={metaFilterSyncUser()}
            columns={columnTableSyncUser()}
            fetchFn={(args) => getAllMoodleUsers(args)}
            onOk={handleImportModalOk}
            onCancel={syncMoodleModalActions.handleClose}
          />
        </>
      )}
    </>
  );
}

export default TableViewUser;
