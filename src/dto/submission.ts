import { StateStatus } from '../constant/enum';

import { Submission } from '~/domain/submission';
import { BaseDTO } from './baseDTO';

export interface SubmissionDTO extends BaseDTO {
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
}

export const submissionFromDTO = (submissionDTO: SubmissionDTO): Submission => {
  return {
    id: submissionDTO.id,
    assignmentId: submissionDTO.assignmentId,
    link: submissionDTO.link,
    note: submissionDTO.note,
    submitType: submissionDTO.submitType,
    timemodified: submissionDTO.timemodified,
    userId: submissionDTO.userId,
    origin: submissionDTO.origin,
    status: submissionDTO.status,
    grade: submissionDTO.grade,
    submissionMoodleId: submissionDTO.submissionMoodleId,
    createdAt:
      submissionDTO.createdAt && new Date(submissionDTO.createdAt).getTime(),
    updatedAt:
      submissionDTO.updatedAt && new Date(submissionDTO.updatedAt).getTime(),
    deletedAt:
      submissionDTO.deletedAt && new Date(submissionDTO.deletedAt).getTime(),
  };
};

export const submissionToDTO = (submission: Submission): SubmissionDTO => {
  return {
    id: submission.id,
    name: submission.name,
    role: submission.roles[0],
    email: submission.email,
    submissionId: submission.submissionId,
    moodleId: submission.moodleId,
    status: submission.status,
    createdAt: new Date(submission.createdAt),
    updatedAt: new Date(submission.updatedAt),
    deletedAt: new Date(submission.deletedAt),
  };
};
