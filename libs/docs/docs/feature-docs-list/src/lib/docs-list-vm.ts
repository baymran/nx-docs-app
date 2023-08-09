import {DeepReadonly} from "@core/utils";
import {DocumentVm} from "../../../document-vm";
import {LoadingStatus} from "@core/data-access";

export type DocsListVm = DeepReadonly<{
  docs: DocumentVm[],
  status: LoadingStatus
}>
