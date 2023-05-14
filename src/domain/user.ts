import { StateStatus } from '../constant/enum';

export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: unknown;
  name: string;
  role: string;
  email: string;
  userId: string;
  moodleId: string;
  status: StateStatus;
  createdAt: number;
  updatedAt: number;
}
