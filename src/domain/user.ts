import { UserStatus } from '../constant/enum';

export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  userId: string;
  moodleId: string;
  status: UserStatus;
  createdAt: number;
  updatedAt: number;
}
