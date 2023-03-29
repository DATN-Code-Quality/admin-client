import React, { useCallback, useEffect, useState } from 'react';

import { Space } from 'antd';
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
import useList from '~/hooks/useList';
import Card from '~/ui/shared/card';
import BaseFilter from '~/ui/shared/forms/baseFilter';
import BaseModal from '~/ui/shared/modal';
import { ButtonType } from '~/ui/shared/modal/props';
import BaseTable from '~/ui/shared/tables';
import TableToolbar from '~/ui/shared/toolbar';
import { formatNumber } from '~/utils';
import Button from 'antd-button-color';

function TableViewUser() {
  const navigate = useNavigate();
  const { getAllUsers, createUser, updateUser, blockUser } = useUser();
  const { getAllPartners } = usePartner();

  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [list, { onPageChange, onAddItem, onEditItem, onFilterChange }] =
    useList({
      fetchFn: (args) => getAllUsers(args),
    });

  const handleGetListPartner = () => {
    getAllPartners().then((res) => setPartners(res.data));
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
      <BaseFilter
        loading={list.isLoading}
        meta={metaFilterUser()}
        onFilter={onFilterChange}
      />
      <Card>
        <TableToolbar
          title={`Tìm thấy ${formatNumber(list.items?.length || 0)} user`}
        >
          <Button type="primary" className='mr-4'>Sync Moodle</Button>
          <Button type="primary" className='mr-4'>Import Excel</Button>
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
    </>
  );
}

export default TableViewUser;
