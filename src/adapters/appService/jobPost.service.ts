import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { JobPost } from "src/domain/jobPost";

import API from "src/constant/api";
import ROUTE from "src/constant/routes";
import { mockJobPost } from "src/mock/jobPost.mock";

import {
  postWithPath,
  putWithPath,
  formatResponse,
  getWithPath,
} from "../api.http";

export function useJobPost() {
  const navigate = useNavigate();

  return {
    async getAllJobPosts(): Promise<JobPost[]> {
      // const data = await getWithPath(API.JOB_POST.GET.JOB_POSTS);
      const data = await mockJobPost().getAllJobPosts();
      return formatResponse(data);
    },

    async createJobPost(body): Promise<JobPost> {
      const data = await postWithPath(
        `${API.JOB_POST.POST.CREATE_JOB_POST}`,
        {},
        body
      );
      if (data.success) {
        message.success(`Tạo mới job post thành công!`);
        navigate(ROUTE.JOB_POST.LIST);
      } else {
        message.error("Tạo mới job post thất bại!");
      }
      return formatResponse(data);
    },

    async getDetailJobPost(id: number): Promise<JobPost> {
      // const data = await getWithPath(`${API.JOB_POST.GET.JOB_POSTS}/${id}`, {});
      const data = await mockJobPost().getDetailJobPost(id);
      return formatResponse(data);
    },

    async updateJobPost(body): Promise<JobPost> {
      const data = await putWithPath(
        `${API.JOB_POST.PUT.UPDATE_JOB_POST}/${body?.id}`,
        {},
        body
      );
      if (data.success) {
        navigate(ROUTE.JOB_POST.LIST);
      }
      return formatResponse(data);
    },
  };
}
