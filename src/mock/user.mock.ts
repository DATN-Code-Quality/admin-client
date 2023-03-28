import { Role, StateStatus } from '../constant/enum';

import { mockApi } from './mock.helper';

import { ResponseData } from '~/constant';
import { User } from '~/domain/user';

export function mockUser() {
  return {
    async getAllUsers(): Promise<ResponseData<User[]>> {
      return mockApi([
        {
          user_id: 1,
          name: 'User 1',
          roles: [Role.SYSTEM_ADMIN],
          phone_number: '0123456789',
          partner_id: 1,
          state: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          user_id: 2,
          name: 'User 2',
          roles: [Role.ADMIN],
          phone_number: '0123456789',
          partner_id: 2,
          state: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          user_id: 3,
          name: 'User 3',
          roles: [Role.USER],
          phone_number: '0123456789',
          partner_id: 3,
          state: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          user_id: 4,
          name: 'User 4',
          roles: [Role.SYSTEM_ADMIN],
          phone_number: '0123456789',
          partner_id: 4,
          state: StateStatus.INACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          user_id: 5,
          name: 'User 5',
          roles: [Role.SYSTEM_ADMIN],
          phone_number: '0123456789',
          partner_id: 5,
          state: StateStatus.INACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          user_id: 6,
          name: 'User 6',
          roles: [Role.SYSTEM_ADMIN],
          phone_number: '0123456789',
          partner_id: 2,
          state: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          user_id: 7,
          name: 'User 7',
          roles: [Role.SYSTEM_ADMIN],
          phone_number: '0123456789',
          partner_id: 3,
          state: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
      ]);
    },
  };
}
