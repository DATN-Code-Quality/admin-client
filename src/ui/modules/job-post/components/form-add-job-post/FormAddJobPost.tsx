/* eslint-disable camelcase */
import { useCallback, useEffect, useState } from "react";

import { Button, Form, message, Space } from "antd";
import { useNavigate } from "react-router-dom";

import { CareerType } from "src/domain/careerType";
import { Company } from "src/domain/company";

import { useCareerType } from "src/adapters/appService/careerType.service";
import { useCompany } from "src/adapters/appService/company.service";
import { useJobPost } from "src/adapters/appService/jobPost.service";

import FormBuilder from "src/ui/shared/forms";
import Loading from "src/ui/shared/loading";

import ROUTE from "src/constant/routes";
import { getPromiseSettleResponseValue } from "src/utils";

import { metaFormAddJobPost } from "./props";

const FormAddJobPost = ({ id }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { getDetailJobPost, createJobPost, updateJobPost } = useJobPost();
  const { getAllCompanies } = useCompany();
  const { getAllCareerTypes } = useCareerType();

  const [loading, setLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [careerTypes, setCareerTypes] = useState<CareerType[]>([]);

  const handleSubmitFail = (errMsg) => (err) => {
    console.log("err submit", err);
    message.error(errMsg);
    setLoading(false);
  };

  const handleSubmitSuccess = (successMsg) => () => {
    message.success(successMsg);
    navigate(ROUTE.JOB_POST.LIST);
  };

  const handleSubmit = useCallback((values) => {
    setLoading(true);
    const dataSubmit = {
      ...values,
    };
    if (id) {
      dataSubmit.id = id;
      // TODO: remove hardcode deadline
      dataSubmit.deadline_at = 0;
      updateJobPost(dataSubmit)
        .then(handleSubmitSuccess("Cập nhật Bài đăng tuyển dụng thành công!"))
        .catch(handleSubmitFail("Cập nhật Bài đăng tuyển dụng thất bại!"));
    } else {
      createJobPost(dataSubmit)
        .then(handleSubmitSuccess("Tạo mới Bài đăng tuyển dụng thành công!"))
        .catch(handleSubmitFail("Tạo mới Bài đăng tuyển dụng thất bại!"));
    }
  }, []);

  const handleClearLocationSelection = (fields = ["district", "ward"]) => {
    const fieldsToClear = fields.map((field) => `job_address_${field}`);
    const fieldsToClearValue = fieldsToClear.reduce(
      (acc, field) => ({
        ...acc,
        [field]: null,
      }),
      {}
    );
    form.setFieldsValue(fieldsToClearValue);
  };

  const handleSelectCompany: (companyId) => void = (companyId) => {
    const selectedCompany = companies.find((comp) => comp.id === companyId);
    form.setFieldValue("company_logo_url", selectedCompany.logo_url);
  };

  useEffect(() => {
    const handleGetMetaData = async () => {
      const initialData = await Promise.allSettled([
        getAllCompanies(),
        getAllCareerTypes(),
      ]);

      const [fetchedCompanies, fetchedCareerTypes] = initialData.map(
        getPromiseSettleResponseValue
      );

      setCompanies(fetchedCompanies);
      setCareerTypes(fetchedCareerTypes);
      if (id) {
        const detailJobPost = await getDetailJobPost(id);
        const { company_id } = detailJobPost;
        const selectedCompany = fetchedCompanies.find(
          (comp) => comp.id === company_id
        );
        form.setFieldsValue(detailJobPost);
        form.setFieldValue("company_logo_url", selectedCompany?.logo_url);

        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    handleGetMetaData();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Form form={form} onFinish={handleSubmit} className="site-page-content">
          <FormBuilder
            meta={metaFormAddJobPost({
              companies,
              careerTypes,
              handleSelectCompany,
            })}
          />
          <Form.Item wrapperCol={{ offset: 2, span: 18 }}>
            <Space>
              <Button type="primary" htmlType="submit" size="large">
                Lưu thông tin
              </Button>
            </Space>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default FormAddJobPost;
