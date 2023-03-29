import { StateStatus } from '../constant/enum';

export interface User {
  id: number;
  moodleId: number;
  email: string;
  name: string;
  roles: number[];
  phone_number: string;
  partner_id: number;
  partner_name?: string;
  status: StateStatus;
  created_at: number;
  updated_at: number;
}
