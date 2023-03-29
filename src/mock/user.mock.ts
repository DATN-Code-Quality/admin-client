import { Role, StateStatus } from '../constant/enum';

import { mockApi } from './mock.helper';

import { ResponseData } from '~/constant';
import { User } from '~/domain/user';

export function mockUser() {
  return {
    async getAllUsers(): Promise<ResponseData<User[]>> {
      return mockApi([
        {
          id: 1,
          moodleId: 1,
          email: 'a@hcmus.edu.vn',
          name: 'User 1',
          roles: [Role.TEACHER],
          phone_number: '0123456789',
          partner_id: 1,
          status: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: 2,
          moodleId: 2,
          email: 'b@hcmus.edu.vn',
          name: 'User 2',
          roles: [Role.ADMIN],
          phone_number: '0123456789',
          partner_id: 2,
          status: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: 3,
          moodleId: 3,
          email: 'c@hcmus.edu.vn',
          name: 'User 3',
          roles: [Role.STUDENT],
          phone_number: '0123456789',
          partner_id: 3,
          status: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: 4,
          moodleId: 4,
          email: 'd@hcmus.edu.vn',
          name: 'User 4',
          roles: [Role.TEACHER],
          phone_number: '0123456789',
          partner_id: 4,
          status: StateStatus.INACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: 5,
          moodleId: 5,
          email: 'e@hcmus.edu.vn',
          name: 'User 5',
          roles: [Role.TEACHER],
          phone_number: '0123456789',
          partner_id: 5,
          status: StateStatus.INACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: 6,
          moodleId: 6,
          email: 'f@hcmus.edu.vn',
          name: 'User 6',
          roles: [Role.TEACHER],
          phone_number: '0123456789',
          partner_id: 2,
          status: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: 7,
          moodleId: 7,
          email: 'g@hcmus.edu.vn',
          name: 'User 7',
          roles: [Role.TEACHER],
          phone_number: '0123456789',
          partner_id: 3,
          status: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
      ]);
    },
  };
}
