import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as DocsActions from './docs.actions';
import { DocsEntity } from './docs.models';

export const DOCS_FEATURE_KEY = 'docs';

export interface DocsState extends EntityState<DocsEntity> {
  selectedId?: string | number; // which Docs record has been selected
  loaded: boolean; // has the Docs list been loaded
  error?: string | null; // last known error (if any)
}

export interface DocsPartialState {
  readonly [DOCS_FEATURE_KEY]: DocsState;
}

export const docsAdapter: EntityAdapter<DocsEntity> =
  createEntityAdapter<DocsEntity>();

export const initialDocsState: DocsState = docsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialDocsState,
  on(DocsActions.initDocs, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DocsActions.loadDocsSuccess, (state, { docs }) =>
    docsAdapter.setAll(docs, { ...state, loaded: true })
  ),
  on(DocsActions.loadDocsFailure, (state, { error }) => ({ ...state, error }))
);

export function docsReducer(state: DocsState | undefined, action: Action) {
  return reducer(state, action);
}
