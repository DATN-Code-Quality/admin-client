import { StateStatus } from "../constant/enum";

export interface User {
  user_id: number;
  name: string;
  roles: number[];
  phone_number: string;
  partner_id: number;
  partner_name?: string;
  state: StateStatus;
  created_at: number;
  updated_at: number;
}
