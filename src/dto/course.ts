import { UserStatus } from '../constant/enum';

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
    courseMoodleId: courseDTO.courseMoodleId,
    startAt: new Date(courseDTO.startAt).getTime(),
    endAt: new Date(courseDTO.endAt).getTime(),
    detail: courseDTO.detail,
    summary: courseDTO.summary,
    categoryId: courseDTO.categoryId,

    dueDate: 0,
    description: '',
    attachmentFileLink: '',
    config: '',

    createdAt: new Date(courseDTO.createdAt || new Date()).getTime(),
    updatedAt: new Date(courseDTO.updatedAt || new Date()).getTime(),
  };
};

export const courseToDTO = (course: Course): CourseDTO => {
  return {
    id: course.id,
    name: course.name,
    moodleId: course.courseMoodleId,
    courseMoodleId: course.courseMoodleId,
    startAt: new Date(course.startAt),
    endAt: new Date(course.endAt),
    detail: course.detail,
    summary: course.summary,
    categoryId: course.categoryId,

    // dueDate: 0,
    // description: '',
    // attachmentFileLink: '',
    // config: '',

    // status: StateStatus.ACTIVE,
  };
};
