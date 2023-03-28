import React, { useCallback, useState } from 'react';

import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';

import { ThresholdModal } from '../threshold-modal';

import {
  columnTablePartner,
  metaCreatePartner,
  metaFilterPartner,
  metaUpdatePartner,
} from './props';

import { usePartner } from '~/adapters/appService/partner.service';
import { PAGE_SIZE_OPTIONS } from '~/constant';
import { PartnerType } from '~/constant/enum';
import { Threshold } from '~/domain/partner';
import useDialog from '~/hooks/useDialog';
import useList from '~/hooks/useList';
import Card from '~/ui/shared/card';
import BaseFilter from '~/ui/shared/forms/baseFilter';
import BaseModal from '~/ui/shared/modal';
import { ButtonType } from '~/ui/shared/modal/props';
import BaseTable from '~/ui/shared/tables';
import TableToolbar from '~/ui/shared/toolbar';
import { formatNumber } from '~/utils';
import './TableViewPartner.less';

function TableViewPartner() {
  const navigate = useNavigate();
  const { getAllPartners, createPartner, updatePartner, blockPartner } =
    usePartner();

  const [loading, setLoading] = useState<boolean>(true);
  const [type, setType] = useState<string | null>(null);
  const [thresHoldsVisible, thresholdsActions] = useDialog();
  const [thresHoldsValue, setThresHoldsValue] = useState<Threshold[]>([]);

  const [list, { onPageChange, onAddItem, onEditItem, onFilterChange }] =
    useList({
      fetchFn: (args) => getAllPartners(args),
    });

  const agencies = list.items.filter(
    (item) => item.type === PartnerType.AGENCY
  );

  const handleSelectType = (value) => {
    setType(value);
  };

  const handleCreateOrUpdate = useCallback((value, id) => {
    const dataSubmit = {
      name: value.name,
      engName: value.engName,
      groupId: value.groupId,
      status: value.status,
      id,
      priority: value.priority,
    };
    if (!id) {
      delete dataSubmit.id;
      return createPartner(dataSubmit).then((data) => {
        onAddItem(data);
      });
    }
    return updatePartner(dataSubmit).then((data) => {
      onEditItem(data, 'id');
    });
  }, []);

  const handleBlockPartner = (id) => {
    return blockPartner(id).then((data) => {
      onEditItem(data, 'id');
    });
  };

  const handleViewThresholds = (value) => {
    setThresHoldsValue(value);
    thresholdsActions.handleOpen();
  };

  const columnTableProps = ({ type, agencies, handleSelectType }) => [
    ...columnTablePartner({ agencies, handleViewThresholds }),
    {
      dataIndex: 'action',
      width: 100,
      render: (_, record, index) => {
        const meta = metaUpdatePartner(record, {
          type,
          agencies,
          handleSelectType,
        });
        return (
          <Space size="small">
            <BaseModal
              onOkFn={handleCreateOrUpdate}
              itemTitle=""
              id={record.id}
              mode={ButtonType.EDIT}
              meta={meta}
            />
            <BaseModal
              onOkFn={handleBlockPartner}
              itemTitle="Bạn có muốn chặn partner"
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
      <BaseFilter
        loading={list.isLoading}
        meta={metaFilterPartner()}
        onFilter={onFilterChange}
      />
      <Card>
        <TableToolbar
          title={`Tìm thấy ${formatNumber(list.items?.length || 0)} partner`}
        >
          <BaseModal
            onOkFn={handleCreateOrUpdate}
            itemTitle=""
            id={0}
            mode={ButtonType.CREATE}
            meta={metaCreatePartner({ type, agencies, handleSelectType })}
          />
        </TableToolbar>
        {list.items.length > 0 && (
          <BaseTable
            idKey="id"
            columns={columnTableProps({ type, agencies, handleSelectType })}
            data={list}
            paginationProps={{
              showSizeChanger: true,
              pageSizeOptions: PAGE_SIZE_OPTIONS,
            }}
            onChange={onPageChange}
          />
        )}
      </Card>
      <ThresholdModal
        visible={thresHoldsVisible}
        data={thresHoldsValue}
        onOk={thresholdsActions.handleClose}
        onCancel={thresholdsActions.handleClose}
      />
    </>
  );
}

export default TableViewPartner;
