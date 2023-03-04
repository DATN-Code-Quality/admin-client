import {
  formatResponse,
  getWithPath,
  postWithPath,
} from "src/adapters/api.http";

import API from "src/constant/api";

export function useJobApplication() {
  return {
    async downloadReport({ jobPostId }): Promise<any> {
      const resp = await getWithPath(
        `${API.JOB_APPLICATION.GET.DOWNLOAD_REPORT}/${jobPostId}`,
        {},
        {
          responseType: "arraybuffer",
        }
      );
      return resp;
    },
  };
}
