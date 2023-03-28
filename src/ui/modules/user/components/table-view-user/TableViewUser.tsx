import { useCallback, useEffect, useState } from 'react';

import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';

import { usePartner } from '~/src/adapters/appService/partner.service';
import { useUser } from '~/src/adapters/appService/user.service';
import { PAGE_SIZE_OPTIONS } from '~/src/constant';
import { Partner } from '~/src/domain/partner';
import useList from '~/src/hooks/useList';
import Card from '~/src/ui/shared/card';
import BaseFilter from '~/src/ui/shared/forms/baseFilter';
import BaseModal from '~/src/ui/shared/modal';
import { ButtonType } from '~/src/ui/shared/modal/props';
import BaseTable from '~/src/ui/shared/tables';
import TableToolbar from '~/src/ui/shared/toolbar';
import { formatNumber } from '~/src/utils';
import {
  columnTableUser,
  metaCreateUser,
  metaFilterUser,
  metaUpdateUser
} from './props';

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
    let dataSubmit = {
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
    } else {
      return updateUser(dataSubmit).then((data) => {
        onEditItem(data, 'user_id');
      });
    }
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
        let meta = metaUpdateUser(record, { partners });
        return (
          <Space size="small">
            <BaseModal
              onOkFn={handleCreateOrUpdate}
              itemTitle={''}
              id={record.user_id}
              mode={ButtonType.EDIT}
              meta={meta}
            />
            <BaseModal
              onOkFn={handleBlockUser}
              itemTitle={'Bạn có muốn chặn user'}
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
          <BaseModal
            onOkFn={handleCreateOrUpdate}
            itemTitle={''}
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
