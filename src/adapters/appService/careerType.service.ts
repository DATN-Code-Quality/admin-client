import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { CareerType } from "src/domain/careerType";

import API from "src/constant/api";
import ROUTE from "src/constant/routes";
import { mockCareerType } from "src/mock/careerType.mock";

import {
  postWithPath,
  putWithPath,
  formatResponse,
  getWithPath,
} from "../api.http";

export function useCareerType() {
  const navigate = useNavigate();

  return {
    async getAllCareerTypes(): Promise<CareerType[]> {
      // const data = await getWithPath(API.CAREER_TYPE.GET.CAREER_TYPES);
      const data = await mockCareerType().getAllCareerTypes();
      return formatResponse(data);
    },

    async createCareerType(body): Promise<CareerType> {
      const data = await postWithPath(
        `${API.CAREER_TYPE.POST.CREATE_CAREER_TYPE}`,
        {},
        body
      );
      if (data.success) {
        message.success(`Tạo mới career type thành công!`);
        navigate(ROUTE.CAREER_TYPE.LIST);
      } else {
        message.error("Tạo mới career type thất bại!");
      }
      return formatResponse(data);
    },

    async getDetailCareerType(id: number): Promise<CareerType> {
      const data = await getWithPath(
        `${API.CAREER_TYPE.GET.CAREER_TYPES}/${id}`,
        {}
      );
      return formatResponse(data);
    },

    async updateCareerType(body): Promise<CareerType> {
      const data = await putWithPath(
        `${API.CAREER_TYPE.PUT.UPDATE_CAREER_TYPE}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
        navigate(ROUTE.CAREER_TYPE.LIST);
      }
      return formatResponse(data);
    },
  };
}
