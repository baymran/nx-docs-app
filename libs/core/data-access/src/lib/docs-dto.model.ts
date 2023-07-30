export type Document = {
  id: number;
  created_at: number;
  types_id: number;
  series: string;
  number: string;
  date_of_issue: Date;
  organization_id: number;
  department_code: string;
  main: boolean;
  archival: boolean;
}
