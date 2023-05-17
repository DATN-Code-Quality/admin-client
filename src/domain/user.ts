import { StateStatus } from '../constant/enum';

export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  userId: string;
  moodleId: string;
  status: StateStatus;
  createdAt: number;
  updatedAt: number;
}
