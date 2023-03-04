export const IS_DEVELOPMENT =
  document.location.href.indexOf("localhost") > -1 ||
  document.location.href.indexOf("dev") > -1;
export const IS_PRODUCTION = process.env.REACT_APP_ENV === "production";
export const DOMAIN_API_URL = process.env.REACT_APP_API_URL;

export enum AppType {
  MOBILE = 1,
  MINIAPP = 2,
  WEBSITE = 3,
}
export interface ResponseData<T> {
  msg: string;
  code: string;
  data: T;
  success: boolean;
  total?: number;
  not_empty?: boolean;
  empty?: boolean;
}

export enum ApiStatus {
  SUCCESS = 0,
  UNAUTHORIZED = 403,
}

export enum StateStatus {
  INACTIVE = 0,
  ACTIVE = 1,
}

export const MAP_STATE_STATUS = [
  [StateStatus.INACTIVE, "Inactive"],
  [StateStatus.ACTIVE, "Active"],
];

export enum Gender {
  UNKNOWN = 0,
  MALE = 1,
  FEMALE = 2,
  OTHER = 3,
}

export const MAP_GENDER = [
  [Gender.UNKNOWN, "Unknown"],
  [Gender.MALE, "Male"],
  [Gender.FEMALE, "Female"],
  [Gender.OTHER, "Other"],
];

export enum SalaryType {
  MONTH = 0,
  YEAR = 1,
  HOUR = 2,
  DAY = 3,
}

export const MAP_SALARY_TYPE = [
  [SalaryType.MONTH, "Tháng"],
  [SalaryType.YEAR, "Năm"],
  [SalaryType.HOUR, "Giờ"],
  [SalaryType.DAY, "Ngày"],
];

export enum SalaryUnit {
  VND = 0,
  USD = 1,
}

export enum SalaryTypeInfo {
  UPTO = 1,
  EQUAL = 2,
}

export const MAP_SALARY_UNIT = [
  [SalaryUnit.VND, "VND"],
  [SalaryUnit.USD, "USD"],
];

export const MAP_SALARY_TYPE_INFO = [
  [SalaryTypeInfo.EQUAL, "Lương cơ bản"],
  [SalaryTypeInfo.UPTO, "Lương lên đến"],
];


export enum LocationType {
  CITY = 1,
  DISTRICT = 2,
  WARD = 3,
}

export const MAP_LOCATION_TYPE = [
  [LocationType.CITY, "City"],
  [LocationType.DISTRICT, "District"],
  [LocationType.WARD, "Ward"],
];
