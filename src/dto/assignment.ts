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
    dueDate: new Date(assignmentDTO.dueDate).getTime(),
    status: assignmentDTO.status,
    courseId: assignmentDTO.courseId,
    assignmentMoodleId: assignmentDTO.assignmentMoodleId,
    description: assignmentDTO.description,
    attachmentFileLink: assignmentDTO.attachmentFileLink,
    config: assignmentDTO.config,
    createdAt: new Date(assignmentDTO.createdAt || new Date()).getTime(),
    updatedAt: new Date(assignmentDTO.updatedAt || new Date()).getTime(),
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
  };
};
