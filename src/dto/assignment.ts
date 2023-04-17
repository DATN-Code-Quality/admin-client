import { BaseDTO } from './baseDTO';

import { Assignment } from '~/domain/assignment';

export interface AssignmentDTO extends BaseDTO {
  name: string;
  dueDate: Date;
  status: boolean;
  courseId: string;
  assignmentMoodleId: string;
  description: string | null;
  attachmentFileLink: string | null;
  config: string;
}

export const assignmentFromDTO = (assignmentDTO: AssignmentDTO): Assignment => {
  return {
    id: assignmentDTO.id,
    name: assignmentDTO.name,
    dueDate: new Date(parseInt(assignmentDTO.dueDate, 10) * 1000).getTime(),
    status: assignmentDTO.status,
    courseId: assignmentDTO.courseId,
    assignmentMoodleId: assignmentDTO.assignmentMoodleId,
    description: assignmentDTO.description,
    attachmentFileLink: assignmentDTO.attachmentFileLink,
    config: assignmentDTO.config,
    createdAt:
      assignmentDTO.createdAt && new Date(assignmentDTO.createdAt).getTime(),
    updatedAt:
      assignmentDTO.updatedAt && new Date(assignmentDTO.updatedAt).getTime(),
    deletedAt:
      assignmentDTO.deletedAt && new Date(assignmentDTO.deletedAt).getTime(),
  };
};

export const assignmentToDTO = (assignment: Assignment): AssignmentDTO => {
  return {
    id: assignment.id,
    name: assignment.name,
    dueDate: new Date(assignment.dueDate),
    status: assignment.status,
    courseId: assignment.courseId,
    assignmentMoodleId: assignment.assignmentMoodleId,
    description: assignment.description,
    attachmentFileLink: assignment.attachmentFileLink,
    config: assignment.config,
    createdAt: new Date(assignment.createdAt),
    updatedAt: new Date(assignment.updatedAt),
    deletedAt: new Date(assignment.deletedAt),
  };
};
