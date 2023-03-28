import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { Partner } from "~/src/domain/partner";

import API from "~/src/constant/api";
import ROUTE from "~/src/constant/routes";
import { mockPartner } from "~/src/mock/partner.mock";

import {
  postWithPath,
  putWithPath,
  formatResponse,
  getWithPath,
} from "../api.http";
import { ResponseData } from "~/src/constant";
import { mockAgency } from "~/src/mock/agency.mock";

export function usePartner() {
  const navigate = useNavigate();

  return {
    async getAllPartners(): Promise<ResponseData<Partner[]>> {
      // const data = await getWithPath(API.PARTNER.GET.PARTNERS);
      const data = await mockPartner().getAllPartners();
      return formatResponse(data);
    },

    async getAllAgencies(): Promise<ResponseData<Partner[]>> {
      // const data = await getWithPath(API.AGENCY.GET.AGENCYS);
      const data = await mockAgency().getAllAgencies();
      return formatResponse(data);
    },

    async createPartner(body): Promise<ResponseData<Partner>> {
      const data = await postWithPath(
        `${API.PARTNER.POST.CREATE_PARTNER}`,
        {},
        body
      );
      if (data.success) {
        message.success(`Tạo mới partner thành công!`);
        navigate(ROUTE.PARTNER.LIST);
      } else {
        message.error("Tạo mới partner thất bại!");
      }
      return formatResponse(data);
    },

    async getDetailPartner(id: number): Promise<ResponseData<Partner>> {
      const data = await getWithPath(
        `${API.PARTNER.GET.PARTNERS}/${id}`,
        {}
      );
      return formatResponse(data);
    },

    async updatePartner(body): Promise<ResponseData<Partner>> {
      const data = await putWithPath(
        `${API.PARTNER.PUT.UPDATE_PARTNER}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
        navigate(ROUTE.PARTNER.LIST);
      }
      return formatResponse(data);
    },

    async blockPartner(body): Promise<ResponseData<Partner>> {
      const data = await putWithPath(
        `${API.PARTNER.PUT.UPDATE_PARTNER}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
        navigate(ROUTE.PARTNER.LIST);
      }
      return formatResponse(data);
    },

    async unblockPartner(body): Promise<ResponseData<Partner>> {
      const data = await putWithPath(
        `${API.PARTNER.PUT.UPDATE_PARTNER}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
        navigate(ROUTE.PARTNER.LIST);
      }
      return formatResponse(data);
    },
  };
}
