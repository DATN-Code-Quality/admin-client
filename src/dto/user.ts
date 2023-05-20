import { UserStatus } from '../constant/enum';

import { User } from '~/domain/user';

export interface UserDTO {
  id: string;
  name: string;
  role: string;
  email: string;
  userId: string;
  moodleId: string;
  status: UserStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export const userFromDTO = (userDTO: UserDTO): User => {
  return {
    id: userDTO.id,
    name: userDTO.name,
    role: userDTO.role,
    email: userDTO.email,
    userId: userDTO.userId,
    moodleId: userDTO.moodleId,
    status: userDTO.status,
    createdAt: new Date(userDTO.createdAt || new Date()).getTime(),
    updatedAt: new Date(userDTO.updatedAt || new Date()).getTime(),
  };
};

export const userToDTO = (user: User): UserDTO => {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
    email: user.email,
    userId: user.userId,
    moodleId: user.moodleId,
    status: user.status,
  };
};
