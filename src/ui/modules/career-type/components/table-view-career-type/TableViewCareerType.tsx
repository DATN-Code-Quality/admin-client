import React, { useState, useEffect } from "react";

import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, message, Popconfirm, Space } from "antd";
import { createSearchParams, useNavigate } from "react-router-dom";

import { CareerType } from "src/domain/careerType";

import { useCareerType } from "src/adapters/appService/careerType.service";

import Loading from "src/ui/shared/loading";
import BaseTable from "src/ui/shared/tables";

import ROUTE from "src/constant/routes";

import { columnTableCareerType } from "./props";

const TableViewCareerType = () => {
  const navigate = useNavigate();
  const { getAllCareerTypes } = useCareerType();

  const [listCareerTypes, setListCareerTypes] = useState<CareerType[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const type = 1;
  const handleGetDataTable = () => {
    getAllCareerTypes().then((res) => {
      setListCareerTypes(res);
      setLoading(false);
    });
  };
  useEffect(() => {
    if (type) {
      handleGetDataTable();
    }
  }, [type]);

  const columnTableCareerTypeProps: any = [
    ...columnTableCareerType,
    {
      title: "Actions",
      dataIndex: "action",
      width: 100,
      render: (_, record, index) => {
        return (
          <Space size="small">
            <Button
              type="primary"
              ghost
              icon={<EditOutlined />}
              style={{ color: "#0050b3" }}
              onClick={() =>
                navigate(
                  `${ROUTE.CAREER_TYPE.UPDATE_CAREER_TYPE}?${createSearchParams(
                    {
                      id: record.id,
                    }
                  ).toString()}`
                )
              }
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h6 className="cms-layout-title-medium mt-4">
            Tìm thấy {listCareerTypes?.length} Ngành nghề
          </h6>
          <BaseTable
            idKey="viewCareerType"
            columns={columnTableCareerTypeProps}
            data={{ items: listCareerTypes }}
            paginationProps={{
              defaultPageSize: 10,
              total: listCareerTypes?.length,
              showSizeChanger: true,
              pageSizeOptions: ["5", "10", "20", "50"],
              position: ["bottomRight"],
            }}
          />
        </>
      )}
    </>
  );
};

export default TableViewCareerType;
