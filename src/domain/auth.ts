import { Role } from '../constant/enum';

export interface Auth {
  name: string;
  roles: Role[];
}
