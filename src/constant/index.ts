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
}

export const MAP_USER_STATUS = [
  { value: UserStatus.ACTIVE, label: 'Đã kích hoạt' },
  { value: UserStatus.INACTIVE, label: 'Chưa kích hoạt' },
  { value: UserStatus.BLOCK, label: 'Đã khóa' },
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
  [ChartType.WEEK, 'Week'],
  [ChartType.MONTH, 'Month'],
];

export const MAP_ROLES = [
  { value: Role.ADMIN, label: 'Admin' },
  { value: Role.USER, label: 'User' },
];

export const MAP_SUB_ROLES = [
  { value: SubRole.TEACHER, label: 'Giáo viên' },
  { value: SubRole.STUDENT, label: 'Học sinh' },
];

export const LINE_EMPTY_CODE = '';

export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
