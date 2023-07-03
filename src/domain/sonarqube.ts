import { Issue, IssueWithSource } from './submission';

export interface ListSonarqube {
  paging: {
    pageIndex: number;
    pageSize: number;
    total: number;
  };
  components: Component[];
  facets: Facet[];
}

export interface Sonarqube {
  filter: Filter;
  submissionIssues: Record<string, unknown>;
  submissionSelected: SubmissionSelected;
  issueSelected: Issue | null;
}

export interface SubmissionSelected {
  submissionId: string | null;
  courseId: string;
  assignmentId: string;
}
export interface Filter {
  coverage: number;
  reliabilityRatiing: number;
  duplicatedLines: number;
  languages: string;
  securityRating: number;
  ncloc: string;
  securityReviewRating: number;
  sqaleRating: number;
}

export interface MoreInfoProject {
  measures: Measure[];
}

export interface Measure {
  metric: string;
  value: string;
  component: string;
  bestValue?: boolean;
}

export interface Component {
  key: string;
  name: string;
  qualifier: string;
  isFavorite: boolean;
  analysisDate: string;
  tags: string[];
  visibility: string;
  leakPeriodDate?: string;
  needIssueSync: boolean;
}

export interface Facet {
  property: string;
  values: { val: string; count: number }[];
}

export interface SubmissionResponse {
  status?: number;
  error?: number;
  data: SubmissionIssues;
}

export interface IssueWithSourceResponse {
  status?: number;
  error?: number;
  data: IssueWithSource[];
}

export interface OverviewDataRespond {
  result?: ResultOverview;
  role?: string;
}

export interface ResultOverview {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: any;
  submissionId?: string;
  violations?: number;
  code_smells?: number;
  bugs?: number;
  vulnerabilities?: number;
  blocker_violations?: number;
  critical_violations?: number;
  major_violations?: number;
  minor_violations?: number;
  info_violations?: number;
  duplicated_lines_density?: number;
  coverage?: number;
  reliability_rating?: number;
  security_rating?: number;
  sqale_rating?: number;
  ncloc?: number;
}
export interface OverviewSubmissionResponse {
  status?: number;
  data?: ResultOverview;
}

export interface SubmissionIssues {
  total: number;
  p: number;
  ps: number;
  effortTotal: number;
  issues: {
    key: string;
    rule: string;
    severity: string;
    component: string;
    project: string;
    line: number;
    hash: string;
    textRange: {
      startLine: number;
      endLine: number;
      startOffset: number;
      endOffset: number;
    };
    status: string;
    message: string;
    effort: string;
    debt: string;
    creationDate: string;
    updateDate: string;
    type: string;
    scope: string;
  }[];
  components: {
    key: string;
    enabled: boolean;
    qualifier: string;
    name: string;
    longName: string;
    path: string;
  }[];
}
