export interface Result {
  bugs: number;
  vulnerabilities: number;
  smells: number;
}

export interface Project {
  id: string;
  key: string;
  results: Result[];
  created_at: number;
  updated_at: number;
}
