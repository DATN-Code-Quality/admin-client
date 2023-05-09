import { StateStatus } from '../constant/enum';

export interface Course {
  id: string;
  name: string;
  moodleCourseId: string;
  startAt: number;
  endAt: number;
  detail: string | null;
  summary: string | null;
  categoryId: string;

  dueDate: number;
  description: string;
  attachmentFileLink?: string;
  config: string;

  status: StateStatus;
  createdAt: number;
  updatedAt: number;
}
