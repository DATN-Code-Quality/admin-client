import { formatResponse, getWithPath, postWithPath } from '../api.http';

import { ResponseData } from '~/constant';
import API from '~/constant/api';
import { User } from '~/domain/user';
import { removeSubmitProps } from '~/dto/baseDTO';
import { UserDTO, userFromDTO, userToDTO } from '~/dto/user';

export function useMoodle() {
  return {
    async checkConnect(): Promise<ResponseData<boolean>> {
      const response = await getWithPath(API.MOODLE.GET.CHECK_CONNECT);
      const validResponse = formatResponse<boolean>(response);
      return validResponse;
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

    async createConnect(body): Promise<ResponseData<any>> {
      const submitData = body;
      const response = await postWithPath(
        `${API.MOODLE.POST.CONNECT}`,
        {},
        submitData
      );
      const validResponse = formatResponse<any>(response);
      return validResponse;
    },
  };
}
