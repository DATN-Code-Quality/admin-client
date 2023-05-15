import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

import {
  postWithPath,
  putWithPath,
  formatResponse,
  getWithPath,
} from '../api.http';

import { ResponseData } from '~/constant';
import API from '~/constant/api';
import ROUTE from '~/constant/routes';
import { User } from '~/domain/user';
import { removeSubmitProps } from '~/dto/baseDTO';
import { UserDTO, userFromDTO, userToDTO } from '~/dto/user';

export function useUser() {
  const navigate = useNavigate();

  return {
    async getAllUsers(): Promise<ResponseData<User[]>> {
      const response = await getWithPath(API.USER.GET.USERS);
      const validResponse = formatResponse<UserDTO[]>(response);
      const convertedData = validResponse.data.map(userFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async getAllMoodleUsers(): Promise<ResponseData<User[]>> {
      const response = await getWithPath(API.USER.GET.MOODLE_USERS);
      const validResponse = formatResponse<UserDTO[]>(response);
      const convertedData = validResponse.data.map(userFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async createUser(body): Promise<ResponseData<User[]>> {
      const submitData = body.map((user) => {
        return removeSubmitProps(userToDTO(user));
      });
      const response = await postWithPath(
        `${API.USER.POST.CREATE_USER}`,
        {},
        submitData
      );
      const validResponse = formatResponse<User[]>(response);
      return validResponse;
    },

    async getDetailUser(id: number): Promise<ResponseData<User>> {
      const data = await getWithPath(`${API.USER.GET.USERS}/${id}`, {});
      return formatResponse(data);
    },

    async updateUser(body): Promise<ResponseData<User>> {
      const data = await putWithPath(
        `${API.USER.PUT.UPDATE_USER}/${body?.id}`,
        {},
        body
      );
      return formatResponse(data);
    },

    async blockUser(body): Promise<ResponseData<User>> {
      const data = await putWithPath(
        `${API.USER.PUT.UPDATE_USER}/${body?.id}`,
        {},
        body
      );
      return formatResponse(data);
    },

    async unblockUser(body): Promise<ResponseData<User>> {
      const data = await putWithPath(
        `${API.USER.PUT.UPDATE_USER}/${body?.id}`,
        {},
        body
      );
      return formatResponse(data);
    },
  };
}
