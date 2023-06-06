export interface Course {
  id: string;
  name: string;
  courseMoodleId: string;
  startAt: number;
  endAt: number;
  detail: string | null;
  summary: string | null;
  categoryId: string;

  dueDate: number;
  description: string;
  attachmentFileLink?: string;
  config: string;

  createdAt: number;
  updatedAt: number;
}

export interface ReportCourse {
  assignment: {
    id: string;
    name: string;
  };
  submission: {
    waitToScan?: number;
    scanning?: number;
    scanSuccess?: {
      pass: number;
      fail: number;
    };
    scanFail?: number;
  };
}
