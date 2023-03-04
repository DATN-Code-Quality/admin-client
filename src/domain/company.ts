import { StateStatus } from "src/constant";

export interface Company {
  id: number;
  owner_id: number;
  name: string;
  logo_url: string;
  state: StateStatus;
  created_at: number;
  updated_at: number;
}
