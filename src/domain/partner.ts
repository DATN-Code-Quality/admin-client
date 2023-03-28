import { PartnerType, StateStatus } from "../constant/enum";

export interface Threshold {
  model: string;
  threshold: number;
  updated_at: number;
}
export interface Partner {
  id: number;
  name: string;
  type: PartnerType;
  under_agency_id: number;
  state: StateStatus;
  thresholds: Threshold[];
  created_at: number;
  updated_at: number;
}
