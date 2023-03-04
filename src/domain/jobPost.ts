import { SalaryType, SalaryUnit } from "src/constant";

export interface JobPost {
  id: number;
  owner_id: number;
  company_id: number;
  title: string;
  salary: number;
  salary_type: SalaryType;
  salary_unit: SalaryUnit;
  career_type_id: number;
  job_description: string;
  job_requirement: string;
  job_benefit: string;
  job_address_city: number;
  job_address_district: number;
  job_address_ward: number;
  job_address_detail: string;
  total_candidate: number;
  deadline_at: number;
  created_at: number;
  updated_at: number;
  state: number;
  salary_info_type: number;

  company_name?: string;
}
