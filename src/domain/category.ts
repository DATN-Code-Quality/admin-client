import { StateStatus } from '../constant/enum';

export interface Category {
  id: string;
  name: string;
  status: StateStatus;
  created_at: number;
  updated_at: number;
}
