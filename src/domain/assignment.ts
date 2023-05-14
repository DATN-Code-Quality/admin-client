export interface Assignment {
  id: string;
  name: string;
  dueDate: number;
  status: boolean;
  courseId: string;
  assignmentMoodleId: string;
  description: string | null;
  attachmentFileLink: string | null;
  config: string;

  createdAt: number;
  updatedAt: number;
}
