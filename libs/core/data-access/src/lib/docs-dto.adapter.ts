import {DocumentDTO} from "./docs-dto.model";
import {DocumentEntity} from "./docs.entity";

type DocumentsDTOAdapter = {
  DTOtoEntity(dto: DocumentDTO): DocumentEntity,
  // entityToDTO(entity: DocumentEntity): DocumentDTO
}

export const docsDtoAdapter: DocumentsDTOAdapter = {
  DTOtoEntity(dto: DocumentDTO): DocumentEntity {
    const {
      id,
      organization,
      series,
      number,
      type,
      main,
      archival, ...d
    } = dto
    return {
      id, organization, series, number, type, main, archival,
      dateOfIssue: d.date_of_issue,
      departmentCode: d.department_code
  }
}
// entityToDTO(entity) {
//   // const { isAdmin, ...otherFields } = entity;
//   //
//   // return {
//   //   ...otherFields,
//   //   role: isAdmin ? 'admin' : 'user',
//   // };
// }
}
