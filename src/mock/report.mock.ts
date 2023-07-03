import { User } from '~/domain/user';
import { Role, UserStatus } from '../constant/enum';

import { mockApi } from './mock.helper';

import { ResponseData } from '~/constant';
import { Category } from '~/domain/category';
import { Result } from '~/adapters/appService/statistics.service';
import { UserDTO } from '~/dto/user';

export function mockReport() {
  return {
    async geCourseStatistics(): Promise<ResponseData<{ result: Result }>> {
      return mockApi({
        result: {
          total: '218',
          code_smells: '212',
          bugs: '7',
          vulnerabilities: '0',
          blocker_violations: '5',
          critical_violations: '17',
          major_violations: '102',
          info_violations: '25',
          minor_violations: '71',
          duplicated_lines_density: 9.9,
          coverage: 0,
        },
        role: 'teacher',
      });
    },

    async getCourseUserStatistics(): Promise<
      ResponseData<{
        results: {
          user: any;
          result: Result;
        }[];
      }>
    > {
      return mockApi({
        results: [
          {
            user: {
              id: 'edb9d406-5ceb-495a-99d7-3d1ab4ecff20',
              createdAt: '2023-07-03T04:11:42.679Z',
              updatedAt: '2023-07-03T04:13:35.000Z',
              deletedAt: null,
              name: 'Vỹ Trần Ngọc',
              role: 'student',
              email: '19120731@student.hcmus.edu.vn',
              userId: '19120731',
              moodleId: '23',
              status: 0,
            },
            result: {
              violations: '14',
              code_smells: '14',
              bugs: '0',
              vulnerabilities: '0',
              blocker_violations: '0',
              critical_violations: '1',
              major_violations: '8',
              minor_violations: '5',
              info_violations: '0',
              duplicated_lines_density: 0,
              coverage: 0,
            },
          },
          {
            user: {
              id: '9e102cf0-f565-4ba6-bab8-a04baeb16760',
              createdAt: '2023-07-03T04:11:42.681Z',
              updatedAt: '2023-07-03T04:13:35.000Z',
              deletedAt: null,
              name: 'Vin Tô Đình Vin',
              role: 'student',
              email: '19120718@student.hcmus.edu.vn',
              userId: '19120718',
              moodleId: '24',
              status: 0,
            },
            result: {
              violations: null,
              code_smells: null,
              bugs: null,
              vulnerabilities: null,
              blocker_violations: null,
              critical_violations: null,
              major_violations: null,
              minor_violations: null,
              info_violations: null,
              duplicated_lines_density: null,
              coverage: null,
            },
          },
        ],
        role: 'teacher',
      });
    },
  };
}
