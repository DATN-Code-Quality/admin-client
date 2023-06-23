import {
  ChartType,
  PartnerType,
  Role,
  ServiceType,
  SubRole,
  UserStatus,
} from './enum';

export const IS_DEVELOPMENT =
  document.location.href.indexOf('localhost') > -1 ||
  document.location.href.indexOf('dev') > -1;
export const IS_PRODUCTION = import.meta.env.VITE_ENV === 'production';

export const DOMAIN_API_URL = import.meta.env.VITE_API_URL;

export interface ResponseData<T> {
  status: number;
  data: T;
  message?: string;
  error?: any;
  total?: number;
}

export const MAP_USER_STATUS = [
  { value: UserStatus.ACTIVE, label: 'Active' },
  { value: UserStatus.INACTIVE, label: 'Inactive' },
  { value: UserStatus.BLOCK, label: 'Blocked' },
];

export const MAP_SERVICE_TYPE = [
  [ServiceType.ALL, 'All'],
  [ServiceType.EKYC, 'EKYC'],
  [ServiceType.VIDEO_EKYC, 'Video EKYC'],
  [ServiceType.ID_OCR, 'ID OCR'],
  [ServiceType.ID_FRAUD, 'ID Fraud'],
  [ServiceType.LIVE_NESS, 'LiveNess'],
  [ServiceType.ID_SELFIE_FACE_MATCHING, 'ID Selfie Face Matching'],
];

export const MAP_CHART_TYPE = [
  [ChartType.DAY, 'Day'],
  // [ChartType.WEEK, 'Week'],
  // [ChartType.MONTH, 'Month'],
];

export const MAP_ROLES = [
  { value: Role.ADMIN, label: 'Admin' },
  { value: Role.USER, label: 'User' },
];

export const MAP_SUB_ROLES = [
  { value: SubRole.TEACHER, label: 'Teacher' },
  { value: SubRole.STUDENT, label: 'Student' },
];

export const MAP_CONFIG_OBJECT = [
  { value: 'code_smells', label: 'Code Smells' },
  { value: 'bugs', label: 'Bugs' },
  { value: 'vulnerabilities', label: 'Vulnerabilities' },
  { value: 'violations', label: 'Violations' },
  { value: 'blocker_violations', label: 'Blocker Violations' },
  { value: 'critical_violations', label: 'Critical Violations' },
  { value: 'major_violations', label: 'Major Violations' },
  { value: 'minor_violations', label: 'Minor Violations' },
  { value: 'info_violations', label: 'Info Violations' },
  { value: 'duplicated_lines_density', label: 'Duplicated Lines Density' },
  { value: 'coverage', label: 'Coverage' },
];

export const CONDITION_OPERATOR = {
  coverage: 'LT',
  duplicated_lines_density: 'GT',
  blocker_violations: 'GT',
  critical_violations: 'GT',
  major_violations: 'GT',
  minor_violations: 'GT',
  info_violations: 'GT',
  violations: 'GT',
  code_smells: 'GT',
  bugs: 'GT',
  vulnerabilities: 'GT',
};

export const MAP_CONDITION_OPERATOR = [
  { value: 'LT', label: 'Less than' },
  { value: 'GT', label: 'Greater than' },
];

export const LINE_EMPTY_CODE = '';

export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

export const BREAKPOINTS = {
  XS: 0,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
};
