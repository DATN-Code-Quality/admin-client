import React, { useCallback, useEffect, useState } from 'react';

import { Space } from 'antd';
import Button from 'antd-button-color';
import { useNavigate } from 'react-router-dom';

import {
  columnTableUser,
  metaCreateUser,
  metaFilterUser,
  metaUpdateUser,
} from './props';

import { usePartner } from '~/adapters/appService/partner.service';
import { useUser } from '~/adapters/appService/user.service';
import { PAGE_SIZE_OPTIONS } from '~/constant';
import { Partner } from '~/domain/partner';
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
  const { getAllUsers, createUser, updateUser, blockUser } = useUser();
  const { getAllPartners } = usePartner();

  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [importedUsers, setImportedUsers] = useState<User[]>([]);
  const [importedModalVisible, importedModalActions] = useDialog();

  const [list, { onPageChange, onAddItem, onEditItem, onFilterChange }] =
    useList({
      fetchFn: (args) => getAllUsers(args),
    });

  const handleGetListPartner = () => {
    getAllPartners().then((res) => setPartners(res.data));
  };

  const handleSyncMoodle = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setImportedUsers([...res.data, ...res.data, ...res.data]);
      importedModalActions.handleOpen();
    } finally {
      setLoading(false);
    }
  };

  const handleImportExcel = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setImportedUsers([...res.data, ...res.data, ...res.data]);
      importedModalActions.handleOpen();
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = useCallback((value, id) => {
    const dataSubmit = {
      name: value.name,
      engName: value.engName,
      groupId: value.groupId,
      status: value.status,
      user_id: id,
      priority: value.priority,
    };
    if (!id) {
      delete dataSubmit.user_id;
      return createUser(dataSubmit).then((data) => {
        onAddItem(data);
      });
    }
    return updateUser(dataSubmit).then((data) => {
      onEditItem(data, 'user_id');
    });
  }, []);

  const handleBlockUser = (id) => {
    return blockUser(id).then((data) => {
      onEditItem(data, 'user_id');
    });
  };

  const columnTableProps = ({ partners }) => [
    ...columnTableUser({ partners }),
    {
      dataIndex: 'action',
      title: 'Action',
      width: 100,
      render: (_, record, index) => {
        const meta = metaUpdateUser(record, { partners });
        return (
          <Space size="small">
            <BaseModal
              onOkFn={handleCreateOrUpdate}
              itemTitle=""
              id={record.user_id}
              mode={ButtonType.EDIT}
              meta={meta}
            />
            <BaseModal
              onOkFn={handleBlockUser}
              itemTitle="Bạn có muốn chặn user"
              id={record.user_id}
              mode={ButtonType.UNBLOCK}
              isDelete
            />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    handleGetListPartner();
  }, []);

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
          title={`Tìm thấy ${formatNumber(list.items?.length || 0)} user`}
        >
          <Button type="primary" className="mr-4" onClick={handleSyncMoodle}>
            Sync Moodle
          </Button>
          <Button type="primary" className="mr-4" onClick={handleImportExcel}>
            Import Excel
          </Button>
          <BaseModal
            onOkFn={handleCreateOrUpdate}
            itemTitle=""
            id={0}
            mode={ButtonType.CREATE}
            meta={metaCreateUser({ partners })}
          />
        </TableToolbar>
        {list.items.length > 0 && partners.length > 0 && (
          <BaseTable
            idKey="user_id"
            columns={columnTableProps({ partners })}
            data={list}
            paginationProps={{
              showSizeChanger: true,
              pageSizeOptions: PAGE_SIZE_OPTIONS,
            }}
            onChange={onPageChange}
          />
        )}
      </Card>
      {importedUsers.length > 0 && (
        <>
          <ImportedModal
            visible={importedModalVisible}
            data={importedUsers}
            onOk={importedModalActions.handleClose}
            onCancel={importedModalActions.handleClose}
          />
        </>
      )}
    </>
  );
}

export default TableViewUser;
