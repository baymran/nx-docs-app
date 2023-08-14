import {DocumentDTO, DocumentEntity} from "../index";


type DocumentsDTOAdapter = {
  DTOtoEntity(dto: DocumentDTO): DocumentEntity,
  entityToDTO(entity: DocumentEntity): DocumentDTO
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
  },
  entityToDTO(entity: DocumentEntity): DocumentDTO {
    const {
      id,
      organization,
      series,
      number,
      type,
      main,
      archival,
      ...e
    } = entity;
    return {
      id, organization, series, number, type, main, archival,
      date_of_issue: e.dateOfIssue,
      department_code: e.departmentCode
    }
  }
}
