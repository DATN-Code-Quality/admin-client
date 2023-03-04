import React from "react";

import { PageHeader } from "antd";

import Loading from "src/ui/shared/loading";

import useQuery from "src/hooks/useQuery";

import FormAddJobPost from "../components/form-add-job-post/FormAddJobPost";

const CreateJobPost = () => {
  const query = useQuery();
  const id: any = query.get("id");
  const renderTitle = () => {
    const preTitle = id ? "Cập nhật " : "Tạo mới ";
    return `${preTitle}Bài đăng tuyển dụng`;
  };
  return (
    <>
      <PageHeader className="site-page-header" title={renderTitle()} ghost />
      <FormAddJobPost id={id} />
    </>
  );
};

export default CreateJobPost;
