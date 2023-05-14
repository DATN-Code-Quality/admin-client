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
  INACTIVE = 0,
  ACTIVE = 1,
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

export enum BugType {
  CODE_SMELL = 'CODE_SMELL',
  VULNERABILITY = 'VULNERABILITY',
  BUG = 'BUG',
}

export enum BugTypeConstant {
  CODE_SMELL = 'Code Smell',
  VULNERABILITY = 'Vulnerability',
  BUG = 'Bug',
}

export enum SeverityType {
  MAJOR = 'MAJOR',
  CRITICAL = 'CRITICAL',
  BLOCKER = 'BLOCKER',
  MINOR = 'MINOR',
  INFO = 'INFO',
}

export enum SeverityTypeConstant {
  MAJOR = 'Major',
  CRITICAL = 'Critical',
  BLOCKER = 'Blocker',
  MINOR = 'Minor',
  INFO = 'Info',
}
