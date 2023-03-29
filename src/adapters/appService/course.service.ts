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
import ROUTE from '~/constant/routes';
import { Assignment } from '~/domain/assignment';
import { Course } from '~/domain/course';
import { User } from '~/domain/user';
import { mockCourse } from '~/mock/course.mock';

export function useCourse() {
  const navigate = useNavigate();

  return {
    async getAllCourses(): Promise<ResponseData<Course[]>> {
      // const data = await getWithPath(API.PARTNER.GET.PARTNERS);
      const data = await mockCourse().getAllCourses();
      return formatResponse(data);
    },

    async getParticipantsByCourseId(id: string): Promise<ResponseData<User[]>> {
      // const data = await getWithPath(API.AGENCY.GET.AGENCYS);
      const data = await mockCourse().getParticipantsByCourseId(id);
      return formatResponse(data);
    },

    async getAssignmentsByCourseId(
      id: string
    ): Promise<ResponseData<Assignment[]>> {
      // const data = await getWithPath(API.AGENCY.GET.AGENCYS);
      const data = await mockCourse().getAssignmentsByCourseId(id);
      return formatResponse(data);
    },

    async createCourse(body): Promise<ResponseData<Course>> {
      const data = await postWithPath(
        `${API.PARTNER.POST.CREATE_PARTNER}`,
        {},
        body
      );
      if (data.success) {
        message.success(`Tạo mới course thành công!`);
        navigate(ROUTE.PARTNER.LIST);
      } else {
        message.error('Tạo mới course thất bại!');
      }
      return formatResponse(data);
    },

    async getDetailCourse(id: string): Promise<ResponseData<Course>> {
      // const data = await getWithPath(`${API.PARTNER.GET.PARTNERS}/${id}`, {});
      const data = await mockCourse().getCourseById(id);
      return formatResponse(data);
    },

    async updateCourse(body): Promise<ResponseData<Course>> {
      const data = await putWithPath(
        `${API.PARTNER.PUT.UPDATE_PARTNER}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
        navigate(ROUTE.PARTNER.LIST);
      }
      return formatResponse(data);
    },

    async blockCourse(body): Promise<ResponseData<Course>> {
      const data = await putWithPath(
        `${API.PARTNER.PUT.UPDATE_PARTNER}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
        navigate(ROUTE.PARTNER.LIST);
      }
      return formatResponse(data);
    },

    async unblockCourse(body): Promise<ResponseData<Course>> {
      const data = await putWithPath(
        `${API.PARTNER.PUT.UPDATE_PARTNER}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
        navigate(ROUTE.PARTNER.LIST);
      }
      return formatResponse(data);
    },
  };
}
