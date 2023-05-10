import { User } from './user';

export interface Submission {
  id: string;
  assignmentId: string;
  link: string;
  note: string | null;
  submitType: string;
  timemodified: string;
  user: User;
  origin: string;
  status: string;
  grade: number | null;
  submissionMoodleId: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: number | null;
}

export interface Issue {
  key: string;
  rule: string;
  severity: string;
  component: string;
  project: string;
  line: number;
  hash: string;
  textRange: {
    startLine: number;
    endLine: number;
    startOffset: number;
    endOffset: number;
  };
  status: string;
  message: string;
  effort: string;
  debt: string;
  creationDate: string;
  updateDate: string;
  type: string;
  scope: string;
}
