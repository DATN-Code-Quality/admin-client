import { ResponseData } from '~/constant';
import { mockApi } from './mock.helper';

export function mockAuth() {
  return {
    async checkSession(): Promise<ResponseData<any>> {
      return mockApi({
        user_id: 162995127778837980,
        name: 'Tien',
        avatar:
          'https://s240.avatar.talk.zdn.vn/b/6/8/f/6/240/44a5399483aa1c232bc7eb8d6f38663f.jpg',
        roles: '[2]',
      });
    },
    async loginZalo(): Promise<ResponseData<string>> {
      return mockApi('http://localhost:3000/');
    },
    async logout(): Promise<ResponseData<string>> {
      return mockApi('');
    },
  };
}
