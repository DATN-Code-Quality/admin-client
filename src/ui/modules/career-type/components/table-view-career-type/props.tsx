import React from "react";

import { ColumnType } from "antd/lib/table";
import dayjs from "dayjs";

import { StateStatus } from "src/constant";

export const columnTableCareerType: ColumnType<any>[] = [
  {
    title: "ID",
    dataIndex: "id",
    width: 70,
  },
  {
    title: "Tên",
    dataIndex: "name",
    width: 280,
    ellipsis: true,
  },
  {
    title: "Parent ID",
    dataIndex: "parent_id",
    width: 140,
    ellipsis: true,
  },
  {
    title: "Trạng thái",
    dataIndex: "state",
    width: 100,
    render: (value) => {
      return <p>{value === StateStatus.ACTIVE ? "Active" : "Inactive"}</p>;
    },
  },
  {
    title: "Thời gian tạo",
    dataIndex: "created_at",
    width: 160,
    render: (value) => {
      return <p>{dayjs(value).format("DD-MM-YYYY hh:mm:ss")}</p>;
    },
  },
  {
    title: "Thời gian cập nhật",
    dataIndex: "updated_at",
    width: 160,
    render: (value) => {
      return <p>{dayjs(value).format("DD-MM-YYYY hh:mm:ss")}</p>;
    },
  },
];
