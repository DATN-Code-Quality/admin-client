import { Role, StateStatus } from '../constant/enum';

import { mockApi } from './mock.helper';
import { mockUser } from './user.mock';

import { ResponseData } from '~/constant';
import { Assignment } from '~/domain/assignment';
import { Course } from '~/domain/course';
import { User } from '~/domain/user';

export function mockCourse() {
  return {
    async getAllCourses(): Promise<ResponseData<Course[]>> {
      return mockApi([
        {
          id: '1',
          name: 'Course 1',
          dueDate: new Date(1676347525000),
          moodleCourseId: '1',
          description: 'Course 1',
          config: '',
          status: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: '2',
          name: 'Course 2',
          dueDate: new Date(1676347525000),
          moodleCourseId: '2',
          description: 'Course 2',
          config: '',
          status: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: '3',
          name: 'Course 3',
          dueDate: new Date(1676347525000),
          moodleCourseId: '3',
          description: 'Course 3',
          config: '',
          status: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: '4',
          name: 'Course 4',
          dueDate: new Date(1676347525000),
          moodleCourseId: '4',
          description: 'Course 4',
          config: '',
          status: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: '5',
          name: 'Course 5',
          dueDate: new Date(1676347525000),
          moodleCourseId: '5',
          description: 'Course 5',
          config: '',
          status: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: '6',
          name: 'Course 6',
          dueDate: new Date(1676347525000),
          moodleCourseId: '6',
          description: 'Course 6',
          config: '',
          status: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
        {
          id: '7',
          name: 'Course 7',
          dueDate: new Date(1676347525000),
          moodleCourseId: '7',
          description: 'Course 7',
          config: '',
          status: StateStatus.ACTIVE,
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
      ]);
    },
    async getCourseById(id: string): Promise<ResponseData<Course>> {
      return mockApi({
        id: '1',
        name: 'Course 1',
        dueDate: new Date(1676347525000),
        moodleCourseId: '1',
        description: 'Course 1',
        config: '',
        status: StateStatus.ACTIVE,
        created_at: 1676347525000,
        updated_at: 1677467490000,
      });
    },
    async getParticipantsByCourseId(id: string): Promise<ResponseData<User[]>> {
      return mockUser().getAllUsers();
    },
    async getAssignmentsByCourseId(
      id: string
    ): Promise<ResponseData<Assignment[]>> {
      return mockApi([
        {
          id: '1',
          name: 'Assignment 1',
          dueDate: new Date(1676347525000),
          status: StateStatus.ACTIVE,
          courseId: '1',
          description: 'Assignment 1',
          attachmentFileLink: '',
          config: '',
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
          config: '',
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
          config: '',
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
          config: '',
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
          config: '',
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
          config: '',
          created_at: 1676347525000,
          updated_at: 1677467490000,
        },
      ]);
    },
  };
}
