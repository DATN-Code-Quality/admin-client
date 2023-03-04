import React from "react";

import { PageHeader } from "antd";

import Loading from "src/ui/shared/loading";

import useQuery from "src/hooks/useQuery";

import FormAddCareerType from "../components/form-add-career-type/FormAddCareerType";

const CreateCareerType = () => {
  const query = useQuery();
  const id: any = query.get("id");
  const renderTitle = () => {
    const preTitle = id ? "Cập nhật " : "Tạo mới ";
    return `${preTitle}Ngành nghề`;
  };
  return (
    <>
      <PageHeader className="site-page-header" title={renderTitle()} ghost />
      <FormAddCareerType id={id} />
    </>
  );
};

export default CreateCareerType;
