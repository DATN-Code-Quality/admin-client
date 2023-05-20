import { useNavigate } from 'react-router-dom';

import {
  formatResponse,
  getWithPath,
  postWithPath,
  putWithPath,
} from '../api.http';

import { ResponseData } from '~/constant';
import API from '~/constant/api';
import { SubRole } from '~/constant/enum';
import { CourseFilter, ParticipantFilter } from '~/constant/type';
import { Course, ReportCourse } from '~/domain/course';
import { User } from '~/domain/user';
import { removeSubmitProps } from '~/dto/baseDTO';
import { CourseDTO, courseFromDTO, courseToDTO } from '~/dto/course';
import { UserDTO, userFromDTO } from '~/dto/user';

export function useCourse() {
  const navigate = useNavigate();

  return {
    async getAllCourses(
      filter?: CourseFilter
    ): Promise<ResponseData<Course[]>> {
      const response = await getWithPath(API.COURSE.GET.COURSES, filter);
      const validResponse = formatResponse<CourseDTO[]>(response);
      const convertedData = validResponse.data.map(courseFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async getReportCourse(courseId: string): Promise<
      ResponseData<{
        role: SubRole;
        report: { total: number; assignment: ReportCourse[] };
      }>
    > {
      const response = await getWithPath(
        `${API.COURSE.GET.COURSE}/${courseId}/report`
      );

      return response;
    },

    async getAllMyCourses(
      filter?: CourseFilter
    ): Promise<ResponseData<Course[]>> {
      const response = await getWithPath(
        API.USER_COURSE.GET.COURSES_OF_USER,
        filter
      );
      const validResponse = formatResponse<CourseDTO[]>(response);
      const convertedData = validResponse.data.map(courseFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async getAllMoodleCourses(
      filter?: CourseFilter
    ): Promise<ResponseData<Course[]>> {
      const response = await getWithPath(API.COURSE.GET.MOODLE_COURSES, filter);
      const validResponse = formatResponse<CourseDTO[]>(response);
      const convertedData = validResponse.data.map(courseFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async getDetailCourse(
      id: string
    ): Promise<ResponseData<{ role: SubRole; course: Course }>> {
      const response = await getWithPath(`${API.COURSE.GET.COURSE}/${id}`);
      const validResponse = formatResponse<{
        role: SubRole;
        course: CourseDTO;
      }>(response);
      const convertedData = courseFromDTO(validResponse.data.course);
      const covertedResponse = {
        ...validResponse,
        data: { ...validResponse.data, course: convertedData },
      };
      return covertedResponse;
    },

    async getParticipantsByCourseId(
      courseId: string,
      filter?: ParticipantFilter
    ): Promise<ResponseData<{ role: SubRole; users: User[] }>> {
      const response = await getWithPath(
        `${API.USER_COURSE.GET.USER_COURSE}/${courseId}/users`,
        filter
      );
      const validResponse = formatResponse<{ role: SubRole; users: UserDTO[] }>(
        response
      );
      const convertedData = validResponse.data.users.map(userFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: { ...validResponse.data, users: convertedData },
      };
      return covertedResponse;
    },

    async getMoodleParticipantsByCourseId(
      courseId: string,
      params: { courseMoodleId: string },
      filter?: ParticipantFilter
    ): Promise<ResponseData<User[]>> {
      const response = await getWithPath(
        // `${API.USER_COURSE.GET.USER_COURSE}/${courseId}/users`
        `${API.USER_COURSE.GET.MOODLE_USERS_COURSE}`,
        { ...params, ...filter }
      );
      const validResponse = formatResponse<UserDTO[]>(response);
      const convertedData = validResponse.data.map(userFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async importCourses(body): Promise<ResponseData<Course[]>> {
      const submitData = body.map((course) => {
        return removeSubmitProps(courseToDTO(course));
      });
      const response = await postWithPath(
        `${API.COURSE.POST.CREATE_COURSE}`,
        {},
        submitData
      );
      const validResponse = formatResponse<CourseDTO[]>(response);
      const convertedData = validResponse.data.map(courseFromDTO);
      const covertedResponse = {
        ...validResponse,
        data: convertedData,
      };
      return covertedResponse;
    },

    async importParticipants(
      courseId: string,
      body
    ): Promise<ResponseData<User[]>> {
      const response = await postWithPath(
        `${API.USER_COURSE.POST.USER_COURSE}/${courseId}/moodle`,
        {},
        body
      );
      return formatResponse(response);
    },
  };
}
