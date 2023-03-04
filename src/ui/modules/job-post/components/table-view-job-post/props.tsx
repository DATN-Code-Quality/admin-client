import React from "react";

import { ColumnType } from "antd/lib/table";
import dayjs from "dayjs";

import { StateStatus } from "src/constant";

export const columnTableJobPost: ColumnType<any>[] = [
  {
    title: "ID",
    dataIndex: "id",
    width: 70,
  },
  {
    title: "Tiêu đề",
    dataIndex: "title",
    width: 400,
    ellipsis: true,
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
  {
    title: "Trạng thái",
    dataIndex: "state",
    width: 100,
    render: (value) => {
      return <p>{value === StateStatus.ACTIVE ? "Active" : "Inactive"}</p>;
    },
  },
  {
    title: "Số lượng ứng viên",
    dataIndex: "total_candidate",
    width: 100,
  },
];
