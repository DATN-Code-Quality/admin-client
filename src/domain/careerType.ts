import { StateStatus } from "src/constant";

export interface CareerType {
  id: number;
  name: string;
  parent_id: number;
  state: StateStatus;
  created_at: number;
  updated_at: number;
}
