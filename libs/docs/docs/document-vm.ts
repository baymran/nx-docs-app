import {DocumentEntity} from "../../core/data-access/src";
import {DeepReadonly} from "../../core/utils/src";

export type DocumentVm = DeepReadonly<
  Pick<DocumentEntity, "id" | "organization" | "type" | "series" | "number" | "dateOfIssue" | "main" | "archival" | "departmentCode">
>
