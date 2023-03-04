import React from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import ROUTE from "src/constant/routes";

import TableViewCompany from "../components/table-view-company/TableViewCompany";

const ViewCompanyContainer = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          navigate(ROUTE.COMPANY.CREATE_COMPANY);
        }}
      >
        Tạo mới Công ty
      </Button>
      <TableViewCompany />
    </div>
  );
};

export default ViewCompanyContainer;
