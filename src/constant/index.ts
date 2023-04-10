import { ChartType, PartnerType, Role, ServiceType, StateStatus } from './enum';

export const IS_DEVELOPMENT =
  document.location.href.indexOf('localhost') > -1 ||
  document.location.href.indexOf('dev') > -1;
export const IS_PRODUCTION = import.meta.env.VITE_ENV === 'production';

export const DOMAIN_API_URL = import.meta.env.VITE_API_URL;

export interface ResponseData<T> {
  msg: string;
  code: number;
  data: T;
  success: boolean;
  total?: number;
  not_empty?: boolean;
  empty?: boolean;
}

export const MAP_STATE_STATUS = [
  [StateStatus.ACTIVE, 'Active'],
  [StateStatus.INACTIVE, 'Inactive'],
];

export const MAP_PARTNER_TYPE = [
  [PartnerType.PARTNER, 'Partner'],
  [PartnerType.AGENCY, 'Agency'],
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
  [Role.GUEST, 'Guest'],
  [Role.ROOT_ADMIN, 'Root Admin'],
  [Role.ADMIN, 'Admin'],
  [Role.TEACHER, 'Teacher'],
  [Role.STUDENT, 'Student'],
];

export const LINE_EMPTY_CODE = '';

export const DEFAULT_PAGE_SIZE = 5;

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];
