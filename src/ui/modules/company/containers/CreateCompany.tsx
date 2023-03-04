import React from "react";

import { PageHeader } from "antd";

import Loading from "src/ui/shared/loading";

import useQuery from "src/hooks/useQuery";

import FormAddCompany from "../components/form-add-company/FormAddCompany";

const CreateCompany = () => {
  const query = useQuery();
  const id: any = query.get("id");
  const renderTitle = () => {
    const preTitle = id ? "Cập nhật " : "Tạo mới ";
    return `${preTitle}Công ty`;
  };
  return (
    <>
      <PageHeader className="site-page-header" title={renderTitle()} ghost />
      <FormAddCompany id={id} />
    </>
  );
};

export default CreateCompany;
