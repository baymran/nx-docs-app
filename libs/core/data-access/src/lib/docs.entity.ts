import {DeepReadonly} from "@core/utils";

export type DocumentEntity = DeepReadonly<{
  id: number;
  organization: string;
  type: string;
  departmentCode: string;
  series: string;
  number: string;
  dateOfIssue: Date;
  main: boolean;
  archival: boolean;
}>

export type onSuccessEditionCbType = () => void
