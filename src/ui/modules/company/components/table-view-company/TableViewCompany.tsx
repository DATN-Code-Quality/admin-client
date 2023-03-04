import React, { useState, useEffect } from "react";

import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, message, Popconfirm, Space } from "antd";
import { createSearchParams, useNavigate } from "react-router-dom";

import { Company } from "src/domain/company";

import { useCompany } from "src/adapters/appService/company.service";

import Loading from "src/ui/shared/loading";
import BaseTable from "src/ui/shared/tables";

import ROUTE from "src/constant/routes";

import { columnTableCompany } from "./props";

const TableViewCompany = () => {
  const navigate = useNavigate();
  const { getAllCompanies } = useCompany();

  const [listCompanies, setListCompanies] = useState<Company[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const type = 1;
  const handleGetDataTable = () => {
    getAllCompanies().then((res) => {
      setListCompanies(res);
      setLoading(false);
    });
  };
  useEffect(() => {
    if (type) {
      handleGetDataTable();
    }
  }, [type]);

  const columnTableCompanyProps: any = [
    ...columnTableCompany,
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
                  `${ROUTE.COMPANY.UPDATE_COMPANY}?${createSearchParams({
                    id: record.id,
                  }).toString()}`
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
            Tìm thấy {listCompanies?.length} Công ty
          </h6>
          <BaseTable
            idKey="viewCompany"
            columns={columnTableCompanyProps}
            data={{ items: listCompanies }}
            paginationProps={{
              defaultPageSize: 10,
              total: listCompanies?.length,
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

export default TableViewCompany;
