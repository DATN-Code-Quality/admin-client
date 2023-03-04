import React, { useState, useEffect } from "react";

import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, message, Popconfirm, Space } from "antd";
import { createSearchParams, useNavigate } from "react-router-dom";

import { JobPost } from "src/domain/jobPost";

import { useCompany } from "src/adapters/appService/company.service";
import { useJobApplication } from "src/adapters/appService/jobApplication.service";
import { useJobPost } from "src/adapters/appService/jobPost.service";

import Loading from "src/ui/shared/loading";
import BaseTable from "src/ui/shared/tables";

import ROUTE from "src/constant/routes";
import { getPromiseSettleResponseValue } from "src/utils";

import { columnTableJobPost } from "./props";

const TableViewJobPosts = () => {
  const navigate = useNavigate();
  const { getAllJobPosts } = useJobPost();
  const { getAllCompanies } = useCompany();
  const { downloadReport } = useJobApplication();

  const [listJobPosts, setListJobPosts] = useState<JobPost[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const handleGetDataTable = async () => {
    const res = await Promise.allSettled([getAllJobPosts(), getAllCompanies()]);
    const [jobPostData, companyData] = res.map(getPromiseSettleResponseValue);

    console.log(jobPostData)
    jobPostData.forEach((jobPost) => {
      const company = companyData.find(
        (comp) => comp.id === jobPost.company_id
      );
      jobPost.company_name = company?.name;
    });
    setListJobPosts(jobPostData);
    setLoading(false);
  };

  const handleDownloadReport = (jobPostId) => {
    setLoading(true);
    downloadReport({ jobPostId }).then((res) => {
      message.success("Download report thành công!");
      let a = document.createElement("a");
      a.href = URL.createObjectURL(res);
      a.download = "report " + Date.now().toString() + ".xlsx";
      a.click();
      setLoading(false);
    });
  };

  useEffect(() => {
    handleGetDataTable();
  }, []);

  const columnTableJobPostProps: any = [
    ...columnTableJobPost,
    {
      title: "Actions",
      dataIndex: "action",
      width: 300,
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
                  `${ROUTE.JOB_POST.UPDATE_JOB_POST}?${createSearchParams({
                    id: record.id,
                  }).toString()}`
                )
              }
            />
            <Button
              type="primary"
              ghost
              icon={<DownloadOutlined />}
              style={{ color: "#0050b3" }}
              onClick={() => handleDownloadReport(record.id)}
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
            Tìm thấy {listJobPosts?.length} Bài đăng tuyển dụng
          </h6>
          <BaseTable
            idKey="viewJobPost"
            columns={columnTableJobPostProps}
            data={{ items: listJobPosts }}
            paginationProps={{
              defaultPageSize: 10,
              total: listJobPosts?.length,
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

export default TableViewJobPosts;
