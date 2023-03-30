import { StateStatus } from '../constant/enum';

import { mockApi } from './mock.helper';

import { ResponseData } from '~/constant';
import { Assignment } from '~/domain/assignment';

export function mockAssignment() {
  return {
    async getAllAssignments(): Promise<ResponseData<Assignment[]>> {
      return mockApi([
        {
          id: '1',
          name: 'Assignment 1',
          dueDate: new Date(1676347525000),
          status: StateStatus.ACTIVE,
          courseId: '1',
          description: 'Assignment 1',
          attachmentFileLink: '',
          config: 'Config 1',
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: '2',
          name: 'Assignment 2',
          dueDate: new Date(1676347525000),
          status: StateStatus.ACTIVE,
          courseId: '1',
          description: 'Assignment 2',
          attachmentFileLink: '',
          config: 'Config 2',
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: '3',
          name: 'Assignment 3',
          dueDate: new Date(1676347525000),
          status: StateStatus.ACTIVE,
          courseId: '1',
          description: 'Assignment 3',
          attachmentFileLink: '',
          config: 'Config 3',
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: '4',
          name: 'Assignment 4',
          dueDate: new Date(1676347525000),
          status: StateStatus.ACTIVE,
          courseId: '1',
          description: 'Assignment 4',
          attachmentFileLink: '',
          config: 'Config 4',
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: '5',
          name: 'Assignment 5',
          dueDate: new Date(1676347525000),
          status: StateStatus.ACTIVE,
          courseId: '1',
          description: 'Assignment 5',
          attachmentFileLink: '',
          config: 'Config 5',
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: '6',
          name: 'Assignment 6',
          dueDate: new Date(1676347525000),
          status: StateStatus.ACTIVE,
          courseId: '1',
          description: 'Assignment 6',
          attachmentFileLink: '',
          config: 'Config 6',
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: '7',
          name: 'Assignment 7',
          dueDate: new Date(1676347525000),
          status: StateStatus.ACTIVE,
          courseId: '1',
          description: 'Assignment 7',
          attachmentFileLink: '',
          config: 'Config 7',
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: '8',
          name: 'Assignment 8',
          dueDate: new Date(1676347525000),
          status: StateStatus.ACTIVE,
          courseId: '1',
          description: 'Assignment 8',
          attachmentFileLink: '',
          config: 'Config 8',
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: '9',
          name: 'Assignment 9',
          dueDate: new Date(1676347525000),
          status: StateStatus.ACTIVE,
          courseId: '1',
          description: 'Assignment 9',
          attachmentFileLink: '',
          config: 'Config 9',
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
      ]);
    },
    async getAssignmentById(id: string): Promise<ResponseData<Assignment>> {
      return mockApi({
        id: '1',
        name: 'Assignment 1',
        dueDate: new Date(1676347525000),
        status: StateStatus.ACTIVE,
        courseId: '1',
        description: 'Assignment 1',
        attachmentFileLink: '',
        config: 'Config 1',
        created_at: 1676347525000,
        updated_at: 1677467490000,
      });
    },
    // async getParticipantsByAssignmentId(id: string): Promise<ResponseData<User[]>> {
    //   return mockUser().getAllUsers();
    // },
  };
}
