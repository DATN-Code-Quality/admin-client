import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

import {
  postWithPath,
  putWithPath,
  formatResponse,
  getWithPath,
} from '../api.http';

import { ResponseData } from '~/constant';
import API from '~/constant/api';
import { ApiStatus } from '~/constant/enum';
import ROUTE from '~/constant/routes';
import { Assignment } from '~/domain/assignment';
import { Course } from '~/domain/course';
import { User } from '~/domain/user';
import { removeSubmitProps } from '~/dto/baseDTO';
import { CourseDTO, courseFromDTO, courseToDTO } from '~/dto/course';
import { UserDTO, userFromDTO } from '~/dto/user';
import { mockCourse } from '~/mock/course.mock';

export function useCourse() {
  const navigate = useNavigate();

  return {
    async getAllCourses(): Promise<ResponseData<Course[]>> {
      const response = await getWithPath(API.COURSE.GET.COURSES);
      const validResponse = formatResponse<CourseDTO[]>(response);
      const convertedData = validResponse.data.map(courseFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async getAllMoodleCourses(): Promise<ResponseData<Course[]>> {
      const response = await getWithPath(API.COURSE.GET.MOODLE_COURSES);
      const validResponse = formatResponse<CourseDTO[]>(response);
      const convertedData = validResponse.data.map(courseFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async getDetailCourse(id: string): Promise<ResponseData<Course>> {
      const response = await getWithPath(`${API.COURSE.GET.COURSE}/${id}`);
      const validResponse = formatResponse<CourseDTO>(response);
      const convertedData = courseFromDTO(validResponse.data);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async getParticipantsByCourseId(
      courseId: string
    ): Promise<ResponseData<User[]>> {
      const response = await getWithPath(
        // `${API.USER_COURSE.GET.USER_COURSE}/${courseId}/users`
        `${API.USER_COURSE.GET.USER_COURSE}/${courseId}/users`
      );
      const validResponse = formatResponse<UserDTO[]>(response);
      const convertedData = validResponse.data.map(userFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async getMoodleParticipantsByCourseId(
      courseId: string,
      params: { courseMoodleId: string }
    ): Promise<ResponseData<User[]>> {
      const response = await getWithPath(
        // `${API.USER_COURSE.GET.USER_COURSE}/${courseId}/users`
        `${API.USER_COURSE.GET.MOODLE_USERS_COURSE}`,
        params
      );
      const validResponse = formatResponse<UserDTO[]>(response);
      const convertedData = validResponse.data.map(userFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async createCourse(body): Promise<ResponseData<Course[]>> {
      const submitData = body.map((course) => {
        return removeSubmitProps(courseToDTO(course));
      });
      const response = await postWithPath(
        `${API.COURSE.POST.CREATE_COURSE}`,
        {},
        submitData
      );
      const validResponse = formatResponse<Course[]>(response);
      return validResponse;
    },

    async updateCourse(body): Promise<ResponseData<Course>> {
      const response = await putWithPath(
        `${API.PARTNER.PUT.UPDATE_PARTNER}/${body?.id}`,
        {},
        body
      );
      return formatResponse(response);
    },

    async blockCourse(body): Promise<ResponseData<Course>> {
      const response = await putWithPath(
        `${API.PARTNER.PUT.UPDATE_PARTNER}/${body?.id}`,
        {},
        body
      );
      return formatResponse(response);
    },

    async unblockCourse(body): Promise<ResponseData<Course>> {
      const response = await putWithPath(
        `${API.PARTNER.PUT.UPDATE_PARTNER}/${body?.id}`,
        {},
        body
      );
      return formatResponse(response);
    },
  };
}
