import React from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import ROUTE from "src/constant/routes";

import TableViewJobPosts from "../components/table-view-job-post/TableViewJobPost";

const ViewJobPostContainer = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          navigate(ROUTE.JOB_POST.CREATE_JOB_POST);
        }}
      >
        Tạo mới Bài đăng tuyển dụng
      </Button>
      <TableViewJobPosts />
    </div>
  );
};

export default ViewJobPostContainer;
