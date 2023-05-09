import { StateStatus } from '../constant/enum';

import { User } from '~/domain/user';

export interface UserDTO {
  id: string;
  name: string;
  role: string;
  email: string;
  userId: string;
  moodleId: string;
  status: StateStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export const userFromDTO = (userDTO: UserDTO): User => {
  return {
    id: userDTO.id,
    name: userDTO.name,
    roles: [userDTO.role],
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
    role: user.roles[0],
    email: user.email,
    userId: user.userId,
    moodleId: user.moodleId,
    status: user.status,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
  };
};
