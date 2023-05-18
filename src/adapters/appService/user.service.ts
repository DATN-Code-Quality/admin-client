import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

import {
  postWithPath,
  putWithPath,
  formatResponse,
  getWithPath,
} from '../api.http';

import { ResponseData } from '~/constant';
import API, { USER } from '~/constant/api';
import { UserStatus } from '~/constant/enum';
import ROUTE from '~/constant/routes';
import { UserFilter } from '~/constant/type';
import { User } from '~/domain/user';
import { removeSubmitProps } from '~/dto/baseDTO';
import { UserDTO, userFromDTO, userToDTO } from '~/dto/user';

export function useUser() {
  const navigate = useNavigate();

  return {
    async getAllUsers(filter?: UserFilter): Promise<ResponseData<User[]>> {
      const response = await getWithPath(API.USER.GET.USERS, filter);
      const validResponse = formatResponse<UserDTO[]>(response);
      const convertedData = validResponse.data.map(userFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async getAllMoodleUsers(
      filter?: UserFilter
    ): Promise<ResponseData<User[]>> {
      const response = await getWithPath(API.USER.GET.MOODLE_USERS, filter);
      const validResponse = formatResponse<UserDTO[]>(response);
      const convertedData = validResponse.data.map(userFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async importUsers(body): Promise<ResponseData<User[]>> {
      const submitData = body.map((user) => {
        return removeSubmitProps(userToDTO(user));
      });
      const response = await postWithPath(
        `${API.USER.POST.IMPORT_USER}`,
        {},
        submitData
      );
      const validResponse = formatResponse<UserDTO[]>(response);
      const convertedData = validResponse.data.map(userFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async createUser(body): Promise<ResponseData<User>> {
      const submitData = userToDTO(body);
      const response = await postWithPath(
        `${API.USER.POST.CREATE_USER}`,
        {},
        submitData
      );
      const validResponse = formatResponse<UserDTO>(response);
      const convertedData = userFromDTO(validResponse.data);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async getDetailUser(id: number): Promise<ResponseData<User>> {
      const data = await getWithPath(`${API.USER.GET.USERS}/${id}`, {});
      return formatResponse(data);
    },

    async updateUser(body): Promise<ResponseData<User>> {
      const response = await putWithPath(
        `${API.USER.PUT.UPDATE_USER}/${body?.id}`,
        {},
        body
      );
      const validResponse = formatResponse<UserDTO>(response);
      const convertedData = userFromDTO(validResponse.data);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async blockUser(id): Promise<ResponseData<User>> {
      const data = await putWithPath(
        `${API.USER.PUT.UPDATE_USER}/change-status`,
        {},
        { ids: [id], status: UserStatus.BLOCK }
      );
      return formatResponse(data);
    },

    async unblockUser(id): Promise<ResponseData<User>> {
      const data = await putWithPath(
        `${API.USER.PUT.UPDATE_USER}/change-status`,
        {},
        { ids: [id], status: UserStatus.ACTIVE }
      );
      return formatResponse(data);
    },
  };
}
