import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as DocsActions from './docs.actions';
import {DocumentEntity, LoadingStatus} from "@core/data-access";

export const DOCS_FEATURE_KEY = 'docs';

export interface DocsState extends EntityState<DocumentEntity> {
  selectedId?: string | number; // which Docs record has been selected
  status: LoadingStatus; // has the Docs list been loaded
  error?: string | null; // last known error (if any)
}

export interface DocsPartialState {
  readonly [DOCS_FEATURE_KEY]: DocsState;
}

export const docsAdapter: EntityAdapter<DocumentEntity> =
  createEntityAdapter<DocumentEntity>();

export const initialDocsState: DocsState = docsAdapter.getInitialState({
  // set initial required properties
  status: 'init',
});

const reducer = createReducer(
  initialDocsState,
  on(DocsActions.initDocs, (state) => ({
    ...state,
    status: 'loading' as const,
    error: null,
  })),
  on(DocsActions.loadDocsSuccess, (state, { docs }) =>
    docsAdapter.setAll(docs, { ...state, status: 'loaded' as const })),
  on(DocsActions.loadDocsFailure, (state, { error }) => ({ ...state, error })),

  // Load One Document
  on(DocsActions.loadOneDocument.loadDocument, (state) => ({...state, status: 'loading' as const})),
  on(DocsActions.loadOneDocument.loadDocumentSuccess, (state, {document}) =>
    docsAdapter.addOne({...document}, {...state, status: 'loaded' as const})),

  // Add One Document
  on(DocsActions.addNewDocument.addDocument, (state) => ({...state, status: 'loading' as const})),
  on(DocsActions.addNewDocument.addDocumentSuccess, (state, {document}) =>
    docsAdapter.addOne({...document}, {...state, status: 'loaded' as const})
  ),

  // Update One Document
  on(DocsActions.updateDocument.updateDocument, (state) => ({...state, status: 'loading' as const})),
  on(DocsActions.updateDocument.updateDocumentSuccess, (state, {document}) =>
    docsAdapter.updateOne({id: document.id, changes: document}, {...state, status: 'loaded' as const})
  ),

  // Delete One Document
  on(DocsActions.deleteDocument.deleteDocument, (state) => ({...state, status: 'loading' as const})),
  on(DocsActions.deleteDocument.deleteDocumentSuccess, (state, {id}) =>
  docsAdapter.removeOne(id, state))
);

export function docsReducer(state: DocsState | undefined, action: Action) {
  return reducer(state, action);
}
