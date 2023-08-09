import {DocumentEntity} from "../../core/data-access/src";
import {DocumentVm} from "./document-vm";

type DocsVmAdapter = {
  entityToVM(entity: DocumentEntity): DocumentVm
}

export const docsVMAdapter: DocsVmAdapter = {
  entityToVM({ id, organization, type, series, number, main, archival, dateOfIssue }) {
    return {id, organization, type, series, number, main, archival, dateOfIssue}
  }
}
