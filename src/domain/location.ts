import { LocationType } from "src/constant";

export interface Location {
  id: number;
  code: number;
  parent_code: number;
  name: string;
  short_name: string;
  type: LocationType;
}
