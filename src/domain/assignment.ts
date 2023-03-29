import { StateStatus } from '../constant/enum';

export interface Assignment {
  id: string;
  name: string;
  dueDate: Date;
  status: StateStatus;
  courseId: string;
  description: string;
  attachmentFileLink: string;
  config: string;
  created_at: number;
  updated_at: number;
}
