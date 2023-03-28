import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { User } from "~/src/domain/user";

import API from "~/src/constant/api";
import ROUTE from "~/src/constant/routes";
import { mockUser } from "~/src/mock/user.mock";

import {
  postWithPath,
  putWithPath,
  formatResponse,
  getWithPath,
} from "../api.http";
import { ResponseData } from "~/src/constant";

export function useUser() {
  const navigate = useNavigate();

  return {
    async getAllUsers(): Promise<ResponseData<User[]>> {
      // const data = await getWithPath(API.USER.GET.USERS);
      const data = await mockUser().getAllUsers();
      return formatResponse(data);
    },

    async createUser(body): Promise<ResponseData<User>> {
      const data = await postWithPath(
        `${API.USER.POST.CREATE_USER}`,
        {},
        body
      );
      if (data.success) {
        message.success(`Tạo mới user thành công!`);
        navigate(ROUTE.USER.LIST);
      } else {
        message.error("Tạo mới user thất bại!");
      }
      return formatResponse(data);
    },

    async getDetailUser(id: number): Promise<ResponseData<User>> {
      const data = await getWithPath(
        `${API.USER.GET.USERS}/${id}`,
        {}
      );
      return formatResponse(data);
    },

    async updateUser(body): Promise<ResponseData<User>> {
      const data = await putWithPath(
        `${API.USER.PUT.UPDATE_USER}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
      }
      return formatResponse(data);
    },

    async blockUser(body): Promise<ResponseData<User>> {
      const data = await putWithPath(
        `${API.USER.PUT.UPDATE_USER}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
      }
      return formatResponse(data);
    },

    async unblockUser(body): Promise<ResponseData<User>> {
      const data = await putWithPath(
        `${API.USER.PUT.UPDATE_USER}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
      }
      return formatResponse(data);
    },
  };
  
}
