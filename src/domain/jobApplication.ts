import { Gender, StateStatus } from "src/constant";

export interface JobApplication {
  id: number;
  uuid: string;
  user_id: number;
  job_id: number;
  utm_id: number;
  name: string;
  phone: string;
  dob: number;
  gender: Gender;
  email: string;
  acquired_timestamp: number;
  current_address_city: number;
  current_address_district: number;
  current_address_ward: number;
  current_address_detail: string;
  state: StateStatus;
  created_at: number;
  updated_at: number;
}
