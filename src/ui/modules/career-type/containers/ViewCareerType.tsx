import React from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import ROUTE from "src/constant/routes";

import TableViewCareerType from "../components/table-view-career-type/TableViewCareerType";

const ViewCareerTypeContainer = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          navigate(ROUTE.CAREER_TYPE.CREATE_CAREER_TYPE);
        }}
      >
        Tạo mới Ngành nghề
      </Button>
      <TableViewCareerType />
    </div>
  );
};

export default ViewCareerTypeContainer;
