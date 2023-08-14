import {DeepReadonly} from "@core/utils";

export type DocumentDTO = DeepReadonly<{
  id: number;
  organization: string;
  type: string;
  department_code: string;
  series: string;
  number: string;
  date_of_issue: Date;
  main: boolean;
  archival: boolean;
}>

export type CreateDocumentDTO = DeepReadonly<{
  id?: number;
  organization: string;
  type: string;
  department_code: string;
  series: string;
  number: string;
  date_of_issue: Date;
  main: boolean;
  archival: boolean;
}>
