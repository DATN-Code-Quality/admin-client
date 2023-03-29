export enum AppType {
  MOBILE = 1,
  MINIAPP = 2,
  WEBSITE = 3,
}

export enum ApiStatus {
  SUCCESS = 0,
  UNAUTHORIZED = 403,
}

export enum Role {
  GUEST = 1,
  ROOT_ADMIN = 2,
  ADMIN = 3,
  TEACHER = 4,
  STUDENT = 5,
}

export enum StateStatus {
  ACTIVE = 0,
  INACTIVE = 1,
}

export enum ServiceType {
  ALL = 1,
  EKYC = 2,
  VIDEO_EKYC = 3,
  ID_OCR = 4,
  ID_FRAUD = 5,
  LIVE_NESS = 6,
  ID_SELFIE_FACE_MATCHING = 7,
}

export enum PartnerType {
  PARTNER = 1,
  AGENCY = 2,
}

export enum ChartType {
  DAY = 1,
  WEEK = 2,
  MONTH = 3,
}
