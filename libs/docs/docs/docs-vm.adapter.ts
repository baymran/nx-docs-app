import {DocumentEntity} from "../../core/data-access/src";
import {DocumentVm} from "./document-vm";

type DocsVmAdapter = {
  entityToVM(entity: DocumentEntity): DocumentVm,
  VMToEntity(VM: DocumentVm): DocumentEntity
}

export const docsVMAdapter: DocsVmAdapter = {
  entityToVM({ id, organization, type, series, number, main, archival, dateOfIssue, departmentCode }) {
    return {id, organization, type, series, number, main, archival, dateOfIssue, departmentCode}
  },
  VMToEntity(VM: DocumentVm): DocumentEntity {
    return {...VM}
  }
}
