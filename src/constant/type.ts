import { Role, SubRole, UserStatus } from './enum';

export type Pagination = Partial<{
  limit: number;
  offset: number;
}>;

export type UserFilter = Partial<{
  search: string; // tìm kiếm theo họ tên hoặc email
  status: UserStatus; // trạng thái
  role: Role; // vai trò
}>;

export type CourseFilter = Partial<{
  search: string; // tìm kiếm theo tên khóa học
  startAt: string; // ngày bắt đầu trở về sau
  endAt: string; // ngày kết thúc trở về trước
  currentRole: SubRole; // filter theo vai trò hiện tại của user
}>;

export type ParticipantFilter = Partial<{
  search: string; // tìm kiếm theo họ tên hoặc email
  status: UserStatus; // trạng thái
  role: SubRole; // vai trò
}>;

export type ListItem = {
  value: number | string;
  label: string;
  disabled?: boolean;
};

export type List = ListItem[];

export type ConfigObject = Partial<{
  code_smells: number;
  bugs: number;
  vulnerabilities: number;
  violations: number;
  blocker_violations: number;
  critical_violations: number;
  major_violations: number;
  minor_violations: number;
  info_violations: number;
  duplicated_lines_density: number;
  coverage: number;
}>;
