import { Role, UserStatus } from '../constant/enum';

import { mockApi } from './mock.helper';

import { ResponseData } from '~/constant';
import { Category } from '~/domain/category';

export function mockCategory() {
  return {
    async getAllCategories(): Promise<ResponseData<Category[]>> {
      return mockApi([
        {
          id: '1',
          name: 'Category 1',
          status: UserStatus.ACTIVE,
          created_at: 1610000000,
          updated_at: 1610000000,
        },
        {
          id: '2',
          name: 'Category 2',
          status: UserStatus.ACTIVE,
          created_at: 1610000000,
          updated_at: 1610000000,
        },
        {
          id: '3',
          name: 'Category 3',
          status: UserStatus.ACTIVE,
          created_at: 1610000000,
          updated_at: 1610000000,
        },
        {
          id: '4',
          name: 'Category 4',
          status: UserStatus.ACTIVE,
          created_at: 1610000000,
          updated_at: 1610000000,
        },
        {
          id: '5',
          name: 'Category 5',
          status: UserStatus.ACTIVE,
          created_at: 1610000000,
          updated_at: 1610000000,
        },
      ]);
    },
  };
}
