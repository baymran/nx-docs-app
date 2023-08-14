import {createAction, createActionGroup, emptyProps, props} from '@ngrx/store';
import {CreateDocumentDTO, DocumentDTO, DocumentEntity, onSuccessEditionCbType} from "@core/data-access";


export const initDocs = createAction('[Docs Page] Init');

export const loadDocsSuccess = createAction(
  '[Docs/API] Load Docs Success',
  props<{ docs: DocumentEntity[] }>()
);

export const loadDocsFailure = createAction(
  '[Docs/API] Load Docs Failure',
  props<{ error: any }>()
);

export const loadOneDocument = createActionGroup({
  source: 'Document Detail',
  events: {
    'Load Document': emptyProps(),
    'Load Document Success': props<{document: DocumentEntity}>(),
    'Load Document Failure': props<{error: any}>(),
  },
});

export const addNewDocument = createActionGroup({
  source: 'Documents List',
  events: {
    'Add Document': props<{document: CreateDocumentDTO, onSuccessCb: onSuccessEditionCbType}>(),
    'Add Document Success': props<{document: DocumentEntity}>(),
    'Add Document Failure': props<{error: any}>()
  }
})

export const updateDocument = createActionGroup({
  source: 'Documents List',
  events: {
    'Update Document': props<{document: DocumentDTO, onSuccessCb: onSuccessEditionCbType}>(),
    'Update Document Success': props<{document: DocumentEntity}>(),
    'Update Document Failure': props<{error: any}>()
  }
})

export const deleteDocument = createActionGroup({
  source: 'Documents List',
  events: {
    'Delete Document': props<{id: number}>(),
    'Delete Document Success': props<{id: number}>(),
    'Delete Document Failure': props<{error: any}>()
  }
})
