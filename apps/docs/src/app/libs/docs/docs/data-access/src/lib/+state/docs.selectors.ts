import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DOCS_FEATURE_KEY, DocsState, docsAdapter } from './docs.reducer';

// Lookup the 'Docs' feature state managed by NgRx
export const selectDocsState =
  createFeatureSelector<DocsState>(DOCS_FEATURE_KEY);

const { selectAll, selectEntities } = docsAdapter.getSelectors();

export const selectDocsLoaded = createSelector(
  selectDocsState,
  (state: DocsState) => state.loaded
);

export const selectDocsError = createSelector(
  selectDocsState,
  (state: DocsState) => state.error
);

export const selectAllDocs = createSelector(
  selectDocsState,
  (state: DocsState) => selectAll(state)
);

export const selectDocsEntities = createSelector(
  selectDocsState,
  (state: DocsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectDocsState,
  (state: DocsState) => state.selectedId
);

export const selectEntity = createSelector(
  selectDocsEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
