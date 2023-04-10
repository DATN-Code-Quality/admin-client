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
  submissionIssues: any;
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
  error: number;
  issues: SubmissionIssues;
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
