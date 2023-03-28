import { PartnerType } from "../constant/enum";

export interface Auth {
  name: string;
  partner_type: PartnerType;
  roles: string;
}
