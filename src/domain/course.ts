import { StateStatus } from '../constant/enum';

export interface Course {
  id: string;
  name: string;
  dueDate: Date;
  moodleCourseId: string;
  description: string;
  attachmentFileLink?: string;
  config: string;
  status: StateStatus;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
