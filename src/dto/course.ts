import { StateStatus } from '../constant/enum';

import { BaseDTO } from './baseDTO';

import { Course } from '~/domain/course';

export interface CourseDTO extends BaseDTO {
  name: string;
  moodleId: string;
  courseMoodleId: string;
  startAt: Date;
  endAt: Date;
  detail: string | null;
  summary: string | null;
  categoryId: string;
}

export const courseFromDTO = (courseDTO: CourseDTO): Course => {
  return {
    id: courseDTO.id,
    name: courseDTO.name,
    moodleCourseId: courseDTO.courseMoodleId,
    startAt: new Date(parseInt(courseDTO.startAt, 10) * 1000).getTime(),
    endAt: new Date(parseInt(courseDTO.endAt, 10) * 1000).getTime(),
    detail: courseDTO.detail,
    summary: courseDTO.summary,
    categoryId: courseDTO.categoryId,

    dueDate: 0,
    description: '',
    attachmentFileLink: '',
    config: '',

    status: StateStatus.ACTIVE,
    createdAt: courseDTO.createdAt && new Date(courseDTO.createdAt).getTime(),
    updatedAt: courseDTO.updatedAt && new Date(courseDTO.updatedAt).getTime(),
    deletedAt: courseDTO.deletedAt && new Date(courseDTO.deletedAt).getTime(),
  };
};

export const courseToDTO = (course: Course): CourseDTO => {
  return {
    id: course.id,
    name: course.name,
    moodleId: course.moodleCourseId,
    courseMoodleId: course.moodleCourseId,
    startAt: new Date(course.startAt),
    endAt: new Date(course.endAt),
    detail: course.detail,
    summary: course.summary,
    categoryId: course.categoryId || '1',

    // dueDate: 0,
    // description: '',
    // attachmentFileLink: '',
    // config: '',

    // status: StateStatus.ACTIVE,
    createdAt: new Date(course.createdAt),
    updatedAt: new Date(course.updatedAt),
    deletedAt: new Date(course.deletedAt),
  };
};
