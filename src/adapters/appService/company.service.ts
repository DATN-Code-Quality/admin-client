import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { Company } from "src/domain/company";

import API from "src/constant/api";
import ROUTE from "src/constant/routes";
import { mockCompany } from "src/mock/company.mock";

import {
  postWithPath,
  putWithPath,
  formatResponse,
  getWithPath,
} from "../api.http";

export function useCompany() {
  const navigate = useNavigate();

  return {
    async getAllCompanies(): Promise<Company[]> {
      // const data = await getWithPath(API.COMPANY.GET.COMPANIES);
      const data = await mockCompany().getAllCompanies();
      return formatResponse(data);
    },

    async createCompany(body): Promise<Company> {
      const data = await postWithPath(
        `${API.COMPANY.POST.CREATE_COMPANY}`,
        {},
        body
      );
      if (data.success) {
        message.success(`Tạo mới company thành công!`);
        navigate(ROUTE.COMPANY.LIST);
      } else {
        message.error("Tạo mới company thất bại!");
      }
      return formatResponse(data);
    },

    async getDetailCompany(id: number): Promise<Company> {
      const data = await getWithPath(`${API.COMPANY.GET.COMPANIES}/${id}`, {});
      return formatResponse(data);
    },

    async updateCompany(body): Promise<Company> {
      const data = await putWithPath(
        `${API.COMPANY.PUT.UPDATE_COMPANY}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
        navigate(ROUTE.COMPANY.LIST);
      }
      return formatResponse(data);
    },
  };
}
