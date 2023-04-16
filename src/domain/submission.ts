export interface Submission {
  id: string;
  assignmentId: string;
  link: string;
  note: string | null;
  submitType: string;
  timemodified: Date;
  userId: string;
  origin: string;
  status: string;
  grade: number | null;
  submissionMoodleId: string;
  createdAt?: number;
  updatedAt?: number;
  deletedAt?: number;
}
