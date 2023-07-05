import { useNavigate } from 'react-router-dom';

import {
  deleteWithPath,
  formatResponse,
  getWithPath,
  postWithPath,
  putWithPath,
} from '../api.http';

import { ResponseData } from '~/constant';
import API from '~/constant/api';
import { SubRole } from '~/constant/enum';
import { CourseFilter, ParticipantFilter, UserFilter } from '~/constant/type';
import { Course, ReportCourse } from '~/domain/course';
import { User } from '~/domain/user';
import { removeSubmitProps } from '~/dto/baseDTO';
import { CourseDTO, courseFromDTO, courseToDTO } from '~/dto/course';
import { UserDTO, userFromDTO, userToDTO } from '~/dto/user';
import Is from '~/utils/is';

const handleFilterMoodleCourse = (data: Course[], filter?: CourseFilter) => {
  const { search: searchField, startAt, endAt } = filter || {};
  const startAtTime = startAt ? new Date(startAt).getTime() : null;
  const endAtTime = endAt ? new Date(endAt).getTime() : null;
  const conditions = [
    searchField
      ? (course: Course) => Is.match(course.name, searchField)
      : () => true,
    startAtTime
      ? (course: Course) => new Date(course.startAt).getTime() >= startAtTime
      : () => true,
    endAtTime
      ? (course: Course) => new Date(course.endAt).getTime() <= endAtTime
      : () => true,
    startAtTime && endAtTime
      ? (course: Course) =>
          new Date(course.startAt).getTime() >= startAtTime &&
          new Date(course.endAt).getTime() <= endAtTime
      : () => true,
  ];
  return data.filter((course) =>
    conditions.every((condition) => condition(course))
  );
};

const handleFilterMoodleParitipant = (
  data: User[],
  filter?: ParticipantFilter
) => {
  const { search: searchField, role } = filter || {};
  const conditions = [
    searchField
      ? (user: User) => {
          return (
            Is.match(user.name, searchField) ||
            Is.match(user.email, searchField)
          );
        }
      : () => true,
    role ? (user: User) => user.role === role : () => true,
  ];
  return data.filter((course) =>
    conditions.every((condition) => condition(course))
  );
};

export function useCourse() {
  const navigate = useNavigate();

  return {
    // COURSE
    async getAllCourses(
      filter?: CourseFilter
    ): Promise<ResponseData<Course[]>> {
      const response = await getWithPath(API.COURSE.GET.COURSES, filter);
      const validResponse = formatResponse<{
        total: number;
        courses: CourseDTO[];
      }>(response);
      const convertedData = validResponse.data.courses.map(courseFromDTO);
      const covertedResponse = {
        ...validResponse,
        total: validResponse.data.total,
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
      const validResponse = formatResponse<{
        total: number;
        courses: CourseDTO[];
      }>(response);
      const convertedData = validResponse.data.courses.map(courseFromDTO);
      const covertedResponse = {
        ...validResponse,
        total: validResponse.data.total,
        data: convertedData,
      };
      return covertedResponse;
    },
    async getTopIssuesCourse(courseId: string, limit?: number): Promise<any> {
      const response = await getWithPath(`/course/${courseId}/top-issue`, {
        limit,
      });
      return response;
    },

    async getAllMoodleCourses(
      filter?: CourseFilter
    ): Promise<ResponseData<Course[]>> {
      const response = await getWithPath(API.COURSE.GET.MOODLE_COURSES, filter);
      const validResponse = formatResponse<CourseDTO[]>(response);
      const convertedData = validResponse.data.map(courseFromDTO);
      const filteredData = handleFilterMoodleCourse(convertedData, filter);
      const covertedResponse = {
        ...validResponse,
        data: filteredData,
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

    // PARTICIPANT
    async getParticipantsByCourseId(
      courseId: string,
      filter?: ParticipantFilter
    ): Promise<ResponseData<{ role: SubRole; users: User[] }>> {
      const response = await getWithPath(
        `${API.USER_COURSE.GET.USER_COURSE}/${courseId}/users`,
        filter
      );
      const validResponse = formatResponse<{
        role: SubRole;
        users: UserDTO[];
        total: number;
      }>(response);
      const convertedData = validResponse.data.users.map(userFromDTO);
      const covertedResponse = {
        ...validResponse,
        total: validResponse.data.total,
        data: { ...validResponse.data, users: convertedData },
      };
      return covertedResponse;
    },

    async getOutsideUsersByCourseId(
      courseId: string,
      filter?: UserFilter
    ): Promise<ResponseData<User[]>> {
      const response = await getWithPath(
        `${API.USER_COURSE.GET.USER_COURSE}/${courseId}/user-not-in-course`,
        filter
      );
      const validResponse = formatResponse<{
        users: UserDTO[];
        total: number;
      }>(response);
      const convertedData = validResponse.data.users.map(userFromDTO);
      const covertedResponse = {
        ...validResponse,
        total: validResponse.data.total,
        data: convertedData,
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
      const filteredData = handleFilterMoodleParitipant(convertedData, filter);
      const covertedResponse = {
        ...validResponse,
        data: filteredData,
      };
      return covertedResponse;
    },

    async importParticipants(
      courseId: string,
      body
    ): Promise<ResponseData<any>> {
      const submitData = body.map((user) => {
        return removeSubmitProps(userToDTO(user));
      });
      const response = await postWithPath(
        `${API.USER_COURSE.POST.USER_COURSE}/${courseId}/moodle`,
        {},
        submitData
      );
      const validResponse = formatResponse<any>(response);
      return validResponse;
    },

    async addParticipants(
      courseId: string,
      body: { teacherRoleIds: string[]; studentRoleIds: string[] }
    ): Promise<ResponseData<any>> {
      const submitData = body;
      const response = await postWithPath(
        `${API.USER_COURSE.POST.USER_COURSE}/${courseId}/system`,
        {},
        submitData
      );
      const validResponse = formatResponse<any>(response);
      return validResponse;
    },

    async updateParticipant(courseId, body): Promise<ResponseData<any>> {
      const response = await putWithPath(
        `${API.USER_COURSE.PUT.USER_COURSE}/${courseId}/${body?.userId}`,
        {},
        body
      );
      const validResponse = formatResponse<any>(response);
      return validResponse;
    },

    async removeParticipants(courseId, body): Promise<ResponseData<any>> {
      const response = await deleteWithPath(
        `${API.USER_COURSE.PUT.USER_COURSE}/${courseId}`,
        {},
        body
      );
      const validResponse = formatResponse<any>(response);
      return validResponse;
    },
  };
}
